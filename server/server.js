import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const SECRET_KEY = 'netra_super_secret_key_2026'; // In real apps, use environment variables
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Utility to read DB
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

// Utility to write DB
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
};

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// --- ROUTES ---

// 1. LOGIN
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const admin = db.admin;
  
  if (username === admin.username && password === admin.password) {
    const token = jwt.sign({ username: admin.username }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, username: admin.username });
  } else {
    res.status(401).json({ message: 'Yanlış istifadəçi adı və ya şifrə' });
  }
});

// 2. GET ALL PUBLIC DATA
app.get('/api/data', (req, res) => {
  const db = readDB();
  const { admin, ...publicData } = db; // Don't send admin credentials
  res.json(publicData);
});

// 3. UPDATE COMPANY INFO (PROTECTED)
app.put('/api/company', authenticateToken, (req, res) => {
  const db = readDB();
  db.companyInfo = { ...db.companyInfo, ...req.body };
  writeDB(db);
  res.json({ message: 'Company info updated', data: db.companyInfo });
});

// 4. WEBSITES (CATALOG) ROUTES
app.get('/api/websites', (req, res) => {
  const db = readDB();
  res.json(db.websites || []);
});

app.post('/api/websites', authenticateToken, (req, res) => {
  const db = readDB();
  const newWebsite = {
    id: Date.now(), // simple unique id generator
    ...req.body
  };
  
  if(!db.websites) db.websites = [];
  db.websites.push(newWebsite);
  
  writeDB(db);
  res.status(201).json(newWebsite);
});

app.put('/api/websites/:id', authenticateToken, (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.websites.findIndex(w => w.id === id);
  
  if (index !== -1) {
    db.websites[index] = { ...db.websites[index], ...req.body };
    writeDB(db);
    res.json(db.websites[index]);
  } else {
    res.status(404).json({ message: 'Veb sayt tapılmadı' });
  }
});

app.delete('/api/websites/:id', authenticateToken, (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  db.websites = db.websites.filter(w => w.id !== id);
  writeDB(db);
  res.json({ message: 'Veb sayt silindi' });
});

// 5. ORDERS ROUTES
app.get('/api/orders', authenticateToken, (req, res) => {
  const db = readDB();
  res.json(db.orders || []);
});

app.post('/api/orders', (req, res) => {
  const db = readDB();
  const newOrder = {
    id: Date.now(),
    date: new Date().toISOString(),
    status: 'Yeni', // Yeni, İcrada, Tamamlandı, Ləğv edildi
    ...req.body
  };
  
  if(!db.orders) db.orders = [];
  db.orders.push(newOrder);
  
  writeDB(db);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id/status', authenticateToken, (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  const index = db.orders.findIndex(o => o.id === id);
  
  if (index !== -1) {
    db.orders[index].status = req.body.status;
    writeDB(db);
    res.json(db.orders[index]);
  } else {
    res.status(404).json({ message: 'Sifariş tapılmadı' });
  }
});

// 6. SEO ROUTES
app.get('/api/seo', (req, res) => {
  const db = readDB();
  res.json(db.seo || {});
});

app.put('/api/seo', authenticateToken, (req, res) => {
  const db = readDB();
  db.seo = { ...db.seo, ...req.body };
  writeDB(db);
  res.json({ message: 'SEO data updated', data: db.seo });
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});
