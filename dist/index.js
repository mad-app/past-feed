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
            slowMo: 250,
            devtools: true,
        });
        const page = yield browser.newPage();
        yield page.goto('https://facebook.com');
        yield page.type('#email', fbID);
        yield page.type('#pass', fbPW);
        yield page.click('#u_0_2');
        // await browser.close();
    });
}
exports.run = run;
