// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000',
  // apiUrl: 'https://app-mms-nodejs.herokuapp.com',
  firebase: {
    apiKey: 'AIzaSyCG8GR8Vha8cIoCjefVzAR-YuflwXytJVw',
    authDomain: 'app-mms-mobile.firebaseapp.com',
    databaseURL: 'https://app-mms-mobile.firebaseio.com',
    projectId: 'app-mms-mobile',
    storageBucket: 'app-mms-mobile.appspot.com',
    messagingSenderId: '291359336617',
    appId: '1:291359336617:web:d2a215759b4f63f36161b8',
    measurementId: 'G-2J7WJM8P7C'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
