import { useState } from 'react';
import { Modal, message } from 'antd';
import NumOfColorSlider from './NumOfColorsSlider.js'
import useGeneratePaletteAPI from './useGeneratePaletteAPI.js';

export default function SettingsModal(props) {

  const fetchPalette = useGeneratePaletteAPI();

  const [fetchIsLoading, setFetchIsLoading] = useState(false);
  const [numOfColors, setNumOfColors] = useState(5);

  const handleGenerate = async () => {
    try {
        setFetchIsLoading(true);
        const paletteData = await fetchPalette(props.selectedFile, numOfColors);
        props.setPalette(paletteData.palette);
        props.setCurrentPage(props.pages.palettePage);
    } catch (error) {
        console.error(error);
        message.error("Something went wrong. Try another image.");
        props.setSelectedFile(null);
    } finally {
        setFetchIsLoading(false);
        props.setIsSettingsModalOpen(false);
    }
  };  

  const handleSettingsModalCancel = () => {
    props.setIsSettingsModalOpen(false);
    if (props.currentPage == props.pages.landingPage) {
      props.setSelectedFile(null);
    }
  };

const okText = fetchIsLoading ? "Generating" : "Generate";
  return (
    <Modal centered className='settings-modal' title="Settings" open={props.open} onOk={handleGenerate} onCancel={handleSettingsModalCancel} okText={okText} confirmLoading={fetchIsLoading} okButtonProps={{shape: 'round'}} cancelButtonProps={{shape: 'round'}}>
        {props.selectedFile != null && 
          <div className='image-preview-container'>
            <img className='image-preview' src={URL.createObjectURL(props.selectedFile)} />
          </div>
        }
        <p>Select number of colors:</p>
        <NumOfColorSlider numOfColors={numOfColors} setNumOfColors={setNumOfColors}/>
    </Modal>
  );
};