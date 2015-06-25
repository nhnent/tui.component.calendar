/**
 * 캘린더 유틸성 함수들
 *
 * @author NHN ENTERTAINMENT FE 개발팀(e0242@nhnent.com)
 * @author FE개발팀 이제인
 * @author FE개발팀 이민규 (minkyu.yi@nhnent.com) - 2015, 6, 3
 * @dependency ne-code-snippet ~1.0.2
 */

'use strict';

ne.util.defineNamespace('ne.component.Calendar');

/**
 * Calendar Util 함수들을 모아둔 Object
 * @static
 * @module
 */
ne.component.Calendar.Util = {
    /**
     * 날짜 해시(년, 월, 일) 값을 만들어 리턴한다
     *  매개변수가 3개인 경우
     *      각 매개변수를 year, month, date 값으로 판단한다.
     *  매개변수가 1개인 경우
     *      year 값을 넘긴것이 아니라,
     *      Date 객체를 넘긴것으로 판단한다.
     *  매개변수가 0개인 경우
     *      오늘 날짜를 리턴한다.
     *
     * @function getDateHashTable
     * @param {Date|number} [year] 날짜 객체 또는 년도
     * @param {number} [month] 월
     * @param {number} [date] 일
     * @returns {{year: *, month: *, date: *}} 날짜 해시
     */
    getDateHashTable: function(year, month, date) {
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
     * 컨퍼넌트에 저장된 현재날짜를 돌려준다
     * 현재 날짜가 없을 시, 로컬시간 기준으로 새로 생성하여 돌려준다.
     * @function getToday
     * @returns {{year: *, month: *, date: *}} 날짜 해시
     */
    getToday: function() {
       return ne.component.Calendar.Util.getDateHashTable();
    },

    /**
     * 해당 연월의 주의 수를 구한다.
     * @function getWeeks
     * @param {number} year 년
     * @param {number} month 월
     * @return {number} 주 (4~6)
     **/
    getWeeks: function(year, month) {
        var firstDay = this.getFirstDay(year, month),
            lastDate = this.getLastDate(year, month);

        return Math.ceil((firstDay + lastDate) / 7);
    },

    /**
     * 연월일을 포함한 날짜 해시에서 유닉스타임을 구한다.
     * @function getTime
     * @param {Object} date 날짜 정보가 담긴 객체
     * @param {number} date.year 년
     * @param {number} date.month 월
     * @param {number} date.date 일
     * @return {number} 유닉스타임 정보
     * @example
     * ne.component.Calendar.Util.getTime({year:2010, month:5, date:12}); // 1273590000000
     **/
    getTime: function(date) {
        return this.getDateObject(date).getTime();
    },

    /**
     * 해당 연월의 첫번째 날짜의 요일을 구한다.
     * @function getFirstDay
     * @param {number} year 년
     * @param {number} month 월
     * @return {number} 요일 (0~6)
     **/
    getFirstDay: function(year, month) {
        return new Date(year, month - 1, 1).getDay();
    },

    /**
     * 해당 연월의 마지막 날짜의 요일을 구한다.
     * @function getLastDay
     * @param {number} year 년
     * @param {number} month 월
     * @return {number} 요일 (0~6)
     **/
    getLastDay: function(year, month) {
        return new Date(year, month, 0).getDay();
    },

    /**
     * 해당 연월의 마지막 날짜를 구한다.
     * @function
     * @param {number} year 년
     * @param {number} month 월
     * @return {number} 날짜 (1~31)
     **/
    getLastDate: function(year, month) {
        return new Date(year, month, 0).getDate();
    },

    /**
     * Date 객체를 구한다.
     * @function getDateObject
     * @param {Object} date 날짜 객체
     * @return {Date} Date 인스턴스
     * @example
     *  ne.component.Calendar.Util.getDateObject({year:2010, month:5, date:12});
     *  ne.component.Calendar.Util.getDateObject(2010, 5, 12); //연,월,일
     **/
    getDateObject: function(date) {
        if (arguments.length === 3) {
            return new Date(arguments[0], arguments[1] - 1, arguments[2]);
        }
        return new Date(date.year, date.month - 1, date.date);
    },

    /**
     * 연월일을 포함한 기준 날짜 해시에서 상대적인 날짜 해시를 구한다.
     * @function getRelativeDate
     * @param {number} year 상대적인 연도 (+/-로 정의)
     * @param {number} month 상대적인 월 (+/-로 정의)
     * @param {number} date 상대적인 일 (+/-로 정의)
     * @param {Object} dateObj 기준 날짜 해시
     * @return {Object} dateObj 결과 날짜 해시
     * @example
     *  ne.component.Calendar.Util.getRelativeDate(1, 0, 0, {year:2000, month:1, date:1}); // {year:2001, month:1, date:1}
     *  ne.component.Calendar.Util.getRelativeDate(0, 0, -1, {year:2010, month:1, date:1}); // {year:2009, month:12, date:31}
     **/
    getRelativeDate: function(year, month, date, dateObj) {
        var nYear = (dateObj.year + year),
            nMonth = (dateObj.month + month - 1),
            nDate = (dateObj.date + date),
            nDateObj = new Date(nYear, nMonth, nDate);

        return ne.component.Calendar.Util.getDateHashTable(nDateObj);
    }
};