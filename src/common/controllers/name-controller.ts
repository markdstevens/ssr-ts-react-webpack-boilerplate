import loadable from '@loadable/component';
import { baseRoute, route, BaseViewController, FetchOptions } from 'platform/controllers';
import { NameStore } from 'stores/name-store';

@baseRoute('/name')
export class NameController extends BaseViewController {
  public readonly view = loadable(() => import('../views/name'));

  @route('/')
  public names(): Promise<void> {
    return Promise.resolve();
  }

  public async stall(stallTime = 3000): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, stallTime));
  }

  @route('/search/:name')
  public async findName({ stores }: FetchOptions): Promise<void> {
    const name = stores.get<NameStore>('nameStore');

    name.state.items = [];
    name.state.items.push('let');

    await this.stall();

    name.state.items.push('us');

    await this.stall();

    name.state.items.push('go!');
  }
}
