import fetch from 'isomorphic-fetch';
import { performance, PerformanceObserver }from 'perf_hooks'

const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry)
    })
})

perfObserver.observe({ entryTypes: ["measure"], buffer: true })


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
    performance.mark("price-start")
    const html = await fetchHtml(url);
    performance.mark("price-fetchend")
    const regex =  /(priceSummary":{"regular":\d+)/
    const matches = html.match(regex);
    if (!matches.length) {
        return
    }
    const price = extractPriveFromPriceSummary(matches[0])
    performance.mark("price-done")
    console.log(price)
    performance.measure('price-fetch', 'price-start', 'price-fetchend')
    performance.measure('price-parse', 'price-fetchend', 'price-done')
    performance.measure('price-total', 'price-start', 'price-done')


}
