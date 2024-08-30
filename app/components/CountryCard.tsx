// components/CountryCard.tsx
import React from "react";
import Image from "next/image";
import { Country } from "../hooks/useCountryData";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  return (
    <div className="card">
      <Image src={country.flags.svg} alt={`${country.name.common} flag`} width={200} height={100} />
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital?.[0] || "N/A"}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
    </div>
  );
};

export default React.memo(CountryCard);
