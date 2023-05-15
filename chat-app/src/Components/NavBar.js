import React, { useContext }  from 'react';
import logo from '../Assets/FF.png';
import '../css/navbar.css';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import IconButton from '@material-ui/core/IconButton';
import { ThemeContext } from '../Theme/ThemeProvider';

function NavBar({ user, handleLogout }) {

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? 'navbar dark' : 'navbar'}>
        <img src={logo} alt="Logo" class="navbar-logo" />
        <div class="navbar-items">
            <div class="navbar-item">

                <span>{user.email}</span>
                <IconButton 
                  className="icon"
                  onClick={handleLogout}
                  >
                      <PowerSettingsNewIcon 
                      />
                </IconButton>
            </div>
        </div>
    </div>
  );
}

export default NavBar;
