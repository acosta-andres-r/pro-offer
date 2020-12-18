import React from 'react';

import ProductCard from './ProductCard/ProductCard'

const classes = {
    flexGrow: 2,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',

  };

const cards = (props) => {

  return (
    <div style={classes}>
      {props.productData.map((product, index) => {
        return (
          <ProductCard key={index} {...product} clicked={props.clicked} />
        )
      })}
    </div>
  )

};

export default cards;