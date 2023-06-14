import express from 'express'
import { addOder, changeOderStatus, getOder, getOders, modifyOder, removeOder } from '../controllers/order.js';
import { verifyToken } from '../utils/verifyToken.js';

const route = express.Router()

route.post('/', verifyToken, addOder)
route.get('/', verifyToken, getOders)
route.get('/:id', getOder)
route.put('/:id', modifyOder)
route.put('/changestatus/:id', changeOderStatus)
route.delete('/:id', removeOder)

export default route;