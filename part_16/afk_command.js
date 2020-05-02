// NOTE:
// The following code is a part of the <client>.on('message') event:
// Modules required: quick.db (latest) and Discord.js (v12)

const Discord = require('discord.js'), db = require('quick.db');

let afk = new db.table("AFKs"),
      authorStatus = await afk.fetch(message.author.id),
      mentioned = message.mentions.members.first();
  
  if (mentioned) {
    let status = await afk.fetch(mentioned.id);
    
    if (status) {
      const embed = new Discord.MessageEmbed()
      .setColor(0xffffff)
      .setDescription(`This user (${mentioned.user.tag}) is AFK: **${status}**`)
      message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    }
  }
  
  if (authorStatus) {
    const embed = new Discord.MessageEmbed()
    .setColor(0xffffff)
    .setDescription(`**${message.author.tag}** is no longer AFK.`)
    message.channel.send(embed).then(i => i.delete({timeout: 5000}));
    afk.delete(message.author.id)
  }
  
// NOTE:
// The following code is a command:

const Discord = require('discord.js'), db = require('quick.db');
const status = new db.table("AFKs");
let afk = await status.fetch(message.author.id);
const embed = new Discord.MessageEmbed().setColor(0xffffff)
    
  if (!afk) {
    embed.setDescription(`**${message.author.tag}** now AFK.`)
    embed.setFooter(`Reason: ${args.join(" ") ? args.join(" ") : "AFK"}`)
    status.set(message.author.id, args.join(" ") || `AFK`);
  } else {
    embed.setDescription("You are no longer AFK.");
    status.delete(message.author.id);
  }
    
  message.channel.send(embed)
