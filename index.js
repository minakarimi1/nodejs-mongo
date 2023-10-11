import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("connected to database"))
  .catch((error) => console.log("can not connected to database") + error);

//create Schema
const usersShema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String, require: true },
  age: { type: Number },
  data: { type: Date, default: Date.now() },
});

//Creating a User class from the schema model
const Users = mongoose.model("Users", usersShema);


//get how root '/'
app.get('/', (req,res)=>{
  console.log('welcom to home page');
  res.json({help:"user help",country_api:"/api/country",country_params_id_api:"/api/country/id"});
})


app.listen(port,()=>{
  console.log(`server run on port ${port}` );
})