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

  return tab == 'data' ? (
    <RegistrationInfo registration={currentRegistration} setTab={setTab} />
  ) : (
    <RegistrationEdit
      registration={currentRegistration}
      setCurrentRegistration={setCurrentRegistration}
      setTab={setTab}
    />
  );
}
