const { SlashCommandBuilder } = require("discord.js");
const { createEmbed } = require("../../utils/embedBuilder");
//const { dataV } = require('../../utils/sheetData');

async function fetchSheetData(sheetTab, range) {
    return require("../../utils/sheetData")(sheetTab, range);
}


    const regionals = {
        "Canadian-Pacific": { sheetTab: "WEEK 1 - Canadian Pacific", range: "B7:B16", paidRange: "C7:C16" },
        "Ventura": { sheetTab: "WEEK 2 - Ventura County Regional", range: "B7:B19", paidRange: "C6:C19" },
        "Magnolia": { sheetTab: "WEEK 3 - Magnolia Regional", range: "B7:B16", paidRange: "C7:C16" },
        "San-Diego": { sheetTab: "WEEK 4 - SAN DIEGO REGIONAL", range: "B7:B49", paidRange: "C7:C49" },
        "Kansas": { sheetTab: "WEEK 5 - Greater Kansas City Regional", range: "B7:B18", paidRange: "C7:C18" },
        "Bayou": { sheetTab: "WEEK 6 - Bayou Regional", range: "B7:B18", paidRange: "C7:C18" }
    };

module.exports = {
    category: "custom",
    data: new SlashCommandBuilder()
        .setName("regional-info") // Adjusted name
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
            const selectedRegional = interaction.options.getString('regional');
            const regionalData = regionals[selectedRegional];
            //console.log(regionals[selectedRegional].range);

            const regionalInfo = await fetchSheetData(regionalData.sheetTab, regionalData.range);
            const formattedInfo = `${regionalInfo}`.replace(/,/g, '\n');


            const regionalPaid = await fetchSheetData(regionalData.sheetTab, regionalData.paidRange);
            const formattedPaid = `${regionalPaid}`.replace(/,/g, '\n');

            const regionalEmbed = createEmbed({
                    title: `Regional Info: ${selectedRegional}`,
                    description: "*This command is a spread-sheet reader.\n If some information is not correct it means\n Dohm has not updated the main spreadsheet.*\n \n **VENTURA IS CURRENTLY BROKEN/OFFSET**",
                    color: '#104547',
                    fields:[
                        {
                            name: "Attendee's",
                            value: formattedInfo,
                            inline: true,
                        },
                        {
                            name: "Paid?",
                            value: formattedPaid,
                            inline: true,
                        },
                    ],
                });

            await interaction.reply({
                embeds:[regionalEmbed],
                ephemeral: false
            });
        }
}