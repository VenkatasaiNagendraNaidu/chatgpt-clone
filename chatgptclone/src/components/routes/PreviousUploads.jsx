import React, { useEffect, useState } from 'react';
import './PreviousUploads.css';
import { toast } from 'react-toastify';

const PreviousUploads = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem('uploadedDocs')) || [];
    setUploads(storedDocs);
  }, []);

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
    <div className="previous-uploads-container">
      <h2>Previous Uploads</h2>
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
  );
};

export default PreviousUploads;
