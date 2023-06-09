'use client';
import { useTheme } from 'next-themes';

import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme == 'dark' ? true : false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handlerChange = () => {
    const hab = !enabled;
    setEnabled(hab);
    setTheme(hab ? 'dark' : 'light');
  };

  return (
    <div>
      <div className="flex justify-center gap-3 items-center">
        <p className="text-slate-700 dark:text-slate-300">Claro</p>
        <Switch
          checked={enabled}
          onChange={handlerChange}
          className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full "
        >
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'bg-gray-200' : 'bg-slate-400',
              'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border  bg-slate-500 shadow ring-0 transition-transform duration-200 ease-in-out'
            )}
          />
        </Switch>
        <p className="text-slate-700 dark:text-slate-300">Escuro</p>
      </div>
    </div>
  );
}
