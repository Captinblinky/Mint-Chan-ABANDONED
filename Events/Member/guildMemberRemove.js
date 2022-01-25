const { MessageEmbed, WebhookClient, GuildMember, Message } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;
        const Logger = new WebhookClient({
            id: "935404000537374741",
            token: "C8QyN4Ebtq_Q9aIPcpjsQ2DiFG7PfG2pH4iM95LsL-gsca5p8kMSXaBt_tbdVEZEthtK"
        });


        const Welcome = new MessageEmbed()
            .setColor("GREEN")
            .setThumbnail(user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            ${member} has left the server.\n
            Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:R>\nLatest Member Count: **${guild.memberCount}**`)

        Logger.send({ embeds: [Welcome] })
    }
}