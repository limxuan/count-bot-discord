const client = require('../../src/index');

client.on('ready', () => {
    console.log(`${client.user.tag} is now online!`);
})