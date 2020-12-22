import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Chat from '../components/Chat/Chat'

let socket
const ENDPOINT = 'http://localhost:3001'//'https://project-chat-application.herokuapp.com/'

const chatWidget = () => {

  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [room, setRoom] = useState(localStorage.getItem('room') || '');

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

    return () =>{ 
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