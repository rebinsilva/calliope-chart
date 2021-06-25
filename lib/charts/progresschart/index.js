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
var _chart = require('../../chart');
var _chart2 = _interopRequireDefault(_chart);
var _color = require('../../visualization/color');
var _color2 = _interopRequireDefault(_color);
var _size = require('../../visualization/size');
var _size2 = _interopRequireDefault(_size);
var _style = require('../../visualization/style');
var _style2 = _interopRequireDefault(_style);
var _pictogram = require('../../visualization/pictogram');
var _pictogram2 = _interopRequireDefault(_pictogram);
var _metaphor = require('../../metaphor/metaphor20.png');
var _metaphor2 = _interopRequireDefault(_metaphor);

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

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // import generateToolTip from '../../visualization/tooltip';
var TEXTFONT = "Arial-Bold";
var ProgressChart = function(_Chart) {
    _inherits(ProgressChart, _Chart);

    function ProgressChart() {
        _classCallCheck(this, ProgressChart);
        var _this2 = _possibleConstructorReturn(this, (ProgressChart.__proto__ || Object.getPrototypeOf(ProgressChart)).call(this));
        _this2._x = '';
        return _this2;
    }
    _createClass(ProgressChart, [{
        key: 'animateProportion',
        value: function animateProportion() {
            /* -------------------------------- basic vis ------------------------------- */
            var svg = this.displayProportion();
            if (!svg) return; /* -------------------------------- init data ------------------------------- */
            var ticks = 10;
            var duration = this.duration(); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                bgFadeIn: {
                    duration: 1,
                    index: 0
                },
                labelFadeIn: {
                    duration: 3,
                    index: 1
                },
                majorGrow: {
                    duration: 6,
                    index: 2
                }
            };
            var everyTick = duration / ticks; /* --------------------------- step 0 bgFadeIn --------------------------- */
            var bgBar = svg.selectAll(".barBgSeries");
            bgBar.attr("opacity", 0);
            bgBar.transition().duration(everyTick * animation.bgFadeIn.duration).attr("opacity", 1); /* ----------------------------- step 1 labelFadeIn ----------------------------- */
            var legend = svg.selectAll(".legend");
            legend.attr("fill", 'black');
            legend.attr("opacity", 0);
            setTimeout(function() {
                legend.transition().duration(everyTick * animation.labelFadeIn.duration).attr("opacity", 1);
            }, everyTick * (countTicksBeforeIndex(animation, animation.labelFadeIn.index) + 0.5)); /* ---------------------------- step 2 majorGrow ---------------------------- */
            var bars = svg.selectAll(".barSeries");
            bars.attr("width", 0);
            var x = this._x;
            setTimeout(function() {
                bars.transition().duration(everyTick * (animation.majorGrow.duration + 0.5)).attr("width", function(d) {
                    return x(d[0][1]) - x(d[0][0]);
                });
            }, everyTick * countTicksBeforeIndex(animation, animation.majorGrow.index));
            var tooltip = svg.selectAll(".tooltip").select("text");
            tooltip.text("0%").attr("opacity", 0);
            setTimeout(function() {
                tooltip.attr("opacity", 1);
                tooltip.transition().duration(everyTick * (animation.majorGrow.duration + 0.5)).textTween(function(d) {
                    var final = d3.select(this).property("_value").split("%")[0];
                    var i = d3.interpolate(0, final);
                    var numberFormat = d3.format(".0f");
                    return function(t) {
                        var percent = numberFormat(i(t));
                        return percent + "%";
                    };
                });
            }, everyTick * countTicksBeforeIndex(animation, animation.majorGrow.index));
        }
    }, {
        key: 'displayProportion',
        value: function displayProportion() {
            var _this3 = this; // set the dimensions and margins of the graph
            var _getSizeBySize = getSizeBySize(this),
                chartSize = _getSizeBySize.chartSize,
                margin = _getSizeBySize.margin,
                hightLightFontSize = _getSizeBySize.hightLightFontSize,
                width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("class", "elementGroup").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
            if (this.focus().length !== 1 || this.measure().length > 1) {
                return;
            }
            var focus = this.focus();
            var filteredData = []; //sorted by focus
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                var _loop = function _loop() {
                    var fs = _step.value;
                    _this3.factdata().filter(function(x) {
                        return x[fs.field] === fs.value;
                    })[0] && filteredData.push(_this3.factdata().filter(function(x) {
                        return x[fs.field] === fs.value;
                    })[0]);
                };
                for (var _iterator = focus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
            var measure = this.measure();
            var breakdown = this.breakdown();
            var maxYValue = d3.sum(this.factdata(), function(d) {
                return d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field];
            }); //console.log('11', maxYValue)
            filteredData.map(function(data) {
                data.maxValue = maxYValue - data[measure[0].aggregate === "count" ? "COUNT" : measure[0].field];
                return data;
            }); //console.log('showDifference in child')
            if (filteredData.length === 0) {
                return;
            }
            var data = filteredData;
            var seriesData = d3.stack().keys([measure[0].aggregate === "count" ? "COUNT" : measure[0].field, "maxValue"])(data).sort(function(a, b) {
                return b[0][0] - a[0][0];
            }); //控制背景色先绘制
            if (this.style() === _style2.default.COMICS) {
                var a1 = seriesData[0][0][0],
                    a2 = seriesData[0][0][1];
                if (a1 > a2 * 0.85) {
                    width -= width * (a1 / a2 - 0.85);
                }
            } // set the ranges
            var x = d3.scaleLinear() // .nice()
                .domain([0, maxYValue]).range([0, width]);
            this._x = x;
            var y = d3.scaleBand().domain(data.map(function(d) {
                return d[breakdown[0].field];
            })).range([height, 0]).padding(0.6); //icon  index
            var iconx = void 0;
            var icony = void 0; //append the rectangles for the bar chart
            svg.selectAll(".bars").data(seriesData).enter().append("rect").attr("class", function(d, i) {
                return d.key !== "maxValue" ? "barSeries bars" : "barBgSeries bars";
            }).attr("fill", function(d, i) {
                if (d.key !== "maxValue") { //value bar
                    return _color2.default.HIGHLIGHT;
                } else {
                    return _color2.default.DEFAULT;
                }
            }).attr("y", function(d) {
                icony = y(d[0].data[breakdown[0].field]);
                return y(d[0].data[breakdown[0].field]);
            }).attr("x", 0).attr("width", function(d, i) {
                if (d.key !== "maxValue") iconx = x(d[0][1]) - x(d[0][0]);
                return d.key === "maxValue" ? width : x(d[0][1]) - x(d[0][0]);
            }).attr("height", y.bandwidth()); // add the x Axis
            svg.append("g").attr("class", 'xAxis') // .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x)).call(function(g) {
                    g.select('.domain').remove();
                    g.selectAll('.tick line').remove();
                    g.selectAll('.tick text').remove();
                }); // add the y Axis
            svg.append("g").attr('class', 'yAxis').call(d3.axisRight(y)).call(function(g) {
                g.select('.domain').remove();
                g.selectAll('.tick line').remove();
                g.selectAll(".tick text").remove();
            }); //tool tip
            var proportionValue = data[0][measure[0].aggregate === "count" ? "COUNT" : measure[0].field] / d3.sum(this.factdata(), function(d) {
                return d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field];
            }); // let toolTipX = x(data[0][measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) / 2,//箭头中心所在x的位置
            //     toolTipY = y(data[0][breakdown[0].field]) - 40 * chartSize.height / 320,
            var toolTipValue = (proportionValue * 100).toFixed(0) + "%"; //console.log("proportionValue", proportionValue, data)
            // generateToolTip(toolTipX, toolTipY, toolTipValue, svg, chartSize, annotationSize);
            svg.append("g").attr("class", "tooltip").append("text").attr("x", width / 2).attr("y", y(data[0][breakdown[0].field]) - 40 * chartSize.height / 320).attr("text-anchor", "middle").attr("alignment-baseline", "baseline").attr('font-family', TEXTFONT).attr("font-size", hightLightFontSize).attr("font-weight", 600).attr("fill", _color2.default.HIGHLIGHT).text(toolTipValue).property("_value", toolTipValue); //text
            svg.append("text").attr("class", "legend").attr("x", width / 2).attr("y", y(data[0][breakdown[0].field]) + y.bandwidth() + 40 * chartSize.height / 320).text(focus[0].value.length > 22 ? focus[0].value.substring(0, 22) + "…" : focus[0].value).attr('font-size', hightLightFontSize).attr("font-weight", 600).attr("alignment-baseline", "hanging").attr('font-family', TEXTFONT).attr('fill', _color2.default.HIGHLIGHT).attr('text-anchor', 'middle');
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.22,
                    metaphorHeight = 1.2 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor2.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.18;
                    metaphorHeight = 1.2 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.2;
                    metaphorHeight = 1.2 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", svg.select('.barSeries').attr("width") - metaphorWidth * 0.04).attr("y", height / 2 - metaphorHeight * 0.4);
            }
            if (this.style() === _style2.default.PICTOGRAPH) {
                var pictype = void 0;
                breakdown[0].values.forEach(function(ele, i) {
                    if (ele.attribute === focus[0].value) {
                        pictype = ele.pictype;
                    }
                }); /*------------------通过名称找寻icon----------------------------*/
                svg.append("defs").append("g").attr("id", 'pictype' + pictype).append("path").attr("d", _pictogram2.default[pictype]); //  let typesizex1=svg.select(`#pictype${pictype}`).node().getBBox().width;
                var typesizey1 = svg.select('#pictype' + pictype).node().getBBox().height;
                var typex = svg.select('#pictype' + pictype).node().getBBox().x;
                var typey = svg.select('#pictype' + pictype).node().getBBox().y;
                var scale = y.bandwidth() / typesizey1;
                svg.append("defs").append("g").attr("id", "pictypepp").append("path").attr("d", _pictogram2.default[pictype]).attr("transform", function() {
                    return 'scale(' + scale + ')';
                });
                svg.append("g").append("use").attr("xlink:href", "#pictypepp").attr("id", "icontype").attr("x", iconx - Math.abs(typex * scale)).attr("y", icony - Math.abs(typey * scale)).attr("fill", "#96A7CE"); //center calculate
                var cardWidth = chartSize.width;
                var cardHeight = chartSize.height;
                var a = svg.node().getBBox().width;
                var b = svg.node().getBBox().height;
                var c = svg.node().getBBox().x;
                var e = svg.node().getBBox().y; //center
                if (a > cardWidth) {
                    svg.attr("transform", 'scale(' + width / a + ')  translate(' + (cardWidth / (2 * width / a) - (a / 2 + c)) + ',' + (cardHeight / (2 * width / a) - (b / 2 + e)) + ') ');
                }
            } //center居中
            svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x) + "," + ((this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y) + ")");
            return svg;
        }
    }]);
    return ProgressChart;
}(_chart2.default);
/** 
 * tickSize 坐标轴字号 调整为：比标准尺寸大2px
 * annotationSize 标注字号
 **/
var getSizeBySize = function getSizeBySize(_this) {
    var tickSize = void 0,
        annotationSize = void 0,
        hightLightFontSize = void 0;
    switch (_this.size()) {
        case _size2.default.WIDE:
            tickSize = 14;
            annotationSize = 15;
            hightLightFontSize = 26;
            break;
        case _size2.default.MIDDLE:
            tickSize = 14;
            annotationSize = 15;
            hightLightFontSize = 20;
            break;
        case _size2.default.SMALL:
            tickSize = 12;
            annotationSize = 10;
            hightLightFontSize = 16;
            break;
        case _size2.default.LARGE:
        default:
            tickSize = 16;
            annotationSize = 30;
            hightLightFontSize = 40;
            break;
    }
    var margin = void 0;
    switch (_this.size()) {
        case _size2.default.LARGE:
            margin = {
                top: 60,
                right: 40,
                bottom: 60,
                left: 40
            };
            break;
        case _size2.default.WIDE:
            margin = {
                top: 20,
                right: 50,
                bottom: 20,
                left: 50
            };
            break;
        case _size2.default.MIDDLE:
            margin = {
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            };
            break;
        case _size2.default.SMALL:
            margin = {
                top: 9,
                right: 15,
                bottom: 9,
                left: 15
            };
            break;
        default:
            margin = {
                top: 50,
                right: 40,
                bottom: 50,
                left: 40
            };
            break;
    }
    return {
        chartSize: {
            width: _this.width(),
            height: _this.height()
        },
        tickSize: tickSize,
        annotationSize: annotationSize,
        margin: margin,
        hightLightFontSize: hightLightFontSize
    };
};
var countTicksBeforeIndex = function countTicksBeforeIndex(animation, index) {
    var count = 0;
    var visited = [];
    for (var key in animation) {
        if (animation[key].index < index && visited.indexOf(animation[key].index) === -1) {
            count += animation[key].duration;
            visited.push(animation[key].index);
        };
    }
    return count - 0.5;
};
exports.default = ProgressChart;