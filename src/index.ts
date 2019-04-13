import puppeteer from 'puppeteer';
import { config } from 'dotenv';

config();

const fbID: string = process.env.FACEBOOK_ID || '';
const fbPW: string = process.env.FACEBOOK_PW|| '';

export async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
        devtools: true,
    });
    const page = await browser.newPage();
    await page.goto('https://facebook.com');
    await page.type('#email', fbID);
    await page.type('#pass', fbPW);
    await page.click('#u_0_2');
        // await browser.close();
}
