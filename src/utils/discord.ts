import { MessageCreateOptions, MessagePayload, REST, Routes, TextChannel } from 'discord.js'
import { readdirSync } from 'fs'
import { client } from '../index.js'
import { BOT_ID, BOT_TOKEN, CHANNEL_IDS } from '../data/discord.js'
import { Command } from '../classes/BotClient.js'
import { inspect } from 'util'

export async function registerCommands() {
    const commands = []
    const commandFiles = readdirSync(`./prod/commands`)

    for (const file of commandFiles) {
        const { command } : { command: Command } = await import(`../../prod/commands/${file}`)

        commands.push(command.data.toJSON())
        client.commands.set(command.data.name, command)
    }

    const rest = new REST({ version: '9' }).setToken(BOT_TOKEN)
    rest.put(Routes.applicationCommands(BOT_ID), { body: commands })
}

export async function sendToChannel(channelID: string, message: string | MessagePayload | MessageCreateOptions) {
    const channel = await client.channels.fetch(channelID) as TextChannel | null
    if (channel) channel.send(message)
}

export async function sendToErrorChannel(error: Error, textContent?: string) {
    sendToChannel(CHANNEL_IDS.ERROR, {
        content: textContent,
        files: [{ attachment: Buffer.from(inspect(error, { depth: null })), name: 'error.ts' }]
    })
}