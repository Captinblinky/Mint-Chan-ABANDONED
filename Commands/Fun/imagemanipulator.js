const { CommandInteraction, MessageAttachment } = require("discord.js");
const { Canvas } = require("canvacord");

module.exports = {
    name: "imagemanipulator",
    description: "Alters Images.",
    permission: "ATTACH_FILES",
    options: [{
            name: "target",
            description: "Select a target",
            type: "USER",
            required: true
        },
        {
            name: "image",
            description: "Select the type of image filter.",
            type: "STRING",
            required: true,
            choices: [{
                    name: "rip",
                    value: "rip"
                },
                {
                    name: "trash",
                    value: "trash"
                },
                {
                    name: "rainbow",
                    value: "rainbow"
                },
                {
                    name: "sepia",
                    value: "sepia"
                },
                {
                    name: "shit",
                    value: "shit"
                },
                {
                    name: "slap",
                    value: "slap"
                },
                {
                    name: "spank",
                    value: "spank"
                },
                {
                    name: "triggered",
                    value: "triggered"
                },
                {
                    name: "wanted",
                    value: "wanted"
                },
                {
                    name: "wasted",
                    value: "wasted"
                },
                {
                    name: "hitler",
                    value: "hitler"
                },
                {
                    name: "kiss",
                    value: "kiss"
                },
                {
                    name: "jokeOverHead",
                    value: "jokeOverHead"
                },
                {
                    name: "beautiful",
                    value: "beautiful"
                },
                {
                    name: "affect",
                    value: "affect"
                },
                {
                    name: "facepalm",
                    value: "facepalm"
                },
            ],
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction
        const target = options.getMember("target");
        const choices = interaction.options.getString("image");

        switch (choices) {
            case "rip":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.rip(avatar);
                    const attachment = new MessageAttachment(image, "rip.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "trash":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.trash(avatar);
                    const attachment = new MessageAttachment(image, "trash.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "rainbow":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.rainbow(avatar);
                    const attachment = new MessageAttachment(image, "rainbow.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "sepia":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.sepia(avatar);
                    const attachment = new MessageAttachment(image, "sepia.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "shit":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.shit(avatar);
                    const attachment = new MessageAttachment(image, "shit.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "slap":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.slap(interaction.user.displayAvatarURL({ format: "png" }), avatar);
                    const attachment = new MessageAttachment(image, "slap.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "spank":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.spank(interaction.user.displayAvatarURL({ format: "png" }), avatar);
                    const attachment = new MessageAttachment(image, "spank.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "triggered":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.trigger(avatar);
                    const attachment = new MessageAttachment(image, "trigger.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "wanted":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.wanted(avatar);
                    const attachment = new MessageAttachment(image, "wanted.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "wasted":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.wasted(avatar);
                    const attachment = new MessageAttachment(image, "wasted.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "hitler":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.hitler(avatar);
                    const attachment = new MessageAttachment(image, "hitler.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "kiss":
                {
                    const targetavatar = target.displayAvatarURL({ format: 'png' });
                    const calleravatar = interaction.user.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.kiss(calleravatar, targetavatar);
                    const attachment = new MessageAttachment(image, "kiss.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "jokeOverHead":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.jokeOverHead(avatar);
                    const attachment = new MessageAttachment(image, "jokeOverHead.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "affect":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.affect(avatar);
                    const attachment = new MessageAttachment(image, "affect.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "beautiful":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.beautiful(avatar);
                    const attachment = new MessageAttachment(image, "beautiful.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
            case "facepalm":
                {
                    const avatar = target.displayAvatarURL({ format: 'png' });
                    const image = await Canvas.facepalm(avatar);
                    const attachment = new MessageAttachment(image, "facepalm.gif");
                    interaction.reply({ files: [attachment] });
                }
                break;
        };
    }
};