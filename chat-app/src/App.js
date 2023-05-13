import './App.css';
import ChatContainer from './Components/ChatContainer';
import ChatMenu from './Components/ChatMenu';

function App() {

  return (
    <div style={{ display: "flex" }}>
      <ChatMenu/>
      <ChatContainer/>
    </div>
  );
}

export default App;
