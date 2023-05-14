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
    backgroundColor: '#222',
    color: 'white',
    borderRadius: '20px',
    position: 'relative'
  },
  cardRight: {
    marginLeft: '10px',
    marginRight: '10px',
    backgroundColor: '#c2c4c9',
    borderRadius: '20px',
    position: 'relative'
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
                <Typography variant="body2">
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
