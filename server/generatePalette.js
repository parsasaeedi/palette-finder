const sharp = require('sharp');
const kmeans = require('node-kmeans');
const rgbToHsl = require('rgb-to-hsl');

const MAXNUMCOLORS = 10;
const MINNUMCOLORS = 1;
const MAXWIDTH = 500;
const MAXHEIGHT = 500;
const MAXFILESIZE = 10485760;

const getImagePixelsArray = (imageBuffer) => {
  return new Promise(function (resolve, reject) {
  sharp(imageBuffer)
  .resize({
    width: MAXWIDTH,
    height: MAXHEIGHT,
    fit: sharp.fit.inside, // Maintain aspect ratio
    withoutEnlargement: true, // Do not enlarge images smaller than the specified dimensions
  })
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const numPixels = info.width * info.height;
    const pixelArray = [];
    for (let i = 0; i < numPixels; i++) {
      const offset = i * info.channels;
      pixelArray.push([...data.subarray(offset, offset+3)]);
    }
    resolve(pixelArray);
  })
  .catch((err) => {
    console.error('Error reading image:', err);
  });
  })
}

const clusterizeColors = (pixelArray, numColors) => {
  return new Promise(function (resolve, reject) {
    kmeans.clusterize(pixelArray, {k: numColors}, (err,res) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      else resolve(res.map(cluster => cluster.centroid.map(Math.round)));
    });
  })
}

const generatePalette = async (imageBuffer, numColors) => {
  // Validate
  if (numColors > MAXNUMCOLORS || numColors < MINNUMCOLORS) {
    throw new Error('Number of colors must be between between 1 and 10');
  }
  if (imageBuffer.byteLength > MAXFILESIZE) {
    throw new Error('Max file size: 10MB');
  }

  // Step 1: Extract pixels
  const pixelArray = await getImagePixelsArray(imageBuffer);

  // Step 2: Use k-means clustering to extract dominant colors
  const palette = await clusterizeColors(pixelArray, numColors);
  
  // Step 3: Sort dominant colors by hue or average of 3 channels
  palette.sort((a, b) => (a.reduce((a, b) => a + b, 0)/3) - (b.reduce((a, b) => a + b, 0)/3))

  // Step 4: Generate color palette
  return palette;
}

module.exports = generatePalette;