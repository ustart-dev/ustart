/**
 * Implementar las suscripciones que deseas cargar en el endpoint.
 * El framework utiliza ka implementación de "pubsub"
 * de "graphql-yoga" (docs: https://github.com/prisma/graphql-yoga#pubsub), la
 * cual es añadida al contexto. Para utilizar el PubSub básico se debe
 * exportar una instancia de PubSub:

const pubsub = new PubSub();

export default pubsub;

 * Para utilizar una implementación propia del PubSub (por ejemplo las especificadas
 * en https://github.com/apollographql/graphql-subscriptions) se debe exportar
 * el pubsub de la misma forma que en el ejemplo anterior, pero utilizando
 * la clase propia.
*/
// import { PubSub } from "graphql-subscriptions";
//
// const pubsub = new PubSub();
//
// export default pubsub;
