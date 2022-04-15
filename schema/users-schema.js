import mongoose from 'mongoose';
const schema = mongoose.Schema({
    username: {type: String, required: true},
    pw: {type:String, required: true},
    liked: [Number]
})