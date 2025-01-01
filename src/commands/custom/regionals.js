const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
//const { dataV } = require('../../utils/sheetData');

async function fetchSheetData(sheetTab, range) {
    return require("../../utils/sheetData")(sheetTab, range);
}
    // const sheetTab = 
    // ["WEEK 1 - Canadian Pacific",
    // "WEEK 2 - Ventura County Regional", 
    // "WEEK 3 - Magnolia Regional", 
    // "WEEK 4 - SAN DIEGO REGIONAL", 
    // "WEEK 5 - Greater Kansas City Regional", 
    // "WEEK 6 - Bayou Regional"];

    const regionals = {
        "Canadian-Pacific": { sheetTab: "WEEK 1 - Canadian Pacific", range: "B7:B16" },
        "Ventura": { sheetTab: "WEEK 2 - Ventura County Regional", range: "C7:C16" },
        "Magnolia": { sheetTab: "WEEK 3 - Magnolia Regional", range: "D7:D16" },
        "San-Diego": { sheetTab: "WEEK 4 - SAN DIEGO REGIONAL", range: "E7:E16" },
        "Kansas": { sheetTab: "WEEK 5 - Greater Kansas City Regional", range: "F7:F16" },
        "Bayou": { sheetTab: "WEEK 6 - Bayou Regional", range: "G7:G16" }
    };


module.exports = {
    category: "custom",
    data: new SlashCommandBuilder()
        .setName("regionals") // Adjusted name
        .setDescription("An example of getting Google Sheet data")
        .addStringOption(option =>
            option.setName('regional')
                .setDescription('Pick the regional you want info on')
                .setRequired(true)
                .addChoices(
                    ...Object.keys(regionals).map(key => ({ name: key, value: key })),
                ),
        ),



        
        async execute(interaction) {
            const selectedRegional = interaction.options.getString('regionals');
            const regionalData = regionals[selectedRegional];
            console.log(regionalData);
            console.log(regionals['Canadian-Pacific']);
            console.log(selectedRegional);
            console.log(interaction.options.data);
            console.log(`Selected Regional: ${selectedRegional}`);
            console.log(`Selected Regional: ${interaction.options.getString("regional")}`);
            const regionalInfo = await fetchSheetData(regionalData.sheetTab, regionalData.range);
            await interaction.reply({
                content: `Data for ${selectedRegional}: ${regionalInfo}`,
                ephemeral: true
            });
        }


}