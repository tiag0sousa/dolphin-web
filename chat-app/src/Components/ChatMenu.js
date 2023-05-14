import React, { useContext }  from 'react';
import ChatMenuEntry from './ChatMenuEntry';
import serverIcon from '../Assets/server_icon.jpeg';
import MessageType from '../Models/MessageType';
import { ThemeContext } from '../Theme/ThemeProvider';
import '../css/chatMenu.css';


const ChatMenu = ({ chatMessages, selectedServer, onChatMenuEntryClick }) => {

    const { darkMode } = useContext(ThemeContext);
  
    const stableMessages = chatMessages["Stable"].messages.filter(message => message.type === MessageType.TEXT)
    const exploratoryMessages = chatMessages["Exploratory"].messages.filter(message => message.type === MessageType.TEXT)

    const stableConfig = {
        name: "Stable",
        message: stableMessages[stableMessages.length - 1].message,
        image: serverIcon,
        selected: selectedServer === 'Stable'
    }

    const exploratoryConfig = {
        name: "Exploratory",
        message: stableMessages[exploratoryMessages.length - 1].message,
        image: serverIcon,
        selected: selectedServer === 'Exploratory'
    }

    return (
        <div className={darkMode ? 'chatMenu dark' : 'chatMenu'}>
            <ChatMenuEntry config={stableConfig} onClick={onChatMenuEntryClick} />
            <ChatMenuEntry config={exploratoryConfig} onClick={onChatMenuEntryClick} />
        </div>
    );
};

export default ChatMenu;
