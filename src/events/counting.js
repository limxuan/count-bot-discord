const client = require('../index');
const db = require('../schema/Guild');
const user = require("../schema/Users");
client.on('message', async(message) => {
    const data = await db.findOne({ id: message.guild.id });

    if(!data) return;

    if(message.channel.id !== data.Channel) return;
    console.log(typeof data.Current);
    console.log()
    if(parseInt(message.content) === data.Current + 1) {
        user.findOne({ id: message.author.id, Guild: message.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                data.Counts++;
            } else {
                data = new user({
                    id: message.author.id,
                    Guild: message.guild.id,
                    Counts: 1
                })
            }
            data.save();
        })
    
        data.Current = parseInt(message.content);
        data.save();
    } else message.delete();
})