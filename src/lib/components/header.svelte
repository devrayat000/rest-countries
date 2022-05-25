<script lang="ts">
	import { MoonIcon } from '@rgossiaux/svelte-heroicons/outline';
</script>

<header class="sticky z-50 bg-light-card dark:bg-dark-card top-0 px-5 py-7 shadow-md">
	<div class="flex justify-between items-center">
		<a href="/" class="no-underline font-bold my-0 text-inherit">Where in the world?</a>
		<button type="button" class="text-sm font-semibold flex gap-1 items-center">
			<MoonIcon class="h-4 w-4 inline mr-1" />
			<span>Dark Mode</span>
		</button>
	</div>
</header>
