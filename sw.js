//////////////////////////////////////////////////////////////////////////
//////////////////////// Let's have it locally. /////////////////////////
//  Run "workbox copyLibraries third_party/"
//////////////////////////////////////////////////////////////////////////
importScripts('workbox-v3.6.3/workbox-sw.js')

// SETTINGS

// Use local version of Workbox libraries
workbox.setConfig({ modulePathPrefix: 'workbox-v3.6.3/' })

// Verbose logging even for the production
workbox.setConfig({ debug: true })
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

// Modify SW update cycle
workbox.skipWaiting() // prevents the waiting, meaning the service worker activates as soon as it's finished installing.
workbox.clientsClaim() // When a service worker is initially registered, pages won't use it until they next load. 
                       // The claim() method causes those pages to be controlled immediately.

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([])

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// You might want to use a stale-while-revalidate 
// strategy for CSS and JavaScript files that aren't precached.
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// fallback to network
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 15 * 24 * 60 * 60, // 15 Days
      }),
    ]
  })
);

// test:
// API with networkFirst strategy
workbox.routing.registerRoute(
  new RegExp(/.*\/jokes\/random\/3$/, 'i'),
  workbox.strategies.networkFirst()
)

// API with cache-first strategy
workbox.routing.registerRoute(
  new RegExp(/.*\/jokes\/random\/5$/, 'i'),
  workbox.strategies.cacheFirst({
    cacheName: 'joke5',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 5 * 24 * 60 * 1000, // 5 Days
      }),
    ]
  })
)


// BACKGROUND SYNC

workbox.routing.registerRoute(
  new RegExp('^https://reqres.in/api/users'),
  workbox.strategies.networkOnly({
    plugins: [
      new workbox.backgroundSync.Plugin('userQueue', {
        maxRetentionTime: 1 * 60 // Retry for max of 1 Hour
      })
    ]
  }),
  'POST'
)