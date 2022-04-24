import mongoose from 'mongoose';
import usersSchema from "../schema/users-schema.js";
const userModel = mongoose.model('users', usersSchema);
export default userModel;