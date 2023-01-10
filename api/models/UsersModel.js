const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const Users = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
})

module.exports = mongoose.model('users', Users);