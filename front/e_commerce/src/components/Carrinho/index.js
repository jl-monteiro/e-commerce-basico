import React, { useEffect, useState } from "react";

import Button from "../form/Button";
import { CiTrash } from "react-icons/ci";

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const carrinhoStorage = JSON.parse(localStorage.getItem("carrinho"))
    setCarrinho(carrinhoStorage)

  }, [])

  const handleRemoveProd = (id) => {
    const newCarrinho = carrinho.filter((_, i) => i !== id)
    setCarrinho(newCarrinho)
    localStorage.setItem('carrinho', JSON.stringify(newCarrinho))
  }


  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-100 p-6">
          <div className="space-y-6">
            {carrinho.map((prod) => (
              <div key={prod.id} className="flex items-center justify-between border-b border-gray-300 pb-4 last:border-none">
                <div>
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={prod.imagem_prod}
                    alt={prod.nome_prod}
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{prod.nome_prod}</h3>
                  <p className="text-gray-600">
                    {prod.qtd} x R$ {prod.preco_prod.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">R$ {(prod.preco_prod * prod.qtd).toFixed(2)}</p>
                </div>
                <CiTrash />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-gray-300 pt-4 mt-6">
            <p className="font-semibold text-gray-800">Total:</p>
            <p className="text-2xl font-bold text-gray-900">R$ {total.toFixed(2)}</p>
          </div>
          <Button Text="Finalizar Compra" className="w-full mt-6 bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2 px-4 transition duration-300"></Button>
        </div>
      </div>
    </div>

  );
};

export default Carrinho;
