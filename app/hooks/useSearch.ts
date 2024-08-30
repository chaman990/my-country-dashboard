// hooks/useSearch.ts
import { Country } from "./useCountryData";
import { useState } from "react";

export const useSearch = (originalData: Country[], setFilteredData: (data: Country[]) => void) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());

    console.warn({
      setFilteredData
    });
    
    if (term === "") {
      setFilteredData(originalData); // Reset to original data if search term is empty
    } else {
      const filtered = originalData.filter(
        (country) =>
          country.name.common.toLowerCase().includes(term) ||
          (country.capital && country.capital[0].toLowerCase().includes(term))
      );
      setFilteredData(filtered);
    }
  };

  return { searchTerm, handleSearch };
};
