import React from "react";

import API from "../utils/API";
import Product from "../components/Form/Product"
import UploadBtn from "../components/Buttons/Upload/Upload"
import TextField from "../components/Input/TextField/TextField"

function productDB() {

  const example = {
    title: "Tittle test",
    description: "Description test",
    city: "Houston",
    imageURL: "Image URL test",
    public_id: "Public id test"

  }

  const idExample = "5fcc4d835e093628c405a3d5" // Second

  const newExample = {
    title: "New Tittle test",
    description: " New Description test",
    city: "New Houston",
    state: "Tx",
    zipcode: "77770",
    imageURL: "New Image URL test",
    public_id: "New Public id test"
  }

  const createProductHandler = (data) => {
    console.log('Entered in createProducHandler');
    API.saveProduct(data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  const readAllProductsHandler = () => {
    console.log('Entered in readAllProduct');
    API.getProducts()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  const getProductHandler = (id) => {
    console.log('Entered in getProduct');
    API.getProduct(id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  const updateProductHandler = (id, newData) => {
    console.log('Entered in updateProduct');
    API.updateProduct(id, newData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  const deleteProductHandler = (id, newData) => {
    console.log('Entered in deleteProduct');
    API.deleteProduct(id)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <h1>CREATE RECORD</h1>
      <button
        onClick={() => createProductHandler(example)}
      >Create Product</button>
      <h1>READ RECORDS</h1>
      <button
        onClick={readAllProductsHandler}
      >Read All Products</button>
      <button
        onClick={() => getProductHandler(idExample)}
      >Get Product</button>
      <h1>UPDATE ONE RECORD</h1>
      <button
        onClick={() => updateProductHandler(idExample, newExample)}
      >Update Product</button>
      <h1>DELETE ONE RECORD</h1>
      <button
        onClick={() => deleteProductHandler(idExample)}
      >Delete Product</button>
      <Product />
      <TextField save={createProductHandler} />
      <UploadBtn />
    </div>
  );
}

export default productDB;
