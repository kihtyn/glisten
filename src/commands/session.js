const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, Events, Client, makePlainError } = require('discord.js');
const config = require('../config.json');
const Participation = require('../models/participationModal');
const client = require('..');
const noblox = require('noblox.js');
const axios = require('axios');

let sessionMessageId;

let guildMainId = '296064078240284683';
let loggingChannelId = '1038502352711331902';
let sessionNotifcationChannelId = '1039685086750187581';

module.exports = {
    name: "session",
    description: "session module",
    options: [
        {
            name: 'start',
            description: 'start a session',
            type: 1
        }, 
        {
            name: 'end',
            description: 'end a session',
            type: 1
        }
    ],
    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === 'start') {

            const { data } = await axios.get(`https://api.blox.link/v4/public/guilds/296064078240284683/discord-to-roblox/${interaction.user.id}`, 
                { headers: { "Authorization": "f77a1254-0e72-4f18-88c9-5252e0df7d7e" } }
            )

            console.log(data)

            const RobloxUserId = data.robloxID
            const robloxName = await noblox.getUsernameFromId(RobloxUserId);

            const sessionEmbed = new EmbedBuilder()
                .setTitle(`${config.bot_name} Session Notification`)
                .setAuthor({ name: `${robloxName}`, iconURL: `https://api.kiht.sh/users/${RobloxUserId}/avatar?color=true` })
                .setDescription(`A **regular** session is now being hosted at the homestore by **${interaction.user.tag}**. Come on down, check out some new clothes and chat with the community!`)
                .setColor(config.colours.default)
                .setFooter({ text: `${config.bot_name}`, iconURL: client.user.avatarURL() })
                .setTimestamp();

            const sessionButton = new ButtonBuilder()
                .setLabel("Join Session")
                .setStyle(ButtonStyle.Link)
                .setURL(`https://www.roblox.com/games/9908437954/glisten-Homestore`);

            const sessionActionRow = new ActionRowBuilder()
                .addComponents(sessionButton);

            const guild = await client.guilds.fetch(guildMainId);
            const channel = await guild.channels.fetch(sessionNotifcationChannelId);

            const sentMessage = await channel.send({ embeds: [sessionEmbed], components: [sessionActionRow] });
            sessionMessageId = sentMessage.id;

            interaction.reply({ content: `${config.emojis.yes} Oooh.. have a good session, ${interaction.user.tag}`, ephemeral: true });

        } else if (interaction.options.getSubcommand() === 'end') {
            const guild = await client.guilds.fetch(guildMainId);
            const channel = await guild.channels.fetch(sessionNotifcationChannelId);

            if (sessionMessageId) {
                const message = await channel.messages.fetch(sessionMessageId);
                await message.delete();

                const logModal = new ModalBuilder()
                    .setTitle("glisten. | Log Session Participants")
                    .setCustomId('log_session_participants');

                const usersInput = new TextInputBuilder()
                    .setCustomId('log_session_participants_users')
                    .setLabel('List the users which attended your session')
                    .setStyle(TextInputStyle.Short);

                const firstActionRow = new ActionRowBuilder().addComponents(usersInput);
                logModal.addComponents(firstActionRow);

                interaction.showModal(logModal);
            } else {
                const failEmbed = new EmbedBuilder()
                    .setDescription(`${config.emojis.no} There isn't an ongoing session!`)
                    .setColor(config.colours.error);

                interaction.reply({ embeds: [failEmbed], ephemeral: true });
            }
        }
    },
};

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'log_session_participants') {
            const guild = await client.guilds.fetch(guildMainId);
            const logChannel = await guild.channels.fetch(loggingChannelId);

            const usernamesInput = interaction.fields.getTextInputValue('log_session_participants_users');
            const usernamesArray = usernamesInput.split(',').map(username => username.trim()).filter(username => username.length > 0);

            for (const username of usernamesArray) {
                try {
                    const result = await Participation.findOneAndUpdate(
                        { username },
                        { $inc: { count: 1 } },
                        { upsert: true, new: true }
                    );

                    console.log(`Updated ${username}:`, result);
                } catch (error) {
                    console.error(`Error updating ${username}:`, error);
                }
            }

            const formattedUsernames = usernamesArray.map((username, index) => `${index + 1}. ${username}`).join('\n');

            const logEmbed = new EmbedBuilder()
                .setDescription(`**Session Participants\n-# From ${interaction.user}'s recent session**\n${formattedUsernames}`)
                .setColor(config.colours.default)
                .setFooter({ text: `${config.bot_name}`, iconURL: client.user.avatarURL() })
                .setTimestamp();

            logChannel.send({ embeds: [logEmbed] });

            const successEmbed = new EmbedBuilder()
            .setDescription(`${config.emojis.yes} Participants have been logged, hope you had a good session!`)
            .setColor(config.colours.success);

            interaction.reply({ ephemeral: true, embeds: [successEmbed] });
        }
    }
});