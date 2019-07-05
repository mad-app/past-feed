import { Page } from 'puppeteer';
import { NewsFeed } from './crawlTypes';
export default function (page: Page): Promise<NewsFeed[]>;
