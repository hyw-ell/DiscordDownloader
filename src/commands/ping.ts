import { ChatInputCommandInteraction, formatEmoji, SlashCommandBuilder } from 'discord.js'

export const command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("Shows the bot's response time")
	,
	async execute(interaction: ChatInputCommandInteraction) {
		const time = Date.now()
		await interaction.reply(`Pinging ${formatEmoji('1480003588226023647', true)}`)
		await interaction.editReply(`Pong! - Time: **${time - interaction.createdTimestamp}ms**`)
	}
}