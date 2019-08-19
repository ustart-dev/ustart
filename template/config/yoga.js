"use strict";

/**
 * Configuration file for graphql-yoga.
 * This script allows you to customize start server options. If not used
 * default options are applied.
 * You can enable reading an option from env by using process.env.
 * For example, to disable playground on production environment.

 playground: process.env.NODE_ENV === "production" ? false : "/"

 * Option list: https://github.com/prisma/graphql-yoga#startoptions-options-callback-options-options--void----null-promisevoid
*/
exports.options = {
  port: parseInt(process.env.GRAPHQL_ENDPOINT_PORT, 10) || 4000,
  tracing: true,
  cacheControl: true
};
