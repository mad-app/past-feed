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
const nano_1 = __importDefault(require("nano"));
const dotenv_1 = require("dotenv");
const DB_NAME = "past-feed";
dotenv_1.config();
const DATABASE_ID = process.env.DATABASE_ID || 'admin';
const DATABASE_PW = process.env.DATABASE_PW || 'password';
const DATABASE_URL = process.env.DATABASE_URL || 'localhost:5984';
const couch = nano_1.default(`http://${DATABASE_ID}:${DATABASE_PW}@${DATABASE_URL}`);
const couchDB = couch.db;
class CouchDB {
    constructor() {
        this.setup = () => __awaiter(this, void 0, void 0, function* () {
            const list = yield couchDB.list();
            if (!list.includes(DB_NAME)) {
                couchDB.create(DB_NAME);
            }
        });
        this.insert = (document) => __awaiter(this, void 0, void 0, function* () {
            const db = couchDB.use(DB_NAME);
            try {
                const response = yield db.insert(document);
                if (response.ok) {
                    document.processAPIResponse(response);
                }
                return response.ok;
            }
            catch (e) {
                return false;
            }
        });
    }
}
exports.CouchDB = CouchDB;
