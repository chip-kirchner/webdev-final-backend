import * as postDao from "../daos/posts-dao.js";
import * as recipeDao from "../daos/recipe-dao.js";

const getPosts = async (req, res) => {
    const posts = await postDao.findAll();
    res.json(posts);
}

const createPost = async (req, res) => {
    const {post} = req.body;
    //Does this recipe already exist in our database?
    const currentRecipe = await recipeDao.findById(post.recipe.idMeal);
    //If it does add the ObjectId to this post
    if (currentRecipe) {
        const newPost = {...post, recipe: currentRecipe};
        const response = await postDao.createPost(newPost);
        res.send(response);
        //If it doesn't, create it and add the new objectId to this post
    } else {
        const newRecipe = await recipeDao.createRecipe(post.recipe);
        const newPost = {...post, recipe: newRecipe};
        const response = await postDao.createPost(newPost);
        res.send(response);
    }
}

const deletePost = async (req, res) => {
    const {post} = req.body;
    const status = await postDao.deletePost(post);
    res.send(status);
}

const postController = (app) => {
    app.get("/api/posts", getPosts);
    app.post("/api/posts", createPost);
    app.delete("/api/posts", deletePost);
}
export default postController;