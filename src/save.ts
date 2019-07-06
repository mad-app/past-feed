import { NewsFeed } from "./db/model";
import { getDatabse } from "./db";

export default async function (newsFeeds: NewsFeed[]) {
    return new Promise(async (res) => {
        const db = await getDatabse();

        const count = newsFeeds.length;
        let runCount = 1;
        let savedCount = 0;
        for (let i = 0; i < count; i++) {
            db.insert(newsFeeds[i]).then(saved => {
                if (saved) {
                    savedCount++;
                }
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