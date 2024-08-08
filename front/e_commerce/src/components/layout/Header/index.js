import React from "react";
import { Link } from "react-router-dom";
//import { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import UserInfo from "../../../services/UserInfo";

import Input from "../../form/Input";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
  const { signed } = useAuth();
  const userInfo = UserInfo();

  const isAdmin = userInfo && userInfo.tipo === "admin";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between py-4 px-4">
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold ml-4">
            JL
          </Link>
        </div>
        <div className="relative w-full max-w-xs sm:max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
              <Link
                to="/user"
                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-full px-3 py-2"
              >
                <RxAvatar size="25px" />
              </Link>
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
  );
};

export default Header;
