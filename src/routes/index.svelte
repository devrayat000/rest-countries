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

<main class="p-5 bg-gray-50">
	<div class="flex flex-col justify-between md:flex-row gap-8">
		<Search />
		<Region />
	</div>
	<section class="p-8 flex flex-col gap-7">
		{#each countries as country (country?.ccn3)}
			<a
				sveltekit:prefetch
				href={`/${country?.ccn3}`}
				class="shadow-md rounded-md bg-white overflow-hidden no-underline"
			>
				{#if country?.flags}
					<img class="my-0" src={country?.flags?.png} alt={country?.name?.official} />
				{/if}
				<div class="p-6 pb-8">
					{#if country?.name}
						<h3 class="my-0 mb-4">{country?.name?.official}</h3>
					{/if}
					<Info label="Population" value={country?.population?.toLocaleString()} />
					<Info label="Region" value={country?.region} />
					<Info label="Capital" value={country?.capital?.at(0)} />
				</div>
			</a>
		{/each}
	</section>
</main>
