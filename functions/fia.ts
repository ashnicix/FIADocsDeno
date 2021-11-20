import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";
import { moment } from "https://deno.land/x/deno_ts_moment/mod.ts";
import { element, embed } from "./types.ts";
import Cache from './cache.ts';
import Config from './config.ts';


const run = async () : Promise<embed[]> => {
    const body = await fetch("https://www.fia.com/documents");
    const $ = cheerio.load(await body.text());
    const event = $(".event-title.active").text();
    const documents = $(`.event-title.active + ul a[href$=pdf]`);
    const elems: element[] = [];
    // Iterate through documents from the active event.
    documents.toArray().forEach((document) => {
        const elem : element = { title: "", date: "", event: event, url: "" }
        if ("attribs" in document && "href" in document.attribs){
            elem.url = encodeURI(`https://www.fia.com${document.attribs.href}`);
            elem.title = $(`a[href="${document.attribs.href}"] .title`).text().trim();
            elem.date = $(`a[href="${document.attribs.href}"] .published .date-display-single`)
                .text().trim() + " CET";
            if (elem.title.length > 0 && elem.url.length > 0) {
                if(Cache.hasElement(elem)) return;
                Cache.addElement(elem);
                elems.push(elem);
            }
        }       
    })
    if (Cache.first()) return [];  
    return elems.map((elem) => newEmbed(elem));
}

const sliceEmbedArr = (arr:embed[]) : embed[] => {
    return arr.sort((a, b) => { return  moment(a.footer.text, "DD.MM.YY hh:mm").unix()
                                        - moment(b.footer.text, "DD.MM.YY hh:mm").unix() })
           .splice(0, 8);
}

const send = async () => {
    const embeds = await run();
    
    while(embeds.length > 0) {
        console.log(embeds.length);
        const sendEmbeds = sliceEmbedArr(embeds);
        //embeds = embeds.splice(0, embeds.length - 9)
        await Config.get().webhooks.forEach(async (webhook) => {
            await fetch(webhook, {
                method: "POST",
                body: JSON.stringify({ embeds: sendEmbeds }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        })
        // Wait a bit to ensure things are sent in order.
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Sending Embeds');
    }
    
}

const newEmbed = ({title, date, event, url}: element):embed => {
    return {
        color: '11615',
        author: {
          name: event ? 'FIA Document - ' + event : 'FIA Document'
        },
        title:title,
        url: url,
        thumbnail: {
          url: Config.get().thumbnail ?? "https://static.ort.dev/fiadontsueme/fia_logo.png"
        },
        description: '',
        footer: {
          text: moment(date, "DD.MM.YY hh:mm").format("lll")
        }
      }
}

export default send