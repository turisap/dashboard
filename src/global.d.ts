declare module "react-hot-loader/root";
declare module "react-apexcharts";
declare module "react-icons/ai";
declare module "react-icons/ti";

export {};

declare global {
  const FontFace: FontFace;

  declare module "*.scss" {
    const content: { [className: string]: string };
    export default content;
  }

  interface Document {
    fonts: FontFaceSet;
  }

  interface Window {
    requestIdleCallback: (cb: Function) => void;
    cancelIdleCallback: (id: number) => void;
  }

  type CSSOMString = string;
  type FontFaceLoadStatus = "unloaded" | "loading" | "loaded" | "error";
  type FontFaceSetStatus = "loading" | "loaded";

  interface FontFace extends FontFaceDescriptors {
    new (
      family: string,
      source: string | ArrayBuffer,
      descriptors?: FontFaceDescriptors
    ): FontFace;
    readonly status: FontFaceLoadStatus;
    readonly loaded: Promise<FontFace>;
    variationSettings: CSSOMString;
    display: CSSOMString;
    load(): Promise<FontFace>;
  }

  interface FontFaceDescriptors {
    family?: CSSOMString;
    style?: CSSOMString;
    weight?: CSSOMString;
    stretch?: CSSOMString;
    unicodeRange?: CSSOMString;
    variant?: CSSOMString;
    featureSettings?: CSSOMString;
  }

  interface FontFaceSet extends Iterable<FontFace> {
    readonly status: FontFaceSetStatus;
    readonly ready: Promise<FontFaceSet>;
    add(font: FontFace): void;
    check(font: string, text?: string): Boolean; // throws exception
    load(font: string, text?: string): Promise<FontFace[]>;
    delete(font: FontFace): void;
    clear(): void;
  }
}
