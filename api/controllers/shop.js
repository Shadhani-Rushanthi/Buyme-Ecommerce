import bcrypt from 'bcryptjs/dist/bcrypt.js';
import Shop from '../models/Shop.js'
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const createShop = async  (req, res, next) =>{
    try {        
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt) 

        req.body.password=hash;

        let shop = new Shop(req.body);
        let savedShop = await shop.save()
        res.status(200).json(savedShop)
    } catch (error) {
        next(error)
    }
}

export const shopLogin = async (req, res, next) => {
    try {
        let shop = await Shop.findOne({email:req.params.email})
        console.log(shop)
        if(!shop) return res.status(200).json("Invalid User")

        let isPwd = await bcrypt.compare(req.params.password, shop.password)
        if(!isPwd) return res.status(200).json("Incorrect Password")

        const token = jwt.sign({ id:shop._id }, process.env.JWT);
        // const token = jwt.sign({ id:user._id }, process.env.JWT,{ expiresIn: '10s' });

        const {_id, password, ...otherDetails} = shop._doc;
        res.cookie("access_token", token, {httpOnly:true}).status(200).json({...otherDetails})
    } catch (error) {
        next(error)
    }
}

export const getShops = async (req, res, next) => {
    try {
       let shops = await Shop.find()
       res.status(200).json(shops)
    } catch (error) {
        next(error)
    }
}

export const getShop = async (req, res, next) => {
    try {
        let shop = await Shop.findById(req.params.id)
        if(!shop) return next(createError("User not found"))
        res.status(200).json(shop)
    } catch (error) {
        next(error)
    }
}

export const modifyShop = async (req, res, next) => {
    if(req.body.password != undefined) 
    {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)
        req.body.password=hash
        console.log(req.body)
    }
    try {
        let shop = await Shop.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(shop)
    } catch (error) {
        next(error)
    }
}