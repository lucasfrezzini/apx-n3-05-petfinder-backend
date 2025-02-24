// Desc: This file is used to define the relationships between the models.
// Users has many pets, and pets belong to a user.

import { User } from "./userModel.js";
import { Pet } from "./petModel.js";
import { Report } from "./reportModel.js";

User.hasMany(Pet);
Pet.hasMany(Report);
Pet.belongsTo(User);

export { User, Pet, Report };
