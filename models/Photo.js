const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const hashtagSchema = require('./Hashtag');

const photoSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    hashtags: [String]
});

module.exports = Photo = mongoose.model("photo", photoSchema);