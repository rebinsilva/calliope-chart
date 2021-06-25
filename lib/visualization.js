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
var _style = require('./visualization/style');
var _style2 = _interopRequireDefault(_style);
var _charttype = require('./visualization/charttype');
var _charttype2 = _interopRequireDefault(_charttype);
var _size = require('./visualization/size');
var _size2 = _interopRequireDefault(_size);
var _charts = require('./charts');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var Visualization = function() {
    function Visualization() {
        _classCallCheck(this, Visualization);
        this._table = [];
        this._fact = {};
        this._factdata = [];
        this._size = _size2.default.LARGE;
        this._width = 0;
        this._height = 0;
        this._style = _style2.default.BUSINESS;
        this._type = _charttype2.default.VERTICAL_BAR_CHART;
        this._duration = 0;
        this._chart = {};
        this._caption = "";
        this._showSuggestion = false; // When true, it will show the suggestion that whether the chart supports the data.
    }
    _createClass(Visualization, [{
        key: 'size',
        value: function size() {
            return this._size;
        }
    }, {
        key: 'width',
        value: function width(value) {
            if (!value) {
                return this._width;
            }
            this._width = value;
        }
    }, {
        key: 'height',
        value: function height(value) {
            if (!value) {
                return this._height;
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
        key: 'data',
        value: function data(value) {
            if (!value) {
                return this._factdata;
            }
            this._factdata = value;
        }
    }, {
        key: 'fact',
        value: function fact(value) {
            if (!value) {
                return this._fact;
            }
            this._fact = value;
        }
    }, {
        key: 'chart',
        value: function chart(value) {
            if (!value) {
                return this._chart;
            }
            this._chart = value;
        }
    }, {
        key: 'caption',
        value: function caption(value) {
            if (!value) {
                return this._caption;
            }
            this._caption = value;
        }
    }, {
        key: 'style',
        value: function style() {
            return this._style;
        }
    }, {
        key: 'showSuggestion',
        value: function showSuggestion() {
            return this._showSuggestion;
        }
    }, {
        key: 'load',
        value: function load(spec) {
            var _this = this;
            this._size = spec.size ? spec.size : _size2.default.LARGE;
            this._width = spec.width ? spec.width : 0;
            this._height = spec.height ? spec.height : 0;
            this._style = spec.style;
            this._type = spec.type;
            this._duration = spec.duration ? spec.duration : 0;
            this._showSuggestion = spec.showSuggestion ? spec.showSuggestion : false;
            return new Promise(function(resolve, reject) {
                try {
                    var data = _this.data();
                    var fact = _this.fact();
                    var chart = _this._type2chart(spec.type);
                    chart.style(_this._style);
                    chart.size(_this._size);
                    chart.height(_this._height);
                    chart.width(_this._width);
                    chart.table(_this._table);
                    chart.factdata(data);
                    chart.subspace(fact.subspace);
                    chart.measure(fact.measure);
                    chart.breakdown(fact.breakdown);
                    chart.focus(fact.focus);
                    chart.duration(_this._duration);
                    chart.showSuggestion(_this._showSuggestion);
                    _this.chart(chart);
                    resolve(_this);
                } catch (error) {
                    reject(error);
                }
            });
        }
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;
            return new Promise(function(resolve, reject) {
                try {
                    var data = _this2.data();
                    var fact = _this2.fact();
                    _this2._chart.factdata(data);
                    _this2._chart.subspace(fact.subspace);
                    _this2._chart.measure(fact.measure);
                    _this2._chart.breakdown(fact.breakdown);
                    _this2._chart.focus(fact.focus);
                    _this2._chart.duration(_this2._duration);
                    _this2._chart.showSuggestion(_this2._showSuggestion);
                    resolve(_this2);
                } catch (error) {
                    reject(error);
                }
            });
        }
    }, {
        key: '_type2chart',
        value: function _type2chart(type) {
            switch (type) {
                case _charttype2.default.VEGALITE:
                    return new _charts.VegaLite();
                case _charttype2.default.VERTICAL_BAR_CHART:
                    return new _charts.VerticalBarChart();
                case _charttype2.default.HORIZENTAL_BAR_CHART:
                    return new _charts.HorizentalBarChart();
                case _charttype2.default.PROGRESS_CHART:
                    return new _charts.ProgressChart();
                case _charttype2.default.AREA_CHART:
                    return new _charts.AreaChart();
                case _charttype2.default.BUBBLE_CHART:
                    return new _charts.BubbleChart();
                case _charttype2.default.BUBBLE_MAP:
                    return new _charts.BubbleMap();
                case _charttype2.default.DONUT_CHART:
                    return new _charts.DonutChart();
                case _charttype2.default.FILLED_MAP:
                    return new _charts.FilledMap();
                case _charttype2.default.LINE_CHART:
                    return new _charts.LineChart();
                case _charttype2.default.PIE_CHART:
                    return new _charts.PieChart();
                case _charttype2.default.SCATTER_PLOT:
                    return new _charts.Scatterplot();
                case _charttype2.default.TREE_MAP:
                    return new _charts.TreeMap();
                case _charttype2.default.TEXT_CHART:
                    return new _charts.TextChart();
                case _charttype2.default.ISOTYPE_BAR:
                    return new _charts.IsotypeBar();
                case _charttype2.default.ISOTYPE_CLUSTER:
                    return new _charts.IsotypeCluster();
                case _charttype2.default.ISOTYPE_PROPORTION:
                    return new _charts.IsotypeProportion();
                default:
                    return new _charts.HorizentalBarChart();
            }
        }
    }]);
    return Visualization;
}();
exports.default = Visualization;