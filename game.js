const Discord = require('discord.js');
module.exports = {
	name: 'game',
	aliases: ['play'],
	usage: '~game',
	description: 'We can play a little game',
	execute(message) {
		const blockLetters = require('./blocks');
		const Game2Embed = new Discord.MessageEmbed()
			.setColor('#1eff00')
			.setTitle('\u200b')
			.addFields(
				{ name: '\u200b', value: blockLetters['T'], inline: true },
				{ name: '\u200b', value: blockLetters['H'], inline: true },
				{ name: '\u200b', value: blockLetters['E'], inline: true },
				{ name: '\u200b', value: blockLetters['G'], inline: true },
				{ name: '\u200b', value: blockLetters['A'], inline: true },
				{ name: '\u200b', value: blockLetters['M'], inline: true },
				{ name: '\u200b', value: blockLetters['E'], inline: true },
			)
			.setFooter('To start type `~ready`.');
		message.channel.send(Game2Embed);
		if (message.content === '~ready') {
			return message.channel.reply('Ok.');
		}

	},
};