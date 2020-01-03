/**
 * This reads from the manifest file and caches all the URLs in the service
 * worker on the initial page load.
 */
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
