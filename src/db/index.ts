import { CouchDB } from './couchdb'

async function getDatabse() {
    const db = new CouchDB
    await db.setup()
    return db
}

export { getDatabse }