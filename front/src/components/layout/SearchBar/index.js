import React, { useState, useContext } from "react";
import axios from "axios";

import Input from "../../form/Input";

import { SearchContext } from "../../../contexts/SearchContext";

const SearchBar = () => {
  const [valorSearch, setValorSearch] = useState("");
  const { setProdutos, setLoading } = useContext(SearchContext);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (valorSearch.trim === "") {
      return;
    }

    //fetch
    try {
      const response = await axios.get(
        `http://localhost:3003/sistema/produtos?search=${valorSearch}`
      );
      setProdutos(response.data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false)

    //console.log(produtos)
  };

  return (
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
      <form onChange={handleSearch}>
        <Input
          className="flex border-input px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 w-full rounded-md border bg-muted pl-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Search..."
          type="search"
          value={valorSearch}
          onChange={(e) => [setValorSearch(e.target.value)]}
        />
      </form>
    </div>
  );
};

export default SearchBar;
