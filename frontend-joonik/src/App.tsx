import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Locations from './components/Locations';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Locations />
    </ThemeProvider>
  );
}

export default App;
