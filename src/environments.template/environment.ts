// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapboxAccessToken: 'YOUR_MAP_BOX_ACCESS_TOKEN',

  firebaseConfig: {
    apiKey: "nuevo-api-key",
    authDomain: "nuevo-auth-domain.firebaseapp.com",
    projectId: "nuevo-project-id",
    storageBucket: "nuevo-storage-bucket.appspot.com",
    messagingSenderId: "nuevo-messaging-sender-id",
    appId: "nuevo-app-id"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
