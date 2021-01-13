const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config = require('../config/config.json');

class Security{
    constructor(){}

    async generateEncryptedPassword( pPassword ){
        var salt = await bcrypt.genSalt(10);
        var password = await bcrypt.hash( pPassword, salt );
        return password;
    }   
}

module.exports = Security;