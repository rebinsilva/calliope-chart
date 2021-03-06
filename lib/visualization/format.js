"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var formatNumber = function formatNumber(num) {
    if (parseInt(num) !== num && num.toString().split(".").length > 1 && num.toString().split(".")[1].length > 2) {
        num = num.toFixed(2); //小数点后两位
    }
    num = (num || 0).toString();
    var number = 0,
        floatNum = '',
        intNum = '';
    if (num.indexOf('.') > 0) {
        number = num.indexOf('.');
        floatNum = num.substr(number);
        intNum = num.substring(0, number);
    } else {
        intNum = num;
    }
    var result = [],
        counter = 0;
    intNum = intNum.split('');
    for (var i = intNum.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(intNum[i]);
        if (!(counter % 3) && i !== 0) {
            result.unshift(',');
        }
    }
    return result.join('') + floatNum || '';
};
exports.default = formatNumber;