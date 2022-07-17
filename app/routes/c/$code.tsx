import { ArrowLeftIcon } from "@heroicons/react/outline";
import {
  redirect,
  type LoaderFunction,
  type HeadersFunction,
  type MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";

import Info from "~/lib/components/info";
import {
  getBorderCountries,
  getCountryByCode,
  type BorderCountry,
  type SingleCountry,
} from "~/lib/services/country-list.server";
import {
  extractCurrencies,
  extractLanguages,
  extractNativeName,
} from "~/lib/utils/functions";

export const meta: MetaFunction = ({ data: { country }, location }) => {
  return {
    title: country.name.official,
    description: "Get infromation about any country in the world.",
    keywords: ["country", "rest", "travel", "info", "informative"].join(","),
    robots: ["index", "nofollow"].join(","),
    "og:title": country.name.official,
    "og:description": "Get infromation about any country in the world.",
    "og:url": "https://every-country.netlify.app" + location.pathname,
    "og:type": "website",
    "og:image": country.flags.png,
    "og:image:alt": `Flag - ${country.name.official}`,
    "twitter:title": country.name.official,
    "twitter:description": "Get infromation about any country in the world.",
    "twitter:image": country.flags.png,
    "twitter:image:alt": `Flag - ${country.name.official}`,
  };
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=0, s-maxage=86400",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const code = params.code;

  if (!code) {
    return redirect("/");
  }

  const country = await getCountryByCode(code);
  const borderCountries = !country.borders
    ? null
    : await getBorderCountries(country.borders);

  return { country, borderCountries };
};

type Data = {
  country: SingleCountry;
  borderCountries: BorderCountry[] | null;
};

export default function CountryDetailsPage() {
  const { country, borderCountries } = useLoaderData<Data>();
  const navigate = useNavigate();

  return (
    <main className="p-6 md:p-12 min-h-screen">
      <div>
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="text-center no-underline bg-light-card dark:bg-dark-card text-xs px-6 py-1.5 shadow-md flex gap-2 items-center"
        >
          <ArrowLeftIcon className="h-3 w-3" />
          <span>Back</span>
        </button>
      </div>
      <br className="h-14" />
      <div className="flex flex-col md:flex-row justify-between md:gap-12">
        <section className="md:flex-1">
          <img
            className="m-0 w-full h-full"
            src={country.flags.png}
            alt={country.name.official}
          />
        </section>
        <article className="md:flex-1 my-6">
          <h2 className="text-inherit font-extrabold my-0">
            {country.name.official}
          </h2>
          <br className="h-5" />
          <div className="flex flex-col md:flex-row gap-7">
            <section>
              <Info
                label="Native Name"
                value={
                  country.name.nativeName &&
                  extractNativeName(country.name.nativeName)[0]
                }
              />
              <Info
                label="Population"
                value={country.population.toLocaleString()}
              />
              <Info label="Region" value={country.region} />
              <Info label="Sub Region" value={country.subregion} />
              <Info label="Capital" value={country.capital[0]} />
            </section>
            <section>
              <Info label="Top Level Domain" value={country.tld[0]} />
              <Info
                label="Currencies"
                value={
                  country.currencies &&
                  extractCurrencies(country.currencies).join(", ")
                }
              />
              <Info
                label="Languages"
                value={
                  country.languages &&
                  extractLanguages(country.languages).join(", ")
                }
              />
            </section>
          </div>
          <br className="h-7" />
          <h4 className="text-inherit font-extrabold mt-0">
            Border Countries:
          </h4>
          <section className="flex gap-3 flex-wrap">
            {borderCountries?.map((border) => (
              <Link
                key={border.ccn3}
                to={`/c/${border.ccn3}`}
                className="text-center text-inherit no-underline bg-light-card dark:bg-dark-card text-xs px-6 py-1 shadow-md"
              >
                {border.name.common}
              </Link>
            ))}
          </section>
        </article>
      </div>
    </main>
  );
}
