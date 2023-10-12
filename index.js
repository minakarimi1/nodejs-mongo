import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import usersRoute from "./usersRoute.js";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json())



//connect database
mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("connected to database"))
  .catch((error) => console.log("can not connect to database", error));

app.use("/api/users", usersRoute);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
