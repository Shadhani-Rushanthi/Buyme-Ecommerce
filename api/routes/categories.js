import express from  'express'
import { addCategoryTypes, createCategory, getCategories, getCategory, getCategoryByName, modifyCategory, removeCategory, removeCategoryTypes } from '../controllers/categories.js'

const route = express.Router()

route.post('/', createCategory)
route.put('/:id', modifyCategory)
route.get('/', getCategories)
route.get('/:id', getCategory)
route.get('/getcategorybyname/:category', getCategoryByName)
route.delete('/:id', removeCategory)
route.put('/addtypes/:id', addCategoryTypes)
route.put('/removetypes/:id', removeCategoryTypes)

export default route;