import ChatModel from "../Models/ChatModel.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.reseverId],
  });
  try {
    await newChat.save();
    res.status(200).json({ message: "Create Chat successfully." });
  } catch (error) {
    res.status(500).json({ message: "Can't Create Chat." });
  }
};

export const userChats = async (req, res) => {
  try {
    const newChat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json({ newChat });
  } catch (error) {
    res.status(500).json({ message: "Can't find any Chat." });
  }
};
export const findChats = async (req, res) => {
  try {
    const newChat = await ChatModel.findOne({
      members: { $all: [req.params.firstID,req.params.secondID] },
    });
    res.status(200).json({ newChat });
  } catch (error) {
    res.status(500).json({ message: "Can't find any Chat." });
  }
};
