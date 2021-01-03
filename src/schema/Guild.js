const mongo = require('mongoose');

module.exports = mongo.model('Guild', new mongo.Schema({
    id: String,
    Current: Number,
    Channel: String
}))