import React, { useState } from "react";

const Carrinhoitem = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Camiseta Branca",
      price: 29.99,
      quantity: 2,
    },
    {
      id: 2,
      name: "Calça Jeans",
      price: 59.99,
      quantity: 1,
    },
    {
      id: 3,
      name: "Tênis Esportivo",
      price: 79.99,
      quantity: 1,
    },
  ]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Carrinho de Compras</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-muted-foreground">
                {item.quantity} x R$ {item.price.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                R$ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrinhoitem;
