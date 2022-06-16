require("isomorphic-fetch");

async function fetchHtml(url){
    return await fetch(url).then(res => res.text());
}

function extractPriveFromPriceSummary(summary) {
    const split = summary.split(":");
    if (!split.length) {
        return 'Ingen pris funnet'
    }
    return split[split.length - 1]
}

async function getAndPrintPrice(url) {
    const html = await fetchHtml(url);
    const regex =  /(priceSummary":{"regular":\d+)/
    const matches = html.match(regex);
    if (!matches.length) {
        return 'No match'
    }
    const price = extractPriveFromPriceSummary(matches[0])
    console.log(price)
    return price;
}

module.exports = {
    getAndPrintPrice
}