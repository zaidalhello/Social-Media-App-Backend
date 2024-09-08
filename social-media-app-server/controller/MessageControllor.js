import MessageModel from "../Models/MessageModel.js";

export const addMessage = async (req, res) => {
  try {
    const { chatID, sendeID, text } = req.body;
    const newMessage = new MessageModel({chatID, sendeID, text});
    const result = await newMessage.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Can't Create Message." });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { chatId } = req.params; // Destructuring chatId from params
    const messages = await MessageModel.find({ chatID: chatId }); // Corrected query syntax
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Can't find messages.", error: error.message }); // Added error.message
  }
};