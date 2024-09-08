import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatID: {
      type: String,
    },
    sendeID: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
