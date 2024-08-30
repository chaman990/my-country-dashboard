// hooks/useFilter.ts
import { Country } from "./useCountryData";

export const useFilter = (originalData: Country[], setFilteredData: (data: Country[]) => void) => {
  const handleRegionFilter = (selectedRegion: string) => {
    if (selectedRegion === "") {
      setFilteredData(originalData); // Reset to original data if no region is selected
    } else {
      const filtered = originalData.filter((country) => country.region === selectedRegion);
      setFilteredData(filtered);
    }
  };

  return { handleRegionFilter };
};
