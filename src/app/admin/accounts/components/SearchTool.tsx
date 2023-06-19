'use client';
import { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import SearchListTable from './SearchListTable';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getRegistrations } from '@/lib/registrations/getRegistrations';
import { ApiReturn } from 'UtilsTypes';
import FeedbackInfo from '@/components/utils/feedbacks/FeedbackInfo';
import FeedbackError from '@/components/utils/feedbacks/FeedbackError';
import Paginate from '@/components/utils/Paginate';
import { Account } from 'AccountsTypes';
import { getAccounts } from '@/lib/accounts/getAccounts';

export default function SearchTool() {
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 20;

  const searchParams = useSearchParams();
  const route = useRouter();

  const [totalItems, setTotalItems] = useState<number>(0);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Account[] | undefined | null>();

  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page'))
  );

  const [search, setSearch] = useState<string>(searchParams.get('s') || '');
  const [searchBack, setSearchBack] = useState<string>(
    searchParams.get('s') || ''
  );

  function searchAccounts() {
    setAccounts(null);
    setIsError(false);
    setIsEmpty(false);
    setIsLoading(true);

    getAccounts({
      s: search,
      skip: currentPage * itemsPerPage,
      take: itemsPerPage,
    })
      .then((data: ApiReturn<Account[]>) => {
        if (data.return == 'success') {
          if (data.data && data.data.length == 0) {
            setIsEmpty(true);
            setTotalItems(0);
          } else {
            setTotalItems(Number(data.count_total));
            setAccounts(data.data);
          }
        } else {
          setTotalItems(0);
          setIsError(true);
        }

        route.push(pathname + `?s=${search}&page=${currentPage}`);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (search == searchBack) {
      searchAccounts();
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0);
    setSearchBack(search);
    searchAccounts();
  }, [search]);

  return (
    <>
      <div className="mb-6">
        <SearchForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          search={search}
          setSearch={setSearch}
        />
      </div>

      {isEmpty && (
        <FeedbackInfo text="Nenhuma conta encontrada, por favor refaça a busca!" />
      )}

      {isError && (
        <FeedbackError text="Houve um erro de conexão, por favor tente mais tarde!" />
      )}

      <SearchListTable
        accounts={accounts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {!isLoading && !isError && !isEmpty && (
        <div className="flex justify-end mt-4 pb-20">
          <Paginate
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            hook={setCurrentPage}
          />
        </div>
      )}
    </>
  );
}
