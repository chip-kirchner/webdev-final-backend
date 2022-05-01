import recipeModel from '../models/recipe-model.js';

export const findAllRecipes = async () => recipeModel.find();

export const findTheseRecipes = async (recipes) => recipeModel.find({
    "idMeal" : {
        $in: recipes
    }
});

export const findById = async (idMeal) => {
    const recipe = recipeModel.findOne({idMeal});
    return recipe;
};
export const updateRecipe = async (idMeal, recipe) => recipeModel.updateOne({idMeal}, {$set: recipe});
export const createRecipe = async (recipe) => recipeModel.create(recipe);

export const deleteUserLikes = async (_id) => recipeModel.updateMany({liked: {_id}}, {$pull: {liked: {_id}}});

export const threeMostRecent = async () => recipeModel.find().sort({updatedAt: 'desc'}).limit(3);