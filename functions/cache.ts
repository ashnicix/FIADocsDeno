import { element } from "./types.ts";
import { moment } from "https://deno.land/x/deno_ts_moment/mod.ts";

class Cache {
  #elements: element[] = [];
  #first = true;

  constructor() {
    this.#clear();
  }

  first(): boolean {
    if (this.#first === true) {
      this.#first = false;
      console.log("Skipping items on first start");
      return true;
    }
    return false;
  }

  hasElement(element: element): boolean {
    const val = this.#elements.find((a) => {
      return a.url == element.url;
    });
    if (val === undefined) {
      return false;
    }
    return true;
  }

  addElement(element: element): void {
    if (!this.hasElement(element)) {
      this.#elements.push(element);
    }
  }

  async #clear() {
    while (true) {

      await new Promise((resolve) => setTimeout(resolve, 60 * 60 * 1000 * 24));

      const removes: number[] = [];
      this.#elements.forEach((element, idx) => {
        const date = moment(element.date, "DD.MM.YY hh:mm");
        if (!date.isValid()) {
          removes.push(idx);
          return;
        }
        if (date.unix() < date.subtract(3, "days").unix()) {
          removes.push(idx);
          return;
        }
      });
      removes.forEach((index) => {
        this.#elements.splice(index, 1);
      });
    }
  }
}

export default new Cache();
