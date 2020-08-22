const express=require('express');
const cors=require('cors');
const dotnev=require('dotenv');
const ConnectDB=require("./dbutil/db");
dotnev.config({path:"./config.env"});
const blogRoutes=require('./routes/blog');
const authRoutes=require('./routes/auth');



//express server
const app=express();
const PORT =process.env.PORT||5000;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api',blogRoutes);
app.use('/api',authRoutes);

app.get("/",(req,res)=>{
    res.send("Welcome to deploy")
})


//database conncetion
ConnectDB();


app.listen(PORT,()=>{
console.log(`Server is running on PORT ${PORT}`);
})