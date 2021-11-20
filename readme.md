# FIA Docs Deno

[![🐧 Linux](https://github.com/MarkusTheOrt/FIADocsDeno/actions/workflows/linux.yml/badge.svg)](https://github.com/MarkusTheOrt/FIADocsDeno/actions/workflows/linux.yml)
[![🍎 Mac](https://github.com/MarkusTheOrt/FIADocsDeno/actions/workflows/mac.yml/badge.svg)](https://github.com/MarkusTheOrt/FIADocsDeno/actions/workflows/mac.yml)
[![🪟 Windows](https://github.com/MarkusTheOrt/FIADocsDeno/actions/workflows/windows.yml/badge.svg)](https://github.com/MarkusTheOrt/FIADocsDeno/actions/workflows/windows.yml)

FIA Docs Deno is a [Discord Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) *Bot* that posts new [Documents](https://www.fia.com/documents) from the [FIA](https://www.fia.com/).

![Preview Image](https://i.imgur.com/TIbLZ1e.png "Preview Image")

# Setup

Inside the folder create a file called `config.json` with the following contents:
```
{
    "webhooks": [ "URL_TO_WEBHOOK" ],
}
```
Additional Settings
-

- `thumbnail` - URL to the image being shown in the Embed
- `interval` - Fetch interval in seconds (default to 60)

This bot supports multiple webhooks for multiple servers. You can use the thumbnail url above or use your own for customization.

Alternatively there are compiled binaries available on the [releases](https://github.com/MarkusTheOrt/FIADocsDeno/releases) page.