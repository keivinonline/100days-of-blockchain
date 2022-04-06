function range(start, end, step) {
    let rangeList = []
    let rangeStep = 1
    if (step !== undefined) {
        rangeStep = step
    }
    if (start < end) {
        for (let i = start; i <= end; i += rangeStep) {
            rangeList.push(i)
        }
    } else {
        for (let i = start; i >= end; i += rangeStep) {
            rangeList.push(i)
        }
    }
    return rangeList
}
// reversing an array
function reverseArray(array) {
    let newArray = []
    for (i = array.length - 1; i >= 0; i--) {
        // console.log(array[i])
        newArray.push(array[i])
    }
    return newArray
}
arr = ['a', 'b', 'c']
reverseArray(arr)
    // reversing in place
function reverseArrayInPlace(array) {
    // check for middle element
    middleSlice = Math.round(array.length / 2) - 1
    console.log(middleSlice)
    for (i = 0; i < middleSlice; i++) {
        let arrayCopy = array.slice(0)
            // swap with mirrored local binding
        array[i] = arrayCopy[array.length - 1 - i]
        array[array.length - 1 - i] = arrayCopy[i]
    }
    return array
}
let arrayVal = [1, 2, 3, 4, 5]
reverseArrayInPlace(arrayVal)
    // [5,4,3,2,1]

// a list