import { FaLayerGroup, FaClipboardList, FaUserClock } from 'react-icons/fa';

import { MdAccountBalance } from 'react-icons/md';

import { BsCardChecklist } from 'react-icons/bs';

export const AllMenus = [
  {
    name: 'Rotas',
    permission: ['ADMIN', 'DISPATCHER', 'OPERADOR'],
    menu: [
      {
        name: 'Lista de Rotas',
        href: '/admin/routes',
        icon: BsCardChecklist,
        permission: ['ADMIN', 'DISPATCHER', 'OPERADOR'],
      },
    ],
  },
  // {
  //   name: 'Contas',
  //   permission: ['ADMIN'],
  //   menu: [
  //     {
  //       name: 'Nova Conta',
  //       href: '/admin/accounts/new',
  //       icon: MdAccountBalance,
  //       permission: ['ADMIN'],
  //     },
  //     {
  //       name: 'Lista de Contas',
  //       href: '/admin/accounts',
  //       icon: FaLayerGroup,
  //       permission: ['ADMIN'],
  //     },
  //   ],
  // },
  // {
  //   name: 'Pré Cadastros',
  //   permission: ['ADMIN', 'OPERADOR', 'CAPTADOR'],
  //   menu: [
  //     {
  //       name: 'Novo Cadastro',
  //       href: '/admin/registrations/new',
  //       icon: FaUserClock,
  //       permission: ['ADMIN', 'OPERADOR', 'CAPTADOR'],
  //     },
  //     {
  //       name: 'Lista de Cadastros',
  //       href: '/admin/registrations',
  //       icon: FaClipboardList,
  //       permission: ['ADMIN', 'OPERADOR', 'CAPTADOR'],
  //     },
  //   ],
  // },
];
