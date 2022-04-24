import mongoose from 'mongoose';
import postSchema from "../schema/post-schema.js";
const postModel = mongoose.model('posts', postSchema);
export default postModel;