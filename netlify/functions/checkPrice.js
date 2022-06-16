const {getAndPrintPrice} = require("../../getAnkarsrumPrice");
const {schedule} = require("@netlify/functions");

const handler = async function(event, context) {
    const url = 'https://www.prisjakt.no/product.php?p=4220665';
    const price = await getAndPrintPrice(url);

    return {
        price,
        statusCode: 200,
    };
};

module.exports.handler = schedule("@hourly", handler);
