declare namespace DeductionsScssNamespace {
  export interface IDeductionsScss {
    container: string;
    expenseHeaders: string;
    expenseRow: string;
    iconContainer: string;
    starIcon: string;
    table: string;
  }
}

declare const DeductionsScssModule: DeductionsScssNamespace.IDeductionsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DeductionsScssNamespace.IDeductionsScss;
};

export = DeductionsScssModule;
