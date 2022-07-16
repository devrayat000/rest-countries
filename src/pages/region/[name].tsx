import { dehydrate, QueryCache, useQuery } from "react-query";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

import CountryCard from "$lib/components/country-card";
import Region from "$lib/components/region";
import Search from "$lib/components/search";
import { getCountriesByRegion } from "$lib/services/country-list";
import { createQueryClient } from "$lib/modules/rq-client";
import { regions } from "$lib/utils/constants";
import { ParsedUrlQuery } from "querystring";
import BaseLayout from "$lib/components/base-layout";

const countryCache = new QueryCache();
const countryClient = createQueryClient({ queryCache: countryCache });

const KEY = "country";

const HomePage = () => {
  const router = useRouter();

  const { data: countries } = useQuery(
    [KEY, "region", router.query.name as string],
    ({ queryKey }) => getCountriesByRegion(queryKey[2]),
    { enabled: !!router.query.name }
  );

  return (
    <BaseLayout>
      {countries?.map((country) => (
        <CountryCard key={country.ccn3} country={country} />
      ))}
    </BaseLayout>
  );
};

export const getStaticPaths: GetStaticPaths<RegionPaths> = async (ctx) => {
  return {
    paths: regions.map((r) => ({ params: { name: r.toLowerCase() } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<object, RegionPaths> = async (
  ctx
) => {
  const name = ctx.params?.name;

  if (!name) {
    return {
      notFound: true,
    };
  }

  await countryClient.prefetchQuery([KEY, "region", name], ({ queryKey }) =>
    getCountriesByRegion(queryKey[2])
  );

  return {
    props: {
      dehydratedState: dehydrate(countryClient),
    },
  };
};

interface RegionPaths extends ParsedUrlQuery {
  name: string;
}

export default HomePage;
