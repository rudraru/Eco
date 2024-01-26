import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
`;

const Wrapper = styled.div`
width: 80%; 
max-width: 400px; 
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1``;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 15px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 12px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Radio = styled.input``;

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useNavigate(); // Initialize useHistory
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://node-mysql-api-ta59.onrender.com/api/users', formData);
      console.log('Response:', response.data);
  
      // Set success message
      setSuccess('Registration successful. You can now log in.');
  
      // Clear the form data
      setFormData({
        firstname: '',
        lastname: '',
        phoneNumber: '',
        email: '',
        username: '',
        password: '',
      });

       // Navigate to the login page
       history('/SignIn');
    } catch (error) {
      console.log('Error:', error);
    
  
      if (error.response) {
        console.log('Error response status:', error.response.status);
        console.log('Error response data:', error.response.data);
  
        if (error.response.status === 400) {
          if (error.response.data && error.response.data.error === 'Email already exists') {
            setError('Email is already taken. Please try another email.');
          } else {
            setError('An unexpected error occurred. Please try again.');
          }
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      }
    }
  };
  
  
  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />
          <Input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Agreement>
            <Radio type="radio" />
            By creating an account, you agree to the terms and conditions and give consent to everything in accordance with our{' '}
            <b>privacy policy</b>
          </Agreement>
          <Button type="submit">Create Account</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;