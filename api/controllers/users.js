import bcrypt from "bcryptjs/dist/bcrypt.js"
import User from "../models/User.js"

export const getUsers= async(req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const getUserByEmail= async(req, res, next) => {
    try {
        const users = await User.findOne({email:req.params.email})
        if(!users) return res.status(200).json("user not found");
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const getUser= async(req, res, next) => {
    try {
        const users = await User.findById(req.params.id)
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const modifyUser= async(req, res, next) => {
    if(req.body.password != undefined) 
    {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        req.body.password=hash
        console.log(req.body)
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}