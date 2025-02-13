// Desc: This file is used to define the relationships between the models.
// Users has many pets, and pets belong to a user.

import { User } from "./user.js";
import { Pet } from "./pet.js";

User.hasMany(Pet);
Pet.belongsTo(User);

export { User, Pet };
