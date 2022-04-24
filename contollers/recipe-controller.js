import * as recipeDao from "../daos/recipe-dao.js";
import * as usersDao from "../daos/users-dao.js";

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
    let user = req.session['profile'];

    let status = 200;

    //check for user logged in
    if (user) {
        //if have user check if this recipe is in database yet
        const currentRecipe = await recipeDao.findById(recipe.idMeal);

        //if it is in database
        if (currentRecipe !== null) {

            //check if user already likes this
            const included = currentRecipe.liked.filter(liker => liker._id.equals(user._id));
            if (included.length > 0) {
                //if they do then unlike this
                const notInclude = currentRecipe.liked.filter(liker => !liker._id.equals(user._id));
                status = await recipeDao.updateRecipe(recipe.idMeal, {...currentRecipe.toObject(), liked: notInclude})

                //remove it from users favorites
                const newFavRecipes = user.favoriteRecipes.filter(rec => rec.idMeal !== currentRecipe.toObject().idMeal);
                console.log(newFavRecipes);
                user = {...user, favoriteRecipes: newFavRecipes};
                status = await usersDao.updateUser(user._id, user);
            } else {
                //if they don't then add user to liked list
                const newLikes = currentRecipe.liked.concat(user);
                status = await recipeDao.updateRecipe(recipe.idMeal, {...currentRecipe.toObject(), liked: newLikes});

                //and add this recipe to the users favorites
                const newFavRecipes = [...user.favoriteRecipes, currentRecipe.toObject()];
                user = {...user, favoriteRecipes: newFavRecipes}
                status = await usersDao.updateUser(user._id, user);
            }
        } else{
            //if its not in database then create it
            status = await recipeDao.createRecipe({...recipe, liked: [user]});

            //and add it to users favorites
            const newFavRecipes = [...user.favoriteRecipes, recipe];
            user = {...user, favoriteRecipes: newFavRecipes}
            status = await usersDao.updateUser(user._id, user);
        }
    } else {
        //Not authorized if not logged in
        res.sendStatus(401);
        return;
    }

    req.session['profile'] = user;
    res.send(status);
    return;
}

const recipeController =  (app) => {
    app.get('/api/meals', findAllRecipes);
    app.get('/api/meals/:rid', findById);
    app.put('/api/like', likeRecipe);
}
export default recipeController;