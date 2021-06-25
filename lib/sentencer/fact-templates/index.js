'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _facttype = require('../../visualization/facttype');
var _facttype2 = _interopRequireDefault(_facttype);
var _association = require('./association');
var _association2 = _interopRequireDefault(_association);
var _categorization = require('./categorization');
var _categorization2 = _interopRequireDefault(_categorization);
var _difference = require('./difference');
var _difference2 = _interopRequireDefault(_difference);
var _distribution = require('./distribution');
var _distribution2 = _interopRequireDefault(_distribution);
var _extreme = require('./extreme');
var _extreme2 = _interopRequireDefault(_extreme);
var _outlier = require('./outlier');
var _outlier2 = _interopRequireDefault(_outlier);
var _proportion = require('./proportion');
var _proportion2 = _interopRequireDefault(_proportion);
var _rank = require('./rank');
var _rank2 = _interopRequireDefault(_rank);
var _trend = require('./trend');
var _trend2 = _interopRequireDefault(_trend);
var _value = require('./value');
var _value2 = _interopRequireDefault(_value);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var templateCount = 3;
var pickFactTemplate = function pickFactTemplate(fact) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1; // pick randomly when id == -1
    var templates = [];
    switch (fact.type) {
        case _facttype2.default.Association:
            templates = _association2.default;
            break;
        case _facttype2.default.Categorization:
            templates = _categorization2.default;
            break;
        case _facttype2.default.Difference:
            templates = _difference2.default;
            break;
        case _facttype2.default.Distribution:
            templates = _distribution2.default;
            break;
        case _facttype2.default.Extreme:
            templates = _extreme2.default;
            break;
        case _facttype2.default.Outlier:
            templates = _outlier2.default;
            break;
        case _facttype2.default.Proportion:
            templates = _proportion2.default;
            break;
        case _facttype2.default.Rank:
            templates = _rank2.default;
            break;
        case _facttype2.default.Trend:
            templates = _trend2.default;
            break;
        case _facttype2.default.Value:
            templates = _value2.default;
            break;
        default:
            break;
    }
    if (id === -1) {
        id = Math.floor(Math.random() * 10) % templateCount;
    }
    if (fact.breakdown.length >= 2 && (fact.type === _facttype2.default.Trend || fact.type === _facttype2.default.Rank)) id = 3;
    var sentence = '';
    try {
        sentence = templates[id].template;
    } catch (error) {
        console.error(error);
        console.log('wrong id:' + id);
    }
    return sentence;
};
exports.default = pickFactTemplate;