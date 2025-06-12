import React from 'react';
import ChatInput from './ChatInput';
const WelcomeSection = () => {
  return (
    <div className="welcome-section">
      {/* <h1 className="welcome-title">What are you working on?</h1> */}
      <ChatInput />
    </div>
  );
};
export default WelcomeSection;