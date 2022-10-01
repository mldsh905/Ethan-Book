import express from 'express';
import User from '../models/Users.js';
import bcrypt from 'bcrypt';
const route = express.Router();
import jwt from 'jsonwebtoken';

//register
route.post('/register',async (req,res)=>{
    try {
        // const user = new User(req.body);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const user = new User({
            ...req.body,
            password: hash
        })
        const savedUser = await user.save();
        res.status(200).json(savedUser)
    }catch (e) {
        res.status(500).json(e);
    }
})

//login
route.post('/login',async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
        if (!user) return res.status(404).json('user not find!');
        const isPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!isPassword) return res.status(400).json('password incorrect');
        // create token (use 'openssl rand -base64 10')
        const {password, isAdmin, ...others} = user._doc;
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.jwt);
        res.status(200).cookie('access_token', token, {httpOnly: true}).json({...others});
    }catch (e) {
        res.status(500).json(e)
    }
})

//logout
route.get('/logout',async (req, res) => {
    try{
        res.cookie('access_token', 'token', {httpOnly: true,maxAge:0}).json('logout');
    }catch (e) {
        res.json(e)
    }
})

export default route;