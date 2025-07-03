import React from 'react';
import Navbar from '../components/Navbar'
import '../styles/RecruiterView.css'
import {NewJob} from '../components/NewJob'

export const RecruiterView = () => {
  return (
    <div>
        <Navbar />
        <h2>Recruiter Form</h2>
        <div className="recruiter-form">
          <NewJob />
        </div>
    </div>
  );
};
