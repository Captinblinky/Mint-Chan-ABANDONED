const Discord = module.require("discord.js");

module.exports.run = async(bot, message, args) => {
    message.reply("Hello World")
}

module.exports.help = {
    name: "hi"
}