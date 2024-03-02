"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakArrayIntoChuncksOf = exports.isEmpty = void 0;
const winston_logger_1 = require("./logger/winston_logger");
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const isEmpty = (value) => {
    if (value === null) {
        return true;
    }
    else if (typeof value !== 'number' && value === '') {
        return true;
    }
    else if (typeof value === 'undefined' || value === undefined) {
        return true;
    }
    else if (value !== null &&
        typeof value === 'object' &&
        !Object.keys(value).length) {
        return true;
    }
    else {
        return false;
    }
};
exports.isEmpty = isEmpty;
function breakArrayIntoChuncksOf(chunckSize, long_array) {
    winston_logger_1.logger.info('breaking array into smaller chuncks');
    const short_arrays = [];
    for (let i = 0; i < long_array.length; i += chunckSize) {
        short_arrays.push(long_array.slice(i, i + chunckSize));
    }
    winston_logger_1.logger.info(`Orignal Array length: ${long_array.length}`);
    winston_logger_1.logger.info(`Total chuncks created of orginal array: ${short_arrays.length}`);
    return short_arrays;
}
exports.breakArrayIntoChuncksOf = breakArrayIntoChuncksOf;
//# sourceMappingURL=helper.js.map