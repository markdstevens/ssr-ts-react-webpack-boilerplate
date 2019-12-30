declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare const __DEV__: boolean;
declare const __BROWSER__: boolean;
