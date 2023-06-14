import mongoose from "mongoose";
const {Schema} = mongoose;

const CartSchema = new mongoose.Schema(
    {
        Item:{
            type:String, 
            require:true
        },
        qty:{
            type: Number
        },
        price:{
            type:Number
        }, 
        totalPrice:{
            type:Number
        }
    },{
        timestamps:true
    }
)


export default mongoose.model("Cart", CartSchema)