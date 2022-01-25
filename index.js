const Discord = require("discord.js");
require("dotenv").config()
const { Distube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");


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

client.Distube = new Distube(client, {
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin()]
});

module.exports = client;

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);

module.exports = bot

client.login(process.env.TOKEN);