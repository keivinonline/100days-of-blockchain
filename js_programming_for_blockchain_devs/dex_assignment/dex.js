// connect to Moralis server

const serverUrl = "https://vqlkxfpfpb3y.usemoralis.com:2053/server";
const appId = "xchGKGisMMN9Yf0KyeThZJJrRg0Omlxud3Wrh8kJ";
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
                class="js-swap btn btn-sucess"
                data-address="${token.token_address}"
                data-symbol="${token.symbol}"
                data-decimals="${tokenValue(token.balance, token.decimals)}"
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
    const response = await fetch("https://api.1inch.exchange/v3.0/1/tokens");
    const tokens = await response.json();
    let tokenList = Object.values(tokens.tokens);

    // filter
    return tokenList.filter((token) => tickerList.includes(token.symbol));
    // fetch addr
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
        `<option value="${token.symbol}-${token.decimals}">
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
        // debug
    debugger
    if (Number.isNaN(fromAmount) || fromAmount > fromMaxValue) {
        // invalid input
        document.querySelector('.js-amount-error').innerText = "Invalid Amount"
    } else {
        document.querySelector('.js-amount-error').innerText = ''
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