'use client';

import { Driver } from 'DriversTypes';
import { useState } from 'react';
import DriverInfo from './DriverInfo';
import DriverEdit from './DriverEdit';

type DataType = {
  driver: Driver;
};

export default function DriverData({ driver }: DataType) {
  const [currentDriver, setCurrentDriver] = useState<Driver>(driver);
  const [tab, setTab] = useState<'data' | 'edit'>('data');
  const [isSaved, setIsSaved] = useState(false);

  console.log('manga', tab);

  return tab == 'data' ? (
    <DriverInfo
      driver={currentDriver}
      setTab={setTab}
      isSaved={isSaved}
      setIsSaved={setIsSaved}
    />
  ) : (
    <DriverEdit
      driver={currentDriver}
      setTab={setTab}
      isSaved={isSaved}
      setIsSaved={setIsSaved}
      setCurrentDriver={setCurrentDriver}
    />
  );
}
