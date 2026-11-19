const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

const renames = [
  ['google_ads_blog_1790615682930.jpg', 'blog_img_16.jpg'],
  ['local_seo_blog_1790615696556.jpg', 'blog_img_17.jpg'],
  ['content_marketing_blog_1790615712062.jpg', 'blog_img_18.jpg'],
  ['ecommerce_blog_1790615721278.jpg', 'blog_img_19.jpg'],
  ['meta_pixel_blog_1790615732887.jpg', 'blog_img_20.jpg']
];

renames.forEach(([oldName, newName]) => {
  const oldPath = path.join(publicDir, oldName);
  const newPath = path.join(publicDir, newName);
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${oldName} to ${newName}`);
  }
});
