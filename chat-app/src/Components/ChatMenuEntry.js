import '../css/chatMenuEntry.css'

const ChatMenuEntry = ({ config, onClick }) => {
    
    const divClassName = config.selected ? "chat-menu-entry selected" : "chat-menu-entry"

    const handleClick = () => {
        onClick(config.name);
    };

    return (
        <div className={ divClassName } onClick={handleClick}>
            <img src={ config.image } alt="name" className="user-image" />
            <div className="user-info">
                <b className="user-name">{ config.name }</b>
                <p className="user-last-message">{ config.message }</p>
            </div>
        </div>
    );
};

export default ChatMenuEntry;
