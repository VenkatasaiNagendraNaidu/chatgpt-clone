import React, { useState,useEffect,useRef } from 'react';

const ChatInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasInputStarted, setHasInputStarted] = useState(false);

 const handleSend = async () => {
  if (!inputValue.trim()) return;

  if (!hasInputStarted) setHasInputStarted(true);

  setMessages((prev) => [...prev, { type: 'user', text: inputValue }]);

  const userMessage = inputValue;
  setInputValue('');

try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBoRXgh7IKbvJ70RH8zadgakueDvnlpBLM`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';

    setMessages((prev) => [
      ...prev,
      { type: 'bot', text: botReply },
    ]);
  } catch (error) {
    console.error('Error calling API:', error);
    setMessages((prev) => [
      ...prev,
      { type: 'bot', text: 'Sorry, something went wrong!' },
    ]);
  }
};
    const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  

  
  return (
    <div className="new-chat-container">
      <h1 className="welcome-title">What are you working on?</h1>
    {hasInputStarted && (
  <div className="messages-container">
    {messages.map((msg, idx) => (
      <div
        key={idx}
        className={`message ${msg.type === 'user' ? 'user-msg' : 'bot-msg'}`}
      >
        {msg.text.split('\n').map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    ))}
    <div ref={bottomRef} />
  </div>
)}
      <div className="input-container">
        <div className="input-wrapper">
          <textarea
  placeholder="Ask anything"
  value={inputValue}
  onChange={(e) => {
    setInputValue(e.target.value);
    // Auto expand height
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 132) + 'px'; // 132px = 5 lines
  }}
  onKeyDown={(e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }}
  className="chat-textarea"
/>
          <div className="input-actions">
   
            <button
              className={`input-btn send-btn ${!inputValue.trim() ? 'disabled' : ''}`}
              disabled={!inputValue.trim()}
              onClick={handleSend}
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
export default ChatInput;
         {/* <button className="input-btn tools-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M14.7 6.3A1 1 0 0 0 13 5H9A1 1 0 0 0 7.3 6.3L4.3 9.3A1 1 0 0 0 4 10V14A1 1 0 0 0 4.3 14.7L7.3 17.7A1 1 0 0 0 9 19H13A1 1 0 0 0 14.7 17.7L17.7 14.7A1 1 0 0 0 18 14V10A1 1 0 0 0 17.7 9.3L14.7 6.3Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="11" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="tools-text">Tools</span>
            </button>
            <label className="input-btn attach-btn" style={{ cursor: 'pointer' }}>
              <input
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    console.log("Selected file:", file);
                  }
                }}
              />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21.44 11.05L12.25 20.24C11.12 21.37 9.59 22 7.99 22C6.39 22 4.86 21.37 3.73 20.24C2.6 19.11 1.97 17.58 1.97 15.98C1.97 14.38 2.6 12.85 3.73 11.72L12.92 2.53C13.68 1.77 14.71 1.35 15.78 1.35C16.85 1.35 17.88 1.77 18.64 2.53C19.4 3.29 19.82 4.32 19.82 5.39C19.82 6.46 19.4 7.49 18.64 8.25L10.17 16.72C9.79 17.1 9.28 17.31 8.75 17.31C8.22 17.31 7.71 17.1 7.33 16.72C6.95 16.34 6.74 15.83 6.74 15.3C6.74 14.77 6.95 14.26 7.33 13.88L15.07 6.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </label>
            <button
              className="input-btn mic-btn"
              onClick={() => {
                navigator.mediaDevices.getUserMedia({ audio: true })
                  .then((stream) => {
                    console.log("Microphone access granted");
                  })
                  .catch((err) => {
                    console.error("Microphone access denied:", err);
                    alert("Microphone access was denied. Please allow microphone access to continue.");
                  });
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" stroke="currentColor" strokeWidth="2" />
                <path d="M19 10V12C19 16.42 15.42 20 11 20H13C17.42 20 21 16.42 21 12V10" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="20" x2="12" y2="24" stroke="currentColor" strokeWidth="2" />
                <line x1="8" y1="24" x2="16" y2="24" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button> */}