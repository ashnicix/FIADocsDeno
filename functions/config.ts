const configPath = Deno.realPathSync("./config.json")
type config = {
    webhooks: string[],
    thumbnail?: string,
    interval?: number
}

// Little wrapper for reading config.json
class Config {
    #config:config = { webhooks: [] };
    constructor(){
        const rawFile = Deno.readFileSync(configPath);
        this.#config = JSON.parse(new TextDecoder().decode(rawFile));
    }

    get(){
        return this.#config;
    }

}

export default new Config();
