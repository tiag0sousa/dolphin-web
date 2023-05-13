import React, { useState } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { makeStyles } from '@material-ui/core/styles';
import { sendMessage } from '../API/chatAPI';
import { searchProducts } from '../API/ECAPI';
import MessageType from '../Models/MessageType';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100vh'
    }
}));

const ChatContainer = () => {

    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    const classes = useStyles();

    const fetchProducts = async(productIds) => {

        // Add typing:
        let typingMessage = { 
            type: MessageType.TEXT,
            user: {
                name: "FF",
                avatarUrl: 'https://play-lh.googleusercontent.com/K7ZtNUsaBydbZXFUYjpvf54KCxC3WyNPw4hs59ktYl5_KrgJB24IKX2hWe2St30J1A'
            },
            message: text,
            alignRight: false,
            isTyping: true
         }

         setMessages(prevMessages => [...prevMessages, typingMessage]);

        // ------------ DEBUG ------------
        const result = await searchProducts(productIds)
        console.log("⬇️ " + JSON.stringify(result))
        // ------------------------------------

        // Hide is typing:
        setMessages(prevMessages => prevMessages.filter(message => !message.isTyping));

        let message = {
            type: MessageType.PRODUCTS,
            user: {
                name: "FF",
                avatarUrl: 'https://play-lh.googleusercontent.com/K7ZtNUsaBydbZXFUYjpvf54KCxC3WyNPw4hs59ktYl5_KrgJB24IKX2hWe2St30J1A'
            },
            products: result.products.entries
        }
            
        setMessages(prevMessages => [...prevMessages, message]);
    };

    const fetchData = async (textMessage) => {
        try {

            let data = {
                message: textMessage,
                sessionId: "123456"
            }

          // ------------ DEBUG ------------
          console.log("🚀 " + JSON.stringify(data))
          const result = await sendMessage(data);
          console.log("⬇️ " + JSON.stringify(result))
          // ------------------------------------

          // Hide isTyping:
          setMessages(prevMessages => prevMessages.filter(message => !message.isTyping));

          // TODO: add message
          let message = {
            type: MessageType.TEXT,
            user: {
                name: "FF",
                avatarUrl: 'https://play-lh.googleusercontent.com/K7ZtNUsaBydbZXFUYjpvf54KCxC3WyNPw4hs59ktYl5_KrgJB24IKX2hWe2St30J1A'
            },
            message: result.message,
            alignRight: false,
            isTyping: false
            }
            setMessages(prevMessages => [...prevMessages, message]);


          if (result.productIds !== undefined) {

            fetchProducts(result.productIds)
          }

        } catch (e) {

          console.error(e);
        }
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const performSearch = () => {

        // Update UI:
        let message = {
            type: MessageType.TEXT,
            user: {
                name: "User",
                avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBgZbchuTiUtA3Egi1arN4BEQeoTaUtutQ8A&usqp=CAU'
            },
            message: text,
            alignRight: true,
            isTyping: false
        }

        setMessages(prevMessages => [...prevMessages, message]);

        // Add typing:
        let typingMessage = { 
            type: MessageType.TEXT,
            user: {
                name: "FF",
                avatarUrl: 'https://play-lh.googleusercontent.com/K7ZtNUsaBydbZXFUYjpvf54KCxC3WyNPw4hs59ktYl5_KrgJB24IKX2hWe2St30J1A'
            },
            message: text,
            alignRight: false,
            isTyping: true
         }

         setMessages(prevMessages => [...prevMessages, typingMessage]);

        fetchData(text);
        setText("")
    };

    return (
        <div className={classes.root}>
            <MessageList messages={messages} />
            <ChatInput performSearch={performSearch} handleChange={handleChange} text={text} />   
        </div>
    );
  };
  
  export default ChatContainer;