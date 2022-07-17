import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import { Form, Link, useFetcher, useSearchParams } from "@remix-run/react";
import debounce from "lodash.debounce";

import type { FilteredCountry } from "../services/country-list";

const Search = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [params] = useSearchParams();
  const fetcher = useFetcher<{ countries: FilteredCountry[] }>();

  useEffect(() => {
    if (inputRef.current && params.get("s")) {
      inputRef.current.value = decodeURIComponent(params.get("s") as string);
    }
  }, [params, inputRef]);

  const handleSearchAutocomplete = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const input = e.target.value;

      if (!input) {
        return;
      }
      fetcher.load(`/api/autocomplete?query=${input}`);

      // console.log(countries);
      // open = true;
      setOpen(true);
    },
    1500,
    {
      leading: false,
      trailing: true,
    }
  );

  return (
    <section className="text-justify">
      <Menu
        as="div"
        className="relative inline-block text-left w-full md:w-96 z-50"
      >
        <Form
          method="get"
          action="/"
          className="rounded-md shadow-md py-2 px-7 bg-light-card dark:bg-dark-card flex items-center w-full md:w-96"
        >
          <SearchIcon className="h-6 w-6 text-inherit" />
          <input
            type="search"
            name="s"
            id="search"
            ref={inputRef}
            onChange={(e) => handleSearchAutocomplete(e)}
            placeholder="Search for a country..."
            className="flex-1 ml-3 bg-inherit text-inherit placeholder:text-gray-300 text-sm border-none focus:border-none focus:outline-none focus:ring-0 focus-visible:outline-none"
          />
        </Form>
        <Transition
          show={open}
          as="div"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            // {open}
            className="absolute z-50 left-0 md:right-0 md:left-auto mt-2 w-full origin-top-left rounded-md bg-light-card dark:bg-dark-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="px-1 py-1">
              {fetcher.data?.countries?.map((country) => (
                <Menu.Item
                  key={country.ccn3}
                  as={Link}
                  to={`/c/${country.ccn3}`}
                  className={({ active }) =>
                    `${
                      active && "bg-light-bg dark:bg-dark-bg"
                    } no-underline text-inherit group flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`
                  }
                >
                  <img
                    src={country.flags.png}
                    alt={country.name.official}
                    className="inline w-7 my-0"
                  />
                  <span className="flex-1">{country.name.official}</span>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </section>
  );
};

export default Search;
