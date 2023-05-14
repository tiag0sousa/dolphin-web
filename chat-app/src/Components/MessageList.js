import ChatLine from './ChatLine';
import { makeStyles } from '@material-ui/core/styles';
import MessageType from '../Models/MessageType';
import ProductList from './ProductList';

const useStyles = makeStyles((theme) => ({
    chatList: {
      flex: 1,
      overflowY: 'auto',
      padding: '40px 20px'
    }
}))

const MessageList = ({ messages }) => {

    const classes = useStyles();

    return (
        <div className={classes.chatList}>
            {
                messages.map((item, index) => {
                    switch(item.type) {

                        case MessageType.TEXT:
                            return <ChatLine key={index} user={item.user} message={item.message} alignRight={ item.alignRight } isTyping={item.isTyping} />

                        case MessageType.PRODUCTS:
                            return <ProductList key={index} products={item.products} />

                        default:
                            return ""
                    }
                  })
            }
        </div>
    );
};

export default MessageList;
