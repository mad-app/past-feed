import puppeteer from 'puppeteer';
import { config } from 'dotenv';
import login from './login'
import crawl from './crawl';

config();

const fbID: string = process.env.FACEBOOK_ID || '';
const fbPW: string = process.env.FACEBOOK_PW || '';

const FACEBOOK_DOMAIN = 'https://m.facebook.com';

export async function run() {
    const browser = await puppeteer.launch({
        headless: false,
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

    await login(page, fbID, fbPW);

    const newFeeds = await crawl(page);

    newFeeds.forEach(nf => {
        console.log(nf.url);
    })
    console.log(1232131);
    // await page.
    await browser.close();
}
