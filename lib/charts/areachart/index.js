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
var _style = require('../../visualization/style');
var _style2 = _interopRequireDefault(_style);
var _size = require('../../visualization/size');
var _size2 = _interopRequireDefault(_size);
var _tooltip2 = require('../../visualization/tooltip');
var _tooltip3 = _interopRequireDefault(_tooltip2);
var _format = require('../../visualization/format');
var _format2 = _interopRequireDefault(_format);
var _metaphor3 = require('../../metaphor/metaphor7.png');
var _metaphor4 = _interopRequireDefault(_metaphor3);
var _metaphor5 = require('../../metaphor/metaphor8.png');
var _metaphor6 = _interopRequireDefault(_metaphor5);
var _metaphor7 = require('../../metaphor/metaphor2.png');
var _metaphor8 = _interopRequireDefault(_metaphor7);
var _metaphor9 = require('../../metaphor/metaphor6.png');
var _metaphor10 = _interopRequireDefault(_metaphor9);
var _metaphor11 = require('../../metaphor/metaphor10.png');
var _metaphor12 = _interopRequireDefault(_metaphor11);
var _metaphor13 = require('../../metaphor/metaphor17.png');
var _metaphor14 = _interopRequireDefault(_metaphor13);
var _v = require('uuid/v4');
var _v2 = _interopRequireDefault(_v);

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
var hasSeries = false;
var NUMFONT = "Arial-Regular";
var ENGFONT = "Arial-Regular";
var AreaChart = function(_Chart) {
    _inherits(AreaChart, _Chart);

    function AreaChart() {
        _classCallCheck(this, AreaChart);
        var _this = _possibleConstructorReturn(this, (AreaChart.__proto__ || Object.getPrototypeOf(AreaChart)).call(this));
        _this._x = '';
        _this._y = '';
        return _this;
    }
    _createClass(AreaChart, [{
        key: 'displayDistribution',
        value: function displayDistribution() {
            var _this2 = this;
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown(); // let focus = this.focus();
            var hasSeries = breakdown[1] && breakdown[1].field ? true : false; // let seriesName = hasSeries ? d3.map(factData, function(d){return d[breakdown[1].field];}).keys() : [];
            var measureName = measure[0].aggregate === 'count' ? "COUNT" : measure[0].field; // set data
            var data = factData;
            var stackedData = void 0;
            if (hasSeries) {
                var calculateData = d3.nest().key(function(d) {
                    return d[breakdown[0].field];
                }).entries(data);
                var categories = Array.from(new Set(data.map(function(d) {
                    return d[breakdown[1].field];
                })));
                categories = categories.slice(0, 10); // categories =categories.sort(() => .5 - Math.random()).slice(0,10)
                var objList = new Array(calculateData.length);
                var _loop = function _loop(i) {
                    var obj = {};
                    calculateData[i].values.map(function(d, i) {
                        obj.x = d[breakdown[0].field];
                        obj[d[breakdown[1].field]] = d[measureName];
                        return obj;
                    });
                    objList[i] = obj;
                };
                for (var i = 0; i < calculateData.length; i++) {
                    _loop(i);
                } // complete the missed data = 0
                for (var k = 0; k < calculateData.length; k++) {
                    for (var i = 0; i < categories.length; i++) {
                        if (!objList[k].hasOwnProperty(categories[i])) {
                            objList[k][categories[i]] = 0;
                        }
                    }
                }
                objList = objList.sort(function(a, b) {
                    return parseTime(a.x) - parseTime(b.x);
                });
                stackedData = d3.stack().keys(categories)(objList); // stackedData = stackedData.slice(0, 10)
            } // stackedData = stackedData.slice(0, 10)
            data = data.sort(function(a, b) {
                return parseTime(a[breakdown[0].field]) - parseTime(b[breakdown[0].field]);
            });
            var moreThan6 = false; // if(seriesName.length > 5)   moreThan6=true
            // set the dimensions and margins of the graph
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var seriesName = hasSeries ? d3.map(stackedData, function(d) {
                return d.key;
            }).keys() : []; // seriesName = seriesName.slice(0, 4)
            var legendRowNum = Math.ceil(seriesName.length / 3);
            var chartMargin = {
                "small": {
                    "top": hasSeries ? 10 : 20,
                    "right": 35,
                    "bottom": hasSeries ? 55 / 4 * legendRowNum + 25 : 25,
                    "left": 35
                },
                "middle": {
                    "top": hasSeries ? 10 : 20,
                    "right": 45,
                    "bottom": hasSeries ? 66 / 4 * legendRowNum + 35 : 40,
                    "left": 60
                },
                "wide": {
                    "top": 20,
                    "right": hasSeries ? 200 : 50,
                    "bottom": 40,
                    "left": 70
                },
                "large": {
                    "top": 40,
                    "right": 75,
                    "bottom": hasSeries ? 150 + 50 : 80 + 50,
                    "left": 100
                }
            };
            var margin = chartMargin[this.size()];
            var _getSizeBySize = getSizeBySize(this.size(), chartSize, 'distribution', hasSeries, moreThan6),
                tickSize = _getSizeBySize.tickSize,
                tickWidth = _getSizeBySize.tickWidth,
                width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("font-family", ENGFONT);
            if (this.style() === _style2.default.COMICS) width = 0.8 * width; // set the ranges
            var x = d3.scaleTime().range([0, width]); // .padding(0.1);
            var y = d3.scaleLinear().range([height, 0]); // Scale the range of the data in the domains
            if (hasSeries) x.domain(d3.extent(data, function(d) {
                return parseTime(d[breakdown[0].field]);
            }));
            else x.domain(d3.extent(data, function(d) {
                return parseTime(d[breakdown[0].field]);
            }));
            if (hasSeries) y.domain([0, d3.max(stackedData[stackedData.length - 1], function(d) {
                return d[1];
            })]);
            else y.domain([0, d3.max(data, function(d) {
                return d[measureName];
            })]);
            this._x = x;
            this._y = y;
            var area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d[breakdown[0].field]));
            }).y0(height).y1(function(d) {
                return y(Math.max(d[measureName], 0));
            }); // let initialarea = d3.area()
            //     .x(function (d) {
            //         return x(d[breakdown[0].field]);
            //     })
            //     .y0(height)
            //     .y1(height);
            var stacked_area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d.data.x));
            }).y0(function(d) {
                var y0 = d[0];
                return y(Math.max(y0, 0));
            }).y1(function(d) {
                if (d[0] === d[1]) return y(Math.max(d[1], 0)) - 0.065;
                else return y(Math.max(d[1], 0));
            }); // let stack_initialarea = d3.area()
            //     .x(d => x(d.data.x))
            //     .y0(height)
            //     .y1(height);
            // add the x Axis
            var format_TicksCount = formatTicksCount(data[0][breakdown[0].field]);
            var tick_format = formatTick(data[0][breakdown[0].field]);
            var axisX = d3.axisBottom(x).tickFormat(tick_format);
            if (format_TicksCount === d3.timeYear) {
                axisX.ticks(format_TicksCount);
            } else if (format_TicksCount === d3.timeDay) {
                axisX.ticks(format_TicksCount);
            }
            svg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + (height + 8 * chartSize.height / 320) + ")").call(axisX).call(function(g) {
                g.attr("font-size", _this2.size() === 'wide' && seriesName.length > 8 ? tickSize - 2 : tickSize);
                g.attr("font-family", ENGFONT);
                var domainD = g.selectAll(".domain").attr("d");
                domainD = domainD.replace("6V", 6 * chartSize.height / 320 + "V");
                domainD = domainD.replace("V6", "V" + 6 * chartSize.height / 320);
                g.selectAll(".domain").attr("d", domainD).attr("stroke-width", tickWidth);
                g.selectAll(".tick").selectAll("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("y2", 6 * chartSize.height / 320);
                g.selectAll("text").attr("y", 9 * chartSize.height / 320); // removeOverlapX(g, x)
                if (_this2.size() === 'large') { // 检查够不够放
                    var _tickWidth2 = 0;
                    var xRange = x.range()[1] - x.range()[0];
                    g.selectAll(".tick").each(function(d, i) {
                        var _thisWidth = d3.select(this).node().getBBox().width;
                        _tickWidth2 += _thisWidth;
                    });
                    if (_tickWidth2 > xRange * 0.99) { //横的不够放
                        g.selectAll("text").attr("transform", 'translate(-' + 5 + ',0)rotate(-45)').attr("text-anchor", "end"); // 检查斜着有没有遮挡
                        var prev = g.select("text").node().getBBox().height;
                        var rotateAble = Math.floor(xRange / prev) >= g.selectAll(".tick").size(); // 如果遮挡 摆回正的
                        if (!rotateAble) {
                            g.selectAll("text").attr("transform", "").attr("text-anchor", "middle");
                            removeOverlapX(g, x);
                        }
                    }
                } else removeOverlapX(g, x);
            });
            svg.append("g").attr("class", "yAxis").call(d3.axisLeft(y)).attr("font-family", ENGFONT).attr("transform", 'translate(-' + 8 * chartSize.width / 320 + ',0)').call(d3.axisLeft(y).ticks(5).tickFormat(function(d) {
                if (d / 1000000 >= 1) {
                    d = d / 1000000 + "M";
                } else if (d / 1000 >= 1) {
                    d = d / 1000 + "K";
                }
                return d;
            })).call(function(g) {
                g.attr("font-size", _this2.size() === 'wide' && seriesName.length > 8 ? tickSize - 2 : tickSize);
                g.attr("font-family", ENGFONT);
                var domainD = g.selectAll(".domain").attr("d");
                domainD = domainD.replace("M-6", "M-" + 6 * chartSize.height / 320);
                domainD = domainD.replace("H-6", "H-" + 6 * chartSize.height / 320);
                g.selectAll(".domain").attr("d", domainD).attr("stroke-width", tickWidth);
                g.selectAll(".tick").select("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("x2", -6 * chartSize.height / 320);
                g.selectAll("text").attr("x", -9 * chartSize.height / 320);
                if (_this2.size() === "small") {
                    g.selectAll(".domain").attr("display", "none");
                    g.selectAll(".tick").select("line").attr("display", "none");
                    g.selectAll(".tick").select("text").attr("display", "none");
                } // else {
                //     g.selectAll(".tick")
                //     .filter(function(d, i, list){ return i=== 0 || i === list.length-1})
                //     .select("line")
                //     .remove()
                // };
            }); // axis_y
            //     .selectAll('.tick')
            //     .append('line')
            //     .attr("x2", width)
            //     .attr('stroke', Color.DASHLINE)
            //     .attr("stroke-width", tickWidth / 2)
            //     .attr("transform", `translate(${8* chartSize.width / 320},0)`);
            // append legend 
            // let seriesName = hasSeries ? d3.map(stackedData, function(d){return d.key;}).keys() : [];
            var seriesNameCopy = [].concat(_toConsumableArray(seriesName));
            if (hasSeries) {
                seriesNameCopy.sort(function(a, b) {
                    return a.length - b.length;
                });
                seriesName = [];
                var _i = 0;
                while (seriesNameCopy.length) {
                    if (_i % 2) seriesName.push(seriesNameCopy.shift());
                    else seriesName.push(seriesNameCopy.pop());
                    _i += 1;
                }
            }
            if (hasSeries) {
                if (this.size() === "wide") {
                    svg.append("foreignObject").attr("x", width + 30).attr("y", seriesName.length > 8 ? -margin.top * 0.5 : 0).attr("width", margin.right - 10).attr("height", height + margin.bottom * 0.6 + margin.top * 0.5).append("xhtml:div").attr("class", "legends").style("display", "flex").style("flex-direction", "column").style("flex-wrap", "wrap").style("align-content", "space-around").style("justify-content", "space-around").style("height", Math.round(seriesName.length > 8 ? height + margin.bottom * 0.6 + margin.top * 0.5 : height + margin.bottom * 0.3) + "px").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0).style("margin-right", "1px").each(function(d, i) {
                        var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                        legend.append("rect").attr("fill", function(d) {
                            return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                        }).attr("width", seriesName.length > 8 ? tickSize - 2 + "px" : tickSize + "px").attr('height', seriesName.length > 8 ? tickSize - 2 + "px" : tickSize + "px").attr("rx", Math.floor(1.5 * chartSize.width / 320)).attr("ry", Math.floor(1.5 * chartSize.width / 320));
                        legend.append("text").attr("x", tickSize + 3 + "px").text(function(d) {
                            return d.length > 11 ? d.substring(0, 10) + "…" : d;
                        }).attr("font-size", seriesName.length > 8 ? tickSize - 2 + "px" : tickSize + "px").attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                        legend.attr("width", Math.round(legend.node().getBBox().width));
                        legend.attr("height", Math.floor(legend.node().getBBox().height));
                    });
                } else {
                    var thisSize = this.size();
                    var xAxisHeightOffset = void 0;
                    var isRotate = svg.selectAll(".xAxis").select("text").attr("transform") ? true : false;
                    if (this.size() === 'small') xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.4;
                    else if (this.size() === 'middle') xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.4;
                    else {
                        if (isRotate) xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.2;
                        else xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 2;
                    }
                    svg.append("foreignObject").attr("x", function() {
                            if (_this2.size() === 'small') return -margin.left * 0.5;
                            else if (_this2.size() === 'middle') return -margin.left * 0.4;
                            else return margin.right - margin.left; //0
                        }).attr("y", height + xAxisHeightOffset).attr("width", function() {
                            if (_this2.size() === 'small') return width + margin.left * 0.5 * 2;
                            else if (_this2.size() === 'middle') return width + margin.left * 0.4 * 2;
                            else return width - (margin.right - margin.left);
                        }).attr("height", margin.bottom - xAxisHeightOffset).append("xhtml:div").attr("class", "legends").style("display", "grid").style("grid-template-columns", 'repeat(' + Math.min(seriesName.length, thisSize === 'small' ? 3 : 3) + ', auto)').style("grid-template-rows", 'repeat(4, min-content)').style("grid-auto-flow", "row").style("justify-content", "space-between").style("align-content", "center").style("align-items", "end").style("padding-top", "1px").style("height", Math.round(margin.bottom - xAxisHeightOffset) + "px").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0) // .style("margin-right", 5 * chartSize.width/320 + "px")
                        .each(function(d, i) {
                            var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                            legend.append("rect").attr("fill", function(d) {
                                return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                            }).attr("width", thisSize === 'large' ? tickSize + 1 : tickSize).attr('height', thisSize === 'large' ? tickSize + 1 : tickSize).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320); // .attr("cy", -5);
                            legend.append("text").attr("x", thisSize === 'large' ? tickSize + 2 : tickSize + 1).text(function(d) {
                                var text = d;
                                if (thisSize === 'small') { // small
                                    if (text.length > 8) text = text.substring(0, 7) + "…";
                                } else if (thisSize === 'middle') { //middle
                                    if (text.length > 10) text = text.substring(0, 9) + "…";
                                } else {
                                    if (text.length > 10) text = text.substring(0, 9) + "…"; // if(text.length>15) text = text.substring(0, 14) + "…"
                                }
                                return text;
                            }).attr("font-size", thisSize === "large" ? tickSize + 2 : tickSize + 1).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                            legend.attr("width", Math.round(legend.node().getBBox().width));
                            legend.attr("height", Math.floor(legend.node().getBBox().height));
                        });
                }
            }
            if (hasSeries) {
                svg.append('g').attr("class", "areas").selectAll("path").data(stackedData).join("path").attr('id', function(_ref) {
                        var key = _ref.key;
                        return 'series_' + key.replace(/\s/g, "");
                    }).attr("fill", function(d) {
                        return _color2.default.CATEGORICAL[seriesName.indexOf(d.key)];
                    }) // ({ index }) => Color.CATEGORICAL[index])
                    .attr("class", "area").attr("d", stacked_area_generator);
            } else {
                svg.append('g').attr("class", "areas").append("path").attr('class', 'areaG').attr("fill", _color2.default.DEFAULT) // .attr("d", initialarea(data))
                    // .transition()
                    // .duration(4000)
                    .attr("d", area_generator(data));
            }
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.35,
                    metaphorHeight = 1.45 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor12.default).attr("width", metaphorWidth).attr("height", metaphorHeight);
                if (this.size() === _size2.default.WIDE) {
                    metaphor.attr("x", width).attr("y", height - metaphorHeight * 0.96);
                    svg.select("foreignObject").attr("x", width / 0.8 + 10);
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.3;
                    metaphorHeight = 1.5 * metaphorWidth;
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width).attr("y", height - metaphorHeight * 0.96);
                    svg.select("foreignObject").attr("width", width / 0.8 + margin.left * 0.4 * 2);
                } else {
                    metaphor.attr("x", width).attr("y", height - metaphorHeight * 0.96);
                    svg.select("foreignObject").attr("width", this.size() === 'small' ? width / 0.8 + margin.left * 0.5 * 2 : width / 0.8 - (margin.right - margin.left));
                }
            }
            return svg;
        }
    }, {
        key: 'displayTrend',
        value: function displayTrend() {
            var _this3 = this;
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var measureName = measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
            var hasSeries = breakdown[1] && breakdown[1].field ? true : false;
            var moreThan6 = false; // set data
            var data = factData;
            var stackedData = void 0;
            if (hasSeries) {
                var calculateData = d3.nest().key(function(d) {
                    return d[breakdown[0].field];
                }).entries(data);
                var categories = Array.from(new Set(data.map(function(d) {
                    return d[breakdown[1].field];
                })));
                categories = categories.slice(0, 10); // categories =categories.sort(() => .5 - Math.random()).slice(0,10)
                var objList = new Array(calculateData.length);
                var _loop2 = function _loop2(i) {
                    var obj = {};
                    calculateData[i].values.map(function(d, i) {
                        obj.x = d[breakdown[0].field];
                        obj[d[breakdown[1].field]] = d[measureName];
                        return obj;
                    });
                    objList[i] = obj;
                };
                for (var i = 0; i < calculateData.length; i++) {
                    _loop2(i);
                } // complete the missed data = 0
                for (var k = 0; k < calculateData.length; k++) {
                    for (var i = 0; i < categories.length; i++) {
                        if (!objList[k].hasOwnProperty(categories[i])) {
                            objList[k][categories[i]] = 0;
                        }
                    }
                }
                objList = objList.sort(function(a, b) {
                    return parseTime(a.x) - parseTime(b.x);
                });
                stackedData = d3.stack().keys(categories)(objList);
                stackedData = stackedData.slice(0, 10);
            }
            data = data.sort(function(a, b) {
                return parseTime(a[breakdown[0].field]) - parseTime(b[breakdown[0].field]);
            }); // set the dimensions and margins of the graph
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var seriesName = hasSeries ? d3.map(stackedData, function(d) {
                return d.key;
            }).keys() : []; // seriesName = seriesName.slice(0, 8)
            var legendRowNum = Math.ceil(seriesName.length / 3);
            var chartMargin = {
                "small": {
                    "top": 20,
                    "right": 35,
                    "bottom": hasSeries ? 55 / 4 * legendRowNum + 25 : 25,
                    "left": 35
                },
                "middle": {
                    "top": 20,
                    "right": 45,
                    "bottom": hasSeries ? 66 / 4 * legendRowNum + 35 : 40,
                    "left": 60
                },
                "wide": {
                    "top": 20,
                    "right": hasSeries ? 200 : 50,
                    "bottom": 40,
                    "left": 70
                },
                "large": {
                    "top": 40,
                    "right": 75,
                    "bottom": hasSeries ? 150 + 50 : 80 + 50,
                    "left": 100
                }
            };
            var margin = chartMargin[this.size()];
            var _getSizeBySize2 = getSizeBySize(this.size(), chartSize, 'trend', hasSeries, moreThan6),
                tickSize = _getSizeBySize2.tickSize,
                tickWidth = _getSizeBySize2.tickWidth,
                strokeWidth = _getSizeBySize2.strokeWidth,
                width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            if (this.style() === _style2.default.COMICS) {
                if (hasSeries || data.length > 7) width *= 0.8;
                else if (this.size() === _size2.default.WIDE) {
                    height *= 0.85;
                }
            } // set the ranges
            var x = d3.scaleTime().range([0, width]); // .padding(0.1);
            var y = d3.scaleLinear().range([height, 0]); // if (breakdown[1] && breakdown[1].field) return svg;
            // Scale the range of the data in the domains
            x.domain(d3.extent(data, function(d) {
                return parseTime(d[breakdown[0].field]);
            })); // y.domain([0, d3.max(data, function (d) { return d[measureName]; })]);
            if (hasSeries) y.domain([0, d3.max(stackedData[stackedData.length - 1], function(d) {
                return d[1];
            })]);
            else y.domain([0, d3.max(data, function(d) {
                return d[measureName];
            })]);
            var area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d[breakdown[0].field]));
            }).y0(height).y1(function(d) {
                return y(d[measureName]);
            });
            var stacked_area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d.data.x));
            }).y0(function(d) {
                var y0 = d[0];
                return y(Math.max(y0, 0));
            }).y1(function(d) {
                if (d[0] === d[1]) return y(Math.max(d[1], 0)) - 0.065;
                else return y(Math.max(d[1], 0));
            }); // let initialarea = d3.area()
            //     .x(function (d) {
            //         return x(d[breakdown[0].field]);
            //     })
            //     .y0(height)
            //     .y1(height);
            // add the x Axis
            var format_TicksCount = formatTicksCount(data[0][breakdown[0].field]);
            var tick_format = formatTick(data[0][breakdown[0].field]);
            var axisX = d3.axisBottom(x).tickFormat(tick_format);
            if (format_TicksCount === d3.timeYear) {
                axisX.ticks(format_TicksCount);
            } else if (format_TicksCount === d3.timeDay) {
                axisX.ticks(format_TicksCount);
            } // legend data init
            var seriesNameCopy = [].concat(_toConsumableArray(seriesName));
            if (hasSeries) {
                seriesNameCopy.sort(function(a, b) {
                    return a.length - b.length;
                });
                seriesName = [];
                var _i2 = 0;
                while (seriesNameCopy.length) {
                    if (_i2 % 2) seriesName.push(seriesNameCopy.shift());
                    else seriesName.push(seriesNameCopy.pop());
                    _i2 += 1;
                }
            } // draw axis
            svg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + (height + 8 * chartSize.height / 320) + ")").call(axisX).call(function(g) {
                g.attr("font-size", _this3.size() === 'wide' && seriesName.length > 8 ? tickSize - 2 : tickSize);
                g.attr("font-family", ENGFONT);
                var domainD = g.selectAll(".domain").attr("d");
                domainD = domainD.replace("6V", 6 * chartSize.height / 320 + "V");
                domainD = domainD.replace("V6", "V" + 6 * chartSize.height / 320);
                g.selectAll(".domain").attr("d", domainD).attr("stroke-width", tickWidth);
                g.selectAll(".tick").selectAll("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("y2", 6 * chartSize.height / 320);
                g.selectAll("text").attr("y", 9 * chartSize.height / 320);
                if (_this3.size() === 'large') { // 检查够不够放
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
            });; // add the y Axis
            var axis_y = svg.append("g").attr("class", "yAxis").call(d3.axisLeft(y)).attr("font-family", ENGFONT).attr("transform", 'translate(-' + 8 * chartSize.width / 320 + ',0)').call(d3.axisLeft(y).ticks(5).tickFormat(function(d) {
                if (d / 1000000 >= 1) {
                    d = d / 1000000 + "M";
                } else if (d / 1000 >= 1) {
                    d = d / 1000 + "K";
                }
                return d;
            })).call(function(g) {
                g.attr("font-size", _this3.size() === 'wide' && seriesName.length > 8 ? tickSize - 2 : tickSize);
                g.attr("font-family", ENGFONT);
                var domainD = g.selectAll(".domain").attr("d");
                domainD = domainD.replace("M-6", "M-" + 6 * chartSize.height / 320);
                domainD = domainD.replace("H-6", "H-" + 6 * chartSize.height / 320);
                g.selectAll(".domain").attr("d", domainD).attr("stroke-width", tickWidth);
                g.selectAll(".tick").select("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("x2", -6 * chartSize.height / 320);
                g.selectAll("text").attr("x", -9 * chartSize.height / 320); // if(this.size() === "middle") {
                //     g.selectAll(".domain").attr("stroke-width", 1)
                // }
                if (_this3.size() === "small") {
                    g.selectAll(".domain").attr("display", "none");
                    g.selectAll(".tick").select("line").attr("display", "none");
                    g.selectAll(".tick").select("text").attr("display", "none");
                }
            });
            axis_y.selectAll('.tick').append('line').attr("x2", width).attr('stroke', _color2.default.DASHLINE).attr("stroke-width", tickWidth / 2).attr("transform", 'translate(' + 8 * chartSize.width / 320 + ',0)'); // append legend 
            if (hasSeries) {
                if (this.size() === "wide") {
                    svg.append("foreignObject").attr("x", chartSize.width - margin.left - margin.right + 30).attr("y", seriesName.length > 8 ? -margin.top * 0.5 : 0).attr("width", margin.right - 10).attr("height", height + margin.bottom * 0.6 + margin.top * 0.5).append("xhtml:div").attr("class", "legends").style("display", "flex").style("flex-direction", "column").style("flex-wrap", "wrap").style("align-content", "space-around").style("justify-content", "space-around").style("height", Math.round(seriesName.length > 8 ? height + margin.bottom * 0.6 + margin.top * 0.5 : height + margin.bottom * 0.3) + "px").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0).style("margin-right", 5 * chartSize.width / 320 + "px").each(function(d, i) {
                        var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                        legend.append("rect").attr("fill", function(d) {
                            return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                        }).attr("width", seriesName.length > 8 ? tickSize - 2 : tickSize).attr('height', seriesName.length > 8 ? tickSize - 2 : tickSize).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320);
                        legend.append("text").attr("x", tickSize + 3).text(function(d) {
                            return d.length > 11 ? d.substring(0, 10) + "…" : d;
                        }).attr("font-size", seriesName.length > 8 ? tickSize - 2 : tickSize).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                        legend.attr("width", Math.round(legend.node().getBBox().width));
                        legend.attr("height", Math.floor(legend.node().getBBox().height));
                    });
                } else {
                    var thisSize = this.size();
                    var xAxisHeightOffset = void 0;
                    var isRotate = svg.selectAll(".xAxis").select("text").attr("transform") ? true : false;
                    if (this.size() === 'small') xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.4;
                    else if (this.size() === 'middle') xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.4;
                    else {
                        if (isRotate) xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.2;
                        else xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 2;
                    }
                    svg.append("foreignObject").attr("x", function() {
                            if (_this3.size() === 'small') return -margin.left * 0.5;
                            else if (_this3.size() === 'middle') return -margin.left * 0.4;
                            else return margin.right - margin.left; //0
                        }).attr("y", height + xAxisHeightOffset).attr("width", function() {
                            if (_this3.size() === 'small') return chartSize.width - margin.left - margin.right + margin.left * 0.5 * 2;
                            else if (_this3.size() === 'middle') return chartSize.width - margin.left - margin.right + margin.left * 0.4 * 2;
                            else return chartSize.width - margin.left - margin.right - (margin.right - margin.left);
                        }).attr("height", margin.bottom - xAxisHeightOffset).append("xhtml:div").attr("class", "legends").style("display", "grid").style("grid-template-columns", 'repeat(' + Math.min(seriesName.length, thisSize === 'small' ? 3 : 3) + ', auto)').style("grid-template-rows", 'repeat(4, min-content)').style("grid-auto-flow", "row").style("justify-content", "space-between").style("align-content", "center").style("align-items", "end").style("padding-top", "1px").style("height", Math.round(margin.bottom - xAxisHeightOffset) + "px").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0) // .style("margin-right", 5 * chartSize.width/320 + "px")
                        .each(function(d, i) {
                            var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                            legend.append("rect").attr("fill", function(d) {
                                return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                            }).attr("width", thisSize === 'large' ? tickSize + 1 : tickSize).attr('height', thisSize === 'large' ? tickSize + 1 : tickSize).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320); // .attr("cy", -5);
                            legend.append("text").attr("x", thisSize === 'large' ? tickSize + 2 : tickSize + 1).text(function(d) {
                                var text = d;
                                if (thisSize === 'small') { // small
                                    if (text.length > 8) text = text.substring(0, 7) + "…";
                                } else if (thisSize === 'middle') { //middle
                                    if (text.length > 10) text = text.substring(0, 9) + "…";
                                } else {
                                    if (text.length > 10) text = text.substring(0, 9) + "…"; // if(text.length>15) text = text.substring(0, 14) + "…"
                                }
                                return text;
                            }).attr("font-size", thisSize === "large" ? tickSize + 2 : tickSize + 1).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                            legend.attr("width", Math.round(legend.node().getBBox().width));
                            legend.attr("height", Math.floor(legend.node().getBBox().height));
                        });
                }
            }
            if (!hasSeries) {
                svg.append('g').attr("class", "areas").append("path").attr("fill", _color2.default.DEFAULT).attr("d", area_generator(data));
                var lineLayer = svg.append("g").attr('id', 'lineLayer');
                var lineGen = d3.line().curve(d3.curveMonotoneX).x(function(d) {
                    return x(parseTime(d[breakdown[0].field]));
                }).y(function(d) {
                    return y(d[measureName]);
                });
                lineLayer.append('path').attr('d', lineGen(data)).attr('stroke', _color2.default.HIGHLIGHT).attr('stroke-width', strokeWidth).attr('fill', 'none').attr("stroke-dasharray", strokeWidth * 2 + ', ' + strokeWidth);;
            } else {
                svg.append('g').attr("class", "areas").selectAll("path").data(stackedData).join("path").attr('id', function(_ref2) {
                        var key = _ref2.key;
                        return 'series_' + key.replace(/\s/g, "");
                    }).attr("fill", function(d) {
                        return _color2.default.CATEGORICAL[seriesName.indexOf(d.key)];
                    }) //({ index }) => Color.CATEGORICAL[index])
                    .attr("class", "area") // .attr("d", stack_initialarea)
                    // .transition()
                    // .duration(4000)
                    .attr("d", stacked_area_generator);
            }
            if (this.style() === _style2.default.COMICS) {
                if (hasSeries) {
                    var metaphorWidth = width * 0.34,
                        metaphorHeight = 1.25 * metaphorWidth;
                    var metaphor = svg.append("image").attr('xlink:href', _metaphor8.default);
                    if (this.size() === _size2.default.WIDE) {
                        metaphorWidth = width * 0.34;
                        metaphorHeight = 1.25 * metaphorWidth;
                    } else if (this.size() === _size2.default.MIDDLE) {
                        metaphorWidth = width * 0.32;
                        metaphorHeight = 1.25 * metaphorWidth;
                    }
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.12).attr("y", height - metaphorHeight * 0.96);
                } else { //points
                    // let filterPoints = [];
                    // svg.selectAll(".tick").each(function(d){
                    //     let item = factData.find(i => parseTime(i[breakdown[0].field]).getTime() === d.getTime());
                    //     filterPoints.push(item);
                    // });
                    var filterPoints = data;
                    if (filterPoints.length > 7) { //too much point
                        //draw dash line
                        var x0 = x(parseTime(filterPoints[0][breakdown[0].field])),
                            x1 = x(parseTime(filterPoints.slice(-1)[0][breakdown[0].field])),
                            y0 = y(filterPoints[0][measureName]),
                            y1 = y(filterPoints.slice(-1)[0][measureName]),
                            x2 = x1 + width * 0.14,
                            y2 = (x2 - x1) * (y1 - y0) / (x1 - x0) + y1;
                        var line_m = svg.append('line').attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2).attr("stroke", _color2.default.DASHLINE).attr("stroke-width", strokeWidth).attr("stroke-dasharray", strokeWidth * 2 + ', ' + strokeWidth);
                        svg.node().prepend(line_m.node());
                        var _metaphorWidth = width * 0.26,
                            _metaphorHeight = 1.24 * _metaphorWidth;
                        var _metaphor = svg.append("image").attr('xlink:href', _metaphor10.default);
                        if (this.size() === _size2.default.WIDE) {
                            _metaphorWidth = width * 0.20;
                            _metaphorHeight = 1.24 * _metaphorWidth;
                        } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                            _metaphorWidth = width * 0.24;
                            _metaphorHeight = 1.24 * _metaphorWidth;
                        }
                        _metaphor.attr("width", _metaphorWidth).attr("height", _metaphorHeight).attr("x", x2 - _metaphorWidth * 0.06).attr("y", y2 - _metaphorHeight * 0.06);
                    } else {
                        var metaphorWidth7 = width / (filterPoints.length - 1) * 0.6,
                            metaphorWidth8 = metaphorWidth7 / 1.14;
                        var metaphorHeight7 = metaphorWidth7 * 0.95;
                        var metaphorHeight8 = metaphorWidth8 * 1.2;
                        for (var _i3 = 1; _i3 < filterPoints.length; _i3++) {
                            var middleX = (x(parseTime(filterPoints[_i3][breakdown[0].field])) + x(parseTime(filterPoints[_i3 - 1][breakdown[0].field]))) / 2;
                            var middleY = (y(filterPoints[_i3][measureName]) + y(filterPoints[_i3 - 1][measureName])) / 2;
                            if (filterPoints[_i3][measureName] - filterPoints[_i3 - 1][measureName] > 0) { //up
                                svg.append("image").attr('xlink:href', _metaphor6.default).attr("width", metaphorWidth8).attr("height", metaphorHeight8).attr("x", middleX - metaphorWidth8 * 0.7).attr("y", middleY - metaphorHeight8 * 0.96);
                            } else { //down
                                svg.append("image").attr('xlink:href', _metaphor4.default).attr("width", metaphorWidth7).attr("height", metaphorHeight7).attr("x", middleX - metaphorWidth7 * 0.5).attr("y", middleY - metaphorHeight7 * 1);
                            }
                        }
                    } //center居中
                    svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x) + "," + ((this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y) + ")");
                }
            }
            return svg;
        }
    }, {
        key: 'displayOutlier',
        value: function displayOutlier() {
            var _this4 = this;
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var focus = this.focus(); // set data
            factData = factData.sort(function(a, b) {
                return parseTime(a[breakdown[0].field]) - parseTime(b[breakdown[0].field]);
            });
            var data = factData;
            var measureName = measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
            if (focus.length === 0) return; // for(let f of focus) {
            //     if(f.field !== breakdown[0].field) return 
            // }
            // 只取focus首个
            if (!focus[0].field || focus[0].field !== breakdown[0].field) return;
            if (breakdown[1] && breakdown[1].field) return; // set the dimensions and margins of the graph
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize3 = getSizeBySize(this.size(), chartSize, 'outlier'),
                margin = _getSizeBySize3.margin,
                tickSize = _getSizeBySize3.tickSize,
                annotationSize = _getSizeBySize3.annotationSize,
                tickWidth = _getSizeBySize3.tickWidth,
                dotR = _getSizeBySize3.dotR; // get tootltip size
            var focusValueArray = factData.filter(function(d) {
                return d[focus[0].field] === focus[0].value;
            });
            var focusValue = focusValueArray[0][measureName];
            var _tooltip = d3.select(this.container()).append("svg").attr("class", "testNode").attr("opacity", 0);
            _tooltip.append("text").text((0, _format2.default)(focusValue)).attr("font-size", annotationSize).attr("font-family", NUMFONT);
            var tooltipHeight = d3.select(".testNode").select("text").node().getBBox().height;
            var tooltipWidth = d3.select(".testNode").select("text").node().getBBox().width;
            if (margin.top < tooltipHeight / 0.8 + dotR * 2.5) { // 30 * chartSize.height / 640
                margin.top = tooltipHeight / 0.8 + dotR * 3.5; //30 * chartSize.height / 640 * 1.5
            }
            if (factData[0][focus[0].field] === focus[0].value && margin.left < Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) {
                margin.left = Math.ceil(Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) * 1.1;
            }
            if (factData[factData.length - 1][focus[0].field] === focus[0].value && margin.right < Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) {
                margin.right = Math.ceil(Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) * 1.1;
            }
            _tooltip.remove();
            var width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("font-family", ENGFONT);
            if (this.style() === _style2.default.COMICS) width = this.size() === _size2.default.LARGE || this.size() === _size2.default.SMALL ? 0.8 * width : 0.85 * width; // set the ranges
            var x = d3.scaleTime().range([0, width]); // .padding(0.1);
            var y = d3.scaleLinear().range([height, 0]); // Scale the range of the data in the domains
            x.domain(d3.extent(data, function(d) {
                return parseTime(d[breakdown[0].field]);
            }));
            y.domain([0, d3.max(data, function(d) {
                return d[measureName];
            })]);
            var area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d[breakdown[0].field]));
            }).y0(height).y1(function(d) {
                return y(Math.max(d[measureName], 0));
            }); // add the x Axis
            var format_TicksCount = formatTicksCount(data[0][breakdown[0].field]);
            var tick_format = formatTick(data[0][breakdown[0].field]);
            var axisX = d3.axisBottom(x).tickFormat(tick_format);
            if (format_TicksCount === d3.timeYear) {
                axisX.ticks(format_TicksCount);
            }
            if (focus.length !== 0) { // 如果不在当前的列表里，就添加
                var i = void 0;
                for (i = 0; i < x.ticks().length; i++) {
                    if (x.ticks()[i].toString() === parseTime(focus[0].value).toString()) break;
                }
                if (i === x.ticks().length) {
                    var tickValues = x.ticks();
                    tickValues.push(parseTime(focus[0].value));
                    axisX.tickValues(tickValues);
                }
            }
            svg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + (height + 8 * chartSize.height / 320) + ")").call(axisX).attr("font-family", ENGFONT).call(function(g) {
                g.attr("font-size", tickSize);
                g.attr("font-family", ENGFONT);
                var domainD = g.selectAll(".domain").attr("d");
                domainD = domainD.replace("6V", 6 * chartSize.height / 320 + "V");
                domainD = domainD.replace("V6", "V" + 6 * chartSize.height / 320);
                g.selectAll(".domain").attr("d", domainD).attr("stroke-width", tickWidth);
                g.selectAll(".tick").selectAll("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("y2", 6 * chartSize.height / 320);
                g.selectAll("text").attr("y", 9 * chartSize.height / 320);
                g.selectAll(".tick").filter(function(d) {
                    return parseTime(focus[0].value).toString() !== d.toString();
                }).remove(); // console.log(parseTime(focus[0].value).toString(), g.select(".tick").node().getBBox(), margin.left)
            }); // add the y Axis
            svg.append("g").attr("class", "yAxis").call(d3.axisLeft(y)).attr("font-family", ENGFONT).attr("transform", 'translate(-' + 8 * chartSize.width / 320 + ',0)').call(d3.axisLeft(y).ticks(5).tickFormat(function(d) {
                if (d / 1000000 >= 1) {
                    d = d / 1000000 + "M";
                } else if (d / 1000 >= 1) {
                    d = d / 1000 + "K";
                }
                return d;
            })).call(function(g) {
                g.attr("font-size", tickSize);
                g.attr("font-family", ENGFONT);
                if (_this4.size() === "middle") {
                    g.selectAll(".domain").attr("stroke-width", 1);
                }
                if (_this4.size() === "small") {
                    g.selectAll(".domain").attr("display", "none");
                    g.selectAll(".tick").select("line").attr("display", "none");
                    g.selectAll(".tick").select("text").attr("display", "none");
                } // else {
                //     g.selectAll(".tick")
                //     .filter(function(d, i, list){ return i=== 0 || i === list.length-1})
                //     .select("line")
                //     .remove()
                // };
                var domainD = g.selectAll(".domain").attr("d");
                domainD = domainD.replace("M-6", "M-" + 6 * chartSize.width / 640);
                domainD = domainD.replace("H-6", "H-" + 6 * chartSize.width / 640);
                g.selectAll(".domain").attr("d", domainD).attr("stroke-width", tickWidth);
                g.selectAll(".tick").select("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("x2", -6 * chartSize.width / 640);
                g.selectAll("text").attr("x", -9 * chartSize.width / 640);
            });
            if (!hasSeries) {
                svg.append('g').attr("class", "areas").append("path").attr("fill", _color2.default.DEFAULT).attr("opacity", 0.5).attr("d", area_generator(data));
            }
            var lineLayer = svg.append("g").attr('class', 'lineLayer');
            var lineGen = d3.line().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d[breakdown[0].field]));
            }).y(function(d) {
                return y(d[measureName]);
            });
            lineLayer.append('path').attr('d', lineGen(data)).attr('stroke', _color2.default.HIGHLIGHT).attr('stroke-width', dotR / 2).attr('fill', 'none'); //tool tip
            var toolTipX = x(parseTime(focus[0].value));
            var toolTipY = void 0;
            toolTipY = y(focusValue); // let toolTipSpec = {
            //     toolTipWidth: 80, //todo 自适应
            //     toolTipHeight: 30, //todo 自适应
            //     toolTipX,
            //     toolTipY,
            // }
            var toolTipValue = (0, _format2.default)(focusValue);
            (0, _tooltip3.default)(toolTipX, toolTipY - dotR * 2.5, toolTipValue, svg, chartSize, annotationSize, "Up", "numerical");
            svg.selectAll(".tooltip").selectAll("text").attr("font-weight", 500);
            lineLayer.append('circle').attr("class", "focusDot").attr('cx', toolTipX).attr('cy', toolTipY).attr('r', this.size() === 'large' ? 10 : 6).attr('fill', _color2.default.HIGHLIGHT);
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.3,
                    metaphorHeight = 1.43 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor14.default).attr("width", metaphorWidth).attr("height", metaphorHeight);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.25;
                    metaphorHeight = 1.43 * metaphorWidth;
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
                    svg.select("foreignObject").attr("x", width / 0.8 + 10);
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.28;
                    metaphorHeight = 1.43 * metaphorWidth;
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
                } else {
                    metaphor.attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
                }
            }
            return svg;
        }
    }, {
        key: 'displayExtreme',
        value: function displayExtreme() {
            var _this5 = this;
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var focus = this.focus(); // set data
            factData = factData.sort(function(a, b) {
                return parseTime(a[breakdown[0].field]) - parseTime(b[breakdown[0].field]);
            });
            var data = factData;
            var measureName = measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
            if (focus.length === 0) return; // for(let f of focus) {
            //     if(f.field !== breakdown[0].field) return 
            // }
            // 只取focus首个
            if (!focus[0].field || focus[0].field !== breakdown[0].field) return;
            if (breakdown[1] && breakdown[1].field) return; // set the dimensions and margins of the graph
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize4 = getSizeBySize(this.size(), chartSize, 'outlier'),
                margin = _getSizeBySize4.margin,
                tickSize = _getSizeBySize4.tickSize,
                annotationSize = _getSizeBySize4.annotationSize,
                tickWidth = _getSizeBySize4.tickWidth,
                dotR = _getSizeBySize4.dotR; // get tootltip size
            var focusValueArray = factData.filter(function(d) {
                return d[focus[0].field] === focus[0].value;
            });
            var focusValue = focusValueArray[0][measureName];
            var _tooltip = d3.select(this.container()).append("svg").attr("class", "testNode").attr("opacity", 0);
            _tooltip.append("text").text((0, _format2.default)(focusValue)).attr("font-size", annotationSize).attr("font-family", NUMFONT);
            var tooltipHeight = d3.select(".testNode").select("text").node().getBBox().height;
            var tooltipWidth = d3.select(".testNode").select("text").node().getBBox().width;
            if (margin.top < tooltipHeight / 0.8 + dotR * 2.5) { // 30 * chartSize.height / 640
                margin.top = tooltipHeight / 0.8 + dotR * 3.5; //30 * chartSize.height / 640 * 1.5
            }
            if (factData[0][focus[0].field] === focus[0].value && margin.left < Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) {
                margin.left = Math.ceil(Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) * 1.1;
            }
            if (factData[factData.length - 1][focus[0].field] === focus[0].value && margin.right < Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) {
                margin.right = Math.ceil(Math.min(tooltipWidth / 0.7 / 2, (tooltipWidth + 12) / 2)) * 1.1;
            }
            _tooltip.remove();
            var width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")").attr("font-family", ENGFONT);
            if (this.style() === _style2.default.COMICS) width = this.size() === _size2.default.LARGE || this.size() === _size2.default.SMALL ? 0.8 * width : 0.85 * width; // set the ranges
            var x = d3.scaleTime().range([0, width]); // .padding(0.1);
            var y = d3.scaleLinear().range([height, 0]); // Scale the range of the data in the domains
            x.domain(d3.extent(data, function(d) {
                return parseTime(d[breakdown[0].field]);
            }));
            y.domain([0, d3.max(data, function(d) {
                return d[measureName];
            })]);
            var area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d[breakdown[0].field]));
            }).y0(height).y1(function(d) {
                return y(Math.max(d[measureName], 0));
            }); // add the x Axis
            var format_TicksCount = formatTicksCount(data[0][breakdown[0].field]);
            var tick_format = formatTick(data[0][breakdown[0].field]);
            var axisX = d3.axisBottom(x).tickFormat(tick_format);
            if (format_TicksCount === d3.timeYear) {
                axisX.ticks(format_TicksCount);
            }
            if (focus.length !== 0) { // 如果不在当前的列表里，就添加
                var i = void 0;
                for (i = 0; i < x.ticks().length; i++) {
                    if (x.ticks()[i].toString() === parseTime(focus[0].value).toString()) break;
                }
                if (i === x.ticks().length) {
                    var tickValues = x.ticks();
                    tickValues.push(parseTime(focus[0].value));
                    axisX.tickValues(tickValues);
                }
            }
            svg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + (height + 8 * chartSize.height / 320) + ")").call(axisX).attr("font-family", ENGFONT).call(function(g) {
                g.attr("font-size", tickSize);
                g.attr("font-family", ENGFONT);
                var domainD = g.selectAll(".domain").attr("d");
                domainD = domainD.replace("6V", 6 * chartSize.height / 320 + "V");
                domainD = domainD.replace("V6", "V" + 6 * chartSize.height / 320);
                g.selectAll(".domain").attr("d", domainD).attr("stroke-width", tickWidth);
                g.selectAll(".tick").selectAll("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("y2", 6 * chartSize.height / 320);
                g.selectAll("text").attr("y", 9 * chartSize.height / 320);
                g.selectAll(".tick").filter(function(d) {
                    return parseTime(focus[0].value).toString() !== d.toString();
                }).remove(); // console.log(parseTime(focus[0].value).toString(), g.select(".tick").node().getBBox(), margin.left)
            }); // add the y Axis
            svg.append("g").attr("class", "yAxis").call(d3.axisLeft(y)).attr("font-family", ENGFONT).attr("transform", 'translate(-' + 8 * chartSize.width / 320 + ',0)').call(d3.axisLeft(y).ticks(5).tickFormat(function(d) {
                if (d / 1000000 >= 1) {
                    d = d / 1000000 + "M";
                } else if (d / 1000 >= 1) {
                    d = d / 1000 + "K";
                }
                return d;
            })).call(function(g) {
                g.attr("font-size", tickSize);
                g.attr("font-family", ENGFONT);
                if (_this5.size() === "middle") {
                    g.selectAll(".domain").attr("stroke-width", 1);
                }
                if (_this5.size() === "small") {
                    g.selectAll(".domain").attr("display", "none");
                    g.selectAll(".tick").select("line").attr("display", "none");
                    g.selectAll(".tick").select("text").attr("display", "none");
                } // else {
                //     g.selectAll(".tick")
                //     .filter(function(d, i, list){ return i=== 0 || i === list.length-1})
                //     .select("line")
                //     .remove()
                // };
                var domainD = g.selectAll(".domain").attr("d");
                domainD = domainD.replace("M-6", "M-" + 6 * chartSize.width / 640);
                domainD = domainD.replace("H-6", "H-" + 6 * chartSize.width / 640);
                g.selectAll(".domain").attr("d", domainD).attr("stroke-width", tickWidth);
                g.selectAll(".tick").select("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("x2", -6 * chartSize.width / 640);
                g.selectAll("text").attr("x", -9 * chartSize.width / 640);
            });
            if (!hasSeries) {
                svg.append('g').attr("class", "areas").append("path").attr("fill", _color2.default.DEFAULT).attr("opacity", 0.5).attr("d", area_generator(data));
            }
            var lineLayer = svg.append("g").attr('class', 'lineLayer');
            var lineGen = d3.line().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d[breakdown[0].field]));
            }).y(function(d) {
                return y(d[measureName]);
            });
            lineLayer.append('path').attr('d', lineGen(data)).attr('stroke', _color2.default.HIGHLIGHT).attr('stroke-width', dotR / 2).attr('fill', 'none'); //tool tip
            var toolTipX = x(parseTime(focus[0].value));
            var toolTipY = void 0;
            toolTipY = y(focusValue); // let toolTipSpec = {
            //     toolTipWidth: 80, //todo 自适应
            //     toolTipHeight: 30, //todo 自适应
            //     toolTipX,
            //     toolTipY,
            // }
            var toolTipValue = (0, _format2.default)(focusValue);
            (0, _tooltip3.default)(toolTipX, toolTipY - dotR * 2.5, toolTipValue, svg, chartSize, annotationSize, "Up", "numerical");
            svg.selectAll(".tooltip").selectAll("text").attr("font-weight", 500);
            lineLayer.append('circle').attr("class", "focusDot").attr('cx', toolTipX).attr('cy', toolTipY).attr('r', this.size() === 'large' ? 10 : 6).attr('fill', _color2.default.HIGHLIGHT);
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.3,
                    metaphorHeight = 1.43 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor14.default).attr("width", metaphorWidth).attr("height", metaphorHeight);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.25;
                    metaphorHeight = 1.43 * metaphorWidth;
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
                    svg.select("foreignObject").attr("x", width / 0.8 + 10);
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.28;
                    metaphorHeight = 1.43 * metaphorWidth;
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
                } else {
                    metaphor.attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
                }
            }
            this._y = y;
            return svg;
        }
    }, {
        key: 'animateDistribution',
        value: function animateDistribution() {
            var svg = this.displayDistribution();
            if (!svg) return; /* -------------------------------- init data ------------------------------- */
            var ticks = 10;
            var layback = 0;
            var duration = this.duration();
            var factData = this.factdata();
            var breakdown = this.breakdown();
            var measure = this.measure(); // let focus = this.focus();
            var hasSeries = breakdown[1] && breakdown[1].field ? true : false;
            var measureName = measure[0].aggregate === 'count' ? "COUNT" : measure[0].field; /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                axisFadeIn: {
                    duration: 2,
                    index: 0
                },
                legendFadeIn: {
                    duration: 2,
                    index: 1
                },
                areaFadeIn: {
                    duration: 8,
                    index: 1
                }
            };
            var everyTick = duration / ticks;
            var x = this._x;
            var y = this._y;
            var stacked_area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d.data.x));
            }).y0(function(d) {
                var y0 = d[0];
                return y(Math.max(y0, 0));
            }).y1(function(d) {
                if (d[0] === d[1]) return y(Math.max(d[1], 0)) - 0.065;
                else return y(Math.max(d[1], 0));
            });
            var initial_stacked_area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d.data.x));
            }).y0(function(d) { // let y0=d[0]; 
                // return y(Math.max(y0, 0))
                return y(0);
            }).y1(function(d) { // if(d[0] === d[1]) return y(Math.max(d[1], 0)) - 0.065
                // else return y(Math.max(d[1], 0))
                // let y0=d[0] - 0.065; 
                // return y(Math.max(y0, 0))
                return y(0);
            });
            var area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d[breakdown[0].field]));
            }).y0(y(0)).y1(function(d) {
                return y(Math.max(d[measureName], 0));
            });
            var init_area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d[breakdown[0].field]));
            }).y0(y(0)).y1(y(0)); /* ---------------------------- step 0 axisFadeIn --------------------------- */
            var xAxis = svg.selectAll(".xAxis");
            var yAxis = svg.selectAll(".yAxis");
            xAxis.attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1);
            yAxis.attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1); /* --------------------------- step 1 legendFadeIn -------------------------- */
            var legends = svg.selectAll(".legends");
            legends.style("opacity", 0);
            setTimeout(function() {
                legends.transition().duration(everyTick * (animation.legendFadeIn.duration + 0.5)).style("opacity", 1);
            }, everyTick * (countTicksBeforeIndex(animation, animation.legendFadeIn.index) - 0.5)); /* ---------------------------- step 1 areaFadeIn --------------------------- */
            var areas = svg.selectAll(".areas");
            areas.attr("opacity", 0);
            if (hasSeries) {
                setTimeout(function() {
                    areas.attr("opacity", 1);
                    areas.selectAll(".area").each(function(d, i) {
                        d3.select(this).attr("d", initial_stacked_area_generator).transition().duration(everyTick * (animation.areaFadeIn.duration + layback)).attr("d", stacked_area_generator);
                    });
                }, everyTick * (countTicksBeforeIndex(animation, animation.areaFadeIn.index) - layback));
            } else {
                var data = factData;
                data = data.sort(function(a, b) {
                    return parseTime(a[breakdown[0].field]) - parseTime(b[breakdown[0].field]);
                });
                setTimeout(function() {
                    areas.attr("opacity", 1);
                    areas.selectAll(".areaG").each(function(d, i) {
                        d3.select(this).attr("d", init_area_generator(data)).transition().duration(everyTick * (animation.areaFadeIn.duration + layback)).attr("d", area_generator(data));
                    });
                }, everyTick * (countTicksBeforeIndex(animation, animation.areaFadeIn.index) - layback));
            }
        }
    }, {
        key: 'animateTrend',
        value: function animateTrend() {
            var _this6 = this;
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var measureName = measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
            var hasSeries = breakdown[1] && breakdown[1].field ? true : false;
            var moreThan6 = false; // set data
            var data = factData;
            var stackedData = void 0;
            if (hasSeries) {
                var calculateData = d3.nest().key(function(d) {
                    return d[breakdown[0].field];
                }).entries(data);
                var categories = Array.from(new Set(data.map(function(d) {
                    return d[breakdown[1].field];
                })));
                categories = categories.slice(0, 10); // categories =categories.sort(() => .5 - Math.random()).slice(0,10)
                var objList = new Array(calculateData.length);
                var _loop3 = function _loop3(i) {
                    var obj = {};
                    calculateData[i].values.map(function(d, i) {
                        obj.x = d[breakdown[0].field];
                        obj[d[breakdown[1].field]] = d[measureName];
                        return obj;
                    });
                    objList[i] = obj;
                };
                for (var i = 0; i < calculateData.length; i++) {
                    _loop3(i);
                } // complete the missed data = 0
                for (var k = 0; k < calculateData.length; k++) {
                    for (var i = 0; i < categories.length; i++) {
                        if (!objList[k].hasOwnProperty(categories[i])) {
                            objList[k][categories[i]] = 0;
                        }
                    }
                }
                objList = objList.sort(function(a, b) {
                    return parseTime(a.x) - parseTime(b.x);
                });
                stackedData = d3.stack().keys(categories)(objList);
                stackedData = stackedData.slice(0, 10);
            }
            data = data.sort(function(a, b) {
                return parseTime(a[breakdown[0].field]) - parseTime(b[breakdown[0].field]);
            }); // set the dimensions and margins of the graph
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var seriesName = hasSeries ? d3.map(stackedData, function(d) {
                return d.key;
            }).keys() : []; // seriesName = seriesName.slice(0, 8)
            var legendRowNum = Math.ceil(seriesName.length / 3);
            var chartMargin = {
                "small": {
                    "top": 20,
                    "right": 35,
                    "bottom": hasSeries ? 55 / 4 * legendRowNum + 25 : 25,
                    "left": 35
                },
                "middle": {
                    "top": 20,
                    "right": 45,
                    "bottom": hasSeries ? 66 / 4 * legendRowNum + 35 : 40,
                    "left": 60
                },
                "wide": {
                    "top": 20,
                    "right": hasSeries ? 200 : 50,
                    "bottom": 40,
                    "left": 70
                },
                "large": {
                    "top": 40,
                    "right": 75,
                    "bottom": hasSeries ? 150 + 50 : 80 + 50,
                    "left": 100
                }
            };
            var margin = chartMargin[this.size()];
            var _getSizeBySize5 = getSizeBySize(this.size(), chartSize, 'trend', hasSeries, moreThan6),
                tickSize = _getSizeBySize5.tickSize,
                tickWidth = _getSizeBySize5.tickWidth,
                strokeWidth = _getSizeBySize5.strokeWidth,
                width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            if (this.style() === _style2.default.COMICS) {
                if (hasSeries || data.length > 7) width *= 0.8;
                else if (this.size() === _size2.default.WIDE) {
                    height *= 0.85;
                }
            } // set the ranges
            var x = d3.scaleTime().range([0, width]); // .padding(0.1);
            var y = d3.scaleLinear().range([height, 0]); // if (breakdown[1] && breakdown[1].field) return svg;
            // Scale the range of the data in the domains
            x.domain(d3.extent(data, function(d) {
                return parseTime(d[breakdown[0].field]);
            })); // y.domain([0, d3.max(data, function (d) { return d[measureName]; })]);
            if (hasSeries) y.domain([0, d3.max(stackedData[stackedData.length - 1], function(d) {
                return d[1];
            })]);
            else y.domain([0, d3.max(data, function(d) {
                return d[measureName];
            })]);
            var area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d[breakdown[0].field]));
            }).y0(height).y1(function(d) {
                return y(d[measureName]);
            });
            var stacked_area_generator = d3.area().curve(d3.curveMonotoneX).x(function(d) {
                return x(parseTime(d.data.x));
            }).y0(function(d) {
                var y0 = d[0];
                return y(Math.max(y0, 0));
            }).y1(function(d) {
                if (d[0] === d[1]) return y(Math.max(d[1], 0)) - 0.065;
                else return y(Math.max(d[1], 0));
            }); // let initialarea = d3.area()
            //     .x(function (d) {
            //         return x(d[breakdown[0].field]);
            //     })
            //     .y0(height)
            //     .y1(height);
            // add the x Axis
            var format_TicksCount = formatTicksCount(data[0][breakdown[0].field]);
            var tick_format = formatTick(data[0][breakdown[0].field]);
            var axisX = d3.axisBottom(x).tickFormat(tick_format);
            if (format_TicksCount === d3.timeYear) {
                axisX.ticks(format_TicksCount);
            } else if (format_TicksCount === d3.timeDay) {
                axisX.ticks(format_TicksCount);
            } // legend data init
            var seriesNameCopy = [].concat(_toConsumableArray(seriesName));
            if (hasSeries) {
                seriesNameCopy.sort(function(a, b) {
                    return a.length - b.length;
                });
                seriesName = [];
                var _i4 = 0;
                while (seriesNameCopy.length) {
                    if (_i4 % 2) seriesName.push(seriesNameCopy.shift());
                    else seriesName.push(seriesNameCopy.pop());
                    _i4 += 1;
                }
            } // draw axis
            svg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + height + ")").call(axisX).call(function(g) {
                g.attr("font-size", _this6.size() === 'wide' && seriesName.length > 8 ? tickSize - 2 : tickSize);
                g.attr("font-family", ENGFONT);
                var domainD = g.selectAll(".domain").attr("d");
                domainD = domainD.replace("6V", 6 * chartSize.height / 320 + "V");
                domainD = domainD.replace("V6", "V" + 6 * chartSize.height / 320);
                g.selectAll(".domain").attr("d", domainD).attr("stroke-width", tickWidth);
                g.selectAll(".tick").selectAll("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("y2", 6 * chartSize.height / 320);
                g.selectAll("text").attr("y", 9 * chartSize.height / 320);
                if (_this6.size() === 'large') { // 检查够不够放
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
            });; // add the y Axis
            svg.append("g").attr("class", "yAxis").call(d3.axisLeft(y)).attr("font-family", ENGFONT) // .attr("transform", `translate(-${8 * chartSize.width / 320},0)`)
                .call(d3.axisLeft(y).ticks(5).tickFormat(function(d) {
                    if (d / 1000000 >= 1) {
                        d = d / 1000000 + "M";
                    } else if (d / 1000 >= 1) {
                        d = d / 1000 + "K";
                    }
                    return d;
                })).call(function(g) {
                    g.attr("font-size", _this6.size() === 'wide' && seriesName.length > 8 ? tickSize - 2 : tickSize);
                    g.attr("font-family", ENGFONT);
                    var domainD = g.selectAll(".domain").attr("d");
                    domainD = domainD.replace("M-6", "M-" + 6 * chartSize.height / 320);
                    domainD = domainD.replace("H-6", "H-" + 6 * chartSize.height / 320);
                    g.selectAll(".domain").attr("d", domainD).attr("stroke-width", tickWidth);
                    g.selectAll(".tick").select("line").attr("stroke", _color2.default.AXIS).attr("stroke-width", tickWidth).attr("x2", -6 * chartSize.height / 320);
                    g.selectAll("text").attr("x", -9 * chartSize.height / 320); // if(this.size() === "middle") {
                    //     g.selectAll(".domain").attr("stroke-width", 1)
                    // }
                    if (_this6.size() === "small") {
                        g.selectAll(".domain").attr("display", "none");
                        g.selectAll(".tick").select("line").attr("display", "none");
                        g.selectAll(".tick").select("text").attr("display", "none");
                    }
                }); // axis_y
            //     .selectAll('.tick')
            //     .append('line')
            //     .attr("x2", width)
            //     .attr('stroke', Color.DASHLINE)
            //     .attr("stroke-width", tickWidth / 2)
            //     .attr("transform", `translate(${8* chartSize.width / 320},0)`)
            // append legend 
            if (hasSeries) {
                if (this.size() === "wide") {
                    svg.append("foreignObject").attr("x", chartSize.width - margin.left - margin.right + 30).attr("y", seriesName.length > 8 ? -margin.top * 0.5 : 0).attr("width", margin.right - 10).attr("height", height + margin.bottom * 0.6 + margin.top * 0.5).append("xhtml:div").attr("class", "legends").style("display", "flex").style("flex-direction", "column").style("flex-wrap", "wrap").style("align-content", "space-around").style("justify-content", "space-around").style("height", Math.round(seriesName.length > 8 ? height + margin.bottom * 0.6 + margin.top * 0.5 : height + margin.bottom * 0.3) + "px").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0).style("margin-right", 5 * chartSize.width / 320 + "px").each(function(d, i) {
                        var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                        legend.append("rect").attr("fill", function(d) {
                            return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                        }).attr("width", seriesName.length > 8 ? tickSize - 2 : tickSize).attr('height', seriesName.length > 8 ? tickSize - 2 : tickSize).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320);
                        legend.append("text").attr("x", tickSize + 3).text(function(d) {
                            return d.length > 11 ? d.substring(0, 10) + "…" : d;
                        }).attr("font-size", seriesName.length > 8 ? tickSize - 2 : tickSize).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                        legend.attr("width", Math.round(legend.node().getBBox().width));
                        legend.attr("height", Math.floor(legend.node().getBBox().height));
                    });
                } else {
                    var thisSize = this.size();
                    var xAxisHeightOffset = void 0;
                    var isRotate = svg.selectAll(".xAxis").select("text").attr("transform") ? true : false;
                    if (this.size() === 'small') xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.4;
                    else if (this.size() === 'middle') xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.4;
                    else {
                        if (isRotate) xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 1.2;
                        else xAxisHeightOffset = svg.selectAll(".xAxis").node().getBBox().height * 2;
                    }
                    svg.append("foreignObject").attr("x", function() {
                            if (_this6.size() === 'small') return -margin.left * 0.5;
                            else if (_this6.size() === 'middle') return -margin.left * 0.4;
                            else return margin.right - margin.left; //0
                        }).attr("y", height + xAxisHeightOffset).attr("width", function() {
                            if (_this6.size() === 'small') return chartSize.width - margin.left - margin.right + margin.left * 0.5 * 2;
                            else if (_this6.size() === 'middle') return chartSize.width - margin.left - margin.right + margin.left * 0.4 * 2;
                            else return chartSize.width - margin.left - margin.right - (margin.right - margin.left);
                        }).attr("height", margin.bottom - xAxisHeightOffset).append("xhtml:div").attr("class", "legends").style("display", "grid").style("grid-template-columns", 'repeat(' + Math.min(seriesName.length, thisSize === 'small' ? 3 : 3) + ', auto)').style("grid-template-rows", 'repeat(4, min-content)').style("grid-auto-flow", "row").style("justify-content", "space-between").style("align-content", "center").style("align-items", "end").style("padding-top", "1px").style("height", Math.round(margin.bottom - xAxisHeightOffset) + "px").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 0) // .style("margin-right", 5 * chartSize.width/320 + "px")
                        .each(function(d, i) {
                            var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg");
                            legend.append("rect").attr("fill", function(d) {
                                return _color2.default.CATEGORICAL[seriesName.indexOf(d)];
                            }).attr("width", thisSize === 'large' ? tickSize + 1 : tickSize).attr('height', thisSize === 'large' ? tickSize + 1 : tickSize).attr("rx", 1.5 * chartSize.width / 320).attr("ry", 1.5 * chartSize.width / 320); // .attr("cy", -5);
                            legend.append("text").attr("x", thisSize === 'large' ? tickSize + 2 : tickSize + 1).text(function(d) {
                                var text = d;
                                if (thisSize === 'small') { // small
                                    if (text.length > 8) text = text.substring(0, 7) + "…";
                                } else if (thisSize === 'middle') { //middle
                                    if (text.length > 10) text = text.substring(0, 9) + "…";
                                } else {
                                    if (text.length > 10) text = text.substring(0, 9) + "…"; // if(text.length>15) text = text.substring(0, 14) + "…"
                                }
                                return text;
                            }).attr("font-size", thisSize === "large" ? tickSize + 2 : tickSize + 1).attr("font-family", ENGFONT).attr("dominant-baseline", "hanging");
                            legend.attr("width", Math.round(legend.node().getBBox().width));
                            legend.attr("height", Math.floor(legend.node().getBBox().height));
                        });
                }
            }
            if (!hasSeries) {
                var getTanDeg = function getTanDeg(tan) {
                    var result = Math.atan(tan) / (Math.PI / 180);
                    result = Math.round(result);
                    return result;
                };
                svg.append('g').lower().attr("class", "areas").append("path").attr("fill", _color2.default.DEFAULT).attr("d", area_generator(data));
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
                    var _i5 = x_ymin;
                    x_ymin = x_ymax;
                    x_ymax = _i5;
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
                var trendlineLayer = svg.append("g").attr("class", "trendlineLayer");
                trendlineLayer.append("line").datum(data).attr("class", function(d) {
                    return "trendline " + d.key;
                }).attr("x1", x1).attr("x2", x2).attr("y1", y1 - 100).attr("y2", y2 - 100).attr("stroke", _color2.default.HIGHLIGHT).attr("stroke-width", strokeWidth).attr("stroke-dasharray", strokeWidth * 2 + ', ' + strokeWidth); // add triangle
                var finalPosition = x2 + ', ' + (y2 - 100);
                var f_x = x2,
                    f_y = y2 - 100,
                    s_x = x1,
                    s_y = y1 - 100;
                var slope = (f_y - s_y) / (f_x - s_x);
                var deg = void 0;
                if (getTanDeg(slope) < 0) {
                    deg = 90 - Math.abs(getTanDeg(slope));
                } else {
                    deg = 90 + getTanDeg(slope);
                }
                trendlineLayer.append("path").attr("class", "triangle").attr("transform", "translate(" + finalPosition + ")rotate(" + deg + ")").attr("d", d3.symbol().type(d3.symbolTriangle).size(0.16 * height)).attr("fill", _color2.default.HIGHLIGHT); // let lineLayer = svg.append("g").attr('id', 'lineLayer')
                // let lineGen = d3.line().curve(d3.curveMonotoneX)
                //     .x(function (d) {
                //         return x(parseTime(d[breakdown[0].field]));
                //     })
                //     .y(function (d) {
                //         return y(d[measureName]);
                //     })
                // lineLayer.append('path')
                //     .attr('d', lineGen(data))
                //     .attr('stroke', Color.HIGHLIGHT)
                //     .attr('stroke-width', strokeWidth)
                //     .attr('fill', 'none')
                //     .attr("stroke-dasharray", `${strokeWidth*2}, ${strokeWidth}`);;
            } else {
                svg.append('g').lower().attr("class", "areas").selectAll("path").data(stackedData).join("path").attr('id', function(_ref3) {
                        var key = _ref3.key;
                        return 'series_' + key.replace(/\s/g, "");
                    }).attr("fill", function(d) {
                        return _color2.default.CATEGORICAL[seriesName.indexOf(d.key)];
                    }) //({ index }) => Color.CATEGORICAL[index])
                    .attr("class", "area") // .attr("d", stack_initialarea)
                    // .transition()
                    // .duration(4000)
                    .attr("d", stacked_area_generator);
            }
            if (this.style() === _style2.default.COMICS) {
                if (hasSeries) {
                    var metaphorWidth = width * 0.34,
                        metaphorHeight = 1.25 * metaphorWidth;
                    var metaphor = svg.append("image").attr('xlink:href', _metaphor8.default);
                    if (this.size() === _size2.default.WIDE) {
                        metaphorWidth = width * 0.34;
                        metaphorHeight = 1.25 * metaphorWidth;
                    } else if (this.size() === _size2.default.MIDDLE) {
                        metaphorWidth = width * 0.32;
                        metaphorHeight = 1.25 * metaphorWidth;
                    }
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.12).attr("y", height - metaphorHeight * 0.96);
                } else { //points
                    // let filterPoints = [];
                    // svg.selectAll(".tick").each(function(d){
                    //     let item = factData.find(i => parseTime(i[breakdown[0].field]).getTime() === d.getTime());
                    //     filterPoints.push(item);
                    // });
                    var filterPoints = data;
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
                        var _metaphorWidth2 = width * 0.26,
                            _metaphorHeight2 = 1.24 * _metaphorWidth2;
                        var _metaphor2 = svg.append("image").attr('xlink:href', _metaphor10.default);
                        if (this.size() === _size2.default.WIDE) {
                            _metaphorWidth2 = width * 0.20;
                            _metaphorHeight2 = 1.24 * _metaphorWidth2;
                        } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                            _metaphorWidth2 = width * 0.24;
                            _metaphorHeight2 = 1.24 * _metaphorWidth2;
                        }
                        _metaphor2.attr("width", _metaphorWidth2).attr("height", _metaphorHeight2).attr("x", _x2 - _metaphorWidth2 * 0.06).attr("y", _y2 - _metaphorHeight2 * 0.06);
                    } else {
                        var metaphorWidth7 = width / (filterPoints.length - 1) * 0.6,
                            metaphorWidth8 = metaphorWidth7 / 1.14;
                        var metaphorHeight7 = metaphorWidth7 * 0.95;
                        var metaphorHeight8 = metaphorWidth8 * 1.2;
                        for (var _i6 = 1; _i6 < filterPoints.length; _i6++) {
                            var middleX = (x(parseTime(filterPoints[_i6][breakdown[0].field])) + x(parseTime(filterPoints[_i6 - 1][breakdown[0].field]))) / 2;
                            var middleY = (y(filterPoints[_i6][measureName]) + y(filterPoints[_i6 - 1][measureName])) / 2;
                            if (filterPoints[_i6][measureName] - filterPoints[_i6 - 1][measureName] > 0) { //up
                                svg.append("image").attr('xlink:href', _metaphor6.default).attr("width", metaphorWidth8).attr("height", metaphorHeight8).attr("x", middleX - metaphorWidth8 * 0.7).attr("y", middleY - metaphorHeight8 * 0.96);
                            } else { //down
                                svg.append("image").attr('xlink:href', _metaphor4.default).attr("width", metaphorWidth7).attr("height", metaphorHeight7).attr("x", middleX - metaphorWidth7 * 0.5).attr("y", middleY - metaphorHeight7 * 1);
                            }
                        }
                    } //center居中
                    svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x) + "," + ((this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y) + ")");
                }
            }
            if (!svg) return; /* -------------------------------- init data ------------------------------- */
            var ticks = 10;
            var layback = 0;
            var duration = this.duration(); // let breakdown = this.breakdown();
            // let hasSeries = breakdown[1] && breakdown[1].field ? true : false;
            // let moreThan6 = false
            // set the dimensions and margins of the graph
            // let chartSize = { width: this.width(), height: this.height() }
            // let { margin } = getSizeBySize(this.size(), chartSize, 'distribution', hasSeries, moreThan6),
            //     width = chartSize.width - margin.left - margin.right,
            //     height = chartSize.height - margin.top - margin.bottom;
            /* ------------------------------ start animate ----------------------------- */
            /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                axisFadeIn: {
                    duration: 1.5,
                    index: 0
                },
                legendFadeIn: {
                    duration: 1.5,
                    index: 1
                },
                areaSlide: {
                    duration: hasSeries ? 7 : 5,
                    index: 2
                },
                trendDraw: {
                    duration: 2,
                    index: 3
                }
            };
            var everyTick = duration / ticks; /* ---------------------------- step 0 axisFadeIn --------------------------- */
            var xAxis = svg.selectAll(".xAxis");
            var yAxis = svg.selectAll(".yAxis");
            xAxis.attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1);
            yAxis.attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1); /* --------------------------- step 1 legendFadeIn -------------------------- */
            var legends = svg.selectAll(".legends");
            legends.style("opacity", 0);
            setTimeout(function() {
                legends.transition().duration(everyTick * (animation.legendFadeIn.duration + 0.5)).style("opacity", 1);
            }, everyTick * (countTicksBeforeIndex(animation, animation.legendFadeIn.index) - 0.5)); /* ---------------------------- step 2 areaSlide ---------------------------- */
            var areas = svg.selectAll(".areas"); // defs
            var uuid1 = (0, _v2.default)();
            areas.attr('id', 'areasClip').attr('clip-path', 'url(#clip_areasGraph_' + uuid1 + ')');
            areas.append('defs').attr('class', 'trend_defs').append('clipPath').attr('id', 'clip_areasGraph_' + uuid1).append('rect').attr('x', 0).attr('width', 0).attr('height', height);
            var uuid2 = (0, _v2.default)();
            var line = svg.selectAll("#lineLayer");
            line.attr('clip-path', 'url(#clip_trendline_' + uuid2 + ')');
            line.append('defs').attr('class', 'trendline_defs').append('clipPath').attr('id', 'clip_trendline_' + uuid2).append('rect').attr('x', 0).attr('width', 0).attr('height', height);
            setTimeout(function() {
                areas.select("#clip_areasGraph_" + uuid1 + " rect").attr('width', 0).transition().duration(everyTick * (animation.areaSlide.duration + layback)).ease(d3.easeLinear).attr('width', width);
                line.select("#clip_trendline_" + uuid2 + " rect").attr('width', 0).transition().duration(everyTick * (animation.areaSlide.duration + layback)).ease(d3.easeLinear).attr('width', width);
            }, everyTick * (countTicksBeforeIndex(animation, animation.areaSlide.index) - layback));
            if (!hasSeries) {
                var trendSVG = svg.select(".trendlineLayer");
                var uuid = (0, _v2.default)();
                trendSVG.attr("id", "trendSVGClip").attr("clip-path", "url(#clip_trend_" + uuid + ")");
                var defsX = trendSVG.node().getBBox().x,
                    defsY = trendSVG.node().getBBox().y,
                    defsHeight = trendSVG.node().getBBox().height,
                    defsWidth = trendSVG.node().getBBox().width;
                trendSVG.append("defs").attr("class", "trend_defs").append("clipPath").attr("id", "clip_trend_" + uuid).append("rect").attr("x", defsX - 10).attr("y", defsY - 10).attr("width", 0).attr("height", defsHeight + 20);
                setTimeout(function() {
                    trendSVG.select("#clip_trend_" + uuid + " rect").attr("width", 0).transition().duration(everyTick * animation.trendDraw.duration).ease(d3.easeLinear).attr("width", defsWidth + 10);
                }, everyTick * countTicksBeforeIndex(animation, animation.trendDraw.index));
            }
        }
    }, {
        key: 'animateOutlier',
        value: function animateOutlier() {
            var svg = this.displayOutlier();
            if (!svg) return; /* -------------------------------- init data ------------------------------- */
            var ticks = 10;
            var layback = 0;
            var duration = this.duration();
            var focus = this.focus(); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                axisFadeIn: {
                    duration: 2,
                    index: 0
                },
                areaFadeIn: {
                    duration: 2,
                    index: 1
                },
                tooltipFadeIn: {
                    duration: 6,
                    index: 2
                }
            };
            var everyTick = duration / ticks; // remove tooltip
            svg.selectAll('.tooltip').remove(); /* ---------------------------- step 0 axisFadeIn --------------------------- */
            var xAxis = svg.selectAll(".xAxis");
            var yAxis = svg.selectAll(".yAxis");
            xAxis.attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1);
            yAxis.attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1);
            xAxis.select(".tick").attr("opacity", 0); /* ---------------------------- step 1 areaFadeIn --------------------------- */
            var areas = svg.selectAll(".areas");
            areas.attr("opacity", 0);
            setTimeout(function() {
                areas.transition().duration(everyTick * (animation.areaFadeIn.duration + layback)).attr("opacity", 1);
            }, everyTick * (countTicksBeforeIndex(animation, animation.areaFadeIn.index) - layback));
            var lineLayer = svg.selectAll(".lineLayer");
            var trendLine = lineLayer.selectAll("path");
            trendLine.attr("opacity", 0);
            setTimeout(function() {
                trendLine.transition().duration(everyTick * (animation.areaFadeIn.duration + layback)).attr("opacity", 1);
            }, everyTick * (countTicksBeforeIndex(animation, animation.areaFadeIn.index) - layback)); /* ----------------------------- step 3 dotPopUp ---------------------------- */ // show tick
            var tick = xAxis.selectAll('.tick');
            tick.attr("opacity", 0);
            var dotFocus = lineLayer.selectAll("circle");
            dotFocus.attr("opacity", 0); /* -------------------------- step 4 tooltipFadeIn -------------------------- */
            var tooltip = svg.selectAll(".tooltip");
            tooltip.attr("opacity", 0);
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
                svg.append("path").datum(circle_data).attr("class", "animation").attr("stroke", _color2.default.ANNOTATION).attr("fill", _color2.default.ANNOTATION).attr("x", circleX).attr("y", circleY).attr("transform", "translate(" + circleX + "," + circleY + ")").attr("d", arc).transition().duration(everyTick * animation.tooltipFadeIn.duration * 0.5).attrTween('d', function(d) {
                    var i = d3.interpolate(d.startAngle, d.endAngle);
                    return function(t) {
                        d.endAngle = i(t);
                        return arc(d);
                    };
                });
            }, everyTick * countTicksBeforeIndex(animation, animation.tooltipFadeIn.index));
            var fontSize = xAxis.attr("font-size");
            svg.append("text").attr("fill", _color2.default.ANNOTATION).attr("font-size", fontSize).attr("x", circleX).attr("y", circleY - circleR * 2).attr("dominant-baseline", "baseline").attr("text-anchor", "middle").text(focus[0].value).attr("fill-opacity", 0).transition().duration(everyTick * animation.tooltipFadeIn.duration).delay(everyTick * countTicksBeforeIndex(animation, animation.tooltipFadeIn.index)).attr("fill-opacity", 1);
        }
    }, {
        key: 'animateExtreme',
        value: function animateExtreme() {
            var _this7 = this;
            var svg = this.displayExtreme();
            if (!svg) return; /* -------------------------------- init data ------------------------------- */
            var ticks = 10;
            var layback = 0;
            var duration = this.duration(); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                axisFadeIn: {
                    duration: 1,
                    index: 0
                },
                areaFadeIn: {
                    duration: 1,
                    index: 1
                },
                refLineDraw: {
                    duration: 2,
                    index: 2
                },
                tooltipFadeIn: {
                    duration: 2,
                    index: 3
                },
                dotPopUp: {
                    duration: 4,
                    index: 4
                }
            };
            var everyTick = duration / ticks; /* ---------------------------- step 0 axisFadeIn --------------------------- */
            var xAxis = svg.selectAll(".xAxis");
            var yAxis = svg.selectAll(".yAxis");
            xAxis.attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1);
            yAxis.attr("opacity", 0).transition().duration(everyTick * animation.axisFadeIn.duration).attr("opacity", 1); /* ---------------------------- step 1 areaFadeIn --------------------------- */
            var areas = svg.selectAll(".areas");
            areas.attr("opacity", 0);
            setTimeout(function() {
                areas.transition().duration(everyTick * (animation.areaFadeIn.duration + layback)).attr("opacity", 1);
            }, everyTick * (countTicksBeforeIndex(animation, animation.areaFadeIn.index) - layback));
            var lineLayer = svg.selectAll(".lineLayer");
            var trendLine = lineLayer.selectAll("path");
            trendLine.attr("opacity", 0);
            setTimeout(function() {
                trendLine.transition().duration(everyTick * (animation.areaFadeIn.duration + layback)).attr("opacity", 1);
            }, everyTick * (countTicksBeforeIndex(animation, animation.areaFadeIn.index) - layback)); /* --------------------------- step 2 refLineDraw --------------------------- */
            var dotFocus = lineLayer.selectAll("circle");
            dotFocus.attr("opacity", 0);
            var xOrigin = dotFocus.attr("cx"),
                yOrigin = dotFocus.attr("cy");
            setTimeout(function() {
                dotFocus.attr("opacity", 1);
                svg.selectAll(".lineLayer").append("line").lower().attr("x1", xOrigin).attr("y1", yOrigin).attr("x2", xOrigin).attr("y2", yOrigin).attr("stroke", _color2.default.DASHLINE).attr('stroke-dasharray', '5,5').attr("stroke-width", xAxis.selectAll(".domain").attr("stroke-width")).transition().duration(everyTick * animation.refLineDraw.duration).attr("x2", xOrigin).attr("y2", _this7._y(0));
            }, everyTick * countTicksBeforeIndex(animation, animation.refLineDraw.index)); /* -------------------------- step 3 tooltipFadeIn -------------------------- */
            var tooltip = svg.selectAll(".tooltip");
            tooltip.attr("opacity", 0);
            var xTick = xAxis.selectAll(".tick");
            xTick.attr("opacity", 0);
            setTimeout(function() {
                tooltip.transition().duration(everyTick * animation.tooltipFadeIn.duration).attr("opacity", 1);
                xTick.transition().duration(everyTick * animation.tooltipFadeIn.duration).attr("opacity", 1);
            }, everyTick * countTicksBeforeIndex(animation, animation.tooltipFadeIn.index)); /* ----------------------------- step 4 dotPopUp ---------------------------- */
            var originalR = dotFocus.attr("r");
            var shortest = 150;
            setTimeout(function() {
                var count = 0;
                dotFocus.attr("opacity", 1);
                count += shortest * 2;
                dotFocus.transition().duration(shortest).attr("r", originalR * 1.5).transition().duration(shortest).attr("r", originalR);
                var poping = setInterval(function() {
                    if (count >= everyTick * animation.dotPopUp.duration) {
                        clearInterval(poping);
                    }
                    dotFocus.transition().duration(shortest).attr("r", originalR * 1.5).transition().duration(shortest).attr("r", originalR);
                    count += shortest * 2;
                }, shortest * 2);
            }, everyTick * (countTicksBeforeIndex(animation, animation.dotPopUp.index) - layback));
        }
    }]);
    return AreaChart;
}(_chart2.default);
var getSizeBySize = function getSizeBySize(size, chartSize, fact) {
    var hasSeries = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var moreThan6 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var tickSize = void 0,
        annotationSize = void 0,
        tickWidth = void 0,
        dotR = void 0,
        strokeWidth = void 0;
    switch (size) {
        case "small":
            tickSize = 10;
            annotationSize = 16;
            tickWidth = 1.5;
            dotR = 5;
            strokeWidth = 2;
            break;
        case "middle":
            tickSize = 13;
            annotationSize = 20;
            tickWidth = 2;
            dotR = 5;
            strokeWidth = 3;
            break;
        case "wide":
            tickSize = 16;
            annotationSize = 26;
            dotR = 7;
            tickWidth = 2;
            strokeWidth = 3;
            break;
        case "large":
        default:
            tickSize = 20;
            annotationSize = 40;
            tickWidth = 3;
            dotR = 10;
            strokeWidth = 3;
            break;
    }
    var chartMargin = {
        "small": {
            "top": fact === 'outlier' ? 20 : 10,
            "right": 25,
            "bottom": hasSeries ? 60 : 25,
            "left": 25
        },
        "middle": {
            "top": fact === 'outlier' ? 10 : 10,
            "right": 40,
            "bottom": hasSeries ? 80 : 40,
            "left": 50
        },
        "wide": {
            "top": 12,
            "right": hasSeries ? 160 : 50,
            "bottom": 40,
            "left": 70
        },
        "large": {
            "top": fact === 'outlier' ? 40 : 40,
            "right": 50,
            "bottom": hasSeries ? 150 + 50 : 80,
            "left": 80
        }
    };
    var margin = chartMargin[size];
    return {
        chartSize: chartSize,
        margin: margin,
        tickSize: tickSize,
        annotationSize: annotationSize,
        tickWidth: tickWidth,
        dotR: dotR,
        strokeWidth: strokeWidth
    };
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
}; // const removeOverlapX = (g, x) => {
//     // get tick width;
//     let tickWidth = 0
//     g.selectAll(".tick")
//         .each(function(d, i) {
//             let _thisWidth = d3.select(this).node().getBBox().width
//             if(tickWidth < _thisWidth) tickWidth = _thisWidth;
//         });
//     tickWidth = tickWidth * 1.4;
//     // firstTick.getBBox().width * 1.35;
//     let tickCount = g.selectAll(".tick").size();
//     let xAxisWidth = x.range()[1] - x.range()[0];
//     let possibleTickCount =  Math.floor((xAxisWidth) / tickWidth) + 1;
//     let enough = tickCount * tickWidth >= xAxisWidth ? false : true
//     g.selectAll(".tick")
//         .each(function(d, i) {
//             if(!enough &&  i % Math.floor(tickCount/possibleTickCount) !== 0) {
//                 this.remove();
//             }
//         })
// }
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
exports.default = AreaChart;