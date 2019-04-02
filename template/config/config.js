const fs = require('fs');

module.exports = {
  "development": {
    "username": process.env.PG_USER || null,
    "password": process.env.PG_PASSWORD || null,
    "database": process.env.PG_DATABASE || null,
    "host": process.env.PG_HOST || "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.PG_USER || null,
    "password": process.env.PG_PASSWORD || null,
    "database": process.env.PG_DATABASE || null,
    "host": process.env.PG_HOST || "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.PG_USER || null,
    "password": process.env.PG_PASSWORD || null,
    "database": process.env.PG_DATABASE || null,
    "host": process.env.PG_HOST || "localhost",
    "dialect": "postgres"
  }
};
