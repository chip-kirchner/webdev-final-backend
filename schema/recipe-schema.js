import mongoose from 'mongoose';

const schema = mongoose.Schema({
    idMeal: {type: Number, required: true, unique: true},
    strMeal: {type: String, required: true},
    liked: [{_id: Number, username: String}]
}, {collection: 'recipes'});
export default schema;