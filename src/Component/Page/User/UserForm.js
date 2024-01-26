
import React, { useState } from 'react';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:10000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('User data sent successfully:', data);
    })
    .catch(error => {
      console.error('Error sending user data:', error);
    });
  };

  return (
    <div>
      <h1>User-Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        <br />
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
        <br />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        <br />
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserForm;
