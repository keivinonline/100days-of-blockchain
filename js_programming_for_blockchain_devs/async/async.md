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

## handling errors
```js
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        // simulate an error 
        throw "an error occurred" 
    })
    .catch(e => {
        console.log(`Error: ${e}`)})
```
## filter and map

```js
// filter by odd values and map to list
[1,2,3,4]
    .filter(x => x % 2 === 1 )
    .map(x => `<li>${x}</li>`)
0: "<li>1</li>"
1: "<li>3</li>"
```
## filter and map for 6 decimals from 1inch
```js
async function parseTokens(){
    try {
        let response = await fetch('https://api.1inch.exchange/v3.0/1/tokens')
        let tokens = await response.json()
        let tokenList = Object.values(tokens.tokens)
        let listItems = tokenList
            .filter(token => token.decimals === 6)
            .map(token => 
            `<li>${token.name} (${token.symbol}): ${token.address}</li>`)
        console.log(tokenList)
        

        document.body.innerHTML = `<ul>${listItems.join('')}</ul>`
        } catch(e) {
            console.log(`Error: ${e}`)
    }
}

// Sapien Network (SPN): 0x20f7a3ddf244dc9299975b4da1c39f8d5d75f05a
// Power Ledger (POWR): 0x595832f8fc6bf59c85c527fec3740a1b7a361269
// Aave Interest bearing USDT (aUSDTv1): 0x71fc860f7d3a592a4a98740e39db31d25db65ae8
// Aave Interest bearing USDC (aUSDCv1): 0x9ba00d6856a4edf4665bca2c2309936572473b7e
// Digital Rand (DZAR): 0x9cb2f26a23b8d89973f08c957c4d7cdf75cd341c
// USD Coin (USDC): 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
// StableUSD (USDS): 0xa4bdb11dc0a2bec88d24a3aa1e6bb17201112ebe
// Tether USD (USDT): 0xdac17f958d2ee523a2206206994597c13d831ec7
```