const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FileSchema = new Schema({
    path: {type: String, required: true }
});

module.exports = mongoose.model('File', FileSchema);