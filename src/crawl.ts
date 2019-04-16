import { Page } from 'puppeteer';
import { NewsFeed } from './crawlTypes';

const IS_DEV: boolean = process.env.DEV == "true" || false;

export default async function (page: Page): Promise<NewsFeed[]> {
    const notNowTag = '#root > div._7om2 > div > div > div._7om2._2pip > div:nth-child(1) > div > div';

    await page.waitForSelector(notNowTag)
    await page.click(notNowTag);

    await page.waitFor('#u_0_w');//my profile
    await autoScroll(page);

    // NOTE: Theree is one more div in the internal post.
    //#u_s_c > div > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
    const postATagSelector = 'div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a';
    const postATags = await page.$$(postATagSelector);
    const newsFeeds: NewsFeed[] = [];
    for (let i = 1; i < postATags.length; i++) {
        const aTag = postATags[i];
        const tags = await page.evaluate(e => e.href, aTag);
        const newFeed = {
            url: tags
        }
        newsFeeds.push(newFeed);
    }

    return newsFeeds;
}

//TODO: check "There are no more posts to show right now" message.#MNewsFeed > div > div > div > span 
async function autoScroll(page: Page) {
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

                if(totalHeight >= scrollHeight || (isDev && totalHeight >= 6000)){
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
