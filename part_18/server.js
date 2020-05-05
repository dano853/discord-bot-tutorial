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
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1)); // Message Flags: -default, -ban, -parameter
  }
  
  if (msg.startsWith(prefix + "prefix")) {
    if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You don't have any permissions to do this!");
    let data = db.get(`prefix.${message.guild.id}`);
    if (message.flags[0] === "default") {
      await db.delete(`prefix.${message.guild.id}`);
      return message.channel.send("The server prefix has been changed into default.");
    }
    
    let symbol = args.join(" ");
    if (!symbol) return message.channel.send("Please input the prefix.");
    
    db.set(`prefix.${message.guild.id}`, symbol);
    return message.channel.send(`The server prefix has been changed to **${symbol}**`);
  }
 });
