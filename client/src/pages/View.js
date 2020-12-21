import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import API from '../utils/API';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({

  root: {
    margin: '16px 15px 10px 15px',
    flexGrow: 2,

    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-around',
    // alignContent: 'space-around'

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
  main: {
    margin: '50px 50px',
    // flexGrow: 3,
    width: '90%',
    minHeight: '72vh',

    [theme.breakpoints.down('sm')]: {
      margin: '10px auto',
    }
  },
  image: {
    margin: '0 auto',
    width: 400,
    height: 400,

    [theme.breakpoints.down('xs')]: {
      width: 300,
      height: 300,
    }
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  // topMargin: {
  //   marginTop: '10px',
  // },
}));

const view = () => {
  const classes = useStyles();
  const { id } = useParams()

  const [productInfo, setProductInfo] = useState({
    title: "",
    description: "",
    city: "",
    state: "",
    zipcode: "",
    price: "",
    imageURL: "https://via.placeholder.com/400",
    public_id: ""
  })

  useEffect(() => {
    API.getProduct(id)
      .then(res => {
        // console.log(res)
        setProductInfo({ ...res.data })
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme} >
        <Typography
          variant="h3"
          className={classes.title}
        >{productInfo.title}</Typography>
      </ThemeProvider>
      <div className={classes.main}>
        <Grid container spacing={4} direction="row" justify="center">
          <Grid item >
            <div className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src={productInfo.imageURL}
              />
            </div>
          </Grid>

          <Grid item md={12} lg direction='row' container spacing={2}>
            <Grid item md={12} lg container direction="column" spacing={2}>

              <Grid item>
                <Typography gutterBottom variant="h6" className={classes.topMargin}>
                  {productInfo.city}, {productInfo.state} {productInfo.zipcode}
                </Typography>
                <Divider />
              </Grid>

              <Grid item xs>
                <Typography variant="h4" gutterBottom className={classes.topMargin}>
                  Description:
                </Typography>
                <Typography variant="h6" color="textSecondary" >
                  {productInfo.description || 'N/A'}
                </Typography>
              </Grid>

            </Grid>

            <Grid item>
              <Typography variant="h3" >
                $ {productInfo.price}
              </Typography>
            </Grid>

          </Grid>
        </Grid>
        {/* </Paper> */}
      </div>
    </div>
  );
}

export default view;