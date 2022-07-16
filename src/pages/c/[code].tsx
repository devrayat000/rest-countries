import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";

import Info from "$lib/components/info";
import {
  extractCurrencies,
  extractLanguages,
  extractNativeName,
} from "$lib/utils/functions";
import { ParsedUrlQuery } from "querystring";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import {
  getAllCountryCodes,
  getBorderCountries,
  getCountryByCode,
} from "$lib/services/country-list";
import { dehydrate, QueryCache, useQuery } from "react-query";
import { createQueryClient } from "$lib/modules/rq-client";
import Link from "next/link";

const countryCache = new QueryCache();
const countryClient = createQueryClient({ queryCache: countryCache });

const CountryDetailsPage = () => {
  const router = useRouter();
  const code = router.query.code as string;

  const { data: country } = useQuery(["country", code], ({ queryKey }) =>
    getCountryByCode(queryKey[1])
  );
  const { data: borderCountries } = useQuery(
    ["borders", code],
    () => getBorderCountries(country?.borders!),
    {
      enabled: !!country?.borders && country.borders.length > 0,
    }
  );

  return (
    <main className="p-6 md:p-12 min-h-screen">
      <div>
        <button
          onClick={() => router.back()}
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
            src={country?.flags.png}
            alt={country?.name.official}
          />
        </section>
        <article className="md:flex-1 my-6">
          <h2 className="text-inherit font-extrabold my-0">
            {country?.name.official}
          </h2>
          <br className="h-5" />
          <div className="flex flex-col md:flex-row gap-7">
            <section>
              <Info
                label="Native Name"
                value={
                  country?.name.nativeName &&
                  extractNativeName(country.name.nativeName)[0]
                }
              />
              <Info
                label="Population"
                value={country?.population.toLocaleString()}
              />
              <Info label="Region" value={country?.region} />
              <Info label="Sub Region" value={country?.subregion} />
              <Info label="Capital" value={country?.capital[0]} />
            </section>
            <section>
              <Info label="Top Level Domain" value={country?.tld[0]} />
              <Info
                label="Currencies"
                value={
                  country?.currencies &&
                  extractCurrencies(country?.currencies).join(", ")
                }
              />
              <Info
                label="Languages"
                value={
                  country?.languages &&
                  extractLanguages(country?.languages).join(", ")
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
              <Link key={border.ccn3} href="/c/[code]" as={`/c/${border.ccn3}`}>
                <a className="text-center text-inherit no-underline bg-light-card dark:bg-dark-card text-xs px-6 py-1 shadow-md">
                  {border.name.common}
                </a>
              </Link>
            ))}
          </section>
        </article>
      </div>
    </main>
  );
};

interface CountryCodePath extends ParsedUrlQuery {
  code: string;
}

export const getStaticPaths: GetStaticPaths<CountryCodePath> = async (ctx) => {
  const countries = await getAllCountryCodes();

  return {
    paths: countries.slice(0, 10).map((c) => ({ params: { code: c.ccn3 } })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<object, CountryCodePath> = async (
  context
) => {
  const code = context.params?.code;

  if (!code) {
    return {
      notFound: true,
    };
  }

  try {
    const country = await getCountryByCode(code);
    countryClient.setQueryData(["country", code], country);

    if (!!country.borders && country.borders.length > 0) {
      await countryClient.prefetchQuery(["borders", code], () =>
        getBorderCountries(country.borders)
      );
    }

    return {
      props: {
        dehydratedState: dehydrate(countryClient),
      },
      revalidate: 60 * 60 * 24, // 1 day
    };
  } catch (error) {
    console.log(error);

    return {
      notFound: true,
    };
  }
};

// export const getServerSideProps: GetServerSideProps<
//   object,
//   CountryCodePath
// > = async (context) => {
//   const code = context.params?.code;

//   if (!code) {
//     return {
//       notFound: true,
//     };
//   }

//   const country = await getCountryByCode(code);
//   countryClient.setQueryData(["country", code], country);

//   if (!!country.borders && country.borders.length > 0) {
//     await countryClient.prefetchQuery(["borders", code], () =>
//       getBorderCountries(country.borders)
//     );
//   }

//   return {
//     props: {
//       dehydratedState: dehydrate(countryClient),
//     },
//   };
// };

export default CountryDetailsPage;
