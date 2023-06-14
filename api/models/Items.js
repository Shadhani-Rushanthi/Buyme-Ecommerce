import mongoose from "mongoose";
const {Schema} = mongoose;

const ItemSchema = new mongoose.Schema(
    {
        name:{
            type:String, 
            require:true
        },
        itemType:{
            type: String
        },
        stock:[
            {
                stockQty: Number,
                itemPrice: Number, 
                shippingFee: Number,
                soldOut:Number
            }
        ], 
        totalSold:{
            type:Number
        }, 
        mainImg:{
            type:String,
            require:true
        },
        subImages:[
            {
                Image:String,
                desc:String
            }
        ],
        reviewId:{
            type:[String]
        },
        ratings: {
            type:Number
        },
        isSale: [
            {
                status:Boolean,
                salePrice:Number,
                rate:Number
            }
        ]
    },{
        timestamps:true
    }
)


export default mongoose.model("Item", ItemSchema)