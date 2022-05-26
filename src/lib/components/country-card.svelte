<script lang="ts">
	import Info from './info.svelte';
	import type { Country } from '$lib/interfaces/country';

	export let country: Country;
</script>

<a
	href="/c/{country.ccn3}"
	title={country.name.official}
	class="shadow-md rounded-md text-inherit bg-light-card dark:bg-dark-card overflow-hidden no-underline"
>
	{#if country?.flags}
		<img class="my-0 h-52 w-full" src={country.flags.png} alt={country.name.official} />
	{/if}
	<div class="p-6 pb-8">
		{#if country?.name}
			<h3 class="text-inherit my-0 mb-4 font-extrabold truncate">{country.name.official}</h3>
		{/if}
		<Info label="Population" value={country.population.toLocaleString()} />
		<Info label="Region" value={country.region} />
		<Info label="Capital" value={country.capital[0]} />
	</div>
</a>
