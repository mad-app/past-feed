import nano from 'nano';
export interface BaseNewsFeed extends nano.MaybeDocument {
    url: string;
    processAPIResponse(response: nano.DocumentInsertResponse): void;
}
export declare class NewsFeed implements BaseNewsFeed {
    _id: string;
    _rev?: string;
    url: string;
    rawUrl: string;
    read: boolean;
    constructor(url: string);
    processAPIResponse(response: nano.DocumentInsertResponse): void;
}
