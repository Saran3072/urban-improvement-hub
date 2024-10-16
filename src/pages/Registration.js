import React, { useState } from 'react';
import '../assets/Registration.css';
import { validateEmail, validatePassword } from '../utils/validationUtils';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Citizen');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');

  const locations = ["Kukatpally", "Ameerpet", "Jubilee Hills", "Kompally", "Gachibowli", "Madhapur"]; // Predefined locations

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!validatePassword(password)) {
      alert("Password must be at least 8 characters, include a number, uppercase letter, and special character.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }


    const registrationData = {
      name,
      email,
      password,
      role,
      phone,
      location: location === "Other" ? customLocation : location,
    };

    console.log("Registration Data: ", registrationData);
    // Here, you would typically send registrationData to your backend API
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="Citizen">Citizen</option>
          <option value="City Official">City Official</option>
        </select>

        <input
          type="tel"
          placeholder="Phone Number (Optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <select value={location} onChange={(e) => setLocation(e.target.value)} required>
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
          <option value="Other">Other</option>
        </select>

        {location === "Other" && (
          <input
            type="text"
            placeholder="Enter your location"
            value={customLocation}
            onChange={(e) => setCustomLocation(e.target.value)}
            required
          />
        )}

        <button type="submit" className="register-button">Register</button>
        <p>Already have an account? <a href="/login">Login here</a>.</p>
      </form>
      
    </div>
  );
};

export default Registration;