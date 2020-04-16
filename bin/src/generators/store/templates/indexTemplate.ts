export const index = (storeNamePascal: string) => `export * from './context';
export * from './store';
export * from './reducer';
export * from './use${storeNamePascal}';
`;
