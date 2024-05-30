// connect data base with node js

const mongoose = require("mongoose");

const DB = "mongodb+srv://wssimgorsan01:wassim12@cluster0.6ols9ju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Connection URI

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("MongoDB Connected")).catch((err)=>{
    console.log(err);
})


//SQenwjM2BkKkaHnE






















