const NDCResponseMessage = require("../NDCResponseMessage");

class AuthRS extends NDCResponseMessage {
    constructor(responseJSON) {
        super('Auth:AuthResponse', responseJSON)
    }
}

module.exports = AuthRS