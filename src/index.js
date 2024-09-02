const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});


module.exports = client;

fs.readdir("./events", (_err, files) => {
  files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      console.log(`Loaded Event: ${eventName}`);
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = [];

fs.readdir("./commands", (err, files) => {
  if (err) throw err;
  files.forEach(async (f) => {
      try {
          let props = require(`./commands/${f}`);
          client.commands.push({
              name: props.name,
              description: props.description,
              options: props.options
          });
          console.log(`Loaded command: ${props.name}`);
      } catch (err) {
          console.log(err);
      }
  });
});

client.login(config.bot_config.token).catch(e => {
  console.log("The Bot Token You Entered Into Your Project Is Incorrect Or Your Bot's INTENTS Are OFF!")
})