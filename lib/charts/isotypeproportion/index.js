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
var TEXTFONT = "Arial-Bold";
var IsotypeProportion = function(_Chart) {
    _inherits(IsotypeProportion, _Chart);

    function IsotypeProportion() {
        _classCallCheck(this, IsotypeProportion);
        return _possibleConstructorReturn(this, (IsotypeProportion.__proto__ || Object.getPrototypeOf(IsotypeProportion)).apply(this, arguments));
    }
    _createClass(IsotypeProportion, [{
        key: 'displayDifference',
        value: function displayDifference() {
            var _this3 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _ret = function() {
                    var _getSizeBySize = getSizeBySize(_this3, 'difference'),
                        chartSize = _getSizeBySize.chartSize,
                        annotationSize = _getSizeBySize.annotationSize,
                        margin = _getSizeBySize.margin,
                        width = chartSize.width - margin.left - margin.right,
                        height = chartSize.height - margin.top - margin.bottom;
                    var svg = d3.select(_this3.container()).append("svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypeproportionDifference").attr("class", "elementGroup").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
                    if (_this3.measure().length > 1 || _this3.focus().length < 2) {
                        return {
                            v: svg
                        };
                    }
                    var focus = _this3.focus();
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
                    var measure = _this3.measure();
                    var breakdown = _this3.breakdown();
                    var pictype = measure[0].pictype;
                    var maxYValue = getMaxYValue(filteredData, measure);
                    var mesuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
                    filteredData.map(function(data) {
                        data.maxValue = maxYValue - data[measure[0].aggregate === "count" ? "COUNT" : mesuredField];
                        return data;
                    });
                    var data = filteredData;
                    if (data.length === 0) return {
                        v: void 0
                    }; /*------------------??????????????????icon----------------------------*/
                    svg.append("defs").append("g").attr("id", 'pictypeisodiff' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                    var typesizex1 = svg.select('#pictypeisodiff' + pictype).node().getBoundingClientRect().width;
                    var typesizey1 = svg.select('#pictypeisodiff' + pictype).node().getBoundingClientRect().height;
                    var y = d3.scaleBand().domain(data.map(function(d) {
                        return d[breakdown[0].field];
                    })).range([height - 40 * chartSize.height / 320, 0]).padding(0.6); /*-------------??????x??????????????????icon?????????--------------------------------*/
                    var scalex = void 0;
                    var scaley = void 0;
                    svg.select('#pictypeisodiff' + pictype).attr("transform", function() {
                        scalex = y.bandwidth() / typesizey1;
                        scaley = scalex;
                        return 'scale(' + scalex + ',' + scaley + ')';
                    }); /*----------------??????????????????icon??????------------------------*/
                    var typesizex = svg.select('#pictypeisodiff' + pictype).node().getBoundingClientRect().width;
                    var typesizey = svg.select('#pictypeisodiff' + pictype).node().getBoundingClientRect().height;
                    var typex = svg.select('#pictypeisodiff' + pictype).node().getBBox().x;
                    var typey = svg.select('#pictypeisodiff' + pictype).node().getBBox().y; //   let totalValue = d3.sum(data, d => d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field])
                    var pictorialdata = data.map(function(d) {
                        return d[measure[0].aggregate === 'count' ? "COUNT" : measure[0].field];
                    }); // let pictorialdatapercent =[]; 
                    // for(let i=0;i<pictorialdata.length;i++){   
                    // pictorialdatapercent[i]=parseFloat(pictorialdata[i]/totalValue*100).toFixed(0);       
                    // }
                    //specify the number of columns and rows for pictogram layout
                    var numCols = 5;
                    var numRows = 1; //padding for the grid
                    var xPadding = 10; //let yPadding = 15;
                    //horizontal and vertical spacing between the icons
                    //let hBuffer = 30;
                    var wBuffer = (typesizex1 + 2) * scalex; //generate a d3 range for the total number of required elements
                    var myIndex = d3.range(numCols * numRows); //define the gradient 
                    var gradient = [];
                    var _loop = function _loop(i) {
                        gradient[i] = svg.append("svg:defs").append("svg:linearGradient").attr("id", function() {
                            return "icontypeisodiff" + i;
                        }).attr("spreadMethod", "pad"); // Define the gradient colors
                        gradient[i].append("svg:stop").attr("offset", "0%").attr("stop-color", function() {
                            return _color2.default.DEFAULT;
                        }).attr("stop-opacity", 1);
                    };
                    for (var i = 0; i < 2; i++) {
                        _loop(i);
                    }
                    var total = numCols * numRows;
                    var valuePict = [];
                    var valueDecimal = [];
                    for (var i = 0; i < 2; i++) { // valuePict[i]=total*(datapercent[i]/100);
                        valuePict[i] = (pictorialdata[i] * total / maxYValue).toFixed(1);
                        valueDecimal[i] = valuePict[i] % 1;
                    }
                    var ybianhua = typey * scaley;
                    var _loop2 = function _loop2(_i) { //let typeindex=i*60;
                        svg.append("g").attr("id", function() {
                            return "icon" + _i;
                        }).selectAll(".icontypeisodiff" + _i).data(myIndex).enter().append("use").attr("xlink:href", '#pictypeisodiff' + pictype).attr("id", function(d) {
                            return "icon" + d;
                        }).attr("x", function(d) {
                            var remainder = d % numCols; //calculates the x position (column number) using modulus
                            return xPadding + remainder * wBuffer; //apply the buffer and return value
                        }).attr("y", function() {
                            return y(data[_i][breakdown[0].field]) + y.bandwidth() / 2 - typesizey / 2 - Math.abs(ybianhua); //apply the buffer and return the value
                        }).attr("class", function() {
                            return "icontypeisodiff" + _i;
                        });
                    };
                    for (var _i = 0; _i < 2; _i++) {
                        _loop2(_i);
                    } //fill color
                    var _loop3 = function _loop3(_i2) {
                        d3.selectAll(".icontypeisodiff" + _i2).attr("fill", function(d) {
                            if (d <= valuePict[_i2] - 1) {
                                return _color2.default.DEFAULT;
                            } else if (d > valuePict[_i2] - 1 && d < valuePict[_i2]) {
                                gradient[_i2].append("svg:stop").attr("offset", valueDecimal[_i2] * 100 + '%').attr("stop-color", _color2.default.DEFAULT).attr("stop-opacity", 1);
                                gradient[_i2].append("svg:stop").attr("offset", valueDecimal[_i2] * 100 + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                                gradient[_i2].append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                                return "url(#icontypeisodiff" + _i2 + ")";
                            } else {
                                return _color2.default.BACKGROUND;
                            }
                        });
                    };
                    for (var _i2 = 0; _i2 < 2; _i2++) {
                        _loop3(_i2);
                    } // add the y Axis
                    var measuredWidth = 0;
                    svg.append("g").attr('class', 'yAxisisopro').call(d3.axisRight(y)).call(function(g) {
                        g.select('.domain').remove();
                        g.selectAll('.tick line').remove();
                        g.selectAll(".tick text").attr("text-anchor", "end").attr("x", 0).attr("dx", -xPadding - 20) // .attr("dx", - 9 * chartSize.height / 320)
                            .attr("stroke-width", _this3.size() === "small" ? 1 : 2) // .attr("dy", "0.5em")
                            .attr('font-size', annotationSize).attr('font-family', NUMFONT).each(function(d, i) {
                                var selfWidth = d3.select(this).node().getBBox().width;
                                if (Number(selfWidth) > Number(measuredWidth)) {
                                    measuredWidth = Number(selfWidth);
                                }
                            });
                    }); //update y 
                    d3.selectAll(".yAxisisopro .tick text").each(function() {
                        d3.select(this).node().setAttribute("x", measuredWidth);
                    }); //  //bar value
                    svg.append("g").selectAll("text").data(data).enter().append("text").attr("font-family", NUMFONT).attr("font-size", annotationSize).attr("text-anchor", 'start').attr("dominant-baseline", "middle").attr("fill", "black").attr("x", function(d) {
                        return wBuffer * 6 + xPadding;
                    }).attr("y", function(d) {
                        return y(d[breakdown[0].field]);
                    }).attr("dx", '-1em').attr("dy", y.bandwidth() / 2).text(function(d) {
                        return (0, _format2.default)(d[measure[0].aggregate === "count" ? "COUNT" : mesuredField]);
                    }); //draw reference line
                    if (_this3.size() !== _size2.default.SMALL) {
                        svg.selectAll("referenceL").data(data).join("line").attr('class', 'referenceL').attr('x1', function(d, i) {
                            return xPadding + Math.floor(valuePict[i]) * wBuffer + Math.abs(typex * scalex) + valueDecimal[i] * typesizex;
                        }).attr('y1', height - 80 * chartSize.height / 320).attr('x2', function(d, i) {
                            return xPadding + Math.floor(valuePict[i]) * wBuffer + Math.abs(typex * scalex) + valueDecimal[i] * typesizex;
                        }).attr('y2', function(d) {
                            return y(d[breakdown[0].field]) + y.bandwidth() / 2;
                        }).attr('stroke', _color2.default.DASHLINE).attr('stroke-width', 3).attr('stroke-dasharray', '5,5');
                        svg.append("line").attr('class', 'hightlightL').attr('x1', xPadding + Math.floor(valuePict[0]) * wBuffer + Math.abs(typex * scalex) + valueDecimal[0] * typesizex).attr('y1', height - 80 * chartSize.height / 320).attr('x2', xPadding + Math.floor(valuePict[1]) * wBuffer + Math.abs(typex * scalex) + valueDecimal[1] * typesizex).attr('y2', height - 80 * chartSize.height / 320).attr('stroke', _color2.default.AXIS).attr('opacity', 1).attr('stroke-width', 3); //tool tip
                        var startPos = (xPadding + Math.floor(valuePict[0]) * wBuffer + Math.abs(typex * scalex) + valueDecimal[0] * typesizex + (xPadding + Math.floor(valuePict[1]) * wBuffer + Math.abs(typex * scalex) + valueDecimal[1] * typesizex)) / 2;
                        var toolTipX = startPos; //??????????????????x?????????
                        var toolTipY = height - 70 * chartSize.height / 320;
                        var toolTipValue = (0, _format2.default)(Math.abs(data[0][measure[0].aggregate === "count" ? "COUNT" : mesuredField] - data[1][measure[0].aggregate === "count" ? "COUNT" : mesuredField]));
                        (0, _tooltip2.default)(toolTipX, toolTipY, toolTipValue, svg, chartSize, annotationSize, "Down");
                    } //???????????????
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
                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
        }
    }, {
        key: 'displayProportion',
        value: function displayProportion() {
            var _this4 = this;
            if (this.style() === _style2.default.PICTOGRAPH) {
                var _getSizeBySize2 = getSizeBySize(this, 'proportion'),
                    chartSize = _getSizeBySize2.chartSize,
                    annotationSize = _getSizeBySize2.annotationSize,
                    margin = _getSizeBySize2.margin,
                    width = chartSize.width - margin.left - margin.right,
                    height = chartSize.height - margin.top - margin.bottom;
                var svg = d3.select(this.container()).append("svg").attr("width", chartSize.width).attr("height", chartSize.height).append("g").attr("id", "isotypeproportionproportion").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
                if (this.focus().length !== 1 || this.measure().length > 1) {
                    return;
                }
                var focus = this.focus();
                var filteredData = []; //sorted by focus
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;
                try {
                    var _loop5 = function _loop5() {
                        var fs = _step2.value;
                        _this4.factdata().filter(function(x) {
                            return x[fs.field] === fs.value;
                        })[0] && filteredData.push(_this4.factdata().filter(function(x) {
                            return x[fs.field] === fs.value;
                        })[0]);
                    };
                    for (var _iterator2 = focus[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        _loop5();
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
                var maxYValue = d3.sum(this.factdata(), function(d) {
                    return d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field];
                });
                filteredData.map(function(data) {
                    data.maxValue = maxYValue - data[measure[0].aggregate === "count" ? "COUNT" : measure[0].field];
                    return data;
                });
                if (filteredData.length === 0) {
                    return;
                }
                var data = filteredData; /*------------------??????????????????icon----------------------------*/
                svg.append("defs").append("g").attr("id", 'pictypeisopro' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                var typesizex1 = svg.select('#pictypeisopro' + pictype).node().getBoundingClientRect().width;
                var typesizey1 = svg.select('#pictypeisopro' + pictype).node().getBoundingClientRect().height;
                var y = d3.scaleBand().domain(data.map(function(d) {
                    return d[breakdown[0].field];
                })).range([height - 40 * chartSize.height / 320, 0]).padding(0.6); /*-------------??????x??????????????????icon?????????--------------------------------*/
                var scalex = void 0;
                var scaley = void 0;
                svg.select('#pictypeisopro' + pictype).attr("transform", function() {
                    scalex = y.bandwidth() / typesizey1;
                    scaley = scalex;
                    return 'scale(' + scalex + ',' + scaley + ')';
                }); /*----------------??????????????????icon??????------------------------*/ // let typesizex=svg.select(`#pictype${pictype}`).node().getBoundingClientRect().width;
                var typesizey = svg.select('#pictypeisopro' + pictype).node().getBoundingClientRect().height; //  let typex= svg.select(`#pictype${pictype}`).node().getBBox().x;
                var typey = svg.select('#pictypeisopro' + pictype).node().getBBox().y; /*----------------???????????????--------------------------*/
                var pictorialdata = data[0][measure[0].aggregate === "count" ? "COUNT" : measure[0].field];
                var pictorialdatasum = d3.sum(this.factdata(), function(d) {
                    return d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field];
                });
                var proportionValue = data[0][measure[0].aggregate === "count" ? "COUNT" : measure[0].field] / d3.sum(this.factdata(), function(d) {
                    return d[measure[0].aggregate === "count" ? "COUNT" : measure[0].field];
                }); // let toolTipX = x(data[0][measure[0].aggregate === "count" ? "COUNT" : measure[0].field]) / 2,//??????????????????x?????????
                //     toolTipY = y(data[0][breakdown[0].field]) - 40 * chartSize.height / 320,
                var toolTipValue = (proportionValue * 100).toFixed(0) + "%"; //specify the number of columns and rows for pictogram layout
                var numCols = 5;
                var numRows = 2; //padding for the grid
                var xPadding = 10; //let yPadding = 15;
                //horizontal and vertical spacing between the icons
                //let hBuffer = 30;
                var wBuffer = (typesizex1 + 2) * scalex; //generate a d3 range for the total number of required elements
                var myIndex = d3.range(numCols * numRows); //define the gradient 
                var gradient = svg.append("svg:defs").append("svg:linearGradient").attr("id", function() {
                    return "icontypeisopro";
                }).attr("spreadMethod", "pad"); // Define the gradient colors
                gradient.append("svg:stop").attr("offset", "0%").attr("stop-color", function() {
                    return _color2.default.DEFAULT;
                }).attr("stop-opacity", 1);
                var total = numCols * numRows;
                var valuePict = void 0;
                var valueDecimal = void 0;
                valuePict = (pictorialdata * total / pictorialdatasum).toFixed(1);
                valueDecimal = valuePict % 1;
                var ybianhua = typey * scaley;
                var ybuffer = void 0;
                if (this.size() === 'large') ybuffer = 10;
                if (this.size() === 'middle') ybuffer = 5;
                if (this.size() === 'wide') ybuffer = 5;
                if (this.size() === 'small') ybuffer = 3; //let typeindex=i*60;
                svg.append("g").attr("id", function() {
                    return "icon";
                }).selectAll(".icontypeisopro").data(myIndex).enter().append("use").attr("xlink:href", '#pictypeisopro' + pictype).attr("id", function(d) {
                    return "icon" + d;
                }).attr("x", function(d) {
                    var remainder = d % numCols; //calculates the x position (column number) using modulus
                    return xPadding + remainder * wBuffer; //apply the buffer and return value
                }).attr("y", function(d) { // return y(data[i][breakdown[0].field])+y.bandwidth()/2-typesizey/2-Math.abs(ybianhua); //apply the buffer and return the value
                    if (d / 5 < 1) return height / 2 - typesizey - ybuffer - Math.abs(ybianhua);
                    else return height / 2 + ybuffer - Math.abs(ybianhua);
                }).attr("class", function() {
                    return "icontypeisopro";
                }); //fill color
                d3.selectAll(".icontypeisopro").attr("fill", function(d) {
                    if (d <= valuePict - 1) {
                        return _color2.default.DEFAULT;
                    } else if (d > valuePict - 1 && d < valuePict) {
                        gradient.append("svg:stop").attr("offset", valueDecimal * 100 + '%').attr("stop-color", _color2.default.DEFAULT).attr("stop-opacity", 1);
                        gradient.append("svg:stop").attr("offset", valueDecimal * 100 + '%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                        gradient.append("svg:stop").attr("offset", '100%').attr("stop-color", _color2.default.BACKGROUND).attr("stop-opacity", 1);
                        return "url(#icontypeisopro)";
                    } else {
                        return _color2.default.BACKGROUND;
                    }
                });
                svg.append("g").append("text").attr("x", 0).attr("y", height / 2 + typesizey / 2 + ybuffer).attr("text-anchor", "end").attr("dominant-baseline", "middle").attr('font-family', TEXTFONT).attr("font-size", annotationSize).attr("font-weight", 600).attr("fill", _color2.default.HIGHLIGHT).text(toolTipValue); // .property("_value", toolTipValue)
                svg.append("g").append("text").attr("x", 0).attr("y", height / 2 - typesizey / 2 - ybuffer).attr("text-anchor", "end").attr("alignment-baseline", "middle").attr('font-family', TEXTFONT).attr("font-size", annotationSize).attr("font-weight", 600).attr("fill", _color2.default.HIGHLIGHT).text(focus[0].value); //???????????????
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
    return IsotypeProportion;
}(_chart2.default);
/** 
 * tickSize ???????????????
 * annotationSize ????????????
 **/
var getSizeBySize = function getSizeBySize(_this, factType) {
    var tickSize = void 0,
        annotationSize = void 0,
        maxTicksNum = void 0,
        xAxisH = void 0;
    switch (_this.size()) {
        case _size2.default.WIDE:
            tickSize = 10;
            if (factType === 'proportion') annotationSize = 35;
            else annotationSize = 15;
            maxTicksNum = 10;
            xAxisH = 10;
            break;
        case _size2.default.MIDDLE:
            tickSize = 10;
            if (factType === 'proportion') annotationSize = 20;
            else annotationSize = 12;
            maxTicksNum = 10;
            xAxisH = 9;
            break;
        case _size2.default.SMALL:
            tickSize = 7;
            if (factType === 'proportion') annotationSize = 25;
            else annotationSize = 10;
            maxTicksNum = 8;
            xAxisH = 6;
            break;
        case _size2.default.LARGE:
        default:
            tickSize = 12;
            if (factType === 'proportion') annotationSize = 50;
            else annotationSize = 20;
            maxTicksNum = 21;
            xAxisH = 40;
            break;
    }
    var margin = void 0;
    switch (_this.size()) {
        case _size2.default.LARGE:
            margin = {
                top: 40,
                right: 80,
                bottom: 40,
                left: 80
            };
            if (factType === 'value') {
                margin = {
                    top: 40,
                    right: 40,
                    bottom: 40,
                    left: 30
                };
            }
            if (factType === 'rank' || factType === 'distribution') {
                margin = {
                    top: 40,
                    right: 80,
                    bottom: 40,
                    left: 40
                };
            }
            break;
        case _size2.default.WIDE:
            margin = {
                top: 10,
                right: 50,
                bottom: 10,
                left: 50
            };
            if (factType === 'value') {
                margin = {
                    top: 10,
                    right: 20,
                    bottom: 10,
                    left: 20
                };
            }
            if (factType === 'difference') {
                margin = {
                    top: 5,
                    right: 20,
                    bottom: 10,
                    left: 20
                };
            }
            if (factType === 'rank' || factType === 'distribution') {
                margin = {
                    top: 10,
                    right: 60,
                    bottom: 10,
                    left: 20
                };
            }
            break;
        case _size2.default.MIDDLE:
            margin = {
                top: 10,
                right: 40,
                bottom: 10,
                left: 40
            };
            if (factType === 'value' || factType === 'difference') {
                margin = {
                    top: 10,
                    right: 20,
                    bottom: 10,
                    left: 10
                };
            }
            if (factType === 'rank' || factType === 'distribution') {
                margin = {
                    top: 10,
                    right: 40,
                    bottom: 10,
                    left: 10
                };
            }
            break;
        case _size2.default.SMALL:
            margin = {
                top: 8,
                right: 35,
                bottom: 8,
                left: 35
            };
            if (factType === 'value') {
                margin = {
                    top: 10,
                    right: 10,
                    bottom: 10,
                    left: 10
                };
            }
            if (factType === 'difference') {
                margin = {
                    top: 10,
                    right: 20,
                    bottom: 5,
                    left: 10
                };
            }
            if (factType === 'rank' || factType === 'distribution') {
                margin = {
                    top: 8,
                    right: 30,
                    bottom: 8,
                    left: 8
                };
            }
            break;
        default:
            margin = {
                top: 40,
                right: 40,
                bottom: 40,
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
        maxTicksNum: maxTicksNum,
        maxYAxisW: margin.left,
        xAxisH: xAxisH
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
exports.default = IsotypeProportion;