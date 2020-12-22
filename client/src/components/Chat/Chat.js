import React, { useState, useRef, useEffect } from 'react';

import classes from './Chat.module.css'

import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
      background: 'white',
      borderRadius: '5px',
      display: 'flex',
    },
    width: '310px',
    flexGrow: 1,
  },
  interaction: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    flexGrow: 1,
  },
  textField: {
    marginLeft: '5px',
    flexGrow: 1,
    boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.2)',
  },
  button: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.08),
    marginRight: '5px',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 0,
    width: '30px',
    borderRadius: '5px 10px 10px 5px',
  },
  liveChatBtn: {
    margin: '20px',
    width: '30px',
    borderRadius: '30px',
  }
}));

const chat = (props) => {
  const classesUI = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const messageEl = useRef(null);
  
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [messageEl])

  // const [message, setMessage] = useState('')
  // const messages = [
  //   { username: "ChatCord Bot", text: "Test 1", time: "8:30 am" },
  //   { username: "user1", text: "Test 2", time: "8:30 am" },
  //   { username: "user1", text: "Test 3", time: "8:31 am" },
  //   { username: "admin", text: "Test 4", time: "8:31 am" },
  // ]

  const mineMSG = (mine, index) => { // 'ADMIN'
    return (
      <div className={`${classes.mine} ${classes.messages}`} key={index}>
        <div className={`${classes.message} ${classes.last}`}>
          {mine}
        </div>
      </div>
    )
  };

  const yoursMSG = (yours, index) => {
    return (
      <div className={`${classes.yours} ${classes.messages}`} key={index}>
        <div className={`${classes.message} ${classes.last}`}>
          {yours}
        </div>
      </div>
    )
  };

  return (
    <div className={classes.chatContainer}>
      <div
        className={`${classes.container} ${isOpen ? classes.open : classes.close}`}
      >
        <div className={classes.header}>
          <IconButton
            aria-label="close"
            color="secondary"
            className={classes.closeBtn}
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {/* CHAT */}
        <div className={classes.chatBody}>
          <div className={`${classes.chat} message`} ref={messageEl}>
            {/* <div className={`${classes.mine} ${classes.messages}`}>
              <div className={`${classes.message} ${classes.last}`}>Dude</div>
            </div>
            <div className={`${classes.yours} ${classes.messages}`}>
              <div className={classes.message}>Hey!</div>
              <div className={`${classes.message} ${classes.last}`}>You there?</div>
              <div className={`${classes.message} ${classes.last}`}>Hello, how's it going?</div>
            </div> */}
            {props.messages ? 
            props.messages.map((message, index) => {
              if (message.username === 'admin' || message.username === 'ChatCord Bot') {
                return mineMSG(message.text, index)
              } else {
                return yoursMSG(message.text, index)
              }
            }) : null}

          </div>
        </div>
        {/* TEXTFIELD */}
        <form className={classesUI.root} noValidate autoComplete="off">
          <div className={classesUI.interaction}>
            <TextField
              id="outlined-multiline-flexible"
              // label="Type..."
              size="small"
              multiline
              rows={2}
              variant="outlined"
              className={classesUI.textField}
              value={props.message}
              onChange={(event) => { props.setMessage(event.target.value) }}
            />
            <Button
              variant="contained"
              color="primary"
              className={classesUI.button}
              onClick={((event) => props.sendMessageHandler(event))}
            // endIcon={}
            >
              <SendIcon />
            </Button>
          </div>
        </form>
      </div>

      {/* Live Chat Button */}
      <Button
        variant="contained"
        color="primary"
        className={classesUI.liveChatBtn}
        onClick={() => { setIsOpen(true) }}
        disabled={isOpen}
      >
        Live Chat
      </Button>
    </div>
  )
};

export default chat;