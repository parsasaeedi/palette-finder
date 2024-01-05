import React, { useState } from 'react'
import './App.css';
import LandingPage from './LandingPage.js'
import PalettePage from './PalettePage.js'
import { ConfigProvider, theme } from 'antd';
import SettingsModal from './SettingsModal.js';

function App() {

  const pages = {
    landingPage: 1,
    palettePage: 2,
  }

  const [currentPage, setCurrentPage] = useState(pages.landingPage);
  const [palette, setPalette] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const replaceImage = () => {
    setCurrentPage(pages.landingPage);
    setPalette([]);
    setSelectedFile(null);
  }

  return (
    <div className='app'>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        {
          currentPage==pages.landingPage ? 
          <LandingPage setCurrentPage={setCurrentPage} pages={pages} setPalette={setPalette} selectedFile={selectedFile} setSelectedFile={setSelectedFile} setIsSettingsModalOpen={setIsSettingsModalOpen}/>
          : <PalettePage palette={palette} selectedFile={selectedFile} replaceImage={replaceImage} setIsSettingsModalOpen={setIsSettingsModalOpen}/>
        }
        <SettingsModal open={isSettingsModalOpen} setIsSettingsModalOpen={setIsSettingsModalOpen} selectedFile={selectedFile} setPalette={setPalette} setCurrentPage={setCurrentPage} setSelectedFile={setSelectedFile} pages={pages}/>
      </ConfigProvider>
    </div>
  );
}

export default App;
