import nano from 'nano'

export interface BaseNewsFeed extends nano.MaybeDocument {
  url: string
  processAPIResponse(response: nano.DocumentInsertResponse): void
}

export class NewsFeed implements BaseNewsFeed {
    _id: string
    _rev?: string
    url: string
    read: boolean

    constructor(url: string) {
        this.url = url
        this._id = url
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