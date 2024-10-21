const express=require('express')
const app=express()
const PORT=8001
const path = require('path');
const connectToMongoDb=require("./connect")

const {urlmodel}=require("./model/urlmodel")
const {restricttologgedinuseronly,checkauth}=require("./middleware/auth")
const staticrouter=require("./routes/staticroute")
const urlroute=require("./routes/urlroute")
const userroute=require("./routes/userroute");
const cookieParser = require('cookie-parser');


connectToMongoDb("mongodb://127.0.0.1:27017/url-shortner")
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log("mongodb not connected"))

//middleware
//jo incoming bodyies ko parse kar saakaye
//json data ko parse karlene k liye middleware hai
app.use(express.json())

//form data ko parse karne k liye middleware
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.set("view engine","ejs")
app.set("views",path.resolve('./views'))
app.use("/api/url",restricttologgedinuseronly,urlroute)
app.use("/",checkauth,staticrouter)
app.use("/user",userroute)

app.get("/:shortid",async(req,res)=>{
    const shortid=req.params.shortid;
    const entry=await urlmodel.findOneAndUpdate(
                                                {shortid},
                                                {
                                                 $push:{
                                                    visitedhistory:{timestamp:Date.now()}
                                                 },
                                                })
    if (entry && entry.redirecturl) {
        res.redirect(entry.redirecturl);
    } else {
        res.status(404).send('URL not found');
    }                                          
})

// app.get("/api/test",async(req,res)=>{
//     const allurl=await urlmodel.find({})
//     return res.end(
//         `
//         <html>
//         <head></head>
//         <body>
//         <ol>
//          ${allurl.map(url=>`<li>${url.shortid}         | ${url.redirecturl}       |    ${url.visitedhistory.length}</li>`).join("")}
//         </ol>
//         </body>
//         </html>
//         `
//     )
// })


//The issue is that you're not awaiting the result of the database query. urlmodel.find({}) returns a Promise, 
// so you need to await it before passing the data to the view
app.get("/api/test",async(req,res)=>{
    const allurls=await urlmodel.find({})
    return  res.render('home',{urls:allurls,})
})

app.listen(PORT,()=>console.log("server connected"))