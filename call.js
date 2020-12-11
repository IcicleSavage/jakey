const Discord = require('discord.js');
module.exports = {
	name: 'call',
	description: 'Call someone.',
	args: true,
	usage: '<user that you want to call>',
	execute(message, args) {
		const data = [];
		const user = message.author.id;
		data.push(`${user.username}`);
		const CALL = new Discord.MessageEmbed()
			.setColor('#ff9500')
			.setTitle(`**Call from: \n${data}**`)
			.setDescription(`${user.username}`)
			.setAuthor('Cell Phone', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/56/telephone-receiver_1f4de.png')
			.setThumbnail('https://discord.com/assets/f34c63197816c3e60bea4a9537c5fffa.svg')
			.addFields(
				{ name: `${data}`, value: '\u200b' },
				{ name: '═════════════════════════════════════════════════', value: '\u200b', inline: false },
				{ name: '__**INBOX**__', value: `Hey <@${user}>, \n Here's the info to sign up for a number, so you don't have to use that, old, telephone booth anymore. \n [Click Here](https://forms.gle/vxtvUWqypRR2ipiN7)\n \n Sincerely, \n John`, inline: true },
			);
		data.push(CALL);

		const filter = (reaction) => {
			return ['775860890624983051', '775860959347605514'].includes(reaction.emoji.name);
		};

		const taggedUser = message.mentions.users.first();
		if (!message.mentions.users.size) {
			return message.reply('You need to tag a user in order to call them!');
		}if (args[0] === `${Discord.Guild.user}`) {
			return;
		}
		return taggedUser.send(data)
			.then(sentMessage => {
				sentMessage.react('775860890624983051')
					.then(() => sentMessage.react('775860959347605514'))
					.then(sentMessage.awaitReactions(filter, { max: 2, time: 120000, errors: [] }))
					.then(collected => {
						const reaction = collected;

						if (reaction.emoji.name === '775860890624983051') {
							message.reply('Call Connected.');
							data.push('-Accepted-');
						}
						else {
							message.reply('Declined.');
							data.push('-DECLINED-');
						}
					})
					.catch(collected => {
						message.reply('You ignored the call.');
						console.log(`${collected}`);
					})
					.catch(() => console.error('One of the emojis failed to react.'));
			})
			.then(() => {
				if (message.channel.type === 'dm') return;
				message.channel.send(`\`CALLING.\` \n${taggedUser.username}`)
					.then((sentMessage) =>
						setTimeout(function() {
							sentMessage.edit(`\`CALLING..\` \n${taggedUser.username}`);
							setTimeout(function() {
								sentMessage.edit(`\`CALLING...\` \n${taggedUser.username}`);
							}, 1500);
						}, 1500),
					);
			})
			.catch(error => {
				console.error('Could not send a call.\n', error);
				message.reply('`Call Failed.` Do you have DMs disabled?');
			});
	},
};