'use client';

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

type DataType = {
  first_name: string;
};

interface ContextsProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: DataType[];
  setData: Dispatch<SetStateAction<DataType[]>>;
}

const AccountContext = createContext<ContextsProps>({
  userId: '',
  setUserId: (): string => '',
  data: [],
  setData: (): DataType[] => [],
});

export const AccountContextProvider = ({ children }: any) => {
  const [userId, setUserId] = useState('');
  const [data, setData] = useState<[] | DataType[]>([]);

  return (
    <AccountContext.Provider value={{ userId, setUserId, data, setData }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => useContext(AccountContext);
