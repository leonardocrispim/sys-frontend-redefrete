import { BsPersonVcard } from 'react-icons/bs';
import { MdAccountBalance } from 'react-icons/md';
import { AiFillCar, AiOutlineHistory } from 'react-icons/ai';
import { HiOutlineBanknotes } from 'react-icons/hi2';

export const tabsPages = [
  {
    name: 'Geral',
    href: '',
    icon: MdAccountBalance,
    current: 'data',
  },
  {
    name: 'Motoristas',
    href: '/drivers',
    icon: BsPersonVcard,
    current: 'drivers',
  },
  {
    name: 'Veículos',
    href: '/vehicles',
    icon: AiFillCar,
    current: 'vehicles',
  },
  {
    name: 'Dados Bancários',
    href: '/bank',
    icon: HiOutlineBanknotes,
    current: 'bank',
  },
  {
    name: 'Histórico',
    href: '/history',
    icon: AiOutlineHistory,
    current: 'history',
  },
];

export type tabsPagesKeys = keyof typeof tabsPages;
