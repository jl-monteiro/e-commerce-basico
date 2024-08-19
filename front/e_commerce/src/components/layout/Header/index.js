import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import UserInfo from "../../../services/UserInfo";

import { RxAvatar } from "react-icons/rx";
import { CiShoppingCart } from "react-icons/ci";

import SearchBar from "../SearchBar";
import Modal from "../../Modal";
import Carrinho from "../../Carrinho";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const { signed } = useAuth();
  const userInfo = UserInfo();

  useEffect(() => {
    const carrinhoStorage = JSON.parse(localStorage.getItem("carrinho"));

    setCarrinho(carrinhoStorage || []);
  }, []);
  
  const isAdmin = userInfo && userInfo.tipo === "admin";

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

          <SearchBar />

          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link
                to="/gerenciaProd"
                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-full px-3 py-2"
              >
                Gerenciar produtos
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
        <Carrinho />
      </Modal>
    </>
  );
};

export default Header;
