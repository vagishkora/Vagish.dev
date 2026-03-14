const fs = require('fs');
const path = require('path');
const pdf = require('pdf-img-convert');

const certsDir = path.join(__dirname, 'certificates');
const outputDir = path.join(__dirname, 'assets', 'certificates');

// Ensure output dir exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Map files to ensure we have mapping logic if needed, 
// but here we just convert all.
const files = fs.readdirSync(certsDir).filter(f => f.toLowerCase().endsWith('.pdf'));

console.log(`Found ${files.length} PDFs to convert.`);

async function convertAll() {
    for (const file of files) {
        console.log(`Converting: ${file}...`);
        try {
            const inputPath = path.join(certsDir, file);
            // Default: page 1, scale 2.0 for quality
            const outputImages = await pdf.convert(inputPath, {
                width: 800, // width in pixels
                height: 600, // approx aspect ratio, but it preserves aspect usually
                page_numbers: [1],
                base64: false
            });

            // Write the first page
            if (outputImages.length > 0) {
                // output filename: replace .pdf with .png
                const outName = file.replace(/\.pdf$/i, '.png');
                const outPath = path.join(outputDir, outName);
                fs.writeFileSync(outPath, outputImages[0]);
                console.log(`Saved: ${outName}`);
            }
        } catch (err) {
            console.error(`Failed to convert ${file}:`, err);
        }
    }
    console.log('Conversion Complete.');
}

convertAll();
