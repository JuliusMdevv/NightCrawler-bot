const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setPresence({
            activities: [
                {
                    name: "the Dohm Empire",
                    type: 1,
                    url: 'https://twitch.tv/firstinspires'
                },
            ],
        });
        console.log(`${client.user.username} is ready!`);
    },
};