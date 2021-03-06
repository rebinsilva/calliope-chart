'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
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
var _d = require('d3');
var d3 = _interopRequireWildcard(_d);
var _chart = require('../../chart');
var _chart2 = _interopRequireDefault(_chart);
var _color = require('../../visualization/color');
var _color2 = _interopRequireDefault(_color);
var _tooltip = require('../../visualization/tooltip');
var _tooltip2 = _interopRequireDefault(_tooltip);
var _format = require('../../visualization/format');
var _format2 = _interopRequireDefault(_format);
var _size = require('../../visualization/size');
var _size2 = _interopRequireDefault(_size);
var _style = require('../../visualization/style');
var _style2 = _interopRequireDefault(_style);
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
}
var IsotypeCluster = function(_Chart) {
    _inherits(IsotypeCluster, _Chart);

    function IsotypeCluster() {
        _classCallCheck(this, IsotypeCluster);
        return _possibleConstructorReturn(this, (IsotypeCluster.__proto__ || Object.getPrototypeOf(IsotypeCluster)).apply(this, arguments));
    }
    _createClass(IsotypeCluster, [{
        key: 'displayDistribution',
        value: function displayDistribution() {
            var _this3 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var scale1;
                var _ret = function() {
                    var factdata = _this3.factdata();
                    var measure = _this3.measure();
                    var chartsize = _this3.size();
                    var pictype = measure[0].pictype; //???????????????icon??????
                    var breakdown = _this3.breakdown();
                    var hasSeries = false;
                    if (breakdown[1] && breakdown[1].field) hasSeries = true; // set the dimensions and margins of the graph
                    var _getSizeBySize = getSizeBySize(_this3, "distribution", hasSeries),
                        chartSize = _getSizeBySize.chartSize,
                        tickSize = _getSizeBySize.tickSize,
                        axisWidth = _getSizeBySize.axisWidth,
                        margin = _getSizeBySize.margin;
                    var width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom;
                    var svg = d3.select(_this3.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypeclusterDistribution").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                    if (_this3.measure().length > 1 || hasSeries) {
                        return {
                            v: svg
                        };
                    } /*----------------------????????????------------------------*/
                    var data = factdata;
                    var maxYValue = getMaxYValue(factdata, measure);
                    var pictorialdata = data.map(function(d) {
                        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                    });
                    pictorialdata = pictorialdata.slice(0, 10);
                    var pictorialx = data.map(function(d) {
                        return d[breakdown[0].field];
                    });
                    pictorialx = pictorialx.slice(0, 10);
                    var pictorialdatapercent = [];
                    for (var i = 0; i < pictorialdata.length; i++) {
                        pictorialdatapercent[i] = parseFloat(pictorialdata[i] / maxYValue * 100).toFixed(2);
                    } // let offsetY = this.size() === 'large' ? 5 : 2; //???x????????????  
                    var offsetY = 0;
                    var xrecord = [];
                    var x = void 0;
                    if (chartsize === _size2.default.SMALL) {
                        x = d3.scaleBand().range([0, width]).domain(data.map(function(d, i) {
                            xrecord[i] = d[breakdown[0].field];
                            return d[breakdown[0].field];
                        })).padding(0.5);
                    } else {
                        x = d3.scaleBand().range([0, width]).domain(data.map(function(d, i) {
                            xrecord[i] = d[breakdown[0].field];
                            return d[breakdown[0].field];
                        })).padding(0.35);
                    } /*------------------??????????????????icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeicdis' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeicdis' + pictype).node().getBoundingClientRect().width; // let typesizey1=svg.select(`#pictype${pictype}`).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictypeicdis' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeicdis' + pictype).node().getBBox().y; // append legend before chart 
                    var chartMeasuredWidth = width; //inital 
                    /*-------------??????x??????????????????icon?????????--------------------------------*/
                    var scale = void 0;
                    svg.select('#pictypeicdis' + pictype).attr("transform", function() {
                        scale = x.bandwidth() / (4 * typesizex1);
                        return 'scale(' + scale + ')';
                    }); /*----------------??????????????????icon??????------------------------*/
                    var typesizex = svg.select('#pictypeicdis' + pictype).node().getBBox().width;
                    var typesizey = svg.select('#pictypeicdis' + pictype).node().getBBox().height; /*---------------????????????bar?????????icon??????---------------------*/
                    var xpadding = 2;
                    var ypadding = 2;
                    var total = void 0;
                    if (chartsize === _size2.default.LARGE) {
                        total = 80;
                    }
                    if (chartsize === _size2.default.WIDE) {
                        total = 40;
                    }
                    if (chartsize === _size2.default.MIDDLE) {
                        total = 40;
                    }
                    if (chartsize === _size2.default.SMALL) {
                        total = 32;
                    }
                    var valuePict = [];
                    var myIndex = [];
                    for (var _i = 0; _i < pictorialx.length; _i++) {
                        valuePict[_i] = Math.ceil(pictorialdatapercent[_i] / 100 * total);
                        myIndex[_i] = d3.range(valuePict[_i]);
                    } // set the ranges     
                    var y = d3.scaleLinear().nice().range([height, 0]).domain([0, maxYValue]).clamp(true); /***(1) append yAxis  to measure the leftTick width **/
                    var maxY = void 0;
                    if (!hasSeries) {
                        maxY = d3.max(data, function(d) {
                            return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                        });
                    }
                    var startY = height,
                        endY = height - total / 4 * (typesizey * scale + ypadding); //inital
                    initYAixsStyle(startY, endY, maxY, svg, axisWidth, tickSize, margin); /*-------------------??????????????????icon---------------------------------*/
                    var rowa = [];
                    scale1 = scale;
                    var _loop = function _loop(_a) {
                        rowa.push(Math.ceil(valuePict[_a] / 4) - 1);
                        svg.append("g").attr("id", "pictoLayer").selectAll('.pic' + _a).data(myIndex[_a]).enter().append("use").attr("xlink:href", '#pictypeicdis' + pictype).attr("fill", _color2.default.DEFAULT).attr("class", 'pic' + _a).attr("id", function(d, i) {
                            return 'category' + _a + 'icon' + i;
                        }).attr("x", function(d, i) {
                            return -xpadding / 2 * 3 + d % 4 * (typesizex * scale1 + xpadding) - Math.abs(typex * scale1) + x(xrecord[_a]);
                        }).attr("y", function(d, i) {
                            return -ypadding + y(0) - Math.floor(i / 4) * (typesizey * scale1 + ypadding) - Math.abs(typey * scale1) - typesizey * scale1;
                        });
                    };
                    for (var _a = 0; _a < pictorialx.length; _a++) {
                        _loop(_a);
                    } // add the x Axis
                    var isRotate = false;
                    var xAxis = svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + (height + offsetY) + ')'); //????????????ticks 
                    // if (data.length > maxTicksNum) {
                    //     let selectedTickValueArray = [];
                    //     let ordinal = d3.scalePoint()
                    //         .domain(d3.range(0, maxTicksNum))
                    //         .rangeRound([0, data.length - 1]);
                    //     for (let i = 0; i < maxTicksNum; i++) {
                    //         selectedTickValueArray.push(data[ordinal(i)][breakdown[0].field])
                    //     }
                    //     xAxis.call(d3.axisBottom(x).tickValues(selectedTickValueArray));
                    // } else {
                    xAxis.call(d3.axisBottom(x)); //}
                    xAxis.call(function(g) {
                        var xAxislineData = [
                            [0, 0],
                            [hasSeries ? chartMeasuredWidth : width, 0]
                        ];
                        var newD = d3.line()(xAxislineData); //??????d
                        g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                        g.selectAll('.tick line').attr('stroke', 'black').attr('y2', 6 * chartSize.height / 320).attr("stroke-width", axisWidth);
                        g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', tickSize).attr('font-family', 'RobotoMono-Regular').attr('fill', 'black').attr('text-anchor', 'middle').each(function(d, i) {
                            var text = d3.select(this).node();
                            if (text.getBBox().width > x.step()) {
                                isRotate = true;
                            }
                        });
                    }); //??????bar???????????????45???
                    if (isRotate) {
                        svg.selectAll(".xAxis .tick text").each(function(d, i) {
                            var textNode = d3.select(this).node();
                            textNode.setAttribute("text-anchor", "end");
                            textNode.setAttribute("transform-origin", '0 ' + textNode.getBBox().y);
                            textNode.setAttribute("transform", 'rotate(-45)');
                        });
                    }
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
                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        }
    }, {
        key: 'displayCategorization',
        value: function displayCategorization() {
            var _this4 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var scale1;
                var _ret3 = function() {
                    var factdata = _this4.factdata();
                    var measure = _this4.measure();
                    var pictype = measure[0].pictype; //???????????????icon??????
                    var chartsize = _this4.size();
                    var breakdown = _this4.breakdown();
                    var hasSeries = false;
                    if (breakdown[1] && breakdown[1].field) hasSeries = true; // set the dimensions and margins of the graph
                    var _getSizeBySize2 = getSizeBySize(_this4, "distribution", hasSeries),
                        chartSize = _getSizeBySize2.chartSize,
                        tickSize = _getSizeBySize2.tickSize,
                        axisWidth = _getSizeBySize2.axisWidth,
                        margin = _getSizeBySize2.margin;
                    var width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom;
                    var svg = d3.select(_this4.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypeclusterCategorization").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                    if (_this4.measure().length > 1 || hasSeries) {
                        return {
                            v: svg
                        };
                    } /*----------------------????????????------------------------*/
                    var data = factdata;
                    var maxYValue = getMaxYValue(factdata, measure);
                    var pictorialdata = data.map(function(d) {
                        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                    });
                    pictorialdata = pictorialdata.slice(0, 10);
                    var pictorialx = data.map(function(d) {
                        return d[breakdown[0].field];
                    });
                    pictorialx = pictorialx.slice(0, 10);
                    var pictorialdatapercent = [];
                    for (var i = 0; i < pictorialdata.length; i++) {
                        pictorialdatapercent[i] = parseFloat(pictorialdata[i] / maxYValue * 100).toFixed(2);
                    } // let offsetY = this.size() === 'large' ? 5 : 2; //???x????????????  
                    var offsetY = 0;
                    var xrecord = [];
                    var x = void 0;
                    if (chartsize === _size2.default.SMALL) {
                        x = d3.scaleBand().range([0, width]).domain(data.map(function(d, i) {
                            xrecord[i] = d[breakdown[0].field];
                            return d[breakdown[0].field];
                        })).padding(0.5);
                    } else {
                        x = d3.scaleBand().range([0, width]).domain(data.map(function(d, i) {
                            xrecord[i] = d[breakdown[0].field];
                            return d[breakdown[0].field];
                        })).padding(0.35);
                    } /*------------------??????????????????icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeiccate' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeiccate' + pictype).node().getBoundingClientRect().width; // let typesizey1=svg.select(`#pictype${pictype}`).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictypeiccate' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeiccate' + pictype).node().getBBox().y; // append legend before chart 
                    var chartMeasuredWidth = width; //inital 
                    /*-------------??????x??????????????????icon?????????--------------------------------*/
                    var scale = void 0;
                    svg.select('#pictypeiccate' + pictype).attr("transform", function() {
                        scale = x.bandwidth() / (4 * typesizex1);
                        return 'scale(' + scale + ')';
                    }); /*----------------??????????????????icon??????------------------------*/
                    var typesizex = svg.select('#pictypeiccate' + pictype).node().getBBox().width;
                    var typesizey = svg.select('#pictypeiccate' + pictype).node().getBBox().height; /*---------------????????????bar?????????icon??????---------------------*/
                    var xpadding = 2;
                    var ypadding = 2;
                    var total = void 0;
                    if (chartsize === _size2.default.LARGE) {
                        total = 80;
                    }
                    if (chartsize === _size2.default.WIDE) {
                        total = 40;
                    }
                    if (chartsize === _size2.default.MIDDLE) {
                        total = 40;
                    }
                    if (chartsize === _size2.default.SMALL) {
                        total = 32;
                    }
                    var valuePict = [];
                    var myIndex = [];
                    for (var _i2 = 0; _i2 < pictorialx.length; _i2++) {
                        valuePict[_i2] = Math.ceil(pictorialdatapercent[_i2] / 100 * total);
                        myIndex[_i2] = d3.range(valuePict[_i2]);
                    } // set the ranges     
                    var y = d3.scaleLinear().nice().range([height, 0]).domain([0, maxYValue]).clamp(true); /***(1) append yAxis  to measure the leftTick width **/
                    var maxY = void 0;
                    if (!hasSeries) {
                        maxY = d3.max(data, function(d) {
                            return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                        });
                    }
                    var startY = height,
                        endY = height - total / 4 * (typesizey * scale + ypadding); //inital
                    initYAixsStyle(startY, endY, maxY, svg, axisWidth, tickSize, margin); /*-------------------??????????????????icon---------------------------------*/
                    var rowa = [];
                    scale1 = scale;
                    var _loop2 = function _loop2(_a2) {
                        rowa.push(Math.ceil(valuePict[_a2] / 4) - 1);
                        svg.append("g").attr("id", "pictoLayer").selectAll('.pic' + _a2).data(myIndex[_a2]).enter().append("use").attr("xlink:href", '#pictypeiccate' + pictype).attr("fill", '' + _color2.default.CATEGORICAL[_a2 % 10]).attr("class", 'pic' + _a2).attr("id", function(d, i) {
                            return 'category' + _a2 + 'icon' + i;
                        }).attr("x", function(d, i) {
                            return -xpadding / 2 * 3 + d % 4 * (typesizex * scale1 + xpadding) - Math.abs(typex * scale1) + x(xrecord[_a2]);
                        }).attr("y", function(d, i) {
                            return -ypadding + y(0) - Math.floor(i / 4) * (typesizey * scale1 + ypadding) - Math.abs(typey * scale1) - typesizey * scale1;
                        });
                    };
                    for (var _a2 = 0; _a2 < pictorialx.length; _a2++) {
                        _loop2(_a2);
                    } // add the x Axis
                    var isRotate = false;
                    var xAxis = svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + (height + offsetY) + ')'); //????????????ticks 
                    // if (data.length > maxTicksNum) {
                    //     let selectedTickValueArray = [];
                    //     let ordinal = d3.scalePoint()
                    //         .domain(d3.range(0, maxTicksNum))
                    //         .rangeRound([0, data.length - 1]);
                    //     for (let i = 0; i < maxTicksNum; i++) {
                    //         selectedTickValueArray.push(data[ordinal(i)][breakdown[0].field])
                    //     }
                    //     xAxis.call(d3.axisBottom(x).tickValues(selectedTickValueArray));
                    // } else {
                    xAxis.call(d3.axisBottom(x)); //}
                    xAxis.call(function(g) {
                        var xAxislineData = [
                            [0, 0],
                            [hasSeries ? chartMeasuredWidth : width, 0]
                        ];
                        var newD = d3.line()(xAxislineData); //??????d
                        g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                        g.selectAll('.tick line').attr('stroke', 'black').attr('y2', 6 * chartSize.height / 320).attr("stroke-width", axisWidth);
                        g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', tickSize).attr('font-family', 'RobotoMono-Regular').attr('fill', 'black').attr('text-anchor', 'middle').each(function(d, i) {
                            var text = d3.select(this).node();
                            if (text.getBBox().width > x.step()) {
                                isRotate = true;
                            }
                        });
                    }); //??????bar???????????????45???
                    if (isRotate) {
                        svg.selectAll(".xAxis .tick text").each(function(d, i) {
                            var textNode = d3.select(this).node();
                            textNode.setAttribute("text-anchor", "end");
                            textNode.setAttribute("transform-origin", '0 ' + textNode.getBBox().y);
                            textNode.setAttribute("transform", 'rotate(-45)');
                        });
                    }
                    var cardWidth = _this4.width();
                    var cardHeight = _this4.height();
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
            }
        }
    }, {
        key: 'displayValue',
        value: function displayValue() {
            if (this.style() === _style2.default.PICTOGRAPH) {
                var factdata = this.factdata();
                var measure = this.measure();
                var breakdown = this.breakdown();
                var subspace = this.subspace();
                var pictype = measure[0].pictype; //???????????????icon??????
                // set the dimensions and margins of the graph
                var _getSizeBySize3 = getSizeBySize(this, "value"),
                    chartSize = _getSizeBySize3.chartSize,
                    axisWidth = _getSizeBySize3.axisWidth,
                    margin = _getSizeBySize3.margin,
                    annotationSize = _getSizeBySize3.annotationSize,
                    width = chartSize.width - margin.left - margin.right,
                    height = chartSize.height - margin.top - margin.bottom;
                var svg = d3.select(this.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypeclusterValue").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                if (this.measure().length > 1 || this.breakdown().length > 1) {
                    return svg;
                } /*------------------??????????????????icon----------------------------*/
                svg.append("defs").append("g").attr("id", 'pictypeicv' + pictype).append("path").attr("d", _pictogram2.default[pictype]); //let typesizex1=svg.select(`#pictype${pictype}`).node().getBBox().width;
                var typesizey1 = svg.select('#pictypeicv' + pictype).node().getBBox().height; /*-------------??????chartsize??????????????????icon?????????------------------*/
                var scale = void 0;
                var scaley = 20;
                var xpadding = 2;
                var ypadding = 2;
                var total = void 0;
                scale = scaley / typesizey1; //  if(this.size()==='large') scalexsize=3/4
                svg.select('#pictypeicv' + pictype).attr("transform", function() {
                    return 'scale(' + scale + ')';
                });
                if (this.size() === _size2.default.LARGE) {
                    total = 80;
                }
                if (this.size() === _size2.default.WIDE) {
                    total = 40;
                }
                if (this.size() === _size2.default.MIDDLE) {
                    total = 40;
                }
                if (this.size() === _size2.default.SMALL) {
                    total = 32;
                }
                var barValue = void 0;
                if (subspace.length === 0) {
                    barValue = d3.sum(factdata, function(d) {
                        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                    });
                    factdata[0][measure[0].field] = barValue;
                    factdata[0][breakdown[0].field] = '';
                    factdata = [factdata[0]];
                } else {
                    barValue = factdata[0][measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                }
                var maxYValue = getMaxYValue(factdata, measure);
                var pictorialdatapercent = barValue / (maxYValue * 1.1);
                var valuePict = void 0;
                var myIndex = void 0;
                valuePict = Math.ceil(pictorialdatapercent * total);
                myIndex = d3.range(valuePict);
                var rowa = Math.ceil(valuePict / 4); /*----------------??????????????????icon??????------------------------*/
                var typesizex = svg.select('#pictypeicv' + pictype).node().getBBox().width;
                var typesizey = svg.select('#pictypeicv' + pictype).node().getBBox().height;
                var typex = svg.select('#pictypeicv' + pictype).node().getBBox().x;
                var typey = svg.select('#pictypeicv' + pictype).node().getBBox().y;
                var x = void 0;
                var y = void 0;
                var offsetY = this.size() === 'large' ? 5 : 2; //???x????????????
                var xField = subspace.length === 0 ? breakdown[0].field : subspace[0].value;
                x = d3.scaleBand().range([0, width]).domain([xField]).padding(0.8);
                y = d3.scaleLinear().nice().range([height - offsetY, height - typesizey - offsetY]).domain([0, barValue]).clamp(true); /*-------------------??????????????????icon---------------------------------*/
                var scale1 = scale;
                svg.append("g").attr("id", "pictoLayer").selectAll(".pic").data(myIndex).enter().append("use").attr("xlink:href", '#pictypeicv' + pictype).attr("fill", _color2.default.DEFAULT).attr("class", "pic").attr("id", function(d, i) {
                    return 'icon' + i;
                }).attr("x", function(d, i) {
                    return d % 4 * (typesizex * scale1 + xpadding) - Math.abs(typex * scale1) + width / 2 - typesizex * scale1 * 2 - xpadding * 3 / 2;
                }).attr("y", function(d, i) {
                    return -ypadding + height - offsetY - Math.floor(i / 4) * (typesizey * scale1 + ypadding) - Math.abs(typey * scale1) - typesizey * scale1;
                }); // add the x Axis
                svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + height + ')').call(d3.axisBottom(x)).call(function(g) {
                    var xAxislineData = [
                        [0, 0],
                        [width, 0]
                    ];
                    var newD = d3.line()(xAxislineData); //??????d
                    g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                    g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', annotationSize).attr('font-family', 'RobotoMono-Regular').attr('fill', 'black').attr('text-anchor', 'middle');
                    if (subspace.length !== 0) {
                        g.selectAll('.tick line').attr('stroke', 'black').attr('y2', 6 * chartSize.height / 320).attr("stroke-width", axisWidth);
                    } else {
                        g.selectAll('.tick line').remove();
                    }
                }); //tool tip
                var toolTipX = width / 2, //??????????????????x?????????
                    toolTipY = y(0) - rowa * typesizey * scale1 - offsetY * 2 - 20 * chartSize.height / 320, //??????????????????y????????? ,?????????40*
                    toolTipValue = (0, _format2.default)(barValue);
                var tooltiptext = void 0; //??????????????????
                if (this.size() === "large") tooltiptext = 45;
                if (this.size() === "wide") tooltiptext = 35;
                if (this.size() === "middle") tooltiptext = 25;
                if (this.size() === "small") tooltiptext = 20;
                (0, _tooltip2.default)(toolTipX, toolTipY, toolTipValue, svg, chartSize, tooltiptext); //center
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
            }
        }
    }, {
        key: 'displayRank',
        value: function displayRank() {
            var _this5 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var scale1;
                var _ret5 = function() {
                    var factdata = _this5.factdata();
                    var measure = _this5.measure();
                    var pictype = measure[0].pictype; //???????????????icon??????
                    var chartsize = _this5.size();
                    var breakdown = _this5.breakdown();
                    var hasSeries = false;
                    if (breakdown[1] && breakdown[1].field) hasSeries = true; // set the dimensions and margins of the graph
                    var _getSizeBySize4 = getSizeBySize(_this5, "distribution", hasSeries),
                        chartSize = _getSizeBySize4.chartSize,
                        tickSize = _getSizeBySize4.tickSize,
                        axisWidth = _getSizeBySize4.axisWidth,
                        margin = _getSizeBySize4.margin;
                    var width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom;
                    var svg = d3.select(_this5.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypeclusterRank").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                    if (_this5.measure().length > 1 || hasSeries) {
                        return {
                            v: svg
                        };
                    } /*----------------------????????????------------------------*/
                    var mesuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
                    var data = factdata.sort(function(a, b) {
                        return b[mesuredField] - a[mesuredField];
                    });
                    var maxYValue = getMaxYValue(factdata, measure);
                    var pictorialdata = data.map(function(d) {
                        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                    });
                    pictorialdata = pictorialdata.slice(0, 10);
                    var pictorialx = data.map(function(d) {
                        return d[breakdown[0].field];
                    });
                    pictorialx = pictorialx.slice(0, 10);
                    var pictorialdatapercent = [];
                    for (var i = 0; i < pictorialdata.length; i++) {
                        pictorialdatapercent[i] = parseFloat(pictorialdata[i] / maxYValue * 100).toFixed(2);
                    } // let offsetY = this.size() === 'large' ? 5 : 2; //???x????????????  
                    var offsetY = 0;
                    var xrecord = [];
                    var x = void 0;
                    if (chartsize === _size2.default.SMALL) {
                        x = d3.scaleBand().range([0, width]).domain(data.map(function(d, i) {
                            xrecord[i] = d[breakdown[0].field];
                            return d[breakdown[0].field];
                        })).padding(0.5);
                    } else {
                        x = d3.scaleBand().range([0, width]).domain(data.map(function(d, i) {
                            xrecord[i] = d[breakdown[0].field];
                            return d[breakdown[0].field];
                        })).padding(0.35);
                    } /*------------------??????????????????icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeicr' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeicr' + pictype).node().getBoundingClientRect().width; // let typesizey1=svg.select(`#pictype${pictype}`).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictypeicr' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeicr' + pictype).node().getBBox().y; // append legend before chart 
                    var chartMeasuredWidth = width; //inital 
                    /*-------------??????x??????????????????icon?????????--------------------------------*/
                    var scale = void 0;
                    svg.select('#pictypeicr' + pictype).attr("transform", function() {
                        scale = x.bandwidth() / (4 * typesizex1);
                        return 'scale(' + scale + ')';
                    }); /*----------------??????????????????icon??????------------------------*/
                    var typesizex = svg.select('#pictypeicr' + pictype).node().getBBox().width;
                    var typesizey = svg.select('#pictypeicr' + pictype).node().getBBox().height; /*---------------????????????bar?????????icon??????---------------------*/
                    var xpadding = 2;
                    var ypadding = 2;
                    var total = void 0;
                    if (chartsize === _size2.default.LARGE) {
                        total = 80;
                    }
                    if (chartsize === _size2.default.WIDE) {
                        total = 40;
                    }
                    if (chartsize === _size2.default.MIDDLE) {
                        total = 40;
                    }
                    if (chartsize === _size2.default.SMALL) {
                        total = 32;
                    }
                    var valuePict = [];
                    var myIndex = [];
                    for (var _i3 = 0; _i3 < pictorialx.length; _i3++) {
                        valuePict[_i3] = Math.ceil(pictorialdatapercent[_i3] / 100 * total);
                        myIndex[_i3] = d3.range(valuePict[_i3]);
                    } // set the ranges     
                    var y = d3.scaleLinear().nice().range([height, 0]).domain([0, maxYValue]).clamp(true); /***(1) append yAxis  to measure the leftTick width **/
                    var maxY = void 0;
                    if (!hasSeries) {
                        maxY = d3.max(data, function(d) {
                            return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                        });
                    }
                    var startY = height,
                        endY = height - total / 4 * (typesizey * scale + ypadding); //inital
                    initYAixsStyle(startY, endY, maxY, svg, axisWidth, tickSize, margin); /*-------------------??????????????????icon---------------------------------*/
                    var rowa = [];
                    scale1 = scale;
                    var _loop3 = function _loop3(_a3) {
                        rowa.push(Math.ceil(valuePict[_a3] / 4) - 1);
                        svg.append("g").attr("id", "pictoLayer").selectAll('.pic' + _a3).data(myIndex[_a3]).enter().append("use").attr("xlink:href", '#pictypeicr' + pictype).attr("fill", function() {
                            if (_a3 < 3) {
                                return _color2.default.HIGHLIGHT;
                            }
                            return _color2.default.DEFAULT;
                        }).attr("class", 'pic' + _a3).attr("id", function(d, i) {
                            return 'category' + _a3 + 'icon' + i;
                        }).attr("x", function(d, i) {
                            return -xpadding / 2 * 3 + d % 4 * (typesizex * scale1 + xpadding) - Math.abs(typex * scale1) + x(xrecord[_a3]);
                        }).attr("y", function(d, i) {
                            return -ypadding + y(0) - Math.floor(i / 4) * (typesizey * scale1 + ypadding) - Math.abs(typey * scale1) - typesizey * scale1;
                        });
                    };
                    for (var _a3 = 0; _a3 < pictorialx.length; _a3++) {
                        _loop3(_a3);
                    } // add the x Axis
                    var isRotate = false;
                    var xAxis = svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + (height + offsetY) + ')'); //????????????ticks 
                    // if (data.length > maxTicksNum) {
                    //     let selectedTickValueArray = [];
                    //     let ordinal = d3.scalePoint()
                    //         .domain(d3.range(0, maxTicksNum))
                    //         .rangeRound([0, data.length - 1]);
                    //     for (let i = 0; i < maxTicksNum; i++) {
                    //         selectedTickValueArray.push(data[ordinal(i)][breakdown[0].field])
                    //     }
                    //     xAxis.call(d3.axisBottom(x).tickValues(selectedTickValueArray));
                    // } else {
                    xAxis.call(d3.axisBottom(x)); //}
                    xAxis.call(function(g) {
                        var xAxislineData = [
                            [0, 0],
                            [hasSeries ? chartMeasuredWidth : width, 0]
                        ];
                        var newD = d3.line()(xAxislineData); //??????d
                        g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                        g.selectAll('.tick line').attr('stroke', 'black').attr('y2', 6 * chartSize.height / 320).attr("stroke-width", axisWidth);
                        g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', tickSize).attr('font-family', 'RobotoMono-Regular').attr('fill', 'black').attr('text-anchor', 'middle').each(function(d, i) {
                            var text = d3.select(this).node();
                            if (text.getBBox().width > x.step()) {
                                isRotate = true;
                            }
                        });
                    }); //??????bar???????????????45???
                    if (isRotate) {
                        svg.selectAll(".xAxis .tick text").each(function(d, i) {
                            var textNode = d3.select(this).node();
                            textNode.setAttribute("text-anchor", "end");
                            textNode.setAttribute("transform-origin", '0 ' + textNode.getBBox().y);
                            textNode.setAttribute("transform", 'rotate(-45)');
                        });
                    }
                    var cardWidth = _this5.width();
                    var cardHeight = _this5.height();
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
            }
        }
    }, {
        key: 'displayDifference',
        value: function displayDifference() {
            var _this6 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var scale1;
                var _ret7 = function() {
                    var _getSizeBySize5 = getSizeBySize(_this6, "difference"),
                        chartSize = _getSizeBySize5.chartSize,
                        tickSize = _getSizeBySize5.tickSize,
                        annotationSize = _getSizeBySize5.annotationSize,
                        margin = _getSizeBySize5.margin,
                        width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom;
                    var svg = d3.select(_this6.container()).append("svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypeclusterDifference").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')'); //difference????????????filteredData?????????????????????
                    if (_this6.measure().length > 1 || _this6.focus().length < 2) {
                        return {
                            v: svg
                        };
                    }
                    var focus = _this6.focus();
                    var filteredData = []; //sorted by focus
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        var _loop5 = function _loop5() {
                            var fs = _step.value;
                            _this6.factdata().filter(function(x) {
                                return x[fs.field] === fs.value;
                            })[0] && filteredData.push(_this6.factdata().filter(function(x) {
                                return x[fs.field] === fs.value;
                            })[0]);
                        };
                        for (var _iterator = focus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            _loop5();
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
                    var measure = _this6.measure();
                    var breakdown = _this6.breakdown();
                    var pictype = measure[0].pictype;
                    var maxYValue = getMaxYValue(filteredData, measure);
                    var data = filteredData; // set the ranges
                    var xwidthmax = void 0;
                    var paddingx = void 0;
                    if (_this6.size() !== _size2.default.SMALL) {
                        xwidthmax = width / 5 * 3;
                        paddingx = 0.1;
                    } else {
                        xwidthmax = width;
                        paddingx = 0.2;
                    }
                    var x = d3.scaleBand().range([0, xwidthmax]).padding(paddingx);
                    var y = d3.scaleLinear().nice().range([height, 0]);
                    var xrecord = []; // Scale the range of the data in the domains
                    x.domain(data.map(function(d, i) {
                        xrecord[i] = d[breakdown[0].field];
                        return d[breakdown[0].field];
                    }));
                    y.domain([0, maxYValue]); /*------------------??????????????????icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeicdiff' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeicdiff' + pictype).node().getBBox().width; //let typesizey1=svg.select(`#pictype${pictype}`).node().getBBox().height;
                    // let totalValue = d3.sum(data, d => d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field])
                    var pictorialdata = data.map(function(d) {
                        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                    });
                    var pictorialdatapercent = [];
                    for (var i = 0; i < pictorialdata.length; i++) {
                        pictorialdatapercent[i] = parseFloat(pictorialdata[i] / maxYValue * 100).toFixed(0);
                    } /*------------------------------???????????????icon??????-------------------------------------*/
                    var chartsize = _this6.size();
                    var xpadding = 2;
                    var ypadding = 2;
                    var scalex = void 0;
                    var total = void 0;
                    if (chartsize === _size2.default.LARGE) {
                        total = 80;
                        scalex = 20;
                    }
                    if (chartsize === _size2.default.WIDE) {
                        total = 40;
                        scalex = 18;
                    }
                    if (chartsize === _size2.default.MIDDLE) {
                        total = 40;
                        scalex = 15;
                    }
                    if (chartsize === _size2.default.SMALL) {
                        total = 32;
                        scalex = 10;
                    }
                    var valuePict = [];
                    var myIndex = [];
                    for (var _i4 = 0; _i4 < pictorialdata.length; _i4++) {
                        valuePict[_i4] = Math.ceil(pictorialdatapercent[_i4] / 100 * total);
                        myIndex[_i4] = d3.range(valuePict[_i4]);
                    } /*-------------??????x??????????????????icon?????????--------------------------------*/
                    var scale = void 0;
                    svg.select('#pictypeicdiff' + pictype).attr("transform", function() {
                        scale = scalex / typesizex1;
                        return 'scale(' + scale + ')';
                    }); /*----------------??????????????????icon??????------------------------*/
                    var typesizex = svg.select('#pictypeicdiff' + pictype).node().getBBox().width;
                    var typesizey = svg.select('#pictypeicdiff' + pictype).node().getBBox().height;
                    var typex = svg.select('#pictypeicdiff' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeicdiff' + pictype).node().getBBox().y; // /*------------------??????????????????icon----------------------------*/
                    // for(let a=0;a<pictorialdata.length;a++){
                    //     svg.append("g")
                    //     .attr("id","pictoLayer")
                    //     .selectAll("use")
                    //     .data(data)
                    //     .enter()
                    //     .append("use")
                    //     .attr("xlink:href",`#pictype${pictype}`)
                    //     .attr("id",function(d,i){return "icontype"+i})  
                    //     .attr("x", function (d,i) { 
                    //         return x(d[breakdown[0].field])+x.bandwidth()/2-Math.abs(typex*scalex)-typesizex/2;
                    //         })
                    //     .attr("y", function(){return  height-typesizey-Math.abs(typey*scalex)})
                    // }
                    /*******************??????????????????icon******************************* */
                    var rowa = [];
                    scale1 = scale;
                    var _loop4 = function _loop4(_a4) {
                        rowa.push(Math.ceil(valuePict[_a4] / 4) - 1);
                        svg.append("g").attr("id", "pictoLayer").selectAll('.pic' + _a4).data(myIndex[_a4]).enter().append("use").attr("xlink:href", '#pictypeicdiff' + pictype).attr("fill", _color2.default.DEFAULT).attr("class", 'pic' + _a4).attr("id", function(d, i) {
                            return 'category' + _a4 + 'icon' + i;
                        }).attr("x", function(d, i) {
                            return -xpadding / 2 * 3 + d % 4 * (typesizex * scale1 + xpadding) + x.bandwidth() / 2 - Math.abs(typex * scale1) + x(xrecord[_a4]) - typesizex * scale1 * 2;
                        }).attr("y", function(d, i) {
                            return -ypadding + height - Math.floor(i / 4) * (typesizey * scale1 + ypadding) - Math.abs(typey * scale1) - typesizey * scale1;
                        });
                    };
                    for (var _a4 = 0; _a4 < pictorialdata.length; _a4++) {
                        _loop4(_a4);
                    } //???????????????
                    if (pictorialdata[0] && pictorialdata[1] && focus[0].value !== focus[1].value) {
                        svg.selectAll(".referenceL").data(data).join("line").attr('class', 'referenceL').attr('x1', function(d) {
                            return x(d[breakdown[0].field]) + x.bandwidth() / 2 - typesizex * scale1 * 2;
                        }).attr('y1', function(d, i) {
                            return height - (typesizey * scale1 + ypadding) * (rowa[i] + 1);
                        }).attr('x2', xwidthmax + 5).attr('y2', function(d, i) {
                            return height - (typesizey * scale1 + ypadding) * (rowa[i] + 1);
                        }).attr('stroke', _color2.default.DASHLINE).attr('stroke-width', 3).attr('stroke-dasharray', '5,5');
                        svg.selectAll(".referenceL1").data(data).join("line").attr('class', 'referenceL1').attr('x1', xwidthmax + 5 + 2).attr('y1', function(d, i) {
                            return height - (typesizey * scale1 + ypadding) * (rowa[i] + 1);
                        }).attr('x2', xwidthmax + 5 + 8).attr('y2', function(d, i) {
                            return height - (typesizey * scale1 + ypadding) * (rowa[i] + 1);
                        }).attr('stroke', _color2.default.AXIS).attr('stroke-width', 2);
                        svg.append("line").attr('class', 'verticalL').attr('x1', xwidthmax + 5 + 8).attr('y1', height - (typesizey * scale1 + ypadding) * (rowa[0] + 1)).attr('x2', xwidthmax + 5 + 8).attr('y2', height - (typesizey * scale1 + ypadding) * (rowa[1] + 1)).attr('stroke', _color2.default.AXIS).attr('stroke-width', 2);
                        if (_this6.size() !== _size2.default.SMALL) {
                            svg.append("text").attr("class", "differenceN").attr("font-family", "RobotoMono-Regular").attr("font-size", annotationSize).attr("text-anchor", 'start').attr("dominant-baseline", "middle").attr("fill", _color2.default.HIGHLIGHT).attr("font-weight", "bold").attr("x", xwidthmax + 5 + 15 + typesizex * scale1).attr("y", height - (typesizey * scale1 + ypadding) * ((rowa[0] + rowa[1]) / 2 + 1)).text((0, _format2.default)(Math.abs(pictorialdata[0] - pictorialdata[1])));
                        }
                    }
                    svg.append("g").selectAll(".textnumber").data(data).enter().append("text").attr("class", "textnumber").attr("font-family", "RobotoMono-Regular").attr("font-size", tickSize).attr("text-anchor", 'middle').attr("x", function(d) {
                            return x(d[breakdown[0].field]);
                        }).attr("y", function(d, i) { // return height-typesizey*pictorialdatapercent[i]/100;
                            return height - (typesizey * scale1 + ypadding) * (rowa[i] + 1);
                        }) //.attr("y", function (d) { return y(d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) })
                        .attr("dx", x.bandwidth() / 2).attr("dy", "-1em").text(function(d) {
                            return (0, _format2.default)(d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]);
                        }); // add the x Axis
                    var xAxis = svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + height + ')').call(d3.axisBottom(x)); //x Axis style
                    xAxis.select('.domain').remove(); //tick style
                    xAxis.selectAll('.tick line').remove();
                    xAxis.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', tickSize).attr('font-family', 'RobotoMono-Regular'); //center
                    var cardWidth = _this6.width();
                    var cardHeight = _this6.height();
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
                    return {
                        v: svg
                    };
                }();
                if ((typeof _ret7 === 'undefined' ? 'undefined' : _typeof(_ret7)) === "object") return _ret7.v;
            }
        }
    }]);
    return IsotypeCluster;
}(_chart2.default);
/** 
 * tickSize ???????????????
 * annotationSize ????????????
 * maxTicksNum xField???????????????
 **/
var getSizeBySize = function getSizeBySize(_this, factType) {
    var hasSeries = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var tickSize = void 0,
        annotationSize = void 0,
        axisWidth = void 0,
        maxTicksNum = void 0,
        maxXAxisH = void 0;
    switch (_this.size()) {
        case _size2.default.WIDE:
            tickSize = 15;
            annotationSize = 35;
            maxTicksNum = 10;
            axisWidth = 2;
            break;
        case _size2.default.MIDDLE:
            tickSize = 15;
            annotationSize = 25;
            maxTicksNum = 6;
            axisWidth = 2;
            break;
        case _size2.default.SMALL:
            tickSize = 10;
            annotationSize = 20;
            maxTicksNum = 5;
            axisWidth = 1.5;
            break;
        case _size2.default.LARGE:
        default:
            tickSize = 20;
            annotationSize = 50;
            maxTicksNum = 10;
            axisWidth = 3;
            break;
    }
    var margin = void 0;
    switch (_this.size()) {
        case _size2.default.LARGE:
            margin = {
                top: 20,
                right: 40,
                bottom: hasSeries ? 80 : 20,
                left: 40
            };
            maxXAxisH = 20;
            if (factType === "distribution" || factType === "trend") {
                margin = {
                    top: 40,
                    right: 40,
                    bottom: 80,
                    left: 40
                };
            }
            if (factType === "difference") {
                margin = {
                    top: 20,
                    right: 40,
                    bottom: 20,
                    left: 60
                };
            }
            if (factType === "extreme") {
                margin = {
                    top: 20,
                    right: 40,
                    bottom: 80,
                    left: 40
                };
            }
            if (factType === "outlier" || factType === "value") {
                margin = {
                    top: 20,
                    right: 50,
                    bottom: 40,
                    left: 40
                };
            }
            if (factType === "proportion") {
                margin = {
                    top: 40,
                    right: 40,
                    bottom: 40,
                    left: 40
                };
            }
            if (factType === "categorization") {
                margin = {
                    top: 60,
                    right: 40,
                    bottom: 80,
                    left: 45
                };
            }
            break;
        case _size2.default.WIDE:
            margin = {
                top: 10,
                right: hasSeries ? 120 : 20,
                bottom: 20,
                left: 20
            };
            maxXAxisH = 10;
            if (factType === "distribution" || factType === "trend") {
                margin = {
                    top: hasSeries ? 5 : 20,
                    right: 30,
                    bottom: 40,
                    left: 30
                };
            }
            if (factType === "difference") {
                margin = {
                    top: 10,
                    right: 20,
                    bottom: 20,
                    left: 30
                };
            }
            if (factType === "extreme") {
                margin = {
                    top: 7,
                    right: 30,
                    bottom: 40,
                    left: 30
                };
            }
            if (factType === "outlier" || factType === "value") {
                margin = {
                    top: 7,
                    right: 30,
                    bottom: 20,
                    left: 30
                };
            }
            if (factType === "proportion") {
                margin = {
                    top: 20,
                    right: 50,
                    bottom: 20,
                    left: 50
                };
            }
            if (factType === "categorization") {
                margin = {
                    top: 10,
                    right: 30,
                    bottom: 40,
                    left: 30
                };
            }
            break;
        case _size2.default.MIDDLE:
            margin = {
                top: 10,
                right: 20,
                bottom: hasSeries ? 40 : 10,
                left: 20
            };
            maxXAxisH = 10;
            if (factType === "distribution" || factType === "trend") {
                margin = {
                    top: 10,
                    right: 20,
                    bottom: hasSeries ? 35 : 35,
                    left: 20
                };
            }
            if (factType === "difference") {
                margin = {
                    top: 10,
                    right: 20,
                    bottom: 10,
                    left: 30
                };
            }
            if (factType === "extreme") {
                margin = {
                    top: 5,
                    right: 20,
                    bottom: 35,
                    left: 20
                };
            }
            if (factType === "outlier" || factType === "value") {
                margin = {
                    top: 5,
                    right: 25,
                    bottom: 15,
                    left: 20
                };
            }
            if (factType === "proportion") {
                margin = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20
                };
            }
            if (factType === "categorization") {
                margin = {
                    top: 10,
                    right: 20,
                    bottom: 35,
                    left: 25
                };
            }
            break;
        case _size2.default.SMALL:
            margin = {
                top: 5,
                right: 5,
                bottom: hasSeries ? 30 : 8,
                left: 5
            };
            maxXAxisH = 8;
            if (factType === "distribution" || factType === "trend") {
                margin = {
                    top: 10,
                    right: 10,
                    bottom: 25,
                    left: 10
                };
            }
            if (factType === "extreme") {
                margin = {
                    top: 2,
                    right: 15,
                    bottom: 25,
                    left: 15
                };
            }
            if (factType === "outlier" || factType === "value") {
                margin = {
                    top: 2,
                    right: 15,
                    bottom: 15,
                    left: 15
                };
            }
            if (factType === "proportion") {
                margin = {
                    top: 15,
                    right: 5,
                    bottom: 10,
                    left: 5
                };
            }
            if (factType === "categorization") {
                margin = {
                    top: 10,
                    right: 15,
                    bottom: 25,
                    left: 15
                };
            }
            break;
        default:
            margin = {
                top: 20,
                right: 40,
                bottom: 20,
                left: 40
            };
            maxXAxisH = 20;
            break;
    }
    return {
        chartSize: {
            width: _this.width(),
            height: _this.height()
        },
        tickSize: tickSize,
        annotationSize: annotationSize,
        axisWidth: axisWidth,
        margin: margin,
        maxTicksNum: maxTicksNum,
        maxXAxisH: maxXAxisH
    };
};
var getMaxYValue = function getMaxYValue(factdata, measure) {
    var maxYValue = d3.max(factdata, function(d) {
        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
    });
    if (maxYValue / 1000000 >= 1) {
        maxYValue = Math.ceil(maxYValue / 1000000) * 1000000;
    } else if (maxYValue / 1000 >= 1) {
        maxYValue = Math.ceil(maxYValue / 1000) * 1000;
    }
    return maxYValue;
};
/***
 * ?????? yAxis????????????????????????
 */
var initYAixsStyle = function initYAixsStyle(startY, endY, maxY, svg, tickStrokeWidth, tickFontSize, margin) {
    svg.selectAll(".yAxis").remove();
    var mockY = d3.scaleLinear().nice().range([startY, endY]).domain([0, maxY]).clamp(true);
    var ticks = 6; //inital ???2?????????
    if (startY - endY < 50) { //50px 
        ticks = 4; //todo ????????????
    }
    svg.append("g").lower().attr('class', 'yAxis').call(d3.axisLeft(mockY).ticks(ticks).tickSize(tickStrokeWidth * 2).tickPadding(tickStrokeWidth * 2).tickFormat(function(d) {
        if (d / 1000000 >= 1) {
            d = d / 1000000 + "M";
        } else if (d / 1000 >= 1) {
            d = d / 1000 + "K";
        }
        return d;
    })).call(function(g) {
        var YAxislineData = [
            [0, startY],
            [0, endY],
            [-tickStrokeWidth * 2, endY]
        ];
        var newYD = d3.line()(YAxislineData); //??????d
        g.select('.domain').attr("d", newYD).attr('stroke', 'black').attr("stroke-width", tickStrokeWidth);
        g.selectAll('.tick line').attr('stroke', 'black').attr("stroke-width", tickStrokeWidth);
        g.select('.tick line').remove();
        g.selectAll('.tick text').attr('font-size', tickFontSize).attr('font-family', 'RobotoMono-Regular').attr('fill', 'black').attr('text-anchor', 'end');
    }); /*****the end*****/ // let measuredYFieldsWidth = svg.select(".yAxis").node().getBBox().width + margin.left;
    //??????y
    svg.select(".yAxis").attr("transform", 'translate(0,0)');
};
exports.default = IsotypeCluster;