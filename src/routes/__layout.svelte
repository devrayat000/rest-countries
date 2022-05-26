<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { browser } from '$app/env';

	import Header from '$lib/components/header.svelte';
	import { history } from '$lib/stores/history';
	import { beforeNavigate } from '$app/navigation';
	import { themeMode } from '$lib/stores/theme-mode';

	import '../app.css';

	beforeNavigate(({ from, to }) => {
		if (to?.pathname) {
			$history = [to.pathname, ...$history];
		}
	});

	setContext('history', history);

	themeMode.subscribe((mode) => {
		if (browser) {
			if (mode == 'dark') {
				document.body.classList.add(mode);
			} else {
				document.body.removeAttribute('class');
			}
		}
	});
	onMount(themeMode.initialize);
</script>

<div class="prose max-w-none bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
	<Header />
	<slot />
</div>
