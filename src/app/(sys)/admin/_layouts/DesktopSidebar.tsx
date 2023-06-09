'use client';
import { FaHome } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

import { isMenuSelected } from '@utils/utils';

import { usePathname } from 'next/navigation';

import { AllMenus } from '@lib/menus/allMenus';
import { Menu, MenuLine } from 'MenuTypes';

import { useSession } from 'next-auth/react';

export default function DesktopSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const user_type = session?.userdata.user_type || '';

  return (
    <>
      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-rede-gray-700 px-6 pb-4">
          <div className="flex pt-4 items-center">
            <Image
              alt="logo horizontal"
              src="/images/logo-p-horizontal.png"
              width={300}
              height={67}
            />
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-4">
              <li>
                <ul role="list" className="space-y-1">
                  <li>
                    <Link
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
                            : 'text-rede-gray-200') + ` h-5 w-5 shrink-0`
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
                          );
                        }
                      )}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
