<script lang="ts">
	import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
	import { ChevronDownIcon } from '@rgossiaux/svelte-heroicons/solid';

	import { regions } from '$lib/utils/constants';
	import { page } from '$app/stores';
</script>

<section class="text-left">
	<Menu as="div" class="relative inline-block text-left" let:open>
		<div>
			<MenuButton
				class="inline-flex items-center gap-4 w-full justify-center shadow-md rounded-md bg-light-card dark:bg-dark-card px-6 py-4 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			>
				<span>Find by Region</span>
				<ChevronDownIcon
					class={`ml-2 -mr-1 h-5 w-5 transition-transform ${open && 'rotate-180'}`}
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
				class="absolute left-0 md:right-0 md:left-auto mt-2 w-56 origin-top-left rounded-md bg-light-card dark:bg-dark-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<div class="px-1 py-1 ">
					{#each regions as region (region)}
						<MenuItem
							selected={$page.url.searchParams.get('r') === region.toLowerCase()}
							as="a"
							href="/?r={region.toLowerCase()}"
							class={({ active }) =>
								`${
									active && 'bg-light-bg dark:bg-dark-bg'
								} no-underline text-inherit group flex w-full items-center rounded-md px-2 py-2 text-sm`}
						>
							{region}
						</MenuItem>
					{/each}
				</div>
			</MenuItems>
		</Transition>
	</Menu>
</section>
