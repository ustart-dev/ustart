/**
 * Establecer las asociaciones de Sequelize en este script.
 * Ejemplo: Un usuario User pertenece a una Region y una Region tiene muchos
 * usuarios.

import { ustart } from "ustart";

const {
  user,
  region
} = ustart.models;

user.belongsTo(region);
region.hasMany(user);
*/
