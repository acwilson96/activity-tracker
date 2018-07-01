var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

module.exports = Action = mongoose.model('Action', mongoose.Schema ({
    action: String,
    timestamp: String,
    url: String,
    ip: String
}));