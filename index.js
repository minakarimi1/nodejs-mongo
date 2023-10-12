import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import usersRoute from "./usersRoute.js";

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("connected to database"))
  .catch((error) => console.log("can not connect to database", error));

app.use("/api/user", usersRoute);

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
