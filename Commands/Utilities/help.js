const { CommandInteraction, MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "help",
    description: "Help Command",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const { guild } = interaction;

        const Embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor({ name: guild.name }, { iconURL: guild.iconURL({ dynamic: true }) })
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields({
                name: "🎫 | Administrative Commands",
                value: [
                    `**- Clear:** Clears away a specified number of messages in general or from a particular user.`,
                    `**- DM-Role:** Sends out a DM to all users containing a sepcified role.`
                ].join("\n")
            }, {
                name: "🔧 | Utility Commands",
                value: [

                    `**- Help:** What you're reading right now, displays a list of available commands.`,
                    `**- Server Info:** Displays information about the particular server you're in.`,
                    `**- User Info:** Displays information about any given user. This is accessed by right clicking > Apps > Userinfo`,
                    `**- Discord-Together:** Starts an activity in the discord call, these activities can range from Youtube to Chess to Fishington.`,
                    `**- Music:** Plays, Stops, Skips and Queues music in the voice channel.`
                ].join("\n")
            }, {
                name: "🎉 | Fun Commands",
                value: [
                    `**- Image Manipulator:** Manipulates a users profile picture to be... something else.`
                ].join("\n")
            })
            .setFooter({ text: "Bot Made With Love By: Blinky#5897" }).setTimestamp();
        interaction.reply({ embeds: [Embed] })
    }
}