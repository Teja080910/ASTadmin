import React, { useState } from 'react';
import './others.css'
export const Others= () => {
  const [searchRegNo, setSearchRegNo] = useState('');
  const [marks, setMarks] = useState('');

  const handleSearch = async () => {
   
  };

  const handleSave = async () => {
   
  };

  return (
    <div className="marks-entry">
      <div className="search-section">
        <input
          type="text"
          placeholder="Search Register Number"
          value={searchRegNo}
          onChange={(e) => setSearchRegNo(e.target.value)}
        />
        <button onClick={handleSearch}></button>
      </div>
      <div className="marks-section">
        <input
          type="text"
          placeholder="Enter Marks"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

