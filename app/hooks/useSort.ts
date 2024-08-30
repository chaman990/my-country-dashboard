// hooks/useSort.ts
import { Country } from "./useCountryData";

export const useSort = (filteredData: Country[], setFilteredData: (data: Country[]) => void) => {
  const handleSort = (order: string) => {
    if (order === "asc") {
      const sorted = [...filteredData].sort((a, b) => a.population - b.population);
      setFilteredData(sorted);
    } else if (order === "desc") {
      const sorted = [...filteredData].sort((a, b) => b.population - a.population);
      setFilteredData(sorted);
    } else {
      setFilteredData(filteredData);
    }
  };

  return { handleSort };
};
