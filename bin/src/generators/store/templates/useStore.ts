export const useStore = (storeNamePascal: string) => `import { ${storeNamePascal}Reducer } from './reducer';
import { useContext } from 'react';
import { ${storeNamePascal}Context } from './context';

export const use${storeNamePascal} = (): ${storeNamePascal}Reducer => useContext<${storeNamePascal}Reducer>(${storeNamePascal}Context);
`;
