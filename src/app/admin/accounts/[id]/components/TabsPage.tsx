'use client';
import { classNames } from '@/lib/utils/utils';
import { tabsPages } from '@utils/accountsConstants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type PropsType = {
  account_id?: number;
  current: string;
};

export default function TabsPage({ account_id, current }: PropsType) {
  const router = useRouter();

  const currentPage = tabsPages.find((tab) => tab.current == current);

  const currentLink = currentPage
    ? `/admin/accounts/${account_id || 0}${currentPage.href}`
    : '';

  return (
    <div>
      <div className="sm:hidden">
        <select
          id="tabs"
          name="tabs"
          className="block bg-white w-full text-sm p-2 border rounded-md focus:outline-0 text-rede-gray-300 placeholder:text-rede-gray-500 placeholder:text-sm"
          onChange={(e) => {
            router.push(e.target.value);
          }}
          defaultValue={currentLink}
        >
          {tabsPages.map((tab) => (
            <option
              key={tab.name}
              value={`/admin/accounts/${account_id}${tab.href}`}
            >
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabsPages.map((tab) => {
              return (
                <Link
                  key={tab.name}
                  href={`/admin/accounts/${account_id}${tab.href}`}
                  className={classNames(
                    tab.current == current
                      ? 'border-rede-red-300 text-rede-red-300'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  <tab.icon
                    className={classNames(
                      tab.current == current
                        ? 'text-rede-red-300'
                        : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-0.5 mr-2 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
