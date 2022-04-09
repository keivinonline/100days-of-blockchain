// recursive function sample

function recursive_a() {
    // condition to exit
    if (condition) {
        // stop calling itself
    } else {
        recursive_a()
    }
}

// recursive countdown to 0

function countDown(fromNumber) {
    console.log(fromNumber)
    if (fromNumber > 0) {
        countDown(fromNumber - 1)
    }
}

// recursion for factorial

function factorial(x) {
    // when left with 0
    if (x === 0) {
        return 1
    }

    // ongoing condition
    if (x >= 1) {
        return x * factorial(x - 1)
    }
}