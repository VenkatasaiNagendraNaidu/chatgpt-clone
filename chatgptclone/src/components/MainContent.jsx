import React from 'react';
import Header from './Header';
import WelcomeSection from './WelcomeSection';

const MainContent = () => {
  return (
    <div className="main-content">
      <Header />
      <div className="chat-container">
        <WelcomeSection />
      </div>
    </div>
  );
};

export default MainContent;