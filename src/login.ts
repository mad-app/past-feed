import { Page } from 'puppeteer'

export default async function (page: Page, id: string, pw: string): Promise<Page> {
    await page.type('#m_login_email', id);
    const pwTag = '#m_login_password';
    try {
        await page.type(pwTag, pw);
        await page.click('#u_0_5');
    } catch (e) {
        const emailLogin = '#login_form > div._2pie > div:nth-child(1) > button';
        await page.waitForSelector(emailLogin)
        await page.click(emailLogin)

        await page.waitForSelector(pwTag)
        await page.type(pwTag, pw);
        await page.click('#u_0_6');
    }
    
    return page;
}