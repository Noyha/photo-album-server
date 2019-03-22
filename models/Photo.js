const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    hashtags: [hashtagSchema]
});

module.exports = Photo = mongoose.model("photo", photoSchema);