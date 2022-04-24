import mongoose from 'mongoose';
const schema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'recipes', required: true},
    text: {type: String, default: ""},
}, {collection: 'posts', timestamps: true});

export default schema;