import React, { useState } from 'react'
import './App.css';
import LandingPage from './LandingPage.js'
import PalettePage from './PalettePage.js'
import { ConfigProvider, theme } from 'antd';

function App() {

  const pages = {
    landingPage: 1,
    palettePage: 2,
  }

  const [currentPage, setCurrentPage] = useState(pages.landingPage);
  const [palette, setPalette] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageAspectRatio, setImageAspectRatio] = useState(null);

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
          <LandingPage setCurrentPage={setCurrentPage} pages={pages} setPalette={setPalette} selectedFile={selectedFile} setSelectedFile={setSelectedFile} setImageAspectRatio={setImageAspectRatio} />
          : <PalettePage palette={palette} selectedFile={selectedFile} replaceImage={replaceImage} imageAspectRatio={imageAspectRatio} />
        }
      </ConfigProvider>
    </div>
  );
}

export default App;
