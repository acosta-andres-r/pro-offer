import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Chat from '../components/Chat/Chat'

let socket
// const ENDPOINT = (window.location.href === 'http://localhost:3000') ? 'http://localhost:3001' : 'https://pro-offer.herokuapp.com/'
const ENDPOINT = window.location.protocol + '//' + window.location.host

const chatWidget = () => {

  const [user, setUser] = useState('NEW USER');
  const [room, setRoom] = useState('CHATROOM');

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')))

  // console.log(ENDPOINT);

  useEffect(() => {
    socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd'
      }
    })

    return () => {
      localStorage.removeItem('messages')
    }

  }, [ENDPOINT])

  useEffect(() => {
    // Receive user and room
    console.log("user", user);
    console.log("room", room);
    if (!user || !room) {
      socket.on('creation', ({ user, room }) => {
        localStorage.setItem('user', user)
        localStorage.setItem('room', room)
        setUser(user)
        setRoom(room)
      })
    }

    // Message from Server
    socket.on('message', message => {
      console.log(message);
      // outputMessage(message);
      setMessages(messages => {
        const newMessages = messages ?
          (messages[0].username === message.username
            && messages[0].text === message.text) ?
            [...messages] : [...messages, message] : [message]

        // localStorage.setItem('messages', JSON.stringify(newMessages))
        return newMessages;
      }); // Taking previous messages variable
    })

    // Join Chatroom
    console.log(user);
    socket.emit('joinRoom', { user, room })

  }, [])

  // Chat Message
  const sendMessageHandler = (event) => {
    event.preventDefault();

    if (message) {
      // Emitting message to server
      socket.emit('chatMessage', message, () => setMessage(''));
    }
  }

  return (
    <Chat
      message={message}
      setMessage={setMessage}
      sendMessageHandler={sendMessageHandler}
      messages={messages}
    />
  );
}

export default chatWidget;