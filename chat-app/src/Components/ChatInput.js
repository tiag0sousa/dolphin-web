import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ArrowCircleUpSharpIcon from '@mui/icons-material/ArrowCircleUpSharp';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    chatInput: {
        position: 'sticky',
        bottom: 0,
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
      },
    input: {
      color: "white",
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        color: "lightgray"
      },
      background: 'grey',
      borderRadius: '30px'
    }
  }));

const ChatInput = ({ handleChange, performSearch, text}) => {

  const classes = useStyles();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className={classes.chatInput}>
      <TextField 
        value={text} 
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        placeholder="Type here..."
        variant="outlined"
        fullWidth
        InputProps={{
            className: classes.input,
          }}
      />
      <IconButton 
        style={{ padding: '0px 0px 0px 10px'}}
        onClick={performSearch} 
        color="primary">
            <ArrowCircleUpSharpIcon style={{ color: 'grey', fontSize: '50px' }} />
      </IconButton>
    </div>
  );
};

export default ChatInput;
