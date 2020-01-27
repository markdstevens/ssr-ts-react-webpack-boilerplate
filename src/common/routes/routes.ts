import { Route } from 'routes';
import { homeRoute } from './home';
import { defaultRoute } from './defaultRoute';

/**
 * @description
 *   A configuration object representing all of the possible routes in the
 *   application. Each route entry will be picked up both by the express server
 *   and by react-router-dom, so each route is defined only once. The only
 *   optional field is 'fetchInitialData', which if set, informs the express
 *   server to fetch the data for the route on the server and pass down the
 *   response to the browser as the initial state.
 *
 *   the 'component' field must use the 'loadable' function to wrap the route's
 *   top level component. This pattern informs webpack to split each route's
 *   code into a separate chunk. The 'component' field can optionally be wrapped
 *   in the 'WithStatefulRoute' HOC which should only be used for routes that
 *   need initial data to be fetched on the server.
 *
 *   DONT MANUALLY ALTER THIS LIST UNLESS YOU KNOW WHAT YOU'RE DOING
 */
export const routes: Route[] = [
  homeRoute,
  defaultRoute
];
