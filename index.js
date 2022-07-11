const Discord = require("discord.js")
require("dotenv").config()

//const TOKEN = "abdcd"

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "Teste"){
        message.reply("Memes")
    }
})

//client.login(TOKEN)
client.login(process.env.TOKEN)