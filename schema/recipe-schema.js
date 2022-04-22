import mongoose from 'mongoose';

const schema = mongoose.Schema({
    idMeal: {type: Number, required: true, unique: true},
    strMeal: {type: String, required: true},
    liked: [{user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}}]
}, {collection: 'recipes'});
export default schema;