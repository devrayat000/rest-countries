export function getCountryListUrl(endpoint: string) {
  const url = new URL(`/v3.1${endpoint}`, "https://restcountries.com/");
  url.searchParams.set("fields", "name,ccn3,flags,population,region,capital");
  return url;
}

export function getCountryCodes() {
  const url = new URL(`/v3.1/all`, "https://restcountries.com/");
  url.searchParams.set("fields", "ccn3");
  return url;
}

export function getAllCountriesUrl() {
  return getCountryListUrl("/all");
}

export function getCountriesByRegionUrl(region: string) {
  return getCountryListUrl(`/region/${region}`);
}

export function getCountriesByNameUrl(name: string) {
  return getCountryListUrl(`/name/${name}`);
}
