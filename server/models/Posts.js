import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true,
        maxLength: 1000
    },
    img:{
        type: String,
        default: ''
    },
    comments:{
        type: Array,
        default:[]
    },
    likes:{
        type: Array,
        default: []
    }
},{timestamps: true})

export default mongoose.model('posts', postSchema)