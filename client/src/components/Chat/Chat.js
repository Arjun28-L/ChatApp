import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import './Chat.css';
import InfoBar from '../InfoBar/infoBar'
import Input from '../Input/Input'
import Messages from '../Messages/messages'
import TextContainer from '../TextContainer/TextContainer'

let Socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState('');
  const [messages, setMessages] = useState([]);

  const [room, setRoom] = useState('');
  const ENDPOINT = 'http://localhost:5000'; // Add 'http://'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    // Initialize Socket connection
    Socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    Socket.emit('join', { name, room }, () => {

    });
    return () => {
      Socket.disconnect();
      Socket.off();
    };
   
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    Socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    Socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);
  const sendMessage = (e) => {
    e.preventDefault(); 
    if (message) {
      Socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

console.log(message,messages);

  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
       
        
      </div>
      <TextContainer users={users}/>
    </div>
  );
};

export default Chat;