const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('you cannot use this command');


    const mentionedmember = message.mentions.members.first();
    let reason = args.slice(1).join(' ');
    if (!reason) reason = 'No reason given';
    const kickembed = new Discord.MessageEmbed()
      .setTitle(`you were kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor('#5708ab')
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    // -kick @user dm ads
    if (!args[0]) return message.channel.send('you need to state a user to kick.')
    if (!mentionedmember) return message.channel.send('The member mentioned is not in the ServiceWorkerRegistration.')
    if (!mentionedmember.kickable) return message.channel.send('I cannot kick that member')
    try {
      await mentionedmember.send(kickembed);
      await mentionedmember.kick(reason)
      // message.channel.send('test')

    } catch (err) {
      console.log(err);
      console.log('i was unable to message the member.');
    }
//     try {
//       await mentionedmember.kick(reason)
// message.channel.send('Test')
      
//     } catch (err) {
//       console.log(err);
//       message.channel.send('i was unable to kick the member mentioned.');
//     }
  }
}