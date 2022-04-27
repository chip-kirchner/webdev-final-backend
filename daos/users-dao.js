import userModel from "../models/user-model.js";

export const findUserByEmail= async (email) => {
    const user = userModel.findOne({email});
    return user;
};

export const findUserByCredentials = async (email, password) => userModel.findOne({email, password}).populate({path: 'plan', populate: [
        {path: 'monday', model: 'recipes'},
        {path: 'tuesday', model: 'recipes'},
        {path: 'wednesday', model: 'recipes'},
        {path: 'thursday', model: 'recipes'},
        {path: 'friday', model: 'recipes'},
        {path: 'saturday', model: 'recipes'},
        {path: 'sunday', model: 'recipes'}
    ]
});

export const createUser = async (user) => userModel.create(user);

export const updateUser = async (_id, user) => userModel.findByIdAndUpdate({_id}, {$set: user}, {new: true}).populate({path: 'plan', populate: [
        {path: 'monday', model: 'recipes'},
        {path: 'tuesday', model: 'recipes'},
        {path: 'wednesday', model: 'recipes'},
        {path: 'thursday', model: 'recipes'},
        {path: 'friday', model: 'recipes'},
        {path: 'saturday', model: 'recipes'},
        {path: 'sunday', model: 'recipes'}
    ]
});

export const addPlanToUser = async (_id, plan) => userModel.findByIdAndUpdate({_id}, {$set: {plan: plan}}, {new: true}).populate({path: 'plan', populate: [
        {path: 'monday', model: 'recipes'},
        {path: 'tuesday', model: 'recipes'},
        {path: 'wednesday', model: 'recipes'},
        {path: 'thursday', model: 'recipes'},
        {path: 'friday', model: 'recipes'},
        {path: 'saturday', model: 'recipes'},
        {path: 'sunday', model: 'recipes'}
    ]
});