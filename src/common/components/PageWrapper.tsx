import React, { FC, StrictMode } from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#249081',
      main: '#00695B',
      dark: '#003830'
    },
    secondary: {
      light: '#315798',
      main: '#0A306F',
      dark: '#02173B'
    }
  }
});

export const PageWrapper: FC = ({ children }) => (
  <StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <main>{children}</main>
      </ThemeProvider>
    </CssBaseline>
  </StrictMode>
);
