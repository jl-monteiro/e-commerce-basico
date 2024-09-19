
var mercadopago = require('mercadopago');
const { MercadoPagoConfig, Payment } = require("mercadopago");

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-4885365103621694-091819-89cf986f590ee875fd8efece4ce366a5-304173159', options: { timeout: 5000 } });

const payment = new Payment(client);

const createPagamento = async (body) => {
    await payment.create({ body })
}
/*
payment.create({
    body: {
        transaction_amount: 100,
        description: '<DESCRIPTION>',
        payment_method_id: '<PAYMENT_METHOD_ID>',
        payer: {
            email: '<EMAIL>'
        },
    }
}).then(console.log).catch(console.log);*/

module.exports = { createPagamento }