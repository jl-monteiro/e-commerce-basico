import React, { useEffect } from "react";

import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
import { StatusScreen } from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-19f717dd-90a0-4188-b22e-50ddff24e4f6');

const Pagamento = ({paymentId}) => {

  const initialization = {
    paymentId: paymentId, // id do pagamento a ser mostrado
  };
  const onError = async (error) => {
    // callback chamado para todos os casos de erro do Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback chamado quando o Brick estiver pronto.
      Aqui você pode ocultar loadings do seu site, por exemplo.
    */
  };

  return (

    <StatusScreen
      initialization={initialization}
      onReady={onReady}
      onError={onError}
    />

  )
}

export default Pagamento