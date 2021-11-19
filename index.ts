import send from './functions/fia.ts'

// Execute on first-start immediately
await send();

await setInterval(async() => {
    await send();
}, 60 * 1000);

