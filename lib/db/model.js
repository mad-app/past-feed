"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NewsFeed {
    constructor(url) {
        this.url = url;
        this._id = url;
        this._rev = undefined;
        this.read = false;
    }
    processAPIResponse(response) {
        if (response.ok === true) {
            this._id = response.id;
            this._rev = response.rev;
        }
    }
}
exports.NewsFeed = NewsFeed;
