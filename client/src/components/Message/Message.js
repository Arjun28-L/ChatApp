import './Message.css'
import React from 'react'
import { Picker, Emoji } from 'emoji-picker-react'

const Message = ({message: {user, text}, name}) => {
    const trimmedName = name.trim().toLowerCase();
    const isSentByCurrentUser = user === trimmedName;

    // Function to convert emoji shortcode to emoji
    const convertToEmoji = (text) => {
        // Assuming text contains emoji shortcodes like :smile:
        return text.split(' ').map(word => {
            if (word.startsWith(':') && word.endsWith(':')) {
                // Convert shortcode to emoji
                return <Emoji key={word} emoji={{ id: word.slice(1, -1) }} size={24} />;
            }
            return word + ' ';
        });
    };

    return (
        <div className={`messageContainer ${isSentByCurrentUser ? '' : 'justifyStart'}`}>
            {isSentByCurrentUser ? (
                <>
                    <p className='sentText pr-10'>{trimmedName}</p>
                    <div className='messageBox backgroundBlue'>
                        <p className='messageText colorWhite'>{convertToEmoji(text)}</p>
                    </div>
                </>
            ) : (
                <>
                    <div className='messageBox backgroundLight'>
                        <p className='messageText colorDark'>{convertToEmoji(text)}</p>
                    </div>
                    <p className='sentText pl-10'>{convertToEmoji(user)}</p>
                </>
            )}
        </div>
    )
}

export default Message
