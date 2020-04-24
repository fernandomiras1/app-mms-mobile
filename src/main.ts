import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => registerServiceWorker())
  .catch(err => console.error(err));


function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {

        // Objecto Sync Manager
        /* if ((<any>window).SyncManager) {
          setTimeout(() => registro.sync.register('prueba-db') , 3000);
        } */

        console.log('Se instalo correctamente.');
      })
      .catch(e => console.log('Error during service worker registration:', e));
  } else {
    console.log('Service Worker is not supported');
  }
}
