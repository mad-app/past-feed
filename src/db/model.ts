import nano from 'nano'
import URL from 'url'
import querystring from 'querystring'

const PARAMS = ["view", "id", "story_fbid", "bid"]

function parseUrl(url: string): string {
    const parsed = URL.parse(url);
    const parseQueries = querystring.parse(`${parsed.query}`)

    const queries = PARAMS
        .filter(p => !!parseQueries[p] )
        .map(p => `${p}=${parseQueries[p]}&`)
        .join('');

    return `${parsed.protocol}//${parsed.host}${parsed.pathname}?${queries}`;
}

export interface BaseNewsFeed extends nano.MaybeDocument {
    url: string
    processAPIResponse(response: nano.DocumentInsertResponse): void
}

export class NewsFeed implements BaseNewsFeed {

    _id: string
    _rev?: string
    url: string
    rawUrl: string
    read: boolean

    constructor(url: string) {
        this.rawUrl = url
        this.url = parseUrl(url)
        this._id = this.url
        this._rev = undefined
        this.read = false
    }

    processAPIResponse(response: nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id
            this._rev = response.rev
        }
    }

}