import mongoose from 'mongoose';

const schema = mongoose.Schema({
    idMeal: {type: Number, required: true, unique: true},
    strMeal: {type: String, required: true},
    strMealThumb: String,
    strSource: String,
    strArea: String,
    strCategory: String,
    liked: [{user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}}]
}, {collection: 'recipes', timestamps: true});
export default schema;