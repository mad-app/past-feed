"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = __importDefault(require("url"));
const querystring_1 = __importDefault(require("querystring"));
const PARAMS = ["view", "id", "story_fbid", "bid"];
function parseUrl(url) {
    const parsed = url_1.default.parse(url);
    const parseQueries = querystring_1.default.parse(`${parsed.query}`);
    const queries = PARAMS
        .filter(p => !!parseQueries[p])
        .map(p => `${p}=${parseQueries[p]}&`)
        .join('');
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}?${queries}`;
}
class NewsFeed {
    constructor(url) {
        this.rawUrl = url;
        this.url = parseUrl(url);
        this._id = this.url;
        this._rev = undefined;
        this.read = false;
        let d = new Date();
        this.datetime = d.getTime();
    }
    processAPIResponse(response) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}
exports.NewsFeed = NewsFeed;
