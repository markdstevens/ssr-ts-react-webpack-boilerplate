/**
 * This reads from the manifest file and caches all the URLs in the service
 * worker on the initial page load.
 */
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(
  /\/pokemon/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'pokemon',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 10 * 60
      })
    ]
  })
);
