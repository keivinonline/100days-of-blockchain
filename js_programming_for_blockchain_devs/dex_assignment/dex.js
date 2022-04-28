// connect to Moralis server

const serverUrl = "<obsfucated>";
const appId = "<obsfucated>";
Moralis.start({ serverUrl, appId });

const $tokenBalances = document.querySelector(".js-token-balances")



// converting from wei using custom function
const tokenValue = (value, decimals) =>
    (decimals ? value / Math.pow(10, decimals) : value)


async function getStats() {
    let balances = await Moralis.Web3API.account.getTokenBalances()


    $tokenBalances.innerHTML += balances.map((token, index) => `
    <tr>
        <td>${index + 1}</td>
        <td>${token.symbol}</td>
        <td>${tokenValue(token.balance, token.decimals)}</td>
        <td>button</td>
            
    </tr>`)

    console.log(balances)
}

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
async function getTop10Coins() {
    const response = await fetch("https://api.coinpaprika.com/v1/coins");
    const tokens = await response.json();

    return tokens
        .filter((token) => token.rank <= 100 && token.rank !== 0)
        .map((token) => token.symbol);
}

getTop10Coins()
    .then((tickerList) => getTickerAddresses(tickerList))
    // .then((x) => renderForm(x));
    .then(console.log);


document.getElementById("btn-login").addEventListener("click", login)
document.getElementById("btn-stats").addEventListener("click", getStats)
document.getElementById("btn-logout").addEventListener("click", logOut)