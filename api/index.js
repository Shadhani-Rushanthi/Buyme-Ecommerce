import express from "express";
import mogoose from "mongoose";
import dotenv from "dotenv"
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import shopRoute from './routes/shop.js'
import categoryRoute from './routes/categories.js'
import itemroute from './routes/items.js'
import orderRoute from './routes/order.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()

const connect  = async () => {
    try {
        await mogoose.connect(process.env.MONGO)
        console.log("connected to the DB")
    } catch (error) {
        throw error
    }
}
mogoose.connection.on("disconnected", () =>{
    console.log("disconnected from DB")
})
mogoose.connection.on("connected", () =>{
    console.log("connected from DB")
})


// app.use(express.json())
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/shop', shopRoute)
app.use('/api/category', categoryRoute)
app.use('/api/item', itemroute)
app.use('/api/order', orderRoute)


app.listen(8800, () =>{
    connect()
    console.log("connected to the backend");
})