<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Country } from '../lib/interfaces/country';

	export const prerender = true;

	export const load: Load = async ({ fetch }) => {
		const res = await fetch(
			'https://restcountries.com/v3.1/all?fields=name,ccn3,flags,population,region,capital'
		);
		const countries = await res.json();

		return {
			props: { countries },
			cache: { maxage: 60 * 60 },
			dependencies: ['countries']
		};
	};
</script>

<script lang="ts">
	import Info from '$lib/components/info.svelte';
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

<main class="p-5 md:p-10 bg-light-bg dark:bg-dark-bg">
	<div class="flex flex-col md:flex-row justify-between gap-8">
		<Search />
		<Region />
	</div>
	<section
		class="p-8 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-10"
	>
		{#each countries as country (country?.ccn3)}
			<a
				href={`/${country?.ccn3}`}
				title={country?.name?.official}
				class="shadow-md rounded-md bg-light-card dark:bg-dark-card overflow-hidden no-underline"
			>
				{#if country?.flags}
					<img class="my-0 h-52 w-full" src={country?.flags?.png} alt={country?.name?.official} />
				{/if}
				<div class="p-6 pb-8">
					{#if country?.name}
						<h3 class="my-0 mb-4 font-extrabold truncate">{country?.name?.official}</h3>
					{/if}
					<Info label="Population" value={country?.population?.toLocaleString()} />
					<Info label="Region" value={country?.region} />
					<Info label="Capital" value={country?.capital?.at(0)} />
				</div>
			</a>
		{/each}
	</section>
</main>
