import { Page } from 'puppeteer';
import { NewsFeed } from './db/model';
export default function (page: Page): Promise<NewsFeed[]>;
