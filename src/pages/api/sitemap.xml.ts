import { createGzip } from "node:zlib";
import { Readable } from "node:stream";
import { SitemapStream, streamToPromise } from "sitemap";
import { NextApiHandler } from "next";

import type { Country } from "$lib/interfaces/country";

const handler: NextApiHandler = async (req, res) => {
  const sitemap = new SitemapStream({
    hostname: "https://every-country.netlify.app/",
  });
  sitemap.pipe(createGzip());

  const resp = await fetch(
    "https://restcountries.com/v3.1/all?fields=ccn3,flags"
  );
  const countries = (await resp.json()) as Country[];

  const links: any[] = [];
  countries.forEach((c) => {
    links.push({
      url: `/c/${c.ccn3}`,
      img: [c.flags.png],
      video: [],
      links: [],
      changefreq: "daily",
      priority: 0.8,
    });
  });

  const sitemapBuffer = await streamToPromise(
    Readable.from(links).pipe(sitemap)
  );

  res
    .status(200)
    .setHeader("Content-Type", "application/xml")
    .setHeader("Cache-Control", "max-age=0, s-maxage=3600")
    .setHeader("Content-Encoding", "gzip")
    .send(sitemapBuffer.toString());
};

export default handler;
