import { matchPath, match } from 'react-router-dom';
import { RegisteredControllerAction } from 'platform/controllers';

export const getMatchFromAction = (
  action: RegisteredControllerAction,
  fullPath: string
): match<{}> | null | undefined =>
  action.fullPaths
    .map(path =>
      matchPath(fullPath, {
        path,
        exact: true
      })
    )
    .find(match => match?.isExact);
