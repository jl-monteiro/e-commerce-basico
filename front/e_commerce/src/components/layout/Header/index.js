import React from "react";
import { Link } from "react-router-dom";
//import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import UserInfo from "../../../services/UserInfo";

import Input from '../../form/Input'

const Header = () => {
  const { signed } = useAuth();
  const userInfo = UserInfo()

  const isAdmin = userInfo && userInfo.tipo === "admin";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background ">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center space">
          <Link to="/" className="font-bold sm:block">
            JL
          </Link>
        </div>
        <div className="relative w-full max-w-xs sm:max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-5 h-5 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
          <Input
            className="flex border-input px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 w-full rounded-md border bg-muted pl-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search..."
            type="search"
          />
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full"
          type="button"
          id="radix-:r2:"
          aria-haspopup="menu"
          aria-expanded="false"
          data-state="closed"
        >
          {isAdmin && (
          <div>
            <Link to="/gerenciaProd" className="w-5 h-5 text-muted-foreground">
              Gerenciar produtos
            </Link>
          </div>
        )}

          {signed ?
            <span>
              <Link to="/user" className="">
                User
              </Link>
            </span> :
            <span>
              <Link to="/login" className="">
                User
              </Link>
            </span>
          }
        </button>


      </div>
    </header >
  );
};

export default Header;
