'use client';

import { useGlobalsContext } from '@/contexts/GlobalsContext';
import { signOut, useSession } from 'next-auth/react';

import { Menu } from '@headlessui/react';

import { FaBars, FaSearch, FaChevronDown } from 'react-icons/fa';

export default function TopBar() {
  const { data, setData } = useGlobalsContext();
  const { data: session, status } = useSession();

  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() =>
            setData({
              ...data,
              isSideBarMobile: !data.isSideBarMobile,
            })
          }
        >
          <span className="sr-only">Open sidebar</span>
          <FaBars className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 ">
          <form
            className="relative flex flex-1 "
            action="/admin/routes"
            method="GET"
          >
            <label htmlFor="search-field" className="sr-only">
              Buscar Rota
            </label>
            <FaSearch
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              id="s-topbar"
              className="block bg-white h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
              placeholder="Buscar Rota..."
              type="search"
              name="s"
            />
          </form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <FaRegBell className="h-6 w-6" aria-hidden="true" />
            </button> */}

            {/* Separator */}
            <div
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              aria-hidden="true"
            />

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full bg-gray-50"
                  src="/images/user-lorem.jpg"
                  alt=""
                />
                <span className="hidden lg:flex lg:items-center">
                  <span
                    className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                    aria-hidden="true"
                  >
                    {session?.user?.name}
                  </span>
                  <FaChevronDown
                    className="ml-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Menu.Button>

              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item key="sair">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="block px-3 py-1 text-sm leading-6 text-red-700"
                  >
                    Sair
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}
