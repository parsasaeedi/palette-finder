// Inputs
const imagePath = './SunFlower.jpg';
const numColors = 11;
const sortByHue = false;

const getPixels = require('get-pixels');
const kmeans = require('node-kmeans');
const rgbToHsl = require('rgb-to-hsl');

const getImagePixelsArray = (imagePath) => {
  return new Promise(function (resolve, reject) {
    getPixels(imagePath, (err, pixels) => {
        if (err) {
          console.log("File does not exist");
          reject();
        }
        const reshapedArray = [];
        for (let i = 0; i < pixels.data.length; i += pixels.shape[2]) {
          reshapedArray.push([...pixels.data.slice(i, i + 3)]);
        }
        resolve(reshapedArray);
    })
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

const validateInput = (numColors) => {
  return (numColors > 10 || numColors < 1);
}

const generateColorPalette = async (imagePath, numColors) => {
  // Validate
  if (numColors > 10 || numColors < 1) {
    console.log("Number of colors must be between between 1 and 10");
    return;
  }

  // Step 1: Extract pixels
  const pixelArray = await getImagePixelsArray(imagePath);

  // Step 2: Use k-means clustering to extract dominant colors
  const dominantColors = await clusterizeColors(pixelArray, numColors);
  
  // Step 3: Sort dominant colors by hue or average of 3 channels
  sortByHue ? dominantColors.sort((a, b) => rgbToHsl(...a)[0] - rgbToHsl(...b)[0])
  : dominantColors.sort((a, b) => (a.reduce((a, b) => a + b, 0)/3) - (b.reduce((a, b) => a + b, 0)/3));

  // Step 4: Generate color palette
  const zeroPad = (num, places) => String(num).padStart(places, '0')
  const colorPalette = dominantColors.map(color => color.map(channel => zeroPad(channel.toString(16), 2)).join(''));
  console.log("https://coolors.co/" + colorPalette.join('-'));
  colorPalette.forEach(color => {
    console.log("#"+color);
  });
}

generateColorPalette(imagePath, numColors);