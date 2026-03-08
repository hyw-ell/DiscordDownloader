# DiscordDownloader &middot; [![Node.js](https://img.shields.io/node/v/hyw-ell/DiscordDownloader)](https://nodejs.org) ![License](https://img.shields.io/github/license/hyw-ell/DiscordDownloader)

A Discord bot that downloads and compiles files from Discord servers.

## Prerequisites

### Node.js
This bot requires Node.js to run. If you don't have it installed, you can get the latest LTS version from https://nodejs.org/en/download.

### Bot Token
You will need to create a Discord bot and obtain a token from the [Discord Developer Portal](https://discord.com/developers/applications). If you haven't already done this, check out this guide first: https://discordjs.guide/legacy/preparations/app-setup.

## Installation

1. Download this repository as a ZIP file by clicking the green **Code** button on GitHub, then **Download ZIP**
2. Extract the ZIP to a folder of your choice
3. Open the extracted folder and double-click **setup.bat**
4. Enter your bot token when prompted
5. Optionally, enter Discord channel IDs for command and error logging
    1. You need to enable Developer Mode to get a channel's ID. To enable Developer Mode in Discord, open **User Settings**, navigate to **Advanced** under **App Settings**, and toggle on **Developer Mode**

## Running the Bot

Once installation is complete, double-click **start.bat** to launch the bot. The bot is ready when you see "<bot-name> is now online" in the console window. Do not close the console window while the bot is in use.

## Usage

In any text channel the bot has access to, use the following slash command:

- `/download channel` — Downloads all files from the current channel to a folder in your Downloads directory
- `/download server` — (Not available yet) Downloads all files from the current server to a folder in your Downloads directory

## Notes

- Downloaded files are saved to `Downloads/<channel-name> (<channel-id>)/` on your computer
- Files that share the same name are automatically renamed with a counter, e.g. `image (1).png`
- The bot must remain running for the duration of the download
- Large channels with many files may take some time to complete