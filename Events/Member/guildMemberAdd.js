const { MessageEmbed, WebhookClient, GuildMember, Message } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     */
    execute(member) {
        const { user, guild } = member;
        member.roles.add("935402128812412929");
        const Welcomer = new WebhookClient({
            id: "935404000537374741",
            token: "C8QyN4Ebtq_Q9aIPcpjsQ2DiFG7PfG2pH4iM95LsL-gsca5p8kMSXaBt_tbdVEZEthtK"
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