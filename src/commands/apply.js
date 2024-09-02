const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, Events, Client, makePlainError } = require('discord.js');
const config = require('../config.json');
const Participation = require('../models/participationModal');
const client = require('..');

module.exports = {
    name: "apply",
    description: "application module",
    options: [
        {
            name: "role",
            description: 'the role you\`re applying for',
            type: 3, 
            required: true,
            choices: [
                {
                    name: "Intern Moderator",
                    value: "int_mod_position"
                },
                {
                    name: "MR Position",
                    value: "mr_position"
                }
            ]
        }
    ],
    
    run: async (client, interaction) => {

        let guildMainId = '1267227636321489018';
        let loggingChannelId = '1276623580972584980';

        const role = interaction.options.getString('role');
        if (role === 'int_mod_position') {
            const deniedEmbed = new EmbedBuilder()
                .setDescription(`${config.emojis.no} Applications for Intern Moderator are currently closed.`)
                .setColor(config.colours.error);

            interaction.reply({ ephemeral: true, embeds: [deniedEmbed] });
        //     const applyModal1 = new ModalBuilder()
        //         .setCustomId('int_mod_apply_modal')
        //         .setTitle('Intern Moderator Application | Part 1')
            
        //     const QuestionInput1 = new TextInputBuilder()
        //         .setCustomId('1st_question_input')
        //         .setPlaceholder('kihtyn')
        //         .setLabel('What is your Roblox username?')
        //         .setStyle(TextInputStyle.Short)
        //         .setRequired(true);

        //     const QuestionInput2 = new TextInputBuilder()
        //         .setCustomId('2nd_question_input')
        //         .setLabel('Are you at least 13 years of age?')
        //         .setStyle(TextInputStyle.Short)
        //         .setRequired(true);

        //     const QuestionInput3 = new TextInputBuilder()
        //         .setCustomId('3rd_question_input')
        //         .setLabel('Why are you interested in the team?')
        //         .setStyle(TextInputStyle.Paragraph)
        //         .setRequired(true);

        //     const QuestionInput4 = new TextInputBuilder()
        //         .setCustomId('4th_question_input')
        //         .setLabel('Why are you a good fit for the team?')
        //         .setStyle(TextInputStyle.Paragraph)
        //         .setRequired(true);
            
        //     const QuestionInput5 = new TextInputBuilder()
        //         .setCustomId('5th_question_input')
        //         .setLabel('Do you have any prior Moderation experience?')
        //         .setStyle(TextInputStyle.Paragraph)
        //         .setRequired(true);

        //     const QuestionInput6 = new TextInputBuilder()
        //         .setCustomId('6th_question_input')
        //         .setLabel('If yes to ^, please explain your experience.')
        //         .setStyle(TextInputStyle.Paragraph)
        //         .setRequired(false);

        //     const QuestionInput7 = new TextInputBuilder()
        //         .setCustomId('7th_question_input')
        //         .setLabel('What do you do if you see someone slurring?')
        //         .setStyle(TextInputStyle.Paragraph)
        //         .setRequired(true);
            
        //     const QuestionInput8 = new TextInputBuilder()
        //         .setCustomId('8th_question_input')
        //         .setLabel('If you saw commands in #community?')
        //         .setStyle(TextInputStyle.Paragraph)
        //         .setRequired(true);
            
        //     const QuestionInput9 = new TextInputBuilder()
        //         .setCustomId('9th_question_input')
        //         .setLabel('What would you do if you saw spammers?')
        //         .setStyle(TextInputStyle.Paragraph)
        //         .setRequired(true);

        //     const Question1ActionRow = new ActionRowBuilder().addComponents(QuestionInput1)
        //     const Question2ActionRow = new ActionRowBuilder().addComponents(QuestionInput2)
        //     const Question3ActionRow = new ActionRowBuilder().addComponents(QuestionInput3)
        //     const Question4ActionRow = new ActionRowBuilder().addComponents(QuestionInput4)
        //     const Question5ActionRow = new ActionRowBuilder().addComponents(QuestionInput5)

        //     applyModal1.addComponents(Question1ActionRow, Question2ActionRow, Question3ActionRow, Question4ActionRow, Question5ActionRow);
        //     await interaction.showModal(applyModal1);

        //     client.on(Events.InteractionCreate, async interaction => {
        //         if (!interaction.isModalSubmit()) return;
        //         let answer1 = interaction.fields.getTextInputValue('1st_question_input');
        //         let answer2 = interaction.fields.getTextInputValue('2nd_question_input');
        //         let answer3 = interaction.fields.getTextInputValue('3rd_question_input');
        //         let answer4 = interaction.fields.getTextInputValue('4th_question_input');
        //         let answer5 = interaction.fields.getTextInputValue('5th_question_input');

        //         console.log(answer1, answer2, answer3, answer4, answer5);

        //         const successEmbed = new EmbedBuilder()
        //         .setDescription(`${config.emojis.yes} Your application has been submitted - good luck!`)
        //         .setColor(config.colours.success);

        //         interaction.reply({ ephemeral: true, embeds: [successEmbed] });

        //         const guild = await client.guilds.fetch(guildMainId);
        //         const channel = await guild.channels.fetch(loggingChannelId);

        //         const applicationEmbed = new EmbedBuilder()
        //             .setTitle('Intern Moderator Application')
        //             .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
        //             .addFields({ name: 'Roblox Username', value: answer1, inline: true })
        //             .addFields({ name: '13+', value: answer2, inline: true })
        //             .addFields({ name: 'Interest', value: answer3, inline: false })
        //             .addFields({ name: 'Fit', value: answer4, inline: false })
        //             .addFields({ name: 'Experience', value: answer5, inline: false })
        //             .setColor(config.colours.default)
        //             .setFooter({ text: `${config.bot_name}`, iconURL: client.user.avatarURL() })
        //             .setTimestamp();
                
        //         channel.send({ embeds: [applicationEmbed] });
        //     });
        // }
    } else if (role === 'mr_position') {
            const applyModal1 = new ModalBuilder()
                .setCustomId('int_mod_apply_modal')
                .setTitle('Intern Moderator Application | Part 1')
            
            const QuestionInput1 = new TextInputBuilder()
                .setCustomId('1st_question_input')
                .setLabel('Why are you applying for SI?')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);
            
            const QuestionInput2 = new TextInputBuilder()
                .setCustomId('2nd_question_input')
                .setLabel('What makes you different?')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);
            
            const QuestionInput3 = new TextInputBuilder()
                .setCustomId('3rd_question_input')
                .setLabel('Any experience? If so, where & elaborate!')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);
            
            const QuestionInput4 = new TextInputBuilder()
                .setCustomId('4th_question_input')
                .setLabel('Do you have safechat?')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);
            
            const QuestionInput5 = new TextInputBuilder()
                .setCustomId('5th_question_input')
                .setLabel('What is your timezone?')
                .setStyle(TextInputStyle.Short)
                .setRequired(true);
            
            const Question1ActionRow = new ActionRowBuilder().addComponents(QuestionInput1)
            const Question2ActionRow = new ActionRowBuilder().addComponents(QuestionInput2)
            const Question3ActionRow = new ActionRowBuilder().addComponents(QuestionInput3)
            const Question4ActionRow = new ActionRowBuilder().addComponents(QuestionInput4)
            const Question5ActionRow = new ActionRowBuilder().addComponents(QuestionInput5)

            applyModal1.addComponents(Question1ActionRow, Question2ActionRow, Question3ActionRow, Question4ActionRow, Question5ActionRow);
            await interaction.showModal(applyModal1);

            client.on(Events.InteractionCreate, async interaction => {
                if (!interaction.isModalSubmit()) return;
                let answer1 = interaction.fields.getTextInputValue('1st_question_input');
                let answer2 = interaction.fields.getTextInputValue('2nd_question_input');
                let answer3 = interaction.fields.getTextInputValue('3rd_question_input');
                let answer4 = interaction.fields.getTextInputValue('4th_question_input');
                let answer5 = interaction.fields.getTextInputValue('5th_question_input');

                console.log(answer1, answer2, answer3, answer4, answer5);

                const successEmbed = new EmbedBuilder()
                .setDescription(`${config.emojis.yes} Your application has been submitted - good luck!`)
                .setColor(config.colours.success);

                interaction.reply({ ephemeral: true, embeds: [successEmbed] });

                const guild = await client.guilds.fetch(guildMainId);
                const channel = await guild.channels.fetch(loggingChannelId);

                const applicationEmbed = new EmbedBuilder()
                    .setTitle('MR Application')
                    .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
                    .addFields({ name: 'Roblox Username', value: 'Soon', inline: true })
                    .addFields({ name: 'Why are you applying for Staff Intern?', value: answer1, inline: true })
                    .addFields({ name: 'What makes you different from other applicants?', value: answer2, inline: false })
                    .addFields({ name: 'Any experience? If so, elaborate!', value: answer3, inline: false })
                    .addFields({ name: 'Safechat', value: answer4, inline: false })
                    .addFields({ name: 'Timezone', value: answer5, inline: false })
                    .setColor(config.colours.default)
                    .setFooter({ text: `${config.bot_name}`, iconURL: client.user.avatarURL() })
                    .setTimestamp();
                
                channel.send({ embeds: [applicationEmbed] });
            });
        }
    }
};