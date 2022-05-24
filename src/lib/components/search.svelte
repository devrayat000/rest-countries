<script lang="ts">
	import { SearchIcon } from '@rgossiaux/svelte-heroicons/solid';

	let input: string;
</script>

<form class="rounded-md shadow-md py-2 px-7 bg-white flex items-center">
	<SearchIcon class="h-6 w-6 text-gray-400" />
	<input
		type="search"
		name="search"
		id="search"
		bind:value={input}
		placeholder="Search for a country..."
		class="flex-1 ml-3 placeholder:text-gray-300 text-sm border-none focus:border-none focus:outline-none focus:ring-0 focus-visible:outline-none"
	/>
</form>
