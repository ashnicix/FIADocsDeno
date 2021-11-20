import send from './functions/fia.ts'
import Config from './functions/config.ts'

const interval = Config.get().interval ?? 60;

// run indefinitely.
while(true) {
    await send();
    // Wait for one Interval
    await new Promise(resolve => setTimeout(resolve, interval * 1000));
}
