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

export const useCountryData = () => {
  const [originalData, setOriginalData] = useState<Country[]>([]);
  const [filteredData, setFilteredData] = useState<Country[]>([]);
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

  return { originalData, filteredData, setFilteredData, regions, isLoading, error };
};
