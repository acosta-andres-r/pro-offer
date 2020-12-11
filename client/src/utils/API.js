import axios from "axios";

const api = {
  // Gets all products
  getProducts: function () {
    return axios.get("/api/products");
  },
  // Gets the product with the given id
  getProduct: function (id) {
    return axios.get("/api/products/" + id);
  },
  // Deletes the product with the given id
  deleteProduct: function (id) {
    return axios.delete("/api/products/" + id);
  },
  // Saves a product to the database
  saveProduct: function (productData) {
    return axios.post("/api/products", productData);
  },
  // Update a product to the database
  updateProduct: function (id, productData) {
    return axios.put("/api/products/" + id, productData)
  },

  // UPLOAD to cloudinary
  uploadImage: function (formData) {
    return axios.post("/api/cloudinary/", formData)
  },
  // DELETE from cloudinary
  deleteImage: function (publicID) {
    return axios.delete("api/cloudinary/", {
      data: {
        publicID: publicID
      }
    })
  }
};

export default api