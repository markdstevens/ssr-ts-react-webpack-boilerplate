# ssr-ts-react-webpack-boilerplate

A lightweight template repo for creating performant react apps

✅ React<br>
✅ Typescript<br>
✅ Babel 7 + Webpack + Code splitting<br>
✅ Isomorphic rendering<br>
✅ PWA optimized<br>
✅ Jest<br>

## Quick Start

```
git clone git@github.com:markdstevens/ssr-ts-react-webpack-boilerplate.git
cd ssr-ts-react-webpack-boilerplate
yarn
```

To create a simple static route, we only need to add two files:

```
touch src/common/pages/home.tsx
touch src/common/controllers/home-controller.ts
```

In `home.tsx`, add this:

```
import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

const Home: FC<RouteComponentProps> = () => <div>Hello, World!</div>;

export default Home;
```

In `home-controller.ts`, add this:

```
import loadable from '@loadable/component';
import { BaseController } from 'controllers';

export class HomeController extends BaseController {
  public component = loadable(() => import('../pages/home'));
  public path = '/home';
}
```

In `src/common/controllers/init.ts`, import your new controller and add it to the controllers list.

Now, build the project via

```
yarn start:dev
```

You should see some webpack output. In the dist/ directory, you'll see two files of interest:

```
Navigate to `localhost:3000/home`
```
