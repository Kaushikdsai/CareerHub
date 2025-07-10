import React, { useState } from 'react';
import '../styles/AddSkills.css';

export const AddSkills = ({ skills,setSkills }) => {
  const [skillInput,setSkillInput]=useState('');

  const handleKeyDown = (e) => {
    if(e.key==='Enter' && skillInput.trim()){
      e.preventDefault();
      if(!skills.includes(skillInput.trim())){
        setSkills([...skills, skillInput.trim()]);
        setSkillInput('');
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="skills-section">
      <label htmlFor="skills">Enter your skills</label>
      <br></br>
      <input
        type="text"
        id="skills"
        placeholder="Type a skill and press enter..."
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="skills-tags">
        {skills.map((skill, idx) => (
          <div key={idx} className="skill-tag">
            {skill}
            <span className="remove-btn" onClick={() => removeSkill(skill)}>×</span>
          </div>
        ))}
      </div>
    </div>
  );
};
