import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';
import Loader from './Loader';
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: aliceblue;
`;

const Wrapper = styled.div`
  width: 70%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 15px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 5px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { loginUser } = useUser();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('https://node-mysql-api-ta59.onrender.com/api/login', {
        username,
        password,
      });

      console.log('Login API Response:', response.data);

      const { success, message, user } = response.data;

      if (success) {
        if (user && user.id && user.email) {
          // Extracting user information
          const { id, username, email } = user;

          console.log('User ID:', id);
          console.log('Username:', username);
          console.log('Email:', email);
          // Update user state through context
          loginUser({ userId: id, username ,email});

          setSuccessMessage(message);
          setErrorMessage('');

          // Navigating HomePage
          history('/fruits');
        } else {
          console.error('User information is missing in the response.');
          setErrorMessage('Invalid user information. Please try again.');
          setSuccessMessage('');
        }
      } else {
        console.error('Login failed:', message);
        setErrorMessage(message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        console.log('Error response from server:', error.response.data);
      }

      setErrorMessage('Invalid credentials. Please check your username and password.');
      setSuccessMessage('');
    } finally {
      setLoading(false); // Set loading to false after the authentication process is complete
    }
  };
  
  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button type="submit" disabled={loading}>
            {loading ? <Loader /> : 'Login'}
          </Button>
          <Link>Forgot Password</Link>
          <Link to="/register">Create Account</Link>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LogIn;