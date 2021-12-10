const NDCResponseMessage = require("../NDCResponseMessage");

class IATA_OfferPriceRS extends NDCResponseMessage {
    constructor(responseJSON) {
        super('Op:Mixvel_OfferPriceRS', responseJSON)
    }
}

module.exports = IATA_OfferPriceRS