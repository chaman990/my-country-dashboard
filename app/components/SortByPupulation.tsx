// components/SortByPopulation.tsx
import React from "react";

interface SortByPopulationProps {
  onSort: (order: string) => void;
}

const SortByPopulation: React.FC<SortByPopulationProps> = ({ onSort }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSort(event.target.value);
  };

  return (
    <div>
      <label>Sort by Population: </label>
      <select onChange={handleSortChange}>
        <option value="default">Default</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortByPopulation;
