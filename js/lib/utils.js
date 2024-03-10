const LOG_DATA_KEY = 'log';
const ROUNDING_UNIT_MINUTE_KEY = 'rounding_mins';

/**
 * String the current time
 *
 * @returns {string} "Y-m-d H:i:s"
 * @example getNowString() -> "2023-05-01"
 */
export function getTodayString() {
    var date = new Date();
    var yyyy = date.getFullYear().toString().padStart(4,"0");
    var mm = (date.getMonth() + 1).toString().padStart(2,"0");
    var dd = date.getDate().toString().padStart(2,"0");
    return `${yyyy}-${mm}-${dd}`;
}

/** indolence.js */
export const $$new=e=>document.createElement(e);
export const $$one=e=>document.querySelector(e);
export const $$all=e=>document.querySelectorAll(e);

/** The script name is converted to a hexadecimal hash */
export function getHash(scriptName) {
    var t = scriptName.split("").map(v => {
        t = 37 * t + v.charCodeAt(0)
    });
    const hash = "h" + t.toString(16).replace(/0+$/,"");
    return hash;
}
