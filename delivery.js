const Discord = require('discord.js');
module.exports = {
	name: 'delivery',
	description: 'Check for packages.',
	aliases: ['atthedoor'],
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const user = message.author.username;
		data.push(`**To:** ${user}`);
		data.push('**From:** IPS (International Parcel Service, Co.)');
		data.push('▎▍▋▍▎▋▎\n▎▍▋▍▎▋▎\n__**871N04F59DE**__');
		const serialnumber = '871N04F59DE';
		if (!args.length) {
			const delivery = new Discord.MessageEmbed()
				.setColor('#104ed7')
				.setTitle('**Front Door**')
				.setDescription('\u200b')
				.setAuthor('Jakey', 'https://images-ext-1.discordapp.net/external/ZAoKh1docr7veKQ9zLtrZtBKB62lNu1VBF6SrUSI9cs/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/744692475788001342/f8fc0f377e759fe8b5557c7059e40b1a.png?width=475&height=475')
				.addFields(
					{ name: '***NEW ALERTS***\n **A PACKAGE IS WAITING AT THE FRONT DOOR.**', value: `[*Label*]\n ${data.join('\n')}` },
				)
				.setImage('https://cdn.discordapp.com/emojis/780564293967937586.png?v=1')
				.setFooter(`_____${serialnumber}_____`);
			data.push(delivery);
			message.channel.send(data);
		}
	},
};