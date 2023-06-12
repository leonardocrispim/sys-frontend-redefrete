import { BsPersonVcard } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { AiOutlineUnorderedList } from 'react-icons/ai';

export const tabsPages = [
  {
    name: 'Dados do Motorista',
    href: '',
    icon: BiUser,
    current: true,
  },
  {
    name: 'Documentos',
    href: '/documents',
    icon: BsPersonVcard,
    current: false,
  },
  {
    name: 'Histórico',
    href: '/history',
    icon: AiOutlineUnorderedList,
    current: false,
  },
];

export type tabsPagesKeys = keyof typeof tabsPages;
