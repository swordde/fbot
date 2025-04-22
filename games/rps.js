// Game logic 
// games/rps.js
module.exports = function (message) {
  const choices = ["rock 🪨", "paper 📜", "scissors ✂️"];
  const botChoice = choices[Math.floor(Math.random() * choices.length)];

  // Get user choice
  const userChoice = message.content.split(" ")[1]?.toLowerCase();
  if (!userChoice || !["rock", "paper", "scissors"].includes(userChoice)) {
      return message.reply("Please choose `rock`, `paper`, or `scissors`.\nExample: `!rps rock`");
  }

  // Determine the winner
  let result = "";
  if (userChoice === "rock" && botChoice.includes("scissors") ||
      userChoice === "paper" && botChoice.includes("rock") ||
      userChoice === "scissors" && botChoice.includes("paper")) {
      result = "**You win! 🎉**";
  } else if (userChoice === botChoice.split(" ")[0]) {
      result = "**It's a tie! 🤝**";
  } else {
      result = "**I win! 😈**";
  }

  message.reply(`You chose **${userChoice}**, I chose **${botChoice}**.\n${result}`);
};
