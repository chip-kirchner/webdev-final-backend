import * as postDao from "../daos/posts-dao.js";
import * as recipeDao from "../daos/recipe-dao.js";

const getPosts = async (req, res) => {
    const posts = await postDao.findAll();
    res.json(posts);
}

const createPost = async (req, res) => {
    const {post} = req.body;
    const user = req.session['profile'];
    //Does this recipe already exist in our database?
    const currentRecipe = await recipeDao.findById(post.recipe.idMeal);
    //If it does add the ObjectId to this post
    if (user) {
        if (currentRecipe) {
            const newPost = {...post, recipe: currentRecipe, user: user};
            const response = await postDao.createPost(newPost);
            const toReturn = await postDao.findById(response._id);
            res.json(toReturn);
            //If it doesn't, create it and add the new objectId to this post
        } else {
            const newRecipe = await recipeDao.createRecipe(post.recipe);
            const newPost = {...post, recipe: newRecipe, user: user};
            const response = await postDao.createPost(newPost);
            const toReturn = await postDao.findById(response._id);
            res.json(toReturn);
        }
    } else {
        res.sendStatus(401);
    }

}

const deletePost = async (req, res) => {
    const {post} = req.body;
    const status = await postDao.deletePost(post);
    res.send(status);
}

const likePost = async (req, res) => {
    const {post} = req.body;
    const user = req.session['profile'];
    const currentPost = await postDao.findById(post._id);
    //does this post exist and is the user logged in?
    if (user && currentPost) {
        //does the user already like this post?
        if (currentPost.toObject().likedBy.filter(use => use.equals(user._id)).length > 0) {
            //Don't add the user if they do
            res.sendStatus(401);
        } else {
            const newLikes = [...currentPost.toObject().likedBy, user._id];
            const response = await postDao.updatePost(currentPost.toObject()._id, {...currentPost.toObject(), likedBy: newLikes});
            res.send(response);
        }
    } else {
        res.sendStatus(403);
    }
}

const unlikePost = async (req, res) => {
    const {post} = req.body;
    const user = req.session['profile'];

    const currentPost = await postDao.findById(post._id);

    //does this post exist and is the user logged in?
    if (user && currentPost) {
        //does the user already like this post?
        if (currentPost.toObject().likedBy.filter(use => use.equals(user._id)).length > 0) {
            //Remove them!
            const newLikes = currentPost.toObject().likedBy.filter(use => !use.equals(user._id));
            const response = await postDao.updatePost(currentPost.toObject()._id, {...currentPost.toObject(), likedBy: newLikes});
            res.send(response);
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(403);
    }
}

const postController = (app) => {
    app.get("/api/posts", getPosts);
    app.post("/api/posts", createPost);
    app.delete("/api/posts", deletePost);
    app.put("/api/posts/like", likePost);
    app.put("/api/posts/unlike", unlikePost);
}
export default postController;