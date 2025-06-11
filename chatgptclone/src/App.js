import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <ToastContainer position="top-right" autoClose={3000} />
        <Sidebar />
        <MainContent />
      </div>
    </Router>
  );
}

export default App;