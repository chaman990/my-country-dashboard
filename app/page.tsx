// page.tsx
"use client";
import React from "react";
import CountryCard from "./components/CountryCard";
import "./styles/global.css";
import FilterCountriesByRegion from "./components/FilterCountriesByRegion";
import SearchCountryByName from "./components/SearchCountryByName";
import { useCountryData } from "./hooks/useCountryData";
import { useFilter } from "./hooks/useFilter";
import { useSort } from "./hooks/useSort";
import { useSearch } from "./hooks/useSearch";
import ErrorBoundary from "./components/ErrorBoundary";
import SortByPopulation from "./components/SortByPupulation";

const HomePage: React.FC = () => {
  const { originalData, filteredData, setFilteredData, regions, isLoading, error } = useCountryData();
  const { handleRegionFilter } = useFilter(originalData, setFilteredData);
  const { handleSort } = useSort(filteredData, setFilteredData);
  const { searchTerm, handleSearch } = useSearch(originalData, setFilteredData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ErrorBoundary>
      <FilterCountriesByRegion regions={regions} onFilter={handleRegionFilter} />
      <SearchCountryByName searchTerm={searchTerm} onSearch={handleSearch} originalData={originalData} />
      <SortByPopulation onSort={handleSort} />
      <div className="grid">
        {filteredData.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </ErrorBoundary>
  );
};

export default HomePage;
