<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Country } from '../lib/interfaces/country';

	export const prerender = true;

	export const load: Load = async ({ fetch, params }) => {
		console.log('id:', params['code']);

		const res = await fetch(
			`https://restcountries.com/v3.1/alpha/?codes=${params.code}&fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
		);
		// console.log(await res.text());

		const country = (await res.json())[0] as Country;
		// console.log(country);

		const borderCountryArray = country?.borders?.reduce<Promise<Country[]>>(
			async (prev, border) => {
				const res = await fetch(
					`https://restcountries.com/v3.1/alpha/?codes=${border}&fields=name,ccn3`
				);
				const countries = (await res.json()) as Country[];

				return [...(await prev), ...countries];
			},
			Promise.resolve([])
		);
		// const borderCountryArray = country?.borders?.map((border) =>
		// 	fetch(`https://restcountries.com/v3.1/alpha/?codes=${border}&fields=name,ccn3`).then((r) =>
		// 		r.json()
		// 	)
		// );

		return {
			props: {
				country,
				borderCountries: borderCountryArray ? await borderCountryArray : []
			},
			cache: { maxage: 60 * 60 },
			dependencies: ['country']
		};
	};
</script>

<script lang="ts">
	import Info from '$lib/components/info.svelte';
	import { extractCurrencies, extractLanguages, extractNativeName } from '$lib/utils/functions';

	export let country: Country, borderCountries: Country[];
</script>

<main class="p-6 bg-gray-50">
	{#if country?.flags?.png}
		<img src={country.flags.png} alt={country?.name?.official} />
	{/if}
	{#if country?.name?.official}
		<h2 class="font-extrabold">{country.name?.official}</h2>
	{/if}
	<Info label="Native Name" value={extractNativeName(country?.name?.nativeName)?.at(0)} />
	<Info label="Population" value={country?.population?.toLocaleString()} />
	<Info label="Region" value={country?.region} />
	<Info label="Sub Region" value={country?.subregion} />
	<Info label="Capital" value={country?.capital?.at(0)} />
	<br class="h-7" />
	<Info label="Top Level Domain" value={country?.tld?.at(0)} />
	<Info
		label="Currencies"
		value={country?.currencies && extractCurrencies(country?.currencies).join(', ')}
	/>
	<Info
		label="Languages"
		value={country?.languages && extractLanguages(country?.languages).join(', ')}
	/>
	<br class="h-7" />
	<h4 class="font-extrabold mt-0">Border Countries:</h4>
	<section class="flex gap-3 flex-wrap">
		{#each borderCountries as border (border?.ccn3)}
			<a
				href={`/${border?.ccn3}`}
				class="text-center no-underline bg-white text-xs px-6 py-1 shadow-md"
			>
				{border?.name?.common}
			</a>
		{/each}
	</section>
</main>
