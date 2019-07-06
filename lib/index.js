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
const save_1 = __importDefault(require("./save"));
dotenv_1.config();
console.log('id', process.env.DATABASE_ID);
const FB_ID = process.env.FACEBOOK_ID || '';
const FB_PW = process.env.FACEBOOK_PW || '';
const IS_DEV = (process.env.DEV || "false") == "true";
const FACEBOOK_DOMAIN = 'https://m.facebook.com';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const devArgs = {
            args: IS_DEV ?
                [] :
                ['--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage']
        };
        const browser = yield puppeteer_1.default.launch(Object.assign({ headless: !IS_DEV, slowMo: 10, devtools: true, userDataDir: "./user_data" }, devArgs));
        const page = yield browser.newPage();
        yield page.setViewport({
            width: 1200,
            height: 800
        });
        yield page.goto(FACEBOOK_DOMAIN);
        yield login_1.default(page, FB_ID, FB_PW);
        const newsFeeds = yield crawl_1.default(page);
        console.log("newsFeeds! ", newsFeeds.length);
        const saveNewsFeedCount = yield save_1.default(newsFeeds);
        console.log("save! ", saveNewsFeedCount);
        // await page.
        yield browser.close();
    });
}
exports.run = run;
