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
var NUMFONT = "Arial-Regular";
var IsotypeBar = function(_Chart) {
    _inherits(IsotypeBar, _Chart);

    function IsotypeBar() {
        _classCallCheck(this, IsotypeBar);
        return _possibleConstructorReturn(this, (IsotypeBar.__proto__ || Object.getPrototypeOf(IsotypeBar)).apply(this, arguments));
    }
    _createClass(IsotypeBar, [{
        key: 'displayDistribution',
        /*----------------------------------------------------------------------------------------------------------*/ value: function displayDistribution() {
            var _this3 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret = function() {
                    var factdata = _this3.factdata();
                    var measure = _this3.measure();
                    var pictype = measure[0].pictype; //获取相应的icon名称
                    var breakdown = _this3.breakdown();
                    var hasSeries = false;
                    if (breakdown[1] && breakdown[1].field) hasSeries = true; // set the dimensions and margins of the graph
                    var _getSizeBySize = getSizeBySize(_this3, "distribution", hasSeries),
                        chartSize = _getSizeBySize.chartSize,
                        tickSize = _getSizeBySize.tickSize,
                        axisWidth = _getSizeBySize.axisWidth,
                        margin = _getSizeBySize.margin,
                        maxTicksNum = _getSizeBySize.maxTicksNum;
                    var width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom;
                    var svg = d3.select(_this3.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypebarDistribution").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                    if (_this3.measure().length > 1 || hasSeries) {
                        return {
                            v: svg
                        };
                    } /*----------------------处理数据------------------------*/
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
                    } /*------------------通过名称找寻icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeibdis' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeibdis' + pictype).node().getBoundingClientRect().width;
                    var typesizey1 = svg.select('#pictypeibdis' + pictype).node().getBoundingClientRect().height; /*-------------------默认Gradient------------------------------*/ // Define the gradient
                    var gradient = [];
                    for (var _i = 0; _i < pictorialdata.length; _i++) {
                        gradient[_i] = svg.append("svg:defs").append("svg:linearGradient").attr("id", 'icontypeibdis' + _i).attr("x1", "0").attr("y1", "1").attr("x2", "0").attr("y2", "0").attr("spreadMethod", "pad"); // Define the gradient colors
                        gradient[_i].append("svg:stop").attr("offset", "0%").attr("stop-color", function() {
                            return _color2.default.DEFAULT;
                        }).attr("stop-opacity", 1);
                    } // append legend before chart 
                    var chartMeasuredWidth = width; //inital 
                    // set the ranges
                    var offsetY = _this3.size() === 'large' ? 5 : 2; //离x轴的距离     
                    var ysizescale = height - offsetY; //icon长度的拉伸
                    if (_this3.size() === "large") ysizescale = height / 3 * 2 - offsetY;
                    var x = d3.scaleBand().range([0, width]).domain(data.map(function(d) {
                        return d[breakdown[0].field];
                    })).padding(0.2);
                    var y = d3.scaleLinear().nice().range([ysizescale, 0]).domain([0, maxYValue]).clamp(true); /*-------------根据x的数据来进行icon的缩放--------------------------------*/
                    var scalex = void 0;
                    var scaley = void 0;
                    svg.select('#pictypeibdis' + pictype).attr("transform", function() {
                        scalex = x.bandwidth() / typesizex1;
                        scaley = y(0) / typesizey1;
                        return 'scale(' + scalex + ',' + scaley + ')';
                    }); /*----------------计算缩放后的icon长宽------------------------*/
                    var typesizex = svg.select('#pictypeibdis' + pictype).node().getBoundingClientRect().width; // let typesizey=svg.select(`#pictype${pictype}`).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictypeibdis' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeibdis' + pictype).node().getBBox().y; /*------------------在图表中添加icon----------------------------*/
                    svg.append("g").attr("id", "pictoLayer").selectAll("use").data(pictorialx).enter().append("use").attr("xlink:href", '#pictypeibdis' + pictype).attr("id", function(d, i) {
                        return "icontypeibdis" + i;
                    }).attr("x", function(d, i) {
                        return x(d) + x.bandwidth() / 2 - Math.abs(typex * scalex) - typesizex / 2;
                    }).attr("y", function(d) {
                        return y(maxYValue) - Math.abs(typey * scaley);
                    });
                    var _loop = function _loop(_i2) {
                        svg.selectAll("#icontypeibdis" + _i2).attr("fill", function(d) {
                            gradient[_i2].append("svg:stop").attr("offset", pictorialdatapercent[_i2] + '%').attr("stop-color", _color2.default.DEFAULT).attr("stop-opacity", 1);
                            gradient[_i2].append("svg:stop").attr("offset", pictorialdatapercent[_i2] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            gradient[_i2].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            return 'url(#icontypeibdis' + _i2 + ')';
                        });
                    };
                    for (var _i2 = 0; _i2 < pictorialdata.length; _i2++) {
                        _loop(_i2);
                    } //bar value 超多一定数量，不显示bar value
                    if (!hasSeries && _this3.size() !== 'small' && data.length < maxTicksNum) {
                        svg.append("g").selectAll("text").data(data).enter().append("text").attr("font-family", NUMFONT).attr("font-size", tickSize).attr("text-anchor", 'middle').attr("x", function(d) {
                            return x(d[breakdown[0].field]);
                        }).attr("y", function(d) {
                            return y(d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field]);
                        }).attr("dx", x.bandwidth() / 2).attr("dy", "-1em").text(function(d) {
                            return (0, _format2.default)(d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field]);
                        });
                    } // add the x Axis
                    var isRotate = false;
                    var xAxis = svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + (ysizescale + offsetY) + ')'); //间隔显示ticks 
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
                        var newD = d3.line()(xAxislineData); //生成d
                        g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                        g.selectAll('.tick line').attr('stroke', 'black').attr('y2', 6 * chartSize.height / 320).attr("stroke-width", axisWidth);
                        g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', tickSize).attr('font-family', NUMFONT).attr('fill', 'black').attr('text-anchor', 'middle').each(function(d, i) {
                            var text = d3.select(this).node();
                            if (text.getBBox().width > x.step()) {
                                isRotate = true;
                            }
                        });
                    }); //超过bar宽度就旋转45度
                    if (isRotate) {
                        svg.selectAll(".xAxis .tick text").each(function(d, i) {
                            var textNode = d3.select(this).node();
                            textNode.setAttribute("text-anchor", "end");
                            textNode.setAttribute("transform-origin", '0 ' + textNode.getBBox().y);
                            textNode.setAttribute("transform", 'rotate(-45)');
                        });
                    } //使图表居中
                    //  let a=d3.select("#isotypebarDistribution").node().getBoundingClientRect().width;
                    //  let b=d3.select("#isotypebarDistribution").node().getBoundingClientRect().height;      
                    //  let c=d3.select("#isotypebarDistribution").node().getBoundingClientRect().left;      
                    //  let d=d3.select("svg").node().getBoundingClientRect().left; 
                    //  let e=d3.select("#isotypebarDistribution").node().getBoundingClientRect().top;      
                    //  let f=d3.select("svg").node().getBoundingClientRect().top; 
                    //  let transx=d-c+chartSize.width/2-a/2;
                    //  let transy=f-e+chartSize.height/2-b/2;
                    //  d3.select("#isotypebarDistribution").attr("transform", ` translate(${margin.left+transx},${margin.top+ transy}) `)       
                    // return svg;
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
                    return {
                        v: svg
                    };
                }();
                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        } /*---------------------------------------------------------------------------------------------------------*/
    }, {
        key: 'displayOutlier',
        value: function displayOutlier() {
            var _this4 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret3 = function() {
                    var factdata = _this4.factdata();
                    var measure = _this4.measure();
                    var breakdown = _this4.breakdown();
                    var focus = _this4.focus();
                    var pictype = measure[0].pictype; //获取相应的icon名称
                    // set the dimensions and margins of the graph
                    var _getSizeBySize2 = getSizeBySize(_this4, "outlier"),
                        chartSize = _getSizeBySize2.chartSize,
                        axisWidth = _getSizeBySize2.axisWidth,
                        annotationSize = _getSizeBySize2.annotationSize,
                        margin = _getSizeBySize2.margin,
                        width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom; //console.log("height", chartSize.height, margin.top, margin.bottom)
                    var svg = d3.select(_this4.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypebarOutlier").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                    if (_this4.measure().length > 1 || _this4.breakdown().length > 1) {
                        return {
                            v: svg
                        };
                    } /*----------------------处理数据------------------------*/
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
                    } /*------------------通过名称找寻icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeibo' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeibo' + pictype).node().getBoundingClientRect().width;
                    var typesizey1 = svg.select('#pictypeibo' + pictype).node().getBoundingClientRect().height; /*-------------------默认Gradient------------------------------*/ //判断outlier的位置
                    var aa = [];
                    data.forEach(function(element, index) {
                        if (element[focus[0].field] === focus[0].value) aa.push(index);
                    }); // Define the gradient
                    var gradient = [];
                    var _loop2 = function _loop2(_i3) {
                        gradient[_i3] = svg.append("svg:defs").append("svg:linearGradient").attr("id", 'icontypeibo' + _i3).attr("x1", "0").attr("y1", "1").attr("x2", "0").attr("y2", "0").attr("spreadMethod", "pad"); // Define the gradient colors
                        gradient[_i3].append("svg:stop").attr("offset", "0%").attr("stop-color", function() {
                            if (_i3 === aa[0]) return _color2.default.HIGHLIGHT;
                            else return _color2.default.DEFAULT;
                        }).attr("stop-opacity", 1);
                    };
                    for (var _i3 = 0; _i3 < pictorialdata.length; _i3++) {
                        _loop2(_i3);
                    } // set the ranges
                    var x = void 0;
                    var y = void 0;
                    var offsetY = _this4.size() === 'large' ? 5 : 2; //离x轴的距离
                    var ysizescale = height / 3 * 2 - offsetY; //icon长度的拉伸
                    if (_this4.size() === "large") ysizescale = height / 3 * 2 - offsetY;
                    x = d3.scaleBand().range([0, width]).domain(data.map(function(d) {
                        return d[breakdown[0].field];
                    })).padding(0.5);
                    y = d3.scaleLinear().nice() //.range([height - offsetY, 0])
                        .range([ysizescale, 40 * chartSize.height / 320 + offsetY]).domain([0, maxYValue]).clamp(true); /*-------------根据x的数据来进行icon的缩放--------------------------------*/
                    var scalex = void 0;
                    var scaley = void 0;
                    svg.select('#pictypeibo' + pictype).attr("transform", function() {
                        scalex = x.bandwidth() / typesizex1;
                        scaley = (y(0) - y(maxYValue)) / typesizey1;
                        return 'scale(' + scalex + ',' + scaley + ')';
                    }); /*----------------计算缩放后的icon长宽------------------------*/
                    var typesizex = svg.select('#pictypeibo' + pictype).node().getBoundingClientRect().width; // let typesizey=svg.select(`#pictype${pictype}`).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictypeibo' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeibo' + pictype).node().getBBox().y; /*------------------在图表中添加icon----------------------------*/
                    svg.append("g").attr("id", "pictoLayer").selectAll("use").data(pictorialx).enter().append("use").attr("xlink:href", '#pictypeibo' + pictype).attr("id", function(d, i) {
                        return "icontypeibo" + i;
                    }).attr("x", function(d, i) {
                        return x(d) + x.bandwidth() / 2 - Math.abs(typex * scalex) - typesizex / 2;
                    }).attr("y", function(d) {
                        return y(maxYValue) - Math.abs(typey * scaley);
                    });
                    var _loop3 = function _loop3(_i4) {
                        svg.selectAll("#icontypeibo" + _i4).attr("fill", function(d) {
                            gradient[_i4].append("svg:stop").attr("offset", pictorialdatapercent[_i4] + '%').attr("stop-color", function() {
                                if (_i4 === aa[0]) return _color2.default.HIGHLIGHT;
                                else return _color2.default.DEFAULT;
                            }).attr("stop-opacity", 1);
                            gradient[_i4].append("svg:stop").attr("offset", pictorialdatapercent[_i4] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            gradient[_i4].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            return 'url(#icontypeibo' + _i4 + ')';
                        });
                    };
                    for (var _i4 = 0; _i4 < pictorialdata.length; _i4++) {
                        _loop3(_i4);
                    } // add the x Axis
                    svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + (ysizescale + offsetY) + ')').call(d3.axisBottom(x)).call(function(g) {
                        var xAxislineData = [
                            [0, 0],
                            [width, 0]
                        ];
                        var newD = d3.line()(xAxislineData); //生成d
                        g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                        g.selectAll('.tick line').remove();
                        g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', annotationSize).attr("font-weight", "bold").attr('font-family', NUMFONT).attr('fill', function(d) {
                            return d === focus[0].value ? _color2.default.HIGHLIGHT : 'black';
                        }).attr('text-anchor', 'middle').attr('display', function(d) {
                            return d === focus[0].value ? 'block' : 'none';
                        });
                    }); // //tool tip
                    var focusValueArray = factdata.filter(function(d) {
                        return d[focus[0].field] === focus[0].value;
                    });
                    var focusData = focusValueArray[0];
                    var toolTipX = x(focus[0].value) + x.bandwidth() / 2, //箭头中心所在x的位置
                        toolTipY = y(maxYValue) - 40 * chartSize.height / 640, //toolTipY = y(focusData[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) - 40 * chartSize.height / 320, //箭头中心所在y的位置
                        toolTipValue = (0, _format2.default)(focusData[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]);
                    (0, _tooltip2.default)(toolTipX, toolTipY, toolTipValue, svg, chartSize, annotationSize); //    svg.append("text")
                    //     .attr("class","outliertext")
                    //     .attr("text-anchor", "middle")
                    //     .attr('font-size', annotationSize)
                    //     .attr("font-weight","bold")
                    //     .attr('font-family', NUMFONT)
                    //     .attr('fill',  Color.HIGHLIGHT)
                    //     .attr("x", x(focus[0].value) + x.bandwidth() / 2)
                    //     //.attr("y", y(focusData[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) - 40 * chartSize.height / 320)
                    //     .attr("y",y(maxYValue))
                    //     .attr("dy",'-0.5em')
                    //     .text(toolTipValue)
                    //xField 
                    // if (this.size() !== 'small') {
                    //     svg.append("text")
                    //         .attr("class", "xField")
                    //         .attr("text-anchor", "start")
                    //         .attr("transform", `translate(${width + margin.right / 4},${height})`)
                    //         .text(breakdown[0].field)
                    //         .attr('y', '0.5em')
                    //         .attr('font-size', tickSize)
                    //         .attr('font-family', NUMFONT);
                    // }
                    //使图表居中
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
                    return {
                        v: svg
                    };
                }();
                if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
            }
        } /*-------------------------------------------------------------------------------------------------------------------------------- */
    }, {
        key: 'displayCategorization',
        value: function displayCategorization() {
            var _this5 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret6 = function() {
                    var factdata = _this5.factdata();
                    var measure = _this5.measure();
                    var pictype = measure[0].pictype; //获取相应的icon名称
                    var breakdown = _this5.breakdown();
                    var hasSeries = false;
                    if (breakdown[1] && breakdown[1].field) hasSeries = true; // set the dimensions and margins of the graph
                    var _getSizeBySize3 = getSizeBySize(_this5, "categorization", hasSeries),
                        chartSize = _getSizeBySize3.chartSize,
                        tickSize = _getSizeBySize3.tickSize,
                        axisWidth = _getSizeBySize3.axisWidth,
                        margin = _getSizeBySize3.margin,
                        maxTicksNum = _getSizeBySize3.maxTicksNum;
                    var width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom;
                    var svg = d3.select(_this5.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypebarCategorization").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                    if (_this5.measure().length > 1 || hasSeries) {
                        return {
                            v: svg
                        };
                    } /*----------------------处理数据------------------------*/
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
                    } /*------------------通过名称找寻icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeibcate' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeibcate' + pictype).node().getBoundingClientRect().width;
                    var typesizey1 = svg.select('#pictypeibcate' + pictype).node().getBoundingClientRect().height; /*-------------------默认Gradient------------------------------*/ // Define the gradient
                    var gradient = [];
                    var _loop4 = function _loop4(_i5) {
                        gradient[_i5] = svg.append("svg:defs").append("svg:linearGradient").attr("id", 'icontypeibcate' + _i5).attr("x1", "0").attr("y1", "1").attr("x2", "0").attr("y2", "0").attr("spreadMethod", "pad"); // Define the gradient colors
                        gradient[_i5].append("svg:stop").attr("offset", "0%").attr("stop-color", function() {
                            return _color2.default.CATEGORICAL[_i5 % 10];
                        }).attr("stop-opacity", 1);
                    };
                    for (var _i5 = 0; _i5 < pictorialdata.length; _i5++) {
                        _loop4(_i5);
                    } // append legend before chart 
                    var chartMeasuredWidth = width; //inital 
                    // set the ranges
                    var offsetY = _this5.size() === 'large' ? 5 : 2; //离x轴的距离     
                    var ysizescale = height - offsetY; //icon长度的拉伸
                    if (_this5.size() === "large") ysizescale = height / 3 * 2 - offsetY;
                    var x = d3.scaleBand().range([0, width]).domain(data.map(function(d) {
                        return d[breakdown[0].field];
                    })).padding(0.2);
                    var y = d3.scaleLinear().nice().range([ysizescale, 0]).domain([0, maxYValue]).clamp(true); /*-------------根据x的数据来进行icon的缩放--------------------------------*/
                    var scalex = void 0;
                    var scaley = void 0;
                    svg.select('#pictypeibcate' + pictype).attr("transform", function() {
                        scalex = x.bandwidth() / typesizex1;
                        scaley = y(0) / typesizey1;
                        return 'scale(' + scalex + ',' + scaley + ')';
                    }); /*----------------计算缩放后的icon长宽------------------------*/
                    var typesizex = svg.select('#pictypeibcate' + pictype).node().getBoundingClientRect().width; // let typesizey=svg.select(`#pictype${pictype}`).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictypeibcate' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeibcate' + pictype).node().getBBox().y;
                    svg.append("g").attr("id", "pictoLayer").selectAll("use").data(pictorialx).enter().append("use").attr("xlink:href", '#pictypeibcate' + pictype).attr("id", function(d, i) {
                        return "icontypeibcate" + i;
                    }).attr("x", function(d, i) {
                        return x(d) + x.bandwidth() / 2 - Math.abs(typex * scalex) - typesizex / 2;
                    }).attr("y", function(d) {
                        return y(maxYValue) - Math.abs(typey * scaley);
                    });
                    var _loop5 = function _loop5(_i6) {
                        svg.selectAll("#icontypeibcate" + _i6).attr("fill", function(d) {
                            gradient[_i6].append("svg:stop").attr("offset", pictorialdatapercent[_i6] + '%').attr("stop-color", _color2.default.CATEGORICAL[_i6 % 10]).attr("stop-opacity", 1);
                            gradient[_i6].append("svg:stop").attr("offset", pictorialdatapercent[_i6] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            gradient[_i6].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            return 'url(#icontypeibcate' + _i6 + ')';
                        });
                    };
                    for (var _i6 = 0; _i6 < pictorialdata.length; _i6++) {
                        _loop5(_i6);
                    } //bar value 超多一定数量，不显示bar value
                    if (!hasSeries && _this5.size() !== 'small' && data.length < maxTicksNum) {
                        svg.append("g").selectAll("text").data(data).enter().append("text").attr("font-family", NUMFONT).attr("font-size", tickSize).attr("text-anchor", 'middle').attr("x", function(d) {
                            return x(d[breakdown[0].field]);
                        }).attr("y", function(d) {
                            return y(d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field]);
                        }).attr("dx", x.bandwidth() / 2).attr("dy", "-1em").text(function(d) {
                            return (0, _format2.default)(d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field]);
                        });
                    } // add the x Axis
                    var isRotate = false;
                    var xAxis = svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + (ysizescale + offsetY) + ')'); //间隔显示ticks 
                    if (data.length > maxTicksNum) {
                        var selectedTickValueArray = [];
                        var ordinal = d3.scalePoint().domain(d3.range(0, maxTicksNum)).rangeRound([0, data.length - 1]);
                        for (var _i7 = 0; _i7 < maxTicksNum; _i7++) {
                            selectedTickValueArray.push(data[ordinal(_i7)][breakdown[0].field]);
                        }
                        xAxis.call(d3.axisBottom(x).tickValues(selectedTickValueArray));
                    } else {
                        xAxis.call(d3.axisBottom(x));
                    }
                    xAxis.call(function(g) {
                        var xAxislineData = [
                            [0, 0],
                            [hasSeries ? chartMeasuredWidth : width, 0]
                        ];
                        var newD = d3.line()(xAxislineData); //生成d
                        g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                        g.selectAll('.tick line').attr('stroke', 'black').attr('y2', 6 * chartSize.height / 320).attr("stroke-width", axisWidth);
                        g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', tickSize).attr('font-family', NUMFONT).attr('fill', 'black').attr('text-anchor', 'middle').each(function(d, i) {
                            var text = d3.select(this).node();
                            if (text.getBBox().width > x.step()) {
                                isRotate = true;
                            }
                        });
                    }); //超过bar宽度就旋转45度
                    if (isRotate) {
                        svg.selectAll(".xAxis .tick text").each(function(d, i) {
                            var textNode = d3.select(this).node();
                            textNode.setAttribute("text-anchor", "end");
                            textNode.setAttribute("transform-origin", '0 ' + textNode.getBBox().y);
                            textNode.setAttribute("transform", 'rotate(-45)');
                        });
                    } //使图表居中
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
                    return {
                        v: svg
                    };
                }();
                if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object") return _ret6.v;
            }
        } /*-------------------------------------------------------------------------------------------------*/
    }, {
        key: 'displayExtreme',
        value: function displayExtreme() {
            var _this6 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret9 = function() {
                    var factdata = _this6.factdata();
                    var measure = _this6.measure();
                    var breakdown = _this6.breakdown(); // let focus = this.focus();
                    var pictype = measure[0].pictype; //获取相应的icon名称
                    // set the dimensions and margins of the graph
                    var _getSizeBySize4 = getSizeBySize(_this6, "extreme"),
                        chartSize = _getSizeBySize4.chartSize,
                        axisWidth = _getSizeBySize4.axisWidth,
                        annotationSize = _getSizeBySize4.annotationSize,
                        margin = _getSizeBySize4.margin,
                        width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom; //console.log("height", chartSize.height, margin.top, margin.bottom)
                    var svg = d3.select(_this6.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypebarExtreme").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                    if (_this6.measure().length > 1 || _this6.breakdown().length > 1) {
                        return {
                            v: svg
                        };
                    } /*----------------------处理数据------------------------*/
                    var data = factdata;
                    var maxYValue = getMaxYValue(factdata, measure);
                    var pictorialdata = data.map(function(d) {
                        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                    });
                    pictorialdata = pictorialdata.slice(0, 10);
                    var maxdata = d3.max(pictorialdata); //判断extreme的位置
                    var aa = [];
                    data.forEach(function(element, index) {
                        if (element[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field] === maxdata) aa.push(index);
                    });
                    var pictorialx = data.map(function(d) {
                        return d[breakdown[0].field];
                    });
                    pictorialx = pictorialx.slice(0, 10);
                    var pictorialdatapercent = [];
                    for (var i = 0; i < pictorialdata.length; i++) {
                        pictorialdatapercent[i] = parseFloat(pictorialdata[i] / maxYValue * 100).toFixed(2);
                    } /*------------------通过名称找寻icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeibex' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeibex' + pictype).node().getBoundingClientRect().width;
                    var typesizey1 = svg.select('#pictypeibex' + pictype).node().getBoundingClientRect().height; /*-------------------默认Gradient------------------------------*/ // Define the gradient
                    var gradient = [];
                    var _loop6 = function _loop6(_i8) {
                        gradient[_i8] = svg.append("svg:defs").append("svg:linearGradient").attr("id", 'icontypeibex' + _i8).attr("x1", "0").attr("y1", "1").attr("x2", "0").attr("y2", "0").attr("spreadMethod", "pad"); // Define the gradient colors
                        gradient[_i8].append("svg:stop").attr("offset", "0%").attr("stop-color", function() {
                            if (_i8 === aa[0]) return _color2.default.HIGHLIGHT;
                            else return _color2.default.DEFAULT;
                        }).attr("stop-opacity", 1);
                    };
                    for (var _i8 = 0; _i8 < pictorialdata.length; _i8++) {
                        _loop6(_i8);
                    } // set the ranges
                    var x = void 0;
                    var y = void 0;
                    var offsetY = _this6.size() === 'large' ? 5 : 2; //离x轴的距离
                    var ysizescale = height / 3 * 2 - offsetY; //icon长度的拉伸
                    x = d3.scaleBand().range([0, width]).domain(data.map(function(d) {
                        return d[breakdown[0].field];
                    })).padding(0.5);
                    y = d3.scaleLinear().nice() //.range([height - offsetY, 0])
                        .range([ysizescale, 40 * chartSize.height / 320 + offsetY]).domain([0, maxYValue]).clamp(true); /*-------------根据x的数据来进行icon的缩放--------------------------------*/
                    var scalex = void 0;
                    var scaley = void 0;
                    svg.select('#pictypeibex' + pictype).attr("transform", function() {
                        scalex = x.bandwidth() / typesizex1;
                        scaley = (y(0) - y(maxYValue)) / typesizey1;
                        return 'scale(' + scalex + ',' + scaley + ')';
                    }); /*----------------计算缩放后的icon长宽------------------------*/
                    var typesizex = svg.select('#pictypeibex' + pictype).node().getBoundingClientRect().width; // let typesizey=svg.select(`#pictype${pictype}`).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictypeibex' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeibex' + pictype).node().getBBox().y; /*------------------在图表中添加icon----------------------------*/
                    svg.append("g").attr("id", "pictoLayer").selectAll("use").data(pictorialx).enter().append("use").attr("xlink:href", '#pictypeibex' + pictype).attr("id", function(d, i) {
                        return "icontypeibex" + i;
                    }).attr("x", function(d, i) {
                        return x(d) + x.bandwidth() / 2 - Math.abs(typex * scalex) - typesizex / 2;
                    }).attr("y", function(d) {
                        return y(maxYValue) - Math.abs(typey * scaley);
                    });
                    var _loop7 = function _loop7(_i9) {
                        svg.selectAll("#icontypeibex" + _i9).attr("fill", function(d) {
                            gradient[_i9].append("svg:stop").attr("offset", pictorialdatapercent[_i9] + '%').attr("stop-color", function() {
                                if (_i9 === aa[0]) return _color2.default.HIGHLIGHT;
                                else return _color2.default.DEFAULT;
                            }).attr("stop-opacity", 1);
                            gradient[_i9].append("svg:stop").attr("offset", pictorialdatapercent[_i9] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            gradient[_i9].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            return 'url(#icontypeibex' + _i9 + ')';
                        });
                    };
                    for (var _i9 = 0; _i9 < pictorialdata.length; _i9++) {
                        _loop7(_i9);
                    } // add the x Axis
                    svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + (ysizescale + offsetY) + ')').call(d3.axisBottom(x)).call(function(g) {
                        var xAxislineData = [
                            [0, 0],
                            [width, 0]
                        ];
                        var newD = d3.line()(xAxislineData); //生成d
                        g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                        g.selectAll('.tick line').remove();
                        g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', annotationSize).attr("font-weight", "bold").attr('font-family', NUMFONT).attr('fill', function(d) {
                            return d === pictorialx[aa[0]] ? _color2.default.HIGHLIGHT : 'black';
                        }).attr('text-anchor', 'middle').attr('display', function(d) {
                            return d === pictorialx[aa[0]] ? 'block' : 'none';
                        });
                    }); //tool tip
                    var focusValueArray = factdata.filter(function(d) {
                        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field] === maxdata;
                    });
                    var focusData = focusValueArray[0];
                    var toolTipX = x(pictorialx[aa[0]]) + x.bandwidth() / 2, //箭头中心所在x的位置
                        toolTipY = y(maxYValue) - 40 * chartSize.height / 640, // toolTipY = y(focusData[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) - 40 * chartSize.height / 320, //箭头中心所在y的位置
                        toolTipValue = (0, _format2.default)(focusData[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]);
                    (0, _tooltip2.default)(toolTipX, toolTipY, toolTipValue, svg, chartSize, annotationSize); //    svg.append("text")
                    //    .attr("class","extremetext")
                    //    .attr("text-anchor", "middle")
                    //    .attr('font-size', annotationSize)
                    //    .attr("font-weight","bold")
                    //    .attr('font-family', NUMFONT)
                    //    .attr('fill',  Color.HIGHLIGHT)
                    //    .attr("x",x(pictorialx[aa[0]]) + x.bandwidth() / 2 + x.bandwidth() / 2)
                    //    //.attr("y", y(focusData[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) - 40 * chartSize.height / 320)
                    //    .attr("y",y(maxYValue))
                    //    .attr("dy",'-0.5em')
                    //    .text(toolTipValue)
                    //xField 
                    // if (this.size() !== 'small') {
                    //     svg.append("text")
                    //         .attr("class", "xField")
                    //         .attr("text-anchor", "start")
                    //         .attr("transform", `translate(${width + margin.right / 4},${height})`)
                    //         .text(breakdown[0].field)
                    //         .attr('y', '0.5em')
                    //         .attr('font-size', tickSize)
                    //         .attr('font-family', NUMFONT);
                    // }
                    //使图表居中
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
                    return {
                        v: svg
                    };
                }();
                if ((typeof _ret9 === 'undefined' ? 'undefined' : _typeof(_ret9)) === "object") return _ret9.v;
            }
        } /*-------------------------------------------------------------------------------------------*/
    }, {
        key: 'displayTrend',
        value: function displayTrend() {
            var _this7 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret12 = function() {
                    var getTanDeg = function getTanDeg(tan) {
                        var result = Math.atan(tan) / (Math.PI / 180);
                        result = Math.round(result);
                        return result;
                    };
                    var factdata = _this7.factdata();
                    var measure = _this7.measure();
                    var pictype = measure[0].pictype; //获取相应的icon名称
                    var breakdown = _this7.breakdown();
                    var hasSeries = false;
                    if (breakdown[1] && breakdown[1].field) hasSeries = true; // set the dimensions and margins of the graph
                    var _getSizeBySize5 = getSizeBySize(_this7, "trend", hasSeries),
                        chartSize = _getSizeBySize5.chartSize,
                        tickSize = _getSizeBySize5.tickSize,
                        axisWidth = _getSizeBySize5.axisWidth,
                        margin = _getSizeBySize5.margin,
                        maxTicksNum = _getSizeBySize5.maxTicksNum;
                    var width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom;
                    var svg = d3.select(_this7.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypebarTrend").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                    if (_this7.measure().length > 1 || hasSeries) {
                        return {
                            v: svg
                        };
                    } /*----------------------处理数据------------------------*/
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
                    } /*------------------通过名称找寻icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeibtrend' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeibtrend' + pictype).node().getBoundingClientRect().width;
                    var typesizey1 = svg.select('#pictypeibtrend' + pictype).node().getBoundingClientRect().height; /*-------------------默认Gradient------------------------------*/ // Define the gradient
                    var gradient = [];
                    for (var _i10 = 0; _i10 < pictorialdata.length; _i10++) {
                        gradient[_i10] = svg.append("svg:defs").append("svg:linearGradient").attr("id", 'icontypeibtrend' + _i10).attr("x1", "0").attr("y1", "1").attr("x2", "0").attr("y2", "0").attr("spreadMethod", "pad"); // Define the gradient colors
                        gradient[_i10].append("svg:stop").attr("offset", "0%").attr("stop-color", function() {
                            return _color2.default.DEFAULT;
                        }).attr("stop-opacity", 1);
                    } // append legend before chart 
                    var chartMeasuredWidth = width; //inital 
                    // set the ranges
                    var offsetY = _this7.size() === 'large' ? 5 : 2; //离x轴的距离    
                    var ysizescale = height - offsetY; //icon长度的拉伸
                    if (_this7.size() === "large") ysizescale = height / 3 * 2 - offsetY;
                    var x = d3.scaleBand().range([0, width]).domain(data.map(function(d) {
                        return d[breakdown[0].field];
                    })).padding(0.2);
                    var y = d3.scaleLinear().nice().range([ysizescale, 0]).domain([0, maxYValue]).clamp(true); /*-------------根据x的数据来进行icon的缩放--------------------------------*/
                    var scalex = void 0;
                    var scaley = void 0;
                    svg.select('#pictypeibtrend' + pictype).attr("transform", function() {
                        scalex = x.bandwidth() / typesizex1;
                        scaley = (y(0) - y(maxYValue)) / typesizey1;
                        return 'scale(' + scalex + ',' + scaley + ')';
                    }); /*----------------计算缩放后的icon长宽------------------------*/
                    var typesizex = svg.select('#pictypeibtrend' + pictype).node().getBoundingClientRect().width; // let typesizey=svg.select(`#pictype${pictype}`).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictypeibtrend' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeibtrend' + pictype).node().getBBox().y; /*------------------在图表中添加icon----------------------------*/
                    svg.append("g").attr("id", "pictoLayer").selectAll("use").data(pictorialx).enter().append("use").attr("xlink:href", '#pictypeibtrend' + pictype).attr("id", function(d, i) {
                        return "icontypeibtrend" + i;
                    }).attr("x", function(d, i) {
                        return x(d) + x.bandwidth() / 2 - Math.abs(typex * scalex) - typesizex / 2;
                    }).attr("y", function(d) {
                        return y(maxYValue) - Math.abs(typey * scaley);
                    });
                    var _loop8 = function _loop8(_i11) {
                        svg.selectAll("#icontypeibtrend" + _i11).attr("fill", function(d) {
                            gradient[_i11].append("svg:stop").attr("offset", pictorialdatapercent[_i11] + '%').attr("stop-color", _color2.default.DEFAULT).attr("stop-opacity", 1);
                            gradient[_i11].append("svg:stop").attr("offset", pictorialdatapercent[_i11] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            gradient[_i11].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            return 'url(#icontypeibtrend' + _i11 + ')';
                        });
                    };
                    for (var _i11 = 0; _i11 < pictorialdata.length; _i11++) {
                        _loop8(_i11);
                    } //bar value 超多一定数量，不显示bar value
                    if (!hasSeries && _this7.size() !== 'small' && data.length < maxTicksNum) {
                        svg.append("g").selectAll("text").data(data).enter().append("text").attr("font-family", NUMFONT).attr("font-size", tickSize).attr("text-anchor", 'middle').attr("x", function(d) {
                            return x(d[breakdown[0].field]);
                        }).attr("y", function(d) {
                            return y(d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field]);
                        }).attr("dx", x.bandwidth() / 2).attr("dy", "-1em").text(function(d) {
                            return (0, _format2.default)(d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field]);
                        });
                    } // add the x Axis
                    var isRotate = false;
                    var xAxis = svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + (ysizescale + offsetY) + ')'); //间隔显示ticks 
                    if (data.length > maxTicksNum) {
                        var selectedTickValueArray = [];
                        var ordinal = d3.scalePoint().domain(d3.range(0, maxTicksNum)).rangeRound([0, data.length - 1]);
                        for (var _i12 = 0; _i12 < maxTicksNum; _i12++) {
                            selectedTickValueArray.push(data[ordinal(_i12)][breakdown[0].field]);
                        }
                        xAxis.call(d3.axisBottom(x).tickValues(selectedTickValueArray));
                    } else {
                        xAxis.call(d3.axisBottom(x));
                    }
                    xAxis.call(function(g) {
                        var xAxislineData = [
                            [0, 0],
                            [hasSeries ? chartMeasuredWidth : width, 0]
                        ];
                        var newD = d3.line()(xAxislineData); //生成d
                        g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                        g.selectAll('.tick line').attr('stroke', 'black').attr('y2', 6 * chartSize.height / 320).attr("stroke-width", axisWidth);
                        g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', tickSize + 3).attr('font-family', NUMFONT).attr('fill', 'black').attr('text-anchor', 'middle').each(function(d, i) {
                            var text = d3.select(this).node();
                            if (text.getBBox().width > x.step()) {
                                isRotate = true;
                            }
                        });
                    }); //超过bar宽度就旋转45度
                    if (isRotate) {
                        svg.selectAll(".xAxis .tick text").each(function(d, i) {
                            var textNode = d3.select(this).node();
                            textNode.setAttribute("text-anchor", "end");
                            textNode.setAttribute("transform-origin", '0 ' + textNode.getBBox().y);
                            textNode.setAttribute("transform", 'rotate(-45)');
                        });
                    } //增加趋势线
                    // let offsetY = this.size() === 'large' ? 5 : 2; //离x轴的距离
                    var trendLineG = d3.line().x(function(d) {
                        return x(d[breakdown[0].field]) + x.bandwidth() / 2;
                    }).y(function(d) {
                        return y(d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]);
                    });
                    var trendline = svg.append("g").attr("class", "trendLine");
                    trendline.append("path").attr("d", trendLineG(data)).attr("fill", "none").attr('stroke-width', function(d) {
                        if (_this7.size() === 'small') return 2;
                        if (_this7.size() === 'middle') return 3;
                        if (_this7.size() === 'wide') return 4;
                        if (_this7.size() === 'large') return 5;
                    }).attr('stroke-dasharray', '5,5').attr("stroke", _color2.default.HIGHLIGHT);
                    var finalPosition = trendline.select("path").attr("d").split("L").slice(-1)[0];
                    var secondPosition = trendline.select("path").attr("d").split("L").slice(-2)[0];
                    var f_x = finalPosition.split(",")[0],
                        f_y = height - finalPosition.split(",")[1],
                        s_x = secondPosition.split(",")[0],
                        s_y = height - secondPosition.split(",")[1];
                    var slope = (f_y - s_y) / (f_x - s_x);
                    var deg = void 0;
                    if (getTanDeg(slope) < 0) {
                        deg = Math.abs(getTanDeg(slope)) + 90;
                    } else {
                        deg = -getTanDeg(slope) + 90;
                    }
                    trendline.append("path").attr("class", "triangle").attr("transform", "translate(" + finalPosition + ")rotate(" + deg + ")").attr("d", d3.symbol().type(d3.symbolTriangle).size(0.16 * height)).attr("fill", _color2.default.HIGHLIGHT); // let trendLineG = d3.line()
                    //     .x(function (d) { return x(d[breakdown[0].field]) + x.bandwidth() / 2; })
                    //     .y(function (d) { return y(d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) ; });
                    // let linewidth='10,10';
                    // if(this.size() === 'middle'||this.size()==='small') linewidth='5,5';
                    // svg.append("path")
                    //     .attr("d", trendLineG(data))
                    //     .attr("fill", "none")
                    //     .attr('stroke-width', 3)
                    //     .attr('stroke-dasharray', linewidth)
                    //     .attr("stroke", Color.DASHLINE);
                    //使图表居中
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
                    return {
                        v: svg
                    };
                }();
                if ((typeof _ret12 === 'undefined' ? 'undefined' : _typeof(_ret12)) === "object") return _ret12.v;
            }
        } /*-----------------------------------------------------------------------------------------------------*/
    }, {
        key: 'displayValue',
        value: function displayValue() {
            if (this.style() === _style2.default.PICTOGRAPH) {
                var factdata = this.factdata();
                var measure = this.measure();
                var breakdown = this.breakdown();
                var subspace = this.subspace();
                var pictype = measure[0].pictype; //获取相应的icon名称
                // set the dimensions and margins of the graph
                var _getSizeBySize6 = getSizeBySize(this, "value"),
                    chartSize = _getSizeBySize6.chartSize,
                    axisWidth = _getSizeBySize6.axisWidth,
                    margin = _getSizeBySize6.margin,
                    annotationSize = _getSizeBySize6.annotationSize,
                    width = chartSize.width - margin.left - margin.right,
                    height = chartSize.height - margin.top - margin.bottom; //console.log("height", chartSize.height, margin.top, margin.bottom)
                var svg = d3.select(this.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypebarValue").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                if (this.measure().length > 1 || this.breakdown().length > 1) {
                    return svg;
                } /*------------------通过名称找寻icon----------------------------*/
                svg.append("defs").append("g").attr("id", 'pictypeibv' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                var typesizex1 = svg.select('#pictypeibv' + pictype).node().getBoundingClientRect().width;
                var typesizey1 = svg.select('#pictypeibv' + pictype).node().getBoundingClientRect().height; /*-------------根据chartsize的数据来进行icon的缩放--------------------------------*/
                var scalex = void 0;
                var scalexsize = 1 / 2;
                if (this.size() === 'large') scalexsize = 3 / 4;
                svg.select('#pictypeibv' + pictype).attr("transform", function() {
                    scalex = (width > height ? height * scalexsize : width * scalexsize) / (typesizex1 > typesizey1 ? typesizex1 : typesizey1);
                    return 'scale(' + scalex + ')';
                }); /*----------------计算缩放后的icon长宽------------------------*/
                var typesizex = svg.select('#pictypeibv' + pictype).node().getBoundingClientRect().width;
                var typesizey = svg.select('#pictypeibv' + pictype).node().getBoundingClientRect().height;
                var typex = svg.select('#pictypeibv' + pictype).node().getBBox().x;
                var typey = svg.select('#pictypeibv' + pictype).node().getBBox().y; /*-------------------默认Gradient------------------------------*/ // Define the gradient
                //    let gradient= svg.append("svg:defs")
                //        .append("svg:linearGradient")
                //        .attr("id","icontype1")
                //        .attr("x1","0")
                //        .attr("y1", "1")
                //        .attr("x2","0")
                //        .attr("y2", "0")
                //        .attr("spreadMethod", "pad");
                //    // Define the gradient colors
                //    gradient.append("svg:stop")
                //        .attr("offset", "0%")
                //        .attr("stop-color", Color.DEFAULT)
                //        .attr("stop-opacity", 1);
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
                } //let maxYValue = (1.5 * barValue+100);
                // let pictorialdatapercent=parseFloat(barValue/maxYValue*100).toFixed(2);
                // set the ranges
                var x = void 0;
                var y = void 0;
                var offsetY = this.size() === 'large' ? 5 : 2; //离x轴的距离
                var xField = subspace.length === 0 ? breakdown[0].field : subspace[0].value;
                x = d3.scaleBand().range([0, width]).domain([xField]).padding(0.8);
                y = d3.scaleLinear().nice() // .range([height - offsetY, 0])
                    //.range([chartSize.height/2+typesizey/2+offsetY, 0])
                    .range([height + offsetY, height - typesizey - offsetY]) // .domain([0, maxYValue])
                    .domain([0, barValue]).clamp(true); /*--------------------------添加icon-----------------------------------*/
                svg.append("g").attr("id", "pictoLayer").append("use").attr("xlink:href", '#pictypeibv' + pictype).attr("id", "icontypeibv").attr("x", function() {
                    return width / 2 - Math.abs(typex * scalex) - typesizex / 2;
                }).attr("y", function() {
                    return height - typesizey - offsetY - Math.abs(typey * scalex);
                }).attr("fill", _color2.default.DEFAULT); //    svg.select("#icontype")
                //    .attr("fill", function(d) {
                //        gradient.append("svg:stop")
                //            .attr("offset", pictorialdatapercent + '%')
                //            .attr("stop-color", Color.DEFAULT)
                //            .attr("stop-opacity", 1);
                //        gradient.append("svg:stop")
                //            .attr("offset", pictorialdatapercent + '%')
                //            .attr("stop-color", Color.BACKGROUND)
                //            .attr("stop-opacity", 1);
                //        gradient.append("svg:stop")
                //            .attr("offset", '100%')
                //            .attr("stop-color", Color.BACKGROUND)
                //            .attr("stop-opacity", 1);
                //        return `url(#icontype1)`;
                //    }) 
                // add the x Axis
                svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + height + ')').call(d3.axisBottom(x)).call(function(g) {
                    var xAxislineData = [
                        [0, 0],
                        [width, 0]
                    ];
                    var newD = d3.line()(xAxislineData); //生成d
                    g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                    g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', annotationSize).attr('font-family', NUMFONT).attr('fill', 'black').attr('text-anchor', 'middle');
                    if (subspace.length !== 0) {
                        g.selectAll('.tick line').attr('stroke', 'black').attr('y2', 6 * chartSize.height / 320).attr("stroke-width", axisWidth);
                    } else {
                        g.selectAll('.tick line').remove();
                    }
                }); //tool tip
                var toolTipX = width / 2, //箭头中心所在x的位置
                    toolTipY = y(barValue) - 18 * chartSize.height / 320, //箭头中心所在y的位置 ,原先是40*
                    toolTipValue = (0, _format2.default)(barValue);
                var tooltiptext = void 0; //重新规定尺寸
                if (this.size() === "large") tooltiptext = 50;
                if (this.size() === "wide") tooltiptext = 35;
                if (this.size() === "middle") tooltiptext = 25;
                if (this.size() === "small") tooltiptext = 20;
                (0, _tooltip2.default)(toolTipX, toolTipY, toolTipValue, svg, chartSize, tooltiptext); //使图表居中
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
                return svg;
            }
        } /*---------------------------------------------------------------------------------------------*/
    }, {
        key: 'displayProportion',
        value: function displayProportion() {
            var _this8 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret14 = function() {
                    var factdata = _this8.factdata();
                    var measure = _this8.measure();
                    var breakdown = _this8.breakdown();
                    var focus = _this8.focus();
                    var pictype = measure[0].pictype; //获取相应的icon名称
                    // set the dimensions and margins of the graph
                    var _getSizeBySize7 = getSizeBySize(_this8, "proportion"),
                        chartSize = _getSizeBySize7.chartSize,
                        axisWidth = _getSizeBySize7.axisWidth,
                        margin = _getSizeBySize7.margin,
                        maxTicksNum = _getSizeBySize7.maxTicksNum,
                        tickSize = _getSizeBySize7.tickSize,
                        width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom; //console.log("height", chartSize.height, margin.top, margin.bottom)
                    var svg = d3.select(_this8.container()).append("svg").attr("class", "svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypebarProportion").attr("transform", 'translate(' + margin.left + ' ' + margin.top + ')');
                    if (_this8.measure().length > 1 || _this8.breakdown().length > 1 || _this8.focus().length > 2) {
                        return {
                            v: svg
                        };
                    } /*----------------------处理数据------------------------*/
                    var data = factdata;
                    var maxYValue = getMaxYValue(factdata, measure);
                    var pictorialdata = data.map(function(d) {
                        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                    });
                    pictorialdata = pictorialdata.slice(0, 10);
                    var pictorialdataSum = d3.sum(pictorialdata);
                    var pictorialx = data.map(function(d) {
                        return d[breakdown[0].field];
                    });
                    pictorialx = pictorialx.slice(0, 10);
                    var pictorialdatapercent = [];
                    for (var i = 0; i < pictorialdata.length; i++) {
                        pictorialdatapercent[i] = parseFloat(pictorialdata[i] / pictorialdataSum * 100).toFixed(1);
                    } /*------------------通过名称找寻icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeibpro' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeibpro' + pictype).node().getBoundingClientRect().width;
                    var typesizey1 = svg.select('#pictypeibpro' + pictype).node().getBoundingClientRect().height; /*-------------------默认Gradient------------------------------*/ //判断proportion 高亮位置
                    var aa = [];
                    data.forEach(function(element, index) {
                        if (element[focus[0].field] === focus[0].value) aa.push(index);
                    }); // Define the gradient
                    var gradient = [];
                    var _loop9 = function _loop9(_i13) {
                        gradient[_i13] = svg.append("svg:defs").append("svg:linearGradient").attr("id", 'icontypeibpro' + _i13).attr("x1", "0").attr("y1", "1").attr("x2", "0").attr("y2", "0").attr("spreadMethod", "pad"); // Define the gradient colors
                        gradient[_i13].append("svg:stop").attr("offset", "0%").attr("stop-color", function() {
                            if (_i13 === aa[0]) return _color2.default.HIGHLIGHT;
                            else return _color2.default.DEFAULT;
                        }).attr("stop-opacity", 1);
                    };
                    for (var _i13 = 0; _i13 < pictorialdata.length; _i13++) {
                        _loop9(_i13);
                    } // set the ranges
                    var x = void 0;
                    var y = void 0;
                    var offsetY = _this8.size() === 'large' ? 5 : 2; //离x轴的距离
                    var ysizescale = height / 3 * 2 - offsetY; //icon长度的拉伸
                    if (_this8.size() === "large") ysizescale = height / 3 * 2 - offsetY;
                    x = d3.scaleBand().range([0, width]).domain(data.map(function(d) {
                        return d[breakdown[0].field];
                    })).padding(0.5);
                    y = d3.scaleLinear().nice() //.range([height - offsetY, 0])
                        .range([ysizescale, 40 * chartSize.height / 320 + offsetY]).domain([0, maxYValue]).clamp(true); /*-------------根据x的数据来进行icon的缩放--------------------------------*/
                    var scalex = void 0;
                    var scaley = void 0;
                    svg.select('#pictypeibpro' + pictype).attr("transform", function() {
                        scalex = x.bandwidth() / typesizex1;
                        scaley = (y(0) - y(maxYValue)) / typesizey1;
                        return 'scale(' + scalex + ',' + scaley + ')';
                    }); /*----------------计算缩放后的icon长宽------------------------*/
                    var typesizex = svg.select('#pictypeibpro' + pictype).node().getBoundingClientRect().width; // let typesizey=svg.select(`#pictype${pictype}`).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictypeibpro' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeibpro' + pictype).node().getBBox().y; /*------------------在图表中添加icon----------------------------*/
                    svg.append("g").attr("id", "pictoLayer").selectAll("use").data(pictorialx).enter().append("use").attr("xlink:href", '#pictypeibpro' + pictype).attr("id", function(d, i) {
                        return "icontypeibpro" + i;
                    }).attr("x", function(d, i) {
                        return x(d) + x.bandwidth() / 2 - Math.abs(typex * scalex) - typesizex / 2;
                    }).attr("y", function(d) {
                        return y(maxYValue) - Math.abs(typey * scaley);
                    });
                    var _loop10 = function _loop10(_i14) {
                        svg.selectAll("#icontypeibpro" + _i14).attr("fill", function(d) {
                            gradient[_i14].append("svg:stop").attr("offset", pictorialdatapercent[_i14] + '%').attr("stop-color", function() {
                                if (_i14 === aa[0]) return _color2.default.HIGHLIGHT;
                                else return _color2.default.DEFAULT;
                            }).attr("stop-opacity", 1);
                            gradient[_i14].append("svg:stop").attr("offset", pictorialdatapercent[_i14] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            gradient[_i14].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            return 'url(#icontypeibpro' + _i14 + ')';
                        });
                    };
                    for (var _i14 = 0; _i14 < pictorialdata.length; _i14++) {
                        _loop10(_i14);
                    }
                    var chartMeasuredWidth = width; //inital 
                    // if ( this.size() !== 'small' && data.length < maxTicksNum) {
                    svg.append("g").selectAll("text").data(data).enter().append("text").attr("font-family", NUMFONT).attr('fill', function(d, i) {
                            if (i === aa[0]) return _color2.default.HIGHLIGHT;
                            else return "black";
                        }).attr('font-weight', function(d, i) {
                            if (i === aa[0]) return "bold";
                            else return "normal";
                        }).attr("font-size", tickSize).attr("text-anchor", 'middle').attr("x", function(d) {
                            return x(d[breakdown[0].field]);
                        }).attr("y", y(maxYValue)) //.attr("y", function (d) { return y(d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field]) })
                        .attr("dx", x.bandwidth() / 2).attr("dy", "-1em").text(function(d, i) {
                            return pictorialdatapercent[i] + "%";
                        }); //  }
                    // add the x Axis
                    var isRotate = false;
                    var xAxis = svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + (ysizescale + offsetY) + ')'); //间隔显示ticks 
                    if (data.length > maxTicksNum) {
                        var selectedTickValueArray = [];
                        var ordinal = d3.scalePoint().domain(d3.range(0, maxTicksNum)).rangeRound([0, data.length - 1]);
                        for (var _i15 = 0; _i15 < maxTicksNum; _i15++) {
                            selectedTickValueArray.push(data[ordinal(_i15)][breakdown[0].field]);
                        }
                        xAxis.call(d3.axisBottom(x).tickValues(selectedTickValueArray));
                    } else {
                        xAxis.call(d3.axisBottom(x));
                    }
                    xAxis.call(function(g) {
                        var xAxislineData = [
                            [0, 0],
                            [false ? chartMeasuredWidth : width, 0]
                        ];
                        var newD = d3.line()(xAxislineData); //生成d
                        g.select('.domain').attr('d', newD).attr('stroke', 'black').attr("stroke-width", axisWidth);
                        g.selectAll('.tick line').attr('stroke', 'black').attr('y2', 6 * chartSize.height / 320).attr("stroke-width", axisWidth);
                        g.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', tickSize).attr('font-family', NUMFONT).attr('fill', function(d, i) {
                            if (i === aa[0]) return _color2.default.HIGHLIGHT;
                            else return "black";
                        }).attr('font-weight', function(d, i) {
                            if (i === aa[0]) return "bold";
                            else return "normal";
                        }).attr('text-anchor', 'middle').each(function(d, i) {
                            var text = d3.select(this).node();
                            if (text.getBBox().width > x.step()) {
                                isRotate = true;
                            }
                        });
                    }); //超过bar宽度就旋转45度
                    if (isRotate) {
                        svg.selectAll(".xAxis .tick text").each(function(d, i) {
                            var textNode = d3.select(this).node();
                            textNode.setAttribute("text-anchor", "end");
                            textNode.setAttribute("transform-origin", '0 ' + textNode.getBBox().y);
                            textNode.setAttribute("transform", 'rotate(-45)');
                        });
                    } //使图表居中
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
                    return {
                        v: svg
                    };
                }();
                if ((typeof _ret14 === 'undefined' ? 'undefined' : _typeof(_ret14)) === "object") return _ret14.v;
            }
        } /*---------------------------------------------------------------------------------------------*/
    }, {
        key: 'displayProportion1',
        value: function displayProportion1() {
            var _this9 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret17 = function() { // set the dimensions and margins of the graph
                    var _getSizeBySize8 = getSizeBySize(_this9, "proportion"),
                        chartSize = _getSizeBySize8.chartSize,
                        tickSize = _getSizeBySize8.tickSize,
                        annotationSize = _getSizeBySize8.annotationSize,
                        margin = _getSizeBySize8.margin,
                        width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom;
                    var svg = d3.select(_this9.container()).append("svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypebarProportion").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
                    if (_this9.focus().length < 2 || _this9.measure().length > 1) {
                        return {
                            v: svg
                        };
                    }
                    var focus = _this9.focus();
                    var filteredData = []; //sorted by focus
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        var _loop12 = function _loop12() {
                            var fs = _step.value;
                            _this9.factdata().filter(function(x) {
                                return x[fs.field] === fs.value;
                            })[0] && filteredData.push(_this9.factdata().filter(function(x) {
                                return x[fs.field] === fs.value;
                            })[0]);
                        };
                        for (var _iterator = focus[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            _loop12();
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
                    var measure = _this9.measure();
                    var breakdown = _this9.breakdown();
                    var maxYValue = getMaxYValue(_this9.factdata(), measure);
                    var pictype = measure[0].pictype; //获取相应的icon名称
                    // filteredData.map(data => {
                    //     data.maxValue = (maxYValue - data[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]);
                    //     return data;
                    // })
                    // //console.log('showDifference in child')
                    var data = filteredData; // let seriesData = d3.stack()
                    //     .keys([measure[0].aggregate === "count" ? "COUNT" : measure[0].field, "maxValue"])
                    //     (data);
                    // //console.log("series...", seriesData)
                    // set the ranges
                    var x = d3.scaleBand().range([0, width]).padding(0.2);
                    var y = d3.scaleLinear().nice().range([height, 0]); // Scale the range of the data in the domains
                    x.domain(data.map(function(d) {
                        return d[breakdown[0].field];
                    }));
                    y.domain([0, maxYValue]); /*------------------通过名称找寻icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictype' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictype' + pictype).node().getBoundingClientRect().width;
                    var typesizey1 = svg.select('#pictype' + pictype).node().getBoundingClientRect().height; /*-------------------默认Gradient------------------------------*/ // Define the gradient
                    var gradient = [];
                    for (var i = 0; i < 2; i++) {
                        gradient[i] = svg.append("svg:defs").append("svg:linearGradient").attr("id", 'icontype' + i).attr("x1", "0").attr("y1", "1").attr("x2", "0").attr("y2", "0").attr("spreadMethod", "pad"); // Define the gradient colors
                        gradient[i].append("svg:stop").attr("offset", "0%").attr("stop-color", function() {
                            return _color2.default.DEFAULT;
                        }).attr("stop-opacity", 1);
                    } /*-------------根据x的数据来进行icon的缩放--------------------------------*/
                    var scalex = void 0;
                    var scaley = void 0;
                    svg.select('#pictype' + pictype).attr("transform", function() {
                        scalex = typesizex1 > typesizey1 ? x.bandwidth() / typesizex1 : x.bandwidth() / typesizey1; //scalex=x.bandwidth()/typesizex1;
                        // scaley=(y(0)-y(maxYValue))/typesizey1;
                        scaley = scalex;
                        return 'scale(' + scalex + ',' + scaley + ')';
                    }); /*----------------计算缩放后的icon长宽------------------------*/
                    var typesizex = svg.select('#pictype' + pictype).node().getBoundingClientRect().width;
                    var typesizey = svg.select('#pictype' + pictype).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictype' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictype' + pictype).node().getBBox().y; /*------------------在图表中添加icon----------------------------*/
                    svg.append("g").attr("id", "pictoLayer").selectAll("use").data(data).enter().append("use").attr("xlink:href", '#pictype' + pictype).attr("id", function(d, i) {
                        return "icontype" + i;
                    }).attr("x", function(d, i) {
                        return x(d[breakdown[0].field]) + x.bandwidth() / 2 - Math.abs(typex * scalex) - typesizex / 2;
                    }).attr("y", function() {
                        return height - typesizey - Math.abs(typey * scalex);
                    }); //  .attr("y", function (d) {
                    //       return y(maxYValue)-Math.abs(typey*scaley);
                    //       })
                    var totalValue = d3.sum(data, function(d) {
                        return d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field];
                    });
                    var pictorialdata = data.map(function(d) {
                        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                    });
                    var pictorialdatapercent = [];
                    for (var _i16 = 0; _i16 < pictorialdata.length; _i16++) {
                        pictorialdatapercent[_i16] = parseFloat(pictorialdata[_i16] / totalValue * 100).toFixed(0);
                    }
                    var _loop11 = function _loop11(_i17) {
                        svg.selectAll("#icontype" + _i17).attr("fill", function(d) {
                            gradient[_i17].append("svg:stop").attr("offset", pictorialdatapercent[_i17] + '%').attr("stop-color", _color2.default.DEFAULT).attr("stop-opacity", 1);
                            gradient[_i17].append("svg:stop").attr("offset", pictorialdatapercent[_i17] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            gradient[_i17].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                            return 'url(#icontype' + _i17 + ')';
                        });
                    };
                    for (var _i17 = 0; _i17 < 2; _i17++) {
                        _loop11(_i17);
                    } // append the rectangles for the bar chart
                    // svg.selectAll(".barSeries")
                    //     //.data(data)
                    //     .data(seriesData)
                    //     .enter()
                    //     .append("g")
                    //     .attr("class", "barSeries")
                    //     .attr("fill", (d, i) => (i === seriesData.length - 1) ? Color.BACKGROUND : Color.DEFAULT)
                    //     .selectAll("bars")
                    //     .data(d => d)
                    //     .enter()
                    //     .append("rect")
                    //     .attr("class", "bars")
                    //     .attr("x", (d, i) => x(d.data[breakdown[0].field]))
                    //     .attr("y", d => y(d[1]))
                    //     .attr("height", d => y(d[0]) - y(d[1]))
                    //     .attr("width", x.bandwidth());
                    svg.append("g").selectAll("text").data(data).enter().append("text").attr("font-family", NUMFONT).attr("font-size", annotationSize).attr("text-anchor", 'middle').attr("x", function(d) {
                            return x(d[breakdown[0].field]);
                        }).attr("y", function(d, i) {
                            return height - typesizey * pictorialdatapercent[i] / 100;
                        }) //.attr("y", function (d) { return y(d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) })
                        .attr("dx", x.bandwidth() / 2).attr("dy", "-1em").text(function(d) {
                            return (d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field] / totalValue * 100).toFixed(0) + "%";
                        }); // add the x Axis
                    var xAxis = svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + height + ')').call(d3.axisBottom(x)); //x Axis style
                    xAxis.select('.domain').remove(); //tick style
                    xAxis.selectAll('.tick line').remove();
                    xAxis.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', tickSize + 3).attr('font-family', NUMFONT); //使图表居中
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
                    return {
                        v: svg
                    };
                }();
                if ((typeof _ret17 === 'undefined' ? 'undefined' : _typeof(_ret17)) === "object") return _ret17.v;
            }
        }
    }, {
        key: 'displayDifference',
        value: function displayDifference() {
            var _this10 = this;
            if (this.style() === _style2.default.PICTOGRAPH) { // set the dimensions and margins of the graph
                var _getSizeBySize9 = getSizeBySize(this, "difference"),
                    chartSize = _getSizeBySize9.chartSize,
                    tickSize = _getSizeBySize9.tickSize,
                    annotationSize = _getSizeBySize9.annotationSize,
                    margin = _getSizeBySize9.margin,
                    width = chartSize.width - margin.left - margin.right,
                    height = chartSize.height - margin.top - margin.bottom;
                var svg = d3.select(this.container()).append("svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypebarDifference").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')'); //difference类型会在filteredData里生成两条数据
                if (this.measure().length > 1 || this.focus().length < 2) {
                    return svg;
                }
                var focus = this.focus();
                var filteredData = []; //sorted by focus
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;
                try {
                    var _loop13 = function _loop13() {
                        var fs = _step2.value;
                        _this10.factdata().filter(function(x) {
                            return x[fs.field] === fs.value;
                        })[0] && filteredData.push(_this10.factdata().filter(function(x) {
                            return x[fs.field] === fs.value;
                        })[0]);
                    };
                    for (var _iterator2 = focus[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        _loop13();
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
                var measure = this.measure();
                var breakdown = this.breakdown();
                var pictype = measure[0].pictype;
                var maxYValue = getMaxYValue(filteredData, measure);
                var data = filteredData; // set the ranges
                var xwidthmax = void 0;
                var paddingx = void 0;
                if (this.size() !== _size2.default.SMALL) {
                    xwidthmax = width / 5 * 3;
                    paddingx = 0.1;
                } else {
                    xwidthmax = width;
                    paddingx = 0.2;
                }
                var x = d3.scaleBand().range([0, xwidthmax]).padding(paddingx);
                var y = d3.scaleLinear().nice().range([height, 0]); // Scale the range of the data in the domains
                x.domain(data.map(function(d) {
                    return d[breakdown[0].field];
                }));
                y.domain([0, maxYValue]); /*------------------通过名称找寻icon----------------------------*/
                svg.append("defs").append("g").attr("id", 'pictypeibdiff' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                var typesizex1 = svg.select('#pictypeibdiff' + pictype).node().getBoundingClientRect().width;
                var typesizey1 = svg.select('#pictypeibdiff' + pictype).node().getBoundingClientRect().height; /*-------------------默认Gradient------------------------------*/ // Define the gradient
                var gradient = [];
                for (var i = 0; i < 2; i++) {
                    gradient[i] = svg.append("svg:defs").append("svg:linearGradient").attr("id", 'icontypeibdiff' + i).attr("x1", "0").attr("y1", "1").attr("x2", "0").attr("y2", "0").attr("spreadMethod", "pad"); // Define the gradient colors
                    gradient[i].append("svg:stop").attr("offset", "0%").attr("stop-color", function() {
                        return _color2.default.DEFAULT;
                    }).attr("stop-opacity", 1);
                } /*-------------根据x的数据来进行icon的缩放--------------------------------*/
                var scalex = void 0;
                var scaley = void 0;
                svg.select('#pictypeibdiff' + pictype).attr("transform", function() {
                    scalex = typesizex1 > typesizey1 ? x.bandwidth() / typesizex1 : x.bandwidth() / typesizey1;
                    scaley = scalex;
                    return 'scale(' + scalex + ',' + scaley + ')';
                }); /*----------------计算缩放后的icon长宽------------------------*/
                var typesizex = svg.select('#pictypeibdiff' + pictype).node().getBoundingClientRect().width;
                var typesizey = svg.select('#pictypeibdiff' + pictype).node().getBoundingClientRect().height;
                var typex = svg.select('#pictypeibdiff' + pictype).node().getBBox().x;
                var typey = svg.select('#pictypeibdiff' + pictype).node().getBBox().y; /*------------------在图表中添加icon----------------------------*/
                svg.append("g").attr("id", "pictoLayer").selectAll("use").data(data).enter().append("use").attr("xlink:href", '#pictypeibdiff' + pictype).attr("id", function(d, i) {
                    return "icontypeibdiff" + i;
                }).attr("x", function(d, i) {
                    return x(d[breakdown[0].field]) + x.bandwidth() / 2 - Math.abs(typex * scalex) - typesizex / 2;
                }).attr("y", function() {
                    return height - typesizey - Math.abs(typey * scalex);
                });
                var totalValue = d3.sum(data, function(d) {
                    return d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field];
                });
                var pictorialdata = data.map(function(d) {
                    return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                });
                var pictorialdatapercent = [];
                for (var _i18 = 0; _i18 < pictorialdata.length; _i18++) {
                    pictorialdatapercent[_i18] = parseFloat(pictorialdata[_i18] / totalValue * 100).toFixed(0);
                } //比较两者的difference占比 并进行填色
                if (pictorialdatapercent[0] > pictorialdatapercent[1]) {
                    svg.selectAll("#icontypeibdiff0").attr("fill", function() {
                        gradient[0].append("svg:stop").attr("offset", pictorialdatapercent[1] + "%").attr("stop-color", _color2.default.DEFAULT).attr("stop-opacity", 1);
                        gradient[0].append("svg:stop").attr("offset", pictorialdatapercent[1] + "%").attr("stop-color", _color2.default.HIGHLIGHT).attr("stop-opacity", 1);
                        gradient[0].append("svg:stop").attr("offset", pictorialdatapercent[0] + '%').attr("stop-color", _color2.default.HIGHLIGHT).attr("stop-opacity", 1);
                        gradient[0].append("svg:stop").attr("offset", pictorialdatapercent[0] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                        gradient[0].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                        return 'url(#icontypeibdiff' + 0 + ')';
                    });
                    svg.selectAll("#icontypeibdiff1").attr("fill", function() {
                        gradient[1].append("svg:stop").attr("offset", pictorialdatapercent[1] + "%").attr("stop-color", _color2.default.DEFAULT).attr("stop-opacity", 1);
                        gradient[1].append("svg:stop").attr("offset", pictorialdatapercent[1] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                        gradient[1].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                        return 'url(#icontypeibdiff' + 1 + ')';
                    });
                } else {
                    svg.selectAll("#icontypeibdiff0").attr("fill", function() {
                        gradient[0].append("svg:stop").attr("offset", pictorialdatapercent[0] + "%").attr("stop-color", _color2.default.DEFAULT).attr("stop-opacity", 1);
                        gradient[0].append("svg:stop").attr("offset", pictorialdatapercent[0] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                        gradient[0].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                        return 'url(#icontypeibdiff' + 0 + ')';
                    });
                    svg.selectAll("#icontypeibdiff1").attr("fill", function() {
                        gradient[1].append("svg:stop").attr("offset", pictorialdatapercent[0] + "%").attr("stop-color", _color2.default.DEFAULT).attr("stop-opacity", 1);
                        gradient[1].append("svg:stop").attr("offset", pictorialdatapercent[0] + "%").attr("stop-color", _color2.default.HIGHLIGHT).attr("stop-opacity", 1);
                        gradient[1].append("svg:stop").attr("offset", pictorialdatapercent[1] + '%').attr("stop-color", _color2.default.HIGHLIGHT).attr("stop-opacity", 1);
                        gradient[1].append("svg:stop").attr("offset", pictorialdatapercent[1] + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                        gradient[1].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                        return 'url(#icontypeibdiff' + 1 + ')';
                    });
                }
                if (pictorialdata[0] && pictorialdata[1] && focus[0].value !== focus[1].value) {
                    svg.selectAll(".referenceL").data(data).join("line").attr('class', 'referenceL').attr('x1', function(d) {
                        return x(d[breakdown[0].field]) + x.bandwidth() / 2 + typesizex / 2;
                    }).attr('y1', function(d, i) {
                        return height - typesizey * pictorialdatapercent[i] / 100;
                    }).attr('x2', xwidthmax + 5).attr('y2', function(d, i) {
                        return height - typesizey * pictorialdatapercent[i] / 100;
                    }).attr('stroke', _color2.default.DASHLINE).attr('stroke-width', 3).attr('stroke-dasharray', '5,5');
                    svg.selectAll(".referenceL1").data(data).join("line").attr('class', 'referenceL1').attr('x1', xwidthmax + 5 + 2).attr('y1', function(d, i) {
                        return height - typesizey * pictorialdatapercent[i] / 100;
                    }).attr('x2', xwidthmax + 5 + 8).attr('y2', function(d, i) {
                        return height - typesizey * pictorialdatapercent[i] / 100;
                    }).attr('stroke', _color2.default.AXIS).attr('stroke-width', 2);
                    svg.append("line").attr('class', 'verticalL').attr('x1', xwidthmax + 5 + 8).attr('y1', height - typesizey * pictorialdatapercent[0] / 100).attr('x2', xwidthmax + 5 + 8).attr('y2', height - typesizey * pictorialdatapercent[1] / 100).attr('stroke', _color2.default.AXIS).attr('stroke-width', 2);
                    if (this.size() !== _size2.default.SMALL) {
                        svg.append("text").attr("class", "differenceN").attr("font-family", NUMFONT).attr("font-size", annotationSize).attr("text-anchor", 'start').attr("dominant-baseline", "middle").attr("fill", _color2.default.HIGHLIGHT).attr("font-weight", "bold").attr("x", xwidthmax + 5 + 15).attr("y", height - typesizey * (pictorialdatapercent[0] / 100 + pictorialdatapercent[1] / 100) / 2).text((0, _format2.default)(Math.abs(pictorialdata[0] - pictorialdata[1])));
                    }
                }
                svg.append("g").selectAll(".textnumber").data(data).enter().append("text").attr("class", "textnumber").attr("font-family", NUMFONT).attr("font-size", tickSize).attr("text-anchor", 'middle').attr("x", function(d) {
                        return x(d[breakdown[0].field]);
                    }).attr("y", function(d, i) { // return height-typesizey*pictorialdatapercent[i]/100;
                        return height - typesizey;
                    }) //.attr("y", function (d) { return y(d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) })
                    .attr("dx", x.bandwidth() / 2).attr("dy", "-1em").text(function(d) {
                        return (0, _format2.default)(d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field]);
                    }); // add the x Axis
                var xAxis = svg.append("g").attr("class", 'xAxis').attr("transform", 'translate(0,' + height + ')').call(d3.axisBottom(x)); //x Axis style
                xAxis.select('.domain').remove(); //tick style
                xAxis.selectAll('.tick line').remove();
                xAxis.selectAll('.tick text').attr('y', 9 * chartSize.height / 320).attr('font-size', tickSize).attr('font-family', NUMFONT); //使图表居中
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
                return svg;
            }
        }
    }]);
    return IsotypeBar;
}(_chart2.default);
/** 
 * tickSize 坐标轴字号
 * annotationSize 标注字号
 * maxTicksNum xField显示的个数
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
exports.default = IsotypeBar;