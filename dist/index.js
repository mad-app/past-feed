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
const fbID = process.env.FACEBOOK_ID || '';
const fbPW = process.env.FACEBOOK_PW || '';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            headless: false,
            // slowMo: 100,
            devtools: true,
        });
        const page = yield browser.newPage();
        yield page.setViewport({
            width: 1200,
            height: 800
        });
        yield page.goto('https://m.facebook.com');
        yield page.type('#m_login_email', fbID);
        yield page.type('#m_login_password', fbPW);
        yield page.click('#u_0_5');
        const notNow = '#root > div._7om2 > div > div > div._7om2._2pip > div:nth-child(1) > div > div';
        yield page.waitForSelector(notNow);
        yield page.click(notNow);
        yield autoScroll(page);
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
    });
}
exports.run = run;
function autoScroll(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.evaluate(`(async () => {
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
    });
}
