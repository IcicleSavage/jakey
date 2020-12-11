// const { google } = require('googleapis');
// const sheets = google.sheets({
// 	version: 'v4',
// 	auth: 'AIzaSyBaA5kFGZUgNLp63A2K6uLqfF9wI5xyvJc',
// });
// const data = [];
const Discord = require('discord.js');
module.exports = {
	name: 'getnum',
	aliases: ['~getnum'],
	description: 'Sign up for your phone-number, for my calling system.',
	execute(message) {
		// async function main() {
		// 	const authClient = await authorize();
		// 	const request = {
		// 		spreadsheetId: '1-jX1f8sb-OSg_mZh5K3INe-UOu3F1cibjhuLOOq_bVg',
		// 		range: 'Form Responses 1!D7:J1004',
		// 		valueRenderOption: 'FORMATTED_VALUE',
		// 		dateTimeRenderOption: '',
		// 		auth: authClient,
		// 	};

		// 	try {
		// 		const response = (await sheets.spreadsheets.values.get(request)).data;
		// 		console.log(JSON.stringify(response, ',', 2));
		// 	}
		// 	catch (err) {
		// 		console.error(err);
		// 	}
		// }
		// // maybe delete
		// async function authorize() {

		// 	const authClient = 'https://www.googleapis.com/auth/spreadsheets';

		// 	if (authClient == null) {
		// 		throw Error('authentication failed');
		// 	}

		// 	return authClient;
		// }
		// const authClient = 'https://www.googleapis.com/auth/spreadsheets';
		// const request = {
		// 	spreadsheetId: '1-jX1f8sb-OSg_mZh5K3INe-UOu3F1cibjhuLOOq_bVg',
		// 	range: 'Form Responses 1!D7:J1004',
		// 	valueRenderOption: 'FORMATTED_VALUE',
		// 	dateTimeRenderOption: '',
		// 	auth: authClient,
		// };
		// const response = (sheets.spreadsheets.values.get(request)).data;
		// data.push(JSON.stringify(response, ',', 2));
		// main();
		const user = message.author.id;
		const getNumber = new Discord.MessageEmbed()
			.setColor('#ff9500')
			.setTitle('**Call from: \n JOHN**')
			.setAuthor('Public Phone', 'https://images.emojiterra.com/mozilla/512px/1f4de.png')
			.setThumbnail('https://discord.com/assets/f34c63197816c3e60bea4a9537c5fffa.svg')
			.addFields(
				{ name: '`CALLER:`\n- Hey! I heard that you wanted a number in the new calling system. You still interested? \n- ... \n - Alright, I\'ll send over the info right now. \n- ... \n- No problem, talk to you later. Bye. \n`CALL ENDED`', value: '\u200b' },
				{ name: '═════════════════════════════════════════════════', value: '\u200b', inline: false },
				{ name: '__**INBOX**__', value: `Hey <@${user}>, \n Here's the info to sign up for a number, so you don't have to use that, old, telephone booth anymore. \n [Click Here](https://forms.gle/vxtvUWqypRR2ipiN7)\n \n Sincerely, \n John`, inline: true },
			);

		message.channel.send(getNumber);
	},
};