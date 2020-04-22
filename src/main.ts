import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

window.addEventListener('load', () => {
  platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
    registerServiceWorker('sw');
  });

  function registerServiceWorker(swName: string) {
    if ((environment.production) && navigator.serviceWorker) {
      navigator.serviceWorker.register(`/${swName}.js`);
    }
  }
});
