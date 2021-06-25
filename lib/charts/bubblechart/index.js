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
var _size5 = require('../../visualization/size');
var _size6 = _interopRequireDefault(_size5);
var _style = require('../../visualization/style');
var _style2 = _interopRequireDefault(_style);
var _tooltip = require('../../visualization/tooltip');
var _tooltip2 = _interopRequireDefault(_tooltip);
var _format = require('../../visualization/format');
var _format2 = _interopRequireDefault(_format);
var _pictogram = require('../../visualization/pictogram');
var _pictogram2 = _interopRequireDefault(_pictogram);
var _metaphor = require('../../metaphor/metaphor14.png');
var _metaphor2 = _interopRequireDefault(_metaphor);
var _metaphor3 = require('../../metaphor/metaphor13.png');
var _metaphor4 = _interopRequireDefault(_metaphor3);
var _metaphor22_ = require('../../metaphor/metaphor22_0.png');
var _metaphor22_2 = _interopRequireDefault(_metaphor22_);
var _metaphor5 = require('../../metaphor/metaphor22.png');
var _metaphor6 = _interopRequireDefault(_metaphor5);
var _metaphor7 = require('../../metaphor/metaphor23.png');
var _metaphor8 = _interopRequireDefault(_metaphor7);

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
} // import unsupportedchart from '../../visualization/unsupportedchart';
//trend
//categorization
//outlier
//outlier
//distribution
var fontSize = {
    "small": {
        "axis": 5,
        "label": 10
    },
    "middle": {
        "axis": 6,
        "label": 14
    },
    "wide": {
        "axis": 8,
        "label": 14
    },
    "large": {
        "axis": 12,
        "label": 20
    }
};
var NUMFONT = "Arial-Regular";
var TEXTFONT = "Arial-Bold";
var BubbleChart = function(_Chart) {
    _inherits(BubbleChart, _Chart);

    function BubbleChart() {
        _classCallCheck(this, BubbleChart);
        return _possibleConstructorReturn(this, (BubbleChart.__proto__ || Object.getPrototypeOf(BubbleChart)).apply(this, arguments));
    }
    _createClass(BubbleChart, [{
        key: 'animateDistribution',
        value: function animateDistribution() {
            /* -------------------------------- basic vis ------------------------------- */
            var svg = this.displayDistribution();
            if (!svg) return; /* -------------------------------- init data ------------------------------- */ // let ticks = 10;
            var duration = this.duration(); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */ // let animation = {
            //     majorFadeIn: {
            //         duration: 10,
            //         index: 0
            //     }
            // }
            // let everyTick = duration / ticks;
            /* --------------------------- step 0 majorFadeIn --------------------------- */
            var items = svg.selectAll(".items").selectAll('circle');
            var circleR = items.nodes().map(function(d, i) {
                return Number(d.getAttribute("r"));
            });
            svg.selectAll('circle').attr("r", 0).transition().duration(duration).attr("r", function(d, i) {
                return circleR[i];
            });
            svg.selectAll('.pvalue').attr("opacity", 0); // .transition()
            // .duration(duration)
            // .ease(d3.easeLinear)
            // .textTween(function (d) {
            //     let final = d3.select(this).node().innerHTML.replace(/,/g, '');;
            //     const i = d3.interpolate(0, final);
            //     let format = d3.format(",d")
            //     return function (t) {
            //         var num = parseInt(i(t));
            //         return format(num);
            //     };
            // });
            // items.attr("opacity", 0);
            // items.transition()
            //     .duration(everyTick * animation.majorFadeIn.duration / items.size())
            //     .delay((d, i) => i * (everyTick * animation.majorFadeIn.duration / items.size()))
            //     .attr("opacity", 1);
        }
    }, {
        key: 'animateCategorization',
        value: function animateCategorization() {
            /* -------------------------------- basic vis ------------------------------- */
            var svg = this.displayCategorization();
            if (!svg) return; /* -------------------------------- init data ------------------------------- */
            var ticks = 10;
            var duration = this.duration(); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                majorFadeIn: {
                    duration: 10,
                    index: 0
                }
            };
            var everyTick = duration / ticks; /* --------------------------- step 0 majorFadeIn --------------------------- */
            var items = svg.selectAll(".items");
            items.attr("opacity", 0);
            items.transition().duration(everyTick * animation.majorFadeIn.duration / items.size()).delay(function(d, i) {
                return i * (everyTick * animation.majorFadeIn.duration / items.size());
            }).attr("opacity", 1);
        }
    }, {
        key: 'animateTrend',
        value: function animateTrend() {
            /* -------------------------------- basic vis ------------------------------- */
            var svg = this.displayTrend();
            if (!svg) return; /* -------------------------------- init data ------------------------------- */
            var ticks = 10;
            var duration = this.duration(); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                majorFadeIn: {
                    duration: 10,
                    index: 0
                }
            };
            var everyTick = duration / ticks; /* --------------------------- step 0 majorFadeIn --------------------------- */
            var items = svg.selectAll(".items");
            items.attr("opacity", 0);
            items.transition().duration(everyTick * animation.majorFadeIn.duration / items.size()).delay(function(d, i) {
                return i * (everyTick * animation.majorFadeIn.duration / items.size());
            }).attr("opacity", 1);
        }
    }, {
        key: 'animateExtreme',
        value: function animateExtreme() {
            /* -------------------------------- basic vis ------------------------------- */
            var svg = this.displayExtreme();
            if (!svg) return; /* -------------------------------- init data ------------------------------- */
            var ticks = 10;
            var duration = this.duration();
            var breakdown = this.breakdown();
            var focus = this.focus(); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                majorFadeIn: { // duration: 6,
                    duration: 0,
                    index: 0
                },
                fillColor: {
                    duration: 2,
                    index: 1
                },
                showTooltip: {
                    duration: 2,
                    index: 2
                }
            };
            var everyTick = duration / ticks; /* --------------------------- step 0 majorFadeIn --------------------------- */
            var items = svg.selectAll(".items");
            items.attr("opacity", 0);
            items.selectAll("circle").attr("fill", _color2.default.DEFAULT);
            items.selectAll("text").attr("fill", "black"); // items.transition()
            //     .duration(duration / 2)
            //     .attr("opacity", 1);
            items.transition().duration(everyTick * animation.majorFadeIn.duration / items.size()).delay(function(d, i) {
                return i * (everyTick * animation.majorFadeIn.duration / items.size());
            }).attr("opacity", 1); /* ---------------------------- step 1 fillColor ---------------------------- */ // setTimeout(() => {
            items.filter(function(d) {
                return d[breakdown[0].field] === focus[0].value;
            }).select("circle").transition().duration(duration / 2).attr("fill", _color2.default.HIGHLIGHT);
            items.filter(function(d) {
                return d[breakdown[0].field] === focus[0].value;
            }).select(".labels").transition().duration(duration / 2).attr("fill", _color2.default.ANNOTATION); // }, everyTick * countTicksBeforeIndex(animation, animation.fillColor.index));
            /* --------------------------- step 1 showTooltip --------------------------- */
            var tooltip = svg.selectAll(".tooltip");
            tooltip.attr("opacity", 0);
            setTimeout(function() {
                tooltip.transition().duration(duration / 2).attr("opacity", 1);
            }, duration / 2);
        }
    }, {
        key: 'displayDistribution',
        value: function displayDistribution() {
            if (this.style() === _style2.default.BUSINESS || this.style() === _style2.default.COMICS) {
                var data = this.factdata();
                var measure = this.measure();
                var breakdown = this.breakdown();
                var measureField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field; // set the dimensions and margins of the graph
                // let isMatrix = style.style === 'matrix' ? true : false;
                var isMatrix = true;
                var _getSizeBySize = getSizeBySize(this.size(), "distribution", isMatrix),
                    margin = _getSizeBySize.margin,
                    maxBubbleNum = _getSizeBySize.maxBubbleNum,
                    substringTxtL = _getSizeBySize.substringTxtL,
                    bubbleMT = _getSizeBySize.bubbleMT,
                    width = this.width() - margin.left - margin.right,
                    height = this.height() - margin.top - margin.bottom,
                    font = fontSize[this.size()];
                var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
                if (measure.length > 1) {
                    svg.append("rect").attr("width", width).attr("height", height).attr("fill", "none");
                    return svg;
                }
                if (this.style() === _style2.default.COMICS) width = 0.8 * width;
                data = data.filter(function(d) {
                    return d[measureField] > 0;
                });
                data = data.slice(0, maxBubbleNum); // if (data.length > maxBubbleNum) {
                //     let chartSize = {
                //         width: this.width(),
                //         height: this.height()
                //     }
                //     unsupportedchart(svg, chartSize, annotationSize, this.size());
                //     return svg;
                // }
                //if same year
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
                var contentG = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // let textHeight = 0;
                if (this.size() === _size6.default.LARGE && sameYear !== "" && sameYear !== "false/") { //let yearText = 
                    svg.append("text").attr("class", "sameYear").text("Year:" + sameYear.replace("/", "")).attr("font-size", '21').attr("font-family", NUMFONT).attr("y", 60).attr("x", this.width() / 2).attr("fill", _color2.default.TEXT).attr("text-anchor", "middle").attr('dominant-baseline', 'middle'); //textHeight = yearText.node().getBBox().height+10;//margin
                }
                data = data.map(function(d) {
                    d[breakdown[0].field] = d[breakdown[0].field].replace(sameYear, "");
                    return d;
                });
                var row = void 0,
                    column = void 0;
                var categories = data;
                if (isMatrix) {
                    var n = categories.length;
                    if (n < 6) {
                        row = 1;
                        column = n;
                    } else {
                        var max_sqrt = Math.floor(Math.sqrt(n));
                        var candidate = void 0;
                        if (isPrime(n)) n = n - 1;
                        while (max_sqrt) {
                            if (n % max_sqrt === 0) {
                                candidate = max_sqrt;
                                break;
                            }
                            max_sqrt -= 1;
                        }
                        row = d3.min([candidate, n / candidate]);
                        column = n / row;
                    }
                } else {
                    row = 1;
                    column = categories.length;
                }
                var maxR = d3.min([0.9 * height / (row + 1) / 2, 0.9 * width / (column + 1) / 2]); //Size channels
                var size = d3.scaleLinear().domain([0, d3.max(data, function(d) {
                    return Math.sqrt(d[measureField]);
                })]).range([0, maxR]); // Draw Circles
                var rowTotalWidth = void 0;
                var _that = this;
                if (categories.length % 2 === 0) {
                    rowTotalWidth = 2.4 * maxR * column;
                } else {
                    rowTotalWidth = 2.4 * maxR * (column + 1);
                }
                var PcontentG = contentG.append("g");
                var PcontentG_value = contentG.append("g");
                var proportions = PcontentG.append('g').selectAll('g').data(data).enter().append('g').attr("class", "items").each(function(d, i) {
                    var rowNow = void 0;
                    if (isPrime(categories.length) && i === categories.length - 1) {
                        rowNow = Math.floor((i - 1) / column);
                    } else {
                        rowNow = Math.floor(i / column);
                    }
                    d3.select(this).attr("transform", 'translate(0,' + bubbleMT * rowNow + ')'); //行与行之间的间隔
                });
                var proportions_value = PcontentG_value.append('g').selectAll('g').data(data).enter().append('g').attr("class", "items").each(function(d, i) {
                    var rowNow = void 0;
                    if (isPrime(categories.length) && i === categories.length - 1) {
                        rowNow = Math.floor((i - 1) / column);
                    } else {
                        rowNow = Math.floor(i / column);
                    }
                    d3.select(this).attr("transform", 'translate(0,' + bubbleMT * rowNow + ')'); //行与行之间的间隔
                });
                proportions.append("circle").style('stroke-width', '1').attr("class", "data-item").attr("size", function(d) {
                    return d[measureField];
                }).attr("fill", function(d, i) {
                    return _color2.default.DEFAULT;
                }).attr("r", function(d) {
                    return size(Math.sqrt(d[measureField]));
                }).attr("cx", function(d, i) {
                    if (column === 1) {
                        if (data.length === 2) { //异常处理
                            return i === 0 ? size(Math.sqrt(d[measureField])) : 2.4 * maxR + size(Math.sqrt(d[measureField]));
                        }
                        return (_that.width() - size(Math.sqrt(d[measureField]))) / 2;
                    }
                    if (!isMatrix) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                    } else if (isPrime(categories.length) && Math.floor(i / column) === row - 1) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * Math.floor(i % column);
                    } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * (Math.floor((i - 1) % column) + 1);
                    } else {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                    }
                }).attr("cy", function(d, i) {
                    var startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row - 1)) / 2;
                    if (!isMatrix) {
                        return 1.8 * maxR + (height - 3.6 * maxR) / 2;
                    } else if (isPrime(categories.length) && i === categories.length - 1) {
                        return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor((i - 1) / column);
                    } else {
                        return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor(i / column);
                    }
                }); //value
                proportions_value.append('text').attr("class", "pvalue").attr('x', function(d, i) {
                        if (column === 1) {
                            if (data.length === 2) { //异常处理
                                return i === 0 ? size(Math.sqrt(d[measureField])) : 2.4 * maxR + size(Math.sqrt(d[measureField]));
                            }
                            return (_that.width() - size(Math.sqrt(d[measureField]))) / 2;
                        }
                        if (!isMatrix) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        } else if (isPrime(categories.length) && Math.floor(i / column) === row - 1) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * Math.floor(i % column);
                        } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * (Math.floor((i - 1) % column) + 1);
                        } else {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        }
                    }).attr('y', function(d, i) {
                        var startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row - 1)) / 2;
                        if (!isMatrix) {
                            return 1.8 * maxR + (height - 3.6 * maxR) / 2;
                        } else if (isPrime(categories.length) && i === categories.length - 1) {
                            return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor((i - 1) / column);
                        } else {
                            return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor(i / column);
                        }
                    }).text(function(d) {
                        return (0, _format2.default)(d[measureField]);
                    }) //.attr('fill', 'white')
                    .attr('fill', function(d, i) {
                        return "#000000"; // if (Color.CATEGORICAL[i % 10].length !== 7 || formatNumber(d[measureField]).length > 8) return "#000000"
                        // let { r, g, b } = hexToRGB(Color.CATEGORICAL[i % 10])
                        // if (r * 0.299 + g * 0.587 + b * 0.114 > 186) return "#000000"
                        // else
                        //     return "#ffffff"
                    }).attr('alignment-baseline', 'middle').attr('font-size', font.label * 0.9).attr("font-family", NUMFONT).attr('text-anchor', 'middle'); // proportions_value.each(function (d, i) {
                //     let _g = d3.select(this);
                //     if (_g.selectAll(".pvalue").node().getBBox().width > _g.selectAll("circle").attr("r") * 2) {
                //         _g.selectAll(".pvalue").attr("fill", "#000000")
                //     }
                // })
                //breakdown
                proportions.append('text').attr('x', function(d, i) {
                        if (column === 1) {
                            if (data.length === 2) { //异常处理
                                return i === 0 ? size(Math.sqrt(d[measureField])) : 2.4 * maxR + size(Math.sqrt(d[measureField]));
                            }
                            return (_that.width() - size(Math.sqrt(d[measureField]))) / 2;
                        }
                        if (!isMatrix) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        } else if (isPrime(categories.length) && Math.floor(i / column) === row - 1) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * Math.floor(i % column);
                        } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * (Math.floor((i - 1) % column) + 1);
                        } else {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        }
                    }).attr('y', function(d, i) {
                        var startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row - 1)) / 2;
                        if (!isMatrix) {
                            return 1.8 * maxR + (height - 3.6 * maxR) / 2 + 1.1 * maxR;
                        } else if (isPrime(categories.length) && i === categories.length - 1) {
                            return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor((i - 1) / column) + 1.1 * maxR;
                        } else {
                            return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor(i / column) + 1.1 * maxR;
                        }
                    }).text(function(d) {
                        var text = d[breakdown[0].field];
                        return text.length > substringTxtL ? text.substring(0, substringTxtL - 2) + "..." : text;
                    }).attr('fill', 'black') //.attr('font-size', d3.min([height, width]) * 0.045)
                    .attr('font-size', font.label).attr("font-family", NUMFONT).attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging');
                if (this.style() === _style2.default.COMICS) {
                    var metaphorHeight = this.size() === _size6.default.LARGE ? 3.4 * maxR : 3.2 * maxR,
                        metaphorWidth = metaphorHeight / 1.20;
                    var metaphor = contentG.append("image").attr('xlink:href', _metaphor8.default);
                    var contentBBox = contentG.select('g').node().getBBox();
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", contentBBox.width + metaphorWidth * 0.1).attr("y", contentBBox.height + contentBBox.y - metaphorHeight * 1);
                }
                var _h = PcontentG.node().getBBox().height,
                    _w = PcontentG.node().getBBox().width;
                var marginTop = (this.height() - _h) / 2 - PcontentG.node().getBBox().y,
                    marginLeft = (this.width() - _w) / 2 - PcontentG.node().getBBox().x;
                contentG.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
                return svg;
            }
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _data = this.factdata();
                var _measure = this.measure();
                var _breakdown = this.breakdown();
                var pictype = _measure[0].pictype;
                var _measureField = _measure[0].aggregate === "count" ? "COUNT" : _measure[0].field; // set the dimensions and margins of the graph
                // let isMatrix = style.style === 'matrix' ? true : false;
                var _isMatrix = true;
                var _getSizeBySize2 = getSizeBySize(this.size(), "distribution", _isMatrix),
                    _margin = _getSizeBySize2.margin,
                    _maxBubbleNum = _getSizeBySize2.maxBubbleNum,
                    _substringTxtL = _getSizeBySize2.substringTxtL,
                    _bubbleMT = _getSizeBySize2.bubbleMT,
                    _width = this.width() - _margin.left - _margin.right,
                    _height = this.height() - _margin.top - _margin.bottom,
                    _font = fontSize[this.size()];
                var _svg = d3.select(this.container()).append("svg").attr("width", _width + _margin.left + _margin.right).attr("height", _height + _margin.top + _margin.bottom);
                if (_measure.length > 1) {
                    _svg.append("rect").attr("width", _width).attr("height", _height).attr("fill", "none");
                    return _svg;
                }
                _data = _data.filter(function(d) {
                    return d[_measureField] > 0;
                });
                _data = _data.slice(0, _maxBubbleNum);
                var _contentG = _svg.append("g").attr("transform", "translate(" + _margin.left + "," + _margin.top + ")"); //气泡布局处理
                var _row = void 0,
                    _column = void 0;
                var _categories = _data;
                if (_isMatrix) {
                    var _n = _categories.length;
                    var _max_sqrt = Math.floor(Math.sqrt(_n));
                    var _candidate = void 0;
                    if (isPrime(_n)) _n = _n - 1;
                    while (_max_sqrt) {
                        if (_n % _max_sqrt === 0) {
                            _candidate = _max_sqrt;
                            break;
                        }
                        _max_sqrt -= 1;
                    }
                    _row = d3.min([_candidate, _n / _candidate]);
                    _column = _n / _row;
                } else {
                    _row = 1;
                    _column = _categories.length;
                }
                var _maxR = d3.min([0.9 * _height / (_row + 1) / 2, 0.9 * _width / (_column + 1) / 2]); /*------------------通过名称找寻icon----------------------------*/
                _svg.append("defs").append("g").attr("id", 'pictype' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                var typesizex1 = _svg.select('#pictype' + pictype).node().getBBox().width;
                var typesizey1 = _svg.select('#pictype' + pictype).node().getBBox().height;
                var typex = _svg.select('#pictype' + pictype).node().getBBox().x;
                var typey = _svg.select('#pictype' + pictype).node().getBBox().y;
                var area1 = typesizex1 * typesizey1;
                var area2 = _maxR * _maxR * Math.PI;
                var scaleorign = Math.sqrt(area2 / area1);
                var scale1 = []; //Size channels
                var _size = d3.scaleLinear().domain([0, d3.max(_data, function(d) {
                    return Math.sqrt(d[_measureField]);
                })]).range([0, scaleorign]); //Icon 进行缩放
                _data.forEach(function(item, index) {
                    scale1.push(_size(Math.sqrt(item[_measureField])));
                    _svg.append("defs").append("g").attr("id", 'pictypecate' + index).append("path").attr("d", _pictogram2.default[pictype]).attr("transform", function() {
                        return 'scale(' + scale1[index] + ')';
                    });
                }); // Draw Icon
                var _rowTotalWidth = void 0;
                var _that2 = this;
                if (_categories.length % 2 === 0) {
                    _rowTotalWidth = 2.4 * _maxR * _column;
                } else {
                    _rowTotalWidth = 2.4 * _maxR * (_column + 1);
                }
                var _proportions = _contentG.append('g').selectAll('g').data(_data).enter().append('g').attr("class", "items").each(function(d, i) {
                    var rowNow = void 0;
                    if (isPrime(_categories.length) && i === _categories.length - 1) {
                        rowNow = Math.floor((i - 1) / _column);
                    } else {
                        rowNow = Math.floor(i / _column);
                    }
                    d3.select(this).attr("transform", 'translate(0,' + _bubbleMT * rowNow + ')'); //行与行之间的间隔
                });
                _proportions.append("use").attr("xlink:href", function(d, i) {
                        return '#pictypecate' + i;
                    }).attr("id", function(d, i) {
                        return "icontype" + i;
                    }).attr("class", "data-item") // .attr("fill", (d, i) => {
                    //     return Color.CATEGORICAL[i % 10]
                    // })
                    .attr("fill", _color2.default.DEFAULT).attr("x", function(d, i) {
                        if (_column === 1) {
                            if (_data.length === 2) { //异常处理
                                return i === 0 ? _size(Math.sqrt(d[_measureField])) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]) : 2.4 * _maxR + _size(Math.sqrt(d[_measureField])) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                            }
                            return (_that2.width() - _size(Math.sqrt(d[_measureField]))) / 2 - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                        }
                        if (!_isMatrix) {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / (_column - 1) * Math.floor(i % _column) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                        } else if (isPrime(_categories.length) && Math.floor(i / _column) === _row - 1) {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / _column * Math.floor(i % _column) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                        } else if (isPrime(_categories.length) && Math.floor(i / _column) === _row) {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / _column * (Math.floor((i - 1) % _column) + 1) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                        } else {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / (_column - 1) * Math.floor(i % _column) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                        }
                    }).attr("y", function(d, i) {
                        var startPoint = (_height - 3.6 * _maxR) / (_row - 1) <= 2.5 * _maxR ? 1.8 * _maxR : (_height - 2.5 * _maxR * (_row - 1)) / 2;
                        if (!_isMatrix) {
                            return 1.8 * _maxR + (_height - 3.6 * _maxR) / 2 - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                        } else if (isPrime(_categories.length) && i === _categories.length - 1) {
                            return startPoint + d3.min([(_height - 3.6 * _maxR) / (_row - 1), 2.5 * _maxR]) * Math.floor((i - 1) / _column) - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                        } else {
                            return startPoint + d3.min([(_height - 3.6 * _maxR) / (_row - 1), 2.5 * _maxR]) * Math.floor(i / _column) - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                        }
                    }); //value
                _proportions.append('text').attr('x', function(d, i) {
                        if (_column === 1) {
                            if (_data.length === 2) { //异常处理
                                return i === 0 ? _size(Math.sqrt(d[_measureField])) : 2.4 * _maxR + _size(Math.sqrt(d[_measureField]));
                            }
                            return (_that2.width() - _size(Math.sqrt(d[_measureField]))) / 2;
                        }
                        if (!_isMatrix) {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / (_column - 1) * Math.floor(i % _column);
                        } else if (isPrime(_categories.length) && Math.floor(i / _column) === _row - 1) {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / _column * Math.floor(i % _column);
                        } else if (isPrime(_categories.length) && Math.floor(i / _column) === _row) {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / _column * (Math.floor((i - 1) % _column) + 1);
                        } else {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / (_column - 1) * Math.floor(i % _column);
                        }
                    }).attr('y', function(d, i) {
                        var startPoint = (_height - 3.6 * _maxR) / (_row - 1) <= 2.5 * _maxR ? 1.8 * _maxR : (_height - 2.5 * _maxR * (_row - 1)) / 2;
                        if (!_isMatrix) {
                            return 1.8 * _maxR + (_height - 3.6 * _maxR) / 2;
                        } else if (isPrime(_categories.length) && i === _categories.length - 1) {
                            return startPoint + d3.min([(_height - 3.6 * _maxR) / (_row - 1), 2.5 * _maxR]) * Math.floor((i - 1) / _column);
                        } else {
                            return startPoint + d3.min([(_height - 3.6 * _maxR) / (_row - 1), 2.5 * _maxR]) * Math.floor(i / _column);
                        }
                    }).text(function(d) {
                        return (0, _format2.default)(d[_measureField]);
                    }) //.attr('fill', 'white')
                    .attr('fill', function(d, i) {
                        return "#000000"; // if (Color.CATEGORICAL[i % 10].length !== 7 || formatNumber(d[measureField]).length > 8) return "#000000"
                        // let { r, g, b } = hexToRGB(Color.CATEGORICAL[i % 10])
                        // if (r * 0.299 + g * 0.587 + b * 0.114 > 186) return "#000000"
                        // else
                        //     return "#ffffff"
                    }).attr('alignment-baseline', 'middle').attr('font-size', _font.label * 0.9).attr("font-family", NUMFONT).attr('text-anchor', 'middle'); //breakdown
                _proportions.append('text').attr('x', function(d, i) {
                        if (_column === 1) {
                            if (_data.length === 2) { //异常处理
                                return i === 0 ? _size(Math.sqrt(d[_measureField])) : 2.4 * _maxR + _size(Math.sqrt(d[_measureField]));
                            }
                            return (_that2.width() - _size(Math.sqrt(d[_measureField]))) / 2;
                        }
                        if (!_isMatrix) {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / (_column - 1) * Math.floor(i % _column);
                        } else if (isPrime(_categories.length) && Math.floor(i / _column) === _row - 1) {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / _column * Math.floor(i % _column);
                        } else if (isPrime(_categories.length) && Math.floor(i / _column) === _row) {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / _column * (Math.floor((i - 1) % _column) + 1);
                        } else {
                            return 1.2 * _maxR + (_rowTotalWidth - 2.4 * _maxR) / (_column - 1) * Math.floor(i % _column);
                        }
                    }).attr('y', function(d, i) {
                        var startPoint = (_height - 3.6 * _maxR) / (_row - 1) <= 2.5 * _maxR ? 1.8 * _maxR : (_height - 2.5 * _maxR * (_row - 1)) / 2;
                        if (!_isMatrix) {
                            return 1.8 * _maxR + (_height - 3.6 * _maxR) / 2 + 1.1 * _maxR;
                        } else if (isPrime(_categories.length) && i === _categories.length - 1) {
                            return startPoint + d3.min([(_height - 3.6 * _maxR) / (_row - 1), 2.5 * _maxR]) * Math.floor((i - 1) / _column) + 1.1 * _maxR;
                        } else {
                            return startPoint + d3.min([(_height - 3.6 * _maxR) / (_row - 1), 2.5 * _maxR]) * Math.floor(i / _column) + 1.1 * _maxR;
                        }
                    }).text(function(d) {
                        var text = d[_breakdown[0].field];
                        return text.length > _substringTxtL ? text.substring(0, _substringTxtL - 2) + "..." : text;
                    }).attr('fill', 'black') //.attr('font-size', d3.min([height, width]) * 0.045)
                    .attr('font-size', _font.label).attr("font-family", NUMFONT).attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging');
                var _h2 = _contentG.node().getBBox().height,
                    _w2 = _contentG.node().getBBox().width;
                var _marginTop = (this.height() - _h2) / 2 - _contentG.node().getBBox().y,
                    _marginLeft = (this.width() - _w2) / 2 - _contentG.node().getBBox().x;
                _contentG.attr("transform", "translate(" + _marginLeft + "," + _marginTop + ")");
                return _svg;
            }
        }
    }, {
        key: 'displayTrend',
        value: function displayTrend() {
            if (this.style() === _style2.default.BUSINESS || this.style() === _style2.default.COMICS) {
                var data = this.factdata();
                var measure = this.measure();
                var breakdown = this.breakdown();
                var measureField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field; // set the dimensions and margins of the graph
                // let isMatrix = style.style === 'matrix' ? true : false;
                var isMatrix = true;
                var _getSizeBySize3 = getSizeBySize(this.size(), "trend", isMatrix),
                    margin = _getSizeBySize3.margin,
                    maxBubbleNum = _getSizeBySize3.maxBubbleNum,
                    substringTxtL = _getSizeBySize3.substringTxtL,
                    bubbleMT = _getSizeBySize3.bubbleMT,
                    width = this.width() - margin.left - margin.right,
                    height = this.height() - margin.top - margin.bottom,
                    font = fontSize[this.size()];
                var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
                if (this.style() === _style2.default.COMICS) width = 0.8 * width;
                if (measure.length > 1) {
                    svg.append("rect").attr("width", width).attr("height", height).attr("fill", "none");
                    return svg;
                }
                data = data.filter(function(d) {
                    return d[measureField] > 0;
                });
                data = data.slice(0, maxBubbleNum); // if (data.length > maxBubbleNum) {
                //     let chartSize = {
                //         width: this.width(),
                //         height: this.height()
                //     }
                //     unsupportedchart(svg, chartSize, annotationSize, this.size());
                //     return svg;
                // }
                // console.log("data", data)
                //if same year
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
                var contentG = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // let textHeight = 0;
                if (this.size() === _size6.default.LARGE && sameYear !== "" && sameYear !== "false/") { //let yearText = 
                    svg.append("text").attr("class", "sameYear").text("Year:" + sameYear.replace("/", "")).attr("font-size", '21').attr("font-family", NUMFONT).attr("y", 60).attr("x", this.width() / 2).attr("fill", _color2.default.TEXT).attr("text-anchor", "middle").attr('dominant-baseline', 'middle'); //textHeight = yearText.node().getBBox().height+10;//margin
                }
                data = data.map(function(d) {
                    d[breakdown[0].field] = d[breakdown[0].field].replace(sameYear, "");
                    return d;
                });
                var row = void 0,
                    column = void 0;
                var categories = data;
                if (isMatrix) {
                    var n = categories.length;
                    if (n < 6) {
                        row = 1;
                        column = n;
                    } else {
                        var max_sqrt = Math.floor(Math.sqrt(n));
                        var candidate = void 0;
                        if (isPrime(n)) n = n - 1;
                        while (max_sqrt) {
                            if (n % max_sqrt === 0) {
                                candidate = max_sqrt;
                                break;
                            }
                            max_sqrt -= 1;
                        }
                        row = d3.min([candidate, n / candidate]);
                        column = n / row;
                    }
                } else {
                    row = 1;
                    column = categories.length;
                }
                var maxR = d3.min([0.9 * height / (row + 1) / 2, 0.9 * width / (column + 1) / 2]); //Size channels
                var size = d3.scaleLinear().domain([0, d3.max(data, function(d) {
                    return Math.sqrt(d[measureField]);
                })]).range([0, maxR]); // Draw Circles  
                var rowTotalWidth = void 0;
                var _that = this;
                if (categories.length % 2 === 0) {
                    rowTotalWidth = 2.4 * maxR * column;
                } else {
                    rowTotalWidth = 2.4 * maxR * (column + 1);
                }
                var proportions = contentG.append('g').selectAll('g').data(data).enter() // .append('g')
                    .append('g').attr("class", "items").each(function(d, i) {
                        var rowNow = void 0;
                        if (isPrime(categories.length) && i === categories.length - 1) {
                            rowNow = Math.floor((i - 1) / column);
                        } else {
                            rowNow = Math.floor(i / column);
                        }
                        d3.select(this).attr("transform", 'translate(0,' + bubbleMT * rowNow + ')'); //行与行之间的间隔
                    });
                proportions.append("circle").style('stroke-width', '1').attr("class", "data-item").attr("size", function(d) {
                    return d[measureField];
                }).attr("fill", _color2.default.DEFAULT).attr("r", function(d) {
                    return size(Math.sqrt(d[measureField]));
                }).attr("cx", function(d, i) {
                    if (column === 1) {
                        if (data.length === 2) { //异常处理
                            return i === 0 ? size(Math.sqrt(d[measureField])) : 2.4 * maxR + size(Math.sqrt(d[measureField]));
                        }
                        return (_that.width() - size(Math.sqrt(d[measureField]))) / 2;
                    }
                    if (!isMatrix) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                    } else if (isPrime(categories.length) && Math.floor(i / column) === row - 1) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * Math.floor(i % column);
                    } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * (Math.floor((i - 1) % column) + 1);
                    } else {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                    }
                }).attr("cy", function(d, i) {
                    var startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row - 1)) / 2;
                    if (!isMatrix) {
                        return 1.8 * maxR + (height - 3.6 * maxR) / 2;
                    } else if (isPrime(categories.length) && i === categories.length - 1) {
                        return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor((i - 1) / column);
                    } else {
                        return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor(i / column);
                    }
                }); //breakdown
                proportions.append('text').attr('x', function(d, i) {
                        if (column === 1) {
                            if (data.length === 2) { //异常处理
                                return i === 0 ? size(Math.sqrt(d[measureField])) : 2.4 * maxR + size(Math.sqrt(d[measureField]));
                            }
                            return (_that.width() - size(Math.sqrt(d[measureField]))) / 2;
                        }
                        if (!isMatrix) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        } else if (isPrime(categories.length) && Math.floor(i / column) === row - 1) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * Math.floor(i % column);
                        } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * (Math.floor((i - 1) % column) + 1);
                        } else {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        }
                    }).attr('y', function(d, i) {
                        var startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row - 1)) / 2;
                        if (!isMatrix) {
                            return 1.8 * maxR + (height - 3.6 * maxR) / 2 + 1.1 * maxR;
                        } else if (isPrime(categories.length) && i === categories.length - 1) {
                            return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor((i - 1) / column) + 1.1 * maxR;
                        } else {
                            return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor(i / column) + 1.1 * maxR;
                        }
                    }).text(function(d) {
                        var text = d[breakdown[0].field];
                        return text.length > substringTxtL ? text.substring(0, substringTxtL - 2) + "..." : text;
                    }).attr('fill', 'black') //.attr('font-size', d3.min([height, width]) * 0.045)
                    .attr('font-size', font.label).attr("font-family", NUMFONT).attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging');
                if (this.style() === _style2.default.COMICS) {
                    var metaphorHeight = this.size() === _size6.default.LARGE ? 2.5 * maxR : 3 * maxR,
                        metaphorWidth = metaphorHeight / 1.22;
                    var metaphor = contentG.append("image").attr('xlink:href', _metaphor2.default);
                    var contentBBox = contentG.select('g').node().getBBox();
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", contentBBox.x - metaphorWidth * 1.1).attr("y", contentBBox.height + contentBBox.y - metaphorHeight * 1.05);
                }
                var _h = contentG.node().getBBox().height,
                    _w = contentG.node().getBBox().width;
                var marginTop = (this.height() - _h) / 2 - contentG.node().getBBox().y,
                    marginLeft = (this.width() - _w) / 2 - contentG.node().getBBox().x;
                contentG.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
                return svg;
            }
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _data2 = this.factdata();
                var _measure2 = this.measure();
                var _breakdown2 = this.breakdown();
                var pictype = _measure2[0].pictype;
                var _measureField2 = _measure2[0].aggregate === "count" ? "COUNT" : _measure2[0].field; // set the dimensions and margins of the graph
                // let isMatrix = style.style === 'matrix' ? true : false;
                var _isMatrix2 = true;
                var _getSizeBySize4 = getSizeBySize(this.size(), "trend", _isMatrix2),
                    _margin2 = _getSizeBySize4.margin,
                    _maxBubbleNum2 = _getSizeBySize4.maxBubbleNum,
                    _substringTxtL2 = _getSizeBySize4.substringTxtL,
                    _bubbleMT2 = _getSizeBySize4.bubbleMT,
                    _width2 = this.width() - _margin2.left - _margin2.right,
                    _height2 = this.height() - _margin2.top - _margin2.bottom,
                    _font2 = fontSize[this.size()];
                var _svg2 = d3.select(this.container()).append("svg").attr("width", _width2 + _margin2.left + _margin2.right).attr("height", _height2 + _margin2.top + _margin2.bottom);
                if (_measure2.length > 1) {
                    _svg2.append("rect").attr("width", _width2).attr("height", _height2).attr("fill", "none");
                    return _svg2;
                }
                _data2 = _data2.filter(function(d) {
                    return d[_measureField2] > 0;
                });
                _data2 = _data2.slice(0, _maxBubbleNum2);
                var _contentG2 = _svg2.append("g").attr("transform", "translate(" + _margin2.left + "," + _margin2.top + ")");
                var _row2 = void 0,
                    _column2 = void 0;
                var _categories2 = _data2;
                if (_isMatrix2) {
                    var _n2 = _categories2.length;
                    var _max_sqrt2 = Math.floor(Math.sqrt(_n2));
                    var _candidate2 = void 0;
                    if (isPrime(_n2)) _n2 = _n2 - 1;
                    while (_max_sqrt2) {
                        if (_n2 % _max_sqrt2 === 0) {
                            _candidate2 = _max_sqrt2;
                            break;
                        }
                        _max_sqrt2 -= 1;
                    }
                    _row2 = d3.min([_candidate2, _n2 / _candidate2]);
                    _column2 = _n2 / _row2;
                } else {
                    _row2 = 1;
                    _column2 = _categories2.length;
                }
                var _maxR2 = d3.min([0.9 * _height2 / (_row2 + 1) / 2, 0.9 * _width2 / (_column2 + 1) / 2]); /*------------------通过名称找寻icon----------------------------*/
                _svg2.append("defs").append("g").attr("id", 'pictype' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                var typesizex1 = _svg2.select('#pictype' + pictype).node().getBBox().width;
                var typesizey1 = _svg2.select('#pictype' + pictype).node().getBBox().height;
                var typex = _svg2.select('#pictype' + pictype).node().getBBox().x;
                var typey = _svg2.select('#pictype' + pictype).node().getBBox().y;
                var area1 = typesizex1 * typesizey1;
                var area2 = _maxR2 * _maxR2 * Math.PI;
                var scaleorign = Math.sqrt(area2 / area1);
                var scale1 = []; //Size channels
                var _size2 = d3.scaleLinear().domain([0, d3.max(_data2, function(d) {
                    return Math.sqrt(d[_measureField2]);
                })]).range([0, scaleorign]); //Icon 进行缩放
                _data2.forEach(function(item, index) {
                    scale1.push(_size2(Math.sqrt(item[_measureField2])));
                    _svg2.append("defs").append("g").attr("id", 'pictypecatetr' + index).append("path").attr("d", _pictogram2.default[pictype]).attr("transform", function() {
                        return 'scale(' + scale1[index] + ')';
                    });
                }); // Draw Icons  
                var _rowTotalWidth2 = void 0;
                var _that3 = this;
                if (_categories2.length % 2 === 0) {
                    _rowTotalWidth2 = 2.4 * _maxR2 * _column2;
                } else {
                    _rowTotalWidth2 = 2.4 * _maxR2 * (_column2 + 1);
                }
                var _proportions2 = _contentG2.append('g').selectAll('g').data(_data2).enter() // .append('g')
                    .append('g').attr("class", "items").each(function(d, i) {
                        var rowNow = void 0;
                        if (isPrime(_categories2.length) && i === _categories2.length - 1) {
                            rowNow = Math.floor((i - 1) / _column2);
                        } else {
                            rowNow = Math.floor(i / _column2);
                        }
                        d3.select(this).attr("transform", 'translate(0,' + _bubbleMT2 * rowNow + ')'); //行与行之间的间隔
                    });
                _proportions2.append("use").attr("xlink:href", function(d, i) {
                    return '#pictypecatetr' + i;
                }).attr("id", function(d, i) {
                    return "icontype" + i;
                }).attr("class", "data-item").attr("fill", _color2.default.DEFAULT).attr("x", function(d, i) {
                    if (_column2 === 1) {
                        if (_data2.length === 2) { //异常处理
                            return i === 0 ? _size2(Math.sqrt(d[_measureField2])) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]) : 2.4 * _maxR2 + _size2(Math.sqrt(d[_measureField2])) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                        }
                        return (_that3.width() - _size2(Math.sqrt(d[_measureField2]))) / 2 - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    }
                    if (!_isMatrix2) {
                        return 1.2 * _maxR2 + (_rowTotalWidth2 - 2.4 * _maxR2) / (_column2 - 1) * Math.floor(i % _column2) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    } else if (isPrime(_categories2.length) && Math.floor(i / _column2) === _row2 - 1) {
                        return 1.2 * _maxR2 + (_rowTotalWidth2 - 2.4 * _maxR2) / _column2 * Math.floor(i % _column2) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    } else if (isPrime(_categories2.length) && Math.floor(i / _column2) === _row2) {
                        return 1.2 * _maxR2 + (_rowTotalWidth2 - 2.4 * _maxR2) / _column2 * (Math.floor((i - 1) % _column2) + 1) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    } else {
                        return 1.2 * _maxR2 + (_rowTotalWidth2 - 2.4 * _maxR2) / (_column2 - 1) * Math.floor(i % _column2) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    }
                }).attr("y", function(d, i) {
                    var startPoint = (_height2 - 3.6 * _maxR2) / (_row2 - 1) <= 2.5 * _maxR2 ? 1.8 * _maxR2 : (_height2 - 2.5 * _maxR2 * (_row2 - 1)) / 2;
                    if (!_isMatrix2) {
                        return 1.8 * _maxR2 + (_height2 - 3.6 * _maxR2) / 2 - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                    } else if (isPrime(_categories2.length) && i === _categories2.length - 1) {
                        return startPoint + d3.min([(_height2 - 3.6 * _maxR2) / (_row2 - 1), 2.5 * _maxR2]) * Math.floor((i - 1) / _column2) - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                    } else {
                        return startPoint + d3.min([(_height2 - 3.6 * _maxR2) / (_row2 - 1), 2.5 * _maxR2]) * Math.floor(i / _column2) - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                    }
                }); //breakdown
                _proportions2.append('text').attr('x', function(d, i) {
                        if (_column2 === 1) {
                            if (_data2.length === 2) { //异常处理
                                return i === 0 ? _size2(Math.sqrt(d[_measureField2])) : 2.4 * _maxR2 + _size2(Math.sqrt(d[_measureField2]));
                            }
                            return (_that3.width() - _size2(Math.sqrt(d[_measureField2]))) / 2;
                        }
                        if (!_isMatrix2) {
                            return 1.2 * _maxR2 + (_rowTotalWidth2 - 2.4 * _maxR2) / (_column2 - 1) * Math.floor(i % _column2);
                        } else if (isPrime(_categories2.length) && Math.floor(i / _column2) === _row2 - 1) {
                            return 1.2 * _maxR2 + (_rowTotalWidth2 - 2.4 * _maxR2) / _column2 * Math.floor(i % _column2);
                        } else if (isPrime(_categories2.length) && Math.floor(i / _column2) === _row2) {
                            return 1.2 * _maxR2 + (_rowTotalWidth2 - 2.4 * _maxR2) / _column2 * (Math.floor((i - 1) % _column2) + 1);
                        } else {
                            return 1.2 * _maxR2 + (_rowTotalWidth2 - 2.4 * _maxR2) / (_column2 - 1) * Math.floor(i % _column2);
                        }
                    }).attr('y', function(d, i) {
                        var startPoint = (_height2 - 3.6 * _maxR2) / (_row2 - 1) <= 2.5 * _maxR2 ? 1.8 * _maxR2 : (_height2 - 2.5 * _maxR2 * (_row2 - 1)) / 2;
                        if (!_isMatrix2) {
                            return 1.8 * _maxR2 + (_height2 - 3.6 * _maxR2) / 2 + 1.1 * _maxR2;
                        } else if (isPrime(_categories2.length) && i === _categories2.length - 1) {
                            return startPoint + d3.min([(_height2 - 3.6 * _maxR2) / (_row2 - 1), 2.5 * _maxR2]) * Math.floor((i - 1) / _column2) + 1.1 * _maxR2;
                        } else {
                            return startPoint + d3.min([(_height2 - 3.6 * _maxR2) / (_row2 - 1), 2.5 * _maxR2]) * Math.floor(i / _column2) + 1.1 * _maxR2;
                        }
                    }).text(function(d) {
                        var text = d[_breakdown2[0].field];
                        return text.length > _substringTxtL2 ? text.substring(0, _substringTxtL2 - 2) + "..." : text;
                    }).attr('fill', 'black') //.attr('font-size', d3.min([height, width]) * 0.045)
                    .attr('font-size', _font2.label).attr("font-family", NUMFONT).attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging');
                var _h3 = _contentG2.node().getBBox().height,
                    _w3 = _contentG2.node().getBBox().width;
                var _marginTop2 = (this.height() - _h3) / 2 - _contentG2.node().getBBox().y,
                    _marginLeft2 = (this.width() - _w3) / 2 - _contentG2.node().getBBox().x;
                _contentG2.attr("transform", "translate(" + _marginLeft2 + "," + _marginTop2 + ")");
                return _svg2;
            }
        }
    }, {
        key: 'displayCategorization',
        value: function displayCategorization() {
            if (this.style() === _style2.default.BUSINESS || this.style() === _style2.default.COMICS) {
                var data = this.factdata();
                var breakdown = this.breakdown();
                var measureField = "COUNT"; // set the dimensions and margins of the graph
                // let isMatrix = style.style === 'matrix' ? true : false;
                var isMatrix = true;
                var _getSizeBySize5 = getSizeBySize(this.size(), "categorization", isMatrix),
                    margin = _getSizeBySize5.margin,
                    maxBubbleNum = _getSizeBySize5.maxBubbleNum,
                    substringTxtL = _getSizeBySize5.substringTxtL,
                    bubbleMT = _getSizeBySize5.bubbleMT,
                    width = this.width() - margin.left - margin.right,
                    height = this.height() - margin.top - margin.bottom,
                    font = fontSize[this.size()];
                var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
                if (this.style() === _style2.default.COMICS) width = 0.8 * width; //data
                var calculateData = d3.nest().key(function(d) {
                    return d[breakdown[0].field];
                }).entries(data);
                data = calculateData.map(function(d, i) {
                    var countRows = d.values[0];
                    countRows[measureField] = d.values.length;
                    return countRows;
                });
                data = data.slice(0, maxBubbleNum); // if (data.length > maxBubbleNum) {
                //     let chartSize = {
                //         width: this.width(),
                //         height: this.height()
                //     }
                //     unsupportedchart(svg, chartSize, annotationSize, this.size());
                //     return svg;
                // }
                // console.log("data", data)
                //if same year
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
                var contentG = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // let textHeight = 0;
                if (this.size() === _size6.default.LARGE && sameYear !== "" && sameYear !== "false/") { //let yearText = 
                    svg.append("text").attr("class", "sameYear").text("Year:" + sameYear.replace("/", "")).attr("font-size", '21').attr("font-family", NUMFONT).attr("y", 60).attr("x", this.width() / 2).attr("fill", _color2.default.TEXT).attr("text-anchor", "middle").attr('dominant-baseline', 'middle'); //textHeight = yearText.node().getBBox().height+10;//margin
                }
                data = data.map(function(d) {
                    d[breakdown[0].field] = d[breakdown[0].field].replace(sameYear, "");
                    return d;
                });
                var row = void 0,
                    column = void 0; //  data = data.slice(0, 1)
                var categories = data;
                if (isMatrix) {
                    var n = categories.length;
                    if (n < 6) {
                        row = 1;
                        column = n;
                    } else {
                        var max_sqrt = Math.floor(Math.sqrt(n));
                        var candidate = void 0;
                        if (isPrime(n)) n = n - 1;
                        while (max_sqrt) {
                            if (n % max_sqrt === 0) {
                                candidate = max_sqrt;
                                break;
                            }
                            max_sqrt -= 1;
                        }
                        row = d3.min([candidate, n / candidate]);
                        column = n / row;
                    }
                } else {
                    row = 1;
                    column = categories.length;
                }
                var maxR = d3.min([0.9 * height / (row + 1) / 2, 0.9 * width / (column + 1) / 2]); //Size channels
                var size = d3.scaleLinear().domain([0, d3.max(data, function(d) {
                    return Math.sqrt(d[measureField]);
                })]).range([0, maxR]); // Draw Circles
                var rowTotalWidth = void 0;
                var _that = this;
                if (categories.length % 2 === 0) {
                    rowTotalWidth = 2.4 * maxR * column;
                } else {
                    rowTotalWidth = 2.4 * maxR * (column + 1);
                }
                var proportions = contentG.append('g').selectAll('g').data(data).enter() // .append('g')
                    .append('g').attr("class", 'items').each(function(d, i) {
                        var rowNow = void 0;
                        if (isPrime(categories.length) && i === categories.length - 1) {
                            rowNow = Math.floor((i - 1) / column);
                        } else {
                            rowNow = Math.floor(i / column);
                        }
                        d3.select(this).attr("transform", 'translate(0,' + bubbleMT * rowNow + ')'); //行与行之间的间隔
                    });
                proportions.append("circle").style('stroke-width', '1').attr("class", "data-item").attr("size", function(d) {
                    return d[measureField];
                }).attr("fill", function(d, i) {
                    return _color2.default.CATEGORICAL[i % 10];
                }).attr("r", function(d) {
                    return size(Math.sqrt(d[measureField]));
                }).attr("cx", function(d, i) { //console.log("i", i, column)
                    if (column === 1) {
                        if (data.length === 2) { //异常处理
                            return i === 0 ? size(Math.sqrt(d[measureField])) : 2.4 * maxR + size(Math.sqrt(d[measureField]));
                        }
                        return (_that.width() - size(Math.sqrt(d[measureField]))) / 2;
                    }
                    if (!isMatrix) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                    } else if (isPrime(categories.length) && Math.floor(i / column) === row - 1) {
                        if (data.length === 2) return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * Math.floor(i % column);
                    } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * (Math.floor((i - 1) % column) + 1);
                    } else {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                    }
                }).attr("cy", function(d, i) {
                    var startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row - 1)) / 2;
                    if (!isMatrix) {
                        return 1.8 * maxR + (height - 3.6 * maxR) / 2;
                    } else if (isPrime(categories.length) && i === categories.length - 1) {
                        return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor((i - 1) / column);
                    } else {
                        return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor(i / column);
                    }
                }); //breakdown
                proportions.append('text').attr('x', function(d, i) {
                        if (column === 1) {
                            if (data.length === 2) { //异常处理
                                return i === 0 ? size(Math.sqrt(d[measureField])) : 2.4 * maxR + size(Math.sqrt(d[measureField]));
                            }
                            return (_that.width() - size(Math.sqrt(d[measureField]))) / 2;
                        }
                        if (!isMatrix) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        } else if (isPrime(categories.length) && Math.floor(i / column) === row - 1) {
                            if (data.length === 2) return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * Math.floor(i % column);
                        } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * (Math.floor((i - 1) % column) + 1);
                        } else {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        }
                    }).attr('y', function(d, i) {
                        var startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row - 1)) / 2;
                        if (!isMatrix) {
                            return 1.8 * maxR + (height - 3.6 * maxR) / 2 + 1.1 * maxR;
                        } else if (isPrime(categories.length) && i === categories.length - 1) {
                            return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor((i - 1) / column) + 1.1 * maxR;
                        } else {
                            return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor(i / column) + 1.1 * maxR;
                        }
                    }).text(function(d) {
                        var text = d[breakdown[0].field];
                        return text.length > substringTxtL ? text.substring(0, substringTxtL - 2) + "..." : text;
                    }).attr('fill', 'black') //.attr('font-size', d3.min([height, width]) * 0.045)
                    .attr('font-size', font.label).attr("font-family", NUMFONT).attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging');
                if (this.style() === _style2.default.COMICS) {
                    var metaphorHeight = this.size() === _size6.default.LARGE ? 4 * maxR : 3.6 * maxR,
                        metaphorWidth = metaphorHeight / 1.37;
                    var metaphor = contentG.append("image").attr('xlink:href', _metaphor4.default);
                    var contentBBox = contentG.select('g').node().getBBox();
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", contentBBox.width + metaphorWidth * 0.1).attr("y", contentBBox.height + contentBBox.y - metaphorHeight * 1);
                }
                var _h = contentG.node().getBBox().height,
                    _w = contentG.node().getBBox().width;
                var marginTop = (this.height() - _h) / 2 - contentG.node().getBBox().y,
                    marginLeft = (this.width() - _w) / 2 - contentG.node().getBBox().x;
                contentG.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
                return svg;
            }
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _data3 = this.factdata();
                var _breakdown3 = this.breakdown();
                var _measureField3 = "COUNT";
                var measure = this.measure();
                var pictype = measure[0].pictype; // set the dimensions and margins of the graph
                // let isMatrix = style.style === 'matrix' ? true : false;
                var _isMatrix3 = true;
                var _getSizeBySize6 = getSizeBySize(this.size(), "categorization", _isMatrix3),
                    _margin3 = _getSizeBySize6.margin,
                    _maxBubbleNum3 = _getSizeBySize6.maxBubbleNum,
                    _substringTxtL3 = _getSizeBySize6.substringTxtL,
                    _bubbleMT3 = _getSizeBySize6.bubbleMT,
                    _width3 = this.width() - _margin3.left - _margin3.right,
                    _height3 = this.height() - _margin3.top - _margin3.bottom,
                    _font3 = fontSize[this.size()];
                var _svg3 = d3.select(this.container()).append("svg").attr("width", _width3 + _margin3.left + _margin3.right).attr("height", _height3 + _margin3.top + _margin3.bottom);
                if (this.style() === _style2.default.COMICS) _width3 = 0.8 * _width3; //data
                var _calculateData = d3.nest().key(function(d) {
                    return d[_breakdown3[0].field];
                }).entries(_data3);
                _data3 = _calculateData.map(function(d, i) {
                    var countRows = d.values[0];
                    countRows[_measureField3] = d.values.length;
                    return countRows;
                });
                _data3 = _data3.slice(0, _maxBubbleNum3);
                var _contentG3 = _svg3.append("g").attr("transform", "translate(" + _margin3.left + "," + _margin3.top + ")");
                var _row3 = void 0,
                    _column3 = void 0; //  data = data.slice(0, 1)
                var _categories3 = _data3;
                if (_isMatrix3) {
                    var _n3 = _categories3.length;
                    var _max_sqrt3 = Math.floor(Math.sqrt(_n3));
                    var _candidate3 = void 0;
                    if (isPrime(_n3)) _n3 = _n3 - 1;
                    while (_max_sqrt3) {
                        if (_n3 % _max_sqrt3 === 0) {
                            _candidate3 = _max_sqrt3;
                            break;
                        }
                        _max_sqrt3 -= 1;
                    }
                    _row3 = d3.min([_candidate3, _n3 / _candidate3]);
                    _column3 = _n3 / _row3;
                } else {
                    _row3 = 1;
                    _column3 = _categories3.length;
                }
                var _maxR3 = d3.min([0.9 * _height3 / (_row3 + 1) / 2, 0.9 * _width3 / (_column3 + 1) / 2]); /*------------------通过名称找寻icon----------------------------*/
                _svg3.append("defs").append("g").attr("id", 'pictype' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                var typesizex1 = _svg3.select('#pictype' + pictype).node().getBBox().width;
                var typesizey1 = _svg3.select('#pictype' + pictype).node().getBBox().height;
                var typex = _svg3.select('#pictype' + pictype).node().getBBox().x;
                var typey = _svg3.select('#pictype' + pictype).node().getBBox().y;
                var area1 = typesizex1 * typesizey1;
                var area2 = _maxR3 * _maxR3 * Math.PI;
                var scaleorign = Math.sqrt(area2 / area1);
                var scale1 = []; //Size channels
                var _size3 = d3.scaleLinear().domain([0, d3.max(_data3, function(d) {
                    return Math.sqrt(d[_measureField3]);
                })]).range([0, scaleorign]); //Icon 进行缩放
                _data3.forEach(function(item, index) {
                    scale1.push(_size3(Math.sqrt(item[_measureField3])));
                    _svg3.append("defs").append("g").attr("id", 'pictypecateg' + index).append("path").attr("d", _pictogram2.default[pictype]).attr("transform", function() {
                        return 'scale(' + scale1[index] + ')';
                    });
                }); // Draw Icons
                var _rowTotalWidth3 = void 0;
                var _that4 = this;
                if (_categories3.length % 2 === 0) {
                    _rowTotalWidth3 = 2.4 * _maxR3 * _column3;
                } else {
                    _rowTotalWidth3 = 2.4 * _maxR3 * (_column3 + 1);
                }
                var _proportions3 = _contentG3.append('g').selectAll('g').data(_data3).enter() // .append('g')
                    .append('g').attr("class", 'items').each(function(d, i) {
                        var rowNow = void 0;
                        if (isPrime(_categories3.length) && i === _categories3.length - 1) {
                            rowNow = Math.floor((i - 1) / _column3);
                        } else {
                            rowNow = Math.floor(i / _column3);
                        }
                        d3.select(this).attr("transform", 'translate(0,' + _bubbleMT3 * rowNow + ')'); //行与行之间的间隔
                    });
                _proportions3.append("use").attr("xlink:href", function(d, i) {
                    return '#pictypecateg' + i;
                }).attr("id", function(d, i) {
                    return "icontype" + i;
                }).attr("class", "data-item").attr("fill", function(d, i) {
                    return _color2.default.CATEGORICAL[i % 10];
                }).attr("x", function(d, i) {
                    if (_column3 === 1) {
                        if (_data3.length === 2) { //异常处理
                            return i === 0 ? _size3(Math.sqrt(d[_measureField3])) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]) : 2.4 * _maxR3 + _size3(Math.sqrt(d[_measureField3])) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                        }
                        return (_that4.width() - _size3(Math.sqrt(d[_measureField3]))) / 2 - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    }
                    if (!_isMatrix3) {
                        return 1.2 * _maxR3 + (_rowTotalWidth3 - 2.4 * _maxR3) / (_column3 - 1) * Math.floor(i % _column3) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    } else if (isPrime(_categories3.length) && Math.floor(i / _column3) === _row3 - 1) {
                        return 1.2 * _maxR3 + (_rowTotalWidth3 - 2.4 * _maxR3) / _column3 * Math.floor(i % _column3) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    } else if (isPrime(_categories3.length) && Math.floor(i / _column3) === _row3) {
                        return 1.2 * _maxR3 + (_rowTotalWidth3 - 2.4 * _maxR3) / _column3 * (Math.floor((i - 1) % _column3) + 1) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    } else {
                        return 1.2 * _maxR3 + (_rowTotalWidth3 - 2.4 * _maxR3) / (_column3 - 1) * Math.floor(i % _column3) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    }
                }).attr("y", function(d, i) {
                    var startPoint = (_height3 - 3.6 * _maxR3) / (_row3 - 1) <= 2.5 * _maxR3 ? 1.8 * _maxR3 : (_height3 - 2.5 * _maxR3 * (_row3 - 1)) / 2;
                    if (!_isMatrix3) {
                        return 1.8 * _maxR3 + (_height3 - 3.6 * _maxR3) / 2 - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                    } else if (isPrime(_categories3.length) && i === _categories3.length - 1) {
                        return startPoint + d3.min([(_height3 - 3.6 * _maxR3) / (_row3 - 1), 2.5 * _maxR3]) * Math.floor((i - 1) / _column3) - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                    } else {
                        return startPoint + d3.min([(_height3 - 3.6 * _maxR3) / (_row3 - 1), 2.5 * _maxR3]) * Math.floor(i / _column3) - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                    }
                }); //breakdown
                _proportions3.append('text').attr('x', function(d, i) {
                        if (_column3 === 1) {
                            if (_data3.length === 2) { //异常处理
                                return i === 0 ? _size3(Math.sqrt(d[_measureField3])) : 2.4 * _maxR3 + _size3(Math.sqrt(d[_measureField3]));
                            }
                            return (_that4.width() - _size3(Math.sqrt(d[_measureField3]))) / 2;
                        }
                        if (!_isMatrix3) {
                            return 1.2 * _maxR3 + (_rowTotalWidth3 - 2.4 * _maxR3) / (_column3 - 1) * Math.floor(i % _column3);
                        } else if (isPrime(_categories3.length) && Math.floor(i / _column3) === _row3 - 1) {
                            return 1.2 * _maxR3 + (_rowTotalWidth3 - 2.4 * _maxR3) / _column3 * Math.floor(i % _column3);
                        } else if (isPrime(_categories3.length) && Math.floor(i / _column3) === _row3) {
                            return 1.2 * _maxR3 + (_rowTotalWidth3 - 2.4 * _maxR3) / _column3 * (Math.floor((i - 1) % _column3) + 1);
                        } else {
                            return 1.2 * _maxR3 + (_rowTotalWidth3 - 2.4 * _maxR3) / (_column3 - 1) * Math.floor(i % _column3);
                        }
                    }).attr('y', function(d, i) {
                        var startPoint = (_height3 - 3.6 * _maxR3) / (_row3 - 1) <= 2.5 * _maxR3 ? 1.8 * _maxR3 : (_height3 - 2.5 * _maxR3 * (_row3 - 1)) / 2;
                        if (!_isMatrix3) {
                            return 1.8 * _maxR3 + (_height3 - 3.6 * _maxR3) / 2 + 1.1 * _maxR3;
                        } else if (isPrime(_categories3.length) && i === _categories3.length - 1) {
                            return startPoint + d3.min([(_height3 - 3.6 * _maxR3) / (_row3 - 1), 2.5 * _maxR3]) * Math.floor((i - 1) / _column3) + 1.1 * _maxR3;
                        } else {
                            return startPoint + d3.min([(_height3 - 3.6 * _maxR3) / (_row3 - 1), 2.5 * _maxR3]) * Math.floor(i / _column3) + 1.1 * _maxR3;
                        }
                    }).text(function(d) {
                        var text = d[_breakdown3[0].field];
                        return text.length > _substringTxtL3 ? text.substring(0, _substringTxtL3 - 2) + "..." : text;
                    }).attr('fill', 'black') //.attr('font-size', d3.min([height, width]) * 0.045)
                    .attr('font-size', _font3.label).attr("font-family", NUMFONT).attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging');
                var _h4 = _contentG3.node().getBBox().height,
                    _w4 = _contentG3.node().getBBox().width;
                var _marginTop3 = (this.height() - _h4) / 2 - _contentG3.node().getBBox().y,
                    _marginLeft3 = (this.width() - _w4) / 2 - _contentG3.node().getBBox().x;
                _contentG3.attr("transform", "translate(" + _marginLeft3 + "," + _marginTop3 + ")");
                return _svg3;
            }
        }
    }, {
        key: 'displayExtreme',
        value: function displayExtreme() {
            if (this.style() === _style2.default.BUSINESS || this.style() === _style2.default.COMICS) {
                var data = this.factdata();
                var measure = this.measure();
                var breakdown = this.breakdown();
                var focus = this.focus();
                var measureField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field; // set the dimensions and margins of the graph
                // let isMatrix = style.style === 'matrix' ? true : false;
                var isMatrix = true;
                var _getSizeBySize7 = getSizeBySize(this.size(), "outlier", isMatrix),
                    margin = _getSizeBySize7.margin,
                    maxBubbleNum = _getSizeBySize7.maxBubbleNum,
                    annotationSize = _getSizeBySize7.annotationSize,
                    substringTxtL = _getSizeBySize7.substringTxtL,
                    bubbleMT = _getSizeBySize7.bubbleMT,
                    width = this.width() - margin.left - margin.right,
                    height = this.height() - margin.top - margin.bottom,
                    font = fontSize[this.size()];
                var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
                if (measure.length > 1) {
                    svg.append("rect").attr("width", width).attr("height", height).attr("fill", "none");
                    return svg;
                }
                if (this.style() === _style2.default.COMICS) width = 0.8 * width;
                data = data.filter(function(d) {
                    return d[measureField] > 0;
                });
                data = data.slice(0, maxBubbleNum); // if (data.length > maxBubbleNum) {
                //     let chartSize = {
                //         width: this.width(),
                //         height: this.height()
                //     }
                //     unsupportedchart(svg, chartSize, annotationSize, this.size());
                //     return svg;
                // }
                //if same year
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
                var contentG = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // let textHeight = 0;
                if (this.size() === _size6.default.LARGE && sameYear !== "" && sameYear !== "false/") { //let yearText = 
                    svg.append("text").attr("class", "sameYear").text("Year:" + sameYear.replace("/", "")).attr("font-size", '21').attr("font-family", NUMFONT).attr("y", 60).attr("x", this.width() / 2).attr("fill", _color2.default.TEXT).attr("text-anchor", "middle").attr('dominant-baseline', 'middle'); //textHeight = yearText.node().getBBox().height+10;//margin
                }
                data = data.map(function(d) {
                    d[breakdown[0].field] = d[breakdown[0].field].replace(sameYear, "");
                    return d;
                });
                var row = void 0,
                    column = void 0;
                var categories = data;
                if (isMatrix) {
                    var n = categories.length;
                    if (n < 6) {
                        row = 1;
                        column = n;
                    } else {
                        var max_sqrt = Math.floor(Math.sqrt(n));
                        var candidate = void 0;
                        if (isPrime(n)) n = n - 1;
                        while (max_sqrt) {
                            if (n % max_sqrt === 0) {
                                candidate = max_sqrt;
                                break;
                            }
                            max_sqrt -= 1;
                        }
                        row = d3.min([candidate, n / candidate]);
                        column = n / row;
                    }
                } else {
                    row = 1;
                    column = categories.length;
                }
                var maxR = d3.min([0.9 * height / (row + 1) / 2, 0.9 * width / (column + 1) / 2]); //Size channels
                var size = d3.scaleLinear().domain([0, d3.max(data, function(d) {
                    return Math.sqrt(d[measureField]);
                })]).range([0, maxR]); // 找到focus的在第几行
                var focusRow = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i][breakdown[0].field] === focus[0].value) {
                        if (isPrime(categories.length) && i === categories.length - 1) {
                            focusRow = Math.floor((i - 1) / column);
                        } else {
                            focusRow = Math.floor(i / column);
                        }
                        break;
                    }
                } // Draw Circles  
                var rowTotalWidth = void 0;
                if (categories.length % 2 === 0) {
                    rowTotalWidth = 2.4 * maxR * column;
                } else {
                    rowTotalWidth = 2.4 * maxR * (column + 1);
                }
                var chartWidth = this.width(),
                    chartHeight = this.height();
                var _that = this;
                var PcontentG = contentG.append("g");
                var proportions = PcontentG.append('g').selectAll('g').data(data).enter().append('g').attr("class", "items").each(function(d, i) { // if (i / column >= 1) {
                    //     console.log(i, column, (i+1) / column)
                    //     d3.select(this).attr("transform", `translate(0,${bubbleMT * parseInt((i+1) / column)})`); //行与行之间的间隔
                    // }
                    //tool tip
                    if (d[breakdown[0].field] === focus[0].value) {
                        var chartSize = {
                            width: chartWidth,
                            height: chartHeight
                        };
                        var toolTipX = findToolTipPosX(column, row, d, measureField, isMatrix, maxR, categories, i, _that, size),
                            toolTipY = findToolTipPosY(height, maxR, row, isMatrix, categories, column, i) - size(Math.sqrt(d[measureField])) - 11 * chartSize.height / 640,
                            toolTipValue = (0, _format2.default)(d[measureField]);
                        (0, _tooltip2.default)(toolTipX, toolTipY, toolTipValue, contentG, chartSize, annotationSize * 1.5);
                    }
                });
                proportions.each(function(d, i) {
                    var rowNow = void 0;
                    if (isPrime(categories.length) && i === categories.length - 1) {
                        rowNow = Math.floor((i - 1) / column);
                    } else {
                        rowNow = Math.floor(i / column);
                    }
                    d3.select(this).attr("transform", 'translate(0,' + bubbleMT * rowNow + ')'); //行与行之间的间隔
                    // if (rowNow === focusRow) { // 如果是focus所在的行
                    //     if (svg.select(".tooltip").node()) { //TODO: 这里在data.length===1的时候，会引起报错，暂时这样处理
                    //         bubbleMT = svg.select(".tooltip").node().getBBox().height
                    //         d3.select(this).attr("transform", `translate(0,${bubbleMT * rowNow})`); //行与行之间的间隔
                    //     }
                    // }
                });
                proportions.append("circle").style('stroke-width', '1').attr("class", "data-item").attr("size", function(d) {
                    return d[measureField];
                }).attr("fill", function(d) {
                    return d[breakdown[0].field] === focus[0].value ? _color2.default.HIGHLIGHT : _color2.default.DEFAULT;
                }).attr("r", function(d) {
                    return size(Math.sqrt(d[measureField]));
                }).attr("cx", function(d, i) {
                    if (column === 1) {
                        if (data.length === 2) { //异常处理
                            return i === 0 ? size(Math.sqrt(d[measureField])) : 2.4 * maxR + size(Math.sqrt(d[measureField]));
                        }
                        return (_that.width() - size(Math.sqrt(d[measureField]))) / 2;
                    }
                    if (!isMatrix) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                    } else if (isPrime(categories.length) && Math.floor(i / column) === row - 1) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * Math.floor(i % column);
                    } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * (Math.floor((i - 1) % column) + 1);
                    } else {
                        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                    }
                }).attr("cy", function(d, i) {
                    var startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row - 1)) / 2;
                    if (!isMatrix) {
                        return 1.8 * maxR + (height - 3.6 * maxR) / 2;
                    } else if (isPrime(categories.length) && i === categories.length - 1) {
                        return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor((i - 1) / column);
                    } else {
                        return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor(i / column);
                    }
                }); //breakdown
                proportions.append('text').attr("class", "labels").attr('x', function(d, i) {
                        if (column === 1) {
                            if (data.length === 2) { //异常处理
                                return i === 0 ? size(Math.sqrt(d[measureField])) : 2.4 * maxR + size(Math.sqrt(d[measureField]));
                            }
                            return (_that.width() - size(Math.sqrt(d[measureField]))) / 2;
                        }
                        if (!isMatrix) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        } else if (isPrime(categories.length) && Math.floor(i / column) === row - 1) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * Math.floor(i % column);
                        } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * (Math.floor((i - 1) % column) + 1);
                        } else {
                            return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
                        }
                    }).attr('y', function(d, i) {
                        var startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row - 1)) / 2;
                        if (!isMatrix) {
                            return 1.8 * maxR + (height - 3.6 * maxR) / 2 + 1.1 * maxR;
                        } else if (isPrime(categories.length) && i === categories.length - 1) {
                            return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor((i - 1) / column) + 1.1 * maxR;
                        } else {
                            return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor(i / column) + 1.1 * maxR;
                        }
                    }).text(function(d) {
                        var text = d[breakdown[0].field];
                        return text.length > substringTxtL ? text.substring(0, substringTxtL - 2) + "..." : text;
                    }).attr('fill', function(d) {
                        return d[breakdown[0].field] === focus[0].value ? _color2.default.HIGHLIGHT : 'black';
                    }).attr('font-family', function(d) { // if (d[breakdown[0].field] === focus[0].value) {
                        //     return TEXTFONT;
                        // }
                        return NUMFONT;
                    }) //.attr('font-size', d3.min([height, width]) * 0.045)
                    .attr('font-size', font.label).attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging');
                if (this.style() === _style2.default.COMICS) { //for transform
                    var focusNodeBBox = contentG.selectAll(".items").filter(function(d) {
                        return d[breakdown[0].field] === focus[0].value;
                    }).select('circle').node().getBBox();
                    var cx = focusNodeBBox.x + focusNodeBBox.width / 2,
                        cy = focusNodeBBox.y + focusNodeBBox.height / 2 + bubbleMT * focusRow;
                    var metaphorHeight = this.size() === _size6.default.LARGE ? 3.4 * maxR : 3.2 * maxR,
                        metaphorWidth = metaphorHeight / 1.29;
                    var metaphor = contentG.append("image").attr('xlink:href', _metaphor6.default);
                    var contentBBox = contentG.select('g').node().getBBox();
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", contentBBox.width + metaphorWidth * 0.1).attr("y", cy - metaphorHeight / 2);
                    var pointHeight = metaphorHeight,
                        pointWidth = metaphorHeight / 2.79;
                    contentG.append("image").attr('xlink:href', _metaphor22_2.default).attr("width", pointWidth).attr("height", pointHeight).attr("x", cx).attr("y", cy - pointHeight / 2 * 0.95);
                }
                if (this.size() === 'large') {
                    var _h = PcontentG.node().getBBox().height,
                        _w = PcontentG.node().getBBox().width;
                    var marginTop = (this.height() - _h) / 2 - PcontentG.node().getBBox().y,
                        marginLeft = (this.width() - _w) / 2 - PcontentG.node().getBBox().x;
                    contentG.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
                } else {
                    var _h5 = contentG.node().getBBox().height,
                        _w5 = contentG.node().getBBox().width;
                    var _marginTop4 = (this.height() - _h5) / 2 - contentG.node().getBBox().y,
                        _marginLeft4 = (this.width() - _w5) / 2 - contentG.node().getBBox().x;
                    contentG.attr("transform", "translate(" + _marginLeft4 + "," + _marginTop4 + ")");
                }
                return svg;
            }
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _data4 = this.factdata();
                var _measure3 = this.measure();
                var _breakdown4 = this.breakdown();
                var pictype = _measure3[0].pictype;
                var _focus = this.focus();
                var _measureField4 = _measure3[0].aggregate === "count" ? "COUNT" : _measure3[0].field; // set the dimensions and margins of the graph
                // let isMatrix = style.style === 'matrix' ? true : false;
                var _isMatrix4 = true;
                var _getSizeBySize8 = getSizeBySize(this.size(), "outlier", _isMatrix4),
                    _margin4 = _getSizeBySize8.margin,
                    _maxBubbleNum4 = _getSizeBySize8.maxBubbleNum,
                    _annotationSize = _getSizeBySize8.annotationSize,
                    _substringTxtL4 = _getSizeBySize8.substringTxtL,
                    _bubbleMT4 = _getSizeBySize8.bubbleMT,
                    _width4 = this.width() - _margin4.left - _margin4.right,
                    _height4 = this.height() - _margin4.top - _margin4.bottom,
                    _font4 = fontSize[this.size()];
                var _svg4 = d3.select(this.container()).append("svg").attr("width", _width4 + _margin4.left + _margin4.right).attr("height", _height4 + _margin4.top + _margin4.bottom);
                if (_measure3.length > 1) {
                    _svg4.append("rect").attr("width", _width4).attr("height", _height4).attr("fill", "none");
                    return _svg4;
                }
                _data4 = _data4.filter(function(d) {
                    return d[_measureField4] > 0;
                });
                _data4 = _data4.slice(0, _maxBubbleNum4);
                var _contentG4 = _svg4.append("g").attr("transform", "translate(" + _margin4.left + "," + _margin4.top + ")");
                var _row4 = void 0,
                    _column4 = void 0;
                var _categories4 = _data4;
                if (_isMatrix4) {
                    var _n4 = _categories4.length;
                    var _max_sqrt4 = Math.floor(Math.sqrt(_n4));
                    var _candidate4 = void 0;
                    if (isPrime(_n4)) _n4 = _n4 - 1;
                    while (_max_sqrt4) {
                        if (_n4 % _max_sqrt4 === 0) {
                            _candidate4 = _max_sqrt4;
                            break;
                        }
                        _max_sqrt4 -= 1;
                    }
                    _row4 = d3.min([_candidate4, _n4 / _candidate4]);
                    _column4 = _n4 / _row4;
                } else {
                    _row4 = 1;
                    _column4 = _categories4.length;
                }
                var _maxR4 = d3.min([0.9 * _height4 / (_row4 + 1) / 2, 0.9 * _width4 / (_column4 + 1) / 2]); /*------------------通过名称找寻icon----------------------------*/
                _svg4.append("defs").append("g").attr("id", 'pictype' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                var typesizex1 = _svg4.select('#pictype' + pictype).node().getBBox().width;
                var typesizey1 = _svg4.select('#pictype' + pictype).node().getBBox().height;
                var typex = _svg4.select('#pictype' + pictype).node().getBBox().x;
                var typey = _svg4.select('#pictype' + pictype).node().getBBox().y;
                var area1 = typesizex1 * typesizey1;
                var area2 = _maxR4 * _maxR4 * Math.PI;
                var scaleorign = Math.sqrt(area2 / area1);
                var scale1 = []; //Size channels
                var _size4 = d3.scaleLinear().domain([0, d3.max(_data4, function(d) {
                    return Math.sqrt(d[_measureField4]);
                })]).range([0, scaleorign]); //Icon 进行缩放
                _data4.forEach(function(item, index) {
                    scale1.push(_size4(Math.sqrt(item[_measureField4])));
                    _svg4.append("defs").append("g").attr("id", 'pictypecateex' + index).append("path").attr("d", _pictogram2.default[pictype]).attr("transform", function() {
                        return 'scale(' + scale1[index] + ')';
                    });
                }); // 找到focus的在第几行
                var _focusRow = 0;
                for (var _i = 0; _i < _data4.length; _i++) {
                    if (_data4[_i][_breakdown4[0].field] === _focus[0].value) {
                        if (isPrime(_categories4.length) && _i === _categories4.length - 1) {
                            _focusRow = Math.floor((_i - 1) / _column4);
                        } else {
                            _focusRow = Math.floor(_i / _column4);
                        }
                        break;
                    }
                } // Draw Icons  
                var _rowTotalWidth4 = void 0;
                if (_categories4.length % 2 === 0) {
                    _rowTotalWidth4 = 2.4 * _maxR4 * _column4;
                } else {
                    _rowTotalWidth4 = 2.4 * _maxR4 * (_column4 + 1);
                }
                var _chartWidth = this.width(),
                    _chartHeight = this.height();
                var _that5 = this;
                var _proportions4 = _contentG4.append('g').selectAll('g').data(_data4).enter().append('g').attr("class", "items").each(function(d, i) { //tool tip
                    if (d[_breakdown4[0].field] === _focus[0].value) {
                        var chartSize = {
                            width: _chartWidth,
                            height: _chartHeight
                        };
                        var toolTipX = findToolTipPosX(_column4, _row4, d, _measureField4, _isMatrix4, _maxR4, _categories4, i, _that5, _size4),
                            toolTipY = findToolTipPosY(_height4, _maxR4, _row4, _isMatrix4, _categories4, _column4, i) - scale1[i] * typesizey1 / 2 - 11 * chartSize.height / 640,
                            toolTipValue = (0, _format2.default)(d[_measureField4]);
                        (0, _tooltip2.default)(toolTipX, toolTipY, toolTipValue, d3.select(this), chartSize, _annotationSize * 1.5);
                    }
                });
                _proportions4.each(function(d, i) {
                    var rowNow = void 0;
                    if (isPrime(_categories4.length) && i === _categories4.length - 1) {
                        rowNow = Math.floor((i - 1) / _column4);
                    } else {
                        rowNow = Math.floor(i / _column4);
                    }
                    if (rowNow === _focusRow) { // 如果是focus所在的行
                        if (_svg4.select(".tooltip").node()) { //TODO: 这里在data.length===1的时候，会引起报错，暂时这样处理
                            _bubbleMT4 = _svg4.select(".tooltip").node().getBBox().height;
                            d3.select(this).attr("transform", 'translate(0,' + _bubbleMT4 * rowNow + ')'); //行与行之间的间隔
                        }
                    }
                });
                _proportions4.append("use").attr("xlink:href", function(d, i) {
                    return '#pictypecateex' + i;
                }).attr("id", function(d, i) {
                    return "icontype" + i;
                }).attr("class", "data-item").attr("fill", function(d) {
                    return d[_breakdown4[0].field] === _focus[0].value ? _color2.default.HIGHLIGHT : _color2.default.DEFAULT;
                }).attr("r", function(d) {
                    return _size4(Math.sqrt(d[_measureField4]));
                }).attr("x", function(d, i) {
                    if (_column4 === 1) {
                        if (_data4.length === 2) { //异常处理
                            return i === 0 ? _size4(Math.sqrt(d[_measureField4])) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]) : 2.4 * _maxR4 + _size4(Math.sqrt(d[_measureField4])) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                        }
                        return (_that5.width() - _size4(Math.sqrt(d[_measureField4]))) / 2 - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    }
                    if (!_isMatrix4) {
                        return 1.2 * _maxR4 + (_rowTotalWidth4 - 2.4 * _maxR4) / (_column4 - 1) * Math.floor(i % _column4) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    } else if (isPrime(_categories4.length) && Math.floor(i / _column4) === _row4 - 1) {
                        return 1.2 * _maxR4 + (_rowTotalWidth4 - 2.4 * _maxR4) / _column4 * Math.floor(i % _column4) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    } else if (isPrime(_categories4.length) && Math.floor(i / _column4) === _row4) {
                        return 1.2 * _maxR4 + (_rowTotalWidth4 - 2.4 * _maxR4) / _column4 * (Math.floor((i - 1) % _column4) + 1) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    } else {
                        return 1.2 * _maxR4 + (_rowTotalWidth4 - 2.4 * _maxR4) / (_column4 - 1) * Math.floor(i % _column4) - typesizex1 * scale1[i] / 2 - Math.abs(typex * scale1[i]);
                    }
                }).attr("y", function(d, i) {
                    var startPoint = (_height4 - 3.6 * _maxR4) / (_row4 - 1) <= 2.5 * _maxR4 ? 1.8 * _maxR4 : (_height4 - 2.5 * _maxR4 * (_row4 - 1)) / 2;
                    if (!_isMatrix4) {
                        return 1.8 * _maxR4 + (_height4 - 3.6 * _maxR4) / 2 - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                    } else if (isPrime(_categories4.length) && i === _categories4.length - 1) {
                        return startPoint + d3.min([(_height4 - 3.6 * _maxR4) / (_row4 - 1), 2.5 * _maxR4]) * Math.floor((i - 1) / _column4) - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                    } else {
                        return startPoint + d3.min([(_height4 - 3.6 * _maxR4) / (_row4 - 1), 2.5 * _maxR4]) * Math.floor(i / _column4) - typesizey1 * scale1[i] / 2 - Math.abs(typey * scale1[i]);
                    }
                }); //breakdown
                _proportions4.append('text').attr("class", "labels").attr('x', function(d, i) {
                        if (_column4 === 1) {
                            if (_data4.length === 2) { //异常处理
                                return i === 0 ? _size4(Math.sqrt(d[_measureField4])) : 2.4 * _maxR4 + _size4(Math.sqrt(d[_measureField4]));
                            }
                            return (_that5.width() - _size4(Math.sqrt(d[_measureField4]))) / 2;
                        }
                        if (!_isMatrix4) {
                            return 1.2 * _maxR4 + (_rowTotalWidth4 - 2.4 * _maxR4) / (_column4 - 1) * Math.floor(i % _column4);
                        } else if (isPrime(_categories4.length) && Math.floor(i / _column4) === _row4 - 1) {
                            return 1.2 * _maxR4 + (_rowTotalWidth4 - 2.4 * _maxR4) / _column4 * Math.floor(i % _column4);
                        } else if (isPrime(_categories4.length) && Math.floor(i / _column4) === _row4) {
                            return 1.2 * _maxR4 + (_rowTotalWidth4 - 2.4 * _maxR4) / _column4 * (Math.floor((i - 1) % _column4) + 1);
                        } else {
                            return 1.2 * _maxR4 + (_rowTotalWidth4 - 2.4 * _maxR4) / (_column4 - 1) * Math.floor(i % _column4);
                        }
                    }).attr('y', function(d, i) {
                        var startPoint = (_height4 - 3.6 * _maxR4) / (_row4 - 1) <= 2.5 * _maxR4 ? 1.8 * _maxR4 : (_height4 - 2.5 * _maxR4 * (_row4 - 1)) / 2;
                        if (!_isMatrix4) {
                            return 1.8 * _maxR4 + (_height4 - 3.6 * _maxR4) / 2 + 1.1 * _maxR4;
                        } else if (isPrime(_categories4.length) && i === _categories4.length - 1) {
                            return startPoint + d3.min([(_height4 - 3.6 * _maxR4) / (_row4 - 1), 2.5 * _maxR4]) * Math.floor((i - 1) / _column4) + 1.1 * _maxR4;
                        } else {
                            return startPoint + d3.min([(_height4 - 3.6 * _maxR4) / (_row4 - 1), 2.5 * _maxR4]) * Math.floor(i / _column4) + 1.1 * _maxR4;
                        }
                    }).text(function(d) {
                        var text = d[_breakdown4[0].field];
                        return text.length > _substringTxtL4 ? text.substring(0, _substringTxtL4 - 2) + "..." : text;
                    }).attr('fill', function(d) {
                        return d[_breakdown4[0].field] === _focus[0].value ? _color2.default.HIGHLIGHT : 'black';
                    }).attr('font-family', function(d) {
                        if (d[_breakdown4[0].field] === _focus[0].value) {
                            return TEXTFONT;
                        }
                        return NUMFONT;
                    }) //.attr('font-size', d3.min([height, width]) * 0.045)
                    .attr('font-size', _font4.label).attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging');
                var _h6 = _contentG4.node().getBBox().height,
                    _w6 = _contentG4.node().getBBox().width;
                var _marginTop5 = (this.height() - _h6) / 2 - _contentG4.node().getBBox().y,
                    _marginLeft5 = (this.width() - _w6) / 2 - _contentG4.node().getBBox().x;
                _contentG4.attr("transform", "translate(" + _marginLeft5 + "," + _marginTop5 + ")");
                return _svg4;
            }
        }
    }]);
    return BubbleChart;
}(_chart2.default);
var isPrime = function isPrime(num) {
    for (var i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
};
var findToolTipPosX = function findToolTipPosX(column, row, d, measureField, isMatrix, maxR, categories, i, _that, size) {
    var rowTotalWidth = void 0;
    if (categories.length % 2 === 0) {
        rowTotalWidth = 2.4 * maxR * column;
    } else {
        rowTotalWidth = 2.4 * maxR * (column + 1);
    }
    if (column === 1) {
        if (categories.length === 2) { //异常处理
            return i === 0 ? size(Math.sqrt(d[measureField])) : 2.4 * maxR + size(Math.sqrt(d[measureField]));
        }
        return (_that.width() - size(Math.sqrt(d[measureField]))) / 2;
    }
    if (!isMatrix) {
        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
    } else if (isPrime(categories.length) && Math.floor(i / column) === row - 1) {
        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * Math.floor(i % column);
    } else if (isPrime(categories.length) && Math.floor(i / column) === row) {
        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / column * (Math.floor((i - 1) % column) + 1);
    } else {
        return 1.2 * maxR + (rowTotalWidth - 2.4 * maxR) / (column - 1) * Math.floor(i % column);
    }
};
var findToolTipPosY = function findToolTipPosY(height, maxR, row, isMatrix, categories, column, i) {
    var startPoint = (height - 3.6 * maxR) / (row - 1) <= 2.5 * maxR ? 1.8 * maxR : (height - 2.5 * maxR * (row - 1)) / 2;
    if (!isMatrix) {
        return 1.8 * maxR + (height - 3.6 * maxR) / 2;
    } else if (isPrime(categories.length) && i === categories.length - 1) {
        return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor((i - 1) / column);
    } else {
        return startPoint + d3.min([(height - 3.6 * maxR) / (row - 1), 2.5 * maxR]) * Math.floor(i / column);
    }
};
var getSizeBySize = function getSizeBySize(size, factType, isMatrix) {
    var tickSize = void 0,
        annotationSize = void 0,
        maxBubbleNum = void 0,
        substringTxtL = void 0,
        bubbleMT = void 0;
    switch (size) {
        case _size6.default.WIDE:
            tickSize = 10;
            annotationSize = 15;
            substringTxtL = 8;
            bubbleMT = 15;
            break;
        case _size6.default.MIDDLE:
            tickSize = 10;
            annotationSize = 15;
            substringTxtL = 8;
            bubbleMT = 10;
            break;
        case _size6.default.SMALL:
            tickSize = 7;
            annotationSize = 10;
            substringTxtL = 6;
            bubbleMT = 5;
            break;
        case _size6.default.LARGE:
        default:
            tickSize = 19;
            annotationSize = 16;
            substringTxtL = 10;
            bubbleMT = 10;
            break;
    }
    var margin = void 0;
    switch (size) {
        case _size6.default.LARGE:
            margin = {
                top: 10,
                right: 40,
                bottom: 10,
                left: 40
            };
            maxBubbleNum = isMatrix ? 10 : 15;
            break;
        case _size6.default.WIDE:
            margin = {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20
            };
            maxBubbleNum = isMatrix ? 10 : 10;
            break;
        case _size6.default.MIDDLE:
            margin = {
                top: 10,
                right: 5,
                bottom: 10,
                left: 5
            };
            maxBubbleNum = isMatrix ? 10 : 8;
            break;
        case _size6.default.SMALL:
            margin = {
                top: 10,
                right: 5,
                bottom: 10,
                left: 5
            };
            maxBubbleNum = isMatrix ? 10 : 5;
            break;
        default:
            margin = {
                top: 10,
                right: 20,
                bottom: 10,
                left: 20
            };
            break;
    }
    return {
        tickSize: tickSize,
        annotationSize: annotationSize,
        margin: margin,
        maxBubbleNum: maxBubbleNum,
        substringTxtL: substringTxtL,
        bubbleMT: bubbleMT
    };
}; // function hexToRGB(h) {
//     let r = 0, g = 0, b = 0;
//     // 3 digits
//     if (h.length === 4) {
//         r = "0x" + h[1] + h[1];
//         g = "0x" + h[2] + h[2];
//         b = "0x" + h[3] + h[3];
//         // 6 digits
//     } else if (h.length === 7) {
//         r = "0x" + h[1] + h[2];
//         g = "0x" + h[3] + h[4];
//         b = "0x" + h[5] + h[6];
//     }
//     return { r, g, b };
// }
// const countTicksBeforeIndex = (animation, index) => {
//     let count = 0;
//     let visited = []
//     for (let key in animation) {
//         if (animation[key].index < index && visited.indexOf(animation[key].index) === -1) {
//             count += animation[key].duration
//             visited.push(animation[key].index)
//         };
//     }
//     return count
// }
var getSameYear = function getSameYear(array) {
    var temp = getYear(array[0]);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
    try {
        for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var date = _step.value;
            if (temp !== getYear(date)) return false;
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
    return temp;
};
var getYear = function getYear(str) {
    var year = str.split('/')[0];
    if (!isNaN(year) && year.length === 4) { //is number
        return year;
    } else return false;
};
exports.default = BubbleChart;