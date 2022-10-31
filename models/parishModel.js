const mongoose = require('mongoose');

const Parish = new mongoose.Schema({
    parish_name: {
        type: String,
        required: true,
        unique: true,
    }
});

const Parishes = mongoose.model('parish', Parish);
module.exports = Parishes;