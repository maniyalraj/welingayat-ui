// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverUrl: "http://localhost:8080/",
  // serverUrl: "https://aws.welingayat.in/",
  // serverUrl: "http://ec2-34-222-19-194.us-west-2.compute.amazonaws.com:8080/",
  firebase: {
    apiKey: "AIzaSyAn7VV17zr8EgLXflqqEIGHUev8ju4xjPQ",
    authDomain: "welingayat.firebaseapp.com",
    databaseURL: "https://welingayat.firebaseio.com",
    projectId: "welingayat",
    storageBucket: "welingayat.appspot.com",
    messagingSenderId: "833782970481",
    appId: "1:833782970481:web:096521fa5e247556efc3d0",
    measurementId: "G-FE39WYMX1Y"
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
