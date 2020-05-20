declare namespace MenuScssNamespace {
  export interface IMenuScss {
    current: string;
    head: string;
    icon: string;
    link: string;
    menu: string;
    menuOpen: string;
    opener: string;
    route: string;
    tab: string;
    tabs: string;
    wrapper: string;
  }
}

declare const MenuScssModule: MenuScssNamespace.IMenuScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MenuScssNamespace.IMenuScss;
};

export = MenuScssModule;
