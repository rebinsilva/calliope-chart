'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _facttype = require('../visualization/facttype');
var _facttype2 = _interopRequireDefault(_facttype);
var _charttype = require('../visualization/charttype');
var _charttype2 = _interopRequireDefault(_charttype);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var fact2chart = function fact2chart(fact) {
    switch (fact.type) {
        case _facttype2.default.Association:
            return _charttype2.default.SCATTER_PLOT;
        case _facttype2.default.Categorization:
            return _charttype2.default.BUBBLE_CHART;;
        case _facttype2.default.Difference:
            return _charttype2.default.VERTICAL_BAR_CHART;
        case _facttype2.default.Distribution:
            return _charttype2.default.VERTICAL_BAR_CHART;
        case _facttype2.default.Extreme:
            return _charttype2.default.VERTICAL_BAR_CHART;
        case _facttype2.default.Outlier:
            return _charttype2.default.VERTICAL_BAR_CHART;
        case _facttype2.default.Proportion:
            return _charttype2.default.PIE_CHART;
        case _facttype2.default.Rank:
            return _charttype2.default.HORIZENTAL_BAR_CHART;
        case _facttype2.default.Trend:
            return _charttype2.default.LINE_CHART;
        case _facttype2.default.Value:
            return _charttype2.default.TEXT_CHART;
        default:
            return _charttype2.default.VERTICAL_BAR_CHART;;
    }
};
exports.default = fact2chart;