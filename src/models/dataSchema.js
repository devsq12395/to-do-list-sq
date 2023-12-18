const mongoose = require('mongoose');

const ReactFormDataSchema = new mongoose.Schema({
    txt: {
        type: String,
        required: true
    }
});

const DataTxt = mongoose.model('DataTxt', ReactFormDataSchema);
module.exports = DataTxt;