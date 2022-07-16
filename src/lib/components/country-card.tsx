import Link from "next/link";

import Info from "./info";
import { FilteredCountry } from "$lib/services/country-list";

type Props = {
  country: FilteredCountry;
};

const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <Link href="/c/[code]" as={`/c/${country.ccn3}`}>
      <a
        title={country.name.official}
        className="shadow-md rounded-md text-inherit bg-light-card dark:bg-dark-card overflow-hidden no-underline"
      >
        <img
          className="my-0 h-52 w-full"
          src={country.flags.png}
          alt={country.name.official}
        />

        <div className="p-6 pb-8">
          <h3 className="text-inherit my-0 mb-4 font-extrabold truncate">
            {country.name.official}
          </h3>
          <Info
            label="Population"
            value={country.population.toLocaleString()}
          />
          <Info label="Region" value={country.region} />
          <Info label="Capital" value={country.capital[0]} />
        </div>
      </a>
    </Link>
  );
};

export default CountryCard;
