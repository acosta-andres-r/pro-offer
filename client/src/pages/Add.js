import React, { useState } from 'react';
import API from '../utils/API'
import FormData from 'form-data'
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import UploadCard from '../components/Cards/UploadCard/UploadCard'
import Input from '../components/Input/Input'
import UploadBtn from "../components/Buttons/Upload/Upload"

const placeHolderUpload = 'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '16px 15px 10px 15px',
    flexGrow: 2,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  main: {
    width: '100%',
    margin: '20px auto',
    // flexGrow: 2,

    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'flex-start',
    // justifyContent: 'center',


    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
    alert: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    }
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const add = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState(false)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState(placeHolderUpload);
  const [public_id, setPublic_id] = useState('');

  const handleUploadClick = event => {
    const file = event.target.files[0];
    let formData = new FormData();
    formData.append('image', file);
    // formData.append("upload_preset", "docs_upload_example_us_preset");

    API.uploadImage(formData)
      .then(res => {
        // console.log(res);
        setPublic_id(res.data.public_id);
        setImageURL(res.data.url)
      })
      .catch(err => console.log(err));

    // fetch("/api/upload", {method:"POST", body: formData})
  };

  const handleDeleteClick = event => {
    // const publicID = "pro-offer/vy1p0prrfugywvllydjj"
    // const signature = "a882ded56bd010bf2ef3b22d6baf0b868dc171e1"
    if (!public_id) return
    API.deleteImage(public_id)
      .then(res => {
        // console.log(res)
        setPublic_id('');
        setImageURL(placeHolderUpload)
      })
      .catch(err => { console.log('Error AA', err) });
  }

  const handleOnChangeInput = event => {
    // console.log(event.target.getAttribute('id'));
    const idEl = event.target.getAttribute('id');
    const value = event.target.value;
    switch (idEl) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'state':
        setState(value);
        break;
      case 'zipcode':
        setZipcode(value);
        break;
      case 'price':
        setPrice(value);
        break;
      default:
        break;
    }
  }

  const handleSubmit = () => {

    if (!title) {
      setError(true);
      return;
    }

    const productInfo = {
      title: title,
      description: description,
      city: city,
      state: state,
      zipcode: zipcode,
      price: price,
      imageURL: imageURL,
      public_id: public_id
    }

    // console.log('Entered in createProducHandler');
    API.saveProduct(productInfo)
      .then(res => {
        // console.log(res)
        handleClearInputs();
        handleClick();
      })
      .catch(err => console.log(err));

  }

  const handleClearInputs = () => {
    setTitle('');
    setDescription('');
    setCity('');
    setState('');
    setZipcode('');
    setPrice('');
    setImageURL(placeHolderUpload)
    setPublic_id('')
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Typography variant="h3" style={{ color: "rgba(0, 0, 0, 0.67)" }} >Add New Product</Typography>
        {/* <Typography variant="h4">Responsive h4</Typography>
          <Typography variant="h5">Responsive h5</Typography> */}
      </ThemeProvider>
      <div className={classes.main}>
        <UploadCard
          imageURL={imageURL}
          public_id={public_id}
        >
          <UploadBtn
            handleUploadClick={handleUploadClick}
            handleDeleteClick={handleDeleteClick}
          />
        </UploadCard>
        <Input
          handleOnChangeInput={handleOnChangeInput}
          handleSubmit={handleSubmit}
          title={title}
          description={description}
          city={city}
          state={state}
          zipcode={zipcode}
          price={price}
          isError={error}
        />
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Success!
        </Alert>
      </Snackbar>
    </div>
  )
};

export default add;