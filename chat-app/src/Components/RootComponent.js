import React, { useState, useContext }  from 'react';
import { ThemeContext } from '../Theme/ThemeProvider';
import NavBar from './NavBar';
import ChatMenu from './ChatMenu';
import ChatContainer from './ChatContainer';
import ffLogo from '../Assets/ff_logo.png';
import MessageType from '../Models/MessageType';

function RootComponent({ user, handleLogout }) {

  const { darkMode } = useContext(ThemeContext);

  const generateRandomString = (length = 5) => {
    return Math.random().toString(36).substr(2, length);
  };

  const [sessionIds, setSessionsIds] = useState({
    'Stable': generateRandomString(10),
    'Exploratory': generateRandomString(10)
  });

  const [selectedServer, setSelectedServer] = useState('Stable');
  const [serverMessages, setServerMessages] = useState({
    'Stable': {
      'messages': [
        { 
          type: MessageType.TEXT,
          user: {
              name: "FF",
              avatarUrl: ffLogo
          },
          message: "Welcome! I'm your personal fashion advisor, here to help you discover your unique style and assist you in making the perfect wardrobe choices for any occasion. What can I do for you?",
          alignRight: false,
          isTyping: false
       }
      ],
      'sessionId': sessionIds["Stable"],
      'waitingAnswer': false
    },
    'Exploratory': {
      'messages': [
        { 
          type: MessageType.TEXT,
          user: {
              name: "FF",
              avatarUrl: ffLogo
          },
          message: "Welcome! I'm your personal fashion advisor, here to help you discover your unique style and assist you in making the perfect wardrobe choices for any occasion. What can I do for you?",
          alignRight: false,
          isTyping: false
       }
      ],
      'sessionId': sessionIds["Exploratory"],
      'waitingAnswer': false
    }
  });

  const handleChatMenuEntryClick = (id) => {
    setSelectedServer(id)
  };

  const handleAddMessage = (message) => {

    let newServerMessages = {...serverMessages};
    newServerMessages[selectedServer].messages.push(message);
    setServerMessages(newServerMessages);
  };

  const handleInputLock = (status) => {

    let newServerMessages = {...serverMessages};
    newServerMessages[selectedServer].waitingAnswer = status
    setServerMessages(newServerMessages);
  }

  const handleHideTyping = () => {

    let newServerMessages = {...serverMessages};
    newServerMessages[selectedServer].messages = newServerMessages[selectedServer].messages.filter(message => !message.isTyping)
    setServerMessages(newServerMessages);
  }

  return (
    <div className={darkMode ? 'root dark' : 'root'}>
        <NavBar user={user} handleLogout={handleLogout} />
        <div className={darkMode ? 'content dark' : 'content'}>
          <ChatMenu 
            chatMessages={serverMessages} 
            selectedServer={selectedServer} 
            onChatMenuEntryClick={handleChatMenuEntryClick}
            />
          <ChatContainer 
            chatMessages={serverMessages} 
            currentServer={selectedServer}
            sessionIds={sessionIds}
            handleAddMessage={handleAddMessage}
            handleHideTyping={handleHideTyping}
            handleInputLock={handleInputLock}/>
        </div>
    </div>
  );
}

export default RootComponent;
