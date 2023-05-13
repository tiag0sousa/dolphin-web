import logo from '../Assets/FF.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chatMenu: {
        height: '100vh - 40px',
        width: '100px',
        backgroundColor: 'white',
        boxShadow: '2px 0 4px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        padding: '20px 0px'
    },
    logo: {
        width: '60px',
        height: '60px'
    }
}))

const ChatMenu = () => {
    
    const classes = useStyles();
  
    return (
        <div className={classes.chatMenu}>
            <img src={logo} alt="Logo" className={classes.logo} />
        </div>
    );
};

export default ChatMenu;
