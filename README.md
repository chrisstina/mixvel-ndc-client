# mixvel-ndc-client

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
