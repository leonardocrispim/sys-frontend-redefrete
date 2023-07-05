'use client';

import { useState } from 'react';
import { Account, Account_Address } from 'AccountsTypes';
import AccountInfo from './dataEditForm/AccountInfo';
import AccountEdit from './dataEditForm/AccountEdit';

type DataType = {
  account: Account_Address;
};

export default function AccountData({ account }: DataType) {
  const [currentAccount, setCurrentAccount] = useState<Account_Address>(account);

  const [tab, setTab] = useState<'data' | 'edit'>('data');
  const [isSaved, setIsSaved] = useState(false);

  return tab == 'data' ? (
    <AccountInfo
      account={currentAccount}
      setTab={setTab}
      isSaved={isSaved}
      setIsSaved={setIsSaved}
    />
  ) : (
    <AccountEdit
      account={currentAccount}
      setCurrentAccount={setCurrentAccount}
      setTab={setTab}
      setIsSaved={setIsSaved}
    />
  );
}
