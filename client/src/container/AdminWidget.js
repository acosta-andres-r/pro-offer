import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from '../components/Chat/Chat'

let socket
// const ENDPOINT = (window.location.href === 'http://localhost:3000') ? 'http://localhost:3001' : 'https://pro-offer.herokuapp.com/'
const ENDPOINT = window.location.protocol + '//' + window.location.host

const adminWidget = () => {

    //   const [user, setUser] = useState('');
    const user = 'admin'
    const [room, setRoom] = useState(localStorage.getItem('room') || 'CHATROOM'); // needs to set up new room
    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState([]);
    const [rooms, setRooms] = useState([]);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

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
        // Message from Server
        socket.on('message', message => {
            // console.log(message);
            // outputMessage(message);
            setMessages(messages => [...messages, message]); // Taking previous messages variable
        })
    }, [])

    useEffect(() => {
        // Join Chatroom
        socket.emit('joinRoom', { user, room })

        // Get room and users
        socket.on('roomUsers', ({ room, users }) => {
            setRoomName(room);
            setUserName([...users]);
        })

        // GET rooms
        socket.on('roomsInfo', ({ rooms }) => {
            // console.log('in rooms info');
            setRooms([...rooms])
        })
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

export default adminWidget;