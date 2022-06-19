import StealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";
import { ContentResult, Opts } from "./types";
import { load } from "cheerio";
import axios from "axios";

axios.defaults.adapter = require("axios/lib/adapters/http");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 OPR/82.0.4227.50";

puppeteer.use(StealthPlugin());

/**
 * @param url
 * @param execPath
 * @param  opts
 * @returns Parsed content
 */
export const content = async (
  url: string,
  execPath: string,
  opts?: Opts
): Promise<ContentResult> => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: execPath,
    args: ["--no-sandbox", "--disabled-setupid-sandbox"],
  });
  const [page] = await browser.pages();
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (req.resourceType() === "document") {
      return req.continue();
    } else if (
      (req.resourceType() === "script" ||
        req.resourceType() === "xhr" ||
        req.resourceType() === "image") &&
      opts?.scripts
    ) {
      /* istanbul ignore next */
      return req.continue();
    } else {
      /* istanbul ignore next */
      return req.abort();
    }
  });
  await page.setUserAgent(UA);
  await page.setExtraHTTPHeaders(opts?.headers || {});
  await page.goto(url, { waitUntil: "load", timeout: 0 });
  if (opts?.action) {
    await opts.action(page);
  }
  const innerHTML = await page.content();
  await page.close();
  await browser.close();
  page.removeAllListeners("request");
  const current_url = page.url();
  return { innerHTML, current_url };
};

export const parser = load;

export const http = axios;
