
import express from "express";
import { deleteUser, followUser, getUser, updateUser ,getAllUsers} from "../controller/UserController.js";

const UserRouts=express.Router();
UserRouts.get('/getUser/:id',getUser)
UserRouts.get('/getAllUsers/:id',getAllUsers)
UserRouts.post('/updateUser',updateUser)
UserRouts.delete('/deleteUser/:id',deleteUser)
UserRouts.put('/followUser/:id&:currentUserID',followUser)

export default UserRouts; 