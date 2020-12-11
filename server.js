const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./routes");
const multer = require('multer');
const uuid = require('uuid/v4');
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'client/public/img/uploads'),
  filename: (req, file, cb, filename) => {
      console.log("in multer");
      console.log(file);
      cb(null, uuid() + path.extname(file.originalname));
  }
})

app.use(multer({ storage }).single('image'));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pro-order", { useFindAndModify: false });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
