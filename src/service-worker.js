importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);
  
const DAY = 60 * 60 * 24;
const WEEK = 60 * 60 * 24 * 7;
const YEAR = 60 * 60 * 24 * 365;

// Verbose logging even for the production
workbox.setConfig({
debug: false
});

// Modify SW update cycle
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.googleAnalytics.initialize();

const pageRoutes = [
    "/login",    
    "/home"
];

workbox.routing.registerRoute(
({ url, event }) => pageRoutes.some(route => url.pathname === route),
new workbox.strategies.CacheFirst({
    cacheName: "pages",
    plugins: [
        new workbox.cacheableResponse.Plugin({
            statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
            maxAgeSeconds: DAY
        })
    ]
})
);

// Cache the underlying font files with a cache-first strategy for 1 year.
workbox.routing.registerRoute(
    /^https:\/\/fonts\.(?:googleapis|gstatic).com\/(.*)/,
    new workbox.strategies.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
        new workbox.cacheableResponse.Plugin({
            statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
            maxAgeSeconds: YEAR,
            maxEntries: 30
        })
        ]
    })
);

// fallback to network
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
    new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: DAY
    })
    ]
})
);

// Cache CSS and JavaScript Files
// https://developers.google.com/web/tools/workbox/guides/common-recipes#cache_css_and_javascript_files
workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
    })
);

// test:
// API with networkFirst strategy
workbox.routing.registerRoute(
    new RegExp(/.*\/newsapi\/org$/, 'i'),
    workbox.strategies.networkFirst()
)

// API with cache-first strategy
workbox.routing.registerRoute(
    new RegExp(/.*\/newsapi\/org$/, 'i'),
    workbox.strategies.cacheFirst({
      cacheName: 'newsapi',
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
    new RegExp('^https://newsapi.org'),
    workbox.strategies.networkOnly({
      plugins: [
        new workbox.backgroundSync.Plugin('userQueue', {
          maxRetentionTime: 1 * 60 // Retry for max of 1 Hour
        })
      ]
    }),
    'GET'
);



self.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';
});


// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([]);
  