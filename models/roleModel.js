const mongoose = require('mongoose');

const Roles = new mongoose.Schema({
    roleType:{
        type: String,
        required: true
    }
});

const Role = mongoose.model('roles', Roles)
module.exports = Role