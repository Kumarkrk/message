// import Structure from "../data/db.js"
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// export const link=async(req,res)=>
// {
//     const{text,ttl_seconds,max}=req.body;
//   let expiresAt = null;
// if (paste.expiresAt && Date.now() > paste.expiresAt) {
//   return res.status(404).json({ error: "expired" });
// }
// else if (paste.maxViews && paste.views >= paste.maxViews) {
//   return res.status(404).json({ error: "view limit exceeded" });
// }

   
// else{
//     if (ttl_seconds) {
//   expiresAt = Date.now() + ttl_seconds * 1000; // number
// }
//     const data=await Structure.create({text:text, end_time:expiresAt,  max_views:max, limit:max})
    
//     const hash1=bcrypt.hash(text,10);

// const url = `http://localhost:4000/p/${data._id}`;
// res.json({
//   id: paste._id,
//   url
// });


//     // const token=await jwt.sign({id:data._id,
//     //     hash1,
//     //     })
//     //     return res.status(200).json(token);
//     }
// }
import Structure from "../data/db.js";
export const link = async (req, res) => {
  try {
    const { content, ttl_seconds, max_views } = req.body; // ✅ change names

    if (!content || content.trim() === "") {
      return res.status(400).json({ error: "content is required" });
    }

    let expiresAt = null;

    if (ttl_seconds) {
      expiresAt = Date.now() + ttl_seconds * 1000;
    }

    const data = await Structure.create({
      text: content,          // ✅ map content → text
      end_time: expiresAt,
      max_views: max_views
    });

    const url = `http://localhost:4000/p/${data._id}`;

    res.status(201).json({
      id: data._id,
      url
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

