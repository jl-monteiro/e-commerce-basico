import React, { useState } from "react";

import Button from "../form/Button";
import Carrinhoitem from "../CarrinhoItem";

const Carrinho = () => {
    
    const total = 120;

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-card rounded-lg shadow-lg">
        <div className="bg-muted rounded-b-lg p-6">
            <Carrinhoitem />
          <div className="flex items-center justify-between">
            <p className="font-medium">Total:</p>
            <p className="font-bold text-2xl">R$ {total.toFixed(2)}</p>
          </div>
          <Button Text="Finalizar Compra" className="w-full mt-4"></Button>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
