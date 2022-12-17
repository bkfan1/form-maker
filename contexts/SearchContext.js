import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchOnChange = (e) => {
    const { target } = e;
    const { value } = target;

    setSearchTerm(value);
  };

  return (
    <>
      <SearchContext.Provider value={{ searchTerm, setSearchTerm, handleSearchOnChange }}>
        {children}
      </SearchContext.Provider>
    </>
  );
};
