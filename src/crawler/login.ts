import { Page } from 'puppeteer'

export default async function (page: Page, id: string, pw: string): Promise<Page> {
    try {
        await page.type('#m_login_email', id);
        const pwTag = '#m_login_password';
        try {
            await page.type(pwTag, pw);
            await page.click('#u_0_5');
        } catch (e) {
            delayPasswordInputAction(page, pwTag, pw)
        }

        await clickLogInWithOneTapSaveNotNow(page)
    } catch (e) {
        console.log('saved login info')
    }

    return page;
}

async function delayPasswordInputAction(page: Page, pwTag: string, pw:string){
    const emailLogin = '#login_form > div._2pie > div:nth-child(1) > button';
    await page.waitForSelector(emailLogin)
    await page.click(emailLogin)

    await page.waitForSelector(pwTag)
    await page.type(pwTag, pw);
    await page.click('#u_0_6');
}


// Log In With One Tap Save - Not Now
async function clickLogInWithOneTapSaveNotNow(page: Page) {
    const notNowTag = '#root > div._7om2 > div > div > div._7om2._2pip > div:nth-child(1) > div > div';

    await page.waitForSelector(notNowTag)
    await page.click(notNowTag);

}