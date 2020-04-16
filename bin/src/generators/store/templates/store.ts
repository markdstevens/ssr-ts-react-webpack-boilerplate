export const store = (storeNamePascal: string) => `import { BaseStore } from 'stores/base-store';

export interface ${storeNamePascal}State {
  items: string[];
}

export class ${storeNamePascal} extends BaseStore<${storeNamePascal}State> {
  async fetch(): Promise<void> {
    this.state.items = [];
    this.state.items = await this.getItems();
  }

  public getItems(): Promise<string[]> {
    // call api or something that returns a promise
    return Promise.resolve(['item 1', 'item 2']);
  }
}
`;
