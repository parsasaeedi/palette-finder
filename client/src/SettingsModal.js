import { Modal } from 'antd';
import NumOfColorSlider from './NumOfColorsSlider.js'

export default function SettingsModal(props) {
  const okText = props.fetchIsLoading ? "Generating" : "Generate";
  return (
    <Modal centered className='settings-modal' title="Settings" open={props.open} onOk={props.onOk} onCancel={props.onCancel} okText={okText} confirmLoading={props.fetchIsLoading}>
        {props.selectedFile != null && 
            <img className='image-preview' src={URL.createObjectURL(props.selectedFile)} />
        }
        <p>Select number of colors:</p>
        <NumOfColorSlider numOfColors={props.numOfColors} setNumOfColors={props.setNumOfColors}/>
    </Modal>
  );
};