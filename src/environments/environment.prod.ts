declare var require: any;
export const environment = {
  VERSION: require('../../package.json').version,
  production: true,
  apiUrl: 'https://app-mms-nodejs.herokuapp.com',
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
