import cron from 'node-cron';
import {sendMailToUser} from "./nodemailer.js";



const cronJobs=()=>{cron.schedule('* * * 7 *', () => {

  sendMailToUser({to:"umangjitsingh@gmail.com",subject:"hi from tinder",html:`<h1>hello</h1>`,text:"hello"}).then((r)=>console.log("message sent"))
});}


export default cronJobs;