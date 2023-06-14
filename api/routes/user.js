import { getUsers, getUser, modifyUser, getUserByEmail } from "../controllers/users.js";
import express from 'express'

const route = express.Router()

route.get('/', getUsers)
route.get('/:id', getUser)
route.get('/getbyemail/:email', getUserByEmail)
route.put('/:id', modifyUser)

export default route