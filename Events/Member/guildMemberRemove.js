const { MessageEmbed, WebhookClient, GuildMember, Message } = require("discord.js");
const { WebhookID, WebhookToken } = require("../../Structures/config.json");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;
        const Leaver = new WebhookClient({
            id: WebhookID,
            token: WebhookToken
        });


        const Welcome = new MessageEmbed()
            .setColor("GREEN")
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            ${member} has left the server.\n
            Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)

        Leaver.send({ embeds: [Welcome] })
    }
}