const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");


const photos = require("./routes/api/photos");

const app = express();

app.use(express.json());

app.use(cors());

//Static file declaration
app.use(express.static(path.join(__dirname, "public")));

// db config
const db = require("./config/keys").mongoURI;

const port = process.env.PORT || 5000;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => app.listen(port, () => console.log(`Server started on port: ${port}`)))
  .catch(err => console.log(err));

// Use routes
app.use("/api/photos", photos);