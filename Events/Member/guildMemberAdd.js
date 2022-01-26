const { MessageEmbed, WebhookClient, GuildMember, Message } = require("discord.js");
const { WebhookToken, WebhookID } = require("../../Structures/config.json");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;
        const Welcomer = new WebhookClient({
            id: WebhookID,
            token: WebhookToken
        });

        const Welcome = new MessageEmbed()
            .setColor("GREEN")
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            Welcome ${member} to **${guild.name}**!\n
            Account Created: <t:${parseInt(user.createdTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)

        Welcomer.send({ embeds: [Welcome] })
    }
}