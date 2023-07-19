import React, { useState } from 'react';
import Navbar from './navbar';
import './leaveForm.css';

const LeaveForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!startDate) newErrors.startDate = 'Start date is required';
    if (!endDate) newErrors.endDate = 'End date is required';
    if (!reason) newErrors.reason = 'Reason is required';
    if (!file) newErrors.file = 'Supporting documents are required';

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Rest of the code for form submission

    // Display an alert message
    window.alert('Form submitted successfully!');
    window.location.href = '/leave';
  };

  return (
    <div>
      <Navbar />
      <div className='form-bgs'>
        <div className='form-containers'>
          <form onSubmit={handleSubmit}>
            <center>
              <h2>Leave Form</h2>
            </center>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              {errors.startDate && <span className="errors">{errors.startDate}</span>}
            </label>
            <br />
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              {errors.endDate && <span className="errors">{errors.endDate}</span>}
            </label>
            <br />
            <label>
              Reason:
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              {errors.reason && <span className="errors">{errors.reason}</span>}
            </label>
            <br />
            <label>
              Supporting Documents:
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              {errors.file && <span className="errors">{errors.file}</span>}
            </label>
            <br />
            <center>
              <button className="submit-buttons" type='submit'>Submit</button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveForm;
