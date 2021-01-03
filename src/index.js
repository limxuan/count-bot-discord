const { Collection, Client, Discord } = require('discord.js');
const client = new Client({
    disableEveryone: true
})

const mongoose  = require('mongoose')
mongoose.connect(require('./config.json').mongo, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(console.log('Connected to mongo db!'));

const path = require('path')
const fs = require('fs')
const config = require('./config.json');
module.exports = client;
client.commands = new Collection();
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));
["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
}); 

client.login(config.token);