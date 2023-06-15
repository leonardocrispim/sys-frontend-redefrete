import { tabsPages } from '@utils/registrationsConstants';
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type PropsType = {
  cpf_cnpj: string;
  current: string;
};

export default function TabsPage({ cpf_cnpj, current }: PropsType) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Selecione um Menu
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-rede-red-500 focus:ring-rede-red-500"
          //@ts-ignore
          defaultValue={tabsPages.find((tab) => tab.current == current).name}
        >
          {tabsPages.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
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
                  href={`/admin/registrations/${cpf_cnpj}${tab.href}`}
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