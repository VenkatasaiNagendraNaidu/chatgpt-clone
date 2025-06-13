import React, { useState, useRef, useEffect } from 'react';
import './GenerateVideos.css';
import { FiDownload } from 'react-icons/fi';
import axios from 'axios';

const GenerateVideos = () => {
  const [inputValue, setInputValue] = useState('');
  const [videoUrl, setVideoUrl] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
   const textareaRef = useRef(null);

 const handleGenerate = async () => {
  const prompt = inputValue.trim();
  if (!prompt) return;
  
  if (textareaRef.current) {
      textareaRef.current.style.height = '70px';
  }

  setInputValue('');
  setMessages((prev) => [...prev, { type: 'user', content: prompt }]);
  setLoading(true);

  try {
    const response = await axios.post(
      'http://localhost:5000/generate-video',
      { prompt },
      { responseType: 'blob' } // IMPORTANT for raw bytes
    );

    const blob = new Blob([response.data], { type: 'video/mp4' });
    const videoBlobUrl = URL.createObjectURL(blob);
    setVideoUrl(videoBlobUrl);

    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        content: (
          <div className="video-wrapper">
            <video controls className="generated-video">
              <source src={videoBlobUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              className="download-icon"
              onClick={() => handleDownload(videoBlobUrl)}
              title="Download Video"
            >
              <FiDownload size={20} />
            </div>
          </div>
        )
      }
    ]);
  } catch (error) {
    console.error('Error generating video:', error);
    setMessages((prev) => [
      ...prev,
      { type: 'bot', content: 'Something went wrong. Please try again later.' }
    ]);
  }

  setLoading(false);
};

const handleDownload = async (blobUrl) => {
  try {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'generated_video.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
  }
};


  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="generate-videos-container">
      <h2 style={{color:'black'}}>Generate Your Creative Videos</h2>

       <div className="messages-container">

      {messages.map((msg, idx) => (
        <div key={idx} className={`message ${msg.type === 'user' ? 'user-msg' : 'bot-msg'}`}>
          {typeof msg.content === 'string' ? <p>{msg.content}</p> : msg.content}
        </div>
      ))}
      {loading && (
        <div className="message bot-msg">
          <p className="loading-dot">Generating video...</p>
        </div>
      )}
      <div ref={bottomRef} />
      </div>
      <div className="input-section">
      <textarea
        ref={textareaRef}
        placeholder="Bring life to your thoughts....!"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          e.target.style.height = 'auto';
          e.target.style.height = Math.min(e.target.scrollHeight, 132) + 'px'; // Limit to 5 lines
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleGenerate();
          }
        }}
        className="chat-inputs"
      />
      <button className="generate-btn" onClick={handleGenerate}>
        Generate
      </button>
    </div>


      {/* <div className="input-section">
        <input
          type="text"
          placeholder="Bring life to your thoughts....!"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleGenerate();
            }
          }}
          className="chat-inputs"
        />
        <button className="generate-btn" onClick={handleGenerate}>
          Generate
        </button>
      </div> */}
    </div>
  );
};

export default GenerateVideos;
