import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 25
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 25
    },
    coverPicture: {
        type: String,
        default: ''
    },
    profilePicture: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc:{
        type: String,
        maxLength: 50,
        default:''
    },
    city:{
        type: String,
        default:''
    }
},{timestamps:true})

export default mongoose.model('users', userSchema)