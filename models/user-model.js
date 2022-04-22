import mongoose from 'mongoose';
import usersSchema from "../schema/users-schema.js";
const userModel = mongoose.model('UserModel', usersSchema);
export default userModel;