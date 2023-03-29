import {
  defer,
  type HeadersFunction,
  type LoaderArgs,
  type MetaFunction,
} from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { Suspense } from "react";

import BaseLayout from "~/lib/components/base-layout";
import CountryCard from "~/lib/components/country-card";
import { SkeletonLoader } from "~/lib/components/shimmer";
import {
  type FilteredCountry,
  getAllCountries,
  getCountriesByRegion,
  getCountriesByName,
} from "~/lib/services/country-list.server";

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

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const region = url.searchParams.get("r");
  const search = url.searchParams.get("s");

  let countries: Promise<FilteredCountry[]>;

  if (region) {
    countries = getCountriesByRegion(region);
  } else if (search) {
    countries = getCountriesByName(search);
  } else {
    countries = getAllCountries();
  }

  return defer({ countries });
};

export default function HomePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <BaseLayout>
      <Suspense fallback={<SkeletonLoader />}>
        <Await resolve={data.countries}>
          {(countries) =>
            countries?.map((country) => (
              <CountryCard key={country.ccn3} country={country} />
            ))
          }
        </Await>
      </Suspense>
    </BaseLayout>
  );
}
