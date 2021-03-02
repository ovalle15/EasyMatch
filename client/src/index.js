
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styled from 'styled-components';
const RootStyles = styled.div`
  /* max-height: 100vh; */
  height: 100%;
  width: 100vw
`;

ReactDOM.render(
  <RootStyles>
    <App />
  </RootStyles>,
  document.getElementById('root')
)
