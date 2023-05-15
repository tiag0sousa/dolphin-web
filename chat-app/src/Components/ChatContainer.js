import React, { useState, useContext } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { sendMessage } from '../API/chatAPI';
import { searchProducts } from '../API/ECAPI';
import MessageType from '../Models/MessageType';
import ffLogo from '../Assets/ff_logo.png';
import '../css/chatContainer.css';
import { ThemeContext } from '../Theme/ThemeProvider';

const ChatContainer = ({ chatMessages, currentServer, sessionIds, handleAddMessage, handleHideTyping }) => {

    const currentMessages = chatMessages[currentServer].messages

    const [text, setText] = useState('');
    const { darkMode } = useContext(ThemeContext);

    const fetchProducts = async(productIds) => {

        // Add typing:
        let typingMessage = { 
            type: MessageType.TEXT,
            user: {
                name: "FF",
                avatarUrl: ffLogo
            },
            message: "is typing...",
            alignRight: false,
            isTyping: true
         }

         handleAddMessage(typingMessage)

        const result = await searchProducts(productIds)

        // Hide is typing:
        handleHideTyping()

        let message = {
            type: MessageType.PRODUCTS,
            user: {
                name: "FF",
                avatarUrl: ffLogo
            },
            products: result.products.entries
        }

        handleAddMessage(message)
    };

    const fetchData = async (textMessage) => {
        try {

            let data = {
                message: textMessage,
                sessionId: sessionIds[currentServer]
            }

          const result = await sendMessage(data, currentServer);

          // Hide isTyping:
          handleHideTyping()

          // Add message
          let message = {
            type: MessageType.TEXT,
            user: {
                name: "FF",
                avatarUrl: ffLogo
            },
            message: result.message,
            alignRight: false,
            isTyping: false
            }
            handleAddMessage(message)

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

        // Add message:
        handleAddMessage(message)

        // Add typing:
        let typingMessage = { 
            type: MessageType.TEXT,
            user: {
                name: "FF",
                avatarUrl: ffLogo
            },
            message: "is typing...",
            alignRight: false,
            isTyping: true
         }

         handleAddMessage(typingMessage)

        fetchData(text);
        setText("")
    };

    return (
        <div className={darkMode ? 'chatContainer dark' : 'chatContainer'}>
            <MessageList messages={currentMessages} />
            <ChatInput performSearch={performSearch} handleChange={handleChange} text={text} />   
        </div>
    );
  };
  
  export default ChatContainer;