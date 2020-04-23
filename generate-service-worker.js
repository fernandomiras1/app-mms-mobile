const workboxBuild = require('workbox-build');

const buildSW = () => {
  // This will return a Promise
  return workboxBuild.injectManifest({
    globDirectory: "dist/browser",
    globPatterns: [
      '**\/*.{js,css,html}',
      "favicon.ico",
      "manifest.json",
      "assets/**/*.{css,html,js,json,png,svg}"
    ],
    swSrc: "src/service-worker.js",
    swDest: "dist/browser/service-worker.js"
  }).then(({count, size, warnings}) => {
    // Optionally, log any warnings and details.
    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);
  })
};

buildSW();
