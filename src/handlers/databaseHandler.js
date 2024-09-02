const mongoose = require('mongoose');
const chalk = require('chalk');
const moment = require('moment');
const cron = require('node-cron');
const Participation = require('../models/participationModal');
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

async function Main() {
    mongoose.connect('mongodb+srv://tsunami-sushi:2mT9cgjNuzu0Jj3Y@k1e.ev7xh.mongodb.net/', {
        dbName: 'glisten'
    })
}

Main().then(
    console.log(`${chalk.hex('#9B59B6')(`[${moment().format('MMMM Do YYYY, h:mm:ss a')}]`)} ${chalk.hex('#f6a9d3')(`[glisten.]`)} ${chalk.hex('#3498DB')(`[DatabaseHandler]`)} ${chalk.hex('#2ECC71')(`[Connected]`)} ${chalk.hex('#979C9F')(`Successfully connected to the database`)}`)
).catch((err) => {
    console.log(chalk.red('An error occurred while connecting to the database:'));
    console.log(chalk.red(err));
});