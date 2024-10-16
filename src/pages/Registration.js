import React, { useState } from 'react';
import '../assets/Registration.css';
import { validateEmail, validatePassword } from '../utils/validationUtils';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Citizen');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const navigate = useNavigate();

  const locations = ["Kukatpally", "Ameerpet", "Jubilee Hills", "Kompally", "Gachibowli", "Madhapur"]; // Predefined locations

  const handleSubmit = async (e) => {
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

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        // Redirect to login page or clear form after successful registration
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(errorData.detail); // Shows error message if email already exists
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
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