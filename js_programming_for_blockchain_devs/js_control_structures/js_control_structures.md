# Javascript control structures
- sequence
- selection
- iteration
## Functions
- `const` is just a pointer to the Object that is static; but the Object's properties can be changed
- shorthand notation using `=>`
- https://github.com/zsolt-nagy/a-practical-introduction-to-modern-javascript/blob/master/manuscript/01_14_control_structures.md
- typeof NaN is a "number"
## loops
```js

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
```