import React, { useState, useContext } from 'react';
import ChatInput from './ChatInput';
import MessageList from './MessageList';
import { sendMessage } from '../API/chatAPI';
import { searchProducts } from '../API/ECAPI';
import MessageType from '../Models/MessageType';
import ffLogo from '../Assets/ff_logo.png';
import userLogo from '../Assets/user_logo.png';
import '../css/chatContainer.css';
import { ThemeContext } from '../Theme/ThemeProvider';

const ChatContainer = ({ chatMessages, currentServer, sessionIds, handleAddMessage, handleHideTyping, handleInputLock }) => {

    const currentMessages = chatMessages[currentServer].messages
    const inputDisabled = chatMessages[currentServer].waitingAnswer

    const [text, setText] = useState('');
    const { darkMode } = useContext(ThemeContext);

    const fetchProducts = async(productIds) => {

        try {
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

            // Enable input:
            handleInputLock(false)

        } catch (e) {

            handleHideTyping()
            handleAddMessage(errorMessage(e));
            handleInputLock(false)
        }
    };

    const fetchData = async (textMessage) => {
        try {

            // Disable input:
            handleInputLock(true)

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

          if (result.productIds !== undefined && result.productIds != null && result.productIds.length > 0) {

            fetchProducts(result.productIds)

          } else {

            // Enable input:
            handleInputLock(false)
          }

        } catch (e) {

          handleHideTyping()
          handleAddMessage(errorMessage(e));
          handleInputLock(false)
        }
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const performSearch = () => {

        // Only allow new search if input is enabled:
        if (inputDisabled ===  false) {

            // Update UI:
            let message = {
                type: MessageType.TEXT,
                user: {
                    name: "User",
                    avatarUrl: userLogo
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
        }
    };

    function errorMessage(error) {

        let message = {
            type: MessageType.TEXT,
            user: {
                name: "FF",
                avatarUrl: ffLogo
            },
            message: "Apologies, but what you are looking for is currently unavailable. Please try again later.\n" + error,
            alignRight: false,
            isTyping: false
        }

        return message
    }

    return (
        <div className={darkMode ? 'chatContainer dark' : 'chatContainer'}>
            <MessageList messages={currentMessages} />
            <ChatInput performSearch={performSearch} handleChange={handleChange} text={text} isDisabled={inputDisabled} />   
        </div>
    );
  };
  
  export default ChatContainer;