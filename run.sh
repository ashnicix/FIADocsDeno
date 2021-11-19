#!/bin/bash
# Run script, permits only fia.com and discordapp.com, as well as only reading from local dir.
deno run --allow-net=www.fia.com,discordapp.com --allow-read=./ ./index.ts