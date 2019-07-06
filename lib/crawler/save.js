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
const db_1 = require("../db");
function default_1(newsFeeds) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((res) => __awaiter(this, void 0, void 0, function* () {
            const db = yield db_1.getDatabse();
            const count = newsFeeds.length;
            let runCount = 1;
            let savedCount = 0;
            for (let i = 0; i < count; i++) {
                console.log(newsFeeds[i].url);
                db.insert(newsFeeds[i])
                    .then(saved => {
                    if (saved) {
                        savedCount++;
                    }
                }).catch(e => {
                    console.log('insert error: ', e);
                }).finally(() => {
                    if (runCount == count) {
                        res(savedCount);
                    }
                    else {
                        runCount++;
                    }
                });
            }
        }));
    });
}
exports.default = default_1;
