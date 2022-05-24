<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Country } from '../lib/interfaces/country';

	export const prerender = false;

	export const load: Load = async ({ fetch, params }) => {
		const res = await fetch(
			`https://restcountries.com/v3.1/alpha/${params.code}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
		);
		const countries = await res.json();
		const country = countries[0] as Country;

		const borderCountryArray = country?.borders?.map((border) =>
			fetch(`https://restcountries.com/v3.1/alpha/${border}?fields=name,cca3`).then((r) => r.json())
		);

		return {
			props: {
				country,
				borderCountries: borderCountryArray ? await Promise.all(borderCountryArray) : []
			},
			cache: { maxage: 60 * 60 },
			dependencies: ['country']
		};
	};
</script>

<script lang="ts">
	import Info from '$lib/components/info.svelte';
	import { extractCurrencies, extractLanguages } from '$lib/utils/functions';

	export let country: Country, borderCountries: Country[];
</script>

<main class="p-6 bg-gray-50">
	{#if country?.flags && country?.name}
		<img src={country.flags.png} alt={country.name.official} />
	{/if}
	{#if country?.name}
		<h2 class="font-extrabold">{country.name?.official}</h2>
	{/if}
	<!-- <Info label="Native Name" value={country.name.nativeName.ben} /> -->
	<Info label="Population" value={country?.population?.toLocaleString()} />
	<Info label="Region" value={country?.region} />
	<Info label="Sub Region" value={country?.subregion} />
	<Info label="Capital" value={country?.capital[0]} />
	<br class="h-7" />
	<Info label="Top Level Domain" value={country?.tld[0]} />
	<Info label="Currencies" value={extractCurrencies(country?.currencies).join(', ')} />
	<Info label="Currencies" value={extractLanguages(country?.languages).join(', ')} />
	<br class="h-7" />
	<h4 class="font-extrabold mt-0">Border Countries:</h4>
	<section class="flex gap-3">
		{#if borderCountries}
			{#each borderCountries as border (border?.cca3)}
				<a
					href={`/${border?.cca3?.toLowerCase()}`}
					class="no-underline text-xs px-6 py-1 shadow-md"
				>
					{border?.name?.common}
				</a>
			{/each}
		{/if}
	</section>
</main>
