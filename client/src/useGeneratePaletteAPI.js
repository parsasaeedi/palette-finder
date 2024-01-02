import axios from 'axios';

export default function useGeneratePaletteAPI() {

    async function fetchPalette(selectedFile) {

        const bodyFormData = new FormData();
        bodyFormData.append('file', selectedFile);
        bodyFormData.append('numClusters', 5);

        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: "/api",
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(function (response) {
                resolve(response.data.colors);
            })
            .catch(function (response) {
                reject("Something went wrong");
            });
        });
    }

    return fetchPalette;
};