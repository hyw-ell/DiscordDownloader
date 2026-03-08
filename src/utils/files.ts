import fs from "fs"
import path from "path"
import { Collection, Message, TextBasedChannel } from 'discord.js'

export async function downloadFilesFromChannel(channel: TextBasedChannel, outputDir: string): Promise<number> {
    fs.mkdirSync(outputDir, { recursive: true })

    let lastMessageId: string | undefined = undefined
    let totalDownloaded = 0

    while (true) {
        const messages: Collection<string, Message<boolean>> = await channel.messages.fetch({
            limit: 100,
            before: lastMessageId
        })

        if (messages.size === 0) break

        for (const message of messages.values()) {
            for (const attachment of message.attachments.values()) {
                const filename = resolveFilename(outputDir, attachment.name)
                await downloadFile(attachment.url, outputDir, filename)
                totalDownloaded++
            }
        }

        lastMessageId = messages.last()?.id
    }

    return totalDownloaded
}

async function downloadFile(url: string, outputDir: string, filename: string) {
    const response = await fetch(url)
    const buffer = await response.arrayBuffer()
    fs.writeFileSync(path.join(outputDir, filename), Buffer.from(buffer))
}

function resolveFilename(outputDir: string, filename: string): string {
    const ext = path.extname(filename)
    const base = path.basename(filename, ext)
    
    let resolved = filename
    let counter = 1

    while (fs.existsSync(path.join(outputDir, resolved))) {
        resolved = `${base} (${counter})${ext}`
        counter++
    }

    return resolved
}