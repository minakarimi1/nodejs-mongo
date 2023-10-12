import mongoose from "mongoose";

//create Schema
const usersShema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String, require: true },
  age: { type: Number },
});

//Creating a User class from the schema model
const Users = mongoose.model("Users", usersShema);
export default Users