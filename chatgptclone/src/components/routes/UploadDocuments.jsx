import React, { useState, useEffect } from 'react';
import './UploadDocuments.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const UploadDocuments = () => {
  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Load uploaded documents from backend
  useEffect(() => {
    const fetchUploadedDocs = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/uploaded-documents');
        setUploads(data);
      } catch (err) {
        console.error('Failed to fetch uploaded docs', err);
        toast.error('Failed to load uploaded documents');
      }
    };

    fetchUploadedDocs();
  }, [isUploading]);

  // Upload file to S3 using presigned URL
  // const uploadToS3 = async (file) => {
  //   try {
  //     const { data } = await axios.get(`/api/s3-presigned-url?filename=${file.name}`);
  //     await axios.put(data.url, file, {
  //       headers: {
  //         'Content-Type': file.type,
  //       },
  //     });
  //     return data.fileUrl;
  //   } catch (error) {
  //     console.error('S3 upload failed:', error);
  //     toast.error(`S3 Upload failed for ${file.name}`);
  //     return null;
  //   }
  // };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setIsUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append('documents', file));

    try {
      // Step 1: Upload to local backend
      const localRes = await axios.post('http://localhost:5000/upload-local', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // const uploadedToS3 = [];

      // // Step 2: Upload to S3
      // for (const file of files) {
      //   const s3Url = await uploadToS3(file);
      //   if (s3Url) {
      //     uploadedToS3.push({
      //       name: file.name,
      //       content: s3Url,
      //       uploadedAt: new Date().toISOString(),
      //     });
      //   }
      // }

      // toast.success('Files uploaded locally and to S3');
      for (const file of files) {
         toast.success(`${file.name} uploaded successfully!`);
      }

      // Refresh list
      const { data } = await axios.get('http://localhost:5000/uploaded-documents');
      setUploads(data);
      } catch (err) {
      console.error('Upload failed:', err);
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };
  const handleDelete = async (fileName) => {
  const confirmDelete = window.confirm(`Are you sure you want to delete "${fileName}"?`);
  if (!confirmDelete) return;

  try {
    const res = await axios.delete(`http://localhost:5000/delete-document/${fileName}`);
    if (res.data.success) {
      toast.success(`${fileName} deleted successfully`);
      setUploads(prev => prev.filter(doc => doc.name !== fileName));
    } else {
      toast.error(res.data.message || "Delete failed");
    }
  } catch (err) {
    console.error("Error deleting file:", err);
    toast.error("Failed to delete file");
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
      <button onClick={() => handleDelete(doc.name)} className="delete-btn">Delete</button>
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

      {isUploading && <p className="uploading-status">Uploading...</p>}
    </div>
  );
};

export default UploadDocuments;
