import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledLoader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spinAnimation} 1s linear infinite;
`;

const Loader = () => {
  return <StyledLoader />;
};

export default Loader;