const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const photos = require("./routes/api/photos");

const app = express();

app.use(express.json());

//Static file declaration
app.use(express.static(path.join(__dirname, "public")));

// db config
const db = require("./config/keys").mongoURI;

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("mongodb connected..."))
  .catch(err => console.log(err));

// Use routes
app.use("/api/photos", photos);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));