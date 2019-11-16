const discord = require ('discord.js');

const ms = require ("ms");

var bot = new discord.Client();

const token = "NjQ1MDg5MzU3MTUzMTczNTQ0.Xc9g8w.e6NPrjUNhF7aUsqJ1t8KnopX68g";

const PREFIX = "+";

var version = "1.0.1";

bot.on ("ready", () => {
    console.log("ready!");

    bot.user.setGame ("Welcome!");
});

bot.on("guildMemberAdd", member =>{

    const schannel = member.guild.channels.find(channel => channel.name === "doorway")
    if(!schannel) return;

    const embed = new discord.RichEmbed()
    .setTitle("Welcome!")
    .setDescription(`Welcome ${member} to the server!`)
    .setThumbnail(member.avatarURL)
    .setColor(0xA8E14A)
    schannel.sendEmbed(embed);

    const role = member.guild.roles.find(role => role.name === 'Guest');
    member.addRole(role);

})

bot.on("guildMemberRemove", member =>{

    const schannel = member.guild.channels.find(channel => channel.name === "doorway")
    if(!schannel) return;

    const embed = new discord.RichEmbed()
    .setTitle("Goodbye")
    .setDescription(`Goodbye ${member} we will be sad to see you go`)
    .setThumbnail(member.avatarURL)
    .setColor(0xE1514A)
    schannel.sendEmbed(embed);
})

bot.on ("message", message=> {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[[0]]){
        case 'mute':
            if (message.member.hasPermission('BAN_MEMBERS')) {
                var person  = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
                if(!person) return  message.reply("I cant find the user " + person)
    
                let mainrole = message.guild.roles.find(role => role.name === "Guest");
                let role = message.guild.roles.find(role => role.name === "Muted");
            
    
                if(!role) return message.reply("Couldn't find the mute role.")
    
    
                let time = args[2];
                if(!time){
                    return message.reply("You didnt specify a time!");
                }
    
                person.removeRole(mainrole.id)
                person.addRole(role.id);
    
    
                message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
    
                setTimeout(function(){
                
                    person.addRole(mainrole.id)
                    person.removeRole(role.id);
                    console.log(role.id)
                    message.channel.send(`@${person.user.tag} has been unmuted.`)
            }, ms(time)); 
        }
    
        break;
        case "kick":
            if (message.member.hasPermission('BAN_MEMBERS')) {

                const user = message.mentions.users.first();

                if(user){
                    const member = message.guild.member(user);

                    if(member){
                        member.kick("BEGONE").then(() =>{
                            message.reply(`Sucessfully kicked ${user.tag}`);
                        }).catch(err =>{
                            message.reply("I was not able to kick this meember")
                        })
                        
                    } else {
                        message.reply("That user is not in this server")
                    }
                } else {
                    message.reply("you need to specify a person")
                }
            }

        break;
        case "ban":
            if (message.member.hasPermission('BAN_MEMBERS')) {

                const user = message.mentions.users.first();

                if(user){
                    const member = message.guild.member(user);

                    if(member){
                        member.ban({ression: "smh, just go away"}).then(() => {
                            message.reply(`Banned the user ${user.tag}`)
                        })
                    } else {
                        message.reply("That user is not in this server")
                    }
                } else {
                    message.reply("you need to specify a person")
                }
            }

        break;
        case "info":
            const embed = new discord.RichEmbed()
            .setTitle("Information")
            .addField("Creator", "MasterMeep6515#1302")
            .addField("Version", version)
            .addField("Current Server", message.guild.name)
            .setColor(0x4AD3E1)
            message.channel.sendEmbed(embed);

        break;

    }
});
bot.login (process.env.BOT_TOKEN);
