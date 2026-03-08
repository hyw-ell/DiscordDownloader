import 'dotenv/config'

import { MessageFlags } from 'discord.js'
import { BotClient } from './classes/BotClient.js'
import { CHANNEL_IDS, BOT_TOKEN } from './data/discord.js'
import { registerCommands, sendToChannel, sendToErrorChannel } from './utils/discord.js'

export const client = new BotClient()

client.on('clientReady', async () => {
	await registerCommands()
	console.log(`${client.user?.displayName} is now online`)
	sendToChannel(CHANNEL_IDS.COMMAND_LOG, `**:white_check_mark:  ${client.user?.displayName} is now online**`)
})

client.on('interactionCreate', interaction => {
	if (interaction.isCommand() || interaction.isMessageContextMenuCommand()) {
    
        const command = client.commands.get(interaction.commandName)
        if (command) {
            sendToChannel(CHANNEL_IDS.COMMAND_LOG, {
                content: `:scroll:  **${interaction.user.username}** ran the command \`${interaction.commandName}\` in **${interaction.guild?.name ?? 'Direct Messages'}** (${interaction.guildId ?? interaction.channelId})`,
                files: interaction.isChatInputCommand() ? [{ attachment: Buffer.from(JSON.stringify(interaction.options, null, "\t")), name: 'options.json' }] : undefined
            })
            command.execute(interaction)
        } else {
            interaction.reply({
                content: 'Failed to load command. Please try again later.',
                flags: MessageFlags.Ephemeral
            })
        }
    }
})

client.login(BOT_TOKEN)

process.on('uncaughtException', sendToErrorChannel)