import * as recipeDao from "../daos/recipe-dao.js";
import * as usersDao from "../daos/users-dao.js";

const findAllRecipes = async (req, res) => {
    const recipes = await recipeDao.findAllRecipes();
    res.json(recipes);
};

const findById = async (req, res) => {
    const mealId = req.params.rid;

    const recipe = await recipeDao.findById(mealId)
    if (recipe !== null) {
        res.json(recipe);
    } else {
        res.sendStatus(404);
    }

};

const unlikeRecipe = async (req, res) => {
    const {recipe} = req.body;
    const user = req.session['profile'];

    //Check if this recipe exists if not do nothing
    const currentRecipe = await recipeDao.findById(recipe.idMeal);
    if (currentRecipe) {
        //Filter out this recipe if is in the users favorites
        const newFavorites = user.favoriteRecipes.filter(rec => !currentRecipe.toObject()._id.equals(rec._id));
        await usersDao.updateUser(user._id, {...user, favoriteRecipes: newFavorites})
        req.session['profile'] = {...user, favoriteRecipes: newFavorites};

        //Filter out the user if they are in the recipes liked
        const newLiked = currentRecipe.liked.filter(liker => !liker._id.equals(user._id));
        await recipeDao.updateRecipe(currentRecipe.idMeal, {...currentRecipe.toObject(), liked: newLiked});
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
        return;
    }
}

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
                const newFavRecipes = user.favoriteRecipes.filter(rec => !currentRecipe.toObject()._id.equals(rec._id));
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
            const newRecipe = await recipeDao.createRecipe({...recipe, liked: [user]});

            //and add it to users favorites
            const newFavRecipes = [...user.favoriteRecipes, newRecipe];
            user = {...user, favoriteRecipes: newFavRecipes};
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

const addRecipe = async (req, res) => {
    const {recipe} = req.body;
    try {
        const currentRecipe = await recipeDao.findById(recipe.idMeal);
        if (currentRecipe) {
            res.sendStatus(400);
        } else {
            const newRecipe = await recipeDao.createRecipe(recipe);
            res.json(newRecipe);
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const getRecommend = async (req, res) => {
    try {
        const response = await recipeDao.threeMostRecent();
        res.json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const recipeController =  (app) => {
    app.get('/api/meals', findAllRecipes);
    app.get('/api/meals/:rid', findById);
    app.post('/api/meals', addRecipe);
    app.put('/api/like', likeRecipe);
    app.put("/api/unlike", unlikeRecipe);
    app.get("/api/recommended", getRecommend);
}
export default recipeController;