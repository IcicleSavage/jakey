const Discord = require('discord.js');
const number = require('../commands/numberpad');
module.exports = {
	name: 'dial',
	aliases: ['num'],
	usage: '~dial [NUMBER TO DIAL, or ping recipient]',
	description: 'Dial a friend',
	execute(message) {
		const Game2Embed = new Discord.MessageEmbed()
			.setColor('#1eff00')
			.setTitle('\u200b')
			.addFields(
				{ name: '\u200b', value: `${number['1']} ${number['2']} ${number['3']}\n${number['4']} ${number['5']} ${number['6']}\n${number['7']} ${number['8']} ${number['9']}\n${number['*']} ${number['0']} ${number['#']}`, inline: true },
			)
			.setFooter('To start type `~ready`.');
		message.channel.send(Game2Embed);
		if (message.content === '~ready') {
			return message.channel.reply('Ok.');
		}

	},
};