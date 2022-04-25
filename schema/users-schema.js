import mongoose from 'mongoose';
const schema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    name: {type: String, default: ""},
    role: {type: String, required: true, default: "pleb"},
    favoriteRecipes: [{idMeal: Number}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
}, {collection: 'users'});

export default schema;