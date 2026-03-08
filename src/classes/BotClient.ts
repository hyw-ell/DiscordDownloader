import { Client, Collection, ContextMenuCommandBuilder, GatewayIntentBits, Interaction, SlashCommandBuilder } from 'discord.js'
import { MILLISECONDS } from '../data/time.js'

export type Command = {
    data: SlashCommandBuilder | ContextMenuCommandBuilder,
    execute: (interaction: Interaction) => Promise<void>
}

export class BotClient extends Client {
    public commands: Collection<string, Command>

    constructor() {
        super({
            intents: [
            ],
            rest: { timeout: MILLISECONDS.MINUTE }
        })
        this.commands = new Collection()
    }
}