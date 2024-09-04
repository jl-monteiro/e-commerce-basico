import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { useContext } from "react";
import axios from "axios";

import useAuth from "../../../hooks/useAuth";


import { RxAvatar } from "react-icons/rx";
import { CiShoppingCart } from "react-icons/ci";

import SearchBar from "../SearchBar";
import Modal from "../../Modal";
import Carrinho from "../../Carrinho";
import { SearchContext } from "../../../contexts/SearchContext";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signed, user } = useAuth();
  const { carrinho } = useContext(SearchContext)

  const [categorias, setCategorias] = useState([])
  const [categoria, setCategoria] = useState("")

  const isAdmin = user && user.tipo === "admin";

  const fetchCategorias = async () => {
    try {
      const res = await axios.get("http://localhost:3003/sistema/categorias")
      setCategorias(res.data)
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value)
  }

  useEffect(() => {
    fetchCategorias()
  }, [])
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between py-4 px-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-bold ml-4">
              JL
            </Link>
          </div>
          <div className="flex items-center gap-2">

            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link
                to="/gerenciar"
                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-full px-3 py-2"
              >
                Gerenciar
              </Link>
            )}
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
              type="button"
              id="radix-:r2:"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              {signed ? (
                <>
                  <div
                    onClick={openModal}
                    className="relative text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-full px-3 py-2"
                  >
                    <CiShoppingCart size="25px"></CiShoppingCart>

                    <p className="absolute top-1 right-1 rounded-full bg-red-500 p-0.1 px-1 text-sm text-red-50">
                      {carrinho.length}
                    </p>
                  </div>
                  <Link
                    to="/user"
                    className="text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-full px-3 py-2"
                  >
                    <RxAvatar size="25px" />
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-full px-3 py-2"
                >
                  <RxAvatar size="25px" />
                </Link>
              )}
            </button>
          </div>
        </div>
      </header>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Carrinho onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Header;