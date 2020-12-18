import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"

import API from '../utils/API'

import List from '../components/Lists/List'
import Cards from '../components/Cards/Cards'
import Aux from '../components/hoc/Aux/Aux'

const classes = {
  flexGrow: 2,

  display: 'flex',
  flexDirection: 'row',
};

const buy = () => {

  const [products, setProducts] = useState([]);

  const { id } = useParams()

  useEffect(() => {
    // console.log('Entered in readAllProduct');
    API.getProducts()
      .then(res => {
        // console.log(id);
        const searchedProducts = res.data.filter((product) => {
          if (product.description) {
            return product.description.toLowerCase().includes(id.toLowerCase())
          }
          return product.title.toLowerCase().includes(id.toLowerCase())
        })
        setProducts(searchedProducts);
      })
      .catch(err => console.log(err));

  }, [])

  const diplayProductInfoHandler = (event) => {
    console.log(`show product ${event.target.getAttribute('data-id')}`);
  };

  return (
    <div style={classes}>
      <List />
      <Cards productData={products} clicked={diplayProductInfoHandler} />
    </div>
  )
};

export default buy;