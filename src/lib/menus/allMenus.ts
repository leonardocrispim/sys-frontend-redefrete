import { MdCarRepair } from 'react-icons/md';
import {
  FaCarSide,
  FaClipboardList,
  FaUserClock,
  FaUserPlus,
} from 'react-icons/fa';
import { BsPersonVcard, BsCardChecklist } from 'react-icons/bs';

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
  {
    name: 'Pré Cadastros',
    permission: ['ADMIN', 'OPERADOR', 'CAPTADOR'],
    menu: [
      {
        name: 'Novo Cadastro',
        href: '/admin/registrations/new',
        icon: FaUserClock,
        permission: ['ADMIN', 'OPERADOR', 'CAPTADOR'],
      },
      {
        name: 'Lista de Cadastros',
        href: '/admin/registrations',
        icon: FaClipboardList,
        permission: ['ADMIN', 'OPERADOR', 'CAPTADOR'],
      },
    ],
  },
  {
    name: 'Motoristas',
    permission: ['ADMIN'],
    menu: [
      {
        name: 'Novo Motorista',
        href: '/admin/drivers/new',
        icon: FaUserPlus,
        permission: ['ADMIN'],
      },
      {
        name: 'Motoristas Cadastrados',
        href: '/admin/drivers',
        icon: BsPersonVcard,
        permission: ['ADMIN'],
      },
    ],
  },
  {
    name: 'Veículos',
    permission: [],
    menu: [
      // {
      //   name: 'Pré Cadastro',
      //   href: '#',
      //   icon: FaUserClock,
      //   permission: ['ADMIN'],
      // },
      {
        name: 'Novo Veículo',
        href: '#',
        icon: MdCarRepair,
        permission: ['ADMIN'],
      },
      {
        name: 'Veículos Cadastrados',
        href: '#',
        icon: FaCarSide,
        permission: ['ADMIN'],
      },
    ],
  },
];
