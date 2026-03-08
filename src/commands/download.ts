import { channelMention, ChatInputCommandInteraction, formatEmoji, SlashCommandBuilder, TextChannel } from 'discord.js'
import path from 'path'
import os from 'os'
import { downloadFilesFromChannel } from '../utils/files.js'
import { sendToErrorChannel } from '../utils/discord.js'

export const command = {
	data: new SlashCommandBuilder()
		.setName('download')
		.setDescription('Download files')
        .addSubcommand(subcommand => 
			subcommand
				.setName('channel')
				.setDescription('Download all files from the current channel')
		)
		.addSubcommand(subcommand => 
			subcommand
				.setName('server')
				.setDescription('Download all files from the current server')
		)
	,
	async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply()
		const subcommand = interaction.options.getSubcommand()

        if (subcommand === 'channel') {
            const channel = await interaction.guild?.channels.fetch(interaction.channelId)

            if (!(channel && channel instanceof TextChannel)) {
                await interaction.editReply('This command can only be used in a text channel.')
                return
            }
            
            await interaction.editReply(`Downloading files from ${channelMention(channel.id)} ${formatEmoji('1480003588226023647', true)}`)
            
            try {
                const outputDir = path.join(os.homedir(), 'downloads', `${channel.name} (${channel.id})`)
                const total = await downloadFilesFromChannel(channel, outputDir)
                await interaction.editReply(`Done! Downloaded ${total} file(s) to \`${outputDir}\`.`)
            } catch (error) {
                sendToErrorChannel(error as Error)
                await interaction.editReply('Something went wrong while downloading files.')
            }

        } else if (subcommand === 'server') {
            // TODO: implement server-wide download
            await interaction.editReply('Server download is not yet implemented.')
        }
	}
}