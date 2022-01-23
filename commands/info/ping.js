module.exports = {
    name: "ping",
    category: "info",
    aliases: ["p"],
    permissions: [],
    devOnly: false,
    run: async({ client, message, args, cmdstr }) => {
        if (cmdstr == "ping") {
            message.reply("pong!");
        }

        if (cmdstr == "p") {
            message.reply("pip!");
        }
    }
}