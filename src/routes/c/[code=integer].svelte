<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { Country } from '$lib/interfaces/country';

	export const prerender = false;

	export const load: Load = async ({ fetch, params }) => {
		console.log('id:', params['code']);

		const res = await fetch(
			`https://restcountries.com/v3.1/alpha/?codes=${params.code}&fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
		);

		const country = (await res.json())[0] as Country;

		const borderCountryArray = country.borders.reduce<Promise<Country[]>>(async (prev, border) => {
			const res = await fetch(
				`https://restcountries.com/v3.1/alpha/?codes=${border}&fields=name,ccn3`
			);
			const countries = (await res.json()) as Country[];

			return [...(await prev), ...countries];
		}, Promise.resolve([]));

		return {
			props: {
				country,
				borderCountries: (await borderCountryArray) ?? []
			},
			cache: { maxage: 60 * 60 },
			dependencies: ['country']
		};
	};
</script>

<script lang="ts">
	import { ArrowLeftIcon } from '@rgossiaux/svelte-heroicons/solid';

	import Info from '$lib/components/info.svelte';
	import { history } from '$lib/stores/history';
	import { extractCurrencies, extractLanguages, extractNativeName } from '$lib/utils/functions';
	import { goto } from '$app/navigation';

	export let country: Country, borderCountries: Country[];

	function goBack() {
		$history.pop();
		return goto($history.at($history.length - 1)!, { replaceState: true });
	}
</script>

<svelte:head>
	<title>{country.name.official}</title>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
	<meta
		name="description"
		content="Shorten your links in a blink! Free URL shortener to create perfect URLs for your business"
	/>
	<meta name="keywords" content="country,rest,travel,info,informative" />
	<meta name="robots" content="index,nofollow" />
	<!-- Open Graph -->
	<meta property="og:title" content={country.name.official} />
	<meta property="og:url" content="https://every-country.netlify.app/c/{country.ccn3}" />
	<meta property="og:type" content="website" />
	<meta
		property="og:description"
		content="Shorten your links in a blink! Free URL shortener to create perfect URLs for your business"
	/>
	<meta property="og:image" content={country.flags.png} />
	<meta property="og:image:alt" content="Whole World Preview" />
	<!-- Twitter -->
	<meta name="twitter:title" content={country.name.official} />
	<meta
		name="twitter:description"
		content="Shorten your links in a blink! Free URL shortener to create perfect URLs for your business"
	/>
	<meta name="twitter:image" content={country.flags.png} />
	<meta name="twitter:image:alt" content="Whole World Preview" />
</svelte:head>

<main class="p-6 md:p-12">
	<div>
		<button
			on:click={goBack}
			type="button"
			class="text-center no-underline bg-light-card dark:bg-dark-card text-xs px-6 py-1.5 shadow-md flex gap-2 items-center"
		>
			<ArrowLeftIcon class="h-3 w-3" />
			<span>Back</span>
		</button>
	</div>
	<br class="h-14" />
	<div class="flex flex-col md:flex-row justify-between md:gap-12">
		<section class="md:flex-1">
			<img class="m-0 w-full h-full" src={country.flags.png} alt={country.name.official} />
		</section>
		<article class="md:flex-1 my-6">
			<h2 class="text-inherit font-extrabold my-0">{country.name.official}</h2>
			<br class="h-5" />
			<div class="flex flex-col md:flex-row gap-7">
				<section>
					<Info label="Native Name" value={extractNativeName(country.name.nativeName).at(0)} />
					<Info label="Population" value={country.population.toLocaleString()} />
					<Info label="Region" value={country.region} />
					<Info label="Sub Region" value={country.subregion} />
					<Info label="Capital" value={country.capital.at(0)} />
				</section>
				<section>
					<Info label="Top Level Domain" value={country.tld.at(0)} />
					<Info
						label="Currencies"
						value={country.currencies && extractCurrencies(country.currencies).join(', ')}
					/>
					<Info
						label="Languages"
						value={country.languages && extractLanguages(country.languages).join(', ')}
					/>
				</section>
			</div>
			<br class="h-7" />
			<h4 class="text-inherit font-extrabold mt-0">Border Countries:</h4>
			<section class="flex gap-3 flex-wrap">
				{#each borderCountries as border (border.ccn3)}
					<a
						href={`/${border.ccn3}`}
						class="text-center text-inherit no-underline bg-light-card dark:bg-dark-card text-xs px-6 py-1 shadow-md"
					>
						{border.name.common}
					</a>
				{/each}
			</section>
		</article>
	</div>
</main>
