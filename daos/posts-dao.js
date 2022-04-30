import postModel from "../models/post-model.js"

export const findAll = async () => postModel.find().populate('recipe').populate('user', '-password -email').sort({createdAt: 'desc'});

export const findById = async (_id) => postModel.findOne({_id: _id}).populate('recipe').populate('user', '-password -email');

export const createPost = async (post) => postModel.create(post);

export const updatePost = async (_id, post) => postModel.updateOne({_id}, {$set: post});

export const deletePost = async (post) => postModel.deleteOne(post);

export const deleteUsersPosts = async (_id) => postModel.find({user: _id});

export const unlikePosts = async (_id) => postModel.find({likedBy: {_id}});