<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	import type { Country } from '../lib/interfaces/country';
	import { getAllCountries, getCountriesByRegion } from '$lib/services/country-list';

	export const prerender = false;

	export const load: Load = async ({ fetch, url }) => {
		const region = url.searchParams.get('r');
		let res: Response;

		if (region) {
			const a = getCountriesByRegion(region).toString();
			console.log(a);

			res = await fetch(a);
		} else {
			res = await fetch(getAllCountries().toString());
		}
		const countries = await res.json();

		return {
			props: { countries },
			cache: { maxage: 60 * 60 },
			dependencies: ['countries']
		};
	};
</script>

<script lang="ts">
	import CountryCard from '$lib/components/country-card.svelte';
	import Region from '$lib/components/region.svelte';
	import Search from '$lib/components/search.svelte';

	export let countries: Country[];
</script>

<svelte:head>
	<title>Whole World - Informative International App</title>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<meta
		name="description"
		content="Shorten your links in a blink! Free URL shortener to create perfect URLs for your business"
	/>
	<meta name="keywords" content="country,rest,travel,info,informative" />
	<meta name="robots" content="index,nofollow" />
	<!-- Open Graph -->
	<meta property="og:title" content="Whole World - Informative International App" />
	<meta property="og:url" content="https://every-country.netlify.app/" />
	<meta property="og:type" content="website" />
	<meta
		property="og:description"
		content="Shorten your links in a blink! Free URL shortener to create perfect URLs for your business"
	/>
	<meta property="og:image" content="/demo/desktop-preview.jpg" />
	<meta property="og:image:alt" content="Whole World Preview" />
	<!-- Twitter -->
	<meta name="twitter:title" content="Whole World - Informative International App" />
	<meta
		name="twitter:description"
		content="Shorten your links in a blink! Free URL shortener to create perfect URLs for your business"
	/>
	<meta name="twitter:image" content="/demo/desktop-preview.jpg" />
	<meta name="twitter:image:alt" content="Whole World Preview" />
</svelte:head>

<main class="p-5 md:p-10">
	<div class="flex flex-col md:flex-row justify-between gap-8">
		<Search />
		<Region />
	</div>
	<section
		class="p-8 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-10"
	>
		{#each countries as country (country.ccn3)}
			<CountryCard {country} />
		{/each}
	</section>
</main>
