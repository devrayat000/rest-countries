function getCountryListUrl(endpoint: string) {
	const url = new URL(`/v3.1${endpoint}`, 'https://restcountries.com/v3.1/');
	url.searchParams.set('fields', 'name,ccn3,flags,population,region,capital');
	return url;
}

export function getAllCountries() {
	return getCountryListUrl('/all');
}

export function getCountriesByRegion(region: string) {
	return getCountryListUrl(`/region/${region}`);
}

export function getCountriesByName(name: string) {
	return getCountryListUrl(`/name/${name}`);
}
