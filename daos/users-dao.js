import userModel from "../models/user-model.js";

export const findUserByEmail= async (email) => {
    const user = userModel.findOne({email});
    return user;
};

export const findUserByCredentials = async (email, password) => userModel.findOne({email, password});

export const createUser = async (user) => userModel.create(user);

export const updateUser = async (_id, user) => userModel.updateOne({_id}, {$set: user});