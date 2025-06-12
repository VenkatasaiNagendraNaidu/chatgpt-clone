import React, { useState, useEffect } from 'react';
import './UploadDocuments.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const UploadDocuments = () => {
  const [uploads, setUploads] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem('uploadedDocs')) || [];
    setUploads(storedDocs);
  }, [fileUploaded]);

  const uploadToS3 = async (file) => {
    try {
      const { data } = await axios.get(`/api/s3-presigned-url?filename=${file.name}`);

      // Upload to S3
      await axios.put(data.url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      return data.fileUrl;
    } catch (error) {
      console.error("Upload to S3 failed", error);
      toast.error("S3 Upload Failed");
      return null;
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    const newUploads = [];

    for (const file of files) {
      const s3Url = await uploadToS3(file);
      if (s3Url) {
        const fileData = {
          name: file.name,
          content: s3Url,
          uploadedAt: new Date().toISOString(),
        };
        newUploads.push(fileData);
      }
    }

    const existing = JSON.parse(localStorage.getItem('uploadedDocs') || '[]');
    const updated = [...existing, ...newUploads];
    localStorage.setItem('uploadedDocs', JSON.stringify(updated));
    setUploads(updated);
    setFileUploaded(true);
    setIsUploading(false);
    toast.success("File(s) uploaded to S3");
  };

  const handleDelete = (index) => {
    toast(
      <div>
        <p>Are you sure you want to delete this file?</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <button
            onClick={() => {
              const updated = [...uploads];
              updated.splice(index, 1);
              localStorage.setItem('uploadedDocs', JSON.stringify(updated));
              setUploads(updated);
              toast.dismiss();
              toast.success('File deleted successfully!');
            }}
            style={{ padding: '4px 8px', background: 'red', color: '#fff', border: 'none' }}
          >
            Yes
          </button>
          <button onClick={() => toast.dismiss()} style={{ padding: '4px 8px' }}>
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  const handlePromptSearch = async () => {
    try {
      const response = await axios.post('/api/search-doc', { prompt });
      console.log("Search Result:", response.data);
      toast.success("Search completed");
      // Optionally show results below
    } catch (err) {
      toast.error("Failed to retrieve data");
    }
  };

  return (
    <div className="upload-documents-container">
      <h2 className="upload-heading">Uploaded Documents</h2>
      {uploads.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul className="uploads-list">
          {uploads.map((doc, index) => (
            <li key={index} className="upload-item">
              <a href={doc.content} target="_blank" rel="noopener noreferrer" className="upload-link">{doc.name}</a>
              <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {/* Input Row */}
      <div className="input-row">
        <input
          type="text"
          placeholder="Ask something about your documents..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handlePromptSearch();
                }
              }}
          className="prompt-input"
        />

        <label htmlFor="docUpload" className="upload-doc-btn">
          Upload
          <input
            type="file"
            id="docUpload"
            multiple
            onChange={handleFileUpload}
            className="hidden-input"
          />
        </label>

        <button className="generate-btn" onClick={handlePromptSearch} disabled={!prompt || isUploading}>
          Enter
        </button>
      </div>

      {isUploading && <p className="uploading-status">Uploading to S3...</p>}
    </div>
  );
};

export default UploadDocuments;
