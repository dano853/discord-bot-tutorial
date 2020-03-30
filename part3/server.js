const Discord = require('discord.js');
const client = new Discord.Client();

let m = require('moment-duration-format'),
    os = require('os'),
    cpuStat = require('cpu-stat'),
    ms = require('ms'),
    moment = require('moment'),
    fetch = require('node-fetch')

client.on("ready", () => {
  console.log('Online.')
})

client.on('message', async message => {
  if (message.author.bot) return;
  let prefix = ';'; // customized. you can change it whatever you want.
  if (!message.content.startsWith(prefix)) return; // use this. so your bot will be only executed with prefix.
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  
  if (msg.startsWith(prefix + 'ping')) {
    message.channel.send('pong.'); // results.
  } // easy way.
  
  if (msg.startsWith(prefix + 'hello')) {
    message.channel.send('hewwo'); // results.
  }
  
  if (msg.startsWith(prefix + 'stats')) {
    cpuStat.usagePercent(function (error, percent, seconds) {
      if (error) {
        return console.error(error)
      }
      
      const cores = os.cpus().length // Counting how many cores your hosting has.
      const cpuModel = os.cpus()[0].model // Your hosting CPU model.
      const guild = client.guilds.cache.size.toLocaleString() // Counting how many servers invite your bot. Tolocalestring, meaning separate 3 numbers with commas.
      const user = client.users.cache.size.toLocaleString() // Counting how many members in the server that invite your bot.
      const channel = client.channels.cache.size.toLocaleString() // Counting how many channels in the server that invite your bot.
      const usage = formatBytes(process.memoryUsage().heapUsed) // Your memory usage.
      const Node = process.version // Your node version.
      const CPU = percent.toFixed(2) // Your CPU usage.
      
      const embed = new Discord.MessageEmbed() // Stable or < below than 11.x.x use RichEmbed. More than 12.x.x or Master or https://github.com/discordjs/discord.js/ (github:discordjs/discord.js) use MessageEmbed.
      // Actually they are exactly the same.
      embed.addField('Bot Statistics:', `Server: ${guild} \nUser: ${user} \nChannel: ${channel} \nUsage: ${usage} \nNode: ${Node} \nCPU Usage: ${CPU}%`) // Use Grave accent or `` 
      // (its on your keyboard, besides on number 1.)
      // Use \n to make a new line.
      embed.addField('Physical Statistics:', `CPU: ${cores} - ${cpuModel} \nUptime: **${parseDur(client.uptime)}**`)
      // Let's test it!
      // Use ** turn the text into bold.
      // Let's test again.
      message.channel.send(embed)
    })
  }
  
  if (msg.startsWith(prefix + "corona")) {
    let countries = args[0] // Your/someone countries prefix.
    fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
    .then(response => response.json())
    .then(data => {
      let confirmed = data.confirmed.value.toLocaleString() 
      let recovered = data.recovered.value.toLocaleString() 
      let deaths = data.deaths.value.toLocaleString() 
      // Add .toLocaleString() to separate 3 numbers into commas.
      
      const embed = new Discord.MessageEmbed()
      .setColor(0x7289DA) // Blurple.
      .addField(`Country: ${countries}`, `Confirmed: **${confirmed}** \nRecovered: **${recovered}** \nDeaths: **${deaths}**`)
      .setTimestamp()
      
      message.channel.send(embed)
      // Let's test it out!
    })
  }
});

client.login(process.env.TOKEN); // Put your token into the .env
// Make sure to lock your project. Go to the your name project and click "Make This Project Private"

function formatBytes (a, b) {
  if (0 == a) return "0 Bytes";
  let c = 1024,
      d = b || 2,
      e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      f = Math.floor(Math.log(a) / Math.log(c));
  
  return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
} // Create MB, KB, TB or something in the back of your memory counters.

function parseDur(ms) {
  let seconds = ms / 1000,
      days = parseInt(seconds / 86400);
  seconds = seconds % 86400
  
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600
  
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60)
  
  if (days) {
    return `${days} day, ${hours} hours, ${minutes} minutes`
  } else if (hours) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
  } else if (minutes) {
    return `${minutes} minutes, ${seconds} seconds`
  }
  
  return `${seconds} second(s)`
} // Uptime bot.
