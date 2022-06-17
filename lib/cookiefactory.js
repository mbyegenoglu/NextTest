import { checkCookies, getCookie, setCookies } from 'cookies-next';
import requestIp from 'request-ip';
import { v4 as uuidv4 } from 'uuid';

class Cookiefactory {

    GetCookies (req, res) {

        let cookieData = { 
            hostaddress: process.env.hostaddress 
        };
        let serverSide = !!req;

        if (serverSide) {
            if (checkCookies("uniqueid", { req, res }) && getCookie("uniqueid", { req, res }) != "") {
                cookieData.uniqueId = getCookie("uniqueid", { req, res });
            } else {
                cookieData.uniqueId = uuidv4();
            }
            cookieData.ip = requestIp.getClientIp(req);
            if (checkCookies("locale", { req, res })) {
                cookieData.locale = getCookie("locale", { req, res });
            }
            if (checkCookies("money", { req, res })) {
                cookieData.money = getCookie("money", { req, res });
            }
            if (checkCookies("language", { req, res })) {
                cookieData.language = getCookie("language", { req, res });
            }
        } else {
            if (checkCookies("uniqueid") && getCookie("uniqueid") != "") {
                cookieData.uniqueId = getCookie("uniqueid");
            }
            if (checkCookies("locale")) {
                cookieData.locale = getCookie("locale");
            }
            if (checkCookies("money")) {
                cookieData.money = getCookie("money");
            }
            if (checkCookies("language")) {
                cookieData.language = getCookie("language");
            }
        }
        
        return cookieData;
    }

    SetCookies (headers, req, res) {
        let serverSide = !!res;
        if (serverSide) {
            if (headers.hasOwnProperty("currentUniqueId")) {
                if (headers.currentUniqueId != "") {
                    setCookies("uniqueid", headers.currentUniqueId, { req, res, maxAge: 60 * 60 * 72 });
                }
            } else {
                setCookies("uniqueid", uuidv4(), { req, res });
            }
            if (headers.hasOwnProperty("currentLocale")) {
                setCookies("locale", headers.currentLocale, { req, res, maxAge: 60 * 60 * 72 });
            }
            if (headers.hasOwnProperty("currentMoney")) {
                setCookies("money", headers.currentMoney, { req, res, maxAge: 60 * 60 * 72 });
            }
            if (headers.hasOwnProperty("currentLang")) {
                setCookies("language", headers.currentLang, { req, res, maxAge: 60 * 60 * 72 });
            }
        } else {
            if (headers.hasOwnProperty("currentUniqueId")) {
                if (headers.currentUniqueId != "") {
                    setCookies("uniqueid", headers.currentUniqueId, { maxAge: 60 * 60 * 72 });
                }
            }
            if (headers.hasOwnProperty("currentLocale")) {
                setCookies("locale", headers.currentLocale, { maxAge: 60 * 60 * 72 });
            }
            if (headers.hasOwnProperty("currentMoney")) {
                setCookies("money", headers.currentMoney, { maxAge: 60 * 60 * 72 });
            }
            if (headers.hasOwnProperty("currentLang")) {
                setCookies("language", headers.currentLang, { maxAge: 60 * 60 * 72 });
            } 
        }
    }

    SetToken(tokenResult, req, res) {
        let serverSide = !!res;
        if (serverSide) {
            setCookies("bnt", tokenResult.accessToken, { req, res, maxAge: tokenResult.expires });
        } else {
            setCookies("bnt", tokenResult.accessToken, { maxAge: tokenResult.expires });
        }
    }

    GetToken(req, res) {
        let serverSide = !!req;
        if (serverSide) {
            if (checkCookies("bnt", {req, res})) {
                return getCookie("bnt", {req, res});
            } else {
                return null;
            }
        } else {
            if (checkCookies("bnt")) {
                return getCookie("bnt");
            } else {
                return null;
            }
        }
    }
}

export default Cookiefactory;