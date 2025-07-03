import React from 'react';
import Navbar from '../components/Navbar'
import '../styles/RecruiterView.css'

export const RecruiterView = () => {
  return (
    <div>
        <Navbar />
        <h1>Want to add a new job?</h1>
        <a href='add-new-job'><button>Click here</button></a>
    </div>
  );
};
