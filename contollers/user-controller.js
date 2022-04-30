import * as usersDao from "../daos/users-dao.js";
import * as recipeDao from "../daos/recipe-dao.js";
import * as postDao from "../daos/posts-dao.js";

const favorites = async (req, res) => {
    const profile = req.session['profile'];

    if (profile) {
        const recipes = profile.favoriteRecipes;
        res.json(recipes);
        return;
    } else {
        res.sendStatus(401);
        return;
    }
}

const adoptPlan = async (req, res) => {
    const profile = req.session['profile'];
    const {plan} = req.body;

    if(profile && plan) {
        const response = await usersDao.addPlanToUser(profile._id, plan);
        req.session['profile'] = response;
        res.json(response);
        return;
    } else {
        res.sendStatus(401);
        return;
    }
}

const getUser = async (req, res) => {
    const uid = req.params.uid;
    try {
        const profile = await usersDao.findById(uid);
        const recipes = profile.favoriteRecipes.map(recipe => recipe.idMeal);
        const response = await recipeDao.findTheseRecipes(recipes);
        res.json({...profile.toObject(), favoriteRecipes: response});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

const follow = async (req, res) => {
    const follower = req.session['profile'];
    if (follower) {
        const toFollow = req.body;

        //If we are already following do nothing
        if (follower.following.filter(u => u === toFollow._id) > 0) {
            res.sendStatus(400);
            return;
        }

        //Does this user exists and do we already follow?
        const verif = await usersDao.findById(toFollow._id);
        if (verif && verif.toObject().followedBy.filter(u => u._id.equals(follower._id)).length === 0) {
            try{
                await usersDao.followUser(follower, toFollow);
                req.session['profile'] = {...follower, following: [...follower.following, verif]}
                res.sendStatus(200);
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            }

        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);
    }
}

const unfollow = async (req, res) => {
    const follower = req.session['profile'];
    if (follower) {
        const toFollow = req.body;

        //If we aren't following do nothing
        if (follower.following.filter(u => u._id === toFollow._id).length === 0) {
            res.sendStatus(400);
            return;
        }

        //Does this user exists and do we already follow?
        const verif = await usersDao.findById(toFollow._id);
        if (verif && verif.toObject().followedBy.filter(u => u._id.equals(follower._id)).length > 0) {
            try{
                await usersDao.unfollowUser(follower, verif);
                req.session['profile'] = {...follower, following: verif.toObject().followedBy.filter(u => !u._id.equals(follower._id))}
                res.sendStatus(200);
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            }

        } else {
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);
    }
}

const getAll = async (req, res) => {
    const profile = req.session['profile'];

    if (profile && profile.role === 'moderator') {
        const response = await usersDao.findAll();
        res.json(response);
        return;
    }
    res.sendStatus(401);
}

const deleteUser = async (req, res) => {
    const profile = req.session['profile'];
    const uid = req.params.uid;

    if (profile && profile.role === 'moderator') {
        try {
            //delete users posts
            const response = await postDao.deleteUsersPosts(uid);
            //ulike users posts
            console.log(response);
            const other = await postDao.unlikePosts(uid);
            console.log(other);
            //delete users plans

            //unlike recipes

            //unfollow other users

            //unfollow this user

            //remove their account
            //const response = await usersDao.deleteUser(uid);
            res.send(response);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }

    } else {
        res.sendStatus(401);
        return;
    }
}

const userController = (app) => {
    app.post("/api/favorites", favorites);
    app.put("/api/adopt", adoptPlan);
    app.get("/api/user/:uid", getUser);
    app.post("/api/follow", follow);
    app.post("/api/unfollow", unfollow);
    app.post("/api/users", getAll);
    app.delete("/api/users/:uid", deleteUser);
}
export default userController;