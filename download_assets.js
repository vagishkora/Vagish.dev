const fs = require('fs');
const https = require('https');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function downloadFile(url, filename) {
  const dest = path.join(publicDir, filename);
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', (err) => {
    fs.unlink(dest);
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
}

downloadFile('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/card.glb', 'card.glb');
downloadFile('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/lanyard.png', 'lanyard.png');
