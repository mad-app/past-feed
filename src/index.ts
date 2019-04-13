import puppeteer from 'puppeteer';
import { config } from 'dotenv';

config();

const fbID: string = process.env.FACEBOOK_ID || '';
const fbPW: string = process.env.FACEBOOK_PW|| '';

export async function run() {
    const browser = await puppeteer.launch({
        headless: false,
        // slowMo: 100,
        devtools: true,
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1200,
        height: 800
    });
    await page.goto('https://m.facebook.com');
    await page.type('#m_login_email', fbID);
    await page.type('#m_login_password', fbPW);
    await page.click('#u_0_5');

    const notNow = '#root > div._7om2 > div > div > div._7om2._2pip > div:nth-child(1) > div > div';
    await page.waitForSelector(notNow)
    await page.click(notNow);
    await autoScroll(page);
    // await page.
//#u_ps_0_0_2 > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
//#u_ps_0_0_2 > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
//#u_ps_0_0_e > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
//#u_ps_0_0_f > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
//#u_ps_0_0_g > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
//#u_p_1 > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
//#u_u_3 > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
//#u_11_3 > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a

//#u_q_4 > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
//#u_q_8 > div > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a

//#u_s_4 > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
//#u_s_c > div > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
//#MNewsFeed > div > div > div > span
// There are no more posts to show right now.
        // await browser.close();
}

async function autoScroll(page: puppeteer.Page){
    await page.evaluate(`(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 1000);
        });
    })()`);
}