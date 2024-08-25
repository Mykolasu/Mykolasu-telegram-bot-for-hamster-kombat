const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
const port = process.env.PORT || 8080;
const webAppUrl = "https://hamster-kombat-clone-cdgf.vercel.app";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
const app = express();

app.use(express.json());

//Enable CORS for all routes

app.use(cors());

// Listen for any kind of message. There are different kinds of
// messages.


const start = () => {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
  
    if (text === "/start") {
      await bot.sendMessage(
        chatId,
        "to start the game click on the button below",
        {
          reply_markup: {
            inline_keyboard: [[{ text: "Play", web_app: { url: webAppUrl } }]],
          },
        }
      );
    } else {
      await bot.sendMessage(chatId, "I don't understand you.");
    }
  }); 
}

start();


app.listen(port, () => console.log('server started on PORT' + PORT));