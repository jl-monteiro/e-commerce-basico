const mercadoPago = require('mercadopago')

mercadoPago.configure({ acess_token: "APP_USR-4885365103621694-091807-0d27e2a5274b6c1e16eae88a3d34445f-304173159" })
const pagamento = async (req, res) => {
  //const {}
  // Cria um objeto de preferência
  let preference = {
    // o "purpose": "wallet_purchase" permite apenas pagamentos logados
    // para permitir pagamentos como guest, você pode omitir essa propriedade
    "purpose": "wallet_purchase",
    "items": [
      {
        "id": "item-ID-1234",
        "title": "Meu produto",
        "quantity": 1,
        "unit_price": 75.76
      }
    ]
  };

  mercadoPago.preferences.create(preference)
    .then(function (response) {
      // Este valor é o preferenceId que será enviado para o Brick na inicialização
      const preferenceId = response.body.id;
      console.log(preference)
    }).catch(function (error) {
      console.log(error);
      console.log(preference)

    });
}

import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

const payment = new Payment(client);
payment.create({ body: req.body })
  .then(console.log)
  .catch(console.log);