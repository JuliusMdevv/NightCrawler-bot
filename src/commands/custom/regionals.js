const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
//const { dataV } = require('../../utils/sheetData');

async function fetchSheetData(sheetTab, range) {
    return require("../../utils/sheetData")(sheetTab, range);
}



module.exports = {
    category: "custom",
    data: new SlashCommandBuilder()
        .setName("regionals") // Adjusted name
        .setDescription("An example of getting Google Sheet data"),

    async execute(interaction) {
        const canadaRegional = await fetchSheetData("WEEK 1 - Canadian Pacific", "B7:B16");
        interaction.reply({ content: `${canadaRegional}`, ephemeral: false }); // Ephemeral means only you see it
    },
};