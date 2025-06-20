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
  const [hasInputStarted, setHasInputStarted] = useState(false);
   

 const handleGenerate = async () => {
  setHasInputStarted(true)
  const prompt = inputValue.trim();
  if (!prompt) return;
  if (textareaRef.current) {
      textareaRef.current.style.height = '55px';
  }

  setInputValue('');
  setMessages((prev) => [...prev, { type: 'user', content: prompt }]);
  setLoading(true);

  try {
    const response = await axios.post(
      'http://localhost:5000/generate-video',
      { prompt },
      { responseType: 'blob' }
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
      {!hasInputStarted && (
        <h2 className='welcome-title'>Generate Your Creative Videos</h2>
      )}
{hasInputStarted && (

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
        )}
      <div className='input-container'>
      <div className="input-wrapper">
      <textarea
        ref={textareaRef}
        placeholder="Bring life to your thoughts....!"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          e.target.style.height = 'auto';
          e.target.style.height = Math.min(e.target.scrollHeight, 55) + 'px';
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleGenerate();
          }
        }}
        className="chat-textarea"
      />
      <div className="input-actions">
   
            <button
              className={`input-btn send-btn ${!inputValue.trim() ? 'disabled' : ''}`}
              disabled={!inputValue.trim()}
              onClick={handleGenerate}
              >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polygon points="22,2 15,22 11,13 2,9 22,2" fill="currentColor"/>
              </svg>
            </button>
          </div>
                </div>
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
