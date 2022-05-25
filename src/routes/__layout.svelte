<script>
	import Header from '$lib/components/header.svelte';
	import { history } from '$lib/stores/history';
	import { beforeNavigate } from '$app/navigation';

	import '../app.css';
	import { setContext } from 'svelte';

	beforeNavigate(({ from, to }) => {
		if (to?.pathname) {
			$history = [to.pathname, ...$history];
		}
	});

	setContext('history', history);
</script>

<div class="prose max-w-none">
	<Header />
	<slot />
</div>
