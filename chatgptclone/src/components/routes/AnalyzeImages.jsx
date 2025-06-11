import React, { useState } from 'react';
import './AnalyzeImages.css';

const AnalyzeImages = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file');
    }
  };

  return (
    <div className="analyze-container">
      <label htmlFor="imageUpload" className="upload-btn">
        Upload Image
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden-input"
        />
      </label>

      {image && (
        <div className="preview-section">
          <p className="preview-title">Image Preview:</p>
          <div className='preview-img-btn'>
          <img src={image} alt="Uploaded" className="image-preview" />
      <button className='preview-img-btn-i'>
        Analyze
      </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzeImages;
