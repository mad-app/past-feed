import { NewsFeed } from "../db/model";
import { getDatabse } from "../db";

export default async function (newsFeeds: NewsFeed[]) {
    return new Promise(async (res) => {
        const db = await getDatabse();

        const count = newsFeeds.length;
        let runCount = 1;
        let savedCount = 0;
        for (let i = 0; i < count; i++) {
            console.log(newsFeeds[i].url)
            db.insert(newsFeeds[i])
                .then(saved => {
                    if (saved) {
                        savedCount++;
                    }
                }).catch(e => {
                    console.log('insert error: ', e)
                }).finally(() => {
                    if (runCount == count) {
                        res(savedCount)
                    } else {
                        runCount++;
                    }
                });
        }
    })
}