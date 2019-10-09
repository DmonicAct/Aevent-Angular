// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const url: string='http://localhost:8080/aevent/';
//const url: string='http://192.168.1.5:8090/aevent/';
export const environment = {
  production: false,
  serviceBackEndpoint: url,
  serviceEndpoint: url + 'api',
  serviceAuthEndpoint: url + 'oauth/token',
  //Credenciales
  APP_CONFIG_NAME: 'angularApp',
  APP_CONFIG_PASSWORD: 'angularApp'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
