const { CommandInteraction, Client, MessageEmbed, Guild } = require('discord.js');

module.exports = {
    name: "music",
    category: "info",
    aliases: ["skip", "pause", "resume", "stop", "play"]
    run: async({ client, message, args, cmdstr }) => {

        const voiceChannel = member.voice.channel;

        if (!voiceChannel) {
            return message.reply("Must be in a voice channel");
        }

        if (Guild.me.voice.channelId && voiceChannel.id !== Guild.me.voice.channelId) {
            return message.reply("I am already in a voice channel")
        }

        try {
            switch (cmdstr) {
                case "play":
                    (
                        client.distube.playVoiceChannel(voiceChannel, )
                    )
            }
        } catch (e) {
            message.reply("Error Hours");
        }
    }
}