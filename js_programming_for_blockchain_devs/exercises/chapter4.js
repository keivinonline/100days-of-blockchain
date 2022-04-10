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

// a linked list 
function arrayToList(array) {
    // left with 1 element
    if (array.length - 1 === 0) {
        return {
            value: array[0],
            rest: null
        }
    } else {
        return {
            // take the head
            value: array[0],
            // recurse with rest of tail
            rest: arrayToList(array.slice(1))
        }
    }
}

// reverse a linked list
function listToArray(list) {
    // store output 
    // let array = [list.value]
    // left with 0 elements
    if (list.rest === null) {
        return list.value
    } else {
        // array.push(listToArray(list.rest))
        // return array
        return [list.value].concat(listToArray(list.rest))
    }
}

// prepend function
function prepend(element, list) {
    if (list === null) {
        return {
            value: element,
            rest: null
        }
    } else {
        return {
            value: element,
            rest: list
        }
    }
}

function nth(list, position) {
    let array = listToArray(list)
    let element = array.slice(position, position + 1)
    if (element !== undefined) {
        return element
    } else {
        return undefined
    }
}
// test cases
array = [10, 20, 30]
arrayToList(array)
    // > { value: 10, rest: { value: 20, rest: { value: 30, rest: null } } }
listToArray(list)
    // > [10, 20, 30]
prepend(10, prepend(20, null))
    // > { value: 10, rest: { value: 20, rest: null } }
nth(arrayToList(array), 1)


// deep comparison
let obj1 = { here: { is: "an" }, object: 2 }
let obj2 = { here: { is: "an" }, object: 2 }

function deepEqual(obj1, obj2) {
    // check for real object
    obj1Valid = (typeof(obj1) == "object" && obj1 != null ? true : false)
    obj2Valid = (typeof(obj2) == "object" && obj2 != null ? true : false)
    if (!obj1Valid || !obj2Valid) { return false }
    // get keys 
    let obj1Keys = Object.keys(obj1)
    let obj2Keys = Object.keys(obj2)
    let obj1Values = Object.values(obj1)
    let obj2Values = Object.values(obj2)

    // check length of keys and values
    if (
        (obj1Keys.length != obj2Keys.length) ||
        (obj1Values.length != obj2Values.length)
    ) {
        console.log("length of keys/values not matching")
        return false
    }
    // compare keys
    let keysEqualArray = []
    for (key of obj1Keys) {
        keysEqual = (obj2Keys.includes(key) ? true : false)
        keysEqualArray.push(keysEqual)
        if (!keysEqual) {
            console.log(`${key} is not found in obj2`)
        }
    }
    // compare values 
    let valuesEqualArray = []
    for (value of obj1Values) {
        valuesEqual = (obj2Values.includes(value) ? true : false)
        valuesEqualArray.push(valuesEqual)
        if (!valuesEqual) {
            console.log(`${value} is not found in obj2`)
        }
    }
    // check all returned comparison
    let finalKeysEqual = (keysEqualArray.includes(false) ? false : true)
    let finalValuesEqual = (valuesEqualArray.includes(false) ? false : true)


    return (finalKeysEqual && finalValuesEqual ? true : false)

}

deepEqual(obj1, null) // false
deepEqual(obj1, obj1) // true
deepEqual(obj1, { here: 1, object: 2 }) // false
deepEqual(obj1, { here: { is: "an" }, object: 2 }) // true

// with JSON package
function deepEqualwithJSON(obj1, obj2) {
    // check for real object
    obj1Valid = (typeof(obj1) == "object" && obj1 != null ? true : false)
    obj2Valid = (typeof(obj2) == "object" && obj2 != null ? true : false)

    if (obj1Valid && obj2Valid) {
        // compare via JSON
        let obj1JSON = JSON.stringify(obj1)
        let obj2JSON = JSON.stringify(obj2)
        return (obj1JSON == obj2JSON ? true : false)

    }
}

deepEqualwithJSON(obj1, null) // false
deepEqualwithJSON(obj1, obj1) // true
deepEqualwithJSON(obj1, { here: 1, object: 2 }) // false
deepEqualwithJSON(obj1, { here: { is: "an" }, object: 2 }) // true