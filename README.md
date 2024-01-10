# PaletteFinder
Transform your images to color palettes and unleash your creativity!

[<img src="https://img.shields.io/badge/-Check%20it%20out!-F47046?style=for-the-badge">](https://palettefinder.com/)

## Technologies used
- Front-end: React hosted on GitHub Pages
- Back-end: Node.js/Express hosted on Google Cloud
- Docker

## Examples
<img width="49%" alt="image" src="https://github.com/parsasaeedi/palette-finder/assets/48306717/d82b8120-e30e-46f3-9530-d9c23d831d64">
<img width="49%" alt="image" src="https://github.com/parsasaeedi/palette-finder/assets/48306717/2cc6a6de-cc04-4188-b47c-eb461f0907ff">
<img width="49%" alt="image" src="https://github.com/parsasaeedi/palette-finder/assets/48306717/fb9abb4d-f084-4a6e-99fb-4e913078ca2e">
<img width="49%" alt="image" src="https://github.com/parsasaeedi/palette-finder/assets/48306717/6b74ccff-b499-47f5-ad91-78a95889b34d">
<img width="49%" alt="image" src="https://github.com/parsasaeedi/palette-finder/assets/48306717/cc24aced-5b79-43f9-904a-d994d1109f52">

## How it works
- The user interface prompts for an image file and the desired number of distinct colors.
- Upon clicking "Generate", the selected image is resized to fit within 500x500 pixels and sent to the back-end entpoint in form-data format.
- Upon receiving the image (PNG or JPEG), the endpoint ensures maximum 500x500 dimensions (in case the end-point was called directly).
- Then the endpoint extracts the pixels of the image into an array, where each pixel is represented by red, blue, and green values ranging from 0 to 255.
- Visual representation of the image structure
<img width="30%" alt="image" src="https://github.com/parsasaeedi/palette-finder/assets/48306717/dccf67eb-c364-41b6-9903-f823f3812bbb">

- To identify dominant colors, pixels are grouped into clusters based on their proximity in the 3D Euclidean space.
- PaletteFinder uses the k-means algorithm for clustering, although other more efficient methods can be explored (learn more about [Color Quantization](https://en.wikipedia.org/wiki/Color_quantization)).
- The endpoint computes the mean of each cluster and returns the results in JSON format.
- The front-end takes the JSON data and displays color codes in hexadecimal format. For optimal contrast, the color code appears in white if the mean of the RGB channels is below 100, and in black if above 100.


## Screenshots
<img width="70%" alt="image" src="https://github.com/parsasaeedi/palette-finder/assets/48306717/ad850753-7bd2-491b-af3d-e77c40d79171">
<img width="70%" alt="image" src="https://github.com/parsasaeedi/palette-finder/assets/48306717/be591f51-4c09-4cd5-a8ed-80e9f1f37dab">
<img width="70%" alt="image" src="https://github.com/parsasaeedi/palette-finder/assets/48306717/1f2ec0f8-f193-4a40-a5ce-da950f5bf96f">
<img width="70%" alt="image" src="https://github.com/parsasaeedi/palette-finder/assets/48306717/04aa37a2-9040-4a52-8d4e-3d4f4f50852d">

## Libraries used:
### Front-end
- [React](https://react.dev/)
- [Ant Design](https://ant.design/)
- [Material UI](https://mui.com/)
- [Axios](https://www.axios.com/)
- [react-component-export-image](https://www.npmjs.com/package/react-component-export-image)
- [react-image-file-resizer](https://www.npmjs.com/package/react-image-file-resizer)

### Back-end
- [Express](https://www.express.com/)
- [Cors](https://www.npmjs.com/package/cors)
- [Sharp](https://www.npmjs.com/package/sharp)
- [Multer](https://www.npmjs.com/package/multer)
- [node-kmeans](https://www.npmjs.com/package/node-kmeans)
