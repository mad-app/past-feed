"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(page, id, pw) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.type('#m_login_email', id);
        const pwTag = '#m_login_password';
        try {
            yield page.type(pwTag, pw);
            yield page.click('#u_0_5');
        }
        catch (e) {
            const emailLogin = '#login_form > div._2pie > div:nth-child(1) > button';
            yield page.waitForSelector(emailLogin);
            yield page.click(emailLogin);
            yield page.waitForSelector(pwTag);
            yield page.type(pwTag, pw);
            yield page.click('#u_0_6');
        }
        return page;
    });
}
exports.default = default_1;
