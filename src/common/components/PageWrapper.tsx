import React, { FC, StrictMode } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import chiRho from 'images/chi-rho.png';

export const PageWrapper: FC = ({ children }) => (
  <StrictMode>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/home">
        <img alt="" src={chiRho} width="30" height="30" className="d-inline-block align-top" />{' '}
        React
      </Navbar.Brand>
    </Navbar>
    <main>{children}</main>
  </StrictMode>
);
