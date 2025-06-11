import React,{useState} from 'react';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [chatHistory, setChatHistory] = useState([
    "How to center a div in CSS",
    "React component best practices",
    "JavaScript array methods",
    "Node.js vs Python comparison",
    "Database design principles",
    "API authentication methods",
    "CSS Grid vs Flexbox",
    "React hooks explained",
    "Git workflow strategies",
    "Web performance optimization"
  ]);
  const [pendingDelete, setPendingDelete] = useState(null);

  const handleDeleteClick = (index) => {
    if (pendingDelete === index) {
      setChatHistory(prev => prev.filter((_, i) => i !== index));
      setPendingDelete(null);
      toast.success("Chat deleted");
    } else {
      setPendingDelete(index);
      toast.warn("Click again to confirm delete", { autoClose: 3000 });
      setTimeout(() => {
        setPendingDelete(null);
      }, 2000);
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="sidebar-content">
  <Link to="/new-chat">
        <div className="sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Chat with AI</span>
        </div>
</Link>
<Link to="/upload-docs">
        <div className="sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20V20H6.5A2.5 2.5 0 0 1 4 17.5V19.5Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>Build AI Knowledge</span>
        </div>
</Link>
  <Link to="/analyze-images">
        <div className="sidebar-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <polygon points="10,8 16,12 10,16" fill="currentColor"/>
          </svg>
          <span>Analyze Images</span>
        </div>
  </Link>
  {/* <Link to="/upload-docs" >
        <div className="sidebar-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="M12 16V8M8 12l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M4 20h16V4H4v16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          <span>Upload Documents</span>
        </div> 
  </Link> */}
    {/* <Link to="/previous-uploads" >
        <div className="sidebar-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="M3 6h6l2 2h10v10H3V6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          <span>Previous Uploads</span>
        </div>
    </Link> */}
  <Link to="/generate-images">
        <div className="sidebar-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
  <circle cx="8" cy="8" r="2" fill="currentColor"/>
  <path d="M21 21l-6-6-3 3-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          <span>Generate Images</span>
        </div>
  </Link>
    <Link to="/generate-videos">
         <div className="sidebar-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
  <path d="M15 10l5-3v10l-5-3v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          <span>Generate Videos</span>
        </div>
    </Link>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Recent</div>
          {chatHistory.map((chat, index) => (
            <div key={index} className="chat-history-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="chat-history-text">{chat}</span>
              <div className="chat-options">
                <button className="chat-option-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="chat-option-btn" onClick={() => handleDeleteClick(index)}>
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
</button>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="upgrade-section">
          <div className="upgrade-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div className="upgrade-content">
              <div className="upgrade-title">Upgrade plan</div>
              <div className="upgrade-subtitle">More access to the best models</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;