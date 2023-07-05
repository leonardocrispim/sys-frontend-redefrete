import { FaLayerGroup, FaClipboardList, FaUserClock } from 'react-icons/fa';

import { MdAccountBalance } from 'react-icons/md';

import { BsCardChecklist } from 'react-icons/bs';

export const AllMenus = [
  {
    name: 'Rotas',
    permission: ['ADMIN', 'DISPATCHER', 'OPERADOR', 'COORDENADOR'],
    menu: [
      {
        name: 'Lista de Rotas',
        href: '/admin/routes',
        icon: BsCardChecklist,
        permission: ['ADMIN', 'DISPATCHER', 'OPERADOR', 'COORDENADOR'],
      },
    ],
  },
  {
    name: 'Contas',
    permission: ['ADMIN'],
    menu: [
      {
        name: 'Nova Conta',
        href: '/admin/accounts/new',
        icon: MdAccountBalance,
        permission: ['ADMIN'],
      },
      {
        name: 'Lista de Contas',
        href: '/admin/accounts?s=&page=0',
        icon: FaLayerGroup,
        permission: ['ADMIN'],
      },
    ],
  },
];
