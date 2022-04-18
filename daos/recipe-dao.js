import recipeModel from '../models/recipe-model.js';

export const findAllRecipes = async () => recipeModel.find();
export const findById = async (idMeal) => {
    const recipe = recipeModel.findOne({idMeal});
    return recipe;
};
export const updateRecipe = async (idMeal, recipe) => recipeModel.updateOne({idMeal}, {$set: recipe});
export const createRecipe = async (recipe) => recipeModel.create(recipe);