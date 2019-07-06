"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../db/model");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const IS_DEV = process.env.DEV == "true" || false;
function default_1(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.waitFor('#u_0_w'); //my profile
        yield autoScroll(page);
        // NOTE: Theree is one more div in the internal post.
        //#u_s_c > div > div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a
        const postATagSelector = 'div > header > div._4g34._5i2i._52we > div > div > div._4g34 > div > a';
        const postATags = yield page.$$(postATagSelector);
        const newsFeeds = [];
        for (let i = 1; i < postATags.length; i++) {
            const aTag = postATags[i];
            const tags = yield page.evaluate(e => e.href, aTag);
            const newFeed = new model_1.NewsFeed(tags);
            newsFeeds.push(newFeed);
        }
        return newsFeeds;
    });
}
exports.default = default_1;
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

                if(totalHeight >= scrollHeight || (isDev && totalHeight >= 6000)){
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
