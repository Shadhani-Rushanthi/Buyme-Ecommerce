import express from 'express';
import { addItem, getItem, getItems, modifyItem, removeItem } from '../controllers/items.js';

const route = express.Router()

route.post('/', addItem)
route.get('/', getItems)
route.get('/:id', getItem)
route.put('/:id', modifyItem)
route.delete('/:id', removeItem)

export default route;