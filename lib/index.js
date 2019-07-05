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
const fbID = process.env.FACEBOOK_ID || '';
const fbPW = process.env.FACEBOOK_PW || '';
const FACEBOOK_DOMAIN = 'https://m.facebook.com';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({
            headless: false,
            slowMo: 10,
            devtools: true,
            userDataDir: "./user_data"
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
        yield browser.close();
    });
}
exports.run = run;
