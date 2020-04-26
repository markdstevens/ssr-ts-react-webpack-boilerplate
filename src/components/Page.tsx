import React, { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import chiRho from 'images/chiRho.png';

export const Page: FC = ({ children }) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/home">
      <img alt="" src={chiRho} width="30" height="30" className="d-inline-block align-top" /> React
    </Navbar.Brand>
  </Navbar>
);
