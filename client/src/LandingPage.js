import React, { useState, useEffect } from 'react';
import { message, Upload, Modal } from 'antd';
import NumOfColorSlider from './NumOfColorsSlider.js'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SettingsModal from './SettingsModal.js';
import useGeneratePaletteAPI from './useGeneratePaletteAPI.js';

export default function LandingPage() {
    const [selectedFile, setselectedFile] = useState(null);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const fetchPalette = useGeneratePaletteAPI();

    const handleGenerate = async () => {
        try {
            const palette = await fetchPalette(selectedFile);
            console.log(palette);
        } catch (error) {
            console.error(error);
        } finally {
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
        // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped file', e.dataTransfer);
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
            <SettingsModal open={isSettingsModalOpen} onOk={handleGenerate} onCancel={handleSettingsModalCancel} selectedFile={selectedFile}/>
        </div>
    )
}