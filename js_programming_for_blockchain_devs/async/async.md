# asynchronous programming
- JS works on event-based fashion such as event handlers
## JSON
## JS template literal
- notated with backticks `<template_literal>`
- when double quotes are used, it needs to be escaped with \
```js
const jsonStr= `{"symbol":"ETH","price":2800}`
jsonStr
'{"symbol":"ETH","price":2800}'
const jsonStr2= "{\"symbol\":\"BTC\",\"price\":28000}"
jsonStr2
'{"symbol":"BTC","price":28000}'
jsonStr
'{"symbol":"ETH","price":2800}'
```
## converting JSON to JS object
```js
const jsonObj = JSON.parse(jsonStr)

jsonObj
{symbol: 'ETH', price: 2800}
```
## converting JS obj back to JSON
```js
JSON.stringify(jsonObj)
'{"symbol":"ETH","price":2800}'
```
# Promises
```js
// reject
Promise.reject()

// handling the rejection
Promise.reject().catch(error => console.log(error))

// parsing the response as json obj
fetch(API_URL)
    .then(response => response.json())

// sample usage from coingecko
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        document.body.innerHTML = `1 ETH = ${data.market_data.current_price.usd} based on Coingecko`
    })
// fetching from 1inch
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        document.body.innerHTML = 
`
<h1>1inch Exchange Data</h1>
<p>1 ETH = ${Number.parseInt(data.toTokenAmount)/10000}</p>
<p>Estimated gas: ${data.estimatedGas}</p>
`  
        console.timeEnd('fetch')
    })
console.log("operation after fetch")
console.time('fetch')
```

## Async await
- async and await goes hand in hand
```js
async function get1InchEthUsdcData(){
    let response = await fetch(API_URL)
    let data = await response.json()
    document.body.innerHTML = `
<h1>1inch Exchange Data</h1>
<p>1 ETH = ${Number.parseInt(data.toTokenAmount)/10000} USDC</p>
<p>Estimated gas: ${data.estimatedGas}</p>
`
    return data
}
// can be used either
get1InchEthUsdcData().then(console.log) 
// or 
let data = get1InchEthUsdcData()
console.log(data)
```