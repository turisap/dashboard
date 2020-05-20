declare namespace StylesScssNamespace {
  export interface IStylesScss {
    hasMessages: string;
    image: string;
    messages: string;
    nav: string;
    notification: string;
    notificationsContainer: string;
    open: string;
    settings: string;
  }
}

declare const StylesScssModule: StylesScssNamespace.IStylesScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesScssNamespace.IStylesScss;
};

export = StylesScssModule;
