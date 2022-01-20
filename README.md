# mixvel-ndc-client

This module facilitates the work with  [MixVel API](https://api-test.mixvel.com/swagger/index.html).
Currently, it supports XML request generation for basic operations like search, book, and ticket issuing.

## Installation

To start using the module, install it via npm

```shell
npm i mixvel-ndc-client
```

## Usage

Currently, you can use the module for XML request generation. Here is the list of supported actions:

- search flights (OW, RT, and complex routes are supported)
- price selected flight and receive alternative pricing options
- book a flight (adult, child, infant, and subsidized categories are supported)
- issue tickets for a booked flight
- cancel an unpaid booking
- view a booking
- request a refund calculation
- perform a full refund
- list fare rules for a chosen flight

For every action listed above, you can generate a valid request containing XML body and endpoint, ready to send to the
MixVel server.

At the moment, sending out requests and handling responses is out of the module's scope.

### Request object

Each of the available methods returns a `MixvelRequest` object looking like following:

```ts
MixvelRequest = {
    "headers": {}, // HTTP request headers
    "body": string, // request payload, i.e. XML 
    "options": {
        "method": "GET" | "POST",
        "endpoint": string // relative endploing path, e.g. "api/order/Create" 
    }
}
```

#### Headers

By default, Mixvel request manager sets `"Accept": "application/xml",` and `"Content-Type": "application/xml"` headers
for every request. To add headers you may use `addHeader` method:

```js
MixvelRequest.addHeader("Content-Type", "application/xml")
```

### Basic flow

- Normally, you would start with a `search` request. Provide a route (either one-way, return, or complex), travelers, and optionally service class and desired airlines.
- Once you've got the offers list, you may request a `price` for any of these, using `OfferID` and `OfferItemID` list from the response.
- Now, you may create a booking providing travelers info for selected offers. Note that travelers' count must equal the
  number of travelers you searched.
- Booking has its mixvel order id, which you can use for a `tickets issue`, `cancel` or `retrieve` requests.

## Examples

### Create a search request

MOW LED return flight for 2 adults 1 child and 1 infant on lap

```js
getSearchRequest({
    travelers: [
        {ptc: 'ADULT', age: "30", id: "1"},
        {ptc: 'ADULT', age: "30", id: "2"},
        {ptc: 'CHILD', age: "5", id: "3"},
        {ptc: 'INFANT', age: "1", id: "4"},
    ],
    originDestinations: [
        {from: "MOW", to: "LED", dateRangeEnd: new Date("2021-12-12"), dateRangeStart: new Date("2021-12-12")},
        {from: "LED", to: "MOW", dateRangeEnd: new Date("2021-12-15"), dateRangeStart: new Date("2021-12-15")}
    ],
    cabin: "ECONOMY",
    preferredCarriers: null
})
    .body // return XML payload ready to send
```

MOW LED one-way flight for 1 adult, business class, only SU flights

```js
getSearchRequest({
    travelers: [
        {ptc: 'ADULT', age: "30", id: "1"},
    ],
    originDestinations: [
        {from: "MOW", to: "LED", dateRangeEnd: new Date("2021-12-12"), dateRangeStart: new Date("2021-12-12")},
        {from: "LED", to: "MOW", dateRangeEnd: new Date("2021-12-15"), dateRangeStart: new Date("2021-12-15")}
    ],
    cabin: "BUSINESS",
    preferredCarriers: ["SU"]
})
    .body // return XML payload ready to send
```

### Price selected offer

Having received an offer id and per passenger offer items, you may create a price request.

```js
getPriceRequest({
    offerId: 'SOME-OFFER',
    offerItemIds: ['ADULT-OFFER-ITEM', 'CHILD-OFFER-ITEM']
})
```

### Book an offer

Book an offer for 1 ADT RT

```js
getBookRequest({
    offerId: 'SOME-OFFER',
    offerItemIds: [{id: 'OFFER-1', ptc: "ADULT"}],
    passengers: [
        {
            ptc: "ADULT",
            personalInfo: {
                firstName: 'Test',
                middleName: 'Test',
                lastName: 'Test',
                gender: "M",
                dob: new Date('1999-02-15'),
            },
            identityDocument: {
                type: "PASSPORT",
                dateOfIssue: new Date('2015-02-15'),
                dateOfExpiry: new Date('2025-02-15'),
                issuingCountry: 'RU',
                number: '12345'
            },
            contacts: {
                email: 'test@test.test',
                phoneNumber: '89112311441'
            }
        }
    ]
})
```

### JSON vs XML

To provide convenient request handling the module utilizes JSON for the request generation and converts JSON to XML document at the end of a generation process. Currently, conversion is handled by `xml2js` module.