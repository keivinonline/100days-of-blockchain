# reduce
```js
arr_a = ["N","F","T"]
arr_b = [1,2,3,4,5]

arr_a.reduce((a,b) => a+b)
>'NFT'
arr_b.reduce((a,b) => a+b)
>15

```
# eventListeners
```js
// older syntax
document.getElementById("btn-login").onclick = login;

// newer syntax
document.getElementById("btn-login").addEventListener('click',login)
```