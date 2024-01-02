import React, { useState, useEffect } from 'react';
import { message, Upload, Modal } from 'antd';
import NumOfColorSlider from './NumOfColorsSlider.js'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

export default function LandingPage() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: false,
        accept: "image/png, image/jpeg",
        showUploadList: false,
        maxCount: 1,
        beforeUpload: (file) => {
            setUploadedFile(file);
            // console.log(file);
            showModal();
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
            <div className='image-upload'>
                <div className="drop-zone">
                    <Dragger {...props} className='dragger'>
                        <InsertPhotoOutlinedIcon className="inert-photo-icon"/>
                        <p className="ant-upload-text">Browse or drop image</p>
                        <p className="ant-upload-hint">
                            Single file upload. Supports PNG and JPEG.
                        </p>
                    </Dragger>
                </div>
            </div>
            <Modal centered className='settings-modal' title="Settings" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Generate">
                {uploadedFile != null && 
                    <img className='image-preview' src={URL.createObjectURL(uploadedFile)} />
                }
                <p>Select number of colors:</p>
                <NumOfColorSlider />
            </Modal>
        </div>
    )
}