import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    shortID:{
        type: String,
        required:true,
        unique: true,

    },
    redirectUrl:{
        type:"string",
        required:true,
    },
    visitHistory:[
        {
            timestamps: {type:Number},
        }
    ]
   },
   {timestamps:true},
)

const URL= mongoose.model("url",userSchema);

export default URL;
