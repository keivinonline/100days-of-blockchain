const cryptos = ['BTC', 'ETH', 'USDC', 'ADA', 'DOT']

// modern way post 2015 ES
for (let crypto of cryptos) {
    console.log(`ticker = ${crypto}`)
}

// pre-2015 ES
console.log()
for (let index in cryptos) {
    console.log(cryptos[index])
}

console.log()

for (let i = 0; i < cryptos.length; i++) {
    console.log(cryptos[i])
}
// while loop
console.log()
let i = 0
while (i < cryptos.length) {
    console.log(cryptos[i])
    i++
}