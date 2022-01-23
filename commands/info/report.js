const { generateDependencyReport } = require('@discordjs/voice');

module.exports = {
    name: "report",
    run: async({ client, message, args }) => {
        console.log(generateDependencyReport());
    }
}