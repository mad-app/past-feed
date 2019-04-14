import puppeteer from 'puppeteer';
import { config } from 'dotenv';

config();

const IS_DEV: boolean = process.env.DEV == "true" || false;
const fbID: string = process.env.FACEBOOK_ID || '';
const fbPW: string = process.env.FACEBOOK_PW || '';

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
    await page.goto('https://m.facebook.com');
    await page.type('#m_login_email', fbID);
    const pw = '#m_login_password';
    try {
        await page.type(pw, fbPW);
        await page.click('#u_0_5');
    } catch (e) {
        const emailLogin = '#login_form > div._2pie > div:nth-child(1) > button';
        await page.waitForSelector(emailLogin)
        await page.click(emailLogin)

        await page.waitForSelector(pw)
        await page.type(pw, fbPW);
        await page.click('#u_0_6');
    }

    const notNow = '#root > div._7om2 > div > div > div._7om2._2pip > div:nth-child(1) > div > div';

    await page.waitForSelector(notNow)
    await page.click(notNow);

    await page.waitFor('#u_0_w');//my profile
    await autoScroll(page);

    // NOTE: Theree is one more div in the internal post.
    //#u_s_c > div > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
    const postATagSelector = 'div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a';
    const postATags = await page.$$(postATagSelector);
    const aTagHrefs = [];
    for (let i = 1; i < postATags.length; i++) {
        const aTag = postATags[i];
        const tags = await page.evaluate(e => e.href, aTag);
        aTagHrefs.push(tags);
    }
    // const postATags = await page.$$eval(postATagSelector, es => {
    //     console.log(es)
    //     return es.map(e => {
    //         console.log((<any>e).href); return e
    //     })
    // });

    // const postURLs = await postATags.map(async e => await (await e.getProperty('textContent')).jsonValue())

    console.log(aTagHrefs);
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

