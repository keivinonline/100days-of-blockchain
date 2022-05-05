// connect to Moralis server

const serverUrl = "https://vqlkxfpfpb3y.usemoralis.com:2053/server";
const appId = "";
Moralis.start({ serverUrl, appId });

Moralis
    .initPlugins()
    .then(() => console.log('Plugins have been initialized'))

const $tokenBalances = document.querySelector(".js-token-balances")
const $selectedToken = document.querySelector(".js-from-token")
const $amountInput = document.querySelector('.js-from-amount')


/** Utilities */
// converting from wei using custom function
const tokenValue = (value, decimals) =>
    (decimals ? value / Math.pow(10, decimals) : value)

async function initSwapForm(event) {
    // disbled default form submission
    event.preventDefault()

    $selectedToken.innerText = event.target.dataset.symbol
    $selectedToken.dataset.address = event.target.dataset.address
    $selectedToken.dataset.decimals = event.target.dataset.decimals
    $selectedToken.dataset.max = event.target.dataset.max

    // enable and remove any existing values
    $amountInput.removeAttribute('disabled')
    $amountInput.value = ''

    // enable buttons
    document.querySelector('.js-submit').removeAttribute('disabled')
    document.querySelector('.js-cancel').removeAttribute('disabled')

    // display results
    document.querySelector('.js-quote-container').innerHTML = ''
        // remove error messages
    document.querySelector('.js-amount-error').innerText = ''

}
async function getStats() {
    let balances = await Moralis.Web3API.account.getTokenBalances()


    $tokenBalances.innerHTML += balances.map((token, index) => `
    <tr>
        <td>${index + 1}</td>
        <td>${token.symbol}</td>
        <td>${tokenValue(token.balance, token.decimals)}</td>
        <td>
            <button
                class="js-swap btn btn-success"
                data-address="${token.token_address}"
                data-symbol="${token.symbol}"
                data-decimals="${token.decimals}"
            > Swap
            </button>
        </td>
    </tr>`).join('')

    for (let $btn of $tokenBalances.querySelectorAll('.js-swap')) {
        $btn.addEventListener('click', initSwapForm)
    }

    console.log(balances)
}

/** Login-logout */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({
                signingMessage: "Log in using Moralis",
            })
            .then(function(user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
            })
            .catch(function(error) {
                console.log(error);
            });
    }
    getStats()
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}


async function getTickerAddresses(tickerList) {
    // const response = await fetch("https://api.1inch.exchange/v3.0/1/tokens");
    // const tokens = await response.json();
    // let tokenList = Object.values(tokens.tokens);

    // filter
    // return tokenList.filter((token) => tickerList.includes(token.symbol));

    const tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
        chain: 'eth'
            // The blockchain you want to use (eth/bsc/polygon)
    })
    const tokenList = Object.values(tokens.tokens);
    return tokenList.filter((token) => tickerList.includes(token.symbol));
}

/** To token dropdown preparation */
async function getTop10Coins() {
    const response = await fetch("https://api.coinpaprika.com/v1/coins");
    const tokens = await response.json();

    return tokens
        .filter((token) => token.rank <= 100 && token.rank !== 0)
        .map((token) => token.symbol);
}


function renderTokenDropdown(tokens) {
    const options = tokens.map(token =>
        `<option value="${token.address}-${token.decimals}">
            ${token.name}
        </option>
        `).join('')
    document.querySelector('[name=to-token]').innerHTML = options
}



getTop10Coins()
    .then((tickerList) => getTickerAddresses(tickerList))
    .then(renderTokenDropdown)
    // .then((x) => renderForm(x));
    .then(console.log);




async function buyCrypto() {
    Moralis.Plugins.fiat.buy()

}
/** Quote / swap */
async function formSubmitted(event) {
    // disbled default form submission
    event.preventDefault()

    const fromAmount = Number.parseFloat($amountInput.value)
    const fromMaxValue = Number.parseFloat($selectedToken.dataset.max)

    if (Number.isNaN(fromAmount) || fromAmount > fromMaxValue) {
        // invalid input
        document.querySelector('.js-amount-error').innerText = "Invalid Amount"
        return // exit
    } else {
        document.querySelector('.js-amount-error').innerText = ''
    }
    // submission of quote request
    /// via destructuring 
    const [toTokenAddress, toDecimals] = document.querySelector('[name=to-token]').value.split('-')

    const fromSymbol = $selectedToken.innerText
    const fromDecimals = $selectedToken.dataset.decimals
    const fromTokenAddress = $selectedToken.dataset.address
    const amount = Moralis.Units.Token(fromAmount, fromDecimals).toString()
    console.log(`fromTokenAddress:${fromTokenAddress}`)
    console.log(`toTokenAddress:${toTokenAddress}`)
    console.log(`amount:${amount}`)

    // gruarded blocks 
    try {
        const swapQuote = await Moralis.Plugins.oneInch.quote({
            chain: 'eth',
            fromTokenAddress,
            toTokenAddress,
            amount

        })
        console.log(`swapQuote:${swapQuote}`)
        console.log(`${Moralis.Units.Token(fromAmount, fromDecimals).toString()}`)

        const toAmount = tokenValue(swapQuote.toTokenAmount, swapQuote.toToken.decimals)
        document.querySelector(".js-quote-container").innerHTML = `
            <p>${swapQuote.fromTokenAmount} ${swapQuote.fromToken.symbol} = ${toAmount}  ${swapQuote.toToken.symbol}</p>
            <p>Gas fee: ${swapQuote.estimatedGas}</p>
        `

    } catch (e) {
        console.log(`swapQuote:${e}`)
        document.querySelector(".js-quote-container").innerHTML = `
            <p class="error">The conversion didn't succeed</p>
        `
    }

}

async function formCanceled(event) {
    // disbled default form submission
    event.preventDefault()

    // enable and remove any existing values
    $amountInput.value = ''
    $amountInput.setAttribute('disabled', '')

    // enable buttons
    document.querySelector('.js-submit').setAttribute('disabled', '')
    document.querySelector('.js-cancel').setAttribute('disabled', '')

    delete $selectedToken.innerText
    delete $selectedToken.dataset.address
    delete $selectedToken.dataset.decimals
    delete $selectedToken.dataset.max

    // display results
    document.querySelector('.js-quote-container').innerHTML = ''

    // remove error messages
    document.querySelector('.js-amount-error').innerText = ''
}

document.querySelector('.js-submit').addEventListener('click', formSubmitted)
document.querySelector('.js-cancel').addEventListener('click', formCanceled)


document.getElementById("btn-login").addEventListener("click", login)
document.getElementById("btn-stats").addEventListener("click", getStats)
document.getElementById("btn-logout").addEventListener("click", logOut)
document.getElementById("btn-buy-crypto").addEventListener("click", buyCrypto)