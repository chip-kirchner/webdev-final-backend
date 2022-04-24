import * as usersDao from "../daos/users-dao.js";
import * as recipeDao from "../daos/recipe-dao.js";

const favorites = async (req, res) => {
    const profile = req.session['profile'];

    if (profile) {
        const recipes = profile.favoriteRecipes.map(recipe => recipe.idMeal);
        const response = await recipeDao.findTheseRecipes(recipes);
        res.json(response.map(temp => ({...temp.toObject(), liked: temp.liked.length})));
        return;
    } else {
        res.sendStatus(402);
        return;
    }
}

const userController = (app) => {
    app.post("/api/favorites", favorites);
}
export default userController;