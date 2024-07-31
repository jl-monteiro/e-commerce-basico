import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";

const Header = () => {
  const { signed } = useAuth();

  return (
    <header className="bg-gray-800 text-slate-200">
      <nav className="flex justify-between items-center w-[92%]  mx-auto">
        <Link to="/" className="w-16 cursor-pointer">
          JL
        </Link>
        {signed && (
          <div className="nav-links duration-500 md:static absolute min-h-[10vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
            <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
              <li>
                <Link to="/cadProd" className="hover:text-gray-500">
                  Cadastrar produtos
                </Link>
              </li>
              <li>
                <Link to="/user" className="hover:text-gray-500">
                  User
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
