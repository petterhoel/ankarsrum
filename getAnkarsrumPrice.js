import fetch from 'isomorphic-fetch';

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

export async function getAndPrintPrice(url) {
    const html = await fetchHtml(url);
    const regex =  /(priceSummary":{"regular":\d+)/
    const matches = html.match(regex);
    if (!matches.length) {
        return
    }
    const price = extractPriveFromPriceSummary(matches[0])
    console.log(price)
}
