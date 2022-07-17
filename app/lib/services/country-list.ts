import type { Country } from "~/lib/interfaces/country";
import {
  getAllCountriesUrl,
  getCountriesByNameUrl,
  getCountriesByRegionUrl,
  getCountryCodes,
} from "./url";

export type FilteredCountry = Pick<
  Country,
  "name" | "ccn3" | "flags" | "population" | "region" | "capital"
>;

export function getAllCountries(): Promise<FilteredCountry[]> {
  return fetch(getAllCountriesUrl().toString()).then((r) => r.json());
}

export function getAllCountryCodes(): Promise<Pick<Country, "ccn3">[]> {
  return fetch(getCountryCodes().toString()).then((r) => r.json());
}

export function getCountriesByRegion(
  region: string
): Promise<FilteredCountry[]> {
  return fetch(getCountriesByRegionUrl(region).toString()).then((r) =>
    r.json()
  );
}

export function getCountriesByName(name: string): Promise<FilteredCountry[]> {
  return fetch(getCountriesByNameUrl(name).toString()).then((r) => r.json());
}

export type SingleCountry = Pick<
  Country,
  | "name"
  | "flags"
  | "population"
  | "region"
  | "subregion"
  | "capital"
  | "tld"
  | "currencies"
  | "languages"
  | "borders"
>;

export async function getCountryByCode(code: string) {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/?codes=${code}&fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
  );

  const country = (await res.json())[0] as SingleCountry;

  return country;
}

export type BorderCountry = Pick<Country, "name" | "ccn3">;

export async function getBorderCountries(borders: string[]) {
  const borderCountryArray = borders.reduce<Promise<BorderCountry[]>>(
    async (prev, border) => {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/?codes=${border}&fields=name,ccn3`
      );
      const countries = (await res.json()) as Country[];

      return [...(await prev), ...countries];
    },
    Promise.resolve([])
  );

  return borderCountryArray;
}
