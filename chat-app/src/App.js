import React, { useState, useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './Theme/ThemeProvider';
import RootComponent from './Components/RootComponent';
import Login from './Components/Login';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './API/firebase';

function App() {

  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {

    setUser(user);
  };

  const handleLogout = async () => {

    try {
      await signOut(auth);
      setUser(null);

    } catch (error) {
      // Error during logout:
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
       setUser(user)
    });

    // Clean subscription when component is dismounted
    return unsubscribe;
  }, []);

  return (
    <ThemeProvider>
      {user ? (
        <RootComponent user={user} handleLogout={handleLogout} />
      ) : (
        <Login handleLoginSuccess={handleLoginSuccess}/>
      )}
      
    </ThemeProvider>
  );
}

export default App;