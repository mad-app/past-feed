"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const dotenv_1 = require("dotenv");
dotenv_1.config();
const IS_DEV = process.env.DEV == "true" || false;
const fbID = process.env.FACEBOOK_ID || '';
const fbPW = process.env.FACEBOOK_PW || '';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            headless: false,
            slowMo: 10,
            devtools: true,
        });
        const page = yield browser.newPage();
        yield page.setViewport({
            width: 1200,
            height: 800
        });
        yield page.goto('https://m.facebook.com');
        yield page.type('#m_login_email', fbID);
        const pw = '#m_login_password';
        try {
            yield page.type(pw, fbPW);
            yield page.click('#u_0_5');
        }
        catch (e) {
            const emailLogin = '#login_form > div._2pie > div:nth-child(1) > button';
            yield page.waitForSelector(emailLogin);
            yield page.click(emailLogin);
            yield page.waitForSelector(pw);
            yield page.type(pw, fbPW);
            yield page.click('#u_0_6');
        }
        const notNow = '#root > div._7om2 > div > div > div._7om2._2pip > div:nth-child(1) > div > div';
        yield page.waitForSelector(notNow);
        yield page.click(notNow);
        yield page.waitFor('#u_0_w'); //my profile
        yield autoScroll(page);
        // NOTE: Theree is one more div in the internal post.
        //#u_s_c > div > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
        const postATagSelector = 'div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a';
        const postATags = yield page.$$(postATagSelector);
        const aTagHrefs = [];
        for (let i = 1; i < postATags.length; i++) {
            const aTag = postATags[i];
            const tags = yield page.evaluate(e => e.href, aTag);
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
    });
}
exports.run = run;
//TODO: check "There are no more posts to show right now" message.#MNewsFeed > div > div > div > span 
function autoScroll(page) {
    return __awaiter(this, void 0, void 0, function* () {
        const interval = IS_DEV ? 30 : 1000;
        yield sleep(IS_DEV ? 1000 : 5000);
        yield page.evaluate(`(async (interval) => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight || totalHeight >= 6000){
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    })()`, interval);
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
