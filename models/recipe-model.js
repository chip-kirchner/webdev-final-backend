import mongoose from 'mongoose';
import recipeSchema from "../schema/recipe-schema.js";
const recipeModel = mongoose.model('RecipeModel', recipeSchema);
export default recipeModel;