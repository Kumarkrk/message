import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Route from './routing/route.js';
import Structure from "./data/db.js"

dotenv.config();
const app=express();
app.listen(process.env.Port,()=>
{
    try{
console.log(`server connected succsefully on Port number ${process.env.PORT}`);
    }
    catch(e)
    {
        console.log(e)
    }
});
// app.get("/p/:id", async (req, res) => {
//   try {
//     const paste = await Structure.findById(req.params.id);

//     if (!paste) return res.status(404).send("Not Found");
// res.send(`<pre>${paste.text}</pre>`);

//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// });
app.get("/p/:id", async (req, res) => {
  try {
    const paste = await Structure.findById(req.params.id);

    if (!paste) return res.status(404).send("Not Found");

    // TTL check
    if (paste.end_time && Date.now() > paste.end_time) {
      return res.status(404).send("Expired");
    }

    // View limit check
    if (paste.max_views && paste.views >= paste.max_views) {
      return res.status(404).send("View limit exceeded");
    }

    paste.views++;
    await paste.save();

    res.send(`<pre>${paste.text}</pre>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL).then(()=>{
    try{
     console.log('database connected sucessfully');
    }
    catch(e)
    {
        console.log(e);
    }
}
)
app.use("/paste",Route);
