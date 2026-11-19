import Jimp from 'jimp';

async function createCircularFavicon() {
  try {
    const size = 512;
    const image = await Jimp.read('public/logo.jpg');
    
    // Şəkli tam kvadrat edib sonra dairəyə kəs
    // Əvvəlcə şəkli 512x512-yə resize et (mərkəzdən kəs)
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    
    // Ən kiçik tərəfi tap (kvadrat üçün)
    const minSide = Math.min(w, h);
    const cropX = Math.floor((w - minSide) / 2);
    const cropY = Math.floor((h - minSide) / 2);
    
    // Mərkəzdan kvadrat kəs, sonra 512x512-yə scale et
    image.crop(cropX, cropY, minSide, minSide);
    image.resize(size, size);
    
    // Yeni şəffaf kvadrat yarad
    const result = new Jimp(size, size, 0x00000000);
    
    // Dairə maskası tətbiq et - şəkildəki hər pixel dairə içindədirsə kopyala
    const radius = size / 2;
    const cx = size / 2;
    const cy = size / 2;
    
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
        if (dist <= radius) {
          const color = image.getPixelColor(x, y);
          result.setPixelColor(color, x, y);
        }
      }
    }
    
    await result.writeAsync('public/favicon.png');
    console.log('favicon.png yaradıldı — tam dairəvi, 512x512');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createCircularFavicon();
