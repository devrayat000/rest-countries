<!-- <script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Country } from '../lib/interfaces/country';

	export const prerender = true;

	export const load: Load = async ({ fetch,session }) => {
		const res = await fetch('https://restcountries.com/v3.1/all');
		const countries = await res.json();

		return {
			props: { countries },
			dependencies: ['countries']
		};
	};
</script> -->
<script lang="ts">
	import { regions } from '$lib/utils/constants';
	import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@rgossiaux/svelte-headlessui';
	import { ChevronDownIcon } from '@rgossiaux/svelte-heroicons/solid';

	// export let countries: Country[];
</script>

<main class="p-5 bg-gray-50">
	<form class="rounded-md shadow-md py-1 px-5 bg-white flex">
		<input
			type="search"
			name="search"
			id="search"
			placeholder="Search for a country..."
			class="flex-1 border-none focus:border-none focus:outline-none focus:ring-0 focus-visible:outline-none"
		/>
	</form>

	<section class="text-left mt-8">
		<Menu as="div" class="relative inline-block text-left" let:open>
			<div>
				<MenuButton
					class="inline-flex w-full justify-center shadow-md rounded-md bg-white px-6 py-4 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					Find by Region
					<ChevronDownIcon
						class={`ml-2 -mr-1 h-5 w-5 text-black transition-transform ${open && 'rotate-180'}`}
						aria-hidden="true"
					/>
				</MenuButton>
			</div>
			<Transition
				as="div"
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems
					class="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<div class="px-1 py-1 ">
						{#each regions as region (region)}
							<MenuItem href={`/region/${region.toLowerCase()}`} let:active>
								<button
									class={`${
										active && 'bg-gray-100'
									} group text-gray-900 flex w-full items-center rounded-md px-2 py-2 text-sm`}
								>
									{region}
								</button>
							</MenuItem>
						{/each}
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	</section>
</main>
