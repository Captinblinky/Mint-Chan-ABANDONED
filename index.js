//const botSettings = require("./botsettings.json");
//const fs = require("fs");
//const prefix = botSettings.prefix;
const Discord = require("discord.js");
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_VOICE_STATES"
    ]
});

let bot = {
    client,
    prefix: "m.",
    owners: ["814996982967566367"]
}

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot

// fs.readdir("./cmds/", (err, files) => {
//     if (err) console.error(err);

//     let jsfiles = files.filter(f => f.split(".").pop() === "js");
//     if (jsfiles.length <= 0) {
//         console.log("No commands to load.");
//         return;
//     }
//     console.log(`Loading ${jsfiles.length} commands!`);

//     jsfiles.forEach((f, i) => {
//         let props = require(`./cmds/${f}`);
//         console.log(`${i + 1}: ${f} loaded`);
//         bot.commands.set(props.help.name, props);
//     });
// });

// bot.on("ready", async() => {
//     console.log(`Logged in as ${bot.user.tag} and ready to game~`);

//     /* try {
//          let link = await bot.generateInvite(["ADMINISTRATOR"]);
//          console.log(`Link for bot: ${link}`);
//      } catch (e) {
//          console.log(e.stack);
//      }*/
// });

// bot.on("messageCreate", (message) => {
//     if (message.author.bot) return;

//     let messageArray = message.content.split(" ");
//     let command = messageArray[0];
//     let args = messageArray.slice(1);

//     let cmd = bot.commands.get(command.slice(prefix.length));
//     if (cmd) cmd.run(bot, message, args);

// });

client.login(process.env.TOKEN);