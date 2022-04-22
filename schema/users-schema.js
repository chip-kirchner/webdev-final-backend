import mongoose from 'mongoose';
const schema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true},
    name: String,
    role: {type: String, required: true, default: "pleb"},
    liked: [{recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes'}}],
    following: [String]
}, {collection: 'users'});

export default schema;