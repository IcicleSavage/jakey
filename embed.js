const Discord = require('discord.js');
module.exports = {
	name: 'embed',
	description: 'E.',
	execute(message) {
		const exampleEmbed = new Discord.MessageEmbed().setTitle('Some title');

		if (message.author.bot) {
			exampleEmbed.setColor('#7289da');
		}
	},
};