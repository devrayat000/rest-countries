import { json, type LoaderFunction } from "@remix-run/node";
import type { FilteredCountry } from "~/lib/services/country-list";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${query}/?fields=name,flags,ccn3`
  );
  const countries = (await res.json()) as FilteredCountry[];

  return json({ countries });
};
