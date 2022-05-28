<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { debounce } from 'lodash';

	import { SearchIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { onDestroy } from 'svelte';
	import type { Country } from '$lib/interfaces/country';

	let input = $page.url.searchParams.get('s') ?? '';

	function searchCountry(e: SubmitEvent) {
		e.preventDefault();
		return goto(`/?s=${input}`);
	}

	const handleSearchAutocomplete = debounce(
		async (e: Event) => {
			e.preventDefault();
			if (!input) {
				return;
			}
			const res = await fetch(`https://restcountries.com/v3.1/name/${input}/?fields=name,flags`);
			const countries = (await res.json()) as Country[];

			console.log(countries);
		},
		1500,
		{
			leading: false,
			trailing: true
		}
	);

	onDestroy(handleSearchAutocomplete.cancel);
</script>

<form
	on:submit={searchCountry}
	class="rounded-md shadow-md py-2 px-7 bg-light-card dark:bg-dark-card flex items-center"
>
	<SearchIcon class="h-6 w-6 text-inherit" />
	<input
		type="search"
		name="search"
		id="search"
		bind:value={input}
		on:input={(e) => handleSearchAutocomplete(e)}
		placeholder="Search for a country..."
		class="flex-1 ml-3 bg-inherit text-inherit placeholder:text-gray-300 text-sm border-none focus:border-none focus:outline-none focus:ring-0 focus-visible:outline-none"
	/>
</form>
