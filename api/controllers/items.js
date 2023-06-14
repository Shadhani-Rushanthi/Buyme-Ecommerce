import Item from '../models/Items.js'

export const addItem = async (req, res, next) => {
    console.log(req.body)
    try {
        let item = new Item(req.body)
        let response = await item.save()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const getItems = async (req, res, next) =>{
    try {
        let items = await Item.find()
        res.status(200).json(items)
    } catch (error) {
        next(error)
    }
}

export const getItem = async (req, res, next) =>{
    try {
        let item = await Item.findById(req.params.id)
        res.status(200).json(item)
    } catch (error) {
        next(error)
    }
}

export const modifyItem = async (req, res, next) =>{
    try {
        let item = await Item.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(item)
    } catch (error) {
        next(error)
    }
}

export const removeItem = async (req, res, next) =>{
    try {
        let item = await Item.findByIdAndDelete(req.params.id)
        res.status(200).json(item)
    } catch (error) {
        next(error)
    }
}