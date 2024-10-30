import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import { RxAvatar } from "react-icons/rx";
import { CiShoppingCart } from "react-icons/ci";

import SearchBar from "../SearchBar";
import Modal from "../../Modal";
import Carrinho from "../../Carrinho";
import { SearchContext } from "../../../contexts/SearchContext";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signed, user, deslogar } = useAuth();
  const navigate = useNavigate()

  const { carrinho } = useContext(SearchContext)


  const isAdmin = user && user.tipo === "admin";

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-gray-100">
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
              <Dropdown>
                <DropdownTrigger className="outline-none">
                  <button className="p-2">
                    Admin
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="profile" onClick={() => navigate("/gerenciarProd")}>Gerenciar Produtos</DropdownItem>
                  <DropdownItem key="profile" onClick={() => navigate("/gerenciarCateg")}>Gerenciar Categorias</DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
                  <Dropdown>
                    <DropdownTrigger className="outline-none">
                      <button className="p-2">
                        <RxAvatar size="25px" />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="profile" onClick={() => navigate("/user")}>Perfil</DropdownItem>
                      <DropdownItem key="logout" className="text-danger" color="danger" onClick={() => deslogar()}>
                        Sair
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
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