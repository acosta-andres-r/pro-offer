import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '../components/Table/Table'

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '16px 15px 10px 15px',
    // flexGrow: 2,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  title: {
    marginTop: '30px',
    marginBottom: '10px',
    color: "rgba(0, 0, 0, 0.67)",

    [theme.breakpoints.down('xs')]: {
      margin: '0 auto 10px auto',
    }
  },
}));

const add = () => {
  const classes = useStyles();

  const [rows, setRows] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState("")

  useEffect(() => {
    API.getProducts()
      .then(res => {
        const idAdding = [...res.data].map((elem, index) => { return { ...elem, id: index } });
        setRows(idAdding);
      })
      .catch(err => console.log(err));
  }, [deletedProduct])

  const handleDeleteProduct = (productID) => {
    API.deleteProduct(productID)
      .then(res => {
        console.log(res)
        setDeletedProduct(res.data._id)
      })
      .catch(err => console.log(err));
  }

  const handleEditPage = (id) => {
    window.location.pathname = "/edit/" + id;
  }

  const diplayProductInfoHandler = (id) => {
    window.location.pathname = "/product/" + id;
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Typography
          variant="h3"
          className={classes.title}
        >My Products
        </Typography>
      </ThemeProvider>
      <Table
        rows={rows}
        diplayProductInfoHandler={diplayProductInfoHandler}
        handleDeleteProduct={handleDeleteProduct}
        handleEditPage={handleEditPage}
      />
    </div>
  )
};

export default add;