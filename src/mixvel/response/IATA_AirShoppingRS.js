const NDCResponseMessage = require("../NDCResponseMessage");

class IATA_AirShoppingRS extends NDCResponseMessage {
    constructor(responseJSON) {
        super('Shop:Mixvel_AirShoppingRS', responseJSON)
    }
}

module.exports = IATA_AirShoppingRS