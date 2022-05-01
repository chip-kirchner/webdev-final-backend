import mongoose from 'mongoose';
import recipeSchema from "../schema/recipe-schema.js";
const recipeModel = mongoose.model('recipes', recipeSchema);
export default recipeModel;