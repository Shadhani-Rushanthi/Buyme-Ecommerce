import Oder from '../models/Orders.js'

export const addOder = async (req, res, next) => {
    console.log(req.body)
    try {
        let order = new Oder(req.body)
        let response = await order.save()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

export const getOders = async (req, res, next) =>{
    try {
        let orders = await Oder.find()
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

export const getOder = async (req, res, next) =>{
    try {
        let order = await Oder.findById(req.params.id)
        res.status(200).json(order)
    } catch (error) {
        next(error)
    }
}

export const modifyOder = async (req, res, next) =>{
    try {
        let order = await Oder.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(order)
    } catch (error) {
        next(error)
    }
}

export const removeOder = async (req, res, next) =>{
    try {
        let order = await Oder.findByIdAndDelete(req.params.id)
        res.status(200).json(order)
    } catch (error) {
        next(error)
    }
}

export const changeOderStatus = async (req, res, next) =>{
    try {
        console.log(req.body.orderStatus)
        let order = await Oder.findByIdAndUpdate({_id:req.params.id}, {
            $push:{
                orderStatus:{
                    $each: req.body.orderStatus
                }
            }
        }, {$new:true})
        res.status(200).json(order)
    } catch (error) {
        next(error)
    }
}