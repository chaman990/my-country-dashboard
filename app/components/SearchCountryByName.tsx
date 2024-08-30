// components/SearchCountryByName.tsx
import React, { useState } from "react";
import { Country } from "../hooks/useCountryData";

interface SearchCountryByNameProps {
  setFilteredData: (data: Country[]) => void;
  originalData: Country[];
}

const SearchCountryByName: React.FC<SearchCountryByNameProps> = ({ setFilteredData, originalData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    console.warn({
        originalData
    });
    
    if (term === "") {
      setFilteredData(originalData); // Reset to original data if search term is empty
    } else {
      const filtered = originalData?.filter(
        (country) =>
          country.name.common.toLowerCase().includes(term) ||
          (country.capital && country.capital[0].toLowerCase().includes(term))
      );
      if(filtered){

          setFilteredData(filtered);
      }
    }
  };

  return (
    <div>
      <label>Search by Name or Capital: </label>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." />
    </div>
  );
};

export default SearchCountryByName;
