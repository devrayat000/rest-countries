<script lang="ts">
	import Info from './info.svelte';
	import type { Country } from '$lib/interfaces/country';

	export let country: Country;
</script>

<a
	sveltekit:prefetch
	href="/c/{country.ccn3}"
	title={country.name.official}
	class="shadow-md rounded-md text-inherit bg-light-card dark:bg-dark-card overflow-hidden no-underline"
>
	<img class="my-0 h-52 w-full" src={country.flags.png} alt={country.name.official} />

	<div class="p-6 pb-8">
		<h3 class="text-inherit my-0 mb-4 font-extrabold truncate">{country.name.official}</h3>
		<Info label="Population" value={country.population.toLocaleString()} />
		<Info label="Region" value={country.region} />
		<Info label="Capital" value={country.capital[0]} />
	</div>
</a>
