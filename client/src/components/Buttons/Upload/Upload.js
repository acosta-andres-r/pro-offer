import React from 'react';
import API from '../../../utils/API'
import FormData from 'form-data'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButtons() {
  const classes = useStyles();

  const handleUploadClick = event => {
    console.log();
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    // formData.append("upload_preset", "docs_upload_example_us_preset");

    API.uploadImage(formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // fetch("/api/upload", {method:"POST", body: formData})
  };

  const handleDeleteClick = event => {

    const publicID = "pro-offer/vy1p0prrfugywvllydjj"
    // const signature = "a882ded56bd010bf2ef3b22d6baf0b868dc171e1"

    API.deleteImage(publicID)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleUploadClick}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span" >
          Upload
        </Button>
      </label>
      <Button variant="contained" onClick={handleDeleteClick}>Delete</Button>
    </div>
  );
}