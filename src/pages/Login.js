import React, { useState } from 'react';
import '../assets/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Login logic here
    console.log("Logging in with", email, password);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
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

        <button type="submit" className="login-button">Login</button>
        <p>Don’t have an account? <a href="/register">Register here</a>.</p>
      </form>
      
    </div>
  );
};

export default Login;
