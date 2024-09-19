const { MercadoPagoConfig, Preference } = require("mercadopago")

const client = new MercadoPagoConfig({ 
    accessToken: "APP_USR-4885365103621694-091819-89cf986f590ee875fd8efece4ce366a5-304173159", 
    options: { timeout: 5000 } 
});

const preference = new Preference(client)

const createPreference = async (items) => {
    const body = {
        "purpose": "wallet_purchase",
        "items": items
    };

    try {
        const response = await preference.create({body})

        return response.id
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = { createPreference };