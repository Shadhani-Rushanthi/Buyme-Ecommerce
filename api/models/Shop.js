import mongoose from "mongoose";
const {Schema} = mongoose;

const ShopSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        name:{
            type:String, 
            require:true, 
            unique: true,
        }, 
        address:{
            type:String, 
            require:true, 
        },
        description:{
            type:String, 
            require:true
        }, 
        categories:{
            type: [String]
        },
        itemIds:{
            type:[String] 
        },
        orderIds:{
            type:[String]
        }
    },{
        timestamps:true
    }

)


export default mongoose.model("Shop", ShopSchema)