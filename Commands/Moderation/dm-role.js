const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const { create } = require("sourcebin")

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

module.exports = {
    name: "dm-role",
    description: "Message a user if they have a certain role.",
    permission: "ADMINISTRATOR",
    options: [{
            name: "role",
            description: "Mention the role.",
            type: "ROLE",
            required: true,
        },
        {
            name: "message",
            description: "Provide the message you want the bot to send.",
            type: "STRING",
            required: true,
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const role = interaction.options.getRole('role');
        const message = interaction.options.getString("message");

        const members = interaction.guild.roles.cache.get(role.id).members
        let memberIds = members.map(m => m.id);

        if (memberIds.length == 0)
            return interaction.reply({ embeds: [new MessageEmbed().setColor("GREEN").setDescription(`I couldn't find anyone with the ${role} role, so I did not attempt to DM anyone.`)], ephemeral: true })


        const Embed = new MessageEmbed().setColor("GREEN")

        var successfulMembers = 0
        var successfulMembersList = []
        var failedMembers = 0
        var failedMembersList = []

        await interaction.reply({ embeds: [new MessageEmbed().setColor("GREEN").setDescription(`**Sending dm to all users with the role ${role}**.\n\n> Successful DMs: ${successfulMembers}\n\n> Failed DMs: ${failedMembers}\n\n> Latest member: *DMs will start going out in 5 seconds.*`)], fetchReply: true })

        await delay(5000) //This waits 5 seconds before attempting to DM any members. If you want to change it it is in milliseconds so 5000 = 5 seconds.

        for (var i = 0; i < memberIds.length; i++) {
            var member = client.users.cache.get(memberIds[i]);

            try {
                var sendMessage = await member.send({ embeds: [new MessageEmbed().setColor("GREEN").setTitle("New Mail Has Arrived! 📨").setDescription(`${message}`).addFields({ name: "Guild", value: `${interaction.guild.name}`, inline: true }, { name: "Role", value: `${role.name}`, inline: true }, { name: "Message Sender", value: `${interaction.member}`, inline: true }).setFooter({ text: "You are recieving this because you picked a role to Opt-In to Minty's Mass Messaging Service! To Opt-Out, please visit the roles menu for the appropriate server this DM came from." })] })
                successfulMembers += 1
                successfulMembersList.push(member)
            } catch (error) {
                failedMembers += 1
                failedMembersList.push(member)
            }

            interaction.editReply({ embeds: [Embed.setDescription(`**Sending dm to all users with the role ${role}**\n\n> Successful DMs: ${successfulMembers}\n\n> Failed DMs: ${failedMembers}\n\n> Latest member: ${member}`)] })

            await delay(3000) //This waits 3 seconds before DMing the next member. If you want to change it it is in milliseconds so 3000 = 3 seconds.
        }
        const failedMembersMapped = failedMembersList.map((m) => m).join(", ") || "None";
        const successfulMembersMapped = successfulMembersList.map((m) => m).join(", ") || "None"

        var failedMembersMessage = failedMembersMapped
        var successfulMembersMessage = successfulMembersMapped

        if (failedMembersMapped.length > 1024) {
            const failedMembersSourcebin = await create([{ name: "failedMembers", content: failedMembersMapped }])
            failedMembersMessage = failedMembersSourcebin.url
        }

        if (successfulMembersMapped.length > 1024) {
            const successfulMembersSourcebin = await create([{ name: "successfulMembers", content: successfulMembersMapped }])
            successfulMembersMessage = successfulMembersSourcebin.url
        }

        interaction.editReply({ content: `${interaction.member}`, embeds: [Embed.setDescription(`**Finished sending dm to all users with the role ${role}**`).addFields({ name: "Successful DMs", value: `${successfulMembers}` }, { name: "Failed DMs", value: `${failedMembers}`, inline: true }, { name: "Successful members", value: `${successfulMembersMessage}` }, { name: "Failed members", value: `${failedMembersMessage}` })] })
    },
};