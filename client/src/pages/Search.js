import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"

import API from '../utils/API'

import List from '../components/Lists/List'
import Cards from '../components/Cards/Cards'

const classes = {
  flexGrow: 2,

  display: 'flex',
  flexDirection: 'row',
};

const buy = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchNames, setSearchNames] = useState(['Camera', 'Boiler'])

  const { id } = useParams()

  useEffect(() => {
    API.getProducts()
      .then(res => {
         setAllProducts(res.data);
      })
      .catch(err => console.log(err));

  }, [])

  useEffect(() => {
    const savedNames = JSON.parse(localStorage.getItem('history')) || searchNames;
    const nameFound = savedNames.findIndex(name => {
      return name.toLocaleLowerCase() === id.toLocaleLowerCase()
    })
    if (nameFound === -1) {
      setSearchNames([...savedNames, id]);
      setSelectedIndex(savedNames.length);
      filterProducts(allProducts, id);
      handleListItemClick(savedNames.length, id);
    } else {
      setSearchNames([...savedNames]);
      setSelectedIndex(nameFound);
      filterProducts(allProducts, id);
      handleListItemClick(nameFound, id);
    }
  }, [allProducts])

  useEffect(() => {
    return () => {
      localStorage.setItem('history', JSON.stringify(searchNames))
    }
  })
  const filterProducts = (array, search) => {
    const searchedProducts = array.filter((product) => {
      if (product.description) {
        return product.description.toLowerCase().includes(search.toLowerCase())
      }
      return product.title.toLowerCase().includes(search.toLowerCase())
    })
    setFilteredProducts(searchedProducts);
  };

  const handleListItemClick = (index, name) => {
    setSelectedIndex(index);
    filterProducts(allProducts, name);
  };

  const diplayProductInfoHandler = (event) => {
    console.log(`show product ${event.target.getAttribute('data-id')}`);
  };

  return (
    <div style={classes}>
      <List
        selectedIndex={selectedIndex}
        searchNames={searchNames}
        handleListItemClick={handleListItemClick} />
      <Cards productData={filteredProducts} clicked={diplayProductInfoHandler} />
    </div>
  )
};

export default buy;