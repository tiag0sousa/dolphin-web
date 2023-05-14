import React, { useState } from 'react';
import './App.css';
import { ThemeProvider } from './Theme/ThemeProvider';
import RootComponent from './Components/RootComponent';

function App() {

  return (
    <ThemeProvider>
      <RootComponent />
    </ThemeProvider>
  );
}

export default App;
