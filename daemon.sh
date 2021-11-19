#!/bin/bash
if [[ $1 == 'start' ]]; then
pm2 start --name FIA-Docs-Webhook ./run.sh
fi
if [[ $1 == 'stop' ]]; then
pm2 stop --name FIA-Docs-Webhook ./run.sh
fi
if [[ $1 == 'restart' ]]; then
pm2 stop --name FIA-Docs-Webhook ./run.sh
fi