'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var _d = require('d3');
var d3 = _interopRequireWildcard(_d);
var _size = require('./visualization/size');
var _size2 = _interopRequireDefault(_size);
var _style = require('./visualization/style');
var _style2 = _interopRequireDefault(_style);
var _facttype = require('./visualization/facttype');
var _facttype2 = _interopRequireDefault(_facttype);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var Chart = function() {
    function Chart() {
        _classCallCheck(this, Chart);
        this._container = document.createElement("div");
        this._style = _style2.default.BUSINESS;
        this._size = _size2.default.LARGE;
        this._width = 0;
        this._height = 0;
        this._table = [];
        this._factdata = [];
        this._subspace = [];
        this._measure = [];
        this._breakdown = [];
        this._focus = [];
        this._duration = 0;
        this._showSuggestion = false; // When true, it will show the suggestion that whether the chart supports the data.
    }
    _createClass(Chart, [{
        key: 'container',
        value: function container(value) {
            if (!value) {
                d3.select(this._container).selectAll("*").remove();
                return this._container;
            }
            this._container = value;
        }
    }, {
        key: 'style',
        value: function style(value) {
            if (!value) {
                return this._style;
            }
            this._style = value;
        }
    }, {
        key: 'size',
        value: function size(value) {
            if (!value) {
                return this._size;
            }
            this._size = value;
        }
    }, {
        key: 'width',
        value: function width(value) {
            if (!value) {
                if (this._width !== 0 && this._width !== '') {
                    return this._width;
                } else {
                    switch (this.size()) {
                        case _size2.default.LARGE:
                            return 640;
                        case _size2.default.WIDE:
                            return 560;
                        case _size2.default.MIDDLE:
                            return 360;
                        case _size2.default.SMALL:
                            return 235;
                        default:
                            return 640;
                    }
                }
            }
            this._width = value;
        }
    }, {
        key: 'height',
        value: function height(value) {
            if (!value) {
                if (this._height !== 0 && this._height !== '') {
                    return this._height;
                } else {
                    switch (this.size()) {
                        case _size2.default.LARGE:
                            return 640;
                        case _size2.default.WIDE:
                            return 220;
                        case _size2.default.MIDDLE:
                            return 200;
                        case _size2.default.SMALL:
                            return 150;
                        default:
                            return 640;
                    }
                }
            }
            this._height = value;
        }
    }, {
        key: 'table',
        value: function table(value) {
            if (!value) {
                return this._table;
            }
            this._table = value;
        }
    }, {
        key: 'factdata',
        value: function factdata(value) {
            if (!value) {
                return this._factdata;
            }
            this._factdata = value;
        }
    }, {
        key: 'subspace',
        value: function subspace(value) {
            if (!value) {
                return this._subspace;
            }
            this._subspace = value;
        }
    }, {
        key: 'measure',
        value: function measure(value) {
            if (!value) {
                return this._measure;
            }
            this._measure = value;
        }
    }, {
        key: 'breakdown',
        value: function breakdown(value) {
            if (!value) {
                return this._breakdown;
            }
            this._breakdown = value;
        }
    }, {
        key: 'focus',
        value: function focus(value) {
            if (!value) {
                return this._focus;
            }
            this._focus = value;
        }
    }, {
        key: 'duration',
        value: function duration(value) {
            if (!value) {
                return this._duration;
            }
            this._duration = value;
        }
    }, {
        key: 'showSuggestion',
        value: function showSuggestion(value) {
            if (!value) {
                return this._showSuggestion;
            }
            this._showSuggestion = value;
        }
    }, {
        key: 'display',
        value: function display(type) {
            var svg = void 0;
            switch (type) {
                case _facttype2.default.Association:
                    svg = this.displayAssociation();
                    break;
                case _facttype2.default.Categorization:
                    svg = this.displayCategorization();
                    break;
                case _facttype2.default.Difference:
                    svg = this.displayDifference();
                    break;
                case _facttype2.default.Distribution:
                    svg = this.displayDistribution();
                    break;
                case _facttype2.default.Extreme:
                    svg = this.displayExtreme();
                    break;
                case _facttype2.default.Outlier:
                    svg = this.displayOutlier();
                    break;
                case _facttype2.default.Proportion:
                    svg = this.displayProportion();
                    break;
                case _facttype2.default.Rank:
                    svg = this.displayRank();
                    break;
                case _facttype2.default.Trend:
                    svg = this.displayTrend();
                    break;
                case _facttype2.default.Value:
                    svg = this.displayValue();
                    break;
                default:
                    return null;
            }
            return svg;
        }
    }, {
        key: 'animate',
        value: function animate(type) {
            var svg = void 0;
            switch (type) {
                case _facttype2.default.Association:
                    svg = this.animateAssociation();
                    break;
                case _facttype2.default.Categorization:
                    svg = this.animateCategorization();
                    break;
                case _facttype2.default.Difference:
                    svg = this.animateDifference();
                    break;
                case _facttype2.default.Distribution:
                    svg = this.animateDistribution();
                    break;
                case _facttype2.default.Extreme:
                    svg = this.animateExtreme();
                    break;
                case _facttype2.default.Outlier:
                    svg = this.animateOutlier();
                    break;
                case _facttype2.default.Proportion:
                    svg = this.animateProportion();
                    break;
                case _facttype2.default.Rank:
                    svg = this.animateRank();
                    break;
                case _facttype2.default.Trend:
                    svg = this.animateTrend();
                    break;
                case _facttype2.default.Value:
                    svg = this.animateValue();
                    break;
                default:
                    return null;
            }
            return svg;
        }
    }, {
        key: 'update',
        value: function update(prefact, nextfact) {
            if (this.duration() === 0) {
                this.display(nextfact.type);
            } else {
                this.animate(nextfact.type);
            }
        }
    }, {
        key: 'toSVG',
        value: function toSVG() {}
    }, {
        key: 'toJPG',
        value: function toJPG() {} /* static */
    }, {
        key: 'displayAssociation',
        value: function displayAssociation() {}
    }, {
        key: 'displayCategorization',
        value: function displayCategorization() {}
    }, {
        key: 'displayDifference',
        value: function displayDifference() {}
    }, {
        key: 'displayDistribution',
        value: function displayDistribution() {}
    }, {
        key: 'displayExtreme',
        value: function displayExtreme() {}
    }, {
        key: 'displayOutlier',
        value: function displayOutlier() {}
    }, {
        key: 'displayProportion',
        value: function displayProportion() {}
    }, {
        key: 'displayRank',
        value: function displayRank() {}
    }, {
        key: 'displayTrend',
        value: function displayTrend() {}
    }, {
        key: 'displayValue',
        value: function displayValue() {} /* animation */
    }, {
        key: 'animateAssociation',
        value: function animateAssociation() {
            this.displayAssociation();
        }
    }, {
        key: 'animateCategorization',
        value: function animateCategorization() {
            this.displayCategorization();
        }
    }, {
        key: 'animateDifference',
        value: function animateDifference() {
            this.displayDifference();
        }
    }, {
        key: 'animateDistribution',
        value: function animateDistribution() {
            this.displayDistribution();
        }
    }, {
        key: 'animateExtreme',
        value: function animateExtreme() {
            this.displayExtreme();
        }
    }, {
        key: 'animateOutlier',
        value: function animateOutlier() {
            this.displayOutlier();
        }
    }, {
        key: 'animateProportion',
        value: function animateProportion() {
            this.displayProportion();
        }
    }, {
        key: 'animateRank',
        value: function animateRank() {
            this.displayRank();
        }
    }, {
        key: 'animateTrend',
        value: function animateTrend() {
            this.displayTrend();
        }
    }, {
        key: 'animateValue',
        value: function animateValue() {
            this.displayValue();
        }
    }]);
    return Chart;
}();
exports.default = Chart;