import cron from "node-cron";
import ChatModel from "../models/chat.model.js";

export function startMessageCleanupJob() {
  cron.schedule("0 4 * * *", async () => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    await ChatModel.updateMany(
       {},
       {
         $pull: {
           messages: {
             createdAt: { $lt: sevenDaysAgo }
           }
         }
       }
    );

    console.log("Old messages cleaned up successfully");
  });
}
