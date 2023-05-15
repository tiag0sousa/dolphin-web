import React, { useContext }  from 'react';
import logo from '../Assets/FF.png';
import '../css/navbar.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@material-ui/core/IconButton';
import { ThemeContext } from '../Theme/ThemeProvider';

function NavBar() {

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? 'navbar dark' : 'navbar'}>
        <img src={logo} alt="Logo" class="navbar-logo" />
        <span>FARFETCH Assistant</span>
        <div class="navbar-items">
            <div class="navbar-item">
                <IconButton 
                  onClick={() => setDarkMode(!darkMode)} 
                  className="icon"
                  >
                      {darkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
                </IconButton>
            </div>
        </div>
    </div>
  );
}

export default NavBar;
