import mongoose from "mongoose";
const Structure=new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
   
    end_time:{
        type:Number,

    }
    ,
    max_views:{
        type:Number,
       default:null,
    },
    views:{
        type:Number,
        default:1
    }

})
export default mongoose.model("Structure",Structure);