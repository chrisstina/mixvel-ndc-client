/*
 * Copyright (c) 2021
 */
const NDCRequestMessage = require("../MixvelAppData");

const nodeName = "OfferPrice:Mixvel_OfferPriceRQ"
const xmlns = {"xmlns:OfferPrice": "https://www.mixvel.com/API/XSD/Mixvel_OfferPriceRQ/1_00"}

class IATA_OfferPriceRQ extends NDCRequestMessage {
    constructor(offerId, offerItemIds = []) {
        super()
        this.init(nodeName, xmlns)
        this[nodeName][0].Request[0] = {
            "PricedOffer": {
                "SelectedOffer": {
                    "OfferRefID": offerId,
                    "SelectedOfferItem": {
                        "OfferItemRefID": offerItemIds
                    }
                }
            }
        }
    }
}

/**
 * @type {IATA_OfferPriceRQ}
 */
module.exports = IATA_OfferPriceRQ