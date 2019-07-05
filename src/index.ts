import puppeteer from 'puppeteer';
import { config } from 'dotenv';
import login from './login'
import crawl from './crawl';

config();

const FB_ID: string = process.env.FACEBOOK_ID || '';
const FB_PW: string = process.env.FACEBOOK_PW || '';
const IS_DEV: boolean = process.env.DEV == "true" || false;

const FACEBOOK_DOMAIN = 'https://m.facebook.com';

export async function run() {
    const browser = await puppeteer.launch({
        headless: !IS_DEV,
        slowMo: 10,
        devtools: true,
        userDataDir: "./user_data"
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.goto(FACEBOOK_DOMAIN);

    await login(page, FB_ID, FB_PW);

    const newFeeds = await crawl(page);

    newFeeds.forEach(nf => {
        console.log(nf.url);
    })
    // await page.
    await browser.close();
}
