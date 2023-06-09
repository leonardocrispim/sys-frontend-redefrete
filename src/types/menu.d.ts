declare module 'MenuTypes' {
  export interface MenuLine {
    name: string;
    href: string;
    icon?: any;
    permission: string[];
  }

  export interface Menu {
    name: string;
    permission: string[];
    menu: MenuLine[];
  }
}
