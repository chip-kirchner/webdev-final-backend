import recipeModel from '../models/recipe-model.js';

export const findAllRecipes = () => recipeModel.find();
export const findById = (id) => recipeModel.findOne({idMeal: id});
export const updateRecipe = (id, recipe) => recipeModel.updateOne({mealId: id}, {$set: recipe});
export const createRecipe = (recipe) => recipeModel.create(recipe);