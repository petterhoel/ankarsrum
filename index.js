import {getAndPrintPrice} from './getAnkarsrumPrice.js'

const url = 'https://www.prisjakt.no/product.php?p=4220665';
await getAndPrintPrice(url);
