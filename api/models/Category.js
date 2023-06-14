import mongoose from "mongoose";
const {Schema} = mongoose;

const CategorySchema = new mongoose.Schema(
    {
        category:{
            type:String, 
            require:true, 
            unique: true,
        },
        types:{
            type: [String]
        }
    }
)


export default mongoose.model("Category", CategorySchema)