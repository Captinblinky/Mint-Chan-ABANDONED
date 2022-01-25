const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Clears a sepcified number of messages from a channel or a target.",
    permission: "MANAGE_MESSAGES",
    options: [{
            name: "amount",
            description: "Select the amount of messages to delete from a channel or a targer.",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Select a target to clear their messages.",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options } = interaction;

        const Amount = options.getNumber("amount");
        const Target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
            .setColor("GREEN");

        if (Amount > 100 || Amount <= 0) {
            Response.setDescription(`😒 You stupid baka! you can't have an amount that exceeds 100 or is below 1. Sheesh.`);
            return interaction.reply({ embeds: [Response] });
        }

        if (Target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if (m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 There! Cleared ${messages.size} messages from the baka ${Target}.`);
                interaction.reply({ embeds: [Response] });
            })
        } else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 There! Cleared ${messages.size} messages from channel. :3`);
                interaction.reply({ embeds: [Response] });
            })
        }
    }
}