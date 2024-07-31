import React from 'react';

const Button = ({ Text, onClick, Type = "button", className = "" }) => {
  return (
    <button
      type={Type}
      onClick={onClick}
      className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 ${className}`}
    >
      {Text}
    </button>
  );
};

export default Button;
