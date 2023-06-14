import express from 'express'
import { createShop, getShop, getShops, modifyShop, shopLogin } from '../controllers/shop.js'

const route = express.Router()

route.post('/register', createShop)
route.get('/login/:email/:password', shopLogin)
route.get('/', getShops)
route.get('/:id', getShop)
route.put('/:id', modifyShop)

export default route