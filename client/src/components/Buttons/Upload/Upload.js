import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    alignText: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input: {
    display: 'none',
  },
  button: {
    backgroundColor: "#4C6B71"
  }
}));

export default function UploadButtons( props ) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={props.handleUploadClick}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          component="span"
          color="secondary"
          style={{ background: '#4C6B71', opacity: "85%" }}
        >
          Upload
        </Button>
      </label>
      <label>
        <Button
          variant="contained"
          color="secondary"
          style={{ background: '#4C6B71', opacity: "85%" }}
          onClick={props.handleDeleteClick}>Delete</Button>
      </label>
    </div>
  );
}