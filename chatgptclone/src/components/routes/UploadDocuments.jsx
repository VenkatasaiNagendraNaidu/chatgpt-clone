import React, { useState } from 'react';
import './UploadDocuments.css';

const UploadDocuments = () => {
  const [fileName, setFileName] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const uploaded = {
          name: file.name,
          content: reader.result,
          uploadedAt: new Date().toISOString(),
        };
        const existing = JSON.parse(localStorage.getItem('uploadedDocs') || '[]');
        existing.push(uploaded);
        localStorage.setItem('uploadedDocs', JSON.stringify(existing));
        setFileName(file.name);
        setFileUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    alert(`Analyzing content of: ${fileName}`);
    // Placeholder: Add navigation or analysis logic here
  };

  return (
    <div className="upload-documents-container">
      <h2 className="upload-heading">Upload Document</h2>
      <p className="upload-description">
        Upload your document to ask questions about its content.
      </p>

      <label htmlFor="docUpload" className="upload-doc-btn">
        Upload Document
        <input
          type="file"
          id="docUpload"
          onChange={handleFileUpload}
          className="hidden-input"
        />
      </label>

      {fileName && (
        <p className="upload-status">Uploaded: {fileName}</p>
      )}

      {fileUploaded && (
        <button className="analyze-btn" onClick={handleAnalyze}>
          Analyze Content
        </button>
      )}
    </div>
  );
};

export default UploadDocuments;
