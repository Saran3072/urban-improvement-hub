import React, { useState } from 'react';
import '../assets/ReportIssue.css';

const ReportIssue = ({ userEmail }) => {

  console.log(userEmail)

  const [reportType, setReportType] = useState('authority'); // Default: Report to authorities
  const [category, setCategory] = useState('');
  const [issue, setIssue] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [photo, setPhoto] = useState(null);
  const [alertLevel, setAlertLevel] = useState(''); // New state for alert seriousness level

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reportData = {
      email: userEmail, // Include user email here
      type: reportType,
      category,
      issue,
      description,
      location: location === 'Other' ? customLocation : location,
      photo,
      alertLevel: reportType === 'community' ? alertLevel : undefined, // Include alert level only if community alert
    };

    try {
      const response = await fetch("https://urban-backend-rs5i.onrender.com/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        // Clear form or provide other feedback as necessary
      } else {
        const errorData = await response.json();
        alert(errorData.detail);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="report-container">
      <h2>Report an Issue</h2>
      <form onSubmit={handleSubmit} className="report-form">
        
        <label>Report Type</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="authority"
              checked={reportType === 'authority'}
              onChange={() => setReportType('authority')}
            />
            Report to Authorities
          </label>
          <label>
            <input
              type="radio"
              value="community"
              checked={reportType === 'community'}
              onChange={() => setReportType('community')}
            />
            Alert Community
          </label>
        </div>

        {reportType === 'authority' && (
          <>
            <label>Issue Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              <option value="Roads">Roads</option>
              <option value="Electricity">Electricity</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Waste Management">Waste Management</option>
            </select>
          </>
        )}

        {reportType === 'community' && (
          <>
            <label>Alert Seriousness Level</label>
            <select value={alertLevel} onChange={(e) => setAlertLevel(e.target.value)} required>
              <option value="">Select Seriousness Level</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </>
        )}

        <label>Issue</label>
        <textarea
          placeholder="Name the issue..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Location</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)} required>
          <option value="">Select Location</option>
          <option value="Kukatpally">Kukatpally</option>
          <option value="Ameerpet">Ameerpet</option>
          <option value="Jubilee Hills">Jubilee Hills</option>
          <option value="Kompally">Kompally</option>
          <option value="Gachibowli">Gachibowli</option>
          <option value="Madhapur">Madhapur</option>
          <option value="Other">Other</option>
        </select>
        {location === 'Other' && (
          <input
            type="text"
            placeholder="Enter your location"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            required
          />
        )}

        <label>Photo (Optional)</label>
        <input type="file" onChange={handlePhotoChange} />
        {photo && <img src={photo} alt="Preview" className="photo-preview" />}

        <button type="submit" className="submit-button">
          {reportType === 'authority' ? 'Submit to Authorities' : 'Send Alert'}
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
