import plansModel from "../models/plans-model.js";

export const findAll = async () => plansModel.find().populate('recipe').populate('user', '-password -email');

export const findOne = async (_id) => plansModel.findOne({_id});

export const createPlan = async (plan) => plansModel.create(plan);

export const updatePlan = async (_id, plan) => plansModel.updateOne({_id}, {$set: plan});

export const deletePlan = async (plan) => plansModel.deleteOne(plan);



