import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import BaseLayout from "~/lib/components/base-layout";
import CountryCard from "~/lib/components/country-card";
import {
  type FilteredCountry,
  getAllCountries,
  getCountriesByRegion,
  getCountriesByName,
} from "~/lib/services/country-list";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const region = url.searchParams.get("r");
  const search = url.searchParams.get("s");

  let countries: FilteredCountry[];

  if (region) {
    countries = await getCountriesByRegion(region);
  } else if (search) {
    countries = await getCountriesByName(search);
  } else {
    countries = await getAllCountries();
  }

  return countries;
};

export default function HomePage() {
  const countries = useLoaderData<FilteredCountry[]>();

  return (
    <BaseLayout>
      {countries?.map((country) => (
        <CountryCard key={country.ccn3} country={country} />
      ))}
    </BaseLayout>
  );
}
