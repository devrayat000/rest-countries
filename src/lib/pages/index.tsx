import { useQuery } from "react-query";

import CountryCard from "$lib/components/country-card";
import Region from "$lib/components/region";
import Search from "$lib/components/search";
import { getAllCountries } from "$lib/services/country-list";

const HomePage = () => {
  const { data: countries } = useQuery("countries", getAllCountries);

  return (
    <main className="p-5 md:p-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <Search />
        <Region />
      </div>
      <section className="p-8 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-10">
        {countries?.map((country) => (
          <CountryCard key={country.ccn3} country={country} />
        ))}
      </section>
    </main>
  );
};

export default HomePage;
