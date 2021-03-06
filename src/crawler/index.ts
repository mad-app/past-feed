import puppeteer from 'puppeteer';
import { config } from 'dotenv';
import login from './login'
import crawl from './crawl';
import save from './save';

config();

const FB_ID: string = process.env.FACEBOOK_ID || '';
const FB_PW: string = process.env.FACEBOOK_PW || '';
const IS_DEV: boolean = (process.env.DEV || "false") == "true";

const FACEBOOK_DOMAIN = 'https://m.facebook.com';

export async function run() {
    const devArgs = {
        args: IS_DEV ?
            [] :
            ['--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage']

    }
    const browser = await puppeteer.launch({
        headless: !IS_DEV,
        slowMo: 10,
        devtools: true,
        userDataDir: "./output/user_data",
        ...devArgs
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.goto(FACEBOOK_DOMAIN);

    await login(page, FB_ID, FB_PW);

    const newsFeeds = await crawl(page);
    console.log("newsFeeds! ", newsFeeds.length)

    const saveNewsFeedCount = await save(newsFeeds);
    console.log("save! ", saveNewsFeedCount)

    await browser.close();
}
