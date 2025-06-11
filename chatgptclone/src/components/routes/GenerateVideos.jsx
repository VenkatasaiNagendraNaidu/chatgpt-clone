import React, { useState } from 'react';
import './GenerateVideos.css';
import { FiDownload } from 'react-icons/fi';
import axios from 'axios';

const GenerateVideos = () => {
  const [inputValue, setInputValue] = useState('');
  const [videoUrl, setVideoUrl] = useState('https://www.w3schools.com/html/mov_bbb.mp4');

  const handleGenerate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-video', {
        prompt: inputValue,
      });

      if (response.data && response.data.videoUrl) {
        setVideoUrl(response.data.videoUrl);
      }
    } catch (error) {
      console.error('Error generating video:', error);
    }
  };
  const handleDownload = async () => {
  try {
    const response = await fetch(videoUrl);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'generated_video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Download failed:", error);
  }
};


  return (
    <div className="generate-videos-container">
      {videoUrl && (
        <div className="video-wrapper">
          <video controls className="generated-video">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="download-icon" onClick={handleDownload} title="Download Video">
            <FiDownload size={20} />
          </div>
        </div>
      )}
      <div className="input-section">
        <input
          type="text"
          placeholder="Bring life to your thoughts....!"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="chat-inputs"
        />
        <button className="generate-btn" onClick={handleGenerate}>
          Generate
        </button>
      </div>
    </div>
  );
};

export default GenerateVideos;
