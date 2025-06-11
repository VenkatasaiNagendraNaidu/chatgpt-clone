import React, { useState,useEffect } from 'react';
import './UploadDocuments.css';
import { toast } from 'react-toastify';


const UploadDocuments = () => {
  const [fileName, setFileName] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileNames, setFileNames] = useState([]);

const handleFileUpload = (e) => {
  const files = Array.from(e.target.files);
  const existing = JSON.parse(localStorage.getItem('uploadedDocs') || '[]');
  const uploadedNames = [];

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const uploaded = {
        name: file.name,
        content: reader.result,
        uploadedAt: new Date().toISOString(),
      };
      existing.push(uploaded);
      localStorage.setItem('uploadedDocs', JSON.stringify(existing));
    };
    reader.readAsDataURL(file);
    uploadedNames.push(file.name);
    setFileUploaded(true);
  });

  setFileNames(prev => [...prev, ...uploadedNames]);
};



  const handleAnalyze = () => {
    alert(`Analyzing content of: ${fileName}`);
  };
   const [uploads, setUploads] = useState([]);
  
    useEffect(() => {
      const storedDocs = JSON.parse(localStorage.getItem('uploadedDocs')) || [];
      setUploads(storedDocs);
    }, [fileUploaded]);
  
    const handleDelete = (index) => {
      const confirmToast = toast(
        <div>
          <p>Are you sure you want to delete this file?</p>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button
              onClick={() => {
                const newUploads = [...uploads];
                newUploads.splice(index, 1);
                localStorage.setItem('uploadedDocs', JSON.stringify(newUploads));
                setUploads(newUploads);
                toast.dismiss();
                toast.success('File deleted successfully!');
              }}
              style={{ padding: '4px 8px', background: 'red', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss()}
              style={{ padding: '4px 8px', background: 'gray', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              No
            </button>
          </div>
        </div>,
        { autoClose: false }
      );
    };
  

  return (
    <>
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
          multiple
          onChange={handleFileUpload}
          className="hidden-input"
        />
      </label>

     {fileNames.length > 0 && (
  <div className="upload-status">
    <p>Uploaded Files:</p>
    <ul>
      {fileNames.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  </div>
)}

      {fileUploaded && (
        <button className="analyze-btn" onClick={handleAnalyze}>
          Analyze Content
        </button>
      )}
    </div>
    <div className="previous-uploads-container">
      <h2>Uploads</h2>
      {uploads.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul className="uploads-list">
          {uploads.map((doc, index) => (
            <li key={index} className="upload-item">
              <a href={doc.content} download={doc.name} className="upload-link">{doc.name}</a>
              <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default UploadDocuments;
