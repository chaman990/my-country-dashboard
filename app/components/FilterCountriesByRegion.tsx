// components/FilterCountriesByRegion.tsx
import React from "react";

interface FilterCountriesByRegionProps {
  regions: string[];
  onFilter: (region: string) => void;
}

const FilterCountriesByRegion: React.FC<FilterCountriesByRegionProps> = ({ regions, onFilter }) => {
  const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(event.target.value);
  };

  return (
    <div>
      <label>Filter by Region: </label>
      <select onChange={handleRegionChange}>
        <option value="">All Regions</option>
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterCountriesByRegion;
