
var mercadopago = require('mercadopago');
const { MercadoPagoConfig, Payment } = require("mercadopago");
const { v4: uuidv4 } = require('uuid');

const client = new MercadoPagoConfig({ accessToken: 'APP_USR-4885365103621694-091819-89cf986f590ee875fd8efece4ce366a5-304173159', options: { timeout: 5000 } });

const payment = new Payment(client);

const createPagamento = async (req, res) => {
    try {
        const idempotencyKey = uuidv4()
        const body = req.body

        const response = await payment.create({
            body: {
                transaction_amount: body.transaction_amount,
                payment_method_id: body.payment_method_id,
                payer: {
                    email: body.payer.email
                }
            }, requestOptions: { idempotencyKey: idempotencyKey }
        })
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar pagamento: ", error })
    }
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
}).then(console.log).catch(console.log);

          
payment.create({ body: {
    transaction_amount: 12.34,
    description: '<DESCRIPTION>',
    payment_method_id: 'pix',
    payer: {
        email: '<EMAIL>'
    }}, requestOptions: { idempotencyKey: '<SOME_UNIQUE_VALUE>' } 
}).then(console.log).catch(console.log);*/

module.exports = { createPagamento }