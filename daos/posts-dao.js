import postModel from "../models/post-model.js"

export const findAll = async () => postModel.find().populate('recipe');

export const createPost = async (post) => postModel.create(post);

export const deletePost = async (post) => postModel.deleteOne(post);