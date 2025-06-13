import React, { useState, useRef, useEffect } from 'react';
import './GenerateImages.css';
import axios from 'axios';
import { FiDownload } from 'react-icons/fi';

const GenerateImages = () => {
  const [inputValue, setInputValue] = useState('');
  const [hasInputStarted, setHasInputStarted] = useState(false);
  
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);


const handleGenerate = async () => {
  setHasInputStarted(true)
  const trimmedInput = inputValue.trim();
  if (!trimmedInput) return;
  
  if (textareaRef.current) {
      textareaRef.current.style.height = '55px';
    }
  setMessages((prev) => [...prev, { type: 'user', content: trimmedInput }]);
  setInputValue('');
  setLoading(true);

  try {
    const response = await axios.post('http://localhost:5000/generate-image', {
      prompt: trimmedInput,
    });

    if (response.data && response.data.image) {
      const imgUrl = `data:image/png;base64,${response.data.image}`;
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: (
            <div className="image-preview-container">
              <img src={imgUrl} alt="Generated" className="generated-image" />
              <div
                className="download-icon"
                onClick={() => handleDownload(imgUrl)}
                title="Download Image"
              >
                <FiDownload size={20} />
              </div>
            </div>
          )
        }
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          type: 'bot',
          content: 'Something went wrong. Please try again later.',
        }
      ]);
    }
  } catch (error) {
    console.error('Error generating image:', error);
    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        content: 'Something went wrong. Please try again later.',
      }
    ]);
  }

  setLoading(false);
};



  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="generate-images-container">
       {!hasInputStarted && (
         <h2 className='welcome-title'>Generate Your Creative Images</h2>
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
    <p className="loading-dot">Generating image...</p>
  </div>
)}


      <div ref={bottomRef} />
      </div>
    )}
      <div className='input-container'>
      <div className="input-wrapper">
      <textarea
        ref={textareaRef}
        placeholder="Bring your Idea to life...!"
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
    </div>
  );
};

export default GenerateImages;
