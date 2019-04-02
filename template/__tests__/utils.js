import { GraphQLClient, request } from "graphql-request";
import { loginMutation } from "./auth/mutations";

/**
 * Clase helper para el testing que se implementó temporalmente para poder ejecutar
 * los test de los plugins correctamente. Todas las funciones helpers anteriores
 * fueron empaquetadas acá. Esta clase es importada en la configuración de arranque
 * de Jest, instanciada y cargada globalmente.
*/
export default class TestingUtils {

  constructor() {
    this.graphqlUrl = process.env.GRAPHQL_ENDPOINT_URL || "http://127.0.0.1";
    this.port = parseInt(process.env.GRAPHQL_ENDPOINT_PORT, 10) || 4000;
    this.endPoint = `${this.graphqlUrl}:${this.port}`;
  }

  // get endPoint() {
  //   return this.endPoint;
  // }

  /**
   * Retorna un objeto headers listo para usar por los request.
  */
  getHeaders(jwt = null) {
    const headers = {};
    if (jwt) {
      headers.authorization = `Bearer ${jwt}`;
    }
    return headers;
  };

  /**
   * Retorna una instancia de la clase GraphQLClient apuntando a la URL y
   * puerto proporcionados por entorno.
  */
  getGraphQLClient(options = {}) {
    return new GraphQLClient(this.endPoint, { ...options });
  };

  getLoggedInClientAsync(email = null, password = null) {
    return request(this.endPoint, loginMutation, { email, password })
      .then(({ login }) => this.getGraphQLClient({ headers: this.getHeaders(login.jwt) }));
  };

  /**
   * Retorna los datos de un usuario logueado, sin iniciar sesión, ejecutando
   * la mutación de login.
  */
  getUserLoginDataAsync(email = null, password = null) {
    return request(this.endPoint, loginMutation, { email, password })
      .then(({ login }) => login);
  };
};

// NOTE: Comentada temporalmente.
// /**
//  * Retorna la URL establecida como variable de entorno; de no estar
//  * presente se retorna por defecto: http://127.0.0.1.
// */
// export const getURL = () => {
//   return process.env.GRAPHQL_ENDPOINT_URL || "http://127.0.0.1";
// };
//
// /**
//  * Retorna el puerto establecido como variable de entorno; de no estar
//  * presente se retorna el puerto por defecto: 4000.
// */
// export const getPort = () => {
//   return parseInt(process.env.GRAPHQL_ENDPOINT_PORT, 10) || 4000;
// };
//
// /**
//  * Retorna el endpoint, compuesto por la URL más el puerto.
// */
// export const getEnpoint = () => {
//   return `${getURL()}:${getPort()}`;
// };
//
// /**
//  * Retorna un objeto headers listo para usar por los request.
// */
// export const getHeaders = (jwt = null) => {
//   const headers = {};
//   if (jwt) {
//     headers.authorization = `Bearer ${jwt}`;
//   }
//   return headers;
// };
//
// /**
//  * Retorna una instancia de la clase GraphQLClient apuntando a la URL y
//  * puerto proporcionados por entorno.
// */
// export const getGraphQLClient = (options = {}) => {
//   return new GraphQLClient(getEnpoint(), { ...options });
// };
//
// /**
//  * Retorna una instancia de la clase GraphQLClient apuntando hacia el endpoint y
//  * con una sesión iniciada según el email y password proporcionados.
// */
// export const getLoggedInClientAsync = (email = null, password = null) => {
//   return request(getEnpoint(), loginMutation, { email, password })
//     .then(({ login }) => getGraphQLClient({ headers: getHeaders(login.jwt) }));
// };
//
// /**
//  * Retorna los datos de un usuario logueado, sin iniciar sesión, ejecutando
//  * la mutación de login.
// */
// export const getUserLoginDataAsync = (email = null, password = null) => {
//   return request(getEnpoint(), loginMutation, { email, password })
//     .then(({ login }) => login);
// };
