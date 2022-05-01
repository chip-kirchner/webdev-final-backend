import mongoose from 'mongoose';
const schema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    name: {type: String, default: ""},
    role: {type: String, required: true, enum: ['standard', 'planner', 'moderator'], default: 'standard'},
    favoriteRecipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'recipes'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    followedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    plan: {
        sunday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
        monday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
        tuesday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
        wednesday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
        thursday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
        friday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'},
        saturday: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'}
    }
}, {collection: 'users'});

export default schema;