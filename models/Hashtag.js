const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hashtagSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = hashtagSchema;