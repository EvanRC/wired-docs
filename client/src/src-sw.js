const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// Import workbox modules
const { StaleWhileRevalidate } = require('workbox-strategies');

// Asset Caching for static files like CSS, Javascript, and images
registerRoute(
  // Define the match callbackfunction for requests to cache 
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'image',
  // Use the StaleWhileRevalidate strategy for these assets
  new StaleWhileRevalidate ({
    // name of the cache storage
    cacheName: 'asset-cache',
    plugins: [
      // This plugin will cache responses with these headers to a maximum-age of 60 days
      new CacheableResponsePlugin({
        statuses: [0,200],
      }),
      new ExpirationPlugin({
        // Keep at most 60 entries in the cache 
        maxEntries: 60,
        // Cache for a maximum of 60 days 
        maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
        // Automatically clean up any expired cache entries 
        purgeOnQuotaError: true,
      }),
    ],
  })
);
registerRoute();
