declare namespace HomeScssNamespace {
  export interface IHomeScss {
    barsContainer: string;
    basic: string;
    chartCard: string;
    chartCardHead: string;
    entertainment: string;
    homeGrid: string;
    lastWeek: string;
    mainChart: string;
    overBudget: string;
    pieGroups: string;
    subhead: string;
  }
}

declare const HomeScssModule: HomeScssNamespace.IHomeScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HomeScssNamespace.IHomeScss;
};

export = HomeScssModule;
