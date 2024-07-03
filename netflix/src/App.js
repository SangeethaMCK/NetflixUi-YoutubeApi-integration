import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import Entry from './components/Entry';
import Billboard from './components/Billboard';
import Video from './components/video';
import Yt from './components/yt';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/billboard" element={<Billboard />} />
        <Route path="/video/:videoId" element={<Video />} />

      </Routes>
    </BrowserRouter>
    // <Yt />
  );
}

export default App;
