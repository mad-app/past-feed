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
const login_1 = __importDefault(require("./login"));
const crawl_1 = __importDefault(require("./crawl"));
dotenv_1.config();
const IS_DEV = process.env.DEV == "true" || false;
const fbID = process.env.FACEBOOK_ID || '';
const fbPW = process.env.FACEBOOK_PW || '';
const FACEBOOK_DOMAIN = 'https://m.facebook.com';
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
        yield page.goto(FACEBOOK_DOMAIN);
        yield login_1.default(page, fbID, fbPW);
        const newFeeds = yield crawl_1.default(page);
        newFeeds.forEach(nf => {
            console.log(nf.url);
        });
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
        yield page.evaluate(`(async (isDev, interval) => {
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
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
