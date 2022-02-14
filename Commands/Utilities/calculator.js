const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { Calculator } = require("slash-calculator");

module.exports = {
    name: "calculator",
    description: "Its literally a fucking calculator.",
    usage: "/calculator",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, err) {
        await Calculator({
            interaction: interaction,
            embed: {
                title: "Mint-Chans Thonkin Machine",
                color: "GREEN",
                footer: "Beep Boop",
                timestamp: true
            },
            disabledQuery: "Bye Byeeeee!~",
            invalidQuery: "The equation is wrong dumbass~",
            othersMessage: "Fuck you, <@{{author}}> is using the buttons rn!"
        });
    }
}