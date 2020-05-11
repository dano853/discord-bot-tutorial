const Discord = require('discord.js');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
// What is partials?
// Partials allow you to receive events that contains uncached instances.
// When you restart your bot, any cache will be lost, and you wouldn't be able to get the previous content (.fetch())
// We're activate this to prevent any mistakes.

client.on("messageReactionAdd", async (reaction, user) => {
  // If a message gains a reaction and it is uncached, fetch and cache the message.
  // You should account for any errors while fetching, it could return API errors if the resource is missing.
  if (reaction.message.partial) await reaction.message.fetch(); // Partial messages do not contain any content so skip them.
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return; // If the user was a bot, return.
  if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.
  if (reaction.message.guild.id !== "520423098906968065") return; // Use this if your bot was only for one server/private server.
  
  if (reaction.message.channel.id === "708551760645587014") { // This is a #self-roles channel.
    if (reaction.emoji.name === "1️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("708554596817174559") // Minecraft role.
      return user.send("Minecraft role was given!").catch(() => console.log("Failed to send DM."));
    }
    
    if (reaction.emoji.name === "2️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.add("708554654409293894"); // Roblox role.
      return user.send("Roblox role was given!").catch(() => console.log("Failed to send DM."));
    }
  } else {
    return; // If the channel was not a #self-roles, ignore them.
  }
})

client.on("messageReactionRemove", async (reaction, user) => {
  // We're gonna make a trigger, if the user remove the reaction, the bot will take the role back.
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.guild.id !== "520423098906968065") return;
  
  if (reaction.message.channel.id === "708551760645587014") {
    if (reaction.emoji.name === "1️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("708554596817174559") // Minecraft role removed.
      return user.send("Minecraft role was taken!").catch(() => console.log("Failed to send DM."));
    }
    
    if (reaction.emoji.name === "2️⃣") {
      await reaction.message.guild.members.cache.get(user.id).roles.remove("708554654409293894") // Minecraft role removed.
      return user.send("Roblox role was taken!").catch(() => console.log("Failed to send DM."));
    }
  } else {
    return;
  }
})

client.on('message', async message => {
  if (message.author.bot) return; // Ignore if the user is a bot.
  
  let pref = db.get(`prefix.${message.guild.id}`);
  let prefix;
  
  if (!pref) {
    prefix = ";"; // If the server doesn't have any custom prefix, return default.
  } else {
    prefix = pref;
  }
  
  if (!message.content.startsWith(prefix)) return; // use this. so your bot will be only executed with prefix.
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  
  if (msg.startsWith(prefix + "reaction-roles-embed")) {
    let channel = client.channels.cache.get("708551760645587014"); // We want to sent the embed, directly to this channel.
    const embed = new Discord.MessageEmbed()
    .setColor(0xffffff)
    .setTitle("Pick your roles!")
    .setDescription(`1️⃣ Minecraft \n\n2️⃣ Roblox`) // We're gonna try an unicode emoji. Let's find it on emojipedia.com !
    channel.send(embed).then(async msg => {
      await msg.react("1️⃣");
      await msg.react("2️⃣");
      // We're gonna using an await, to make the react are right in order.
    });
  };
});

client.login(process.env.TOKEN); // Put your token into the .env
// Make sure to lock your project. Go to the your name project and click "Make This Project Private"
