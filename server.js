const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const photos = require("./routes/api/photos");

const app = express();

app.use(express.json());

//Static file declaration
app.use(express.static('public/uploads'));
app.use(express.static(path.join(__dirname, "../photo-album-client/build")));

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

app.get('*',(req, res)=>{
  res.sendFile(path.join(__dirname + '../photo-album-client/build/index.html'))
})