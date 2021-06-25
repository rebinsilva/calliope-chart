'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = function(fact) {
    var template = (0, _factTemplates2.default)(fact);
    var aggregate = _aggregationtype2.default.NONE;
    if (fact.measure.length > 0) {
        aggregate = fact.measure[0].aggregate;
    }
    switch (fact.type) {
        case _facttype2.default.Association:
            template = template.replace("{{measure1}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{measure2}}", convertMeasure(fact.measure[1].field));
            template = template.replace("{{agg1}}", convertAggregation(fact.measure[0].aggregate));
            template = template.replace("{{agg2}}", convertAggregation(fact.measure[1].aggregate));
            template = genFactSubspace(fact, template);
            if (fact.parameter !== '') {
                template = template.replace("{{parameter}}", formatNum(fact.parameter.toFixed(3)));
            }
            break;
        case _facttype2.default.Categorization:
            template = template.replace("{{groupby}}s", convertGroupby(fact.breakdown, 'plural'));
            template = template.replace("{{groupby}}s", convertGroupby(fact.breakdown, 'plural'));
            template = genFactSubspace(fact, template);
            if (fact.parameter.length) {
                template = template.replace("{{parameter}}", formatNum(fact.parameter.length));
                var parameterList = '';
                fact.parameter.forEach(function(d, i) {
                    parameterList += (i === 0 ? '' : ',') + ' ' + d;
                });
                template = template.replace(" {{no.1}}, {{no.2}}, {{no.3}}", parameterList);
            }
            if (fact.focus.length) {
                if (template.indexOf(". {{focus}}") > -1) {
                    var focusValue = fact.focus[0].value.slice(0, 1).toUpperCase() + fact.focus[0].value.slice(1);
                    template = template.replace("{{focus}}", focusValue);
                } else {
                    template = template.replace("{{focus}}", fact.focus[0].value);
                }
            } else {
                template = template.replace(", and {{focus}} needs to pay attention", "");
                template = template.replace(", among which {{focus}} needs to pay attention", "");
                template = template.replace(". {{focus}} needs to pay attention", "");
            }
            break;
        case _facttype2.default.Difference:
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{agg}}", convertAggregation(aggregate));
            if (fact.focus.length >= 2) {
                template = template.replace("{{focus1}}", fact.focus[0].value);
                template = template.replace("{{focus2}}", fact.focus[1].value);
            }
            template = genFactSubspace(fact, template);
            if (fact.parameter !== '') template = template.replace("{{parameter}}", formatNum(fact.parameter));
            break;
        case _facttype2.default.Distribution:
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{agg}}", convertAggregation(aggregate));
            template = template.replace("{{groupby}}s", convertGroupby(fact.breakdown, 'plural'));
            template = template.replace("{{groupby}}", convertGroupby(fact.breakdown));
            template = genFactSubspace(fact, template);
            if (fact.focus.length) {
                template = template.replace("{{focus}}", fact.focus[0].value);
            } else {
                template = template.replace(" and {{focus}} needs to pay attention", "");
            }
            break;
        case _facttype2.default.Extreme:
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{agg}}", convertAggregation(aggregate));
            template = template.replace("{{groupby}}s", convertGroupby(fact.breakdown, 'plural'));
            template = template.replace("{{groupby}}", convertGroupby(fact.breakdown));
            template = template.replace("{{groupby}}", convertGroupby(fact.breakdown));
            template = genFactSubspace(fact, template);
            if (fact.parameter.length) {
                template = template.replace("{{parameter[0]}}", fact.focus[0].value);
                template = template.replace("{{parameter[1]}}", formatNum(fact.parameter[1]));
                template = template.replace("{{focus}}", fact.parameter[2]);
            }
            break;
        case _facttype2.default.Outlier:
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{groupby}}s", convertGroupby(fact.breakdown, 'plural'));
            template = template.replace("{{agg}}", convertAggregation(aggregate));
            template = genFactSubspace(fact, template);
            if (fact.focus.length) template = template.replace("{{focus}}", fact.focus[0].value);
            break;
        case _facttype2.default.Proportion:
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{agg}}", convertAggregation(aggregate));
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{agg}}", convertAggregation(aggregate));
            template = genFactSubspace(fact, template);
            if (fact.focus.length) template = template.replace("{{focus}}", fact.focus[0].value);
            if (fact.parameter) template = template.replace("{{parameter}}", fact.parameter);
            break;
        case _facttype2.default.Rank:
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{agg}}", convertAggregation(aggregate));
            template = template.replace("{{groupby}}s", convertGroupby([fact.breakdown[fact.breakdown.length - 1]], 'plural'));
            template = template.replace("{{groupby}}s", convertGroupby(fact.breakdown, 'plural'));
            template = genFactSubspace(fact, template);
            if (fact.parameter.length >= 3) {
                template = template.replace("{{parameter}}", formatNum(fact.parameter.length));
                template = template.replace("{{no.1}}", fact.parameter[0]);
                template = template.replace("{{no.2}}", fact.parameter[1]);
                if (fact.parameter.length === 3) {
                    template = template.replace("{{no.3}}", fact.parameter[2]);
                } else if (fact.parameter.length > 3) {
                    template = template.replace("{{no.3}}", fact.parameter[2]);
                } else if (fact.parameter.length === 2) {
                    template = template.replace(", {{no.3}}", '');
                }
            } else {
                template = '';
            }
            break;
        case _facttype2.default.Trend:
            var temporalBreakdown = fact.breakdown.find(function(d) {
                return d.type === 'temporal';
            });
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{agg}}", convertAggregation(aggregate));
            template = template.replace("{{groupby}}s", convertGroupby([temporalBreakdown], 'plural'));
            template = genFactSubspace(fact, template);
            if (fact.parameter) {
                template = template.replace("{{parameter}}", fact.parameter);
                if (fact.parameter === 'increasing') {
                    template = template.replace("a/an", 'an');
                } else {
                    template = template.replace("a/an", 'a');
                }
            }
            if (fact.focus.length) {
                template = template.replace("{{focus}}", fact.focus[0].value);
            } else {
                template = template.replace(" and the value of {{focus}} needs to pay attention", "");
            }
            break;
        case _facttype2.default.Value:
            template = template.replace("{{measure}}", convertMeasure(fact.measure[0].field));
            template = template.replace("{{agg}}", convertAggregation(aggregate));
            template = genFactSubspace(fact, template);
            if (fact.focus.length) template = template.replace("{{focus}}", fact.focus[0].value);
            if (fact.parameter !== '') template = template.replace("{{parameter}}", formatNum(fact.parameter));
            break;
        default:
            break;
    }
    template = template.slice(0, 1).toUpperCase() + template.slice(1);
    return template;
};
var _factTemplates = require('./fact-templates');
var _factTemplates2 = _interopRequireDefault(_factTemplates);
var _facttype = require('../visualization/facttype');
var _facttype2 = _interopRequireDefault(_facttype);
var _aggregationtype = require('../visualization/aggregationtype');
var _aggregationtype2 = _interopRequireDefault(_aggregationtype);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var irregularPluralsJSON = require('./irregular-plurals.json');
var irregularPlurals = new Map(Object.entries(irregularPluralsJSON));
var plur = function plur(word, plural, count) {
    if (typeof plural === 'number') {
        count = plural;
    }
    if (irregularPlurals.has(word.toLowerCase())) {
        plural = irregularPlurals.get(word.toLowerCase());
        var firstLetter = word.charAt(0);
        var isFirstLetterUpperCase = firstLetter === firstLetter.toUpperCase();
        if (isFirstLetterUpperCase) {
            plural = firstLetter.toUpperCase() + plural.slice(1);
        }
        var isWholeWordUpperCase = word === word.toUpperCase();
        if (isWholeWordUpperCase) {
            plural = plural.toUpperCase();
        }
    } else if (typeof plural !== 'string') {
        plural = (word.replace(/(?:s|x|z|ch|sh)$/i, '$&e').replace(/([^aeiou])y$/i, '$1ie') + 's').replace(/i?e?s$/i, function(match) {
            var isTailLowerCase = word.slice(-1) === word.slice(-1).toLowerCase();
            return isTailLowerCase ? match.toLowerCase() : match.toUpperCase();
        });
    }
    return Math.abs(count) === 1 ? word : plural;
};
var convertAggregation = function convertAggregation(aggType) {
    switch (aggType) {
        case _aggregationtype2.default.SUM:
            return 'total';
        case _aggregationtype2.default.MAX:
            return 'maximum';
        case _aggregationtype2.default.MIN:
            return 'minimum';
        case _aggregationtype2.default.AVG:
            return 'average';
        case _aggregationtype2.default.COUNT:
            return 'count';
        case _aggregationtype2.default.NONE:
            return '';
        default:
            return 'total'; // break;
    }
};
var convertMeasure = function convertMeasure(measure) {
    if (measure === "COUNT" || !measure) return "";
    else return measure.toLowerCase();
};
var convertGroupby = function convertGroupby(groupby) {
    var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'single';
    var gb = groupby[0].field;
    if (param === 'single') return gb.toLowerCase();
    else if (param === 'plural') {
        if (gb.indexOf(' of ') !== -1) {
            var gbWords = gb.split(" ");
            var gbWordIndex = gbWords.indexOf("of") - 1;
            if (gbWordIndex > -1) {
                var plurWord = plur(gbWords[gbWordIndex], 2);
                return gb.replace(gbWords[gbWordIndex], plurWord);
            }
        } else return plur(gb, 2).toLowerCase();
    }
}; // for value/difference/categorization
var formatNum = function formatNum(num) {
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
var genFactSubspace = function genFactSubspace(fact, template) {
    var subspace = '';
    if (fact.subspace.length) {
        fact.subspace.map(function(key, i) {
            return subspace += (i === 0 ? '' : ' and ') + 'the ' + key.field + ' is ' + key.value;
        });
        template = template.replace("{{subspace}}", subspace);
    } else {
        template = template.replace(", when {{subspace}}", '');
        template = template.replace(" when {{subspace}}", '');
        template = template.replace(" in case of {{subspace}}", '');
        template = template.replace(" given {{subspace}}", '');
        template = template.replace("When {{subspace}}, ", '');
        template = template.replace("Given {{subspace}}, ", '');
        template = template.replace("In case of {{subspace}}, ", '');
    }
    return template;
};