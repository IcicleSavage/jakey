const fs = require('fs');
const Discord = require('discord.js');
const Canvas = require('canvas');

const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	// Guild-only-command checking line:
	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}
	// Arguments checker:
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		// Usage checker:
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	// Cooldowns:
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	// Timestamp checker:
	if (timestamps.has(message.author.id)) {
		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
			}
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}
	}
	// Execute Command line:
	try {
		command.execute(message, args, client);
	}
	// Error catcher:
	catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});
const commandFiles = fs.readdirSync('C:/Users/mjsey/OneDrive/Jakey/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`C:/Users/mjsey/OneDrive/Jakey/commands/${file}`);
	client.commands.set(command.name, command);
}

// client.on('message', message => {
//	const userMention = (message.author.id);
//	const user = client.users.cache.get(message.author.id);
//	if (!message.content === '~vnum') {
//		user.send(`Here is your number: ${NumbersData}`),
//		message.channel.send(`<@${userMention}> I just sent you a DM with your number.`);
//	}
// });

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('［ ~help / ~invite ］', { type: 'LISTENING' });
});

client.on('message', message => {
	if (message.content === '~join') {
		client.emit('guildMemberAdd', message.member);
	}
});
const argofchannel = require('./commands/welcomemessage');

client.on('guildMemberAdd', async member => {
	const applyText = (canvas, text) => {
		const ctx = canvas.getContext('2d');

		// Declare a base size of the font
		let fontSize = 70;

		do {
			// Assign the font to the context and decrement it so it can be measured again
			ctx.font = `${fontSize -= 10}px sans-serif`;
			// Compare pixel width of the text to the canvas minus the approximate avatar size
		} while (ctx.measureText(text).width > canvas.width - 300);

		// Return the result to use in the actual canvas
		return ctx.font;
	};
	const channel = member.guild.channels.cache.find(ch => ch.name === `${argofchannel}`);
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('C:/Users/mjsey/OneDrive/Jakey/textmessagebackground.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#ffffff';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
	argofchannel.send(`[FROM COMMAND] Welcome to the server, ${member}!`, attachment);
});


process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));
client.login(token);