'use client';
import { useSession } from 'next-auth/react';
import { getHubs } from '@/lib/hubs/getHubs';

import { AiOutlineCheck } from 'react-icons/ai';
import { BsChevronCompactDown } from 'react-icons/bs';
import { Listbox, Transition } from '@headlessui/react';

import { Hub } from 'HubsTypes';
import { UserHubsVin } from 'UsersTypes';

import React, {
  Fragment,
  useState,
  useEffect,
  ForwardedRef,
  Dispatch,
  SetStateAction,
} from 'react';

type DataProps = {
  hubs: Hub[];
  setHubs: Dispatch<SetStateAction<Hub[]>>;
};

export default function FormHubsOptions({ hubs, setHubs }: DataProps) {
  const { data: session, status } = useSession();

  const [hubsList, setHubsList] = useState<Hub[]>([]);
  const hubs_ids = hubs.length <= 0 ? [] : hubs.map((hub) => hub.hub_id);

  useEffect(() => {
    setHubsList([]);

    if (!session) {
      return;
    }

    if (session?.userdata.user_type == 'DISPATCHER') {
      const dispHub: Hub[] | undefined =
        session?.userdata.rd_vin_users_hubs?.map((vin: UserHubsVin) => {
          return vin.rd_hubs;
        });

      if (dispHub) {
        setHubsList(dispHub);
        const thisHub = dispHub.filter((hub: Hub) =>
          hubs_ids.includes(hub.hub_id)
        );
      }
    } else {
      getHubs().then((hubsList: Hub[]) => {
        setHubsList(hubsList);

        const thisHub = hubs.filter((hub: Hub) => {
          return hubs_ids.includes(hub.hub_id);
        });
      });
    }
  }, [session]);

  return (
    hubsList && (
      <>
        {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        <Listbox
          value={hubs}
          onChange={(vals) => {
            setHubs(vals);
          }}
          multiple
        >
          {({ open }) => (
            <>
              <div className="relative">
                <Listbox.Button className="relative w-full text-sm border rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-500 ">
                  <span className="flex items-center">
                    <span className="bg-gray-200 inline-block h-2 w-2 flex-shrink-0 rounded-full" />
                    <span className="ml-3 block truncate">
                      {hubs.length > 0
                        ? `Selecionado(s) ${hubs.length} hub's`
                        : "Todos os Hub's"}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <BsChevronCompactDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {hubsList.map((hub: any) => (
                      <Listbox.Option
                        key={hub.hub_id}
                        className="text-gray-500 relative cursor-default select-none py-2 pl-3 pr-9"
                        value={hub}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <span className="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-gray-200 mr-1" />
                              <span
                                className={
                                  (selected ? 'font-semibold' : 'font-normal') +
                                  'ml-3 block truncate'
                                }
                              >
                                {hub.hub_name}
                              </span>
                            </div>

                            {selected ? (
                              <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                                <AiOutlineCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </>
    )
  );
}
