require("dotenv").config();
const express = require("express");
const {Schema,mongoose} = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// mongoose.connect(process.env.LOCAL_URL)
// .then(()=>console.log("mongodbLocal is connected"))
// .catch((error)=>console.error(error));
mongoose.connect( process.env.MONGO_URL )
 .then(()=>console.log("mongodbAtlas connected"))
 .catch((error)=>console.error(error));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dataSchema=new Schema({
    key:String,
    title:String,
    content:String
})
const Storage=mongoose.model("data",dataSchema);

//let data=[];
app.get("/",function(req,res){
res.send("ok");
});
app.get("/fetchdata", async function (req, res) {
    const data=await Storage.find();
    
     if (data.length > 0) {
       // console.log(data); 
        res.json(data);
     }
});
app.post("/delete", async function (req, res) {
    const id = req.body.id;
    await Storage.deleteOne({key:id});
    // //console.log(" Server Value after delete: ");
    // data = data.filter((value) => id !== value.key);
    // console.log(data);
    // res.json("This is you going to be deleted id: " + id);
});
app.post("/data", function (req, res) {
    const value = req.body;
    // data.push(value);
    // // console.log("value of server:");
    // console.log(data);
    // // res.json(value);
    const FirstStorage=new Storage(value);
     FirstStorage.save();
    // console.log(value);
    // Storage.create(value,(error)=>{
    //     if(error){
    //         console.log(error);
    //     }else console.log("Successfully inserted");
    // })
});

app.listen(process.env.PORT || 5000, () => console.log("Server is connected"));