import Users from "./model/usersModel.js";
import express from "express";
import { body, validationResult } from "express-validator";
const userRouter = express.Router();

userRouter.get(
  "/",
  async (req, res) => {
    try {
      const userList = await Users.find();
      res.status(200).json({
        data: userList,
        message: "OK",
      });
      console.log(userList);
    } catch (error) {
      console.log(error.message);
      res.status(404).json({
        data: null,
        massage: "Error while fetching user",
      });
    }
  }
);

//get user by Id example=> /api/user/12345
userRouter.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user)
      return res.status(404).json({ data: null, message: "User ID not found" });

    res.status(200).json({
      data: user,
      message: "OK",
    });
    console.log(user);
  } catch (error) {
    console.log(error.message);
    res.status(404).json({
      data: null,
      message: "Error while fetching user by ID",
    });
  }
});

//post json format example=> {"firstName":"mina","lastName":"karimi","age":27}
userRouter.post("/",
[body("firstName", "firstName cant be empty").notEmpty()],
async (req, res) => {
  try {
    //validate
    const errors = validationResult(req);
    if(!errors.isEmpty()){return res.status(404).json({data: null ,errors: errors.array(), message: "validation error"})};

    //create newUser
    const newUser = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
    });

    await newUser.save();
    console.log(newUser);
    res.status(200).json({
      data: newUser,
      message: "User created successfully",
    });

  } catch (error) {
    console.log(error.message);
    res.status(404).json({
      data: null,
      message: "Error while creating user",
    });
  }
});

//put
// json format => /api/user/65280cab92...  update parametrs {"firstName":"mohammad"...}
userRouter.put("/:id", 
[body("firstName", "firstName cant be empty").notEmpty()],
async (req, res) => {
  try {
     //validate
     const errors = validationResult(req);
     if(!errors.isEmpty()){return res.status(404).json({data: null ,errors: errors.array(), message: "validation error"})};

    //create newUser
    let userUpdate = await Users.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
    });

    if (!userUpdate) {
      return res.status(404).json({
        data: null,
        message: "this user with the given id was not find",
      });
    }
    res.status(200).json({ data: userUpdate, message: "ok" });
  } catch (error) {
    // console.log(error.message);
    res
      .status(404)
      .json({ data: null, message: "Error while fetching user by ID" });
  }
});

//delete
userRouter.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(404).json({ data: null, message: "this id not find" });
    }
    res.status(200).json({ data: deleteUser, message: "ok" });
  } catch (error) {
    console.log(error.message);
    res
      .status(404)
      .json({ data: null, message: "Error while fetching user by ID" });
  }
});
export default userRouter;
