import React, { useState } from 'react';
import './others.css';

export const Others = () => {
  const [searchRegNoActivities, setActivities] = useState('');
  const [marksActivities, setMarksActivities] = useState('');
  const [searchRegNoInternal, setInternal] = useState('');
  const [marksInternal, setMarksInternal] = useState('');

  const handleSaveActivities = async () => {
  };

  const handleSaveInternal = async () => {
  };

  return (
    <div className="others-container">
      <div className="marks-entry">
        <h2>Activities</h2>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search Register Number"
            value={searchRegNoActivities}
            onChange={(e) => setActivities(e.target.value)}
          />
        </div>
        <div className="marks-section">
          <input
            type="text"
            placeholder="Enter Marks"
            value={marksActivities}
            onChange={(e) => setMarksActivities(e.target.value)}
          />
          <button onClick={handleSaveActivities}>Save</button>
        </div>
      </div>
      <div className="marks-entry">
        <h2>Internal Marks</h2>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search Register Number"
            value={searchRegNoInternal}
            onChange={(e) => setInternal(e.target.value)}
          />
        </div>
        <div className="marks-section">
          <input
            type="text"
            placeholder="Enter Marks"
            value={marksInternal}
            onChange={(e) => setMarksInternal(e.target.value)}
          />
          <button onClick={handleSaveInternal}>Save</button>
        </div>
      </div>
    </div>
  );
};

