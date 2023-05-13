import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../css/typingIndicator.css';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    marginBottom: '20px'
  },
  cardLeft: {
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '20px',
    position: 'relative',
    '&:before': {
      content: '""',
      width: '0px',
      height: '0px',
      position: 'absolute',
      borderLeft: '15px solid transparent',
      borderRight: '15px solid black',
      borderTop: '15px solid black',
      borderBottom: '0px solid transparent',
      left: '-15px',
      top: '10px',
    }
  },
  cardRight: {
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor: 'gray',
    borderRadius: '20px',
    position: 'relative',
    '&:after': {
      content: '""',
      width: '0px',
      height: '0px',
      position: 'absolute',
      borderLeft: '15px solid gray',
      borderRight: '15px solid transparent',
      borderTop: '15px solid gray',
      borderBottom: '0px solid transparent',
      right: '-15px',
      top: '10px',
    }
  }
});

const ChatLine = ({ user, message, alignRight, isTyping }) => {
  const classes = useStyles({ alignRight });

  const divStyle = {
    justifyContent: alignRight ? 'flex-end' : 'flex-start'
  }

  return (
    <div className={classes.root} style={divStyle}>
      {!alignRight && <Avatar alt={user.name} src={user.avatarUrl} />}
      <Card className={alignRight ? classes.cardRight : classes.cardLeft}>
        <CardContent style={{ paddingBottom: '16px' }}>
          
            {!isTyping && 
                <Typography variant="body1">
                    { message }
                </Typography>
            }
            {isTyping &&
                <div className="typing-indicator">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
        </CardContent>
      </Card>
      {alignRight && <Avatar alt={user.name} src={user.avatarUrl} />}
    </div>
  );
};

export default ChatLine;
