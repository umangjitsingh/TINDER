import ChatModel from "../models/chat.model.js";

export const chatController = async(req, res) => {
   const loggedInUserId = req.user._id;
   const { targetUserId } = req.params;

   try {
      let chat = await ChatModel.findOne({
         participants: { $all: [loggedInUserId, targetUserId] }
      });

      if (!chat) {
         // Create new chat if none exists
         chat = new ChatModel({
            participants: [loggedInUserId, targetUserId],
            messages: []
         });
         await chat.save();
      }

      res.status(200).json(chat);
   } catch (e) {
      res.status(500).json({ message: "Failed to get chat", error: e.message });
   }
}