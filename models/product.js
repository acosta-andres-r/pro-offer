const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  posted: { type: Date, default: Date.now },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  price: { type: String },
  imageURL: { type: String },
  public_id: { type: String }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
