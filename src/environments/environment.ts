// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "firebase-api-key",
    authDomain: "firebase-project.firebaseapp.com",
    databaseURL: "https://firebase-project.firebaseio.com",
    projectId: "firebase-project-id",
    storageBucket: "firebase-project.appspot.com",
    messagingSenderId: "firebase-project-sender-id",
    appId: "firebase-project-app-id",
    measurementId: "firebase-project-measurement-id"
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
