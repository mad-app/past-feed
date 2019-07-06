import { BaseNewsFeed } from './model';
export declare class CouchDB {
    setup: () => Promise<void>;
    insert: (document: BaseNewsFeed) => Promise<boolean>;
}
