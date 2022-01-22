const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
require("dotenv").config()
const prefix = botSettings.prefix;

const bot = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});
bot.commands = new Discord.Collection();

fs.readdir("./cmds/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("No commands to load.");
        return;
    }
    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async() => {
    console.log(`Logged in as ${bot.user.tag} and ready to game~`);

    /* try {
         let link = await bot.generateInvite(["ADMINISTRATOR"]);
         console.log(`Link for bot: ${link}`);
     } catch (e) {
         console.log(e.stack);
     }*/
});

bot.on("messageCreate", (message) => {
    if (message.author.bot) return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);

});

bot.login(process.env.TOKEN);