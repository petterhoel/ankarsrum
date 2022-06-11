import fetch from 'isomorphic-fetch';


async function fetchHtml(url){

    return await fetch(url).then(res => res.text());
}


function extractPriveFromPriceSummary(summary) {
    const ss = summary.split(":");
    return ss[ss.length - 1]
}

export async function go() {
    const url = 'https://www.prisjakt.no/product.php?p=4220665';
    const html = await fetchHtml(url);

    const regex =  /(priceSummary":{"regular":\d+)/
    const matches = html.match(regex);
    if (!matches.length) {
        return
    }

    const price = extractPriveFromPriceSummary(matches[0])
    console.log(price)

}

await go();