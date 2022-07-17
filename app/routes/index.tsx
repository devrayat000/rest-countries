import type {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import BaseLayout from "~/lib/components/base-layout";
import CountryCard from "~/lib/components/country-card";
import {
  type FilteredCountry,
  getAllCountries,
  getCountriesByRegion,
  getCountriesByName,
} from "~/lib/services/country-list";

export const meta: MetaFunction = ({ location }) => {
  return {
    title: "Whole World - Informative International App",
    description: "Get infromation about any country in the world.",
    keywords: ["country", "rest", "travel", "info", "informative"].join(","),
    robots: ["index", "nofollow"].join(","),
    "og:title": "Whole World - Informative International App",
    "og:description": "Get infromation about any country in the world.",
    "og:url": "https://every-country.netlify.app" + location.pathname,
    "og:type": "website",
    "og:image": "/demo/desktop-preview.jpg",
    "og:image:alt": "Whole World Preview",
    "twitter:title": "Whole World - Informative International App",
    "twitter:description": "Get infromation about any country in the world.",
    "twitter:image": "/demo/desktop-preview.jpg",
    "twitter:image:alt": "Whole World Preview",
  };
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=0, s-maxage=3600",
  };
};

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
