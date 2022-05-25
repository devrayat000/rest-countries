import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		browser: {
			router: false
		},
		prerender: {
			concurrency: 3,
			enabled: true,
			onError: console.log,
			entries: ['/sitemap.xml']
		}
	}
};

export default config;
