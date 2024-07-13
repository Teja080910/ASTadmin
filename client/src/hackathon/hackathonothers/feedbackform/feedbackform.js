import React, { useState } from 'react';
import './feedbackform.css';

export const FeedbackForm = () => {
    const [regnum, setReg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isInteractive, setIsInteractive] = useState('');
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { name, email, isInteractive, rating, feedback });
    setName('');
    setEmail('');
    setIsInteractive('');
    setRating('');
    setFeedback('');
    setReg('');
  };

  return (
    <div className="feedback-form">
      <h2>Feedback Form</h2>

      <label onSubmit={handleSubmit}>
      <div>
          <h6>Register Number</h6>
          <input 
            type="text" 
            value={regnum} 
            onChange={(e) => setReg(e.target.value)} 
            required 
            placeholder='Register Number'
          />
        </div>
        <div>
          <h6>Name</h6>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder='Name'
          />
        </div>
        
        <div>
          <h6>Email</h6>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder='Email'
          />
        </div><br/>
        <div>
          <h6>Is bootcamp interactive?</h6>
          <div>
            <label>
              <input 
                type="radio" 
                value="Yes" 
                // checked={isInteractive === 'Yes'} 
                onChange={(e) => setIsInteractive(e.target.value)} 
                required 
              />
              Yes
            </label>
            <label>
              <input 
                type="radio" 
                value="No" 
                // checked={isInteractive === 'No'} 
                onChange={(e) => setIsInteractive(e.target.value)} 
                required 
              />
              No
            </label>
          </div>
        </div>
        <div>
          <h6>Rating</h6>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <h6>Feedback</h6>
          <textarea 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)} 
            required 
            placeholder='Your Feedback'
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </label>
    </div>
  );
};

