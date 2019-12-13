// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//URL DESPLIEGGUE
//LOCAL
//const url: string='http://localhost:8080/aevent/';
const url: string='http://localhost:8080/aevent/';
//SERVIDOR APACHE TOMCAT LAPTOP
//const url: string='http://10.100.56.228:8090/aevent/';
//SERVIDOR AWS
export const environment = {
  production: false,
  serviceBackEndpoint: url,
  serviceEndpoint: url + 'api',
  serviceAuthEndpoint: url + 'oauth/token',
  //serviceFileServer: 'http://localhost:8180/',
  serviceFileServer: 'http://ec2-18-206-239-108.compute-1.amazonaws.com:8080/fileserver/', //Cambiar por la ip de produccion
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
