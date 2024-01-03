import axios from 'axios';

export default function useGeneratePaletteAPI() {

    async function fetchPalette(selectedFile, numOfColors) {

        const bodyFormData = new FormData();
        bodyFormData.append('file', selectedFile);
        bodyFormData.append('numClusters', numOfColors);

        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: "/api",
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