# Chapter 4 Exercise - Data Structures, Objects and Arrays
1. Sum of a range
- `sum(range(1,10))`
- write a range function that takes 2 args `start` and `end` and returns sum of numbers from start to and including end
- modify optional 3rd arg that indicates `step`
- if no `step` then increment is by 1
```js
function sum(intList){
    let intSum = 0
    for (int of intList){
        intSum += int
    }
    return intSum
}
function range(start, end, step){
    let rangeList = []
    let rangeStep = 1
    if (step !== undefined){
        rangeStep = step
    }
    if (start < end){
        for (let i=start;i <= end; i+=rangeStep){
            rangeList.push(i)
    } else {
        for (let i=start;i >= end; i+=rangeStep){
            rangeList.push(i)
            }    
    }
    return rangeList
}


// test 1
sum(range(1,10))
> 55 
// test 2 with step
range(5,2,-1)
> [ 5, 4, 3, 2 ]

```