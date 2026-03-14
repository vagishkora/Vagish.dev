const fs = require('fs');
const path = require('path');

const certsDir = path.join(__dirname, 'certificates');
const outputFile = path.join(__dirname, 'cert_data.js');

const files = fs.readdirSync(certsDir).filter(f => f.toLowerCase().endsWith('.pdf'));

console.log(`Embedding ${files.length} PDFs...`);

let jsContent = 'const CERT_DATA = {\n';

files.forEach(file => {
    const filePath = path.join(certsDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString('base64');

    // We key by the filename (relative path used in script.js)
    // script.js uses "certificates/filename"
    const key = `certificates/${file}`;
    jsContent += `    "${key}": "${base64}",\n`;
    console.log(`Processed: ${file}`);
});

jsContent += '};\n';

fs.writeFileSync(outputFile, jsContent);
console.log(`Saved certificate data to ${outputFile} (${(jsContent.length / 1024 / 1024).toFixed(2)} MB)`);
