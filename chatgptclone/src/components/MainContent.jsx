import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NewChat from './routes/WelcomeSection';
import BuildAIKnowledge from './routes/BuildAIKnowledge';
import AnalyzeImages from './routes/AnalyzeImages';
import UploadDocuments from './routes/UploadDocuments';
import PreviousUploads from './routes/PreviousUploads';
import GenerateImages from './routes/GenerateImages';
import GenerateVideos from './routes/GenerateVideos';
import Header from './Header';

function MainContent() {
  return (
    <div className="main-content">
      <Header/>
      <div className='chat-container'>

      <Routes>
        <Route path="/new-chat" element={<NewChat />} />
        <Route path="/build-ai" element={<BuildAIKnowledge />} />
        {/* <Route path="/analyze-images" element={<AnalyzeImages />} /> */}
        <Route path="/upload-docs" element={<UploadDocuments />} />
        {/* <Route path="/previous-uploads" element={<PreviousUploads />} /> */}
        <Route path="/generate-images" element={<GenerateImages />} />
        <Route path="/generate-videos" element={<GenerateVideos />} />
        <Route path="/" element={<NewChat />} />
      </Routes>
      </div>
    </div>
  );
}

export default MainContent;
