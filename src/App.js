// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './AppBar/Navbar';
import HomePage from './HomePage/HomePage';
import Remover from './RemoveBG/Remove';
import 'bootstrap/dist/css/bootstrap.min.css';
import Compress from './Compressor/Compress';
import VideoPlayer from './VideoPlayer'; // Yeni eklenen satır

function App() {
  useEffect(() => {
    // Sayfa yüklendiğinde video otomatik başlasın
    const video = document.getElementById('autoplayVideo');
    if (video) {
      video.play();
    }
  }, []);

  return (
    <ClerkProvider
      publishableKey='pk_test_Y3Jpc3AtaGFkZG9jay0yNS5jbGVyay5hY2NvdW50cy5kZXYk'
    >
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/remover" element={<Remover/>} />
            <Route path="/compress" element={<Compress/>} />
            <Route
              path="/video"
              element={<VideoPlayer id="autoplayVideo" />} // Video oynatıcı için yeni eklenen satır
            />
          </Routes>
        </Router>
      </Provider>
    </ClerkProvider>
  );
}

export default App;
