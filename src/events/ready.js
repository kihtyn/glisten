const { REST } = require("@discordjs/rest");
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { Routes } = require("discord-api-types/v10");
const config = require("../config.json");
const cron = require('node-cron');
const Participation = require('../models/participationModal');

module.exports = async (client) => {
    console.log(`${client.user.tag} Bot Online!`)
    client.user.setPresence({ activities: [{ name: 'kihtyn code me...', type: ActivityType.Watching }], status: "idle"});

    const schedule = '0 18 * * 5';

    cron.schedule(schedule, async () => {
        try {
            const data = await Participation.find({}).sort({ count: -1 });
            
            const databaseDumpEmbed = new EmbedBuilder()
                .setDescription(`**Knock knock.. Who's there?\n-# Requirement reset day...**\n${data.map((entry, index) => `${index + 1}. **${entry.username}** - ${entry.count} sessions`).join('\n')}`)
                .setColor(config.colours.default)
                .setFooter({ text: `${config.bot_name}`, iconURL: client.user.avatarURL() })
                .setTimestamp();

            const guild = await client.guilds.fetch('1267227636321489018');
            const channel = await guild.channels.fetch('1276623580972584980');

            channel.send({ embeds: [databaseDumpEmbed] });

            const result = await Participation.deleteMany({});

        } catch (err) {
            console.log(chalk.red('An error occurred while running the cron job:'));
            console.log(chalk.red(err));
        }
    })

    const rest = new REST({
        version: "10"
    }).setToken(config.bot_config.token);
    (async () => {
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: await client.commands,
            });
            console.log("Successfully loaded application [/] commands.");
            require('../handlers/databaseHandler')    
        } catch (e) {
            console.log("Failed to load application [/] commands. " + e);
        }
    })();
}