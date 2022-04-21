# DOM
- document object model
# querySelector
```js
// selects first button
document.querySelector('a[role=button]')

// returns a list of all matching queries
let node_list = document.querySelectorAll('a[role=button]')
for (let node of node_list){
    console.log(node)
}

// getting inner spans 
document.querySelectorAll('a[role=button] > span > span')

document.querySelector('h1').innerHTML
> 'The Ultimate <span>Web3</span> Development Platform'

document.querySelector('h1').innerText
> 'The Ultimate Web3 Development Platform'

// modifying site 
document.querySelector('h1').innerHTML = `
<strong>This</strong> is a new <em>title</em>
THanks to Moralis JS training!
`

// selecting class via dot notation
document.querySelector(".elementor-section-wrap")
> <div class=​"elementor-section-wrap">​…​</div>​
```

## <pre> tags
- preformatted text
- every character occupies same amount of width and length (monospace)
```js

```