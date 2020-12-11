const { prefix } = require('../config.json');
const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: '**[This command]** ; List all of my commands, or an individual one.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
		const user = message.author;
		const userid = message.author.id;
		const { commands } = message.client;
		if (!args.length) {
			data.push(commands.map(command => command.name).join('\n '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
			const HelpEmbed = new Discord.MessageEmbed()
				.setColor('#104ed7')
				.setTitle('**Help**')
				.setDescription('\u200b')
				.setAuthor('Jakey', 'https://images-ext-1.discordapp.net/external/ZAoKh1docr7veKQ9zLtrZtBKB62lNu1VBF6SrUSI9cs/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/744692475788001342/f8fc0f377e759fe8b5557c7059e40b1a.png?width=475&height=475')
				.addFields(
					{ name: '**Here\'s a list of all my commands:**', value: `${data.join('\n')}` },
				);
			data.push(HelpEmbed);
			return user.send(data)
				.then(message.react('765319818844176444'))
				.then(message.channel.send(`<@${userid}>, I've just sent you a DM with a list of my commands.`));
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('That\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		const commandEmbed = new Discord.MessageEmbed()
			.setColor('#299be8')
			.setTitle('Command Help')
			.setDescription(`||For: <@${userid}>||`)
			.setAuthor('Jakey', 'https://images-ext-1.discordapp.net/external/ZAoKh1docr7veKQ9zLtrZtBKB62lNu1VBF6SrUSI9cs/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/744692475788001342/f8fc0f377e759fe8b5557c7059e40b1a.png?width=475&height=475')
			.addFields(
				{ name: 'Here\'s some information that might help.', value: `${data.join('\n')}` },
			);
		if (message.channel.type === 'text') {
			data.push(commandEmbed);
			return message.reply(data);
		}
		const commandEmbedDM = new Discord.MessageEmbed()
			.setColor('#299be8')
			.setTitle('Command Help')
			.setDescription('\u200b')
			.setAuthor('Jakey', 'https://images-ext-1.discordapp.net/external/ZAoKh1docr7veKQ9zLtrZtBKB62lNu1VBF6SrUSI9cs/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/744692475788001342/f8fc0f377e759fe8b5557c7059e40b1a.png?width=475&height=475')
			.addFields(
				{ name: 'Here\'s some information that might help.', value: `${data.join('\n')}` },
			)
			.setTimestamp();
		if (message.channel.type === 'dm') {
			data.push(commandEmbedDM);
			return user.send(data);
		}
	},
};