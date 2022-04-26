import mongoose from 'mongoose';
const schema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    sunday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
    monday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
    tuesday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
    wednesday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
    thursday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
    friday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
    saturday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
    likedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
}, {collection: 'plans', timestamps: true});

export default schema;