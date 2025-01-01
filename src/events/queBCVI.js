// const { Client } = require('discord.js');
// const axios = require('axios');
// const { API_KEY, TEAM_KEY, EVENT_KEY_CANADA } = require('../utils/blueAlliance.json');
// const { CHANNEL_ID } = require('../../config.json');

// // Discord bot setup
// const client = new Client({ intents: [] });

// // The Blue Alliance API setup
// const QUEUE_WARNING_MINUTES = 10; // Notify 10 minutes before a match

// // Helper function to fetch upcoming matches
// async function getUpcomingMatch() {
//     try {
//         const response = await axios.get(
//             `https://www.thebluealliance.com/api/v3/team/${TEAM_KEY}/event/${EVENT_KEY_CANADA}/matches`,
//             { headers: { 'X-TBA-Auth-Key': API_KEY } }
//         );
//         const matches = response.data;

//         // Find the next match without an actual_time (not played yet)
//         const now = Date.now() / 1000; // Current time in seconds
//         return matches.find(
//             (match) => match.comp_level === 'qm' && match.predicted_time && match.predicted_time > now
//         );
//     } catch (error) {
//         console.error('Error fetching match data:', error);
//         return null;
//     }
// }

// // Periodic check function
// async function checkQueueStatus() {
//     const upcomingMatch = await getUpcomingMatch();
//     if (!upcomingMatch) return;

//     const now = Date.now() / 1000; // Current time in seconds
//     const timeUntilMatch = upcomingMatch.predicted_time - now;

//     if (timeUntilMatch <= QUEUE_WARNING_MINUTES * 60 && timeUntilMatch > 0) {
//         // Notify Discord channel
//         const channel = client.channels.cache.get(CHANNEL_ID);
//         if (CHANNEL_ID) {
//             CHANNEL_ID.send(`🚨 Team 1622 is QUEUING for Match ${upcomingMatch.match_number} in the Canadian Pacific Regional!`);
//         }
//     }
// }








