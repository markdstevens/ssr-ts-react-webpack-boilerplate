import React, { FC, StrictMode, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import chiRho from 'images/chi-rho.png';
import { useServerContextStore } from 'stores/platform/server-context-store';

export const PageWrapper: FC = ({ children }) => {
  const [serverContextState] = useServerContextStore();

  useEffect(() => {
    serverContextState.isServerLoad = false;
  }, []);

  return (
    <StrictMode>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/home">
          <img alt="" src={chiRho} width="30" height="30" className="d-inline-block align-top" /> React
        </Navbar.Brand>
      </Navbar>
      <main>{children}</main>
    </StrictMode>
  );
};
