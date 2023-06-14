import Category from '../models/Category.js'
import { createError } from '../utils/error.js'

export const createCategory = async (req, res, next)=>{
    try {
        let cat = new Category(req.body)
        let cats = await cat.save(cat)
        res.status(200).json(cats)
    } catch (error) {
        next(error)
    }
}

export const modifyCategory = async (req, res, next)=>{
    try {
        let cats = await Category.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
        res.status(200).json(cats)
    } catch (error) {
        next(error)
    }
}


export const getCategories = async (req, res, next)=>{
    try {
        let cat = await Category.find()
        res.status(200).json(cat)
    } catch (error) {
        next(error)
    }
}

export const getCategory = async (req, res, next)=>{
    try {
        let cat = await Category.findById(req.params.id)
        res.status(200).json(cat)
    } catch (error) {
        next(error)
    }
}

export const getCategoryByName = async (req, res, next)=>{
    try {
        console.log("request is" + req)
        let cat = await Category.find({category: req.params.category})
        res.status(200).json(cat)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const removeCategory = async (req, res, next)=>{
    try {
        let cat = await Category.findByIdAndDelete(req.params.id)
        res.status(200).json(cat)
    } catch (error) {
        next(error)
    }
}

export const addCategoryTypes = async (req, res, next) => {
    try {
        console.log(req.body.types)
        let cat = await Category.findByIdAndUpdate({ _id: req.params.id},
            {$push: { 
                types: {
                    $each: req.body.types
                }
            }},
            {new:true}
         )
        res.status(200).json(cat)
    } catch (error) {
        next(error)
    }
}

export const removeCategoryTypes = async (req, res, next) => {
    try {
        console.log(req.body.types, req.params)
        let cat = await Category.findByIdAndUpdate({ _id: req.params.id},
            {$pull: { 
                types: {
                    $each: req.body.types
                }
            }},
            {new:true}
         )
        res.status(200).json(cat)
    } catch (error) {
        next(error)
    }
}
