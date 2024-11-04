import { Country } from "../models";

export const CountryOptionAdapter = (country: Country) => {
  return {
    id: country.id,
    label: country.country,
    value: country.id,
    default: false
  };
};
