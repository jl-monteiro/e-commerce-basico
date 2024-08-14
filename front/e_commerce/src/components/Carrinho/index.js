import React, { useEffect, useState } from "react";

import Button from "../form/Button";
import { CiTrash } from "react-icons/ci";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState([])
  const [totalCarrinho,setTotalCarrinho] = useState(0)
  useEffect(() => {
    const carrinhoStorage = JSON.parse(localStorage.getItem("carrinho"))
    setCarrinho(carrinhoStorage)
  }, [])

  useEffect(() => {
    const total = carrinho.reduce((acc, prod) => acc + prod.preco_prod * prod.qtd, 0)
    setTotalCarrinho(total)
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
  }, [carrinho])

  const handleRemoveProd = (id) => {
    const newCarrinho = carrinho.filter((prod) => prod.id !== id)
    setCarrinho(newCarrinho)
  }

  const handleQtd = (id, quant) => {
    const newCarrinho = carrinho.map((prod) => {
      if(prod.id === id){
        const newQtd = prod.qtd + quant
        if(newQtd > 0){
          return {...prod, qtd: newQtd}
        }
        else{
          return null
        }
      }
      return prod
    }).filter(Boolean)
    setCarrinho(newCarrinho)
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 w-96" >
      <h1 className="text-3xl font-bold mb-6 align-middle text-center">Carrinho</h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
         <div className="bg-gray-100 p-6">
          <div className="space-y-6">
            {carrinho.map((prod) => (
              <div key={prod.id} className="flex items-center justify-between border-b border-gray-300 pb-4 last:border-none">
                <div>
                  <img
                    className="h-16 w-full object-cover md:w-16"
                    src={prod.imagem_prod}
                    alt={prod.nome_prod}
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{prod.nome_prod}</h3>
                  <p className="text-gray-600">
                    {prod.qtd} x R$ {prod.preco_prod.toFixed(2)}
                  </p>
                </div>
              <div className="flex flex-col items-center">
              <div className="text-right">
                  <p className="font-semibold text-gray-800">R$ {(prod.preco_prod * prod.qtd).toFixed(2)}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  onClick={() => handleQtd(prod.id, -1)}
                  disabled={prod.qtd <= 1}
                  ><IoRemoveCircleOutline size={20}/>
                  </button>
                  <p>{prod.qtd}</p>
                  <button
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={() => handleQtd(prod.id, 1)}
                  > <IoAddCircleOutline size={20}/>
                  </button>
                  <button 
                  className="text-gray-600 hover:text-red-600 focus:outline-none "
                  onClick={() => handleRemoveProd(prod.id)}
                  >
                    <CiTrash size={20}/>                  
                    </button>
                </div>
                
              </div>
              </div>
            
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-gray-300 pt-4 mt-6">
            <p className="font-semibold text-gray-800">Total:</p>
            <p className="text-2xl font-bold text-gray-900">R$ {totalCarrinho.toFixed(2)}</p>
          </div>
          <Button Text="Finalizar Compra" className="w-full mt-6 rounded-lg py-2 px-4 transition duration-300"></Button>
        </div>
      </div>
    </div>

  );
};

export default Carrinho;
