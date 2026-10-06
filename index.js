import express from 'express'
import router from './routes/url.js'
import connecttomongodb from './connect.js'

const app=express();
const PORT=8000;

connecttomongodb("mongodb://localhost:27017/urlshortener")
.then(()=> {console.log("connected to mongodb");
});

app.use(express.json())
.use("/url",router);

app.listen(PORT,()=>{
    console.log(`server started at PORT: ${PORT}`);
});
