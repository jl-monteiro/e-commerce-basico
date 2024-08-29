import React from 'react';

const Input = ({ type, placeholder, value, onChange, className = "" }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={`w-full p-2 border border-gray-300 rounded ${className}`}
    />
  );
};

export default Input;
