import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./Routs/AuthRoute.js";
import UserRouts from "./Routs/UserRoute.js";
import PostRoute from "./Routs/PostRoute.js";
import UploadRouter from "./Routs/UploadRoute.js";
import ChatRoute from "./Routs/ChatsRouts.js";
import MessageRoute from "./Routs/MessageRoute.js";
dotenv.config();

const app = express();
app.use(express.static("public"));
app.use('/images', express.static("images"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_STRING.toString())
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Connect successful`);
    })
  )
  .catch((error) => console.log(`${error} did not connect`));

//Routs
app.use("/Auth", AuthRoute);
app.use("/user", UserRouts);
app.use("/Post", PostRoute);
app.use("/upload", UploadRouter);
app.use("/chat", ChatRoute);
app.use("/Message", MessageRoute);
