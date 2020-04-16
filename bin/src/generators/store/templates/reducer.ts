export const reducer = (storeNamePascal: string) => `import { ${storeNamePascal}State } from './store';
import { Reducer } from 'stores/types';

/**
 * Defines return type of useReducer hook
 */
export type ${storeNamePascal}Reducer = Reducer<${storeNamePascal}State>;
`;
