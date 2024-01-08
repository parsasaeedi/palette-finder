import axios from 'axios';
import Resizer from "react-image-file-resizer";

const MAXWIDTH = 500;
const MAXHEIGHT = 500;

export default function useGeneratePaletteAPI() {

    async function compressImage(image) {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                image,
                MAXWIDTH,
                MAXHEIGHT,
                "JPEG",
                70,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });
    }

    async function fetchPalette(selectedFile, numOfColors) {

        const bodyFormData = new FormData();
        const compressedImage = await compressImage(selectedFile);
        bodyFormData.append('file', compressedImage);
        bodyFormData.append('numClusters', numOfColors);

        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: "/generate",
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (response) {
                reject("Something went wrong");
            });
        });
    }

    return fetchPalette;
};