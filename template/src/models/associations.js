/**
 * Define Sequelize associations in this script.
 * Example: A user belongs to a region and a region has many users.

import { ustart } from "ustart";

const {
  user,
  region
} = ustart.models;

user.belongsTo(region);
region.hasMany(user);
*/
