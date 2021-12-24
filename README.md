# mixvel-ndc-client

This module is intended to facilitate the work with  [MixVel API](https://api-test.mixvel.com/swagger/index.html). 
Currently supports XML request generation for basic operations like search, book and ticket issuing.

## Installation

To start using the module install it via npm

```shell
npm i mixvel-ndc-client
```

## Usage

Currently, you can use the module for XML request generation. Here is the list of supported actions:

- search flights (OW, RT and complex routes are supported)
- price chosen flight and receive alternative pricing options
- book a flight (adult, child, infant passenger types are supported)
- issue tickets for a booked flight
- cancel an unpaid booking
- view a booking

For every action listed above you can generate a valid request containing XML body and endpoint, ready to send to MixVel server. 

## Examples

### Create search request

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
        {from: "MOW", to: "LED", dateRangeEnd: "2021-12-12", dateRangeStart: "2021-12-12"},
        {from: "LED", to: "MOW", dateRangeEnd: "2021-12-15", dateRangeStart: "2021-12-15"}
    ],
    cabin: "ECONOMY",
    preferredCarriers: null
})
    .body // return XML payload ready to send
```

MOW LED one way flight for 1 adult, business class, only SU flights

```js
getSearchRequest({
    travelers: [
        {ptc: 'ADULT', age: "30", id: "1"},
    ],
    originDestinations: [
        {from: "MOW", to: "LED", dateRangeEnd: "2021-12-12", dateRangeStart: "2021-12-12"},
        {from: "LED", to: "MOW", dateRangeEnd: "2021-12-15", dateRangeStart: "2021-12-15"}
    ],
    cabin: "BUSINESS",
    preferredCarriers: ["SU"]
})
    .body // return XML payload ready to send
```
