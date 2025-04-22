require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

// Forcefully clean the token by removing any unwanted characters like "=" and trimming spaces
const token = process.env.DISCORD_TOKEN?.replace(/[^\w.-]/g, '').trim();

console.log("✅ TOKEN CLEAN:", JSON.stringify(token)); // Debugging - remove once you're done

const playRPS = require("./games/rps"); // Import the RPS game

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
    if (message.author.bot) return;  // Ignore bot messages

    if (message.content === "!hello") {
        message.reply("Hello there! 👋");
    } 
    else if (message.content.startsWith("!rps")) {
        playRPS(message); // Call the function from rps.js
    } 
    else if (message.content.startsWith("!laugh")) {
        const laughs = [
            "HAHAHAHAHAHAHAHAHA!!! 🤣😂",
            "MUAHAHAHAHAHA!!! 😈🔥",
            "KEKEKEKEKEKEKE!!! 😆😆",
            "WAHAHAHAHAHAHA!!! 🤪",
            "HOHOHOHOHO!!! 🎅 (wait...wrong laugh)",
            "NYAHAHAHAHA!!! 😹",
            "BWAHAHAHAHAHAHAHAHAHAHAHAHA!!! 😵‍💫"
        ];
        const randomLaugh = laughs[Math.floor(Math.random() * laughs.length)];
        message.reply(randomLaugh);
    }
    else if (message.content === "!help") { // Add the help command
        message.reply(`Here's what I can do:\n
        - **!hello**: I will greet you 👋
        - **!rps**: Start a game of Rock, Paper, Scissors ✊🖐✌
        - **!laugh**: Get a random laugh 😂
        - **!help**: Display this help message ❓`);
    }
});

// Log in with the cleaned token
client.login(token);
