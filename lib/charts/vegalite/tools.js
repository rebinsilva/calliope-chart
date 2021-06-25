'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAggregate = exports.getVegaFieldType = undefined;
var _fieldtype = require('../../visualization/fieldtype');
var _fieldtype2 = _interopRequireDefault(_fieldtype);
var _aggregationtype = require('../../visualization/aggregationtype');
var _aggregationtype2 = _interopRequireDefault(_aggregationtype);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function getVegaFieldType(type) {
    switch (type) {
        case _fieldtype2.default.NUMERICAL:
            return "quantitative";
        case _fieldtype2.default.CATEGORICAL:
        case _fieldtype2.default.GEOGRAPHICAL:
            return "nominal";
        case _fieldtype2.default.TEMPORAL:
            return "temporal";
        default:
            return type;
    }
}

function getAggregate(type) {
    switch (type) {
        case _aggregationtype2.default.AVG:
            return "average";
        default:
            return type;
    }
}
exports.getVegaFieldType = getVegaFieldType;
exports.getAggregate = getAggregate;