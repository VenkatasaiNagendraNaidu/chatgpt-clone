import React, { useState, useRef, useEffect } from 'react';
import './GenerateImages.css';
import axios from 'axios';
import { FiDownload } from 'react-icons/fi';

const GenerateImages = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]); // Stores chat-style user/image messages
  const bottomRef = useRef(null);
  const [loading, setLoading] = useState(false);


const handleGenerate = async () => {
  const trimmedInput = inputValue.trim();
  if (!trimmedInput) return;

  // Add user input message and clear input immediately
  setMessages((prev) => [...prev, { type: 'user', content: trimmedInput }]);
  setInputValue('');
  setLoading(true); // start loading

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

  setLoading(false); // stop loading
};



  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'generated_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Auto scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="generate-images-container">
      <h2 style={{color:'black'}}>Generate Your Creative Images</h2>
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

      <div className="input-section">
        <input
          type="text"
          placeholder="Bring your Idea to life...!"
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
      </div>
    </div>
  );
};

export default GenerateImages;
