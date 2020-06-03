declare namespace AdditionsScssNamespace {
  export interface IAdditionsScss {
    container: string;
    expense: string;
    expenseHeaders: string;
    expenseRow: string;
    expenseRowLoading: string;
    iconContainer: string;
    modalBtn: string;
    modalBtnDisabled: string;
    modalControls: string;
    modalHead: string;
    modalSubhead: string;
    modalSummAdd: string;
    modalWrapper: string;
    starIcon: string;
    table: string;
    virListContainer: string;
  }
}

declare const AdditionsScssModule: AdditionsScssNamespace.IAdditionsScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AdditionsScssNamespace.IAdditionsScss;
};

export = AdditionsScssModule;
