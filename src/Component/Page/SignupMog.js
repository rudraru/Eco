// Signupmog.js
import React, { useState } from 'react';
import axios from 'axios';

const Signupmog = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Send POST request to backend endpoint
      const response = await axios.post('http://localhost:3001/signupmog', {
        firstName,
        lastName,
        email,
        password
      });

      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {/* ... form fields */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signupmog;
