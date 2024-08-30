// hooks/useCountryData.ts
import { useState, useEffect } from "react";
import axios from "axios";

export interface Country {
  name: { common: string };
  capital: string[];
  region: string;
  population: number;
  flags: { svg: string };
}

interface Filters {
  region: string;
  searchTerm: string;
  sortOrder: "asc" | "desc" | "default";
}

export const useCountryData = () => {
  const [originalData, setOriginalData] = useState<Country[]>([]);
  const [filteredData, setFilteredData] = useState<Country[]>([]);
  const [filters, setFilters] = useState<Filters>({
    region: "",
    searchTerm: "",
    sortOrder: "default",
  });
  const [regions, setRegions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const data = response.data;
        setOriginalData(data);
        setFilteredData(data);

        const uniqueRegions = Array.from(new Set(data.map((country) => country.region)));
        setRegions(uniqueRegions);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryData();
  }, []);

  useEffect(() => {
    let updatedData = [...originalData];

    // Apply region filter
    if (filters.region) {
      updatedData = updatedData.filter((country) => country.region === filters.region);
    }

    // Apply search filter
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      updatedData = updatedData.filter(
        (country) =>
          country.name.common.toLowerCase().includes(searchTermLower) ||
          (country.capital && country.capital[0].toLowerCase().includes(searchTermLower))
      );
    }

    // Apply sorting
    if (filters.sortOrder === "asc") {
      updatedData = updatedData.sort((a, b) => a.population - b.population);
    } else if (filters.sortOrder === "desc") {
      updatedData = updatedData.sort((a, b) => b.population - a.population);
    }

    setFilteredData(updatedData);
  }, [filters, originalData]);

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return {
    originalData,
    filteredData,
    regions,
    isLoading,
    error,
    filters,
    updateFilters,
  };
};
