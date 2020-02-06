import { BaseController } from './base-controller';
import loadable from '@loadable/component';
import { State } from 'utils/store';
import { fetchWrapper } from 'utils/fetch-wrapper';
import { config } from 'config/base';

export type JokeState = State<JokeApiResponse>;

export class JokeController extends BaseController<JokeState> {
  public path = '/joke';
  public component = loadable(() => import('../pages/joke'));

  public async fetch(): Promise<JokeState> {
    return await fetchWrapper<JokeState>(config.api.joke.url);
  }
}
