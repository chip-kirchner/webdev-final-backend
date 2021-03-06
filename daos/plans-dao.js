import plansModel from "../models/plans-model.js";

export const findAll = async () => plansModel.find().populate('sunday')
    .populate('monday')
    .populate('tuesday')
    .populate('wednesday')
    .populate('thursday')
    .populate('friday')
    .populate('saturday')
    .populate('user', '-password -email').sort({createdAt: 'desc'});

export const findOne = async (_id) => plansModel.findOne({_id});

export const createPlan = async (plan) => plansModel.create(plan);

export const publishPlan = async (_id) => plansModel.updateOne({_id}, {$set: {publish: true}});

export const deletePlan = async (plan) => plansModel.deleteOne(plan);

export const deleteUserPlans = async (_id) => plansModel.deleteMany({user: _id});


