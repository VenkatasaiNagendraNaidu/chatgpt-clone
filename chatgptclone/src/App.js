import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    
    <div className="app">
      <ToastContainer position="top-right" autoClose={3000} />
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;