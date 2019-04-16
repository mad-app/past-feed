import puppeteer from 'puppeteer';
import { config } from 'dotenv';
import login from './login'
import crawl from './crawl';

config();

const IS_DEV: boolean = process.env.DEV == "true" || false;
const fbID: string = process.env.FACEBOOK_ID || '';
const fbPW: string = process.env.FACEBOOK_PW || '';

const FACEBOOK_DOMAIN = 'https://m.facebook.com';

export async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 10,
        devtools: true,
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.goto(FACEBOOK_DOMAIN);

    await login(page, fbID, fbPW);

    const newFeeds = await crawl(page);

    newFeeds.forEach(nf => {
        console.log(nf.url);
    })
    console.log(1232131);
    // await page.
    // await browser.close();
}

//TODO: check "There are no more posts to show right now" message.#MNewsFeed > div > div > div > span 
async function autoScroll(page: puppeteer.Page) {
    const interval = IS_DEV ? 30 : 1000;
    await sleep(IS_DEV ? 1000 : 5000);
    await page.evaluate(`(async (isDev, interval) => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight || (isDev && totalHeight >= 6000){
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    })()`, IS_DEV, interval);
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

