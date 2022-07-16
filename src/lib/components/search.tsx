import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// import { goto } from '$app/navigation';
// import { page } from '$app/stores';
import debounce from "lodash.debounce";
import { SearchIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";

import type { Country } from "$lib/interfaces/country";

// let input = $page.url.searchParams.get('s') ?? '';
// let open = false;
// let countries: Country[];

// onDestroy(handleSearchAutocomplete.cancel);

const Search = () => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function searchCountry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputRef.current?.value) {
      router.push({
        pathname: "/",
        query: {
          s: encodeURIComponent(inputRef.current?.value),
        },
      });
    }
    // return goto(`/?s=${input}`);
  }

  useEffect(() => {
    if (inputRef.current && router.query.s) {
      inputRef.current.value = decodeURIComponent(router.query.s as string);
    }
  }, [router.query.s, inputRef]);

  // const handleSearchAutocomplete = useCallback(debounce(
  // 	async (e: Event) => {
  // 		e.preventDefault();
  // 		if (!input) {
  // 			return;
  // 		}
  // 		const res = await fetch(
  // 			`https://restcountries.com/v3.1/name/${input}/?fields=name,flags,ccn3`
  // 		);
  // 		countries = (await res.json()) as Country[];

  // 		console.log(countries);
  // 		open = true;
  // 	},
  // 	1500,
  // 	{
  // 		leading: false,
  // 		trailing: true
  // 	}
  // ),[]);

  return (
    <section className="text-justify">
      <Menu as="div" className="relative inline-block text-left w-full md:w-96">
        <form
          onSubmit={searchCountry}
          className="rounded-md shadow-md py-2 px-7 bg-light-card dark:bg-dark-card flex items-center w-full md:w-96"
        >
          <SearchIcon className="h-6 w-6 text-inherit" />
          <input
            type="search"
            name="search"
            id="search"
            ref={inputRef}
            // onChange={(e) => handleSearchAutocomplete(e)}
            placeholder="Search for a country..."
            className="flex-1 ml-3 bg-inherit text-inherit placeholder:text-gray-300 text-sm border-none focus:border-none focus:outline-none focus:ring-0 focus-visible:outline-none"
          />
        </form>
        <Transition
          show={open && !!inputRef.current?.value}
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
              {/* {#each countries as country (country.name.official)}
						<Menu.Item
							as="a"
							href="/c/{country.ccn3}"
							className={({ active }) =>
								`${
									active && 'bg-light-bg dark:bg-dark-bg'
								} no-underline text-inherit group flex gap-3 w-full items-center rounded-md px-2 py-2 text-sm`}
						>
							<img src={country.flags.png} alt={country.name.official} className="inline w-7 my-0" />
							<span className="flex-1">
								{country.name.official}
							</span>
						</Menu.Item>
					{/each} */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </section>
  );
};

export default Search;
