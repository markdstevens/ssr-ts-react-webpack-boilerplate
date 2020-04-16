export const context = (storeNamePascal: string) => `import { createContext } from 'react';
import { ${storeNamePascal}Reducer } from './reducer';

export const ${storeNamePascal}Context = createContext<${storeNamePascal}Reducer>({} as ${storeNamePascal}Reducer);
export const ${storeNamePascal}Provider = ${storeNamePascal}Context.Provider;
`;
