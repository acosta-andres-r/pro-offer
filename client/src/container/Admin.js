import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket
// const ENDPOINT = 'http://localhost:3001'//'https://project-chat-application.herokuapp.com/'
const ENDPOINT = (window.location.href === 'http://localhost:3001') ? 'http://localhost:3001' : 'https://pro-offer.herokuapp.com/'

const chat = () => {

    //   const [user, setUser] = useState('');
    const user = 'admin'
    const [room, setRoom] = useState(localStorage.getItem('room')); // needs to set up new room
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
            console.log(message);
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
            console.log('in rooms info');
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
        <div>
            <ul>
                {rooms.map((room, index) => <li key={index}>{room}</li>)}
            </ul>
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
                onClick={() => console.log('rooms', rooms)}
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