import React, { useState } from 'react';
import { message, Upload } from 'antd';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SettingsModal from './SettingsModal.js';
import useGeneratePaletteAPI from './useGeneratePaletteAPI.js';

export default function LandingPage() {
    const [selectedFile, setselectedFile] = useState(null);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [numOfColors, setNumOfColors] = useState(5);
    const [fetchIsLoading, setFetchIsLoading] = useState(false);

    const fetchPalette = useGeneratePaletteAPI();

    const handleGenerate = async () => {
        try {
            setFetchIsLoading(true);
            const palette = await fetchPalette(selectedFile, numOfColors);
            console.log(palette);
        } catch (error) {
            console.error(error);
            message.error("Something went wrong. Try another image.");
            setselectedFile(null);
        } finally {
            setFetchIsLoading(false);
            setIsSettingsModalOpen(false);
        }
    };

    const handleSettingsModalCancel = () => {
        setIsSettingsModalOpen(false);
        setselectedFile(null);
    };

    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: false,
        accept: "image/png, image/jpeg",
        showUploadList: false,
        maxCount: 1,
        beforeUpload: (file) => {
            setselectedFile(file);
            setIsSettingsModalOpen(true);
            return false;
        },
    };

    return (
        <div className='landing-page'>
            <h1 className='logo'>PalettePickr</h1>
            <h2 className='slogan'>Transform your images to color palettes and unleash your creativity!</h2>
            <Dragger {...props} className='dragger'>
                <InsertPhotoOutlinedIcon className="inert-photo-icon"/>
                <p className="ant-upload-text">Browse or drop image</p>
                <p className="ant-upload-hint">
                    Single file upload. Supports PNG and JPEG.
                </p>
            </Dragger>
            <SettingsModal open={isSettingsModalOpen} onOk={handleGenerate} onCancel={handleSettingsModalCancel} selectedFile={selectedFile} numOfColors={numOfColors} setNumOfColors={setNumOfColors} fetchIsLoading={fetchIsLoading} />
        </div>
    )
}