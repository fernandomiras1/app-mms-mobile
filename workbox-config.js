module.exports = {
  globDirectory: 'dist/app-mms-mobile/',
  globPatterns: [
    '**/*.{txt,png,ico,html,js,json,css}'
  ],
  globIgnores: [
    'workbox-v3.6.3/**/*'
  ],
  swDest: 'dist/app-mms-mobile/sw.js',
  dontCacheBustUrlsMatching: new RegExp('.+\.[a-f0-9]{20}\..+'),
  maximumFileSizeToCacheInBytes: 5000000,
   // Define runtime caching rules
  runtimeCaching: [
    {
      urlPattern: new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
      handler: 'staleWhileRevalidate'
    }
  ]
}