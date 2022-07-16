import { dehydrate, QueryCache, useQuery } from "react-query";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

import CountryCard from "$lib/components/country-card";
import Region from "$lib/components/region";
import Search from "$lib/components/search";
import { getCountriesByName } from "$lib/services/country-list";
import { createQueryClient } from "$lib/modules/rq-client";
import BaseLayout from "$lib/components/base-layout";

const countryCache = new QueryCache();
const countryClient = createQueryClient({ queryCache: countryCache });

const KEY = "country";

const HomePage = () => {
  const router = useRouter();

  const { data: countries } = useQuery(
    [KEY, "search", router.query.s as string],
    ({ queryKey }) => getCountriesByName(queryKey[2]),
    { enabled: !!router.query.s }
  );

  return (
    <BaseLayout>
      {countries?.map((country) => (
        <CountryCard key={country.ccn3} country={country} />
      ))}
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query?.s) {
    await countryClient.prefetchQuery(
      [KEY, "search", context.query.s as string],
      ({ queryKey }) => getCountriesByName(queryKey[2])
    );
  }

  return {
    props: {
      dehydratedState: dehydrate(countryClient),
    },
  };
};

export default HomePage;
