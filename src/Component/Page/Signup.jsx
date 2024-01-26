// Signup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createUser from '../api/Api';
import './Signup.css';
import BackgroundImage from './Videobackground';

const Signup = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if email already exists
 

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => {
        setError('');
      }, 4000);
      return;
    }

    const newUser = await createUser(name, email, password);
    setUsers(prevUsers => [...prevUsers, newUser]);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);

      history('/SignIn');

      history('/');

    }, 4000);
  };

  return (

      <div className="signup-container">
        <h1>Signup</h1>

        {error && <p className="error">{error}</p>}

        {success && (
          <div className="success-popup">
            <p>Signup successful! Redirecting to LogIn page ...</p>
            {/* You may want to replace this text with an actual redirect or link */}
            <p>Signup successful! Redirecting to home page...</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" value={name} onChange={event => setName(event.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} required />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} required />
          <button type="submit">Submit</button>
        </form>
      </div>

  );
};

export default Signup;
