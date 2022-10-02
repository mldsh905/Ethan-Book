import express from "express";
const route = express.Router();

import Posts from "../models/Posts.js";
import Users from "../models/Users.js";


//create a post
route.post('/', async (req, res) => {
    try {
        const newPost = new Posts(req.body);
        const result = await newPost.save();
        res.status(200).json(result)
    } catch (e) {
        res.status(500).json(e)
    }
})

//update a post
route.put('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post.id === req.body.id) {
            await post.updateOne({$set: req.body});
            res.status(200).json('Post is updated!')
        } else {
            res.status(403).json('You are not allowed to update it!')
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

//delete a post
route.delete('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post.id === req.body.id) {
            await post.deleteOne();
            res.status(200).json('Post is deleted!')
        } else {
            res.status(403).json('You cannot delete it!')
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

//comment a post
route.put('/:id/comment', async (req, res)=>{
    try{
        const post = await Posts.findById(req.params.id);
        await post.updateOne({$push: {comments: {id: req.body.id, userId: req.body.userId, username: req.body.username, desc: req.body.desc, createAt: new Date()}}});
        res.status(200).json(post)
    }catch (e) {
        res.status(500).json(e)
    }
})

//like and unlike a post
route.put('/:id/like', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        // res.json(post.likes.includes(req.body.id))
        if (!post.likes.includes(req.body.id)) {
            await post.updateOne({$push: {likes: req.body.id}})
            res.status(200).json(post)
        } else {
            await post.updateOne({$pull: {likes: req.body.id}})
            res.status(200).json(post)
        }
    } catch (e) {
        res.status(500).json(e)
    }
})

//get a post
route.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        res.status(200).json(post)
    } catch (e) {
        res.status(500).json(e)
    }
})

//get all posts
route.get('/get/allPosts/:id', async (req, res) => {
    try {
        // const user = await Users.findOne({id: req.params.id});
        const user = await Users.findById(req.params.id);
        let userPosts = await Posts.find({id: user._id});
        const followingPosts = await Promise.all(
            user.followings.map(person => {
                return (Posts.find({id: person}));
            })
        )
        followingPosts.forEach(e => {
            userPosts = userPosts.concat(e)
        })
        res.status(200).json(userPosts)
    } catch (e) {
        res.status(500).json(e)
    }
})

//get personal posts
route.get('/get/posts/:id', async (req, res) => {
    try {
        // const user = await Users.findOne({id: req.params.id});
        const user = await Users.findById(req.params.id);
        let userPosts = await Posts.find({id: user._id});
        res.status(200).json(userPosts)
    } catch (e) {
        res.status(500).json(e)
    }
})


export default route