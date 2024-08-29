import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; 2024 JL Commerce. Todos os direitos reservados.</p>
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
            <FaFacebookF size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com/lucasmonteiromil" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
            <FaInstagram size={24} />
          </a>
          <a href="https://github.com/jl-monteiro" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
