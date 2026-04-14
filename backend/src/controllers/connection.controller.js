import ConnectionModel from "../models/connection.models.js";
import User from "../models/user.model.js"


const SAFE_DATA_STRING = "firstName lastName about age gender photoUrl skills"

export const sendRequest = async (req, res) => {
   try {
      const sender = req.user;
      const senderId = req.user._id
      const {status, receiverId} = req.params;


      if (!status || !receiverId) return res.status(400).send("Receiver ID or status is missing");

      const ALLOWED_STATUS = ["like", "pass"];
      if (!ALLOWED_STATUS.includes(status)) {
         return res.status(400).json({
            message: `${status} : status is not accepted`
         })
      }

      if (senderId.toString() === receiverId.toString()) {
         return res.status(400).json({
            message: "You cannot send request to yourself"
         });
      }

      const user = await User.findById({_id: receiverId});
      if (!user) {
         return res.status(400).json({
            message: "user not found"
         });
      }

      const ExistingConnection = await ConnectionModel.findOne({
         $or: [
            {senderId, receiverId},
            {senderId: receiverId, receiverId: senderId}
         ]
      });

      if (ExistingConnection) {
         return res.status(400).json({
            message: "Connection request already sent"
         });
      }

      const Connection = await ConnectionModel.create({
         senderId, receiverId, status
      });


      return res.status(201).json({
         message: `${sender.firstName} ${sender.lastName}  ${status}ed ${user.firstName} ${user.lastName}`,

      })

   } catch (e) {
      console.error("SEND REQUEST ERROR:", e);
      return res.status(500).json({
         message: "send request failed",
         error  : e.message
      });

   }
}

export const receivedRequest = async (req, res) => {
   const ALLOWED_STATUS = ["accepted", "rejected"];

   try {
      const receiverId = req.user._id;
      const senderId = req.params.requestId;
      const statusR = req.params.status;

      if (!receiverId) {
         return res.status(400).json({message: "Please login again"});
      }

      if (!senderId || !statusR) {
         return res.status(400).json({message: "senderId or status is missing"});
      }

      if (!ALLOWED_STATUS.includes(statusR)) {
         return res.status(400).json({message: "status not correct"});
      }

      // 1. Find the connection first
      let connection = await ConnectionModel.findOne({
         $or: [
            {status: "like", senderId, receiverId},
            {
               status    : "like", senderId: receiverId,
               receiverId: senderId
            }
         ]
      })
         .populate({
            path: 'senderId', select: 'firstName lastName'
         })
         .populate({
            path: 'receiverId', select: 'firstName lastName'
         });

      // 2. If no connection found
      if (!connection) {
         return res.status(400).json({message: "No request found"});
      }

      // 3. Prevent accepting your own request
      if (connection.senderId._id.toString() === receiverId.toString()) {
         return res.status(400).json({
            message: "You cannot accept your own request"
         });
      }

      // 4. Update status
      connection.status = statusR;
      await connection.save();

      return res.status(201).json({
         message: `request ${statusR}`,
         connection
      });

   } catch (e) {
      return res.status(500).json({
         message: `Something went wrong ${e}`
      });
   }
};

// already in friend list
export const userConnections = async (req, res) => {
   try {
      const me = req.user;

      const connections = await ConnectionModel.find({
         $or: [
            {senderId: me._id, status: "accepted"},
            {receiverId: me._id, status: "accepted"}
         ]
      })
         .populate({
            path: "senderId", select: SAFE_DATA_STRING
         })
         .populate({
            path: "receiverId", select: SAFE_DATA_STRING
         });

      // Extract only the friend (not yourself)
      const friends = connections.map(c => {
         if (c.senderId._id.toString() === me._id.toString()) {
            return c.receiverId;   // friend is receiver
         } else {
            return c.senderId;     // friend is sender
         }
      });

      return res.status(200).json({
         message: "success",
         friends
      });

   } catch (e) {
      return res.status(500).json({
         message: "Server Error in getting your friends"
      });
   }
};

// pending requests
export const pendingConnectionRequests = async (req, res) => {
   try {

      const me = req.user;

      if (!me._id) {
         return res.status(400).json({
            message: "Please login"
         })
      }

      const pendingConnections = await ConnectionModel.find({
         $or: [
            {status: "like", senderId: me._id},
            {status: "like", receiverId: me._id}
         ]
      }).populate({
         path  : "senderId",
         select: SAFE_DATA_STRING
      }).populate({
         path  : "receiverId",
         select: SAFE_DATA_STRING
      });


      const requestsPending = pendingConnections.map((p) => {
         return p.senderId._id.toString() === me._id.toString() ? p.receiverId : p.senderId
      })

      res.status(200).json({
         requestsPending,

      })
   } catch (e) {
      return res.status(500).json({
         message: "Server Error"
      })
   }
}

export const core = async (req, res) => {
   try {
      const me = req.user;

      // leave me,my friends, whom i recieved/send requests

      const myConnections = await ConnectionModel.find({
         $or: [
            {senderId: me._id,},
            {receiverId: me._id,}
         ]
      })



      const meId = me._id.toString();
      const connectionSet = new Set();

      myConnections.forEach(conn => {
         const senderId = conn.senderId._id.toString();
         const receiverId = conn.receiverId._id.toString();

         if (senderId !== meId) connectionSet.add(senderId);
         if (receiverId !== meId) connectionSet.add(receiverId);
      });

      const uniqueConnectionsIds = Array.from(connectionSet);

      // whole world connection - me -myuniqueconnections

      const remainingUsers=await User.find(
         {$and:[
               {_id: {$nin: uniqueConnectionsIds}},
               {_id: {$ne: me._id}}
            ]}
      ).select(SAFE_DATA_STRING)


      return res.status(200).json({
         message   : "success",
         not_to_add: uniqueConnectionsIds,
         meId,
         remainingUsers
      });

   } catch (e) {
      return res.status(500).json({
         message: `Server Error ${e}`
      })
   }
};
