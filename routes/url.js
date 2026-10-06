import express from 'express';
import handleGenerateNewShortURL from '../controllers/url.js';
import URL from '../models/url.js'

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/:shortid",async (req,res)=>{
  const shortID=req.params.shortid;

  const entry= await URL.findOneAndUpdate(
    {shortID},
    {
        $push:{
            visitHistory: {
                timestamp : Date.now()
            }
        }
    });
   if(!entry){
    return res.status(404).json({
        error:"short url not found"
    });
   }

   return res.redirect(entry.redirectUrl);
  
})

router.get("/analytics/:shortid", async (req,res)=>{
    const shortID= req.params.shortid;
    const url=await URL.findOne({shortID});
    let result=url.visitHistory.length;
    return res.json({totalclickes:result,
                     ip:req.ip,
                     userAgent: req.headers["user-agent"],
                     referer: req.headers["referer"],
                     anlytics:url.visitHistory,

    }
    );
})

export default router;
