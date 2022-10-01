import express from 'express';
import Users from "../models/Users.js";
import bcrypt from "bcrypt";

const route = express.Router();

//get a user
route.get('/:id', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
})

//get followings
route.post('/find/followings', async (req, res) => {
    try {
        const user = await Users.find({followings: {$in: req.body.id}});
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
})

//get followers
route.post('/find/followers', async (req, res) => {
    try {
        const user = await Users.find({followers: {$in: req.body.id}});
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
})

//search people
route.post('/find/people', async (req, res) => {
    try {
        const user = await Users.find({$and: [{username: {$regex: req.body.key}}, {_id: {$ne: req.body.id}}]});
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
})

//get new friend
route.post('/find/friends', async (req, res) => {
    try {
        const user = await Users.find({$and: [{followers: {$nin: req.body.id}}, {_id: {$ne: req.body.id}}]}).limit(10);
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
})

//update a user
route.put('/:id', async (req, res) => {
    if (req.body.id === req.params.id || req.body.isAdmin) {
        try {
            if (req.body.password) {
                const salt = bcrypt.genSaltSync(10);
                req.body.password = bcrypt.hashSync(req.body.password, salt);
            }
            const result = await Users.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
            res.status(200).json('Successful updated!')
        } catch (e) {
            res.status(500).json(e)
        }
    } else {
        res.status(403).json('You cannot access to other accounts')
    }
})

//delete a user
route.delete('/:id', async (req, res) => {
    if (req.body.id === req.params.id || req.body.isAdmin) {
        try {
            const result = await Users.findByIdAndDelete(req.params.id, {new: true});
            res.status(200).json('Successful deleted!')
        } catch (e) {
            res.status(500).json(e)
        }
    } else {
        res.status(403).json('You cannot access to other accounts')
    }
})

//follow and unfollow a user
route.put('/:id/follow', async (req, res) => {
    if (req.body.id !== req.params.id) {
        try {
            const user = await Users.findById(req.params.id);
            const currentUser = await Users.findById(req.body.id);
            if (!user.followers.includes(req.body.id)) {
                await user.updateOne({$push: {followers: req.body.id}});
                await currentUser.updateOne({$push: {followings: req.params.id}});
                res.status(200).json('Followed!')
            } else {
                await user.updateOne({$pull: {followers: req.body.id}});
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                res.status(200).json('Unfollowed!')
            }
        } catch (e) {
            res.status(500).json(e)
        }
    } else {
        res.status(403).json('You cannot follow yourself!')
    }
})


export default route;