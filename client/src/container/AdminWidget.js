import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import io from 'socket.io-client';
import Chat from '../components/Chat/Chat'

let socket
// const ENDPOINT = (window.location.href === 'http://localhost:3000') ? 'http://localhost:3001' : 'https://pro-offer.herokuapp.com/'
const ENDPOINT = window.location.protocol + '//' + window.location.host

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({

    root: {
      margin: '16px 15px 10px 15px',
      flexGrow: 2,
  
      display: 'flex',
    //   flexDirection: 'column',
      // alignItems: 'center',
      justifyContent: 'center',
    //   alignContent: 'center',
  
      [theme.breakpoints.down('sm')]: {
        // margin: '16px auto 10px auto',
      }
    },
    title: {
        marginTop: '30px',
        marginLeft: '45px',
        marginBottom: '10px',
        color: "rgba(0, 0, 0, 0.67)",
    
        [theme.breakpoints.down('xs')]: {
          margin: '0 auto 10px auto',
        }
      },
  }));

const adminWidget = () => {
    const classes = useStyles();

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
        <div className={classes.root}>
      <ThemeProvider theme={theme} >
        <Typography
          variant="h3"
          className={classes.title}
        >Admin Chat</Typography>
      </ThemeProvider>
        <Chat
            message={message}
            setMessage={setMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
        />
        </div>
    );
}

export default adminWidget;