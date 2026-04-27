import mongoose from 'mongoose';

const messageSchema=new mongoose.Schema({
   senderId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
   },
   messageBody:{
      text  : {type:String,required:true},
      time  : {type:String},
      sender: {type:String,required:true}
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

const chatSchema = new mongoose.Schema({
   participants: [{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}],
   messages:[messageSchema]

});

const ChatModel = mongoose.model("Chat", chatSchema)

export default ChatModel;