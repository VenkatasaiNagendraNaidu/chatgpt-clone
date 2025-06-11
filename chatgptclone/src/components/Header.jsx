import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <div className="model-selector">
          <span>ChatGPT</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="header-right">
        <button className="get-plus-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
          Get Plus
        </button>
      </div>
    </div>
  );
};

export default Header;