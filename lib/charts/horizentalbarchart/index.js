'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _slicedToArray = function() {
    function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"]) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }
    return function(arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
    };
}();
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
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
var _format = require('../../visualization/format');
var _format2 = _interopRequireDefault(_format);
var _size = require('../../visualization/size');
var _size2 = _interopRequireDefault(_size);
var _style = require('../../visualization/style');
var _style2 = _interopRequireDefault(_style);
var _updateChartCenter = require('../../visualization/updateChartCenter');
var _updateChartCenter2 = _interopRequireDefault(_updateChartCenter);
var _metaphor = require('../../metaphor/metaphor4.png');
var _metaphor2 = _interopRequireDefault(_metaphor);
var _metaphor3 = require('../../metaphor/metaphor20.png');
var _metaphor4 = _interopRequireDefault(_metaphor3);
var _metaphor5 = require('../../metaphor/metaphor9.png');
var _metaphor6 = _interopRequireDefault(_metaphor5);
var _metaphor7 = require('../../metaphor/metaphor21.png');
var _metaphor8 = _interopRequireDefault(_metaphor7);
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
} //value
//difference
//distribution
//rank
var NUMFONT = "Arial-Regular";
var TEXTFONT = "Arial-Bold";
var HorizentalBarChart = function(_Chart) {
    _inherits(HorizentalBarChart, _Chart);

    function HorizentalBarChart() {
        _classCallCheck(this, HorizentalBarChart);
        return _possibleConstructorReturn(this, (HorizentalBarChart.__proto__ || Object.getPrototypeOf(HorizentalBarChart)).apply(this, arguments));
    }
    _createClass(HorizentalBarChart, [{
        key: 'displayDistribution',
        value: function displayDistribution() {
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize = getSizeBySize(chartSize, this.size()),
                tickFontSize = _getSizeBySize.tickFontSize,
                tickStrokeWidth = _getSizeBySize.tickStrokeWidth,
                margin = _getSizeBySize.margin,
                offsetY = _getSizeBySize.offsetY,
                width = chartSize.width,
                height = chartSize.height;
            var svg = d3.select(this.container()).append("svg").attr("width", width).attr("height", height).attr("display", "block").attr("class", "barG").append("g");
            if (this.style() === _style2.default.COMICS) width = 0.8 * width;
            if (this.measure().length > 1) {
                svg.append("rect").attr("width", width).attr("height", height).attr("fill", "none");
                return svg;
            }
            var measure = this.measure();
            var breakdown = this.breakdown();
            var mesuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
            var maxBarNumbers = 20;
            if (this.size() === "middle") {
                maxBarNumbers = 15;
            } else if (this.size() === "small") {
                maxBarNumbers = 10;
            }
            var data = this.factdata();
            if (data.length > maxBarNumbers) { // unsupportedchart(svg, chartSize, annotationSize, this.size());
                // return svg;
                data = data.slice(0, maxBarNumbers);
            } /*****(0)****/ //if same year
            var sameYear = "";
            if (breakdown[0].type === "temporal") {
                try {
                    var year = getSameYear(data.map(function(d) {
                        return d[breakdown[0].field];
                    }));
                    sameYear = year + "/";
                } catch (e) { //keep origin
                }
            }
            var textHeight = 0;
            if (this.size() === _size2.default.LARGE && sameYear !== "" && sameYear !== "false/") {
                var yearText = svg.append("text").text("Year:" + sameYear.replace("/", "")).attr("font-size", '21').attr("font-family", NUMFONT).attr("y", margin.top).attr("x", width / 2).attr("fill", _color2.default.TEXT).attr("text-anchor", "middle");
                textHeight = yearText.node().getBBox().height + 10; //margin
            }
            data = data.map(function(d) {
                d[breakdown[0].field] = d[breakdown[0].field].replace(sameYear, "");
                return d;
            }); /*****(0) the end****/ /***(1) append yAxis**/
            var startY = margin.top + textHeight,
                endY = height - margin.bottom;
            var YDomain = data.map(function(d) {
                return d[breakdown[0].field];
            });
            initYAixsStyle(startY, endY, YDomain, svg, tickStrokeWidth, tickFontSize, margin, offsetY); /***(2) append xAxis**/
            var measuredYFieldsWidth = svg.select(".yAxis").node().getBBox().width + margin.left;
            var starX = measuredYFieldsWidth,
                endX = width - margin.right,
                xAxisPos = height - margin.bottom;
            var maxX = d3.max(data, function(d) {
                return d[mesuredField];
            });
            initXAxisStyle(starX, endX, maxX, svg, xAxisPos, tickStrokeWidth, tickFontSize); //modify x style
            svg.select(".xAxis").remove(); //(3)draw bar 
            var y = d3.scaleBand().domain(YDomain).range([startY, endY]).paddingInner(0.5);
            var x = d3.scaleLinear().domain([0, maxX]).range([starX, endX]);
            svg.selectAll(".bar").data(data).enter().append("rect").lower().attr("class", "bar").attr("fill", _color2.default.DEFAULT).attr("x", starX).attr("y", function(d) {
                return y(d[breakdown[0].field]);
            }).attr("rx", y.bandwidth() / 2).attr("ry", y.bandwidth() / 2).attr("width", function(d) {
                return x(d[mesuredField]) - starX;
            }).attr("height", y.bandwidth()); //(4)draw  bar value
            var barValueX = starX + offsetY; //margin left=offsetY
            data.map(function(d) {
                var barValue = d[mesuredField],
                    barvalueY = y(d[breakdown[0].field]),
                    offsetY = y.bandwidth() / 2;
                drawBarValue(svg, offsetY, tickFontSize, barValueX, barvalueY, barValue);
                return d;
            });
            if (this.style() === _style2.default.COMICS) {
                var svgBBox = svg.node().getBBox();
                var metaphorWidth = width * 0.25,
                    metaphorHeight = 1.12 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor6.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.22;
                    metaphorHeight = 1.12 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.26;
                    metaphorHeight = 1.12 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", svgBBox.width + svgBBox.x + metaphorWidth * 0.06).attr("y", svgBBox.height + svgBBox.y - metaphorHeight * 1.1);
            }
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret = function() {
                    var pictypename = [];
                    var pictype = [];
                    if (breakdown[0].type === "temporal" || breakdown[0].type === "numerical") return {
                        v: void 0
                    };
                    data.forEach(function(ele, i) {
                        pictypename.push(ele[breakdown[0].field]);
                    });
                    pictypename.forEach(function(ele1) {
                        breakdown[0].values.forEach(function(ele, i) {
                            if (ele.attribute === ele1) {
                                pictype.push(ele.pictype);
                            }
                        });
                    }); /*------------------通过名称找寻icon----------------------------*/
                    svg.append("defs").selectAll("g").data(pictype).enter().append("g").attr("id", function(d) {
                        return 'pichd' + d;
                    }).append("path").attr("d", function(d) {
                        return _pictogram2.default[d];
                    }); /*-----------------缩放icon---------------------------*/
                    var scale = [];
                    var typesizex1 = [];
                    var typesizey1 = [];
                    var typex1 = [];
                    var typey1 = [];
                    var _loop = function _loop(i) {
                        typesizex1.push(svg.select('#pichd' + pictype[i]).node().getBBox().width);
                        typesizey1.push(svg.select('#pichd' + pictype[i]).node().getBBox().height);
                        typex1.push(svg.select('#pichd' + pictype[i]).node().getBBox().x);
                        typey1.push(svg.select('#pichd' + pictype[i]).node().getBBox().y);
                        svg.select('#pichd' + pictype[i]).attr("transform", function() {
                            scale.push(Math.sqrt(y.bandwidth() * y.bandwidth() / (typesizey1[i] * typesizex1[i])));
                            return 'scale(' + scale[i] + ')';
                        });
                    };
                    for (var i = 0; i < pictype.length; i++) {
                        _loop(i);
                    }
                    var typesizex = [];
                    var typesizey = [];
                    var typex = [];
                    var typey = [];
                    for (var i = 0; i < pictype.length; i++) {
                        typesizex.push(svg.select('#pichd' + pictype[i]).node().getBBox().width);
                        typesizey.push(svg.select('#pichd' + pictype[i]).node().getBBox().height);
                        typex.push(svg.select('#pichd' + pictype[i]).node().getBBox().x);
                        typey.push(svg.select('#pichd' + pictype[i]).node().getBBox().y);
                    } //添加icon
                    svg.append("g").selectAll("use").data(data).enter().append("use").attr("xlink:href", function(d, i) {
                            return '#pichd' + pictype[i];
                        }).attr("id", function(d, i) {
                            return 'icon' + pictypename[i];
                        }).attr("x", function(d, i) {
                            return x(d[mesuredField]) - Math.abs(typex[i] * scale[i]);
                        }).attr("y", function(d, i) {
                            return y(d[breakdown[0].field]) - Math.abs(typey[i] * scale[i]) + y.bandwidth() / 2 - typesizey[i] * scale[i] / 2;
                        }) //.attr("fill",Color.DEFAULT)
                        .attr("fill", "#96A7CE").attr("fill-opacity", 0.7);
                    svg.selectAll(".barValue").remove();
                    data.map(function(d) {
                        var barValue = d[mesuredField],
                            barvalueY = y(d[breakdown[0].field]),
                            offsetY = y.bandwidth() / 2;
                        drawBarValue(svg, offsetY, tickFontSize, barValueX, barvalueY, barValue);
                        return d;
                    });
                    var cardWidth = chartSize.width;
                    var cardHeight = chartSize.height;
                    var a = svg.node().getBBox().width;
                    var b = svg.node().getBBox().height;
                    var c = svg.node().getBBox().x;
                    var e = svg.node().getBBox().y;
                    var transx = -c + cardWidth / 2 - a / 2;
                    var transy = -e + cardHeight / 2 - b / 2;
                    if ((a > cardWidth || b > cardHeight) && width / a < height / b) {
                        svg.attr("transform", 'scale(' + width / a + ')  translate(' + (cardWidth / (2 * width / a) - (a / 2 + c)) + ',' + (cardHeight / (2 * width / a) - (b / 2 + e)) + ') ');
                    } else if ((a > cardWidth || b > cardHeight) && height / b <= width / a) {
                        svg.attr("transform", 'scale(' + height / b + ')  translate(' + (cardWidth / (2 * height / b) - (a / 2 + c)) + ',' + (cardHeight / (2 * height / b) - (b / 2 + e)) + ') ');
                    } else {
                        svg.attr("transform", 'translate(' + transx + ' ,' + transy + ') ');
                    }
                }();
                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            } //finally update chart horizental cental
            if (this.style() !== _style2.default.PICTOGRAPH)(0, _updateChartCenter2.default)(svg, this.width(), this.height());
            return svg;
        }
    }, {
        key: 'displayRank',
        value: function displayRank() {
            var _this2 = this;
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize2 = getSizeBySize(chartSize, this.size()),
                tickFontSize = _getSizeBySize2.tickFontSize,
                tickStrokeWidth = _getSizeBySize2.tickStrokeWidth,
                margin = _getSizeBySize2.margin,
                offsetY = _getSizeBySize2.offsetY,
                width = chartSize.width,
                height = chartSize.height;
            var svg = d3.select(this.container()).append("svg").attr("width", width).attr("height", height).attr("display", "block").attr("class", "barG").append("g");
            if (this.style() === _style2.default.COMICS) width = 0.8 * width;
            if (this.measure().length > 1) {
                svg.append("rect").attr("width", width).attr("height", height).attr("fill", "none");
                return svg;
            }
            var measure = this.measure();
            var breakdown = this.breakdown();
            var mesuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
            var data = this.factdata().sort(function(a, b) {
                    return b[mesuredField] - a[mesuredField];
                }),
                maxBarNumbers = 5;
            if (this.size() === "large") {
                maxBarNumbers = 10;
            }
            if (data.length > maxBarNumbers) data = data.slice(0, maxBarNumbers); /*****(0)****/ //if same year
            var sameYear = "";
            if (breakdown[0].type === "temporal") {
                try {
                    var year = getSameYear(data.map(function(d) {
                        return d[breakdown[0].field];
                    }));
                    sameYear = year + "/";
                } catch (e) { //keep origin
                }
            }
            var textHeight = 0;
            if (this.size() === _size2.default.LARGE && sameYear !== "" && sameYear !== "false/") {
                var yearText = svg.append("text").text("Year:" + sameYear.replace("/", "")).attr("font-size", '21').attr("font-family", NUMFONT).attr("y", margin.top).attr("x", width / 2).attr("fill", _color2.default.TEXT).attr("text-anchor", "middle");
                textHeight = yearText.node().getBBox().height + 10; //margin
            }
            data = data.map(function(d) {
                d[breakdown[0].field] = d[breakdown[0].field].replace(sameYear, "");
                return d;
            }); /*****(0) the end****/ /***(1) append yAxis**/
            var startY = margin.top + textHeight,
                endY = height - margin.bottom;
            var YDomain = data.map(function(d) {
                return d[breakdown[0].field];
            });
            initYAixsStyle(startY, endY, YDomain, svg, tickStrokeWidth, tickFontSize, margin, offsetY); /***(2) append xAxis**/
            var measuredYFieldsWidth = svg.select(".yAxis").node().getBBox().width + margin.left;
            var starX = measuredYFieldsWidth,
                endX = width - margin.right,
                xAxisPos = height - margin.bottom;
            var maxX = d3.max(data, function(d) {
                return d[mesuredField];
            });
            if (measure[0]['max'] && measure[0].max > maxX) {
                maxX = measure[0].max;
            }
            initXAxisStyle(starX, endX, maxX, svg, xAxisPos, tickStrokeWidth, tickFontSize); //modify x style
            svg.select(".xAxis").remove(); //(3)draw bar 
            var y = d3.scaleBand().domain(YDomain).range([startY, endY]).paddingInner(0.5);
            var x = d3.scaleLinear().domain([0, maxX]).range([starX, endX]);
            svg.selectAll(".bar").data(data).enter().append("rect").lower().attr("class", "bar").attr("fill", function(d, i) {
                if (i < 3) {
                    return _color2.default.HIGHLIGHT;
                }
                return _color2.default.DEFAULT;
            }).attr("x", starX).attr("y", function(d) {
                return y(d[breakdown[0].field]);
            }).attr("rx", y.bandwidth() / 2).attr("ry", y.bandwidth() / 2).attr("width", function(d) {
                return x(d[mesuredField]) - starX;
            }).attr("height", y.bandwidth()); //(4)draw  bar value
            var barValueX = starX + offsetY; //margin left=offsetY
            data.map(function(d) {
                var barValue = d[mesuredField],
                    barvalueY = y(d[breakdown[0].field]),
                    offsetY = y.bandwidth() / 2;
                drawBarValue(svg, offsetY, tickFontSize, barValueX, barvalueY, barValue);
                return d;
            });
            if (this.style() === _style2.default.COMICS) {
                var svgBBox = svg.node().getBBox();
                var metaphorWidth = width * 0.25,
                    metaphorHeight = 1.33 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor8.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.22;
                    metaphorHeight = 1.33 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.26;
                    metaphorHeight = 1.33 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", svgBBox.width + svgBBox.x + metaphorWidth * 0.06).attr("y", svgBBox.height + svgBBox.y - metaphorHeight * 1.1);
            }
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret3 = function() {
                    var pictypename = [];
                    var pictype = [];
                    if (breakdown[0].type === "temporal" || breakdown[0].type === "numerical") return {
                        v: void 0
                    };
                    data.forEach(function(ele, i) {
                        pictypename.push(ele[breakdown[0].field]);
                    }); //icon 的位置寻找方式 注意两个数组之间的先后关系
                    pictypename.forEach(function(ele1) {
                        breakdown[0].values.forEach(function(ele, i) {
                            if (ele.attribute === ele1) {
                                pictype.push(ele.pictype);
                            }
                        });
                    }); /*------------------通过名称找寻icon----------------------------*/
                    svg.append("defs").selectAll("g").data(pictype).enter().append("g").attr("id", function(d) {
                        return 'pichr' + d;
                    }).append("path").attr("d", function(d) {
                        return _pictogram2.default[d];
                    }); /*-----------------缩放icon---------------------------*/
                    var scale = [];
                    var typesizex1 = [];
                    var typesizey1 = [];
                    var typex1 = [];
                    var typey1 = [];
                    var _loop2 = function _loop2(i) {
                        typesizex1.push(svg.select('#pichr' + pictype[i]).node().getBBox().width);
                        typesizey1.push(svg.select('#pichr' + pictype[i]).node().getBBox().height);
                        typex1.push(svg.select('#pichr' + pictype[i]).node().getBBox().x);
                        typey1.push(svg.select('#pichr' + pictype[i]).node().getBBox().y);
                        svg.select('#pichr' + pictype[i]).attr("transform", function() {
                            scale.push(Math.sqrt(y.bandwidth() * y.bandwidth() / (typesizey1[i] * typesizex1[i])));
                            return 'scale(' + scale[i] + ')';
                        });
                    };
                    for (var i = 0; i < pictype.length; i++) {
                        _loop2(i);
                    }
                    var typesizex = [];
                    var typesizey = [];
                    var typex = [];
                    var typey = [];
                    for (var i = 0; i < pictype.length; i++) {
                        typesizex.push(svg.select('#pichr' + pictype[i]).node().getBBox().width);
                        typesizey.push(svg.select('#pichr' + pictype[i]).node().getBBox().height);
                        typex.push(svg.select('#pichr' + pictype[i]).node().getBBox().x);
                        typey.push(svg.select('#pichr' + pictype[i]).node().getBBox().y);
                    } //添加icon
                    svg.append("g").selectAll("use").data(data).enter().append("use").attr("xlink:href", function(d, i) {
                            return '#pichr' + pictype[i];
                        }).attr("id", function(d, i) {
                            return 'icon' + pictypename[i];
                        }).attr("x", function(d, i) {
                            return x(d[mesuredField]) - Math.abs(typex[i] * scale[i]);
                        }).attr("y", function(d, i) {
                            return y(d[breakdown[0].field]) - Math.abs(typey[i] * scale[i]) + y.bandwidth() / 2 - typesizey[i] * scale[i] / 2;
                        }) //.attr("fill",Color.DEFAULT)
                        //.attr("fill","#96A7CE")   
                        .attr("fill", function(d, i) {
                            if (i < 3) {
                                return _color2.default.HIGHLIGHT;
                            }
                            return _color2.default.DEFAULT;
                        }).attr("fill-opacity", 0.7); //重新绘制text 使icon在画布底层
                    svg.selectAll(".barValue").remove();
                    data.map(function(d) {
                        var barValue = d[mesuredField],
                            barvalueY = y(d[breakdown[0].field]),
                            offsetY = y.bandwidth() / 2;
                        drawBarValue(svg, offsetY, tickFontSize, barValueX, barvalueY, barValue);
                        return d;
                    });
                    var cardWidth = _this2.width();
                    var cardHeight = _this2.height();
                    var a = svg.node().getBBox().width;
                    var b = svg.node().getBBox().height;
                    var c = svg.node().getBBox().x;
                    var e = svg.node().getBBox().y;
                    var transx = -c + cardWidth / 2 - a / 2;
                    var transy = -e + cardHeight / 2 - b / 2;
                    if ((a > cardWidth || b > cardHeight) && width / a < height / b) {
                        svg.attr("transform", 'scale(' + width / a + ')  translate(' + (cardWidth / (2 * width / a) - (a / 2 + c)) + ',' + (cardHeight / (2 * width / a) - (b / 2 + e)) + ') ');
                    } else if ((a > cardWidth || b > cardHeight) && height / b <= width / a) {
                        svg.attr("transform", 'scale(' + height / b + ')  translate(' + (cardWidth / (2 * height / b) - (a / 2 + c)) + ',' + (cardHeight / (2 * height / b) - (b / 2 + e)) + ') ');
                    } else {
                        svg.attr("transform", 'translate(' + transx + ' ,' + transy + ') ');
                    }
                }();
                if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
            } //finally update chart horizental cental
            if (this.style() !== _style2.default.PICTOGRAPH)(0, _updateChartCenter2.default)(svg, this.width(), this.height());
            return svg;
        }
    }, {
        key: 'displayValue',
        value: function displayValue() {
            var factdata = this.factdata();
            var measure = this.measure();
            var subspace = this.subspace();
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize3 = getSizeBySize(chartSize, this.size()),
                hightLightFontSize = _getSizeBySize3.hightLightFontSize,
                margin = _getSizeBySize3.margin,
                width = chartSize.width - margin.left - margin.right,
                height = chartSize.height - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("class", "barG").attr("transform", 'translate(0 ' + margin.top + ')');
            if (this.style() === _style2.default.COMICS) width = 0.8 * width;
            if (this.measure().length > 1) {
                svg.append("rect").attr("width", width).attr("height", height).attr("fill", "none");
                return svg;
            }
            var barValue = void 0;
            if (subspace.length === 0) {
                barValue = d3.sum(factdata, function(d) {
                    return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                });
            } else {
                barValue = factdata[0][measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
            }
            var barHeight = margin.right * 1.2;
            var YField = subspace.length === 0 ? "" : subspace[0].value; //draw bar 
            svg.append("rect").attr("fill", _color2.default.DEFAULT).attr("rx", barHeight / 2).attr("ry", barHeight / 2).attr("x", 0) //inital 
                .attr("y", height / 2) //inital 
                .attr("width", width).attr("height", barHeight); //barValue
            svg.append("g").attr("class", "tooltip").append("text").attr("x", width / 2).attr("y", height / 2 - 40 * chartSize.height / 320).attr("text-anchor", "middle").attr("alignment-baseline", "baseline").attr('font-family', TEXTFONT).attr("font-size", hightLightFontSize).attr("font-weight", 600).attr("fill", _color2.default.HIGHLIGHT).text(barValue).property("_value", barValue); //YField 
            svg.append("text").attr("class", "legend").attr("x", width / 2).attr("y", height / 2 + barHeight + 40 * chartSize.height / 320).text(YField).attr('font-size', hightLightFontSize).attr("font-weight", 600).attr("alignment-baseline", "hanging").attr('font-family', TEXTFONT).attr('fill', _color2.default.HIGHLIGHT).attr('text-anchor', 'middle');
            if (this.style() === _style2.default.COMICS) {
                var svgBBox = svg.node().getBBox();
                var metaphorWidth = width * 0.3,
                    metaphorHeight = 1.18 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor2.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.24;
                    metaphorHeight = 1.18 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.28;
                    metaphorHeight = 1.18 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", svgBBox.width + svgBBox.x + metaphorWidth * 0.06).attr("y", svgBBox.height + svgBBox.y - metaphorHeight * 0.75);
            }
            if (this.style() === _style2.default.PICTOGRAPH) {
                var pictype = measure[0].pictype; /*------------------通过名称找寻icon----------------------------*/
                svg.append("defs").append("g").attr("id", 'pictype' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                var typesizex1 = svg.select('#pictype' + pictype).node().getBBox().width;
                var typesizey1 = svg.select('#pictype' + pictype).node().getBBox().height;
                var typex = svg.select('#pictype' + pictype).node().getBBox().x;
                var typey = svg.select('#pictype' + pictype).node().getBBox().y;
                var scale = Math.sqrt(barHeight * barHeight / (typesizex1 * typesizey1));
                svg.append("defs").append("g").attr("id", "pictype1").append("path").attr("d", _pictogram2.default[pictype]).attr("transform", function() {
                    return 'scale(' + scale + ')';
                });
                var typesizex = svg.select('#pictype1').node().getBBox().width;
                var typesizey = svg.select('#pictype1').node().getBBox().height;
                svg.append("g").append("use").attr("xlink:href", "#pictype1").attr("id", "icontype").attr("x", width / 2 - Math.abs(typex * scale) - typesizex / 2).attr("y", height / 2 - 10 * chartSize.height / 320 - Math.abs(typey * scale) - typesizey).attr("fill", "#96A7CE");
                svg.select(".tooltip").remove();
                svg.append("g").attr("class", "tooltip").append("text").attr("x", width / 2).attr("y", height / 2 - 20 * chartSize.height / 320 - Math.abs(typey * scale) - typesizey).attr("text-anchor", "middle").attr("alignment-baseline", "baseline").attr('font-family', "RobotoMono-SemiBold").attr("font-size", hightLightFontSize).attr("font-weight", 600).attr("fill", _color2.default.HIGHLIGHT).text(barValue).property("_value", barValue);
                var cardWidth = this.width();
                var cardHeight = this.height();
                var a = svg.node().getBBox().width;
                var b = svg.node().getBBox().height;
                var c = svg.node().getBBox().x;
                var e = svg.node().getBBox().y;
                var transx = -c + cardWidth / 2 - a / 2;
                var transy = -e + cardHeight / 2 - b / 2;
                if ((a > cardWidth || b > cardHeight) && width / a < height / b) {
                    svg.attr("transform", 'scale(' + width / a + ')  translate(' + (cardWidth / (2 * width / a) - (a / 2 + c)) + ',' + (cardHeight / (2 * width / a) - (b / 2 + e)) + ') ');
                } else if ((a > cardWidth || b > cardHeight) && height / b <= width / a) {
                    svg.attr("transform", 'scale(' + height / b + ')  translate(' + (cardWidth / (2 * height / b) - (a / 2 + c)) + ',' + (cardHeight / (2 * height / b) - (b / 2 + e)) + ') ');
                } else {
                    svg.attr("transform", 'translate(' + transx + ' ,' + transy + ') ');
                }
            } //finally update chart horizental cental
            if (this.style() !== _style2.default.PICTOGRAPH)(0, _updateChartCenter2.default)(svg, this.width(), this.height());
            return svg;
        }
    }, {
        key: 'displayDifference',
        value: function displayDifference() {
            var _this3 = this;
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize4 = getSizeBySize(chartSize, this.size(), "difference"),
                tickFontSize = _getSizeBySize4.tickFontSize,
                tickStrokeWidth = _getSizeBySize4.tickStrokeWidth,
                margin = _getSizeBySize4.margin,
                hightLightFontSize = _getSizeBySize4.hightLightFontSize,
                offsetY = _getSizeBySize4.offsetY,
                arrowWidth = _getSizeBySize4.arrowWidth,
                width = chartSize.width,
                height = chartSize.height;
            var svg = d3.select(this.container()).append("svg").attr("width", width).attr("height", height).attr("display", "block").attr("class", "barG").append("g");
            if (this.measure().length > 1 || this.focus().length < 2) {
                svg.append("rect").attr("width", width).attr("height", height).attr("fill", "none");
                return svg;
            }
            var focus = this.focus();
            var filteredData = []; //sorted by focus
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                var _loop4 = function _loop4() {
                    var fs = _step.value;
                    _this3.factdata().filter(function(x) {
                        return x[fs.field] === fs.value;
                    })[0] && filteredData.push(_this3.factdata().filter(function(x) {
                        return x[fs.field] === fs.value;
                    })[0]);
                };
                for (var _iterator = focus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop4();
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
            var mesuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
            var breakdown = this.breakdown();
            if (filteredData.length === 1) {
                var fakedata = [];
                fakedata[breakdown[0].field] = this.focus().map(function(d) {
                    return d['value'];
                }).filter(function(f) {
                    return f !== _this3.factdata()[0][breakdown[0].field];
                })[0]; //add fake field and value
                fakedata[mesuredField] = 0;
                filteredData.push(fakedata);
            }
            var data = filteredData;
            if (data.length !== 2) return;
            if (this.style() === _style2.default.COMICS) width = 0.85 * width; //(1)append differenceValue first to measure the height
            var differenceValue = Math.abs(Number(data[0][mesuredField]) - Number(data[1][mesuredField]));
            var meauredTextH = 0; //inital
            svg.append("text").attr("class", "differenceValue").attr("x", this.width() / 2).attr("y", margin.top).attr("dy", "-1.25em").attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('fill', _color2.default.HIGHLIGHT).attr('text-anchor', 'middle').attr('dominant-baseline', 'hanging').text("Difference");
            svg.append("text").attr("class", "differenceValue").attr("x", this.width() / 2).attr("y", margin.top).attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('fill', _color2.default.HIGHLIGHT).attr('text-anchor', 'middle').attr('dominant-baseline', 'hanging').text(differenceValue < 0 ? '-' + (0, _format2.default)(-differenceValue) : (0, _format2.default)(differenceValue));
            meauredTextH = svg.select(".differenceValue").node().getBBox().height + margin.top; // meauredTextH = meauredTextH;
            /***(2) append yAxis**/
            var offsetMarginXAxis = this.size() === "small" ? margin.bottom / 4 : margin.bottom / 2;
            var startY = height - margin.bottom - offsetMarginXAxis,
                endY = meauredTextH + offsetMarginXAxis;
            var YDomain = data.map(function(d) {
                return d[breakdown[0].field];
            });
            initYAixsStyle(startY, endY, YDomain, svg, tickStrokeWidth, tickFontSize, margin, offsetY); //modify y style
            svg.select(".yAxis .domain").remove();
            svg.selectAll(".yAxis .tick line").attr("visibility", "hidden"); /***(3) append xAxis**/
            var measuredYFieldsWidth = svg.select(".yAxis").node().getBBox().width + margin.left;
            var starX = measuredYFieldsWidth,
                endX = width - margin.right,
                xAxisPos = height - margin.bottom;
            var maxX = d3.max(data, function(d) {
                return d[mesuredField];
            });
            initXAxisStyle(starX, endX, maxX, svg, xAxisPos, tickStrokeWidth, tickFontSize); //(4)draw bar 
            var y = d3.scaleBand().domain(YDomain).range([startY, endY]).paddingInner(0.5);
            var x = d3.scaleLinear().domain([0, maxX]).range([starX, endX]);
            svg.selectAll(".bar").data(data).enter().append("rect").attr("class", "bar").attr("fill", _color2.default.DEFAULT).attr("x", starX).attr("y", function(d) {
                return y(d[breakdown[0].field]);
            }).attr("rx", y.bandwidth() / 2).attr("ry", y.bandwidth() / 2).attr("width", function(d) {
                return x(d[mesuredField]) - starX;
            }).attr("height", y.bandwidth()); //(5)draw  bar value
            var barValueX = starX + offsetY; //margin left=offsetY
            data.map(function(d) {
                var barValue = d[mesuredField],
                    barvalueY = y(d[breakdown[0].field]),
                    offsetY = y.bandwidth() / 2;
                drawBarValue(svg, offsetY, tickFontSize, barValueX, barvalueY, barValue);
                return d;
            }); //(6)draw assistant line
            svg.append("g").attr("class", "referenceLs").selectAll("referenceL").data(data).join("line").attr('class', 'referenceL').attr('x1', function(d) {
                return x(d[mesuredField]);
            }).attr("y1", function(d) {
                return y(d[breakdown[0].field]) + y.bandwidth() / 2;
            }).attr('x2', function(d) {
                return x(d[mesuredField]);
            }).attr('y2', xAxisPos).attr('stroke', _color2.default.DASHLINE).attr('stroke-width', tickStrokeWidth).attr('stroke-dasharray', '5,5');
            svg.append("line").attr('class', 'hightlightL').attr('x1', x(data[0][mesuredField])).attr('y1', xAxisPos).attr('x2', x(data[1][mesuredField])).attr('y2', xAxisPos).attr('stroke', _color2.default.HIGHLIGHT).attr('opacity', 1).attr('stroke-width', arrowWidth);
            if (this.style() === _style2.default.COMICS) {
                var barBBox0 = svg.selectAll('.bar').nodes()[0].getBBox(),
                    barBBox1 = svg.selectAll('.bar').nodes()[1].getBBox();
                var metaphorHeight = this.size() === _size2.default.LARGE ? barBBox0.height * 1.6 : barBBox0.height * 2,
                    metaphorWidth = metaphorHeight / 1.2;
                var metaphor0 = svg.append("image").attr('xlink:href', _metaphor4.default);
                var metaphor1 = svg.append("image").attr('xlink:href', _metaphor4.default);
                metaphor0.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", barBBox0.width + barBBox0.x - metaphorWidth * 0.04).attr("y", barBBox0.height / 2 + barBBox0.y - metaphorHeight * 0.4);
                metaphor1.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", barBBox1.width + barBBox1.x - metaphorWidth * 0.04).attr("y", barBBox1.height / 2 + barBBox1.y - metaphorHeight * 0.4);
            }
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret5 = function() {
                    var pictypename = [];
                    var pictype = [];
                    if (breakdown[0].type === "temporal" || breakdown[0].type === "numerical") return {
                        v: void 0
                    };
                    data.forEach(function(ele, i) {
                        pictypename.push(ele[breakdown[0].field]);
                    }); //icon 的位置寻找方式 注意两个数组之间的先后关系
                    pictypename.forEach(function(ele1) {
                        breakdown[0].values.forEach(function(ele, i) {
                            if (ele.attribute === ele1) {
                                pictype.push(ele.pictype);
                            }
                        });
                    }); /*------------------通过名称找寻icon----------------------------*/
                    svg.append("defs").selectAll("g").data(pictype).enter().append("g").attr("id", function(d) {
                        return 'pichdiff' + d;
                    }).append("path").attr("d", function(d) {
                        return _pictogram2.default[d];
                    }); /*-----------------缩放icon---------------------------*/
                    var scale = [];
                    var typesizex1 = [];
                    var typesizey1 = [];
                    var typex1 = [];
                    var typey1 = [];
                    var _loop3 = function _loop3(i) {
                        typesizex1.push(svg.select('#pichdiff' + pictype[i]).node().getBBox().width);
                        typesizey1.push(svg.select('#pichdiff' + pictype[i]).node().getBBox().height);
                        typex1.push(svg.select('#pichdiff' + pictype[i]).node().getBBox().x);
                        typey1.push(svg.select('#pichdiff' + pictype[i]).node().getBBox().y);
                        svg.select('#pichdiff' + pictype[i]).attr("transform", function() {
                            scale.push(Math.sqrt(y.bandwidth() * y.bandwidth() / (typesizey1[i] * typesizex1[i])));
                            return 'scale(' + scale[i] + ')';
                        });
                    };
                    for (var i = 0; i < pictype.length; i++) {
                        _loop3(i);
                    }
                    var typesizex = [];
                    var typesizey = [];
                    var typex = [];
                    var typey = [];
                    for (var i = 0; i < pictype.length; i++) {
                        typesizex.push(svg.select('#pichdiff' + pictype[i]).node().getBBox().width);
                        typesizey.push(svg.select('#pichdiff' + pictype[i]).node().getBBox().height);
                        typex.push(svg.select('#pichdiff' + pictype[i]).node().getBBox().x);
                        typey.push(svg.select('#pichdiff' + pictype[i]).node().getBBox().y);
                    } //添加icon
                    svg.append("g").selectAll("use").data(data).enter().append("use").attr("xlink:href", function(d, i) {
                            return '#pichdiff' + pictype[i];
                        }).attr("id", function(d, i) {
                            return 'icon' + pictypename[i];
                        }).attr("x", function(d, i) {
                            return x(d[mesuredField]) - Math.abs(typex[i] * scale[i]);
                        }).attr("y", function(d, i) {
                            return y(d[breakdown[0].field]) - Math.abs(typey[i] * scale[i]) + y.bandwidth() / 2 - typesizey[i] * scale[i] / 2;
                        }) //.attr("fill",Color.DEFAULT)
                        .attr("fill", "#96A7CE").attr("fill-opacity", 0.7); //重新绘制text 使icon在画布底层
                    svg.selectAll(".barValue").remove();
                    data.map(function(d) {
                        var barValue = d[mesuredField],
                            barvalueY = y(d[breakdown[0].field]),
                            offsetY = y.bandwidth() / 2;
                        drawBarValue(svg, offsetY, tickFontSize, barValueX, barvalueY, barValue);
                        return d;
                    });
                    var cardWidth = _this3.width();
                    var cardHeight = _this3.height();
                    var a = svg.node().getBBox().width;
                    var b = svg.node().getBBox().height;
                    var c = svg.node().getBBox().x;
                    var e = svg.node().getBBox().y;
                    var transx = -c + cardWidth / 2 - a / 2;
                    var transy = -e + cardHeight / 2 - b / 2;
                    if ((a > cardWidth || b > cardHeight) && width / a < height / b) {
                        svg.attr("transform", 'scale(' + width / a + ')  translate(' + (cardWidth / (2 * width / a) - (a / 2 + c)) + ',' + (cardHeight / (2 * width / a) - (b / 2 + e)) + ') ');
                    } else if ((a > cardWidth || b > cardHeight) && height / b <= width / a) {
                        svg.attr("transform", 'scale(' + height / b + ')  translate(' + (cardWidth / (2 * height / b) - (a / 2 + c)) + ',' + (cardHeight / (2 * height / b) - (b / 2 + e)) + ') ');
                    } else {
                        svg.attr("transform", 'translate(' + transx + ' ,' + transy + ') ');
                    }
                }();
                if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
            } //finally update chart horizental cental
            if (this.style() !== _style2.default.PICTOGRAPH)(0, _updateChartCenter2.default)(svg, this.width(), this.height());
            return svg;
        }
    }, {
        key: 'animateTrend',
        value: function animateTrend() {
            var parseTime = function parseTime(date) {
                if (d3.timeParse("%Y-%m-%d")(date)) return d3.timeParse("%Y-%m-%d")(date);
                else if (d3.timeParse("%Y/%m/%d")(date)) return d3.timeParse("%Y/%m/%d")(date);
                else if (d3.timeParse("%Y-%m")(date)) return d3.timeParse("%Y-%m")(date);
                else if (d3.timeParse("%Y/%m")(date)) return d3.timeParse("%Y/%m")(date);
                else if (d3.timeParse("%Y")(date)) return d3.timeParse("%Y")(date);
                else return date;
            };
            var _getSizeBySize5 = getSizeBySize(this, "distribution"),
                tickFontSize = _getSizeBySize5.tickFontSize;
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown(); // let size = this.size();
            var chartWidth = this.width();
            var chartHeight = this.height();
            factData.forEach(function(d) {
                d.value = +d[measure[0].field];
                d.name = d[breakdown[0].field];
                d.date = parseTime(d[breakdown[1].field]);
                d.category = d[breakdown[0].field];
            });
            render(factData, this.container());

            function render(data, container) {
                var thisContainer = container;
                var margin = {
                    top: 16,
                    right: 160,
                    bottom: 6,
                    left: 4
                };
                var categories = Array.from(new Set(data.map(function(d) {
                    return d[breakdown[0].field];
                })));
                var n = categories.length >= 12 ? 12 : categories.length; // 展示bar的数量
                var duration = 250;
                var width = chartWidth;
                var height = chartHeight; //margin.top + barSize * n + margin.bottom;
                var barSize = (chartHeight - margin.top - margin.bottom) / n; // bar的宽度
                var k = 10;
                var names = new Set(data.map(function(d) {
                    return d.name;
                }));
                var arr = d3.nest().key(function(d) {
                    return +d.date;
                }).key(function(d) {
                    return d.name;
                }).rollup(function(_ref) {
                    var _ref2 = _slicedToArray(_ref, 1),
                        d = _ref2[0];
                    return d.value;
                }).entries(data);
                var mapdatevalues = arr.map(function(x) {
                    var valuemap = new Map();
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
                    try {
                        for (var _iterator2 = x.values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var v = _step2.value;
                            valuemap.set(v.key, v.value);
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
                    return [new Date(parseInt(x.key)), valuemap];
                });
                var datevalues = mapdatevalues.sort(function(_ref3, _ref4) {
                    var _ref6 = _slicedToArray(_ref3, 1),
                        a = _ref6[0];
                    var _ref5 = _slicedToArray(_ref4, 1),
                        b = _ref5[0];
                    return d3.ascending(a, b);
                });

                function rank(value) {
                    var data = Array.from(names, function(name) {
                        return {
                            name: name,
                            value: value(name) || 0
                        };
                    });
                    data.sort(function(a, b) {
                        return d3.descending(a.value, b.value);
                    });
                    for (var i = 0; i < data.length; ++i) {
                        data[i].rank = Math.min(n, i);
                    }
                    return data;
                }; // function keyframes() {
                var keyframes = [];
                var ka = void 0,
                    a = void 0,
                    kb = void 0,
                    b = void 0;
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;
                try {
                    for (var _iterator3 = d3.pairs(datevalues)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _step3$value = _slicedToArray(_step3.value, 2);
                        var _step3$value$ = _slicedToArray(_step3$value[0], 2);
                        ka = _step3$value$[0];
                        a = _step3$value$[1];
                        var _step3$value$2 = _slicedToArray(_step3$value[1], 2);
                        kb = _step3$value$2[0];
                        b = _step3$value$2[1];
                        var _loop5 = function _loop5(i) {
                            var t = i / k; /* for clear "the Function declared in a loop contains unsafe references to variable(s) 'a', 'b'" */
                            var a1 = a;
                            var b1 = b;
                            keyframes.push([new Date(ka * (1 - t) + kb * t), rank(function(name) {
                                return a1.get(name) * (1 - t) + b1.get(name) * t;
                            })]);
                        };
                        for (var i = 0; i < k; ++i) {
                            _loop5(i);
                        }
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
                };
                keyframes.push([new Date(kb), rank(function(name) {
                    return b.get(name);
                })]); //     return keyframes;
                // };
                var nameframes = d3.nest().key(function(d) {
                    return d.name;
                }).entries(keyframes.flatMap(function(_ref7) {
                    var _ref8 = _slicedToArray(_ref7, 2),
                        data = _ref8[1];
                    return data;
                }));
                nameframes = nameframes.map(function(x) {
                    return [x.key, x.values];
                });
                var prev = new Map(nameframes.flatMap(function(_ref9) {
                    var _ref10 = _slicedToArray(_ref9, 2),
                        data = _ref10[1];
                    return d3.pairs(data, function(a, b) {
                        return [b, a];
                    });
                }));
                var next = new Map(nameframes.flatMap(function(_ref11) {
                    var _ref12 = _slicedToArray(_ref11, 2),
                        data = _ref12[1];
                    return d3.pairs(data);
                }));
                var y = d3.scaleBand().domain(d3.range(n + 1)).rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)]).padding(0.6);
                var x = d3.scaleLinear([0, 1], [margin.left, width - margin.right]);
                var formatDate = d3.utcFormat("%Y-%m-%d");
                var formatNumber = d3.format(",d");

                function color(d) {
                    var scale = d3.scaleOrdinal(_color2.default.CATEGORICAL); // d3.schemeTableau10
                    if (data.some(function(d) {
                            return d.category !== undefined;
                        })) {
                        var categoryByName = new Map(data.map(function(d) {
                            return [d.name, d.category];
                        }));
                        scale.domain(Array.from(categoryByName.values()));
                        return function(d) {
                            return scale(categoryByName.get(d.name));
                        };
                    }
                    return function(d) {
                        return scale(d.name);
                    };
                };

                function ticker(svg) {
                    var now = svg.append("text").attr("font", 'bold ' + barSize + 'px var(--sans-serif)').attr("font-variant-numeric", "tabular-nums").attr("text-anchor", "end").attr("x", width - 6).attr("y", margin.top + barSize * (n - 0.45)).attr("dy", "0.32em").attr("font-weight", 800).attr("fill", "#cccccc").attr("font-size", tickFontSize * 2 + "px").text(formatDate(keyframes[0][0]));
                    return function(_ref13, transition) {
                        var _ref14 = _slicedToArray(_ref13, 1),
                            date = _ref14[0];
                        transition.end().then(function() {
                            return now.text(formatDate(date));
                        });
                    };
                };

                function axis(svg) {
                    var g = svg.append("g").attr("transform", 'translate(0,' + margin.top + ')');
                    var axisX = d3.axisTop(x).ticks(width / 160).tickSizeOuter(0).tickSizeInner(-barSize * (n + y.padding()));
                    return function(_, transition) {
                        g.transition(transition).call(axisX);
                        g.select(".tick:first-of-type text").remove(); // g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
                        g.selectAll(".tick line").attr("stroke", "white");
                        g.selectAll(".tick:first-of-type line").attr("opacity", 0);
                        g.select(".domain").remove();
                    };
                };

                function textTween(a, b) {
                    var i = d3.interpolateNumber(a, b);
                    return function(t) {
                        this.textContent = formatNumber(i(t));
                    };
                };

                function bars(svg) {
                    var bar = svg.append("g").attr("fill-opacity", 1).selectAll("rect");
                    return function(_ref15, transition) {
                        var _ref16 = _slicedToArray(_ref15, 2),
                            date = _ref16[0],
                            data = _ref16[1];
                        return bar = bar.data(data.slice(0, n), function(d) {
                            return d.name;
                        }).join(function(enter) {
                            return enter.append("rect").attr("fill", color()).attr("height", y.bandwidth()) // .attr("rx", y.bandwidth() / 2)
                                // .attr("ry", y.bandwidth() / 2)
                                .attr("x", x(0)).attr("y", function(d) {
                                    return y((prev.get(d) || d).rank);
                                }).attr("width", function(d) {
                                    return x((prev.get(d) || d).value) - x(0);
                                });
                        }, function(update) {
                            return update;
                        }, function(exit) {
                            return exit.transition(transition).remove().attr("y", function(d) {
                                return y((next.get(d) || d).rank);
                            }).attr("width", function(d) {
                                return x((next.get(d) || d).value) - x(0);
                            });
                        }).call(function(bar) {
                            return bar.transition(transition).attr("y", function(d) {
                                return y(d.rank);
                            }).attr("width", function(d) {
                                return x(d.value) - x(0);
                            });
                        });
                    };
                };

                function labels(svg) {
                    var label = svg.append("g").attr("font", "bold Arial-Regular").attr("font-size", tickFontSize + 'px').attr("font-variant-numeric", "tabular-nums").attr("text-anchor", "start").selectAll("text");
                    return function(_ref17, transition) {
                        var _ref18 = _slicedToArray(_ref17, 2),
                            date = _ref18[0],
                            data = _ref18[1];
                        return label = label.data(data.slice(0, n), function(d) {
                            return d.name;
                        }).join(function(enter) {
                            return enter.append("text").text(function(d) {
                                    return d.name + ": ";
                                }).attr("transform", function(d) {
                                    return 'translate(' + x((prev.get(d) || d).value) + ',' + y((prev.get(d) || d).rank) + ')';
                                }).attr("y", y.bandwidth() / 2).attr("x", 10) // return 20 + (1+d.name.length+parseInt(d.value).toString().length) * 10})
                                .attr("dy", "0.3em") // .text(d => d.name + ":")
                                .attr("font-family", NUMFONT).call(function(text) {
                                        return text.append("tspan").attr("fill-opacity", 0.7).attr("font-weight", "normal");
                                    } // .attr("x", -6)
                                    // .attr("dy", "1.15em")
                                );
                        }, function(update) {
                            return update;
                        }, function(exit) {
                            return exit.transition(transition).remove().attr("transform", function(d) {
                                return 'translate(' + x((next.get(d) || d).value) + ',' + y((next.get(d) || d).rank) + ')';
                            }).call(function(g) {
                                return g.select("tspan").tween("text", function(d) {
                                    return textTween(d.value, (next.get(d) || d).value);
                                });
                            });
                        }).call(function(bar) {
                            return bar.transition(transition).attr("transform", function(d) {
                                return 'translate(' + x(d.value) + ',' + y(d.rank) + ')';
                            }).call(function(g) {
                                return g.select("tspan").tween("text", function(d) {
                                    return textTween((prev.get(d) || d).value, d.value);
                                });
                            });
                        });
                    };
                };
                async function* chart() { // replay;
                    d3.select(thisContainer).selectAll("svg").remove();
                    d3.select(thisContainer).selectAll("p").remove();
                    var svg = d3.select(thisContainer).append("svg").attr("viewBox", [0, 0, width, height]);
                    var updateBars = bars(svg);
                    var updateAxis = axis(svg);
                    var updateLabels = labels(svg);
                    var updateTicker = ticker(svg);
                    yield svg.node();
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = undefined;
                    try {
                        for (var _iterator4 = keyframes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var keyframe = _step4.value;
                            var transition = svg.transition().duration(duration).ease(d3.easeLinear); // Extract the top bar’s value.
                            x.domain([0, keyframe[1][0].value]);
                            updateAxis(keyframe, transition);
                            updateBars(keyframe, transition);
                            updateLabels(keyframe, transition);
                            updateTicker(keyframe, transition); // invalidation.then(() => svg.interrupt());
                            await transition.end();
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                _iterator4.return();
                            }
                        } finally {
                            if (_didIteratorError4) {
                                throw _iteratorError4;
                            }
                        }
                    };
                };
                var c = chart();
                (async function() {
                    for await (var val of c) {
                        console.log(val);
                    }
                })();
            };
        }
    }, {
        key: 'animateDistribution',
        value: function animateDistribution() {
            var svg = this.displayDistribution();
            if (!svg) return;
            var duration = this.duration();
            var rectsLength = svg.selectAll('.bar').nodes().map(function(d) {
                return d.getAttribute('width');
            });
            svg.selectAll('.bar').attr("width", 0).attr("rx", 0).attr("ry", 0);
            svg.selectAll(".yAxis").attr("opacity", 0).transition().duration(duration / 4).attr("opacity", 1);
            svg.selectAll('.bar').attr("width", 0).transition().duration(duration / 4 * 3).delay(duration / 4).attr("width", function(d, i) {
                return rectsLength[i];
            });
            svg.selectAll('.barValue').attr("opacity", 0);
            setTimeout(function() {
                svg.selectAll('.barValue').attr("opacity", 1);
            }, duration / 4);
            svg.selectAll('.barValue').transition().duration(duration / 4 * 3).delay(duration / 4).ease(d3.easeLinear).textTween(function(d) {
                var final = d3.select(this).node().innerHTML.replace(/,/g, '');;
                var i = d3.interpolate(0, final);
                var format = d3.format(",d");
                return function(t) {
                    var num = parseInt(i(t));
                    return format(num);
                };
            });
        }
    }, {
        key: 'animateDifference',
        value: function animateDifference() {
            var svg = this.displayDifference();
            if (!svg) return;
            var originDuration = this.duration();
            var rectsLength = svg.selectAll('.bar').nodes().map(function(d) {
                return d.getAttribute('width');
            });
            svg.selectAll(".xAxis").attr("opacity", 0).transition().duration(originDuration / 5).attr("opacity", 1);
            svg.selectAll(".yAxis").attr("opacity", 0).transition().duration(originDuration / 5).attr("opacity", 1);
            var duration = originDuration / 5 * 4;
            svg.selectAll('.bar').attr("width", 0).attr("rx", 0).attr("ry", 0);
            d3.select(svg.selectAll('.differenceValue').nodes()[0]).remove();
            svg.selectAll('.differenceValue').attr("fill-opacity", 0);
            svg.selectAll('.bar').attr("width", 0).transition().duration(duration / 2).delay(originDuration / 5).attr("width", function(d, i) {
                return rectsLength[i];
            });
            svg.selectAll('.barValue').attr("opacity", 0);
            setTimeout(function() {
                svg.selectAll('.barValue').attr("opacity", 1);
            }, originDuration / 5);
            svg.selectAll('.barValue').transition().duration(duration / 2).delay(originDuration / 5).ease(d3.easeLinear).textTween(function(d) {
                var final = d3.select(this).node().innerHTML.replace(/,/g, '');
                var i = d3.interpolate(0, final);
                var format = d3.format(",d");
                return function(t) {
                    var num = parseInt(i(t));
                    return format(num);
                };
            });
            var referenceLs = svg.selectAll('.referenceL');
            var firstReferenceL = referenceLs.filter(function(d, i) {
                return i === 0;
            });
            var secondReferenceL = referenceLs.filter(function(d, i) {
                return i === 1;
            });
            var firstL = {
                y1: firstReferenceL.attr("y1"),
                y2: firstReferenceL.attr("y2")
            };
            var secondL = {
                y1: secondReferenceL.attr("y1"),
                y2: secondReferenceL.attr("y2")
            };
            firstReferenceL.attr("opacity", 0);
            secondReferenceL.attr("opacity", 0);
            setTimeout(function() {
                firstReferenceL.attr("opacity", 1);
                secondReferenceL.attr("opacity", 1);
                firstReferenceL.attr("y1", firstL.y1).attr("y2", firstL.y1).transition().duration(duration / 3).attr("y1", firstL.y1).attr("y2", firstL.y2);
                secondReferenceL.attr("y1", secondL.y1).attr("y2", secondL.y1).transition().duration(duration / 3).attr("y1", secondL.y1).attr("y2", secondL.y2);
            }, duration / 3 + originDuration / 5);
            svg.selectAll('.hightlightL').attr("opacity", 0);
            svg.selectAll('.tooltip').attr("opacity", 0);
            setTimeout(function() {
                svg.selectAll('.hightlightL').attr("opacity", 0).transition().duration(duration / 3).attr("opacity", 1);
                svg.selectAll('.tooltip').attr("opacity", 0).transition().duration(duration / 3).attr("opacity", 1);
            }, duration / 3 * 2 + originDuration / 5);
            setTimeout(function() {
                svg.selectAll(".differenceValue").transition().duration(duration / 3).attr("fill-opacity", 1);
            }, duration / 3 * 2 + originDuration / 5);
        }
    }, {
        key: 'animateRank',
        value: function animateRank() { // let svg = this.displayRank();
            var subspace = this.subspace();
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize6 = getSizeBySize(chartSize, this.size()),
                tickFontSize = _getSizeBySize6.tickFontSize,
                tickStrokeWidth = _getSizeBySize6.tickStrokeWidth,
                margin = _getSizeBySize6.margin,
                offsetY = _getSizeBySize6.offsetY,
                width = chartSize.width,
                height = chartSize.height;
            var svg = d3.select(this.container()).append("svg").attr("width", width).attr("height", height).attr("display", "block").attr("class", "barG").append("g");
            if (this.style() === _style2.default.COMICS) width = 0.8 * width;
            if (this.measure().length > 1) {
                svg.append("rect").attr("width", width).attr("height", height).attr("fill", "none");
                return svg;
            }
            if (subspace.length > 0) {
                svg.append("text").text(subspace[0].value).attr("font-size", '100').attr('font-family', 'impact').attr("y", margin.top - 50).attr("x", width / 2).attr("fill", _color2.default.DEFAULT).attr("text-anchor", "middle");
                height = height - 140;
            }
            var measure = this.measure();
            var breakdown = this.breakdown();
            var mesuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
            var data = this.factdata().sort(function(a, b) {
                    return b[mesuredField] - a[mesuredField];
                }),
                maxBarNumbers = 5;
            if (this.size() === "large") {
                maxBarNumbers = 10;
            }
            if (data.length > maxBarNumbers) data = data.slice(0, maxBarNumbers); /*****(0)****/ //if same year
            var sameYear = "";
            if (breakdown[0].type === "temporal") {
                try {
                    var year = getSameYear(data.map(function(d) {
                        return d[breakdown[0].field];
                    }));
                    sameYear = year + "/";
                } catch (e) { //keep origin
                }
            }
            var textHeight = 0;
            if (this.size() === _size2.default.LARGE && sameYear !== "" && sameYear !== "false/") {
                var yearText = svg.append("text").text("Year:" + sameYear.replace("/", "")).attr("font-size", '21').attr("font-family", NUMFONT).attr("y", margin.top).attr("x", width / 2).attr("fill", _color2.default.TEXT).attr("text-anchor", "middle");
                textHeight = yearText.node().getBBox().height + 10; //margin
            }
            data = data.map(function(d) {
                d[breakdown[0].field] = d[breakdown[0].field].replace(sameYear, "");
                return d;
            }); /*****(0) the end****/ /***(1) append yAxis**/
            var startY = margin.top + textHeight,
                endY = height - margin.bottom;
            if (subspace.length > 0) {
                startY = margin.top - 20 + textHeight;
            }
            var YDomain = data.map(function(d) {
                return d[breakdown[0].field];
            });
            initYAixsStyle(startY, endY, YDomain, svg, tickStrokeWidth, tickFontSize, margin, offsetY); /***(2) append xAxis**/
            var measuredYFieldsWidth = svg.select(".yAxis").node().getBBox().width + margin.left;
            var starX = measuredYFieldsWidth,
                endX = width - margin.right,
                xAxisPos = height - margin.bottom;
            var maxX = d3.max(data, function(d) {
                return d[mesuredField];
            });
            if (measure[0]['max'] && measure[0].max > maxX) {
                maxX = measure[0].max;
            }
            initXAxisStyle(starX, endX, maxX, svg, xAxisPos, tickStrokeWidth, tickFontSize); //modify x style
            svg.select(".xAxis").remove(); //(3)draw bar 
            var y = d3.scaleBand().domain(YDomain).range([startY, endY]).paddingInner(0.5);
            var x = d3.scaleLinear().domain([0, maxX]).range([starX, endX]);
            svg.selectAll(".bar").data(data).enter().append("rect").lower().attr("class", "bar").attr("fill", function(d, i) {
                if (i < 3) {
                    return _color2.default.HIGHLIGHT;
                }
                return _color2.default.DEFAULT;
            }).attr("x", starX).attr("y", function(d) {
                return y(d[breakdown[0].field]);
            }).attr("rx", y.bandwidth() / 2).attr("ry", y.bandwidth() / 2).attr("width", function(d) {
                return x(d[mesuredField]) - starX;
            }).attr("height", y.bandwidth()); //(4)draw  bar value
            var barValueX = starX + offsetY; //margin left=offsetY
            data.map(function(d) {
                var barValue = d[mesuredField],
                    barvalueY = y(d[breakdown[0].field]),
                    offsetY = y.bandwidth() / 2;
                drawBarValue(svg, offsetY, tickFontSize, barValueX, barvalueY, barValue);
                return d;
            });
            if (this.style() === _style2.default.COMICS) {
                var svgBBox = svg.node().getBBox();
                var metaphorWidth = width * 0.25,
                    metaphorHeight = 1.33 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor8.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.22;
                    metaphorHeight = 1.33 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.26;
                    metaphorHeight = 1.33 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", svgBBox.width + svgBBox.x + metaphorWidth * 0.06).attr("y", svgBBox.height + svgBBox.y - metaphorHeight * 1.1);
            } //finally update chart horizental cental
            (0, _updateChartCenter2.default)(svg, this.width(), this.height() - 20);
            if (subspace.length > 0) {
                (0, _updateChartCenter2.default)(svg, this.width(), this.height() - 20);
            } else {
                (0, _updateChartCenter2.default)(svg, this.width(), this.height());
            }
            if (!svg) return;
            var duration = this.duration();
            var rectsLength = svg.selectAll('.bar').nodes().map(function(d) {
                return d.getAttribute('width');
            });
            svg.selectAll(".yAxis").attr("opacity", 0).transition().duration(duration / 5).attr("opacity", 1);
            svg.selectAll('.bar').attr("width", 0).attr("rx", 0).attr("ry", 0);
            svg.selectAll('.bar').attr("fill", _color2.default.DEFAULT); // svg.selectAll('.barValue')
            //     .attr("fill-opacity", 0)
            svg.selectAll('.bar').attr("width", 0).transition().duration(duration / 5 * 2).delay(duration / 5).attr("width", function(d, i) {
                return rectsLength[i];
            });
            svg.selectAll('.barValue').attr("opacity", 0);
            setTimeout(function() {
                svg.selectAll('.barValue').attr("opacity", 1);
            }, duration / 5);
            svg.selectAll('.barValue').transition().duration(duration / 5 * 2).delay(duration / 5).ease(d3.easeLinear).textTween(function(d) {
                var final = d3.select(this).node().innerHTML.replace(/,/g, '');
                var i = d3.interpolate(0, final);
                var format = d3.format(",d");
                return function(t) {
                    var num = parseInt(i(t));
                    return format(num);
                };
            });
            setTimeout(function() {
                var rank1 = svg.selectAll('.bar').filter(function(d, i) {
                    return i === svg.selectAll('.bar').size() - 1;
                });
                var rank2 = svg.selectAll('.bar').filter(function(d, i) {
                    return i === svg.selectAll('.bar').size() - 2;
                });
                var rank3 = svg.selectAll('.bar').filter(function(d, i) {
                    return i === svg.selectAll('.bar').size() - 3;
                });
                rank1.transition().duration(duration / 5 * 2 / 3).ease(d3.easeLinear).attr("fill", _color2.default.HIGHLIGHT);
                rank2.transition().duration(duration / 5 * 2 / 3).delay(duration / 5 * 2 / 3).ease(d3.easeLinear).attr("fill", _color2.default.HIGHLIGHT);
                rank3.transition().duration(duration / 5 * 2 / 3).delay(duration / 5 * 2 / 3 * 2).ease(d3.easeLinear).attr("fill", _color2.default.HIGHLIGHT);
            }, duration / 5 * 3); // setTimeout(() => {
            // svg.selectAll('.barValue')
            //     .attr("fill-opacity", 0)
            //     .attr("width", 0)
            //     .transition()
            //     .duration(duration / 3)
            //     .attr("fill-opacity", 1)
            // }, duration / 3 * 2);
        }
    }, {
        key: 'animateValue',
        value: function animateValue() {
            var svg = this.displayValue();
            if (!svg) return;
            var duration = this.duration(); /* -------------------------------- init data ------------------------------- */
            var ticks = 10; /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                labelFadeIn: {
                    duration: 4,
                    index: 0
                },
                majorGrow: {
                    duration: 6,
                    index: 1
                }
            };
            var everyTick = duration / ticks; /* ----------------------------- step 0 labelFadeIn ----------------------------- */
            var legend = svg.selectAll(".legend");
            legend.attr("opacity", 0);
            legend.attr("fill", "black");
            legend.transition().duration(everyTick * animation.labelFadeIn.duration).attr("opacity", 1); /* ----------------------------- step 1 majorGrow ----------------------------- */
            var tooltip = svg.selectAll(".tooltip").select("text");
            tooltip.text("0%").attr("opacity", 0);
            var originWidth = svg.selectAll('rect').attr("width");
            svg.selectAll('rect').attr("width", 0).attr("rx", 0).attr("ry", 0);
            setTimeout(function() {
                tooltip.attr("opacity", 1);
                tooltip.transition().duration(everyTick * animation.majorGrow.duration).textTween(function(d) {
                    var final = d3.select(this).property("_value");
                    var i = d3.interpolate(0, final);
                    var numberFormat = d3.format(".0f");
                    return function(t) {
                        var percent = (0, _format2.default)(+numberFormat(i(t)));
                        return percent;
                    };
                });
                svg.selectAll('rect').transition().duration(everyTick * animation.majorGrow.duration).attr("width", originWidth);
            }, everyTick * countTicksBeforeIndex(animation, animation.majorGrow.index));
        }
    }]);
    return HorizentalBarChart;
}(_chart2.default);
/***
 * 设置 yAxis样式并且更新位置
 */
var initYAixsStyle = function initYAixsStyle(starY, endY, YDomain, svg, tickStrokeWidth, tickFontSize, margin, offsetY) { //console.log("initYAxisStyle", starY, starY)
    var y = d3.scaleBand().domain(YDomain).range([starY, endY]).paddingInner(0.5); // add the y Axis
    svg.append("g").attr("class", 'yAxis').call(d3.axisLeft(y).tickSize(tickStrokeWidth * 2).tickPadding(offsetY)).call(function(g) { //y Axis styles
        var YAxislineData = [
            [0, starY],
            [0, endY]
        ];
        var newD = d3.line()(YAxislineData); //生成d
        g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", tickStrokeWidth); // tick style
        g.selectAll('.tick line').attr('stroke', 'black').attr("stroke-width", tickStrokeWidth);
        g.selectAll('.tick text').attr('font-size', tickFontSize).attr('font-family', NUMFONT).attr('fill', 'black').attr('text-anchor', 'end');
    });
    var measuredYFieldsWidth = svg.select(".yAxis").node().getBBox().width + margin.left; //平移y
    svg.select(".yAxis").attr("transform", 'translate(' + measuredYFieldsWidth + ',0)');
};
/***
 * 设置 xAxis样式
 */
var initXAxisStyle = function initXAxisStyle(starX, endX, maxX, svg, xAxisPos, tickStrokeWidth, tickFontSize) { //console.log("initXAxisStyle", starX, endX)
    var x = d3.scaleLinear().domain([0, maxX]).range([starX, endX]); // add the x Axis
    svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + xAxisPos + ')') //动态计算高度后平移会向上平移
        .call(d3.axisTop(x).ticks(4).tickSize(tickStrokeWidth * 2).tickPadding(tickStrokeWidth * 2).tickFormat(function(d) {
            if (d / 1000000 >= 1) {
                d = d / 1000000 + "M";
            } else if (d / 1000 >= 1) {
                d = d / 1000 + "K";
            }
            return d;
        })).call(function(g) { //x Axis style
            var xAxislineData = [
                [starX, 0],
                [endX, 0],
                [endX, -tickStrokeWidth * 2]
            ];
            var newD = d3.line()(xAxislineData); //生成d
            g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", tickStrokeWidth); //tick style
            g.selectAll('.tick line').attr('stroke', 'black').attr("stroke-width", tickStrokeWidth);
            g.selectAll('.tick text').attr('font-size', tickFontSize).attr('font-family', NUMFONT).attr('fill', 'black').attr("dy", "2em").attr('text-anchor', 'middle');
        });
}; /****bar上的值*/
var drawBarValue = function drawBarValue(svg, offsetY, tickFontSize, barValueX, barvalueY, barValue) {
    svg.append("g").append("text").attr("class", "barValue").attr("font-family", NUMFONT).attr("font-size", tickFontSize) // .attr("text-anchor", 'start')
        .attr("dominant-baseline", "middle").attr("y", barvalueY + offsetY).attr("x", barValueX).text(function(d) {
            return (0, _format2.default)(barValue);
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
    return count - 0.5;
};
/*
 *  y最大值向上取整 如y轴的最大数值为6，853，129； 要取到7，000，000
 */ // const getMaxYValue = (factdata, measure) => {
//     let mesuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
//     let maxYValue = d3.max(factdata, d => {
//         return d[mesuredField];
//     })
//     if ((maxYValue / 1000000) >= 1) {
//         maxYValue = Math.ceil(maxYValue / 1000000) * 1000000;
//     } else if ((maxYValue / 1000) >= 1) {
//         maxYValue = Math.ceil(maxYValue / 1000) * 1000;
//     }
//     return maxYValue;
// }
// const getYAxis = (svg, y) => {
//     let yAxis = svg.append("g").attr('class', 'yAxis')
//         .call(d3.axisRight(y));
//     return yAxis
// }
/** 
 * tickFontSize 坐标轴刻度字号
 * tickStrokeWidth 坐标轴刻度宽度
 **/
var getSizeBySize = function getSizeBySize(chartSize, size, factType) {
    var tickFontSize = void 0,
        tickStrokeWidth = void 0,
        hightLightFontSize = void 0,
        arrowWidth = void 0,
        offsetY = void 0,
        bottom = void 0,
        annotationSize = void 0;
    switch (size) {
        case _size2.default.WIDE:
            tickFontSize = 16;
            tickStrokeWidth = 2;
            hightLightFontSize = 26;
            arrowWidth = 4;
            offsetY = 25;
            annotationSize = 15;
            break;
        case _size2.default.MIDDLE:
            tickFontSize = 14;
            tickStrokeWidth = 2;
            hightLightFontSize = 20;
            arrowWidth = 3;
            offsetY = 20;
            annotationSize = 15;
            break;
        case _size2.default.SMALL:
            tickFontSize = 12;
            tickStrokeWidth = 1.5;
            hightLightFontSize = 16;
            arrowWidth = 2;
            offsetY = 10;
            annotationSize = 10;
            break;
        case _size2.default.LARGE:
        default:
            tickFontSize = 20;
            tickStrokeWidth = 3;
            hightLightFontSize = 40;
            arrowWidth = 5;
            offsetY = 35;
            annotationSize = 20;
            break;
    }
    if (factType === "difference") {
        bottom = 150 * chartSize.height / 640;
    } else {
        bottom = 40 * chartSize.height / 640;
    }
    return {
        tickFontSize: tickFontSize,
        tickStrokeWidth: tickStrokeWidth,
        hightLightFontSize: hightLightFontSize,
        arrowWidth: arrowWidth,
        margin: {
            top: 40 * chartSize.width / 640,
            left: 50 * chartSize.width / 640,
            right: 50 * chartSize.width / 640,
            bottom: bottom //默认x轴的高度 
        },
        offsetY: offsetY,
        annotationSize: annotationSize //unsupportedchart中变量与此有关
    };
};
var getSameYear = function getSameYear(array) {
    var temp = getYear(array[0]);
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;
    try {
        for (var _iterator5 = array[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var date = _step5.value;
            if (temp !== getYear(date)) return false;
        }
    } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                _iterator5.return();
            }
        } finally {
            if (_didIteratorError5) {
                throw _iteratorError5;
            }
        }
    }
    return temp;
};
var getYear = function getYear(str) {
    var year = str.split('/')[0];
    if (!isNaN(year) && year.length === 4) { //is number
        return year;
    } else return false;
};
exports.default = HorizentalBarChart;