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
    const recipeId = req.params.rid;

    const recipe = await recipeDao.findById(recipeId)
    if (recipe !== null) {
        const toReturn = {...recipe, liked: recipe.liked.length};
        res.json(toReturn);
    } else {
        res.sendStatus(404);
    }

};

const likeRecipe = async (req, res) => {
    const {recipe} = req.body;
    const {userToAdd} = req.body;
    const currentRecipe = await recipeDao.findById(recipe.idMeal);
    if (currentRecipe === null) {
        try{
            const status = await recipeDao.createRecipe({...recipe, liked: [userToAdd]});
            res.send(status);
        } catch (e) {
            res.sendStatus(500);
        }
    } else {
        console.log(currentRecipe.liked);
        const newLikes = currentRecipe.liked.concat(userToAdd);
        console.log({...currentRecipe._doc, liked: newLikes});
        const status = await recipeDao.updateRecipe(recipe.idMeal, {...currentRecipe._doc, liked: newLikes});
        res.send(status);
    }
}

const recipeController =  (app) => {
    app.get('/api/meals', findAllRecipes);
    app.get('/api/meals/:rid', findById);
    app.put('/api/like', likeRecipe);
}
export default recipeController;