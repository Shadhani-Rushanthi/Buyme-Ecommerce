import mongoose from "mongoose";
const {Schema} = mongoose;

const OrderSchema = new mongoose.Schema(
    {
        Item:{
            type:String, 
            require:true
        },
        qty:{
            type: Number
        },
        stockId:{
            type:[String]
        },
        totalCost:{
            type:Number
        }, 
        orderdDate:{
            type:Date
        },
        orderStatus:[
            {
                status:String,
                date:Date
            }
        ]
    },{
        timestamps:true
    }
)


export default mongoose.model("Order", OrderSchema)