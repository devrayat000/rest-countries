import { dehydrate, QueryCache, useQuery } from "react-query";
import { type GetStaticProps } from "next";

import CountryCard from "$lib/components/country-card";
import Region from "$lib/components/region";
import Search from "$lib/components/search";
import { getAllCountries } from "$lib/services/country-list";
import { createQueryClient } from "$lib/modules/rq-client";
import BaseLayout from "$lib/components/base-layout";

const countryCache = new QueryCache();
const countryClient = createQueryClient({ queryCache: countryCache });

const KEY = "countries";

const HomePage = () => {
  const { data: countries } = useQuery(KEY, getAllCountries);

  return (
    <BaseLayout>
      {countries?.map((country) => (
        <CountryCard key={country.ccn3} country={country} />
      ))}
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  await countryClient.prefetchQuery(KEY, getAllCountries);

  return {
    props: {
      dehydratedState: dehydrate(countryClient),
    },
  };
};

export default HomePage;
