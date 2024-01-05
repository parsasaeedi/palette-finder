import { Upload } from 'antd';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

export default function LandingPage(props) {

    const { Dragger } = Upload;
    const draggerProps = {
        name: 'file',
        multiple: false,
        accept: "image/png, image/jpeg",
        showUploadList: false,
        maxCount: 1,
        beforeUpload: (file) => {
            props.setSelectedFile(file);
            props.setIsSettingsModalOpen(true);
            return false;
        },
    };

    return (
        <div className='landing-page'>
            <h1 className='logo'>PaletteFinder</h1>
            <h2 className='slogan'>Transform your images to color palettes and unleash your creativity!</h2>
            <Dragger {...draggerProps} className='dragger'>
                <InsertPhotoOutlinedIcon className="inert-photo-icon"/>
                <p className="ant-upload-text">Browse or drop image</p>
                <p className="ant-upload-hint">
                    Single file upload. Supports PNG and JPEG.
                </p>
            </Dragger>
        </div>
    )
}