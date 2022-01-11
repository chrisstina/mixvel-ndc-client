// @todo move to an external dependency to make it extensible
export const endpoints = new Map([
    ['auth', 'api/Accounts/login'],
    ['Mixvel_AirShoppingRQ', 'api/Order/airshopping'],
    ['Mixvel_OfferPriceRQ', 'api/Order/offerprice'],
    ['Mixvel_OrderCancelRQ', 'api/Order/cancel'],
    ['Mixvel_OrderChangeRQ', 'api/Order/change'],
    ['Mixvel_OrderCreateRQ', 'api/Order/create'],
    ['Mixvel_OrderRetrieveRQ', 'api/Order/retrieve'],
])