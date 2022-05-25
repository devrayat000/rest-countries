<script lang="ts">
	import { SearchIcon } from '@rgossiaux/svelte-heroicons/solid';

	let input: string;
</script>

<form class="rounded-md shadow-md py-2 px-7 bg-light-card dark:bg-dark-card flex items-center">
	<SearchIcon class="h-6 w-6 text-inherit" />
	<input
		type="search"
		name="search"
		id="search"
		bind:value={input}
		placeholder="Search for a country..."
		class="flex-1 ml-3 bg-inherit text-inherit placeholder:text-gray-300 text-sm border-none focus:border-none focus:outline-none focus:ring-0 focus-visible:outline-none"
	/>
</form>
