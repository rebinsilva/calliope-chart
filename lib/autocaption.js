'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _sentencer = require('./sentencer');
var _sentencer2 = _interopRequireDefault(_sentencer);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function AutoCaption(spec) {
    var factspec = spec.fact ? spec.fact : {};
    try {
        return (0, _sentencer2.default)(factspec);
    } catch (error) {
        return error;
    }
}
exports.default = AutoCaption;