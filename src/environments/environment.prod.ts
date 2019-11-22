//const url: string='192.168.1.13:8090/aevent/';
//const url: string='http://localhost:8090/aevent/';
//const url: string='http://ec2-54-92-163-89.compute-1.amazonaws.com:8080/aevent/'
const url: string='http://ec2-18-206-239-108.compute-1.amazonaws.com:8080/aevent/'
//http://ec2-18-206-239-108.compute-1.amazonaws.com:8080/
export const environment = {
  production: false,
  serviceBackEndpoint: url,
  serviceEndpoint: url + 'api',
  serviceAuthEndpoint: url + 'oauth/token',
  //Credenciales
  APP_CONFIG_NAME: 'angularApp',
  APP_CONFIG_PASSWORD: 'angularApp'
};