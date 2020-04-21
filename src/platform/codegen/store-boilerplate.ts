import { readdirSync, writeFileSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import path from 'path';
import { pascalCase } from 'pascal-case';
import { camelCase } from 'camel-case';
import rimraf from 'rimraf';

const applicationStores = readdirSync(path.join(__dirname, '../../common/stores'));
const storesMetaData = applicationStores
  .map(appStore => appStore.replace('.ts', ''))
  .map(appStore => ({
    pascalStoreName: pascalCase(appStore),
    camelStoreName: camelCase(appStore),
    storeReducer: `${camelCase(appStore)}Reducer`,
    storeReducerType: `${pascalCase(appStore)}Reducer`,
    storeProvider: `${pascalCase(appStore)}Provider`,
    storeContext: `${pascalCase(appStore)}Context`,
    originalName: appStore,
    storeState: `${pascalCase(appStore)}State`,
    storeHook: `use${pascalCase(appStore)}`
  }));

const template = `import React, { FunctionComponent, useReducer, ReactNode, useEffect } from 'react';
import { Stores } from 'platform/stores/types';
import { ServerContextStoreProvider, ServerContextStore } from 'platform/stores/server-context-store';
import { AllStoreContextProvider } from 'platform/stores/all-store-context';
import { LocalizationStoreProvider, LocalizationStore } from 'platform/stores/localization-store';
import { debounce } from 'platform/utils/debounce';
${storesMetaData
  .map(
    ({ storeProvider, pascalStoreName, originalName }) =>
      `import { ${pascalStoreName} } from 'stores/${originalName}';\nimport { ${storeProvider} } from 'platform/stores/${originalName}/context';`
  )
  .join('\n')}

interface StoresProps {
  stores: Stores;
  children: ReactNode;
}

export const StoreProviders: FunctionComponent<StoresProps> = ({ children, stores }: StoresProps) => {
  const serverContextStore = stores.get<ServerContextStore>('serverContextStore');
  const localizationStore = stores.get<LocalizationStore>('localizationStore');

  const serverContextStoreReducer = useReducer(serverContextStore.updateState, serverContextStore.state);
  const localizationStoreReducer = useReducer(localizationStore.updateState, localizationStore.state);

  ${storesMetaData
    .map(
      ({ pascalStoreName, camelStoreName, storeReducer }) =>
        `const ${camelStoreName} = stores.get<${pascalStoreName}>('${camelStoreName}');\n  const ${storeReducer} = useReducer(${camelStoreName}.updateState, ${camelStoreName}.state);`
    )
    .join('\n  ')}
  ${
    storesMetaData.length
      ? `useEffect(() => {
    ${storesMetaData
      .map(({ camelStoreName, storeReducer }) => `${camelStoreName}.dispatch = debounce(${storeReducer}[1], 10);`)
      .join('\n    ')}
  });`
      : ''
  }
  return (
    <AllStoreContextProvider value={stores}>
      <ServerContextStoreProvider value={serverContextStoreReducer}>
        <LocalizationStoreProvider value={localizationStoreReducer}>
          ${storesMetaData
            .map(({ storeProvider, storeReducer }) => `<${storeProvider} value={${storeReducer}}>`)
            .join('\n')}
          {children}
          ${storesMetaData
            .reverse()
            .map(({ storeProvider, storeReducer }) => `</${storeProvider}>`)
            .join('\n')}
        </LocalizationStoreProvider>
      </ServerContextStoreProvider>
    </AllStoreContextProvider>
  );
};
`;

const initClientStores = `import { StoreMap } from 'platform/stores/types';
${storesMetaData
  .map(({ pascalStoreName, originalName }) => `import { ${pascalStoreName} } from 'stores/${originalName}';`)
  .join('\n')}

export function initCustomClientStores(serializedStores: StoreMap): StoreMap {
  return {
    ${storesMetaData
      .map(
        ({ pascalStoreName, camelStoreName }) =>
          `${camelStoreName}: new ${pascalStoreName}(serializedStores.${camelStoreName}.state)`
      )
      .join(',\n')}
  };
}
`;

const initServerStores = `import { StoreMap } from 'platform/stores/types';
${storesMetaData
  .map(({ pascalStoreName, originalName }) => `import { ${pascalStoreName} } from 'stores/${originalName}';`)
  .join('\n')}

export function initCustomServerStores(): StoreMap {
  return {
    ${storesMetaData
      .map(({ pascalStoreName, camelStoreName }) => `${camelStoreName}: new ${pascalStoreName}({} as any)`)
      .join(',\n')}
  };
}
`;

const storeProvidersFile = '../common/StoreProviders.tsx';
const customClientStoresFile = '../client/init-custom-client-stores.ts';
const customServerStoresFile = '../server/init-custom-server-stores.ts';

existsSync(storeProvidersFile) ? unlinkSync(storeProvidersFile) : null;
existsSync(customClientStoresFile) ? unlinkSync(customClientStoresFile) : null;
existsSync(customServerStoresFile) ? unlinkSync(customServerStoresFile) : null;

writeFileSync(path.join(__dirname, storeProvidersFile), template);
writeFileSync(path.join(__dirname, customClientStoresFile), initClientStores);
writeFileSync(path.join(__dirname, customServerStoresFile), initServerStores);

`import { createContext } from 'react';
import { TodoStoreReducer } from './reducer';

export const TodoStoreContext = createContext<TodoStoreReducer>({} as TodoStoreReducer);
export const TodoStoreProvider = TodoStoreContext.Provider;
`;

const whitelistedStores = ['localization-store', 'server-context-store', 'base-store'];
readdirSync(path.join(__dirname, '../stores'))
  .filter(store => !whitelistedStores.includes(store) && store.endsWith('-store'))
  .forEach(store => {
    rimraf.sync(path.join(__dirname, `../stores/${store}`));
  });

storesMetaData.forEach(({ originalName, storeContext, storeProvider, storeState, storeHook, storeReducerType }) => {
  const storeDir = path.join(__dirname, `../stores/${originalName}`);

  mkdirSync(storeDir);
  writeFileSync(
    `${storeDir}/context.ts`,
    `import { createContext } from 'react';
import { ${storeReducerType} } from './reducer';
  
export const ${storeContext} = createContext<${storeReducerType}>({} as ${storeReducerType});
export const ${storeProvider} = ${storeContext}.Provider;
`
  );

  writeFileSync(
    `${storeDir}/reducer.ts`,
    `import { ${storeState} } from 'stores/${originalName}';
import { Reducer } from 'platform/stores/types';

export type ${storeReducerType} = Reducer<${storeState}>;
`
  );

  writeFileSync(
    `${storeDir}/${storeHook}.ts`,
    `import { ${storeReducerType} } from './reducer';
import { useContext } from 'react';
import { ${storeContext} } from './context';
    
export const ${storeHook} = (): ${storeReducerType} => useContext<${storeReducerType}>(${storeContext});
`
  );
});
