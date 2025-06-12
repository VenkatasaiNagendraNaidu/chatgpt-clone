import React, { useState, useEffect } from 'react';
import './UploadDocuments.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const UploadDocuments = () => {
  const [uploads, setUploads] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem('uploadedDocs')) || [];
    setUploads(storedDocs);
  }, [fileUploaded]);

  const uploadToS3 = async (file) => {
    try {
      const { data } = await axios.get(`/api/s3-presigned-url?filename=${file.name}`);
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
            </li>
          ))}
        </ul>
      )}

      <div className="input-row">
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
      </div>

      {isUploading && <p className="uploading-status">Uploading to S3...</p>}
    </div>
  );
};

export default UploadDocuments;
