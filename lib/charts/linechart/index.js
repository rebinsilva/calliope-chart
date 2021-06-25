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
var _d2 = require('d3');
var d3 = _interopRequireWildcard(_d2);
var _chart = require('../../chart');
var _chart2 = _interopRequireDefault(_chart);
var _color = require('../../visualization/color');
var _color2 = _interopRequireDefault(_color);
var _style = require('../../visualization/style');
var _style2 = _interopRequireDefault(_style);
var _size = require('../../visualization/size');
var _size2 = _interopRequireDefault(_size);
var _tooltip2 = require('../../visualization/tooltip');
var _tooltip3 = _interopRequireDefault(_tooltip2);
var _format = require('../../visualization/format');
var _format2 = _interopRequireDefault(_format);
var _metaphor2 = require('../../metaphor/metaphor7.png');
var _metaphor3 = _interopRequireDefault(_metaphor2);
var _metaphor4 = require('../../metaphor/metaphor8.png');
var _metaphor5 = _interopRequireDefault(_metaphor4);
var _metaphor6 = require('../../metaphor/metaphor2.png');
var _metaphor7 = _interopRequireDefault(_metaphor6);
var _metaphor8 = require('../../metaphor/metaphor6.png');
var _metaphor9 = _interopRequireDefault(_metaphor8);
var _metaphor10 = require('../../metaphor/metaphor11.png');
var _metaphor11 = _interopRequireDefault(_metaphor10);
var _metaphor12 = require('../../metaphor/metaphor17.png');
var _metaphor13 = _interopRequireDefault(_metaphor12);
var _metaphor14 = require('../../metaphor/metaphor18.png');
var _metaphor15 = _interopRequireDefault(_metaphor14);
var _metaphor16 = require('../../metaphor/metaphor19.png');
var _metaphor17 = _interopRequireDefault(_metaphor16);
var _v = require('uuid/v4');
var _v2 = _interopRequireDefault(_v);
var _pictogram = require('../../visualization/pictogram');
var _pictogram2 = _interopRequireDefault(_pictogram);

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

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
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
} //trend, down
//trend, up
//trend, series
//trend, many
//difference
//outlier
//extreme
//rank
var NUMFONT = "Arial-Regular";
var ENGFONT = "Arial-Regular";
var LineChart = function(_Chart) {
    _inherits(LineChart, _Chart);

    function LineChart() {
        _classCallCheck(this, LineChart);
        var _this = _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call(this));
        _this._x = '';
        _this._xAxis = '';
        _this._y = '';
        _this._width = '';
        _this._height = '';
        _this._strokeWidth = '';
        return _this;
    }
    _createClass(LineChart, [{
        key: 'displayExtreme',
        value: function displayExtreme() {
            /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var focus = this.focus(); /* ----------------------- graph set up (size, margin) ---------------------- */
            var chartMargin = {
                "small": {
                    "top": 5,
                    "right": 12,
                    "bottom": 30,
                    "left": 12
                },
                "middle": {
                    "top": 10,
                    "right": 15,
                    "bottom": 50,
                    "left": 15
                },
                "wide": {
                    "top": 12,
                    "right": 20, // hasSeries?  moreThan ? 160 : 100 : 20,
                    "bottom": 50,
                    "left": 20 // fact === "difference" ? 30 : 20
                },
                "large": {
                    "top": 30,
                    "right": 30,
                    "bottom": 80 + 50,
                    "left": 30
                }
            };
            var margin = chartMargin[this.size()];
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize = getSizeBySize(this.size(), chartSize, "extreme"),
                tickSize = _getSizeBySize.tickSize,
                annotationSize = _getSizeBySize.annotationSize,
                dotR = _getSizeBySize.dotR,
                strokeWidth = _getSizeBySize.strokeWidth,
                padding = _getSizeBySize.padding,
                tickWidth = _getSizeBySize.tickWidth; /* ----------------------------- data prosessing ---------------------------- */ // data example
            // [{Sales: 1054260, Year: "2010", Brand: "Ford"}
            // {Sales: 1296077, Year: "2011", Brand: "Ford"}]
            var hasSeries = breakdown.length > 1 ? true : false;
            if (hasSeries) return; // for(let f of focus) {
            //     if(f.field !== breakdown[0].field) return
            // }
            // 只取focus首个
            if (!focus[0].field || focus[0].field !== breakdown[0].field) return;
            var seriesName = hasSeries ? d3.map(factData, function(d) {
                return d[breakdown[1].field];
            }).keys() : [];
            var seriesData = [];
            seriesData.push({
                key: "All",
                values: factData.sort(sortByDateAscending(breakdown))
            });
            var measureName = measure[0].aggregate === 'count' ? "COUNT" : measure[0].field; // get tootltip size
            var focusValueArray = factData.filter(function(d) {
                return d[focus[0].field] === focus[0].value;
            });
            var focusValue = focusValueArray[0][measureName];
            var _tooltip = d3.select(this.container()).append("svg").attr("class", "testNode").attr("opacity", 0);
            _tooltip.append("text").text((0, _format2.default)(focusValue)).attr("font-size", annotationSize).attr("font-family", NUMFONT);
            var tooltipHeight = d3.select(".testNode").select("text").node().getBBox().height;
            var tooltipWidth = d3.select(".testNode").select("text").node().getBBox().width;
            if (margin.top < tooltipHeight / 0.8 + 30 * chartSize.height / 640) {
                margin.top = tooltipHeight / 0.8 + 30 * chartSize.height / 640;
            }
            if (factData[0][focus[0].field] === focus[0].value && margin.left + padding < Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) {
                margin.left = Math.ceil(Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2) - padding) * 1.1;
            }
            if (factData[factData.length - 1][focus[0].field] === focus[0].value && margin.right + padding < Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) {
                margin.right = Math.ceil(Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2) - padding) * 1.1;
            }
            _tooltip.remove();
            var width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom; /* ----------------------------------- vis ---------------------------------- */
            var svg = initSvg(this.container(), width, height, margin);
            if (this.style() === _style2.default.COMICS) width = 0.8 * width; /* ------------------------------ axis setting ------------------------------ */
            var _setupXAsix = setupXAsix(seriesData, factData, breakdown, measure, padding, width, height, true),
                x = _setupXAsix.x,
                y = _setupXAsix.y; // line Function
            var lineGen = lineGeneration(breakdown, measure, x, y);
            var lingGraph = svg.append("g").attr("class", "lineGraph");
            lingGraph.selectAll(".series").data(seriesData).enter().append("g").attr("class", function(d) {
                return "series " + d.key.replace(/\s/g, "");
            }).each(function(d, i) { // append the line for the line chart
                drawLines(d3.select(this), d, hasSeries, seriesName, lineGen, strokeWidth); // append the dot for the line chart
                var isDotSolid = true;
                drawDots(d3.select(this), d, breakdown, measure, focus, hasSeries, seriesName, x, y, dotR, isDotSolid, strokeWidth, _color2.default);
            }); // add tooltip of the focus one
            // let focusValueArray = factData.filter(d => {
            //     return d[focus[0].field] === focus[0].value
            // });
            var focusData = focusValueArray[0];
            var toolTipX = x(parseTime(focus[0].value)), //箭头中心所在x的位置
                toolTipY = y(focusData[measureName]) - dotR * 2.5, // - 25 * chartSize.height / 640 , //箭头中心所在y的位置;20是标注离value的距离
                toolTipValue = (0, _format2.default)(focusData[measureName]);
            (0, _tooltip3.default)(toolTipX, toolTipY, toolTipValue, svg, chartSize, annotationSize);
            svg.selectAll(".tooltip").attr("font-weight", 500); // add the x Axis
            // variables for arranging X ticks
            var axisX = drawXAsix(seriesData, factData, breakdown, x, focus[0].value); // custom x Axis
            svg.append("g").lower().attr("class", "xAxis").attr("transform", "translate(0," + y.range()[0] + ")").call(axisX).call(function(g) {
                g.attr('font-size', tickSize);
                g.attr("font-family", ENGFONT);
                paddingXAsix(g, padding);
                g.selectAll(".tick").selectAll("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("y2", 6 * chartSize.height / 320);
                g.selectAll(".domain").attr("stroke-width", tickWidth);
                g.selectAll("text").attr("y", 12 * chartSize.height / 320).attr("font-size", annotationSize).attr("fill", _color2.default.HIGHLIGHT).attr("font-weight", 600);
                g.selectAll(".tick").filter(function(d) {
                    return parseTime(focus[0].value).toString() === d.toString();
                }).attr("id", "tickFocus").property("_index", function(d, i) {
                    return i;
                });
                g.selectAll(".tick").filter(function(d) {
                    return parseTime(focus[0].value).toString() !== d.toString();
                }).remove();
                g.selectAll(".tick").selectAll("text").attr("font-size", annotationSize).attr("fill", _color2.default.HIGHLIGHT).attr("font-weight", 600);
                var minX = g.selectAll(".domain").node().getBoundingClientRect().x,
                    maxX = g.selectAll(".domain").node().getBoundingClientRect().x + g.selectAll(".domain").node().getBoundingClientRect().width,
                    nowX = g.selectAll(".tick").selectAll("text").node().getBoundingClientRect().x,
                    nowWidth = g.selectAll(".tick").selectAll("text").node().getBoundingClientRect().width;
                if (nowX < minX) {
                    g.selectAll(".tick").selectAll("text").attr("dx", minX - nowX);
                } else if (nowX + nowWidth > maxX) {
                    g.selectAll(".tick").selectAll("text").attr("dx", maxX - nowX - nowWidth);
                }
                return g;
            }); // ref line
            svg.append("g").lower().attr("class", "refline").append("line").attr("x1", toolTipX).attr("x2", toolTipX).attr("y1", y(focusData[measureName])).attr("y2", y(0)).attr("stroke", _color2.default.DASHLINE).attr('stroke-dasharray', '5,5').attr("stroke-width", strokeWidth);
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.26,
                    metaphorHeight = 1.34 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor15.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.21;
                    metaphorHeight = 1.34 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.24;
                    metaphorHeight = 1.34 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
            }
            if (this.style() === _style2.default.PICTOGRAPH) { // let factData = this.factdata();
                // console.log('factdata',this.factdata);
                var subspace = this.subspace();
                var size = this.size();
                lineGen = lineGeneration(breakdown, measure, x, y);
                lingGraph = svg.append("g").attr("class", "lineGraph");
                lingGraph.selectAll(".series").data(seriesData).enter().append("g").attr("class", function(d) {
                    return "series " + d.key.replace(/\s/g, "");
                }).each(function(d, i) { // append the line for the line chart
                    drawLines(d3.select(this), d, hasSeries, seriesName, lineGen, strokeWidth); // append the dot for the line chart
                    var isDotSolid = true;
                    var isTrend = false;
                    var isRank = false;
                    drawIconDots(d3.select(this), d, breakdown, measure, focus, hasSeries, seriesName, x, y, dotR, isDotSolid, strokeWidth, _color2.default, isTrend, isRank, width, height, factData, subspace, size);
                }); //使图表居中
                var cardWidth = chartSize.width;
                var cardHeight = chartSize.height;
                var a = svg.node().getBBox().width;
                var b = svg.node().getBBox().height;
                var c = svg.node().getBBox().x;
                var e = svg.node().getBBox().y;
                var transx = -c + cardWidth / 2 - a / 2;
                var transy = -e + cardHeight / 2 - b / 2;
                if (a > cardWidth) {
                    svg.attr("transform", 'scale(' + width / a + ')  translate(' + (cardWidth / (2 * width / a) - (a / 2 + c)) + ',' + (cardHeight / (2 * width / a) - (b / 2 + e)) + ') ');
                } else {
                    svg.attr("transform", 'translate(' + transx + ' ,' + transy + ') ');
                }
                svg.selectAll('circle').attr('opacity', 0);
            }
            return svg;
        }
    }, {
        key: 'displayOutlier',
        value: function displayOutlier() {
            /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var focus = this.focus(); /* ----------------------- graph set up (size, margin) ---------------------- */
            var chartMargin = {
                "small": {
                    "top": 5,
                    "right": 12,
                    "bottom": 30,
                    "left": 12
                },
                "middle": {
                    "top": 10,
                    "right": 15,
                    "bottom": 50,
                    "left": 15
                },
                "wide": {
                    "top": 12,
                    "right": 20, // hasSeries?  moreThan ? 160 : 100 : 20,
                    "bottom": 50,
                    "left": 20 // fact === "difference" ? 30 : 20
                },
                "large": {
                    "top": 30,
                    "right": 30,
                    "bottom": 80 + 50,
                    "left": 30
                }
            };
            var margin = chartMargin[this.size()];
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize2 = getSizeBySize(this.size(), chartSize, "outlier"),
                tickSize = _getSizeBySize2.tickSize,
                annotationSize = _getSizeBySize2.annotationSize,
                dotR = _getSizeBySize2.dotR,
                strokeWidth = _getSizeBySize2.strokeWidth,
                padding = _getSizeBySize2.padding,
                tickWidth = _getSizeBySize2.tickWidth; /* ----------------------------- data prosessing ---------------------------- */ // data example
            // [{Sales: 1054260, Year: "2010", Brand: "Ford"}
            // {Sales: 1296077, Year: "2011", Brand: "Ford"}]
            var hasSeries = breakdown.length > 1 ? true : false;
            if (hasSeries) return;
            if (focus.length === 0) return; // for(let f of focus) {
            //     if(f.field !== breakdown[0].field) return
            // }
            // 只取focus首个
            if (!focus[0].field || focus[0].field !== breakdown[0].field) return;
            var seriesName = hasSeries ? d3.map(factData, function(d) {
                return d[breakdown[1].field];
            }).keys() : [];
            var seriesData = [];
            seriesData.push({
                key: "All",
                values: factData.sort(sortByDateAscending(breakdown))
            });
            var measureName = measure[0].aggregate === 'count' ? "COUNT" : measure[0].field; // get tootltip size
            var focusValueArray = factData.filter(function(d) {
                return d[focus[0].field] === focus[0].value;
            });
            var focusValue = focusValueArray[0][measureName];
            var _tooltip = d3.select(this.container()).append("svg").attr("class", "testNode").attr("opacity", 0);
            _tooltip.append("text").text((0, _format2.default)(focusValue)).attr("font-size", annotationSize).attr("font-family", NUMFONT);
            var tooltipHeight = d3.select(".testNode").select("text").node().getBBox().height;
            var tooltipWidth = d3.select(".testNode").select("text").node().getBBox().width;
            if (margin.top < tooltipHeight / 0.8 + 30 * chartSize.height / 640) {
                margin.top = tooltipHeight / 0.8 + 30 * chartSize.height / 640;
            }
            if (factData[0][focus[0].field] === focus[0].value && margin.left + padding < Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) {
                margin.left = Math.ceil(Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2) - padding) * 1.1; //+= Math.ceil(tooltipWidth/0.7/2 - margin.left - padding) * 1.2
            }
            if (factData[factData.length - 1][focus[0].field] === focus[0].value && margin.right + padding < Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) {
                margin.right = Math.ceil(Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2) - padding) * 1.1; // += (tooltipWidth/0.7/2 - margin.right - padding) * 1.2
            }
            _tooltip.remove();
            var width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom; /* ----------------------------------- vis ---------------------------------- */
            var svg = initSvg(this.container(), width, height, margin);
            if (this.style() === _style2.default.COMICS) width = 0.8 * width; /* ------------------------------ axis setting ------------------------------ */
            var _setupXAsix2 = setupXAsix(seriesData, factData, breakdown, measure, padding, width, height, true),
                x = _setupXAsix2.x,
                y = _setupXAsix2.y; // line Function
            var lineGen = lineGeneration(breakdown, measure, x, y);
            var lingGraph = svg.append("g").attr("class", "lineGraph");
            lingGraph.selectAll(".series").data(seriesData).enter().append("g").attr("class", function(d) {
                return "series " + d.key.replace(/\s/g, "");
            }).each(function(d, i) { // append the line for the line chart
                drawLines(d3.select(this), d, hasSeries, seriesName, lineGen, strokeWidth); // append the dot for the line chart
                var isDotSolid = true;
                drawDots(d3.select(this), d, breakdown, measure, focus, hasSeries, seriesName, x, y, dotR, isDotSolid, strokeWidth, _color2.default);
            }); // add tooltip of the focus one
            var focusData = focusValueArray[0];
            var toolTipX = x(parseTime(focus[0].value)), //箭头中心所在x的位置
                toolTipY = y(focusData[measureName]) - dotR * 2.5, //30 * chartSize.height / 640 , //箭头中心所在y的位置;20是标注离value的距离
                toolTipValue = (0, _format2.default)(focusData[measureName]);
            (0, _tooltip3.default)(toolTipX, toolTipY, toolTipValue, svg, chartSize, annotationSize);
            svg.selectAll(".tooltip").attr("font-weight", 500); // add the x Axis
            var axisX = drawXAsix(seriesData, factData, breakdown, x, focus[0].value); // custom x Axis
            svg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + height + ")").call(axisX).call(function(g) {
                g.attr('font-size', tickSize);
                g.attr("font-family", ENGFONT);
                g.selectAll("text").attr("y", 9 * chartSize.height / 320);
                g.selectAll(".domain").attr("stroke-width", tickWidth).attr('stroke', _color2.default.AXIS).attr('d', "M0.5,0H" + (width + 0.5));
                g.selectAll(".tick").selectAll("line").attr("stroke-width", tickWidth); // if(this.size() !== "small")
                //     g.append("path")
                //         .attr("class", "xArrow")
                //         .attr("d", drawArrow(this.size(), width))
                //         .attr("fill", Color.AXIS)
                // let tickY = g.selectAll(".tick").select("text").attr("y")
                // g.append("text")
                //     .attr("class", "xLabel")
                //     .attr("text-anchor", "center")
                //     .attr("x", width)
                //     .attr("y", tickY)
                //     .attr("dy", "1em")
                //     .text(breakdown[0].field)
                //     .attr("text-anchor", "end")
                //     .attr("fill", Color.AXIS);
                // if(g.select(".xLabel").node().getBBox().width / 2 > margin.right) {
                //     g.select(".xLabel")
                //         .attr("x", width )
                //         .attr("text-anchor", "end")
                // }
                g.selectAll(".tick").filter(function(d) {
                    return parseTime(focus[0].value).toString() !== d.toString();
                }).remove(); // let tickSpace = g.select(".tick").node().getBoundingClientRect().x +g.select(".tick").node().getBoundingClientRect().width;
                g.selectAll(".tick").selectAll("line").attr("stroke", _color2.default.AXIS).attr("y2", 6 * chartSize.height / 320);
                g.selectAll(".tick").selectAll("text").attr("dy", "1em").attr("font-size", annotationSize).attr("fill", _color2.default.HIGHLIGHT).attr("font-weight", 600);
                var minX = g.selectAll(".domain").node().getBoundingClientRect().x,
                    maxX = g.selectAll(".domain").node().getBoundingClientRect().x + g.selectAll(".domain").node().getBoundingClientRect().width,
                    nowX = g.selectAll(".tick").selectAll("text").node().getBoundingClientRect().x,
                    nowWidth = g.selectAll(".tick").selectAll("text").node().getBoundingClientRect().width;
                if (nowX < minX) {
                    g.selectAll(".tick").selectAll("text").attr("dx", minX - nowX);
                } else if (nowX + nowWidth > maxX) {
                    g.selectAll(".tick").selectAll("text").attr("dx", maxX - nowX - nowWidth);
                }
                return g;
            }); // ref line
            svg.append("g").lower().attr("class", "refline").append("line").attr("x1", toolTipX).attr("x2", toolTipX).attr("y1", y(focusData[measureName])).attr("y2", y(0)).attr("stroke", _color2.default.DASHLINE).attr('stroke-dasharray', '5,5').attr("stroke-width", strokeWidth);
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.26,
                    metaphorHeight = 1.43 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor13.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.21;
                    metaphorHeight = 1.43 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.24;
                    metaphorHeight = 1.43 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
            }
            if (this.style() === _style2.default.PICTOGRAPH) { // let factData = this.factdata();
                // console.log('factdata',this.factdata);
                var subspace = this.subspace();
                var size = this.size();
                lineGen = lineGeneration(breakdown, measure, x, y);
                lingGraph = svg.append("g").attr("class", "lineGraph");
                lingGraph.selectAll(".series").data(seriesData).enter().append("g").attr("class", function(d) {
                    return "series " + d.key.replace(/\s/g, "");
                }).each(function(d, i) { // append the line for the line chart
                    drawLines(d3.select(this), d, hasSeries, seriesName, lineGen, strokeWidth); // append the dot for the line chart
                    var isDotSolid = true;
                    var isTrend = false;
                    var isRank = false;
                    drawIconDots(d3.select(this), d, breakdown, measure, focus, hasSeries, seriesName, x, y, dotR, isDotSolid, strokeWidth, _color2.default, isTrend, isRank, width, height, factData, subspace, size);
                }); //使图表居中
                var cardWidth = chartSize.width;
                var cardHeight = chartSize.height;
                var a = svg.node().getBBox().width;
                var b = svg.node().getBBox().height;
                var c = svg.node().getBBox().x;
                var e = svg.node().getBBox().y;
                var transx = -c + cardWidth / 2 - a / 2;
                var transy = -e + cardHeight / 2 - b / 2;
                if (a > cardWidth) {
                    svg.attr("transform", 'scale(' + width / a + ')  translate(' + (cardWidth / (2 * width / a) - (a / 2 + c)) + ',' + (cardHeight / (2 * width / a) - (b / 2 + e)) + ') ');
                } else {
                    svg.attr("transform", 'translate(' + transx + ' ,' + transy + ') ');
                }
                svg.selectAll('circle').attr('opacity', 0);
            }
            this._x = x;
            this._y = y;
            this._strokeWidth = strokeWidth;
            this._height = height;
            this._width = width;
            return svg;
        }
    }, {
        key: 'displayTrend',
        value: function displayTrend() {
            var _this2 = this; /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var hasSeries = breakdown.length > 1 ? true : false;
            var measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field; /* ----------------------------- data prosessing ---------------------------- */ // data example
            // [{Sales: 1054260, Year: "2010", Brand: "Ford"}
            // {Sales: 1296077, Year: "2011", Brand: "Ford"}]
            // let hasSeries = breakdown.length > 1 ? true : false;
            var seriesData = [];
            if (hasSeries) {
                seriesData = d3.nest().key(function(d) {
                    return d[breakdown[1].field];
                }).sortValues(sortByDateAscending(breakdown)).entries(factData); // seriesData =seriesData.sort(() => .5 - Math.random()).slice(0,10)
                seriesData = seriesData.slice(0, 10);
            } else {
                seriesData.push({
                    key: "All",
                    values: factData.sort(sortByDateAscending(breakdown))
                });
            } /* ----------------------- graph set up (size, margin) ---------------------- */
            var seriesName = hasSeries ? d3.map(seriesData, function(d) {
                return d.key;
            }).keys() : [];
            var moreThan = false;
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var legendRowNum = Math.ceil(seriesName.length / 3);
            var chartMargin = {
                "small": {
                    "top": 5,
                    "right": 20,
                    "bottom": hasSeries ? 63 / 4 * legendRowNum + 25 : 30,
                    "left": 20
                },
                "middle": {
                    "top": 10,
                    "right": 25,
                    "bottom": hasSeries ? 74 / 4 * legendRowNum + 30 : 40,
                    "left": 25
                },
                "wide": {
                    "top": 12,
                    "right": hasSeries ? 180 : 30, // hasSeries?  moreThan ? 160 : 100 : 20,
                    "bottom": 40,
                    "left": hasSeries ? 20 : 30 // fact === "difference" ? 30 : 20
                },
                "large": {
                    "top": 30,
                    "right": 30,
                    "bottom": hasSeries ? 150 + 50 : 80 + 50,
                    "left": 30
                }
            };
            var margin = chartMargin[this.size()];
            var _getSizeBySize3 = getSizeBySize(this.size(), chartSize, 'trend', hasSeries, moreThan),
                tickSize = _getSizeBySize3.tickSize,
                dotR = _getSizeBySize3.dotR,
                strokeWidth = _getSizeBySize3.strokeWidth,
                padding = _getSizeBySize3.padding,
                tickWidth = _getSizeBySize3.tickWidth,
                width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom; /* ----------------------------------- vis ---------------------------------- */
            var svg = initSvg(this.container(), width, height, margin);
            if (this.style() === _style2.default.COMICS) {
                if (hasSeries || seriesData[0].values.length > 7) width *= 0.8;
                else if (this.size() === _size2.default.WIDE) {
                    height *= 0.85;
                }
            } /* ------------------------------ axis setting ------------------------------ */
            var _setupXAsix3 = setupXAsix(seriesData, factData, breakdown, measure, padding, width, height, !hasSeries),
                x = _setupXAsix3.x,
                y = _setupXAsix3.y; // line Function
            var lineGen = lineGeneration(breakdown, measure, x, y); // add the x Axis
            var axisX = drawXAsix(seriesData, factData, breakdown, x);
            var xAxisOffset = height;
            if (y.domain()[0] !== 0) {
                xAxisOffset = y(0);
            } // custom x Axis
            svg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + xAxisOffset + ")").call(axisX).call(function(g) {
                g.attr('font-size', _this2.size() === 'wide' && seriesName.length > 8 ? tickSize - 2 : tickSize);
                g.attr("font-family", ENGFONT);
                paddingXAsix(g, padding);
                g.selectAll(".tick").selectAll("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("y2", 6 * chartSize.height / 320);
                g.selectAll(".domain").attr("stroke-width", tickWidth);
                g.selectAll("text").attr("y", Math.max(9 * chartSize.height / 320, dotR * 1.5));
                if (_this2.size() === 'large') { // 检查够不够放
                    var _tickWidth = 0;
                    var xRange = x.range()[1] - x.range()[0];
                    g.selectAll(".tick").each(function(d, i) {
                        var _thisWidth = d3.select(this).node().getBBox().width;
                        _tickWidth += _thisWidth;
                    });
                    if (_tickWidth > xRange * 0.99) { //横的不够放
                        g.selectAll("text").attr("transform", 'translate(-' + 5 + ',0)rotate(-45)').attr("text-anchor", "end"); // 检查斜着有没有遮挡
                        var prev = g.select("text").node().getBBox().height;
                        var rotateAble = Math.floor(xRange / prev) >= g.selectAll(".tick").size(); // 如果遮挡 摆回正的
                        if (!rotateAble) {
                            g.selectAll("text").attr("transform", "").attr("text-anchor", "middle");
                            removeOverlapX(g, x);
                        }
                    }
                } else removeOverlapX(g, x);
                return g;
            }); // append legend 
            if (hasSeries) {
                var seriesNameCopy = [].concat(_toConsumableArray(seriesName));
                seriesNameCopy.sort(function(a, b) {
                    return a.length - b.length;
                });
                seriesName = [];
                var i = 0;
                while (seriesNameCopy.length) {
                    if (i !== 0 && (i + 1) % 4 === 0) seriesName.push(seriesNameCopy.pop());
                    else seriesName.push(seriesNameCopy.shift());
                    i += 1;
                }
                var thisSize = this.size();
                if (this.size() === "wide") {
                    svg.append("foreignObject").attr("x", chartSize.width - margin.left - margin.right + 30).attr("y", 0).attr("width", margin.right - 10).attr("height", height + margin.bottom * 0.6).append("xhtml:div").attr("class", "legends").style("display", "flex").style("flex-direction", "column") // .style("flex-wrap", "wrap")
                        .style("align-content", "center") // "space-around")
                        .style("justify-content", moreThan ? "" : "space-evenly").style("height", Math.round(seriesName.length > 8 ? height + margin.bottom * 0.6 : height + margin.bottom * 0.3) + "px") //height + margin.bottom * 0.3
                        .selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0).style("margin-right", 5 * chartSize.width / 320 + "px").each(function(d, i) {
                            var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                            legend.append("rect").attr("fill", function(d) {
                                return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                            }).attr("width", seriesName.length > 8 ? tickSize - 2 : tickSize).attr('height', seriesName.length > 8 ? tickSize - 2 : tickSize).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320);
                            legend.append("text").attr("x", tickSize + 2).text(function(d) {
                                return d.length > 13 ? d.substring(0, 12) + "…" : d;
                            }).attr("font-size", seriesName.length > 8 ? tickSize - 2 : tickSize).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                            legend.attr("width", Math.round(legend.node().getBBox().width));
                            legend.attr("height", Math.floor(legend.node().getBBox().height));
                        });
                } else { // seriesName = seriesName.slice(0,3)
                    var xAxisHeightOffset = void 0;
                    var isRotate = svg.selectAll(".xAxis").select("text").attr("transform") ? true : false;
                    if (this.size() === 'small') xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.35;
                    else if (this.size() === 'middle') xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.35;
                    else {
                        if (isRotate) xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.2;
                        else xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 2;
                    }
                    svg.append("foreignObject").attr("x", 0) //padding
                        .attr("y", height + xAxisHeightOffset).attr("width", chartSize.width - margin.left - margin.right) //width - padding * 2 
                        .attr("height", margin.bottom - xAxisHeightOffset).append("xhtml:div").attr("class", "legends").style("display", "grid").style("grid-template-columns", 'repeat(' + Math.min(seriesName.length, thisSize === 'small' ? 3 : 3) + ', auto)').style("grid-template-rows", 'repeat(' + (thisSize === 'small' ? 3 : 4) + ', min-content)').style("justify-content", seriesName.length < 3 ? "center" : "space-around").style("align-items", "center").style("align-content", "center").style("justify-items", seriesName.length >= 3 ? "start" : "center").style("padding-top", thisSize === 'small' ? "" : "1px") // .style("height", Math.round((margin.bottom - xAxisHeightOffset)) + "px")
                        .selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0) // .style("margin-right", 5 * chartSize.width / 320 + "px")
                        .each(function(d, i) {
                            var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                            legend.append("rect").attr("fill", function(d) {
                                return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                            }).attr("width", thisSize === 'large' ? tickSize + 1 : tickSize).attr('height', thisSize === 'large' ? tickSize + 1 : tickSize).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320); // .attr("cy", -5);
                            legend.append("text").attr("x", thisSize === 'large' ? tickSize + 2 : tickSize + 1).text(function(d) {
                                var text = d;
                                if (thisSize === 'small') { // small
                                    if (text.length > 7) text = text.substring(0, 6) + "…";
                                } else if (thisSize === 'middle') { //middle
                                    if (text.length > 10) text = text.substring(0, 9) + "…";
                                } else {
                                    if (text.length > 13) text = text.substring(0, 12) + "…";
                                }
                                return text; // large
                            }).attr("font-size", thisSize === "small" || thisSize === "middle" ? tickSize : tickSize + 1).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                            legend.attr("width", Math.round(legend.node().getBBox().width));
                            legend.attr("height", Math.floor(legend.node().getBBox().height));
                        });
                }
            } // add trend line 
            // draw trendline first to ensure it stay in the bottom of the line
            if (!hasSeries) {
                var ret = getLeastSquares(factData.map(function(d) {
                    return x(parseTime(d[breakdown[0].field]));
                }), factData.map(function(d) {
                    return y(d[measureName]);
                }));
                var x1 = 0,
                    x2 = width; //regression in range, can not out of content
                var x_ymin = (height - ret.b) / ret.m,
                    x_ymax = (0 - ret.b) / ret.m;
                if (x_ymin > x_ymax) {
                    var _i = x_ymin;
                    x_ymin = x_ymax;
                    x_ymax = _i;
                }
                x1 = x1 < x_ymin ? x_ymin : x1;
                x2 = x2 > x_ymax ? x_ymax : x2;
                if (ret.m === 0) x1 = 0;
                var y1 = ret.m * x1 + ret.b,
                    y2 = ret.m * x2 + ret.b;
                if (ret.m === -Infinity) {
                    x1 = x2;
                    y1 = 0;
                    y2 = height;
                }
                svg.append("g").attr("class", "trendlineLayer").selectAll(".trendline").data(seriesData).enter().append("line").attr("class", function(d) {
                    return "trendline " + d.key;
                }).attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2).attr("stroke", _color2.default.DEFAULT).attr("stroke-width", strokeWidth).attr("stroke-dasharray", strokeWidth * 2 + ', ' + strokeWidth);
            }
            var lineGraph = svg.append("g").attr("class", "lineGraph");
            lineGraph.selectAll(".series").data(seriesData).enter().append("g").attr("class", function(d) {
                return "series " + d.key.replace(/\s/g, "");
            }).each(function(d, i) { // append the line for the line chart
                drawLines(d3.select(this), d, hasSeries, seriesName, lineGen, strokeWidth, true); // append the dot for the line chart
                var isDotSolid = true;
                drawDots(d3.select(this), d, breakdown, measure, [], hasSeries, seriesName, x, y, dotR, isDotSolid, strokeWidth, _color2.default, true);
            });
            if (this.style() === _style2.default.COMICS) {
                if (hasSeries) {
                    var metaphorWidth = width * 0.26,
                        metaphorHeight = 1.25 * metaphorWidth;
                    var metaphor = svg.append("image").attr('xlink:href', _metaphor7.default);
                    if (this.size() === _size2.default.WIDE) {
                        metaphorWidth = width * 0.24;
                        metaphorHeight = 1.25 * metaphorWidth;
                    } else if (this.size() === _size2.default.MIDDLE) {
                        metaphorWidth = width * 0.24;
                        metaphorHeight = 1.25 * metaphorWidth;
                    }
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
                } else { //points
                    // let filterPoints = [];
                    // svg.selectAll(".tick").each(function(d){
                    //     let item = factData.find(i => parseTime(i[breakdown[0].field]).getTime() === d.getTime());
                    //     filterPoints.push(item);
                    // });
                    var filterPoints = seriesData[0].values;
                    if (filterPoints.length > 7) { //too much point
                        //draw dash line
                        var x0 = x(parseTime(filterPoints[0][breakdown[0].field])),
                            _x = x(parseTime(filterPoints.slice(-1)[0][breakdown[0].field])),
                            y0 = y(filterPoints[0][measureName]),
                            _y = y(filterPoints.slice(-1)[0][measureName]),
                            _x2 = _x + width * 0.14,
                            _y2 = (_x2 - _x) * (_y - y0) / (_x - x0) + _y;
                        var line_m = svg.append('line').attr("x1", _x).attr("x2", _x2).attr("y1", _y).attr("y2", _y2).attr("stroke", _color2.default.DASHLINE).attr("stroke-width", strokeWidth).attr("stroke-dasharray", strokeWidth * 2 + ', ' + strokeWidth);
                        svg.node().prepend(line_m.node());
                        var _metaphorWidth = width * 0.26,
                            _metaphorHeight = 1.24 * _metaphorWidth;
                        var _metaphor = svg.append("image").attr('xlink:href', _metaphor9.default);
                        if (this.size() === _size2.default.WIDE) {
                            _metaphorWidth = width * 0.20;
                            _metaphorHeight = 1.24 * _metaphorWidth;
                        } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                            _metaphorWidth = width * 0.24;
                            _metaphorHeight = 1.24 * _metaphorWidth;
                        }
                        _metaphor.attr("width", _metaphorWidth).attr("height", _metaphorHeight).attr("x", _x2 - _metaphorWidth * 0.06).attr("y", _y2 - _metaphorHeight * 0.06);
                    } else {
                        var metaphorWidth7 = width / (filterPoints.length - 1) * 0.6,
                            metaphorWidth8 = metaphorWidth7 / 1.14;
                        var metaphorHeight7 = metaphorWidth7 * 0.95;
                        var metaphorHeight8 = metaphorWidth8 * 1.2;
                        for (var _i2 = 1; _i2 < filterPoints.length; _i2++) {
                            var middleX = (x(parseTime(filterPoints[_i2][breakdown[0].field])) + x(parseTime(filterPoints[_i2 - 1][breakdown[0].field]))) / 2;
                            var middleY = (y(filterPoints[_i2][measureName]) + y(filterPoints[_i2 - 1][measureName])) / 2;
                            if (filterPoints[_i2][measureName] - filterPoints[_i2 - 1][measureName] > 0) { //up
                                svg.append("image").attr('xlink:href', _metaphor5.default).attr("width", metaphorWidth8).attr("height", metaphorHeight8).attr("x", middleX - metaphorWidth8 * 0.7).attr("y", middleY - metaphorHeight8 * 0.96);
                            } else { //down
                                svg.append("image").attr('xlink:href', _metaphor3.default).attr("width", metaphorWidth7).attr("height", metaphorHeight7).attr("x", middleX - metaphorWidth7 * 0.5).attr("y", middleY - metaphorHeight7 * 1);
                            }
                        }
                    } //center居中
                    svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x) + "," + ((this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y) + ")");
                }
            } else if (this.style() === _style2.default.PICTOGRAPH && !hasSeries) { // let factData = this.factdata();
                // console.log('factdata',this.factdata);
                var subspace = this.subspace();
                var size = this.size();
                var focus = this.focus();
                lineGen = lineGeneration(breakdown, measure, x, y);
                var lingGraph = svg.append("g").attr("class", "lineGraph");
                lingGraph.selectAll(".series").data(seriesData).enter().append("g").attr("class", function(d) {
                    return "series " + d.key.replace(/\s/g, "");
                }).each(function(d, i) { // append the line for the line chart
                    drawLines(d3.select(this), d, hasSeries, seriesName, lineGen, strokeWidth); // append the dot for the line chart
                    var isDotSolid = true;
                    var isTrend = true;
                    var isRank = false;
                    d3.selectAll('.dots').remove();
                    drawIconDots(d3.select(this), d, breakdown, measure, focus, hasSeries, seriesName, x, y, dotR, isDotSolid, strokeWidth, _color2.default, isTrend, isRank, width, height, factData, subspace, size);
                }); //使图表居中
                var cardWidth = chartSize.width;
                var cardHeight = chartSize.height;
                var a = svg.node().getBBox().width;
                var b = svg.node().getBBox().height;
                var c = svg.node().getBBox().x;
                var e = svg.node().getBBox().y;
                var transx = -c + cardWidth / 2 - a / 2;
                var transy = -e + cardHeight / 2 - b / 2;
                if (a > cardWidth) {
                    svg.attr("transform", 'scale(' + width / a + ')  translate(' + (cardWidth / (2 * width / a) - (a / 2 + c)) + ',' + (cardHeight / (2 * width / a) - (b / 2 + e)) + ') ');
                } else {
                    svg.attr("transform", 'translate(' + transx + ' ,' + transy + ') ');
                }
            }
            return svg;
        }
    }, {
        key: 'displayRank',
        value: function displayRank() {
            var _this3 = this; /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var focus = this.focus();
            var hasSeries = breakdown.length > 1 ? true : false;
            if (!hasSeries) return;
            if (focus.length === 0) return;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = focus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var f = _step.value;
                    if (f.field !== breakdown[1].field) return;
                } // let measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field
                /* ----------------------- graph set up (size, margin) ---------------------- */
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
            focus = focus.slice(0, 3);
            var seriesData = d3.nest().key(function(d) {
                return d[breakdown[1].field];
            }).sortValues(sortByDateAscending(breakdown)).entries(factData);
            seriesData = seriesData.filter(function(series) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;
                try {
                    for (var _iterator2 = focus[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var f = _step2.value;
                        if (f.value === series.key) return true;
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
                return false;
            }); // if(focus.length > 10) seriesData = seriesData.slice(0, 10) 
            // sort by input focus order
            var focusOrder = focus.map(function(d) {
                return d.value;
            });
            seriesData.sort(function(a, b) {
                return focusOrder.indexOf(a.key) - focusOrder.indexOf(b.key);
            });
            var seriesName = d3.map(seriesData, function(d) {
                return d.key;
            }).keys();
            var moreThan = false;
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var chartMargin = {
                "small": {
                    "top": 5,
                    "right": 33,
                    "bottom": 50,
                    "left": 33
                },
                "middle": {
                    "top": 10,
                    "right": 50,
                    "bottom": 55,
                    "left": 50
                },
                "wide": {
                    "top": 12,
                    "right": 180,
                    "bottom": 40,
                    "left": 15 + 20 * chartSize.width / 320 // fact === "difference" ? 30 : 20
                },
                "large": {
                    "top": 30,
                    "right": 20 + 20 * chartSize.width / 320,
                    "bottom": 150 + 50,
                    "left": 20 + 20 * chartSize.width / 320
                }
            };
            var margin = chartMargin[this.size()];
            var _getSizeBySize4 = getSizeBySize(this.size(), chartSize, "rank", hasSeries, moreThan),
                tickSize = _getSizeBySize4.tickSize,
                dotR = _getSizeBySize4.dotR,
                strokeWidth = _getSizeBySize4.strokeWidth,
                padding = _getSizeBySize4.padding,
                width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom; /* ----------------------------- data prosessing ---------------------------- */ // data example
            // [{Sales: 1054260, Year: "2010", Brand: "Ford"}
            // {Sales: 1296077, Year: "2011", Brand: "Ford"}]
            var svg = initSvg(this.container(), width, height, margin);
            if (this.style() === _style2.default.COMICS) width = 0.8 * width; /* ------------------------------ axis setting ------------------------------ */ // padding is 0 !!!
            var _setupXAsix4 = setupXAsix(seriesData, factData, breakdown, measure, padding, width, height),
                x = _setupXAsix4.x,
                y = _setupXAsix4.y; /* ----------------------------------- vis ---------------------------------- */
            this._x = x;
            this._y = y; // add the x Axis
            var axisX = drawXAsix(seriesData, factData, breakdown, x); // custom x Axis
            svg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + height + ")").call(axisX).call(function(g) {
                g.attr('font-size', tickSize);
                g.attr("font-family", ENGFONT);
                g.selectAll(".tick").selectAll('line').remove();
                g.selectAll("text").attr("y", Math.max(9 * chartSize.height / 320, dotR * 1.5));
                paddingXAsix(g, 0);
                if (_this3.size() === 'large') { // 检查够不够放
                    var tickWidth = 0;
                    var xRange = x.range()[1] - x.range()[0];
                    g.selectAll(".tick").each(function(d, i) {
                        var _thisWidth = d3.select(this).node().getBBox().width;
                        tickWidth += _thisWidth;
                    });
                    if (tickWidth > xRange * 0.99) { //横的不够放
                        g.selectAll("text").attr("transform", 'translate(-' + 5 + ',0)rotate(-45)').attr("text-anchor", "end"); // 检查斜着有没有遮挡
                        var prev = g.select("text").node().getBBox().height;
                        var rotateAble = Math.floor(xRange / prev) >= g.selectAll(".tick").size(); // 如果遮挡 摆回正的
                        if (!rotateAble) {
                            g.selectAll("text").attr("transform", "").attr("text-anchor", "middle");
                            removeOverlapX(g, x);
                        }
                    }
                } else removeOverlapX(g, x);
                return g;
            });
            var sortSeriesData = seriesData.sort(function(a, b) {
                return a.values[a.values.length - 1] - b.values[b.values.length - 1];
            });
            var sortKey = {};
            sortSeriesData.forEach(function(d, i) {
                sortKey[d.key] = i + 1;
            }); // svg.append("g")
            //     .attr("class", "gridline")
            //     .attr("transform", "translate(0," + height + ")")
            //     .call(axisX)
            //     .call(g => {
            //         g.selectAll(".tick")
            //             .selectAll('line')
            //             .attr("color", Color.BACKGROUND)
            //             .attr("y2", -height)
            //             .attr("y1", -1);
            //         g.selectAll(".domain")
            //             .remove()
            //         g.selectAll(".tick")
            //             .selectAll("text")
            //             .remove()
            // })
            // add invisible y Axis
            var axisY = d3.axisLeft(y);
            svg.append("g").call(axisY).call(function(g) {
                g.selectAll(".tick").selectAll('line').remove(); // .attr("color", Color.BACKGROUND)
                // .attr("x2", width);
                g.selectAll(".tick").filter(function(_, i) {
                    return i === 0;
                }).attr("display", "none").attr("y1", -1);
                g.selectAll(".tick").selectAll("text").attr("display", "none");
                g.select('path').attr("display", "none");
                return g;
            });
            if (this.size() === "wide") {
                svg.append("foreignObject").attr("x", width + 20).attr("y", 0).attr("width", margin.right - 10).attr("height", height).append("xhtml:div").attr("class", "legends").style("display", "flex").style("flex-direction", "column").style("flex-wrap", "wrap").style("align-content", "space-around").style("justify-content", "space-evenly").style("height", Math.round(height) + "px").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0).style("margin-right", 5 * chartSize.width / 320 + "px").each(function(d, i) {
                    var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                    legend.append("rect").attr("fill", function(d) {
                        return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                    }).attr("width", tickSize + 1).attr('height', tickSize + 1).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320);
                    legend.append("text").attr("x", tickSize + 3).text(function(d) {
                        return d.length > 12 ? d.substring(0, 11) + "…" : d;
                    }).attr("font-size", tickSize + 1).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                    legend.attr("width", Math.round(legend.node().getBBox().width));
                    legend.attr("height", Math.floor(legend.node().getBBox().height));
                });
            } else {
                var thisSize = this.size();
                var isRotate = svg.selectAll(".xAxis").select("text").attr("transform") ? true : false;
                var xAxisHeightOffset = void 0;
                if (this.size() === 'small') xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.35;
                else if (this.size() === 'middle') xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.35;
                else {
                    if (isRotate) xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.2;
                    else xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.5;
                }
                svg.append("foreignObject").attr("x", -margin.left * 0.5).attr("y", height + xAxisHeightOffset).attr("width", width + margin.left * 0.5 * 2).attr("height", margin.bottom - xAxisHeightOffset).append("xhtml:div").attr("class", "legends").style("display", "grid").style("grid-template-columns", 'repeat(' + (thisSize === "large" ? 1 : 3) + ', auto)').style("justify-content", "center").style("align-items", "center").style("justify-items", thisSize === "large" ? "start" : "center").style("padding-top", "0px").style("height", Math.round(margin.bottom - xAxisHeightOffset) + "px").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0).style("margin-right", 5 * chartSize.width / 320 + "px").each(function(d, i) {
                    var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                    legend.append("rect").attr("fill", function(d) {
                        return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                    }).attr("width", thisSize === 'large' ? tickSize + 1 : tickSize).attr('height', thisSize === 'large' ? tickSize + 1 : tickSize).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320); // .attr("cy", -5);
                    legend.append("text").attr("x", thisSize === 'large' ? tickSize + 3 : tickSize + 1).text(function(d) {
                        if (thisSize === 'large') {
                            var rankId = "#" + sortKey[d] + " ";
                            var allTextLength = seriesName.reduce(function(a, b) {
                                return a + b.length;
                            }, 0);
                            var enoughForOneLongText = allTextLength > 23 ? false : true;
                            if (enoughForOneLongText) return d.length > 14 ? rankId + d.substring(0, 13) + "…" : rankId + d;
                            return d.length > 11 ? rankId + d.substring(0, 10) + "…" : rankId + d;
                        } else if (thisSize === 'middle') {
                            var _allTextLength = seriesName.reduce(function(a, b) {
                                return a + b.length;
                            }, 0);
                            var _enoughForOneLongText = _allTextLength > 22 ? false : true;
                            if (_enoughForOneLongText) return d.length > 14 ? d.substring(0, 13) + "…" : d;
                            return d.length > 9 ? d.substring(0, 8) + "…" : d;
                        } else {
                            var _allTextLength2 = seriesName.reduce(function(a, b) {
                                return a + b.length;
                            }, 0);
                            var _enoughForOneLongText2 = _allTextLength2 > 20 ? false : true;
                            if (_enoughForOneLongText2) return d.length > 14 ? d.substring(0, 13) + "…" : d;
                            return d.length > 7 ? d.substring(0, 6) + "…" : d;
                        }
                    }).attr("font-size", thisSize === "small" || thisSize === "middle" ? tickSize : tickSize + 1).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                    legend.attr("width", Math.round(legend.node().getBBox().width));
                    legend.attr("height", Math.floor(legend.node().getBBox().height));
                });
            } // line Function
            var lineGen = lineGeneration(breakdown, measure, x, y);
            var lingGraph = svg.append("g").attr("class", "lineGraph");
            lingGraph.selectAll(".series").data(seriesData).enter().append("g").attr("class", function(d) {
                return "series " + d.key.replace(/\s/g, "");
            }).each(function(d, i) { // append the line for the line chartdrawLines(d3.select(this), d, hasSeries, seriesName, lineGen, strokeWidth, true);
                drawLines(d3.select(this), d, hasSeries, seriesName, lineGen, strokeWidth); // append the dot for the line chart
                var isDotSolid = false;
                drawDots(d3.select(this), d, breakdown, measure, [], hasSeries, seriesName, x, y, dotR, isDotSolid, strokeWidth, _color2.default);
            });
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.3,
                    metaphorHeight = 1.23 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor17.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.3;
                    metaphorHeight = 1.23 * metaphorWidth;
                    svg.select("foreignObject").attr("x", width / 0.8 + 10);
                } else {
                    if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                        metaphorWidth = width * 0.35;
                        metaphorHeight = 1.23 * metaphorWidth;
                    }
                    svg.select("foreignObject").attr("width", width / 0.8 + margin.left * 0.5 * 2);
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.2).attr("y", height - metaphorHeight * 0.96);
            }
            if (this.style() === _style2.default.PICTOGRAPH) { // let factData = this.factdata();
                // console.log('factdata',this.factdata);
                var subspace = this.subspace();
                var size = this.size();
                lineGen = lineGeneration(breakdown, measure, x, y);
                lingGraph = svg.append("g").attr("class", "lineGraph");
                lingGraph.selectAll(".series").data(seriesData).enter().append("g").attr("class", function(d) {
                    return "series " + d.key.replace(/\s/g, "");
                }).each(function(d, i) { // // append the line for the line chart
                    // drawLines(d3.select(this), d, hasSeries, seriesName, lineGen, strokeWidth);
                    // append the dot for the line chart
                    var isDotSolid = false;
                    var isTrend = false;
                    var isRank = true;
                    drawIconDots(d3.select(this), d, breakdown, measure, focus, hasSeries, seriesName, x, y, dotR, isDotSolid, strokeWidth, _color2.default, isTrend, isRank, width, height, factData, subspace, size);
                }); //使图表居中
                var cardWidth = chartSize.width;
                var cardHeight = chartSize.height;
                var a = svg.node().getBBox().width;
                var b = svg.node().getBBox().height;
                var c = svg.node().getBBox().x;
                var e = svg.node().getBBox().y;
                var transx = -c + cardWidth / 2 - a / 2;
                var transy = -e + cardHeight / 2 - b / 2;
                if (a > cardWidth) {
                    svg.attr("transform", 'scale(' + width / a + ')  translate(' + (cardWidth / (2 * width / a) - (a / 2 + c)) + ',' + (cardHeight / (2 * width / a) - (b / 2 + e)) + ') ');
                } else {
                    svg.attr("transform", 'translate(' + transx + ' ,' + transy + ') ');
                }
            }
            return svg;
        }
    }, {
        key: 'displayDifference',
        value: function displayDifference() {
            /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var focus = this.focus();
            if (focus.length < 2 || breakdown.length < 2) {
                return;
            }
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;
            try {
                for (var _iterator3 = focus[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var f = _step3.value;
                    if (f.field !== breakdown[1].field) return;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
            var measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field; /* ----------------------- graph set up (size, margin) ---------------------- */
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize5 = getSizeBySize(this.size(), chartSize, "difference", true),
                margin = _getSizeBySize5.margin,
                tickSize = _getSizeBySize5.tickSize,
                dotR = _getSizeBySize5.dotR,
                strokeWidth = _getSizeBySize5.strokeWidth,
                padding = _getSizeBySize5.padding,
                width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom; /* ----------------------------- data prosessing ---------------------------- */
            factData = factData.filter(function(d) {
                return d[breakdown[1].field] === focus[0].value || d[breakdown[1].field] === focus[1].value;
            });
            var seriesName = d3.map(factData, function(d) {
                return d[breakdown[1].field];
            }).keys();
            var seriesData = d3.nest().key(function(d) {
                return d[breakdown[1].field];
            }).sortValues(sortByDateAscending(breakdown)).entries(factData); // make up difference data
            var differenceData = [],
                arr1 = seriesData[0].values,
                arr2 = seriesData[1].values;
            var _loop = function _loop(i) {
                if (arr2.find(function(d) {
                        return d[breakdown[0].field] === arr1[i][breakdown[0].field];
                    })) {
                    differenceData.push([arr1[i], arr2.find(function(d) {
                        return d[breakdown[0].field] === arr1[i][breakdown[0].field];
                    })]);
                }
            };
            for (var i = 0; i < arr1.length; i++) {
                _loop(i);
            } /* ----------------------------------- vis ---------------------------------- */
            var svg = initSvg(this.container(), width, height, margin);
            if (this.style() === _style2.default.COMICS) width = 0.8 * width; /* ------------------------------ axis setting ------------------------------ */
            var _setupXAsix5 = setupXAsix(seriesData, factData, breakdown, measure, padding, width, height),
                x = _setupXAsix5.x,
                y = _setupXAsix5.y; // add the x Axis
            var axisX = drawXAsix(seriesData, factData, breakdown, x);
            var xAxisOffset = height;
            if (y.domain()[0] !== 0) {
                xAxisOffset = y(0);
            } // custom x Axis    
            svg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + xAxisOffset + ")").call(axisX).call(function(g) {
                g.attr('font-size', tickSize);
                g.attr("font-family", ENGFONT);
                var domainD = g.selectAll(".domain").attr("d");
                var start = domainD.split(",")[0].substr(1);
                var end = domainD.split("H")[1].split("V")[0];
                g.selectAll(".domain").attr("stroke-width", 1).attr('stroke', _color2.default.AXIS).attr('d', "M" + (+start - padding) + ",0H" + (+end + padding));
                g.selectAll("text").attr("y", 9 * chartSize.height / 320);
                g.selectAll(".tick").selectAll("line").attr("y2", 6 * chartSize.height / 320);
                removeOverlapX(g, x);
                return g;
            }); // add y Axis
            var axisY = d3.axisLeft(y).ticks(5).tickFormat(function(d) {
                if (d / 1000000 >= 1) {
                    d = d / 1000000 + "M";
                } else if (d / 1000 >= 1) {
                    d = d / 1000 + "K";
                }
                return d;
            }); // gridline
            svg.append("g").attr("class", "gridline").call(axisY).call(function(g) {
                g.selectAll(".tick").selectAll("line").attr("x1", 0).attr("x2", width).attr("stroke-width", 0.5).attr("stroke", _color2.default.DIVIDER);
                g.selectAll(".domain").remove();
                g.selectAll(".tick").selectAll("text").remove();
            }); // y axis
            if (this.size() !== 'small') {
                svg.append("g").attr("class", "yAxis").call(axisY).call(function(g) {
                    g.attr('font-size', tickSize);
                    g.attr("font-family", ENGFONT);
                    g.selectAll(".tick").filter(function(_, i) {
                        return i === 0;
                    }).selectAll("line").attr("display", "none");
                    var domainDY = g.selectAll(".domain").attr("d");
                    var startY = domainDY.split(",")[1].split("H")[0];
                    var endY = domainDY.split("V")[1].split("H")[0];
                    g.selectAll(".domain").attr("stroke-width", 1).attr('stroke', _color2.default.AXIS).attr('d', "M0, " + startY + "V" + endY);
                    g.selectAll(".tick").selectAll("line").attr("x2", -6 * chartSize.height / 320);
                    g.selectAll("text").attr("x", -9 * chartSize.height / 320);
                    return g;
                });
            } // add difference line
            svg.append("g").attr("class", "differences").selectAll(".difference").data(differenceData).enter().append("line").attr("class", "difference").attr("x1", function(d) {
                return x(parseTime(d[0][breakdown[0].field]));
            }).attr("x2", function(d) {
                return x(parseTime(d[1][breakdown[0].field]));
            }).attr("y1", function(d) {
                return y(d[0][measureName]);
            }).attr("y2", function(d) {
                return y(d[1][measureName]);
            }).attr("stroke", _color2.default.DASHLINE).attr("stroke-dasharray", "5,5"); // line Function
            var lineGen = lineGeneration(breakdown, measure, x, y);
            var lingGraph = svg.append("g").attr("class", "lineGraph");
            lingGraph.selectAll(".series").data(seriesData).enter().append("g").attr("class", function(d) {
                return "series " + d.key.replace(/\s/g, "");
            }).each(function(d, i) { // append the line for the line chart
                drawLines(d3.select(this), d, true, seriesName, lineGen, strokeWidth); // append the dot for the line chart
                var isDotSolid = true;
                drawDots(d3.select(this), d, breakdown, measure, [], true, seriesName, x, y, dotR, isDotSolid, strokeWidth, _color2.default);
            });
            if (this.size() === "wide") {
                svg.append("foreignObject").attr("x", width + 10).attr("y", 0).attr("width", margin.right - 10).attr("height", height + margin.bottom * 0.5).append("xhtml:div").attr("class", "legends").style("display", "flex").style("flex-direction", "column").style("flex-wrap", "wrap").style("align-content", "space-around").style("justify-content", "space-evenly").style("height", Math.round(height + margin.bottom * 0.6) + "px").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 1).style("margin-right", 5 * chartSize.width / 320 + "px").each(function(d, i) {
                    var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                    legend.append("rect").attr("fill", function(d) {
                        return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                    }).attr("width", 10 * tickSize / 12).attr('height', 10 * tickSize / 12).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320);
                    legend.append("text").attr("x", 12 * tickSize / 12).text(function(d) {
                        return d.length > 12 ? d.substring(0, 10) + "..." : d;
                    }).attr("font-size", tickSize).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                    legend.attr("width", Math.round(legend.node().getBBox().width));
                    legend.attr("height", Math.floor(legend.node().getBBox().height));
                });
            } else {
                var xAxisHeight = svg.selectAll(".xAxis").node().getBBox().height;
                var thisSize = this.size();
                var xAxisHeightOffset = void 0;
                if (this.size() === 'small') xAxisHeightOffset = xAxisHeight * 1.35;
                else if (this.size() === 'middle') xAxisHeightOffset = xAxisHeight * 1.3;
                else xAxisHeightOffset = xAxisHeight * 2;
                svg.append("foreignObject").attr("x", 0).attr("y", height + xAxisHeightOffset).attr("width", width).attr("height", margin.bottom - xAxisHeightOffset).append("xhtml:div").attr("class", "legends").style("display", "grid").style("grid-template-columns", 'repeat(2, auto)').style("justify-content", "center").style("align-items", "center").style("justify-items", "center") // .style("justify-content", thisSize === 'middle' ? "flex-start": "space-evenly")
                    .style("padding-top", "1px").style("height", Math.round(margin.bottom - xAxisHeightOffset) + "px").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0).style("margin-right", 5 * chartSize.width / 320 + "px").each(function(d, i) {
                        var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                        legend.append("rect").attr("fill", function(d) {
                            return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                        }).attr("width", thisSize === 'large' ? tickSize + 2 : tickSize + 1).attr('height', thisSize === 'large' ? tickSize + 2 : tickSize + 1).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320); // .attr("cy", -5);
                        legend.append("text").attr("x", thisSize === 'large' ? tickSize + 4 : tickSize + 2).text(function(d) {
                            if (thisSize === 'large') return d.length > 22 ? d.substring(0, 21) + "..." : d;
                            else if (thisSize === 'middle') return d.length > 16 ? d.substring(0, 15) + "..." : d;
                            else return d.length > 17 ? d.substring(0, 16) + "..." : d;
                        }).attr("font-size", thisSize === 'large' ? tickSize + 2 : tickSize + 1).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                        legend.attr("width", Math.round(legend.node().getBBox().width));
                        legend.attr("height", Math.floor(legend.node().getBBox().height));
                    });
            }
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.25,
                    metaphorHeight = 1.5 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor11.default).attr("width", metaphorWidth).attr("height", metaphorHeight);
                if (this.size() === _size2.default.WIDE) {
                    metaphor.attr("x", width).attr("y", height - metaphorHeight);
                    svg.select("foreignObject").attr("x", width / 0.8 + 10);
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.3;
                    metaphorHeight = 1.5 * metaphorWidth;
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width * 1.01).attr("y", height - metaphorHeight);
                } else {
                    metaphor.attr("x", width * 1.01).attr("y", height - metaphorHeight);
                }
            }
            return svg;
        }
    }, {
        key: 'animateTrend',
        value: function animateTrend() {
            /* -------------------------------- init data ------------------------------- */
            var breakdown = this.breakdown();
            var hasSeries = breakdown.length > 1 ? true : false;
            var ticks = 10;
            var duration = this.duration();
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize6 = getSizeBySize(this.size(), chartSize, "trend", hasSeries),
                margin = _getSizeBySize6.margin,
                dotR = _getSizeBySize6.dotR,
                width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom; /* -------------------------------- basic vis ------------------------------- */
            var svg = this.displayTrend();
            if (!svg) return; /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                axisFadeIn: {
                    duration: 1,
                    index: 0
                },
                majorSwipe: {
                    duration: breakdown.length === 1 ? 5 : 9,
                    index: 1
                },
                trendlineFadeIn: {
                    duration: 4,
                    index: 2
                }
            };
            var everyTick = duration / ticks; /* ---------------------------- animation of axis --------------------------- */
            var xAxis = svg.selectAll(".xAxis"); // disable xAxis tick line
            xAxis.selectAll("line").remove(); // hide xAxis text first
            xAxis.selectAll("text").attr("opacity", 0); // fade in axis 
            xAxis.selectAll(".domain").attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1); // fade in axis text one by one
            setTimeout(function() {
                xAxis.selectAll("text").attr("opacity", 0).transition().delay(function(_, i) {
                    return everyTick * animation.majorSwipe.duration / xAxis.selectAll("text").size() * i;
                }).duration(everyTick * animation.majorSwipe.duration / xAxis.selectAll("text").size()).attr("opacity", 1);
            }, everyTick * countTicksBeforeIndex(animation, animation.majorSwipe.index)); /* ---------------------------- animation of line --------------------------- */
            var lineGraph = svg.selectAll(".lineGraph");
            var uuid = (0, _v2.default)(); // defs
            lineGraph.attr('id', 'lineGraphClip').attr('clip-path', 'url(#clip_lineGraph_' + uuid + ')');
            lineGraph.append('defs').attr('class', 'trend_defs').append('clipPath').attr('id', 'clip_lineGraph_' + uuid).append('rect').attr('x', 0).attr("y", -dotR).attr('width', 0).attr('height', height + 2 * dotR);
            setTimeout(function() {
                lineGraph.select("#clip_lineGraph_" + uuid + " rect").attr('width', 0).transition().duration(everyTick * animation.majorSwipe.duration).ease(d3.easeLinear).attr('width', width + dotR);
            }, everyTick * countTicksBeforeIndex(animation, animation.majorSwipe.index)); /* ------------------------- animation of trendline ------------------------- */
            if (breakdown.length === 1) {
                var getTanDeg = function getTanDeg(tan) {
                    var result = Math.atan(tan) / (Math.PI / 180);
                    result = Math.round(result);
                    return result;
                };
                var trendlineLayer = svg.selectAll(".trendlineLayer");
                var trendline = trendlineLayer.selectAll("line");
                var originEndX2 = trendline.attr("x2");
                var originEndY2 = trendline.attr("y2");
                var originEndX1 = trendline.attr("x1");
                var originEndY1 = trendline.attr("y1"); // add triangle
                var finalPosition = originEndX2 + ', ' + originEndY2;
                var f_x = originEndX2,
                    f_y = originEndY2,
                    s_x = originEndX1,
                    s_y = originEndY1;
                var slope = (f_y - s_y) / (f_x - s_x);
                var deg = void 0;
                if (getTanDeg(slope) < 0) {
                    deg = 90 - Math.abs(getTanDeg(slope));
                } else {
                    deg = 90 + getTanDeg(slope);
                }
                trendlineLayer.append("path").attr("class", "triangle").attr("transform", "translate(" + finalPosition + ")rotate(" + deg + ")").attr("d", d3.symbol().type(d3.symbolTriangle).size(0.16 * height)).attr("fill", _color2.default.HIGHLIGHT);
                trendline.attr("stroke", _color2.default.HIGHLIGHT).attr("stroke-width", trendline.attr("stroke-width") * 2);
                trendlineLayer.node().parentNode.appendChild(trendlineLayer.node()); // trendline.attr("x2", originEndX1)
                //          .attr("y2", originEndY1);
                var defsX = trendlineLayer.node().getBBox().x,
                    defsY = trendlineLayer.node().getBBox().y,
                    defsHeight = trendlineLayer.node().getBBox().height,
                    defsWidth = trendlineLayer.node().getBBox().width;
                var _uuid = (0, _v2.default)();
                trendlineLayer.attr("id", "trendSVGClip").attr("clip-path", "url(#clip_trend_" + _uuid + ")");
                trendlineLayer.append("defs").attr("class", "trend_defs").append("clipPath").attr("id", "clip_trend_" + _uuid).append("rect").attr("x", defsX - 10).attr("y", defsY - 10).attr("width", 0).attr("height", defsHeight + 10);
                var _lineGraph = svg.selectAll(".lineGraph");
                setTimeout(function() {
                    _lineGraph.attr("opacity", 1).transition().duration(everyTick * animation.trendlineFadeIn.duration * 0.4).attr("opacity", 0.1);
                    trendlineLayer.select("#clip_trend_" + _uuid + " rect").attr("width", 0).transition().delay(everyTick * animation.trendlineFadeIn.duration * 0.4).duration(everyTick * animation.trendlineFadeIn.duration * 0.6).ease(d3.easeLinear).attr("width", defsWidth + 10); // trendline.attr("x2", originEndX1)
                    //     .attr("y2", originEndY1)
                    //     .transition()
                    //     .delay(everyTick * animation.trendlineFadeIn.duration * 0.5)
                    //     .duration(everyTick * animation.trendlineFadeIn.duration)
                    //     .attr("x2", originEndX2)
                    //     .attr("y2", originEndY2);
                }, everyTick * countTicksBeforeIndex(animation, animation.trendlineFadeIn.index));
            }
        }
    }, {
        key: 'animateOutlier',
        value: function animateOutlier() {
            /* -------------------------------- init data ------------------------------- */
            var ticks = 10;
            var duration = this.duration();
            var factData = this.factdata();
            var breakdown = this.breakdown();
            var measure = this.measure();
            var focus = this.focus();
            var measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
            var seriesData = [];
            seriesData.push({
                key: "All",
                values: factData.sort(sortByDateAscending(breakdown))
            }); /* -------------------------------- basic vis ------------------------------- */
            var svg = this.displayOutlier();
            if (!svg) return; /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                axisFadeIn: {
                    duration: 1,
                    index: 0
                },
                majorFadeIn: {
                    duration: 2,
                    index: 1
                },
                regLineDraw: {
                    duration: 2,
                    index: 2
                },
                otherFadeOut: {
                    duration: 2,
                    index: 3
                },
                drawCircle: {
                    duration: 3,
                    index: 4
                },
                showDate: {
                    duration: 3,
                    index: 4
                }
            };
            var everyTick = duration / ticks; /* ---------------------------- step 0 axisFadeIn --------------------------- */
            var xAxis = svg.selectAll(".xAxis"); // disable xAxis tick line
            xAxis.selectAll("line").remove(); // disable xAxis label text
            xAxis.selectAll(".xLabel").remove(); // disable xAxis arrow
            xAxis.selectAll(".xArrow").remove(); // disable xAxis tick line
            xAxis.selectAll("line").remove();
            xAxis.select(".tick").attr("opacity", 0); // fade in axis 
            xAxis.selectAll(".domain").attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1); /* ---------------------------- step 1 majorFadeIn ---------------------------- */
            var dots = svg.selectAll(".dots"); // dots.attr("opacity", 0);
            dots.selectAll("circle").each(function() {
                d3.select(this).attr("fill", _color2.default.DEFAULT);
            });
            var lineGraph = svg.selectAll(".lineGraph");
            lineGraph.attr("opacity", 0);
            setTimeout(function() {
                lineGraph.transition().duration(everyTick * animation.majorFadeIn.duration).attr("opacity", 1);
            }, everyTick * countTicksBeforeIndex(animation, animation.majorFadeIn.index)); /* --------------------------- step 2 regLineDraw -------------------------- */
            var y = this._y,
                width = this._width, // height = this._height,
                strokeWidth = this._strokeWidth; // let ret = getLeastSquares(factData.map(d => x(parseTime(d[breakdown[0].field]))),
            //         factData.map(d => y(d[measureName])));
            var avgY = y(d3.sum(factData, function(d) {
                return d[measureName];
            }) / factData.length);
            var x1 = 0,
                x2 = width;
            svg.append("g").attr("class", "trendlineLayer").selectAll(".trendline").data(seriesData).enter().append("line").attr("class", function(d) {
                return "trendline " + d.key;
            }).attr("x1", x1).attr("x2", x1).attr("y1", avgY).attr("y2", avgY).attr("stroke", _color2.default.DASHLINE).attr("stroke-width", strokeWidth).attr("stroke-dasharray", strokeWidth * 2 + ', ' + strokeWidth).transition().duration(everyTick * animation.regLineDraw.duration).delay(everyTick * countTicksBeforeIndex(animation, animation.regLineDraw.index)).attr("x2", x2).attr("y2", avgY);
            var fontSize = xAxis.select("text").attr("font-size");
            var avgFontSize = fontSize * 0.8;
            svg.append("g").append("text").attr("x", x2).attr("y", avgY - avgFontSize * 0.5).attr("text-anchor", "end") // .attr()
                .text("average").attr("fill", _color2.default.DASHLINE).attr("font-size", avgFontSize).attr("opacity", 0).transition().duration(everyTick * animation.regLineDraw.duration).delay(everyTick * countTicksBeforeIndex(animation, animation.regLineDraw.index)).attr("opacity", 1);
            var dotFocus = dots.selectAll("#dotFocus"); /* ---------------------------- step 3 otherFadeOut --------------------------- */
            var lines = svg.selectAll(".lines");
            var otherDots = svg.selectAll(".dot").filter(function(d, i) {
                return !d3.select(this).attr("id");
            });
            lines.selectAll("path").attr("opacity", 1).transition().duration(everyTick * animation.otherFadeOut.duration).delay(everyTick * countTicksBeforeIndex(animation, animation.otherFadeOut.index)).attr("stroke", "#e8f4fc");
            otherDots.attr("opacity", 1).transition().duration(everyTick * animation.otherFadeOut.duration).delay(everyTick * countTicksBeforeIndex(animation, animation.otherFadeOut.index)).attr("fill", "#e8f4fc");
            var refline = svg.selectAll(".refline").selectAll("line");
            refline.attr("opacity", 0); /* ---------------------------- step 4 drawCircle --------------------------- */
            var circleR = dotFocus.attr("r") * 2,
                circleX = dotFocus.attr("cx"),
                circleY = dotFocus.attr("cy");
            setTimeout(function() {
                var circle_data = {
                    "x": parseFloat(circleX),
                    "y": parseFloat(circleY),
                    "startAngle": 0,
                    "endAngle": 2 * Math.PI
                };
                var arc = d3.arc().innerRadius(circleR * 0.9).outerRadius(circleR);
                svg.append("path").datum(circle_data).attr("class", "animation").attr("stroke", _color2.default.ANNOTATION).attr("fill", _color2.default.ANNOTATION).attr("x", circleX).attr("y", circleY).attr("transform", "translate(" + circleX + "," + circleY + ")").attr("d", arc).transition().duration(everyTick * animation.drawCircle.duration * 0.5).attrTween('d', function(d) {
                    var i = d3.interpolate(d.startAngle, d.endAngle);
                    return function(t) {
                        d.endAngle = i(t);
                        return arc(d);
                    };
                });
            }, everyTick * countTicksBeforeIndex(animation, animation.drawCircle.index)); /* ---------------------------- step 4 showDate --------------------------- */
            var tooltip = svg.selectAll(".tooltip");
            tooltip.attr("opacity", 0);
            svg.append("text").attr("fill", _color2.default.ANNOTATION).attr("font-size", fontSize).attr("x", circleX).attr("y", circleY - circleR * 2).attr("dominant-baseline", "baseline").attr("text-anchor", "middle").text(focus[0].value).attr("fill-opacity", 0).transition().duration(everyTick * animation.showDate.duration).delay(everyTick * countTicksBeforeIndex(animation, animation.showDate.index)).attr("fill-opacity", 1);
        }
    }, {
        key: 'animateExtreme',
        value: function animateExtreme() {
            /* -------------------------------- init data ------------------------------- */
            var ticks = 10;
            var duration = this.duration(); /* -------------------------------- basic vis ------------------------------- */
            var svg = this.displayOutlier();
            if (!svg) return; /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                axisFadeIn: {
                    duration: 1,
                    index: 0
                },
                majorFadeIn: {
                    duration: 1,
                    index: 1
                },
                fillDotColor: {
                    duration: 2,
                    index: 2
                },
                reflineDraw: {
                    duration: 2,
                    index: 3
                },
                tickFadeIn: {
                    duration: 1,
                    index: 4
                },
                tooltipFadeIn: {
                    duration: 1,
                    index: 4
                },
                popUpDot: {
                    duration: 3,
                    index: 5
                }
            };
            var everyTick = duration / ticks; /* ---------------------------- step 0 axisFadeIn --------------------------- */
            var xAxis = svg.selectAll(".xAxis"); // disable xAxis tick line
            xAxis.selectAll("line").remove(); // disable xAxis label text
            xAxis.selectAll(".xLabel").remove(); // disable xAxis arrow
            xAxis.selectAll(".xArrow").remove(); // disable xAxis tick line
            xAxis.selectAll("line").remove(); // fade in axis 
            xAxis.selectAll(".domain").attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1); /* ---------------------------- step 1 majorFadeIn ---------------------------- */
            var dots = svg.selectAll(".dots"); // dots.attr("opacity", 0);
            dots.selectAll("circle").each(function() {
                d3.select(this).attr("fill", _color2.default.DEFAULT);
            });
            var lineGraph = svg.selectAll(".lineGraph");
            lineGraph.attr("opacity", 0);
            setTimeout(function() {
                lineGraph.transition().duration(everyTick * animation.majorFadeIn.duration).attr("opacity", 1);
            }, everyTick * countTicksBeforeIndex(animation, animation.majorFadeIn.index)); /* --------------------------- step 2 fillDotColor -------------------------- */
            var dotFocus = dots.selectAll("#dotFocus");
            setTimeout(function() {
                dotFocus.attr("fill", _color2.default.DEFAULT).transition().duration(everyTick * animation.fillDotColor.duration).attr("fill", _color2.default.HIGHLIGHT);
            }, everyTick * countTicksBeforeIndex(animation, animation.fillDotColor.index)); /* ---------------------------- step 3 reflineDraw --------------------------- */
            var refline = svg.selectAll(".refline").selectAll("line");
            var reflineY2 = refline.attr("y2"),
                reflineY1 = refline.attr("y1");
            refline.attr("y2", reflineY1);
            refline.transition().duration(everyTick * animation.reflineDraw.duration).delay(everyTick * countTicksBeforeIndex(animation, animation.reflineDraw.index)).attr("y2", reflineY2); /* ---------------------------- step 4 tickFadeIn --------------------------- */ // hide xAxis text first
            var xticks = xAxis.selectAll(".tick");
            xticks.attr("opacity", 0); // fade in axis text one by one
            setTimeout(function() {
                xticks.transition().duration(everyTick * animation.tickFadeIn.duration).attr("opacity", 1);
            }, everyTick * countTicksBeforeIndex(animation, animation.tickFadeIn.index)); /* ---------------------------- step 4 textFadeIn --------------------------- */
            var tooltip = svg.selectAll(".tooltip");
            tooltip.attr("opacity", 0);
            setTimeout(function() {
                tooltip.transition().duration(everyTick * animation.tooltipFadeIn.duration).attr("opacity", 1);
            }, everyTick * countTicksBeforeIndex(animation, animation.tooltipFadeIn.index)); /* ----------------------------- step 5 popUpDot ---------------------------- */
            var originalR = dotFocus.attr("r");
            var shortest = 150;
            setTimeout(function() {
                var count = 0;
                var poping = setInterval(function() {
                    count += shortest * 2;
                    dotFocus.transition().duration(shortest).attr("r", originalR * 1.5).transition().duration(shortest).attr("r", originalR);
                    if (count >= everyTick * animation.popUpDot.duration) {
                        clearInterval(poping);
                    }
                }, shortest * 2);
            }, everyTick * countTicksBeforeIndex(animation, animation.popUpDot.index));
        }
    }, {
        key: 'animateRank',
        value: function animateRank() {
            /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var focus = this.focus(); // let ticks = 10;
            var duration = this.duration();
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var chartMargin = {
                "small": {
                    "top": 5,
                    "right": 33,
                    "bottom": 50,
                    "left": 33
                },
                "middle": {
                    "top": 10,
                    "right": 50,
                    "bottom": 55,
                    "left": 50
                },
                "wide": {
                    "top": 12,
                    "right": 180,
                    "bottom": 40,
                    "left": 15 + 20 * chartSize.width / 320 // fact === "difference" ? 30 : 20
                },
                "large": {
                    "top": 30,
                    "right": 20 + 20 * chartSize.width / 320,
                    "bottom": 150 + 50,
                    "left": 20 + 20 * chartSize.width / 320
                }
            };
            var margin = chartMargin[this.size()];
            var _getSizeBySize7 = getSizeBySize(this.size(), chartSize, "rank", true),
                strokeWidth = _getSizeBySize7.strokeWidth,
                width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom;
            var padding = 0;
            var dotR = 6;
            var seriesData = d3.nest().key(function(d) {
                return d[breakdown[1].field];
            }).sortValues(sortByDateAscending(breakdown)).entries(factData);
            var focusOrder = focus.map(function(d) {
                return d.value;
            });
            seriesData.sort(function(a, b) {
                return focusOrder.indexOf(a.key) - focusOrder.indexOf(b.key);
            });
            var svg = this.displayRank();
            if (!svg) return; /* ----------------------- animation frame arrangement ---------------------- */
            var xAxis = svg.selectAll(".xAxis");
            var tickPosition = xAxis.selectAll(".tick").nodes().map(function(d) {
                var trans = d3.select(d).attr("transform");
                return +trans.split('(')[1].split(",")[0];
            });
            var ticksShowed = xAxis.selectAll(".tick>text").nodes().map(function(t) {
                return parseTime(t.innerHTML);
            }); // 获取当前axis是不是rotate的
            var isRotate = !xAxis.select("text").attr("transform") || xAxis.select("text").attr("transform").length === 0 ? false : true;
            var format_TicksCount = formatTicksCount(factData[0][breakdown[0].field]);
            var allTicks = this._x.ticks();
            if (format_TicksCount === d3.timeYear) {
                for (var _i3 = 0; _i3 < allTicks.length; _i3++) { // console.log(d3.timeFormat("%Y")(allTicks[i]))
                    allTicks[_i3] = format_TicksCount(allTicks[_i3]);
                }
            }
            var i = 1;
            var x = this._x;
            var y = this._y;
            x.domain([ticksShowed[0], ticksShowed[1]]);
            var axisXCalled = drawXAsix(seriesData, factData, breakdown, x, null, ticksShowed);
            xAxis.call(axisXCalled); // let gridCalled = drawXAsix(seriesData, factData, breakdown, x);
            // svg.selectAll(".gridline")
            //     .call(gridCalled.tickFormat("")).call(g => {
            //         g.selectAll(".tick")
            //             .selectAll('line')
            //             .attr("color", Color.BACKGROUND)
            //             .attr("y2", -height)
            //             .attr("y1", -1);
            //         g.selectAll(".domain")
            //             .remove()
            //         g.selectAll(".tick")
            //             .selectAll("text")
            //             .remove()
            // })
            var dots = svg.selectAll(".dots");
            var lines = svg.selectAll(".lines");
            dots.selectAll("circle").attr("cx", function(d) {
                return x(parseTime(d[breakdown[0].field]));
            });
            var lineGen = lineGeneration(breakdown, measure, x, y);
            lines.selectAll("path").attr("d", function(d) {
                return lineGen(d.values);
            });
            var uuid = (0, _v2.default)();
            var lineGraph = svg.selectAll(".lineGraph");
            lineGraph.attr('id', 'lineGraphClip').attr('clip-path', 'url(#clip_lineGraph_' + uuid + ')');
            lineGraph.append('defs').attr('class', 'trend_defs').append('clipPath').attr('id', 'clip_lineGraph_' + uuid).append('rect').attr('x', padding - dotR - strokeWidth * 2).attr('y', -dotR - strokeWidth * 2).attr('width', 0) //width - padding + 2*dotR)
                .attr('height', height + dotR * 2 + strokeWidth * 4);
            repeat();

            function repeat() {
                lineGraph.select("#clip_lineGraph_" + uuid + " rect").attr('width', tickPosition[i - 1] + 2 * dotR).transition().duration(duration / ticksShowed.length).ease(d3.easeLinear).attr('width', i === ticksShowed.length - 1 ? width - padding + 2 * dotR + 4 * strokeWidth : tickPosition[i] + 2 * dotR + 4 * strokeWidth);
                i += 1;
                if (i >= ticksShowed.length) { // showRank()
                    return;
                }
                x.domain([ticksShowed[0], ticksShowed[i]]);
                var axisXCalled = drawXAsix(seriesData, factData, breakdown, x, null, ticksShowed);
                var gridCalled = drawXAsix(seriesData, factData, breakdown, x);
                var noTrans = svg;
                var t0 = svg.transition().duration(duration / ticksShowed.length).ease(d3.easeLinear);
                t0.selectAll(".xAxis").call(axisXCalled).call(function(g) {
                    g.selectAll("text").attr("y", Math.max(9 * chartSize.height / 320, dotR * 1.5));
                });
                if (isRotate) {
                    noTrans.select(".xAxis").selectAll("text").attr("transform", 'translate(-' + 5 + ',0)rotate(-45)').attr("text-anchor", "end");
                }
                noTrans.select(".xAxis").selectAll(".tick").selectAll('line').remove();
                noTrans.select(".xAxis").selectAll("text") // .attr("dy", 9 * chartSize.height / 320)
                    .attr("y", Math.max(9 * chartSize.height / 320, dotR * 1.5));
                t0.selectAll(".gridline").call(gridCalled.tickFormat("")).call(function(g) {
                    g.selectAll(".tick").selectAll('line').attr("color", _color2.default.BACKGROUND).attr("y2", -height).attr("y1", -1);
                    g.selectAll(".domain").remove();
                    g.selectAll(".tick").selectAll("text").remove();
                });
                t0.selectAll(".dots").selectAll("circle").attr("cx", function(d) {
                    return x(parseTime(d[breakdown[0].field]));
                });
                var lineGen = lineGeneration(breakdown, measure, x, y);
                t0.selectAll(".lines").selectAll("path").attr("d", function(d) {
                    return lineGen(d.values);
                });
                t0.on("end", repeat);
            }
        }
    }]);
    return LineChart;
}(_chart2.default);
var getSizeBySize = function getSizeBySize(size, chartSize, fact) {
    var hasSeries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var moreThan = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var margin = void 0,
        tickSize = void 0,
        annotationSize = void 0,
        dotR = void 0,
        strokeWidth = void 0,
        padding = void 0,
        tickWidth = void 0;
    switch (size) {
        case "wide":
            tickSize = 16;
            annotationSize = 26;
            dotR = 7;
            strokeWidth = 3;
            tickWidth = 2;
            break;
        case "small":
            tickSize = 12;
            annotationSize = 16;
            dotR = 5;
            strokeWidth = 2;
            tickWidth = 1.5;
            break;
        case "middle":
            tickSize = 14;
            annotationSize = 20;
            dotR = 6;
            strokeWidth = 3;
            tickWidth = 3;
            break;
        case "large":
        default:
            tickSize = 20;
            annotationSize = 40;
            dotR = fact === 'rank' ? 8 : 10;
            strokeWidth = 3;
            tickWidth = 3;
            break;
    }
    switch (fact) {
        case "extreme":
        case "outlier":
            padding = Math.round(20 * chartSize.width / 320);
            break;
        case "trend":
            padding = Math.round(20 * chartSize.width / 320);
            break;
        case "rank":
            padding = 0; // 20 * chartSize.width / 320
            break;
        case "difference":
            padding = Math.round(20 * chartSize.width / 320);
            break;
        default:
            padding = Math.round(20 * chartSize.width / 320);
            break;
    }
    var chartMargin = {
        "small": {
            "top": 5,
            "right": fact === 'rank' ? 22 : 12,
            "bottom": hasSeries ? fact === 'rank' || fact === 'difference' ? 35 : 55 : 15,
            "left": fact === "rank" ? 22 : 12
        },
        "middle": {
            "top": 10,
            "right": fact === 'rank' || fact === 'difference' ? 30 : 15,
            "bottom": hasSeries ? fact === 'rank' || fact === 'difference' ? 50 : 80 : 20,
            "left": fact === "rank" ? 30 : fact === 'difference' ? 50 : 15
        },
        "wide": {
            "top": 12,
            "right": hasSeries ? 160 : 20, // hasSeries?  moreThan ? 160 : 100 : 20,
            "bottom": 30,
            "left": hasSeries ? fact === 'rank' ? 20 + 20 * chartSize.width / 320 : fact === 'difference' ? 30 + 20 * chartSize.width / 320 : 10 : 20 // fact === "difference" ? 30 : 20
        },
        "large": {
            "top": 30,
            "right": fact === "rank" ? 20 + 20 * chartSize.width / 320 : 30,
            "bottom": hasSeries ? 150 + 50 : 80 + 50,
            "left": fact === "rank" ? 20 + 20 * chartSize.width / 320 : fact === "difference" ? 80 : 30
        }
    };
    margin = chartMargin[size];
    return {
        margin: margin,
        tickSize: tickSize,
        annotationSize: annotationSize,
        dotR: dotR,
        strokeWidth: strokeWidth,
        padding: padding,
        tickWidth: tickWidth
    };
};
var initSvg = function initSvg(container, width, height, margin) {
    var svg = d3.select(container).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    return svg;
};
var drawLines = function drawLines(svg, seriesData, hasSeries, seriesName, lineGen, strokeWidth) {
    var isTrend = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    svg.append("g").attr("class", "lines") // .selectAll(".line")
        // .data(seriesData)
        // .enter()
        .append("path").attr("class", function(d) {
            return "line " + d.key.replace(/\s/g, "");
        }).attr("d", function(d) {
            return lineGen(d.values);
        }).attr("stroke", function(d) {
            return hasSeries ? isTrend ? _color2.default.CATEGORICAL[seriesName.indexOf(d.key)] : _color2.default.CATEGORICAL[seriesName.indexOf(d.key)] : _color2.default.DEFAULT;
        }).attr("stroke-width", strokeWidth).attr('fill', 'none');
};
var drawDots = function drawDots(svg, seriesData, breakdown, measure, focus, hasSeries, seriesName, x, y, r, dotSolid, strokeWidth, Color) {
    var isTrend = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : false;
    var measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
    svg.append("g").attr("class", "dots") // .selectAll(".dot")
        // .data(seriesData)
        // .enter()
        // .append("g")
        .selectAll(".dot").data(function(d) {
            return d.values;
        }).enter().append("circle").attr("class", function(d) {
            return hasSeries ? "dot " + d[breakdown[1].field].replace(/\s/g, "") : "dot All";
        }).attr("id", function(d) {
            return focus.length !== 0 && d[breakdown[0].field] === focus[0].value ? "dotFocus" : null;
        }).attr("cx", function(d) {
            return x(parseTime(d[breakdown[0].field]));
        }).attr("cy", function(d) {
            return y(d[measureName]);
        }).attr("r", r).attr("fill", function(d) {
            if (!dotSolid) return "white";
            if (focus.length !== 0 && d[breakdown[0].field] === focus[0].value) return Color.HIGHLIGHT;
            else if (hasSeries) return Color.CATEGORICAL[seriesName.indexOf(d[breakdown[1].field])];
            else return Color.DEFAULT;
        }).attr("stroke", function(d) {
            if (dotSolid) return "none";
            return Color.CATEGORICAL[seriesName.indexOf(d[breakdown[1].field])];
        }).attr("stroke-width", function(d) {
            if (dotSolid) return 0;
            return strokeWidth;
        });
};
var drawIconDots = function drawIconDots(svg, seriesData, breakdown, measure, focus, hasSeries, seriesName, x, y, r, dotSolid, strokeWidth, Color) {
    var isTrend = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : false;
    var isRank = arguments[14];
    var width = arguments[15];
    var height = arguments[16];
    var factData = arguments[17];
    var subspace = arguments[18];
    var size = arguments[19];
    var pictype = seriesData.key.replace(/\s/g, ""); //获取相应的icon名称
    pictype = 'BMW'; //测试用 - 定值'BMW'
    var measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field; // let width = chartSize.width - margin.left - margin.right,
    //     height = chartSize.height - margin.top - margin.bottom;
    /*------------------通过名称找寻icon----------------------------*/
    svg.append("defs").append("g").attr("id", 'pictype' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
    var typesizex1 = svg.select('#pictype' + pictype).node().getBoundingClientRect().width;
    var typesizey1 = svg.select('#pictype' + pictype).node().getBoundingClientRect().height; /*-------------根据chartsize的数据来进行icon的缩放--------------------------------*/
    var scalex = void 0;
    var scalexsize = 1 / 9;
    if (size === 'large') scalexsize = 1 / 8;
    svg.select('#pictype' + pictype).attr("transform", function() {
        scalex = (width > height ? height * scalexsize : width * scalexsize) / (typesizex1 > typesizey1 ? typesizex1 : typesizey1);
        return 'scale(' + scalex + ')';
    }); // let scaley = scalex;
    // let scaleysize = scalexsize;
    /*----------------计算缩放后的icon长宽------------------------*/
    var typesizex = svg.select('#pictype' + pictype).node().getBoundingClientRect().width;
    var typesizey = svg.select('#pictype' + pictype).node().getBoundingClientRect().height;
    var typex = svg.select('#pictype' + pictype).node().getBBox().x;
    var typey = svg.select('#pictype' + pictype).node().getBBox().y;
    var barValue = void 0;
    if (subspace.length === 0) {
        barValue = d3.sum(factData, function(d) {
            return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
        });
        factData[measure[0].field] = barValue;
        factData[breakdown[0].field] = '';
        factData = [factData];
    } else {
        barValue = factData[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
    } //let maxYValue = (1.5 * barValue+100);
    // let pictorialdatapercent=parseFloat(barValue/maxYValue*100).toFixed(2);
    // set the ranges
    // let x;
    // let y;
    // let offsetY = size === 'large' ? 5 : 2; //离x轴的距离
    // let xField = subspace.length === 0 ? breakdown[0].field : subspace[0].value;
    // x = d3.scaleBand()
    //     .range([0, width])
    //     .domain([xField])
    //     .padding(0.8);
    // y = d3.scaleLinear().nice()
    //     // .range([height - offsetY, 0])
    //     //.range([chartSize.height/2+typesizey/2+offsetY, 0])
    //     .range([height+offsetY,height-typesizey-offsetY])
    //     // .domain([0, maxYValue])
    //     .domain([0, barValue])
    //     .clamp(true);
    /*--------------------------添加icon-----------------------------------*/ // svg.append("g")
    // .attr("id","pictoLayer")
    // .append("use")
    // .attr("xlink:href",`#pictype${pictype}`)
    // .attr("id", "icontype")  
    // .attr("x", function () { 
    //         return (width) / 2-Math.abs(typex*scalex)-typesizex/2;
    //     })
    // .attr("y", function(d){
    //     console.log('iconxxxxx');
    //     console.log('iconx',height)
    //     return y(d[measureName]);
    //     // return  height-typesizey-offsetY-Math.abs(typey*scalex)
    // })
    // .attr("x", d=> x(parseTime(d[breakdown[0].field])))
    // .attr("y", d=>y(d[measureName]))
    // .attr("fill",Color.HIGHLIGHT)
    var rankLength = void 0;
    svg.append("g").attr("class", "icondots") // .selectAll(".dot")
        // .data(seriesData)
        // .enter()
        // .append("g")
        .selectAll(".icondot").data(function(d) {
            rankLength = d.values.length;
            return d.values;
        }).enter().append("use").attr("xlink:href", '#pictype' + pictype) // .attr("id", "icontype")  
        .attr("class", function(d) {
            return hasSeries ? "icondot " + d[breakdown[1].field].replace(/\s/g, "") : "dot All";
        }).attr("id", function(d) {
            return focus.length !== 0 && d[breakdown[0].field] === focus[0].value ? "icondotFocus" : null;
        }) // .attr("x", d=> x(parseTime(d[breakdown[0].field])))
        // .attr("x", d=> x(parseTime(d[breakdown[0].field])))
        // .attr("y", d=> y(d[measureName]))
        .attr("x", function(d, i) {
            return x(parseTime(d[breakdown[0].field])) - Math.abs(typex * scalex) - typesizex / 2;
        }).attr("y", function(d, i) {
            return y(d[measureName]) - Math.abs(typey * scalex) - typesizey / 2;
        }) // .attr("r", r)
        .attr("fill", function(d, i) { // if (!dotSolid) return "white";
            if (isTrend) return Color.DEFAULT;
            else if (focus.length !== 0 && d[breakdown[0].field] === focus[0].value) return Color.HIGHLIGHT;
            else if (hasSeries) return Color.CATEGORICAL[seriesName.indexOf(d[breakdown[1].field])];
            else {
                var hideColor = 'rgba(0,0,0,0)';
                return hideColor;
            };
        }).attr('opacity', function(d, i) {
            if (isRank && i < rankLength - 1) return 0;
            return 1;
        }); // .attr("stroke", d=>{
    //     if(dotSolid) return "none";
    //     return Color.CATEGORICAL[seriesName.indexOf(d[breakdown[1].field])]
    // })
    // .attr("stroke-width", d=>{
    //     if(dotSolid) return 0;
    //     return strokeWidth
    // });
    // let measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field
    // svg.append("g")
    // .attr("class", "dots")
    // // .selectAll(".dot")
    // // .data(seriesData)
    // // .enter()
    // // .append("g")
    // .selectAll(".dot")
    // .data(function(d){ return d.values; })
    // .enter()
    // .append("g")
    // .attr("id","pictoLayer")
    // .append("use")
    // .attr("xlink:href",`#pictype${pictype}`)
    // // .attr("id", "icontype")  
    // // .attr("x", function () { 
    // //         return (width) / 2-Math.abs(typex*scalex)-typesizex/2;
    // //     })
    // // .attr("y", function(){return  height-typesizey-offsetY-Math.abs(typey*scalex)})
    // // .attr("fill",Color.DEFAULT)
    // .attr("class", d => hasSeries ? "icontype " + d[breakdown[1].field].replace(/\s/g, "") : "icontype All")
    // .attr("id", d => focus.length !== 0 && d[breakdown[0].field] === focus[0].value ? "icontypeFocus" : null)
    // .attr("x", d=> x(parseTime(d[breakdown[0].field])))
    // .attr("y", d=>y(d[measureName]))
    // // .attr("r", r)
    // .attr("fill", d => {
    //     if (!dotSolid) return "white";
    //     if(focus.length !== 0 && d[breakdown[0].field] === focus[0].value)  return Color.HIGHLIGHT;
    //     else if (hasSeries) return Color.CATEGORICAL[seriesName.indexOf(d[breakdown[1].field])]
    //     else return Color.DEFAULT
    // });
    // .attr("stroke", d=>{
    //     if(dotSolid) return "none";
    //     return Color.CATEGORICAL[seriesName.indexOf(d[breakdown[1].field])]
    // })
    // .attr("stroke-width", d=>{
    //     if(dotSolid) return 0;
    //     return strokeWidth
    // });
}; // const drawArrow = (size, width) => {
//     let shift;
//     switch( size ) {
//         case "small":
//             shift = 3;
//             break;
//         case "middle":
//             shift = 4;
//             break;
//         case "wide":
//             shift = 4;
//             break;
//         case "large":
//         default:
//             shift = 5;
//             break;
//     }
//     let x0 = width;
//     let y0 = 0 + shift;
//     let x1 = width + shift / Math.tan(30 * Math.PI/180);
//     let y1 = 0;
//     let x2 = width;
//     let y2 = 0 - shift;
//     if(size === "small") {
//         return "M" + (x0 - shift) + "," + y0
//          + "L" + (x1 -shift) + "," + y1 
//          + "L" + (x2 - shift) + "," + y2
//         //  + "Z"
//     }
//     return "M" + x0 + "," + y0
//          + "L" + x1 + "," + y1
//          + "L" + x2 + "," + y2
//          + "Z"
// }
var sortByDateAscending = function sortByDateAscending(breakdown) { // Dates will be cast to numbers automagically:
    return function(a, b) {
        return parseTime(a[breakdown[0].field]) - parseTime(b[breakdown[0].field]);
    };
};
var setupXAsix = function setupXAsix(seriesData, factData, breakdown, measure, padding, width, height) {
    var isCenter = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false; // get max Y value
    var measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
    var maxYValue = d3.max(seriesData, function(d) {
        return d3.max(d.values, function(_d) {
            return _d[measureName];
        }); //d[measureName]
    });
    var minYValue = d3.min(seriesData, function(d) {
        return d3.min(d.values, function(_d) {
            return _d[measureName];
        }); // return d[measureName]
    });
    if (maxYValue === minYValue) maxYValue = minYValue < 0 ? 10 : minYValue + 10;
    var minDate = d3.min(seriesData, function(d) {
        return d3.min(d.values, function(_d) {
            return parseTime(_d[breakdown[0].field]);
        });
    });
    var maxDate = d3.max(seriesData, function(d) {
        return d3.max(d.values, function(_d) {
            return parseTime(_d[breakdown[0].field]);
        }); // return d[measureName]
    });
    var x = d3.scaleTime().range([0 + padding, width - padding]).domain([minDate, maxDate]); // .domain(d3.extent(factData, function(d) { 
    //     return parseTime(d[breakdown[0].field]);
    // }));
    var y = void 0;
    if (!isCenter) {
        y = d3.scaleLinear().range([height, 0]).domain([minYValue < 0 ? minYValue : 0, maxYValue]);
    } else {
        y = d3.scaleLinear().range([height, 0]).domain([minYValue < 0 ? minYValue : 0, maxYValue + Math.abs(minYValue) * 0.3]);
    }
    if (minYValue >= 0) y.nice(5);
    return {
        x: x,
        y: y
    };
};
var drawXAsix = function drawXAsix(seriesData, factData, breakdown, x) {
    var focus = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var rankAni = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : []; // let tick_format = formatTick(factData[0][breakdown[0].field])
    var format_TicksCount = formatTicksCount(factData[0][breakdown[0].field]);
    var tick_format = formatTick(seriesData[0].values[seriesData[0].values.length - 1][breakdown[0].field]);
    var axisX = void 0;
    axisX = d3.axisBottom(x) // .ticks(d3.timeDay.filter(d => {return d3.timeDay.count(0, d) % 5 === 0}))
        // .ticks(possibleTick)
        // .tickValues(tickValues)
        .tickFormat(tick_format);
    if (format_TicksCount === d3.timeYear) {
        axisX.ticks(format_TicksCount);
    } else if (format_TicksCount === d3.timeDay) {
        axisX.ticks(format_TicksCount);
    }
    if (focus) { // 如果不在当前的列表里，就添加
        var i = void 0;
        for (i = 0; i < x.ticks().length; i++) {
            if (x.ticks()[i].toString() === parseTime(focus).toString()) break;
        }
        if (i === x.ticks().length) {
            var tickValues = x.ticks();
            tickValues.push(parseTime(focus));
            axisX.tickValues(tickValues);
        }
    }
    if (rankAni.length !== 0) {
        var ticksArray = rankAni.map(function(d) {
            return d.getTime();
        });
        var lastTick = x.domain()[1];
        var indexInShowed = ticksArray.indexOf(lastTick.getTime());
        var _tickValues = rankAni.slice(0, indexInShowed + 1);
        axisX.tickValues(_tickValues);
    }
    return axisX;
};
var removeOverlapX = function removeOverlapX(g, x) { // get tick width;
    var tickWidth = 0;
    g.selectAll(".tick").each(function(d, i) {
        var _thisWidth = d3.select(this).node().getBBox().width;
        if (tickWidth < _thisWidth) tickWidth = _thisWidth;
    });
    tickWidth = tickWidth * 1.5;
    var tickCount = g.selectAll(".tick").size();
    var xAxisWidth = x.range()[1] - x.range()[0];
    if (x.range()[0] === 0) xAxisWidth = xAxisWidth * 0.8;
    else xAxisWidth = xAxisWidth * 0.9;
    var possibleTickCount = Math.round(xAxisWidth / tickWidth) + 1;
    var enough = tickCount * tickWidth >= xAxisWidth ? false : true;
    var largestInterval = Math.floor((tickCount % 2 ? tickCount : tickCount - 1) / (possibleTickCount - 1)); // TODO 只有一个tick 显示首尾 但是如何避免真的两个都放不下呢？
    if (possibleTickCount === 1 && 2 * tickWidth < xAxisWidth) {
        var size = g.selectAll(".tick").size();
        g.selectAll(".tick").each(function(d, i) {
            if (!enough && i !== 0 && i !== size - 1) {
                this.remove();
            }
        });
    } else {
        if ((g.selectAll(".tick").size() - 1) % Math.floor(tickCount / possibleTickCount) === 0) { // 最后一个保证会被显示
            // 间隔少
            g.selectAll(".tick").each(function(d, i) {
                if (!enough && i % Math.floor(tickCount / possibleTickCount) !== 0) {
                    this.remove();
                }
            });
        } else { // 最后一个不保证会被显示
            // 间隔尽量长少
            g.selectAll(".tick").each(function(d, i) {
                if (!enough && i % largestInterval !== 0) {
                    this.remove(); // d3.select(this).attr("opacity", 0)
                }
            });
        }
    }
};
var paddingXAsix = function paddingXAsix(g, padding) {
    var domainD = g.selectAll(".domain").attr("d");
    var start = domainD.split(",")[0].substr(1);
    var end = domainD.split("H")[1].split("V")[0];
    g.selectAll(".domain").attr("stroke-width", 2).attr('stroke', _color2.default.AXIS).attr('d', "M" + (+start - padding) + ",0H" + (+end + padding));
};
var lineGeneration = function lineGeneration(breakdown, measure, x, y) {
    var measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
    return d3.line().x(function(d) {
        return x(parseTime(d[breakdown[0].field]));
    }).y(function(d) {
        return y(d[measureName]);
    });
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
    return count;
};
var parseTime = function parseTime(date) {
    if (d3.timeParse("%Y-%m-%d")(date)) return d3.timeParse("%Y-%m-%d")(date);
    else if (d3.timeParse("%Y/%m/%d")(date)) return d3.timeParse("%Y/%m/%d")(date);
    else if (d3.timeParse("%Y-%m")(date)) return d3.timeParse("%Y-%m")(date);
    else if (d3.timeParse("%Y/%m")(date)) return d3.timeParse("%Y/%m")(date);
    else if (d3.timeParse("%Y")(date)) return d3.timeParse("%Y")(date);
    else return date;
};
var formatTick = function formatTick(date) {
    if (d3.timeParse("%Y-%m-%d")(date)) return d3.timeFormat("%Y-%-m-%-d");
    else if (d3.timeParse("%Y/%m/%d")(date)) return d3.timeFormat("%Y/%-m/%-d");
    else if (d3.timeParse("%Y-%m")(date)) return d3.timeFormat("%Y-%m");
    else if (d3.timeParse("%Y/%m")(date)) return d3.timeFormat("%Y/%m");
    else if (d3.timeParse("%Y")(date)) return d3.timeFormat("%Y");
};
var formatTicksCount = function formatTicksCount(date) {
    if (d3.timeParse("%Y-%m-%d")(date)) return d3.timeDay;
    else if (d3.timeParse("%Y/%m/%d")(date)) return d3.timeDay;
    else if (d3.timeParse("%Y-%m")(date)) return d3.timeMonth;
    else if (d3.timeParse("%Y/%m")(date)) return d3.timeMonth;
    else if (d3.timeParse("%Y")(date)) return d3.timeYear;
};
var getLeastSquares = function getLeastSquares(X, Y) {
    var ret = {};
    var sumX = 0;
    var sumY = 0;
    var sumXY = 0;
    var sumXSq = 0;
    var N = X.length;
    for (var i = 0; i < N; ++i) {
        sumX += X[i];
        sumY += Y[i];
        sumXY += X[i] * Y[i];
        sumXSq += X[i] * X[i];
    }
    ret.m = (sumXY - sumX * sumY / N) / (sumXSq - sumX * sumX / N);
    ret.b = sumY / N - ret.m * sumX / N;
    return ret;
};
exports.default = LineChart;