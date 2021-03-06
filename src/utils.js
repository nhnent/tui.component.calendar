/**
 * @fileoverview Utils for calendar component
 * @author NHN Net. FE dev Lab <dl_javascript@nhnent.com>
 * @dependency tui-code-snippet ^1.0.2
 */

'use strict';

/**
 * Utils of calendar
 * @namespace calendarUtils
 * @ignore
 */
var utils = {
    /**
     * Return date hash by parameter.
     *  if there are 3 parameter, the parameter is corgnized Date object
     *  if there are no parameter, return today's hash date
     * @param {Date|number} [year] A date instance or year
     * @param {number} [month] A month
     * @param {number} [date] A date
     * @returns {{year: *, month: *, date: *}}
     */
    getDateHash: function(year, month, date) {
        var nDate;

        if (arguments.length < 3) {
            nDate = arguments[0] || new Date();

            year = nDate.getFullYear();
            month = nDate.getMonth() + 1;
            date = nDate.getDate();
        }

        return {
            year: year,
            month: month,
            date: date
        };
    },

    /**
     * Return today that saved on component or create new date.
     * @function getToday
     * @returns {{year: *, month: *, date: *}}
     */
    getToday: function() {
        return utils.getDateHash();
    },

    /**
     * Get weeks count by paramenter
     * @param {number} year A year
     * @param {number} month A month
     * @returns {number} 주 (4~6)
     **/
    getWeeks: function(year, month) {
        var firstDay = this.getFirstDay(year, month),
            lastDate = this.getLastDate(year, month);

        return Math.ceil((firstDay + lastDate) / 7);
    },

    /**
     * Get unix time from date hash
     * @param {Object} date A date hash
     * @param {number} date.year A year
     * @param {number} date.month A month
     * @param {number} date.date A date
     * @returns {number}
     * @example
     * utils.getTime({year:2010, month:5, date:12}); // 1273590000000
     **/
    getTime: function(date) {
        return this.getDateObject(date).getTime();
    },

    /**
     * Get which day is first by parameters that include year and month information.
     * @param {number} year A year
     * @param {number} month A month
     * @returns {number} (0~6)
     **/
    getFirstDay: function(year, month) {
        return new Date(year, month - 1, 1).getDay();
    },

    /**
     * Get which day is last by parameters that include year and month information.
     * @param {number} year A year
     * @param {number} month A month
     * @returns {number} (0~6)
     **/
    getLastDay: function(year, month) {
        return new Date(year, month, 0).getDay();
    },

    /**
     * Get last date by parameters that include year and month information.
     * @param {number} year A year
     * @param {number} month A month
     * @returns {number} (1~31)
     **/
    getLastDate: function(year, month) {
        return new Date(year, month, 0).getDate();
    },

    /**
     * Get date instance.
     * @param {Object} date A date hash
     * @returns {Date} Date
     * @example
     *  calendarUtils.getDateObject({year:2010, month:5, date:12});
     *  calendarUtils.getDateObject(2010, 5, 12); //year,month,date
     **/
    getDateObject: function(date) {
        if (arguments.length === 3) {
            return new Date(arguments[0], arguments[1] - 1, arguments[2]);
        }

        return new Date(date.year, date.month - 1, date.date);
    },

    /**
     * Get related date hash with parameters that include date information.
     * @param {number} year A related value for year(you can use +/-)
     * @param {number} month A related value for month (you can use +/-)
     * @param {number} date A related value for day (you can use +/-)
     * @param {Object} dateObj standard date hash
     * @returns {Object} dateObj
     * @example
     *  calendarUtils.getRelativeDate(1, 0, 0, {year:2000, month:1, date:1}); // {year:2001, month:1, date:1}
     *  calendarUtils.getRelativeDate(0, 0, -1, {year:2010, month:1, date:1}); // {year:2009, month:12, date:31}
     **/
    getRelativeDate: function(year, month, date, dateObj) {
        var nYear = (dateObj.year + year),
            nMonth = (dateObj.month + month - 1),
            nDate = (dateObj.date + date),
            nDateObj = new Date(nYear, nMonth, nDate);

        return utils.getDateHash(nDateObj);
    },

    /**
     * Chagne number 0~9 to '00~09'
     * @param {number} number number
     * @returns {string}
     * @example
     *  calendarUtils.prependLeadingZero(0); //  '00'
     *  calendarUtils.prependLeadingZero(9); //  '09'
     *  calendarUtils.prependLeadingZero(12); //  '12'
     */
    prependLeadingZero: function(number) {
        var prefix = '';

        if (number < 10) {
            prefix = '0';
        }

        return prefix + number;
    },

    /**
     * Chage text and return.
     * @param {string} str A text to chagne
     * @param {Object} map A chagne key, value set
     * @param {RegExp} reg A regExp to chagne
     * @returns {string}
     */
    getConvertedTitle: function(str, map, reg) {
        str = str.replace(reg, function(matchedString) {
            return map[matchedString] || '';
        });

        return str;
    }
};

module.exports = utils;
