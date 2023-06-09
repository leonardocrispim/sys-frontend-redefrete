'use client';
import { usePathname } from 'next/navigation';
import { useGlobalsContext } from '@/contexts/GlobalsContext';

import { AiOutlineClose } from 'react-icons/ai';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

import { AllMenus } from '@lib/menus/allMenus';
import { FaHome } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import { isMenuSelected } from '@utils/utils';
import { Menu, MenuLine } from 'MenuTypes';

import { useSession } from 'next-auth/react';


export default function MobileSidebar() {
  const { data, setData } = useGlobalsContext();
  const pathname = usePathname();

  const { data: session, status } = useSession();

  const user_type = session?.userdata.user_type || '';

  return (
    <>
      <Transition.Root show={data.isSideBarMobile} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={(e) => {
            setData({ ...data, isSideBarMobile: false });
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={(e) => {
                        setData({ ...data, isSideBarMobile: false });
                      }}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <AiOutlineClose
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-rede-gray-600 px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <Image
                      alt="logo horizontal"
                      src="/images/logo-p-horizontal.png"
                      width={150}
                      height={33}
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="space-y-1">
                          <li>
                            <Link
                              onClick={(e) => {
                                setData({ ...data, isSideBarMobile: false });
                              }}
                              href="/admin"
                              className={
                                (pathname == '/admin'
                                  ? 'bg-rede-gray-200 text-white'
                                  : 'text-rede-gray-300 hover:bg-rede-gray-600') +
                                ' group flex gap-x-2 rounded-md p-2 text-sm leading-6 font-semibold'
                              }
                            >
                              <FaHome
                                className={
                                  (pathname == '/admin'
                                    ? 'text-white'
                                    : 'text-rede-gray-200') +
                                  ` h-5 w-5 shrink-0`
                                }
                                aria-hidden="true"
                              />
                              Dashboard
                            </Link>
                          </li>
                        </ul>
                      </li>

                      {AllMenus.map((menuList: Menu, index: number) => {
                        if (!menuList.permission.includes(user_type)) {
                          return;
                        }
                        return (
                          <li key={`cat-menu-${index}`}>
                            <div className="text-md font-semibold text-rede-gray-200 border-b border-solid border-rede-gray-500">
                              {menuList.name}
                            </div>
                            <ul role="list" className=" mt-2 space-y-1">
                              {menuList.menu.map(
                                (item: MenuLine, indexLine: number) => {

                                  if (!item.permission.includes(user_type)) {
                                    return;
                                  }
                                  
                                  return (
                                  <li key={`line-menu-${indexLine}`}>
                                    <Link
                                      href={item.href}
                                      onClick={(e) => {
                                        setData({
                                          ...data,
                                          isSideBarMobile: false,
                                        });
                                      }}
                                      className={
                                        (isMenuSelected(pathname, item)
                                          ? 'bg-rede-gray-200 text-white'
                                          : 'text-rede-gray-300 hover:bg-rede-gray-600') +
                                        ' group flex gap-x-2 rounded-md p-2 text-sm  font-medium'
                                      }
                                    >
                                      <item.icon
                                        className={
                                          (isMenuSelected(pathname, item)
                                            ? 'text-white'
                                            : 'text-rede-gray-200') +
                                          ` h-5 w-5 shrink-0`
                                        }
                                        aria-hidden="true"
                                      />
                                      {item.name}
                                    </Link>
                                  </li>
                                )}
                              )}
                            </ul>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
