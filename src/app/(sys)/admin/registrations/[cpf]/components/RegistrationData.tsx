'use client';

import { Registration } from 'RegistrationsTypes';
import { useState } from 'react';
import RegistrationInfo from './dataEditForm/RegistrationInfo';
import RegistrationEdit from './dataEditForm/RegistrationEdit';

type DataType = {
  registration: Registration;
};

export default function RegistrationData({ registration }: DataType) {
  const [currentRegistration, setCurrentRegistration] =
    useState<Registration>(registration);

  const [tab, setTab] = useState<'data' | 'edit'>('data');
  const [isSaved, setIsSaved] = useState(false);

  return tab == 'data' ? (
    <RegistrationInfo
      registration={currentRegistration}
      setTab={setTab}
      isSaved={isSaved}
      setIsSaved={setIsSaved}
    />
  ) : (
    <RegistrationEdit
      registration={currentRegistration}
      setCurrentRegistration={setCurrentRegistration}
      setTab={setTab}
      setIsSaved={setIsSaved}
    />
  );
}
