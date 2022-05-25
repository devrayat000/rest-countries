import { createGzip } from 'node:zlib';
import { Readable } from 'node:stream';
import type { Country } from '$lib/interfaces/country';
import type { RequestHandler } from '@sveltejs/kit';
import { SitemapStream, streamToPromise } from 'sitemap';

export const get: RequestHandler = async () => {
	const sitemap = new SitemapStream({
		hostname: 'https://every-country.netlify.app/'
	});
	sitemap.pipe(createGzip());

	const res = await fetch('https://restcountries.com/v3.1/all?fields=ccn3,flags');
	const countries = (await res.json()) as Country[];

	const links: any[] = [];
	countries.forEach((c) => {
		links.push({
			url: `/c/${c.ccn3}`,
			img: [c.flags.png],
			video: [],
			links: [],
			changefreq: 'daily',
			priority: 0.8
		});
	});

	const sitemapBuffer = await streamToPromise(Readable.from(links).pipe(sitemap));

	return {
		status: 200,
		headers: {
			'Content-Type': 'application/xml',
			'Content-Encoding': 'gzip'
		},
		body: sitemapBuffer.toString()
	};
};
