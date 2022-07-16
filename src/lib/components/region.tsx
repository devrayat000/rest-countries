import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import clsx from "clsx";

import { regions } from "$lib/utils/constants";
import Link from "next/link";
// import { page } from '$app/stores';

const Region = () => {
  const router = useRouter();
  return (
    <section className="text-left">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center gap-4 w-full justify-center shadow-md rounded-md bg-light-card dark:bg-dark-card px-6 py-4 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {/* @ts-ignore */}
            {({ open }) => (
              <>
                <span>Find by Region</span>
                <ChevronDownIcon
                  className={clsx(
                    "ml-2 -mr-1 h-5 w-5 transition-transform",
                    open && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </Menu.Button>
        </div>
        <Transition
          as="div"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 md:right-0 md:left-auto mt-2 w-56 origin-top-left rounded-md bg-light-card dark:bg-dark-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {regions.map((region) => (
                <Link
                  key={region}
                  href={{
                    pathname: "/",
                    query: {
                      r: region.toLowerCase(),
                    },
                  }}
                  passHref
                >
                  <Menu.Item
                    aria-selected={router.query.r === region.toLowerCase()}
                    as="a"
                    className={({ active }) =>
                      clsx(
                        active && "bg-light-bg dark:bg-dark-bg",
                        "no-underline text-inherit group flex w-full items-center rounded-md px-2 py-2 text-sm"
                      )
                    }
                  >
                    {region}
                  </Menu.Item>
                </Link>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </section>
  );
};

export default Region;
