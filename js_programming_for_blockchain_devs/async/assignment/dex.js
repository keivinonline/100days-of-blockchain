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

function renderForm(tokens) {
    const options = tokens.map(
        (token) =>
        `<option value="${token.decimals}-${token.address}">${token.name} (${token.symbol})</option>`
    );
    // console.log(options);
    document.querySelector("[name=from-token]").innerHTML = options;
    document.querySelector("[name=to-token]").innerHTML = options;
    // re-enable button
    document.querySelector(".js-submit-quote").removeAttribute("disabled");
}

async function formSubmitted(event) {
    // prvent form submission that gets 405 response
    event.preventDefault();
    // console.log(event.target);
    const [fromDecimals, fromAddress] = document
        .querySelector("[name=from-token]")
        .value.split("-");
    const [toDecimals, toAddress] = document
        .querySelector("[name=to-token]")
        .value.split("-");

    const fromUnit = 10 ** fromDecimals;
    const toUnit = 10 ** toDecimals;
    const decimalRatio = 10 ** (fromDecimals - toDecimals);

    // console.log(fromDecimals);
    // console.log(toDecimals);
    // console.log(fromUnit);
    // console.log(toUnit);

    // console.log(fromAddress);
    // console.log(toAddress);

    const url = `https://api.1inch.exchange/v4.0/1/quote?fromTokenAddress=${fromAddress}&toTokenAddress=${toAddress}&amount=${fromUnit}`;
    // console.log(url);

    let quote = "";
    try {
        const response = await fetch(url);
        quote = await response.json();
        const exchange_rate =
            (Number(quote.toTokenAmount) / Number(quote.fromTokenAmount)) *
            decimalRatio;

        document.querySelector(".js-quote-container").innerHTML = `
        <p>1 ${quote.fromToken.symbol} => ${Number(exchange_rate)} ${
        quote.toToken.symbol
      }</p>
        <p>Estimated Gas: ${quote.estimatedGas} gwei</p>
      
      `;
        // update image
        document.querySelector(".js-from-token-image").attributes.src.value =
            quote.fromToken.logoURI;
        document.querySelector(".js-to-token-image").attributes.src.value =
            quote.toToken.logoURI;
    } catch (error) {
        console.log(error);
        document.querySelector(".js-quote-container").innerHTML = `
      <p>${quote.error}: ${quote.description}</p>
      `;
    }
}

document
    .querySelector(".js-submit-quote")
    .addEventListener("click", formSubmitted);

getTop10Coins()
    .then((tickerList) => getTickerAddresses(tickerList))
    .then((x) => renderForm(x));
// .then(console.log);