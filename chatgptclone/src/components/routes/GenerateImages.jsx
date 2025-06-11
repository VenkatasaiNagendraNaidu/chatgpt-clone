import React, { useState } from 'react';
import './GenerateImages.css';
import axios from 'axios';
import { FiDownload } from 'react-icons/fi';


const GenerateImages = () => {
  const [inputValue, setInputValue] = useState('');
  const [imageData, setImageData] = useState(null);

  const handleGenerate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-image', {
        prompt: inputValue,
      });

      if (response.data && response.data.image) {
        setImageData(`data:image/png;base64,${response.data.image}`);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };
const handleDownload = () => {
  const link = document.createElement('a');
  link.href = imageData;
  link.download = 'generated_image.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <>
     
    <div className="generate-images-container">
      {imageData && (
        <div className="image-preview-container">
        <img src={imageData} alt="Generated" className="generated-image" />
       <div className="download-icon" onClick={handleDownload} title="Download Image">
                   <FiDownload size={20} />
                 </div>
        </div>
        )}

      <div className="input-section">
        <input
          type="text"
          placeholder="Bring your Idea to life...!"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="chat-inputs"
          />
        <button className="generate-btn" onClick={handleGenerate}>
          Generate
        </button>
      </div>
    </div>
          </>
  );
};

export default GenerateImages;
