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
      handleListItemClick(savedNames.length, id);
    } else {
      setSearchNames([...savedNames]);
      handleListItemClick(nameFound, id);
    }
  }, [allProducts])

  useEffect(() => {
      localStorage.setItem('history', JSON.stringify(searchNames))
  }, [searchNames])

  const filterProducts = (array, search) => {
    const searchedProducts = array.filter((product) => {
      if (product.description) {
        if (product.description.toLowerCase().includes(search.toLowerCase())) {
          return true
        }
      }
      return product.title.toLowerCase().includes(search.toLowerCase())
    })
    setFilteredProducts(searchedProducts);
  };

  const handleListItemClick = (index, name) => {
    setSelectedIndex(index);
    filterProducts(allProducts, name);
  };

  const handleListItemRemove = (name) => {
    const namesArray = [...searchNames];
    namesArray.splice(namesArray.indexOf(name), 1);
    setSearchNames(namesArray);
  };

  const diplayProductInfoHandler = (event) => {
    // This has to redirect to /product/:id
    console.log(`show product ${event.target.getAttribute('data-id')}`);
  };

  return (
    <div style={classes}>
      <List
        selectedIndex={selectedIndex}
        searchNames={searchNames}
        handleListItemClick={handleListItemClick} 
        handleListItemRemove={handleListItemRemove}/>
      <Cards productData={filteredProducts} clicked={diplayProductInfoHandler} />
    </div>
  )
};

export default buy;