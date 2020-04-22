importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    workbox.routing.registerRoute(
        // Cache CSS files.
        /\.css$/,
        // Use cache but update in the background.
        new StaleWhileRevalidate({
        // Use a custom cache name.
        cacheName: 'css-cache',
        })
    );

    // Google fonts
    workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts',
        plugins: [
            new workbox.expiration.Plugin({
            maxEntries: 30
            })
        ]
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
    
    
    workbox.routing.registerRoute(
        // Cache image files.
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        // Use the cache if it's available.
        new CacheFirst({
        // Use a custom cache name.
        cacheName: 'image-cache',
        plugins: [
            new ExpirationPlugin({
            // Cache only 20 images.
            maxEntries: 20,
            // Cache for a maximum of a week.
            maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
        })
    );  

} else {
    console.log(`Boo! Workbox didn't load 😬`);
}