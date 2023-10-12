import Users from "./model/usersModel.js";
import express from "express";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const userList = await Users.find();
    res.status(200).json({
      data: userList,
      message: "OK",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Error while fetching users",
      error: error.message,
    });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user)
      return res.status(404).json({ data: null, message: "User not found" });

    res.status(200).json({
      data: user,
      message: "OK",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Error while fetching user by ID",
      error: error.message,
    });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const newUser = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
    });

    await newUser.save();

    res.status(201).json({
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Error while creating user",
      error: error.message,
    });
  }
});

export default userRouter;
