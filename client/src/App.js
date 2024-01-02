import React, { useEffect, useState } from 'react'
import './App.css';
import LandingPage from './LandingPage.js'
import { ConfigProvider, theme } from 'antd';

function App() {

  const [backendData, setBackendData] = useState([{}])

  return (
    <div className='app'>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <LandingPage />
      </ConfigProvider>
    </div>
  );
}

export default App;
