import React from 'react';

const Button = ({ Text, onClick, Type = "button", className}) => {
  return (
    <button
      type={Type}
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ${className}`}
    >
      {Text}
    </button>
  );
};

export default Button;
