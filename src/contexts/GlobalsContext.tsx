'use client';

import { createContext, useContext, useState } from 'react';

interface GlobalsContextType {
  data: {
    isSideBarMobile: boolean;
  };
  setData: React.Dispatch<
    React.SetStateAction<{
      isSideBarMobile: boolean;
    }>
  >;
}

export const GlobalsContext = createContext<GlobalsContextType>({
  data: {
    isSideBarMobile: false,
  },
  setData: () => {},
});

export function GlobalsTypeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState({
    isSideBarMobile: false,
  });
  return (
    <GlobalsContext.Provider value={{ data, setData }}>
      {children}
    </GlobalsContext.Provider>
  );
}

export const useGlobalsContext = (): GlobalsContextType =>
  useContext(GlobalsContext);
