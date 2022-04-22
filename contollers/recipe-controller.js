import * as recipeDao from "../daos/recipe-dao.js";

const findAllRecipes = async (req, res) => {
    const recipes = await recipeDao.findAllRecipes();
    const toReturn = recipes.map(
        (recipe) => {
            return({...recipe, liked: recipe.liked.length});
        }
    );
    res.json(recipes);
};

const findById = async (req, res) => {
    const mealId = req.params.rid;

    const recipe = await recipeDao.findById(mealId)
    if (recipe !== null) {
        const toReturn = {...recipe.toObject(), liked: recipe.liked.length};
        res.json(toReturn);
    } else {
        res.sendStatus(404);
    }

};

const likeRecipe = async (req, res) => {
    const {recipe} = req.body;
    const {user} = req.body;
    const currentRecipe = await recipeDao.findById(recipe.idMeal);
    if (currentRecipe === null) {
        try{
            const status = await recipeDao.createRecipe({...recipe, liked: [user]});
            res.send(status);
        } catch (e) {
            res.sendStatus(500);
        }
    } else {
        const included = currentRecipe.liked.map(liker => liker._id === user._id);
        if (included) {
            res.sendStatus(409);
        } else {
            const newLikes = currentRecipe.liked.concat(user);
            const status = await recipeDao.updateRecipe(recipe.idMeal, {...currentRecipe.toObject(), liked: newLikes});
            res.send(status);
        }
    }
}

const recipeController =  (app) => {
    app.get('/api/meals', findAllRecipes);
    app.get('/api/meals/:rid', findById);
    app.put('/api/like', likeRecipe);
}
export default recipeController;