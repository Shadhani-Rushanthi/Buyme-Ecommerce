import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const register = async (req, res, next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)   

        const newUser = new User({
            username: req.body.username,
            email:req.body.email,
            password: hash
        })
        
        let user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

// debug
export const login = async (req, res, next)=>{
    try {
        const user = await User.findOne({email:req.params.email})
        if(!user) return res.status(200).json("Invalid User");
        
        const ispwdCorrect = await bcrypt.compare(req.params.password, user.password)
        if(!ispwdCorrect) return res.status(200).json("Incorrect Password");

        // const token = jwt.sign({ id:user._id }, process.env.JWT);
        const token = jwt.sign({ id:user._id }, process.env.JWT,{ expiresIn: '60s' });
        const {_id, password, ...otherDetails} = user._doc;
        res.cookie("access_token", token, {httpOnly:true}).status(200).json({...otherDetails})
    } catch (error) {
        next(error)
    }
}