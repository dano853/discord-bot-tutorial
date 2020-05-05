// The following code is a part of <client>.on("guildMemberAdd")
// Required package: none.

client.on("guildMemberAdd", member => {
  let memberlog = "CHANNEL_ID";
  if (member.guild.id !== "SERVER ID") return; // You can find your own server ID by ran a "serverinfo" command.
  
  client.channels.cache.get(memberlog).send(`Welcome to the **${member.guild.name}**, <@!${member.user.id}> !!!`);
  member.roles.add("ROLE_ID"); // Member role. 
  // You can find the role ID by putting a backslash after mention.
  // Example: \@MemberRole
  // Result: <@&1234567890123456789>
})

// The following code is a part of <client>.on("guildMemberRemove")

client.on("guildMemberRemove", member => {
  let memberlog = "CHANNEL_ID";
  if (member.guild.id !== "SERVER ID") return;
  
  client.channels.cache.get(memberlog).send(`So long... **${member.user.tag}** ... :(`);
})
