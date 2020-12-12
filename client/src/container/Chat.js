import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket
const ENDPOINT = 'http://localhost:3001'//'https://project-chat-application.herokuapp.com/'

const chat = () => {

  const [user, setUser] = useState(localStorage.getItem('user'));
  const [room, setRoom] = useState(localStorage.getItem('room'));

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

        localStorage.setItem('messages', JSON.stringify(newMessages))
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
    <div>
      <form>
        <input
          value={message}
          placeholder='Send a message...'
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          onClick={((event) => sendMessageHandler(event))}
        >Send</button>
      </form>
      <input
        placeholder='Save in localstorage...'
        onChange={(event) => localStorage.setItem('user', event.target.value)}
      />
      <button
        onClick={((event) => sendMessageHandler(event))}
      >Save</button>
      <button
        onClick={() => localStorage.setItem('messages', JSON.stringify(messages))}
      >Show Msg</button>
      <div style={{ height: "200px" }}>
        {messages ?
          messages.map((message, index) => {
            return (
              <p key={index}><strong>{message.username}:</strong> {message.text} @ {message.time}</p>
            )
          }) : null}
      </div>
    </div>
  );
}

export default chat;