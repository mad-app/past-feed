import nano from 'nano'
import { BaseNewsFeed } from './model';
import { config } from 'dotenv';

const DB_NAME = "past-feed"

config();
const DATABASE_ID: string = process.env.DATABASE_ID || 'admin';
const DATABASE_PW: string = process.env.DATABASE_PW || 'password';
const DATABASE_URL: string = process.env.DATABASE_URL || 'localhost:5984';

const couch = nano(`http://${DATABASE_ID}:${DATABASE_PW}@${DATABASE_URL}`)
const couchDB = couch.db;

export class CouchDB {
    setup = async () => {
        const list = await couchDB.list();
        if(!list.includes(DB_NAME)) {
            console.log(`create ${DB_NAME} database`)
            await couchDB.create(DB_NAME)
        }
    }

    insert = async (document: BaseNewsFeed): Promise<boolean> => {
        const db = couchDB.use(DB_NAME)

        try {
            const response = await db.insert(document)
            if (response.ok) {
                document.processAPIResponse(response)
            }
            return response.ok
        } catch (e) {
            throw e
        }
    }
}
