<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { debounce } from 'lodash';
	import { SearchIcon } from '@rgossiaux/svelte-heroicons/solid';
	import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	import { onDestroy } from 'svelte';

	import type { Country } from '$lib/interfaces/country';

	let input = $page.url.searchParams.get('s') ?? '';
	let open = false;
	let countries: Country[];

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
			const res = await fetch(
				`https://restcountries.com/v3.1/name/${input}/?fields=name,flags,ccn3`
			);
			countries = (await res.json()) as Country[];

			console.log(countries);
			open = true;
		},
		1500,
		{
			leading: false,
			trailing: true
		}
	);

	onDestroy(handleSearchAutocomplete.cancel);
</script>

<section class="text-justify">
	<Menu as="div" class="relative inline-block text-left w-full md:w-96" {open}>
		<form
			on:submit={searchCountry}
			class="rounded-md shadow-md py-2 px-7 bg-light-card dark:bg-dark-card flex items-center w-full md:w-96"
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
		<Transition
			show={open && !!input}
			as="div"
			enter="transition ease-out duration-100"
			enterFrom="transform opacity-0 scale-95"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-in duration-75"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-95"
		>
			<MenuItems
				{open}
				class="absolute z-50 left-0 md:right-0 md:left-auto mt-2 w-full origin-top-left rounded-md bg-light-card dark:bg-dark-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<div class="px-1 py-1">
					{#each countries as country (country.name.official)}
						<MenuItem
							as="a"
							href="/c/{country.ccn3}"
							class={({ active }) =>
								`${
									active && 'bg-light-bg dark:bg-dark-bg'
								} no-underline text-inherit group flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
						>
							<img src={country.flags.png} alt={country.name.official} class="inline w-7 my-0" />
							<span class="flex-1">
								{country.name.official}
							</span>
						</MenuItem>
					{/each}
				</div>
			</MenuItems>
		</Transition>
	</Menu>
</section>
