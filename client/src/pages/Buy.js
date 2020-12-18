import React, { useEffect, useState } from 'react';

import API from '../utils/API'

import Cards from '../components/Cards/Cards'

const buy = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // console.log('Entered in readAllProduct');
    API.getProducts()
      .then(res => {
        // console.log(res)
        setProducts(res.data)
      })
      .catch(err => console.log(err));

  }, [])

  const diplayProductInfoHandler = (event) => {
    console.log(`show product ${event.target.getAttribute('data-id')}`);
  };

  return (
    <Cards productData={products} clicked={diplayProductInfoHandler} />
  )
};

export default buy;