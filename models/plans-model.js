import mongoose from 'mongoose';
import plansSchema from "../schema/plan-schema.js";
const plansModel = mongoose.model('plans', plansSchema);
export default plansModel;