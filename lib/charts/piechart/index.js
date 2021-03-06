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
var _d2 = require('d3');
var d3 = _interopRequireWildcard(_d2);
var _chart = require('../../chart');
var _chart2 = _interopRequireDefault(_chart);
var _color = require('../../visualization/color');
var _color2 = _interopRequireDefault(_color);
var _multiline = require('../../visualization/multiline');
var _multiline2 = _interopRequireDefault(_multiline);
var _style = require('../../visualization/style');
var _style2 = _interopRequireDefault(_style);
var _size = require('../../visualization/size');
var _size2 = _interopRequireDefault(_size);
var _pictogram = require('../../visualization/pictogram');
var _pictogram2 = _interopRequireDefault(_pictogram);
var _metaphor = require('../../metaphor/metaphor12.png');
var _metaphor2 = _interopRequireDefault(_metaphor);
var _metaphor3 = require('../../metaphor/metaphor15.png');
var _metaphor4 = _interopRequireDefault(_metaphor3);
var _metaphor5 = require('../../metaphor/metaphor16.png');
var _metaphor6 = _interopRequireDefault(_metaphor5);

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
} //difference
//distribution
//proportion
var fontSize = {
    "small": {
        "axis": 7,
        "label": 14,
        "legend": 10
    },
    "middle": {
        "axis": 10,
        "label": 18,
        "legend": 12
    },
    "wide": {
        "axis": 12,
        "label": 20,
        "legend": 14
    },
    "large": {
        "axis": 14,
        "label": 40,
        "legend": 21
    }
};
var chartMargin = {
    "proportion": {
        "small": {
            "top": 5,
            "right": 24,
            "bottom": 5,
            "left": 6
        },
        "middle": {
            "top": 10,
            "right": 45,
            "bottom": 10,
            "left": 15
        },
        "wide": {
            "top": 10,
            "right": 115,
            "bottom": 10,
            "left": 85
        },
        "large": {
            "top": 60,
            "right": 60,
            "bottom": 60,
            "left": 60
        }
    },
    "difference": {
        "small": {
            "top": 10,
            "right": 6,
            "bottom": 10,
            "left": 6
        },
        "middle": {
            "top": 14,
            "right": 10,
            "bottom": 14,
            "left": 10
        },
        "wide": {
            "top": 14,
            "right": 23,
            "bottom": 14,
            "left": 23
        },
        "large": {
            "top": 50,
            "right": 10,
            "bottom": 50,
            "left": 10
        }
    },
    "distribution": {
        "small": {
            "top": 5,
            "right": 15,
            "bottom": 5,
            "left": 15
        },
        "middle": {
            "top": 10,
            "right": 30,
            "bottom": 40,
            "left": 30
        },
        "wide": {
            "top": 10,
            "right": 100,
            "bottom": 10,
            "left": 100
        },
        "large": {
            "top": 15,
            "right": 55,
            "bottom": 60,
            "left": 55
        }
    }
};
var NUMFONT = "Arial-Regular";
var PieChart = function(_Chart) {
    _inherits(PieChart, _Chart);

    function PieChart() {
        _classCallCheck(this, PieChart);
        return _possibleConstructorReturn(this, (PieChart.__proto__ || Object.getPrototypeOf(PieChart)).apply(this, arguments));
    }
    _createClass(PieChart, [{
        key: 'displayProportion',
        value: function displayProportion() {
            /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata(),
                measure = this.measure(),
                focus = this.focus()[0],
                breakdown = this.breakdown(),
                container = this.container(),
                size = this.size(),
                style = this.style(),
                yEncoding = (measure.length > 1 ? "measure0:" : "") + (measure[0].aggregate === "count" ? "COUNT" : measure[0].field);
            if (!focus || breakdown.length !== 1) return; /* ----------------------- graph set up (size, margin) ---------------------- */
            var margin = chartMargin["proportion"][size],
                width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom,
                font = fontSize[size]; /* ----------------------------- data prosessing ---------------------------- */
            var focusItem = factData.find(function(d) {
                    return d[focus.field] === focus.value;
                }),
                restItems = factData.filter(function(d) {
                    return d[focus.field] !== focus.value;
                });
            if (!focusItem) return;
            var seriesData = [focusItem[yEncoding], d3.sum(restItems, function(d) {
                return d[yEncoding];
            })];
            var pieData = d3.pie().sort(null)(seriesData); /* ----------------------------------- vis ---------------------------------- */
            var svg = initSvg(container, width, height, margin);
            var content = svg.append("g").attr("class", "content"),
                hint = svg.append("g").attr("class", "hint");
            var percent = pieData[0].value / d3.sum(pieData, function(d) {
                return d.value;
            });
            var percentText = (percent * 100).toFixed(1) + "%";
            if (style === _style2.default.COMICS) {
                width = 0.9 * width;
                height = 0.9 * height;
            }
            var R = Math.min(height, width) / 2,
                strokeWidth = Math.min(R * 0.04, 8),
                textPadding = height * 0.002;
            var arc = d3.arc().innerRadius(0).outerRadius(R);
            var arc1 = d3.arc().innerRadius(0).outerRadius(R * 0.9);
            var leftR = pieData[0].endAngle > Math.PI + Math.PI / 4 ? R : R * 0.9;
            content.attr("transform", "translate(" + leftR + "," + R + ")").selectAll(".data_item").data(pieData).enter().append("path").lower().attr("class", "data_item").attr("fill", function(d, i) {
                return i === 0 ? _color2.default.HIGHLIGHT : _color2.default.DEFAULT;
            }).attr("stroke-width", function(d, i) {
                return i === 0 ? strokeWidth / 2 : 0;
            }).attr("stroke", function(d, i) {
                return i === 0 ? "#fff" : null;
            }).attr("d", function(d, i) {
                return i === 0 ? arc(d) : arc1(d);
            });
            if (this.size() === _size2.default.LARGE) {
                var v = (0, _multiline2.default)(hint, focus.value, font.label, 1.8 * R, 0, 2 * R + textPadding);
                v.attr("font-weight", 600).attr("fill", _color2.default.HIGHLIGHT);
                hint.append("text").attr("class", "percent").attr("x", 0) //for %
                    .attr("y", -textPadding).attr("dominant-baseline", "ideographic").attr("text-anchor", "middle").attr("font-family", NUMFONT).attr("font-size", font.label).attr("font-weight", 600).attr("fill", _color2.default.HIGHLIGHT).text(percentText);
                hint.attr("transform", "translate(" + content.node().getBBox().width / 2 + ",0)");
            } else {
                var _v = (0, _multiline2.default)(hint, focus.value, font.label, 1.8 * R, textPadding, 0);
                _v.attr("font-weight", 600).attr("fill", _color2.default.HIGHLIGHT).attr("text-anchor", "inherit");
                hint.append("text").attr("class", "percent").attr("x", 0) //for %
                    .attr("y", -textPadding).attr("dominant-baseline", "ideographic").attr("font-family", NUMFONT).attr("font-size", font.label).attr("font-weight", 600).attr("fill", _color2.default.HIGHLIGHT).text(percentText);
                hint.attr("transform", "translate(" + content.node().getBBox().width * 1.1 + "," + content.node().getBBox().height / 2 + ")");
            } //center??????
            svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x) + "," + ((this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y) + ")");
            if (style === _style2.default.COMICS) {
                var metaphor = svg.append("image");
                var metaphorWidth = size === _size2.default.LARGE ? width * 0.35 : width * 0.3;
                var metaphorHeight = metaphorWidth * 0.74;
                metaphor.attr('xlink:href', _metaphor6.default).attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", -metaphorWidth * 0.5).attr("y", -metaphorHeight * 0.16).attr("transform", "rotate(-45)");
                if (size === _size2.default.LARGE) metaphor.attr("y", metaphorHeight * 0.1);
                else if (size === _size2.default.SMALL) metaphor.attr("y", -metaphorHeight * 0.08);
                svg.node().prepend(metaphor.node()); //center??????
                if (size !== _size2.default.LARGE) {
                    svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x) + "," + ((this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y - metaphorHeight * 0.15) + ")");
                }
            }
            if (style === _style2.default.PICTOGRAPH) { //?????????????????????  breakdown values
                var pictype = void 0;
                if (breakdown[0].type === "temporal" || breakdown[0].type === "numerical") return;
                breakdown[0].values.forEach(function(ele, i) {
                    if (ele.attribute === focus.value) {
                        pictype = ele.pictype;
                    }
                }); /*------------------??????????????????icon----------------------------*/
                svg.append("defs").append("g").attr("id", 'pictypepiepro' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                var typesizex1 = svg.select('#pictypepiepro' + pictype).node().getBBox().width;
                var typesizey1 = svg.select('#pictypepiepro' + pictype).node().getBBox().height;
                var typex = svg.select('#pictypepiepro' + pictype).node().getBBox().x;
                var typey = svg.select('#pictypepiepro' + pictype).node().getBBox().y;
                var textheight = svg.select(".percent").node().getBBox().height;
                var scale = Math.sqrt(textheight * textheight / (typesizex1 * typesizey1));
                svg.append("defs").append("g").attr("id", "pictypepiepro").append("path").attr("d", _pictogram2.default[pictype]).attr("transform", function() {
                    return 'scale(' + scale + ')';
                });
                var cardWidth = this.width();
                var cardHeight = this.height();
                var typesizex2 = svg.select("tspan").node().getBBox().width; //let typesizey2=svg.select("tspan").node().getBBox().height;
                if (this.size() === _size2.default.LARGE) {
                    svg.append("text").attr("id", "textfocus") //.attr("x",cardWidth/2+typesizex1/2)
                        .text(focus.value).attr("font-family", 'RobotoMono-Regular').attr("font-size", font.label).attr("fill", _color2.default.HIGHLIGHT).attr("font-weight", 600).attr("x", cardWidth / 2).attr("y", cardHeight - typesizey1 * scale * 2).style("text-anchor", "middle").attr("dominant-baseline", "middle");
                    svg.select("#textfocus").attr("transform", 'translate(' + typesizex1 * scale / 3 + ',' + typesizey1 / 2 * scale + ')');
                    svg.append("g").append("use").attr("xlink:href", "#pictypepiepro").attr("id", "icontypepiepro").attr("x", cardWidth / 2 - typesizex1 * scale - typesizex2 / 2 - Math.abs(typex * scale) - 15) // .attr("y", 2*R+textPadding-Math.abs(typey*scale))
                        // .attr("y",cardHeight-typesizey1*scale-Math.abs(typey*scale))
                        .attr("y", cardHeight - typesizey1 * scale * 2 - Math.abs(typey * scale)).attr("fill", "#96A7CE");
                    svg.select("tspan").remove(); //.attr("x",typesizex1*scale )
                    //.attr("dy",47.19375-typesizey1*scale/4)
                    //.attr("y",-typesizey1*scale/6)
                } else {
                    svg.append("g").append("use").attr("xlink:href", "#pictypepiepro").attr("id", "icontypepiepro").attr("x", 2 * R - Math.abs(typex * scale)).attr("y", 1.1 * R - Math.abs(typey * scale)).attr("fill", "#96A7CE");
                    svg.append("text").attr("id", "textfocus") //.attr("x",cardWidth/2+typesizex1/2)
                        .text(focus.value).attr("font-family", 'RobotoMono-Regular').attr("font-size", font.label).attr("fill", _color2.default.HIGHLIGHT).attr("font-weight", 600).attr("x", 2 * R + typesizex1 * scale + 10).attr("y", 1.1 * R + typesizey1 * scale / 2) // .style("text-anchor", "middle")
                        .attr("dominant-baseline", "middle");
                    svg.append("text").attr("id", "textfocusnumber") //.attr("x",cardWidth/2+typesizex1/2)
                        .text(percentText).attr("font-family", 'RobotoMono-Regular').attr("font-size", font.label).attr("fill", _color2.default.HIGHLIGHT).attr("font-weight", 600).attr("x", 2 * R + typesizex1 * scale / 2 + typesizex2 / 2 + 10 / 2).attr("y", 1.1 * R - typesizey1 * scale).style("text-anchor", "middle").attr("dominant-baseline", "middle");
                    svg.select(".percent").remove();
                    svg.select("tspan").remove();
                }
                var a = svg.node().getBBox().width;
                var b = svg.node().getBBox().height;
                var c = svg.node().getBBox().x;
                var e = svg.node().getBBox().y;
                var transx = -c + cardWidth / 2 - a / 2;
                var transy = -e + cardHeight / 2 - b / 2;
                height = cardHeight;
                width = cardWidth;
                if ((a > cardWidth || b > cardHeight) && width / a < height / b) {
                    svg.attr("transform", 'scale(' + width / a + ')  translate(' + (cardWidth / (2 * width / a) - (a / 2 + c)) + ',' + (cardHeight / (2 * width / a) - (b / 2 + e)) + ') ');
                } else if ((a > cardWidth || b > cardHeight) && height / b <= width / a) {
                    svg.attr("transform", 'scale(' + height / b + ')  translate(' + (cardWidth / (2 * height / b) - (a / 2 + c)) + ',' + (cardHeight / (2 * height / b) - (b / 2 + e)) + ') ');
                } else {
                    svg.attr("transform", 'translate(' + transx + ' ,' + transy + ') ');
                }
            }
            return svg;
        }
    }, {
        key: 'displayDifference',
        value: function displayDifference() {
            var _this2 = this; /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata(),
                measure = this.measure(),
                focus = this.focus(),
                breakdown = this.breakdown(),
                container = this.container(),
                size = this.size(),
                style = this.style(),
                yEncoding = (measure.length > 1 ? "measure0:" : "") + (measure[0].aggregate === "count" ? "COUNT" : measure[0].field);
            if (focus.length < 2 || breakdown.length !== 1) return; /* ----------------------- graph set up (size, margin) ---------------------- */
            var margin = chartMargin["difference"][size],
                width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom,
                font = fontSize[size]; /* ----------------------------- data prosessing ---------------------------- */
            var focusItem1 = factData.find(function(d) {
                    return d[focus[0].field] === focus[0].value;
                }),
                focusItem2 = factData.find(function(d) {
                    return d[focus[1].field] === focus[1].value;
                });
            if (!focusItem1 || !focusItem2) return;
            var focusItems = [focusItem1[yEncoding], focusItem2[yEncoding]]; /* ----------------------------------- vis ---------------------------------- */
            var svg = initSvg(container, width, height, margin);
            var content = svg.append("g").attr("class", "content");
            var sum = d3.sum(factData, function(d) {
                return d[[yEncoding]];
            });
            if (style === _style2.default.COMICS) width = 0.8 * width;
            var piePadding = size === _size2.default.WIDE ? width * 0.05 : width * 0.02,
                textPadding = height * 0.002;
            var R = Math.min(height * 0.7, (width - piePadding) / 2) / 2,
                strokeWidth = Math.min(R * 0.08, 8);
            var arc = d3.arc().innerRadius(0).outerRadius(R);
            var arc1 = d3.arc().innerRadius(0).outerRadius(R * 0.9);
            var leftR = 0;
            var items = content.selectAll(".data_item").data(focusItems).enter().append('g').attr("class", "data_item");
            if (style !== _style2.default.PICTOGRAPH) { //value
                items.each(function(d, i) {
                    var v = (0, _multiline2.default)(d3.select(this), focus[i].value, font.label, 1.8 * R, 0, R + textPadding);
                    v.attr("font-weight", 600);
                });
                items.selectAll("text").attr("class", "label"); //percent
                items.append("text").attr("class", "percent").attr("x", font.label / 4) //for %
                    .attr("y", -R - textPadding).attr("text-anchor", "middle").attr("dominant-baseline", "ideographic").attr("font-family", NUMFONT).attr("font-size", font.label).attr("font-weight", 600).text(function(d) {
                        return (d / sum * 100).toFixed(1) + "%";
                    });
                items.each(function(item, index) {
                    var seriesData = [focusItems[index], sum - focusItems[index]];
                    var pieData = d3.pie().sort(null)(seriesData);
                    d3.select(this).selectAll('.data_item_detail').data(pieData).enter().append("path").lower().attr("fill", function(d, i) {
                        return i === 0 ? _color2.default.HIGHLIGHT : _color2.default.DEFAULT;
                    }).attr("stroke-width", function(d, i) {
                        return i === 0 ? strokeWidth / 2 : 0;
                    }).attr("stroke", "#fff").attr("d", function(d, i) {
                        return i === 0 ? arc(d) : arc1(d);
                    });
                    d3.select(this).attr("transform", function(d, i) {
                        leftR = pieData[0].endAngle > Math.PI + Math.PI / 4 ? R : R * 0.9;
                        return "translate(" + (index * leftR + index * R + index * piePadding + leftR) + "," + height / 2 + ")";
                    });
                });
                if (style === _style2.default.COMICS) {
                    var metaphorWidth = width * 0.2;
                    var metaphorHeight = metaphorWidth * 1.3;
                    var metaphor = svg.append("image").attr('xlink:href', _metaphor2.default);
                    if (size === _size2.default.WIDE) {
                        metaphor.attr("x", 4 * R + 2 * piePadding).attr("y", 3 * R - font.label - metaphorHeight);
                    } else if (size === _size2.default.LARGE) {
                        metaphorWidth = width * 0.3;
                        metaphorHeight = metaphorWidth * 1.09;
                        metaphor.attr("x", 4 * R).attr("y", 3 * R + textPadding + font.label / 2 - metaphorHeight);
                    } else if (size === _size2.default.MIDDLE) {
                        metaphorWidth = width * 0.25;
                        metaphorHeight = metaphorWidth * 1.09;
                        metaphor.attr("x", 4 * R).attr("y", 2 * R - 0.6 * metaphorHeight);
                    } else if (size === _size2.default.SMALL) {
                        metaphorWidth = width * 0.3;
                        metaphorHeight = metaphorWidth * 1.09;
                        metaphor.attr("x", 4 * R).attr("y", 2 * R - 0.6 * metaphorHeight);
                    }
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight);
                }
            }
            if (style === _style2.default.PICTOGRAPH) {
                var _ret = function() { //?????????????????????  breakdown values
                    var pictype = [];
                    if (breakdown[0].type === "temporal" || breakdown[0].type === "numerical") return {
                        v: void 0
                    };
                    breakdown[0].values.forEach(function(ele, i) {
                        if (ele.attribute === focus[0].value) {
                            pictype.push(ele.pictype);
                        }
                    });
                    breakdown[0].values.forEach(function(ele, i) {
                        if (ele.attribute === focus[1].value) {
                            pictype.push(ele.pictype);
                        }
                    }); /*------------------??????????????????icon----------------------------*/
                    svg.append("defs").selectAll("g").data(pictype).enter().append("g").attr("id", function(d) {
                        return 'picpiediff' + d;
                    }).append("path").attr("d", function(d) {
                        return _pictogram2.default[d];
                    });
                    items.append("text").attr("class", "percent").attr("x", font.label / 4) //for %
                        .attr("y", -R - textPadding).style("text-anchor", "middle").style("dominant-baseline", "ideographic").attr("font-family", 'RobotoMono-Regular').style("font-size", font.label).style("font-weight", 600).text(function(d) {
                            return (d / sum * 100).toFixed(1) + "%";
                        });
                    var scale = [];
                    var typesizex1 = [];
                    var typesizey1 = [];
                    var typex1 = [];
                    var typey1 = [];
                    var textheight = svg.select(".percent").node().getBBox().height;
                    var _loop = function _loop(i) {
                        typesizex1.push(svg.select('#picpiediff' + pictype[i]).node().getBBox().width);
                        typesizey1.push(svg.select('#picpiediff' + pictype[i]).node().getBBox().height);
                        typex1.push(svg.select('#picpiediff' + pictype[i]).node().getBBox().x);
                        typey1.push(svg.select('#picpiediff' + pictype[i]).node().getBBox().y);
                        svg.select('#picpiediff' + pictype[i]).attr("transform", function() {
                            scale.push(Math.sqrt(textheight * textheight / (typesizex1[i] * typesizey1[i])));
                            return 'scale(' + scale[i] + ')';
                        });
                    };
                    for (var i = 0; i < pictype.length; i++) {
                        _loop(i);
                    } //value
                    items.each(function(d, i) {
                        var v = (0, _multiline2.default)(d3.select(this), focus[i].value, font.label, 1.8 * R, 0, R + textPadding + typesizey1[i] * scale[i]);
                        v.style("font-weight", 600);
                    });
                    items.selectAll("text").attr("class", "label"); // let cardWidth=this.width();
                    // let cardHeight=this.height();
                    items.append("use").attr("xlink:href", function(d, i) {
                        return '#picpiediff' + pictype[i];
                    }).attr("id", function(d, i) {
                        return 'picnamepiediff' + pictype[i];
                    }).attr("x", function(d, i) {
                        return -typesizex1[i] * scale[i] / 2 - Math.abs(typex1[i] * scale[i]);
                    }).attr("y", function(d, i) {
                        return R + textPadding - Math.abs(typey1[i] * scale[i]);
                    }).attr("fill", "#96A7CE");
                    items.each(function(item, index) {
                        var seriesData = [focusItems[index], sum - focusItems[index]];
                        var pieData = d3.pie().sort(null)(seriesData);
                        d3.select(this).selectAll('.data_item_detail').data(pieData).enter().append("path").lower().attr("fill", function(d, i) {
                            return i === 0 ? _color2.default.HIGHLIGHT : _color2.default.DEFAULT;
                        }).attr("stroke-width", function(d, i) {
                            return i === 0 ? strokeWidth / 2 : 0;
                        }).attr("stroke", "#fff").attr("d", function(d, i) {
                            return i === 0 ? arc(d) : arc1(d);
                        });
                        d3.select(this).attr("transform", function(d, i) {
                            leftR = pieData[0].endAngle > Math.PI + Math.PI / 4 ? R : R * 0.9;
                            return "translate(" + (index * leftR + index * R + index * piePadding + leftR) + "," + height / 2 + ")";
                        });
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
                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            } //center??????
            if (this.style() !== _style2.default.PICTOGRAPH) svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x) + "," + ((this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y) + ")");
            return svg;
        }
    }, {
        key: 'displayDistribution',
        value: function displayDistribution() {
            var _this3 = this; /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata(),
                measure = this.measure(),
                container = this.container(),
                size = this.size(),
                style = this.style(),
                yEncoding = (measure.length > 1 ? "measure0:" : "") + (measure[0].aggregate === "count" ? "COUNT" : measure[0].field);
            var breakdown = this.breakdown();
            if (breakdown.length !== 1) return;
            breakdown = breakdown[0];
            if (style === _style2.default.BUSINESS || style === _style2.default.COMICS) {
                /* ----------------------- graph set up (size, margin) ---------------------- */
                var margin = chartMargin["distribution"][size],
                    width = this.width() - margin.left - margin.right,
                    height = this.height() - margin.top - margin.bottom,
                    font = fontSize[size]; /* ----------------------------- data prosessing ---------------------------- */
                factData.sort(function(a, b) {
                    return b[yEncoding] - a[yEncoding];
                });
                var seriesData = factData;
                if (seriesData.length > 10) { // ??????10???
                    seriesData = factData.slice(0, 9); // ?????????9???
                    var rest = {};
                    rest[breakdown.field] = "Others";
                    rest[yEncoding] = d3.sum(factData.slice(9), function(d) {
                        return d[yEncoding];
                    }); // ???????????????group
                    seriesData.push(rest);
                }
                var pieData = d3.pie().value(function(d) {
                    return d[yEncoding];
                }).sort(null)(seriesData); // /* ----------------------------------- vis ---------------------------------- */
                var svg = initSvg(container, width, height, margin);
                var content = svg.append("g").attr("class", "content");
                var sum = d3.sum(pieData, function(d) {
                    return d.value;
                });
                if (style === _style2.default.COMICS) width = 0.8 * width;
                var R = Math.min(height, width) / 2;
                var arc = d3.arc().innerRadius(0).outerRadius(R);
                content.selectAll(".data_item").data(pieData).enter().append("path").attr("class", "data_item").attr("transform", "translate(" + R + "," + R + ")").attr("fill", function(d, i) {
                        return _color2.default.CATEGORICAL[i];
                    }) //(d,i) => i < 10 ? Color.CATEGORICAL[i] : Color.DASHLINE)
                    .attr("d", arc); //legend
                seriesData = seriesData.slice(0, 9); //hide others
                //if same year
                var sameYear = "";
                if (breakdown.type === "temporal") {
                    try {
                        var year = getSameYear(seriesData.map(function(d) {
                            return d[breakdown.field];
                        }));
                        sameYear = year + "/";
                    } catch (e) { //keep origin
                    }
                }
                var tickSize = font.legend,
                    chartWidth = this.width();
                if (this.size() === _size2.default.WIDE) {
                    var foreignObject = svg.append("foreignObject").attr("x", 2 * R * 1.2).attr("y", 8).attr("width", chartWidth / 2.05).attr("height", 2 * R - 5);
                    var legends = foreignObject.append("xhtml:div").attr("class", "legends").style("display", "flex").style("flex-direction", "column").style("flex-wrap", "wrap").style("justify-content", "space-around").style("height", Math.ceil(2 * R - 5) + "px");
                    legends.selectAll(".legend").data(seriesData).enter().append("xhtml:div").attr("class", "legend").style("line-height", 1).style("margin-right", 5 * chartWidth / 320 + "px").each(function(d, i) {
                        var legend = d3.select(this).append("svg");
                        legend.append("rect").attr("fill", _color2.default.CATEGORICAL[i]).attr("width", tickSize).attr('height', tickSize).attr("rx", 1.5 * chartWidth / 320).attr("ry", 1.5 * chartWidth / 320);
                        var text = d[breakdown.field].replace(sameYear, "");
                        text = text.length > 20 ? text.substring(0, 18) + "???" : text;
                        text += ':' + (d[yEncoding] / sum * 100).toFixed(1) + '%';
                        legend.append("text").attr("fill", _color2.default.TEXT).attr("x", tickSize + 2).text(text).attr("font-size", tickSize).attr("font-family", NUMFONT).attr("alignment-baseline", "hanging");
                        legend.attr("width", legend.node().getBBox().width);
                        legend.attr("height", legend.node().getBBox().height);
                    });
                    legends.style("width", "fit-content");
                    foreignObject.attr("width", legends.node().offsetWidth);
                    svg.attr("transform", "translate(" + (this.width() - svg.node().getBBox().width) / 2 + "," + (this.height() - svg.node().getBBox().height) / 2 + ")");
                } else {
                    var textHeight = 0;
                    if (this.size() === _size2.default.LARGE && sameYear !== "") {
                        var yearText = svg.append("text").text("Year:" + sameYear.replace("/", "")).attr("font-size", tickSize).attr("font-family", NUMFONT).attr("y", margin.top).attr("x", width / 2).attr("fill", _color2.default.TEXT).attr("text-anchor", "middle");
                        textHeight = yearText.node().getBBox().height + 10; //margin
                    }
                    var _foreignObject = svg.append("foreignObject").attr("x", chartWidth * 0.02 - margin.left).attr("width", chartWidth * 0.96).attr("height", margin.bottom);
                    var _legends = _foreignObject.append("xhtml:div").attr("class", "legends").style("display", "grid").style("width", "100%").style("grid-template-rows", 'repeat(4, min-content)').style("grid-template-columns", 'repeat(3, auto)').style("justify-content", "space-around").style("grid-auto-flow", "row");
                    _legends.selectAll(".legend").data(seriesData).enter().append("xhtml:div").attr("class", "legend").style("display", "inline-grid").style("width", "fit-content").style("line-height", 0).each(function(d, i) {
                        var legend = d3.select(this).append("svg");
                        legend.append("rect").attr("fill", _color2.default.CATEGORICAL[i]).attr("width", tickSize).attr('height', tickSize).attr("rx", 1.5 * chartWidth / 320).attr("ry", 1.5 * chartWidth / 320);
                        var text = d[breakdown.field].replace(sameYear, "");
                        if (size === _size2.default.SMALL) {
                            text = text.length > 4 ? text.substring(0, 2) + "???" : text;
                        } else {
                            text = text.length > 9 ? text.substring(0, 7) + "???" : text;
                        }
                        text += ':' + (d[yEncoding] / sum * 100).toFixed(1) + '%';
                        legend.append("text").attr("fill", _color2.default.TEXT).attr("x", tickSize + 2).text(text).attr("font-size", tickSize).attr("font-family", NUMFONT).attr("alignment-baseline", "hanging");
                        legend.attr("width", legend.node().getBBox().width);
                        legend.attr("height", legend.node().getBBox().height);
                    }); //fit size
                    var legendsHeight = _legends.node().offsetHeight;
                    _foreignObject.attr("height", legendsHeight); //???legend???????????????????????????pie
                    R = Math.min((height + margin.top + margin.bottom - legendsHeight - textHeight) * 0.85, width) / 2;
                    arc.outerRadius(R);
                    content.selectAll(".data_item").attr("transform", "translate(" + R + "," + (R + textHeight) + ")").attr("d", arc);
                    _foreignObject.attr("y", 2.15 * R + textHeight); //center??????
                    svg.attr("transform", "translate(" + margin.left + "," + ((this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y) + ")");
                    content.attr("transform", 'translate(' + (width - 2 * R) / 2 + ', 0)');
                }
                if (style === _style2.default.COMICS) {
                    var metaphorWidth = width * 0.3;
                    var metaphorHeight = metaphorWidth * 1.09;
                    var metaphor = content.append("image").attr('xlink:href', _metaphor4.default).attr("width", metaphorWidth).attr("height", metaphorHeight);
                    if (size === _size2.default.WIDE) {
                        metaphorWidth = width * 0.3;
                        metaphorHeight = metaphorWidth * 1.09;
                        metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", 2 * R - metaphorWidth * 0.2).attr("y", 2 * R - metaphorHeight * 1.1); //center
                        svg.select("foreignObject").attr("x", 2 * R + metaphorWidth);
                        svg.attr("transform", "translate(" + (this.width() - svg.node().getBBox().width) / 2 + "," + (this.height() - svg.node().getBBox().height) / 2 + ")");
                    } else {
                        if (size === _size2.default.LARGE) {
                            metaphorWidth = width * 0.35;
                            metaphorHeight = metaphorWidth * 1.09;
                            metaphor.attr("x", 2 * R);
                        } else if (size === _size2.default.MIDDLE) {
                            metaphorWidth = width * 0.3;
                            metaphorHeight = metaphorWidth * 1.09;
                            metaphor.attr("x", 2.1 * R);
                        } else if (size === _size2.default.SMALL) {
                            metaphorWidth = width * 0.35;
                            metaphorHeight = metaphorWidth * 1.09;
                            metaphor.attr("x", 2.1 * R);
                        }
                        metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("y", 2 * R - metaphorHeight * 1.1); //center
                        content.attr("transform", 'translate(' + (width / 0.8 - content.node().getBBox().width) / 2 + ', 0)');
                    }
                }
                return svg;
            }
            if (style === _style2.default.PICTOGRAPH) {
                var _ret3 = function() {
                    /* ----------------------- graph set up (size, margin) ---------------------- */
                    var margin = chartMargin["distribution"][size],
                        width = _this3.width() - margin.left - margin.right,
                        height = _this3.height() - margin.top - margin.bottom,
                        font = fontSize[size]; /* ----------------------------- data prosessing ---------------------------- */
                    factData.sort(function(a, b) {
                        return b[yEncoding] - a[yEncoding];
                    });
                    var seriesData = factData;
                    if (seriesData.length > 10) { // ??????10???
                        seriesData = factData.slice(0, 9); // ?????????9???
                        var _rest = {};
                        _rest[breakdown.field] = "Others";
                        _rest[yEncoding] = d3.sum(factData.slice(9), function(d) {
                            return d[yEncoding];
                        }); // ???????????????group
                        seriesData.push(_rest);
                    }
                    var pieData = d3.pie().value(function(d) {
                        return d[yEncoding];
                    }).sort(null)(seriesData); /* ----------------------------------- vis ---------------------------------- */
                    var svg = initSvg(container, width, height, margin);
                    var content = svg.append("g").attr("class", "content");
                    var sum = d3.sum(pieData, function(d) {
                        return d.value;
                    });
                    if (style === _style2.default.COMICS) width = 0.8 * width;
                    var R = Math.min(height, width) / 2;
                    var arc = d3.arc().innerRadius(0).outerRadius(R);
                    content.selectAll(".data_item").data(pieData).enter().append("path").attr("class", "data_item").attr("transform", "translate(" + R + "," + R + ")").attr("fill", function(d, i) {
                            return _color2.default.CATEGORICAL[i];
                        }) //(d,i) => i < 10 ? Color.CATEGORICAL[i] : Color.DASHLINE)
                        .attr("d", arc); //legend
                    seriesData = seriesData.slice(0, 9); //hide others
                    //if same year
                    var sameYear = "";
                    if (breakdown.type === "temporal") {
                        try {
                            var _year = getSameYear(seriesData.map(function(d) {
                                return d[breakdown.field];
                            }));
                            sameYear = _year + "/";
                        } catch (e) { //keep origin
                        }
                    }
                    var tickSize = font.legend,
                        chartWidth = _this3.width();
                    if (breakdown.type === "temporal" || breakdown.type === "numerical") return {
                        v: void 0
                    };
                    var angletotal = [];
                    for (var i = 0; i < pieData.length; i++) {
                        angletotal.push(pieData[i].endAngle - pieData[i].startAngle);
                    }
                    var pictypename = [];
                    var pictype = [];
                    seriesData.forEach(function(ele, i) {
                        pictypename.push(ele[breakdown.field]);
                    }); //icon ????????????????????? ???????????????????????????????????????
                    pictypename.forEach(function(ele1) {
                        breakdown.values.forEach(function(ele, i) {
                            if (ele.attribute === ele1) {
                                pictype.push(ele.pictype);
                            }
                        });
                    }); /*------------------??????????????????icon----------------------------*/
                    svg.append("defs").selectAll("g").data(pictype).enter().append("g").attr("id", function(d) {
                        return 'picpiedis' + d;
                    }).append("path").attr("d", function(d) {
                        return _pictogram2.default[d];
                    }); /*-----------------??????icon---------------------------*/
                    var scale = [];
                    var typesizex1 = [];
                    var typesizey1 = [];
                    var typex1 = [];
                    var typey1 = [];
                    var radiuss = R;
                    var _loop2 = function _loop2(_i) {
                        typesizex1.push(svg.select('#picpiedis' + pictype[_i]).node().getBBox().width);
                        typesizey1.push(svg.select('#picpiedis' + pictype[_i]).node().getBBox().height);
                        typex1.push(svg.select('#picpiedis' + pictype[_i]).node().getBBox().x);
                        typey1.push(svg.select('#picpiedis' + pictype[_i]).node().getBBox().y);
                        svg.select('#picpiedis' + pictype[_i]).attr("transform", function() {
                            scale.push(Math.sqrt(radiuss * radiuss / 36 / (typesizey1[_i] * typesizex1[_i])));
                            return 'scale(' + scale[_i] + ')';
                        });
                    };
                    for (var _i = 0; _i < pictype.length; _i++) {
                        _loop2(_i);
                    }
                    if (size === _size2.default.WIDE) {
                        var _foreignObject2 = svg.append("foreignObject").attr("x", 2 * R * 1.2).attr("y", 8).attr("width", chartWidth / 2.05).attr("height", 2 * R - 5);
                        var _legends2 = _foreignObject2.append("xhtml:div").attr("class", "legends").style("display", "flex").style("flex-direction", "column").style("flex-wrap", "wrap").style("justify-content", "space-around").style("height", Math.ceil(2 * R - 5) + "px");
                        _legends2.selectAll(".legend").data(seriesData).enter().append("xhtml:div").attr("class", "legend").style("line-height", 1).style("margin-right", 5 * chartWidth / 320 + "px").each(function(d, i) {
                            var legend = d3.select(this).append("svg");
                            legend.append("rect").attr("fill", _color2.default.CATEGORICAL[i]).attr("width", tickSize).attr('height', tickSize).attr("rx", 1.5 * chartWidth / 320).attr("ry", 1.5 * chartWidth / 320);
                            var text = d[breakdown.field].replace(sameYear, "");
                            text = text.length > 20 ? text.substring(0, 18) + "???" : text;
                            text += ':' + (d[yEncoding] / sum * 100).toFixed(1) + '%';
                            legend.append("text").attr("fill", _color2.default.TEXT).attr("x", tickSize + 2).text(text).attr("font-size", tickSize).attr("font-family", NUMFONT).attr("alignment-baseline", "hanging");
                            legend.attr("width", legend.node().getBBox().width);
                            legend.attr("height", legend.node().getBBox().height);
                        });
                        _legends2.style("width", "fit-content");
                        _foreignObject2.attr("width", _legends2.node().offsetWidth); //append icon
                        content.append("g").selectAll("use").data(pieData).enter().append("use").attr("xlink:href", function(d, i) {
                                if (angletotal[i] > Math.PI / 6) return '#picpiedis' + pictype[i];
                                else return null;
                            }) //    .attr("x",function(d,i){
                            //        if(angletotal[i]>Math.PI/6) {
                            //           return  R+arc.centroid(d)[0]*0.5 -typesizex1[i]/2-Math.abs(typex1[i]*scale[i]);
                            //        }else return null;
                            //    })
                            //    .attr("y",function(d,i){
                            //        if(angletotal[i]>Math.PI/6) {
                            //            return  R+arc.centroid(d)[0]*0.5 -typesizey1[i]/2-Math.abs(typey1[i]*scale[i]);
                            //        }else return null;
                            //    })
                            .attr('transform', function(d, i) {
                                if (angletotal[i] > Math.PI / 6) {
                                    var x = radiuss + arc.centroid(d)[0] * 1.2 - typesizex1[i] / 3 - Math.abs(typex1[i] * scale[i]);
                                    var y = radiuss + arc.centroid(d)[1] * 1.2 - typesizey1[i] / 3 - Math.abs(typey1[i] * scale[i]);
                                    return 'translate(' + x + ', ' + y + ')';
                                }
                            }).attr("fill", "#96A7CE");
                        svg.attr("transform", "translate(" + (_this3.width() - svg.node().getBBox().width) / 2 + "," + (_this3.height() - svg.node().getBBox().height) / 2 + ")");
                    } else {
                        var _textHeight = 0;
                        if (size === _size2.default.LARGE && sameYear !== "") {
                            var _yearText = svg.append("text").text("Year:" + sameYear.replace("/", "")).attr("font-size", tickSize).attr("font-family", NUMFONT).attr("y", margin.top).attr("x", width / 2).attr("fill", _color2.default.TEXT).attr("text-anchor", "middle");
                            _textHeight = _yearText.node().getBBox().height + 10; //margin
                        }
                        var _foreignObject3 = svg.append("foreignObject").attr("x", chartWidth * 0.02 - margin.left).attr("width", chartWidth * 0.96).attr("height", margin.bottom);
                        var _legends3 = _foreignObject3.append("xhtml:div").attr("class", "legends").style("display", "grid").style("width", "100%").style("grid-template-rows", 'repeat(4, min-content)').style("grid-template-columns", 'repeat(3, auto)').style("justify-content", "space-around").style("grid-auto-flow", "row");
                        _legends3.selectAll(".legend").data(seriesData).enter().append("xhtml:div").attr("class", "legend").style("display", "inline-grid").style("width", "fit-content").style("line-height", 0).each(function(d, i) {
                            var legend = d3.select(this).append("svg");
                            legend.append("rect").attr("fill", _color2.default.CATEGORICAL[i]).attr("width", tickSize).attr('height', tickSize).attr("rx", 1.5 * chartWidth / 320).attr("ry", 1.5 * chartWidth / 320);
                            var text = d[breakdown.field].replace(sameYear, "");
                            if (size === _size2.default.SMALL) {
                                text = text.length > 4 ? text.substring(0, 2) + "???" : text;
                            } else {
                                text = text.length > 9 ? text.substring(0, 7) + "???" : text;
                            }
                            text += ':' + (d[yEncoding] / sum * 100).toFixed(1) + '%';
                            legend.append("text").attr("fill", _color2.default.TEXT).attr("x", tickSize + 2).text(text).attr("font-size", tickSize).attr("font-family", NUMFONT).attr("alignment-baseline", "hanging");
                            legend.attr("width", legend.node().getBBox().width);
                            legend.attr("height", legend.node().getBBox().height);
                        }); //fit size
                        var _legendsHeight = _legends3.node().offsetHeight;
                        _foreignObject3.attr("height", _legendsHeight); //???legend???????????????????????????pie
                        R = Math.min((height + margin.top + margin.bottom - _legendsHeight - _textHeight) * 0.85, width) / 2;
                        arc.outerRadius(R); //append icon
                        content.append("g").selectAll("use").data(pieData).enter().append("use").attr("xlink:href", function(d, i) {
                                if (angletotal[i] > Math.PI / 6) return '#picpiedis' + pictype[i];
                                else return null;
                            }) //    .attr("x",function(d,i){
                            //        if(angletotal[i]>Math.PI/6) {
                            //            if(size===Size.LARGE)
                            //                return R+arc.centroid(d)[0]*1.2  -typesizex1[i]/2-Math.abs(typex1[i]*scale[i]);
                            //            // if(size===Size.WIDE)
                            //            else
                            //                return  R*1.1+arc.centroid(d)[0]*1 -typesizex1[i]/2-Math.abs(typex1[i]*scale[i]);
                            //        }else return null;
                            //    })
                            //    .attr("y",function(d,i){
                            //        if(angletotal[i]>Math.PI/6) {
                            //            if(size===Size.LARGE)
                            //                return R+arc.centroid(d)[1]*1.2 -typesizey1[i]/2-Math.abs(typey1[i]*scale[i]);
                            //            else
                            //                return  R+arc.centroid(d)[0]*1 -typesizey1[i]/2-Math.abs(typey1[i]*scale[i]);
                            //        }else return null;
                            //    })
                            .attr('transform', function(d, i) {
                                if (angletotal[i] > Math.PI / 6) {
                                    if (size === _size2.default.LARGE) {
                                        var x = R + arc.centroid(d)[0] * 1.2 - typesizex1[i] / 3 - Math.abs(typex1[i] * scale[i]);
                                        var y = R + arc.centroid(d)[1] * 1.2 - typesizey1[i] / 3 - Math.abs(typey1[i] * scale[i]);
                                        return 'translate(' + x + ', ' + y + ')';
                                    } else if (size === _size2.default.SMALL) {
                                        var _x = radiuss + arc.centroid(d)[0] * 1.2 - typesizex1[i] / 3 * 2 - Math.abs(typex1[i] * scale[i]);
                                        var _y = radiuss + arc.centroid(d)[1] * 1.2 - typesizey1[i] / 3 * 2 - Math.abs(typey1[i] * scale[i]);
                                        return 'translate(' + _x + ', ' + _y + ')';
                                    } else {
                                        var _x2 = radiuss + arc.centroid(d)[0] * 1.2 - typesizex1[i] / 3 - Math.abs(typex1[i] * scale[i]);
                                        var _y2 = radiuss + arc.centroid(d)[1] * 1.2 - typesizey1[i] / 3 - Math.abs(typey1[i] * scale[i]);
                                        return 'translate(' + _x2 + ', ' + _y2 + ')';
                                    }
                                }
                            }).attr("fill", "#96A7CE");
                        content.selectAll(".data_item").attr("transform", "translate(" + R + "," + (R + _textHeight) + ")").attr("d", arc);
                        _foreignObject3.attr("y", 2.15 * R + _textHeight); //center??????
                        svg.attr("transform", "translate(" + margin.left + "," + ((_this3.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y) + ")");
                        content.attr("transform", 'translate(' + (width - 2 * R) / 2 + ', 0)');
                    }
                    return {
                        v: svg
                    };
                }();
                if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
            } // content.property("_r", R);
        }
    }, {
        key: 'animateProportion',
        value: function animateProportion() {
            var svg = this.displayProportion();
            if (!svg) return; /* ----------------------- graph set up (size, margin) ---------------------- */
            var size = this.size(),
                margin = chartMargin["proportion"][size],
                width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom,
                duration = this.duration(),
                ticks = 10;
            var R = Math.min(height, width) / 2;
            var arc = d3.arc().innerRadius(0).outerRadius(R);
            var arc_others = d3.arc().innerRadius(0).outerRadius(R * 0.9); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                bgFadeIn: {
                    duration: 2,
                    index: 0
                },
                textFadeIn: {
                    duration: 2,
                    index: 1
                },
                majorGrow: {
                    duration: 6,
                    index: 2
                }
            };
            var everyTick = duration / ticks; /* ----------------------------- step 0 bgFadeIn ---------------------------- */
            var bg = svg.selectAll(".data_item").filter(function(d, i) {
                    return i === 0;
                }),
                arcFocus = svg.selectAll(".data_item").filter(function(d, i) {
                    return i !== 0;
                });
            arcFocus.attr("d", function(d, i) {
                var _d = Object.assign({}, d);
                _d.endAngle = _d.startAngle;
                return arc(_d);
            });
            bg.attr("d", function(d, i) {
                var _d = Object.assign({}, d);
                _d.startAngle = 0;
                return arc_others(_d);
            });
            bg.attr("opacity", 0).transition().duration(everyTick * animation.bgFadeIn.duration).attr("opacity", 1); /* ---------------------------- step 1 textFadeIn --------------------------- */
            var hintText = svg.selectAll(".hint");
            var label = hintText.selectAll("text").filter(function() {
                return !this.classList.contains('percent');
            });
            label.attr("fill", "black");
            label.attr("opacity", 0);
            setTimeout(function() {
                label.transition().duration(everyTick * (animation.textFadeIn.duration + 0.5)).attr("opacity", 1);
            }, everyTick * countTicksBeforeIndex(animation, animation.textFadeIn.index)); /* ---------------------------- step 2 majorGrow --------------------------- */
            arcFocus.attr("opacity", 0);
            var percent = svg.selectAll(".percent");
            percent.attr("opacity", 0);
            setTimeout(function() {
                percent.attr("opacity", 1);
                percent.transition().duration(everyTick * animation.majorGrow.duration) // .ease(d3.easeLinear)
                    .textTween(function(d) {
                        var final = d3.select(this).text().split("%")[0];
                        var i = d3.interpolate(0.0, final);
                        var numberFormat = d3.format(".1f");
                        return function(t) {
                            var _percent = numberFormat(i(t));
                            return _percent + "%";
                        };
                    });
                arcFocus.attr("opacity", 1);
                arcFocus.transition().duration(function(d, i) {
                    return everyTick * animation.majorGrow.duration;
                }).attrTween("d", function(d, i) {
                    var interpolate = d3.interpolate(d.startAngle, d.endAngle);
                    return function(t) {
                        d.endAngle = interpolate(t);
                        return arc(d);
                    };
                });
            }, everyTick * countTicksBeforeIndex(animation, animation.majorGrow.index)); /* ---------------------------- step 1 majorGrow --------------------------- */ // let hintText = svg.selectAll(".hint");
            // hintText.style("opacity", 0);
            // setTimeout(()=>{
            //     hintText.transition()
            //             .duration(everyTick * (animation.textFadeIn.duration + 0.5))
            //             .style("opacity", 1);
            // }, everyTick * countTicksBeforeIndex(animation, animation.textFadeIn.index))
        }
    }, {
        key: 'animateDifference',
        value: function animateDifference() {
            var svg = this.displayDifference();
            if (!svg) return; /* ----------------------- graph set up (size, margin) ---------------------- */
            var size = this.size(),
                margin = chartMargin["difference"][size],
                width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom,
                duration = this.duration(),
                ticks = 10;
            var piePadding = size === _size2.default.WIDE ? width * 0.05 : width * 0.02;
            var R = Math.min(height * 0.7, (width - piePadding) / 2) / 2;
            var arc = d3.arc().innerRadius(0).outerRadius(R);
            var arc_others = d3.arc().innerRadius(0).outerRadius(R * 0.9); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                labelFadeIn: {
                    duration: 2,
                    index: 0
                },
                majorGrow: {
                    duration: 8,
                    index: 1
                }
            };
            var everyTick = duration / ticks; /* --------------------------- step 0 labelFadeIn --------------------------- */
            var labels = svg.selectAll(".data_item").selectAll(".label");
            labels.attr("opacity", 0);
            labels.transition().duration(everyTick * animation.labelFadeIn.duration).attr("opacity", 1);
            svg.selectAll(".data_item").selectAll("path").filter(function(d, i) {
                return d3.select(this).attr("fill") === _color2.default.DEFAULT;
            }).attr("d", function(d, i) {
                var _d = Object.assign({}, d);
                _d.startAngle = 0;
                return arc_others(_d);
            }).attr("opacity", 0).transition().duration(everyTick * animation.labelFadeIn.duration).attr("opacity", 1); /* ---------------------------- step 1 majorGrow ---------------------------- */
            var percents = svg.selectAll(".data_item").selectAll(".percent");
            percents.attr("opacity", 0);
            svg.selectAll(".data_item").selectAll("path").filter(function(d, i) {
                return d3.select(this).attr("fill") !== _color2.default.DEFAULT;
            }).attr("d", function(d, i) {
                var _d = Object.assign({}, d);
                _d.endAngle = _d.startAngle;
                return arc(_d); // return i === 1 ? arc(_d) : arc_others(_d)
            });
            svg.selectAll(".data_item").selectAll("path").filter(function(d, i) {
                return d3.select(this).attr("fill") !== _color2.default.DEFAULT;
            }).attr("opacity", 0);
            setTimeout(function() {
                percents.attr("opacity", 1);
                percents.transition().duration(everyTick * animation.majorGrow.duration).ease(d3.easeLinear).textTween(function(d) {
                    var final = d3.select(this).text().split("%")[0];
                    var i = d3.interpolate(0.0, final);
                    var numberFormat = d3.format(".1f");
                    return function(t) {
                        var percent = numberFormat(i(t));
                        return percent + "%";
                    };
                });
                svg.selectAll(".data_item").selectAll("path").filter(function(d, i) {
                    return d3.select(this).attr("fill") !== _color2.default.DEFAULT;
                }).attr("opacity", 1).transition().duration(everyTick * animation.majorGrow.duration).ease(d3.easeLinear).attrTween("d", function(d, i) {
                    var interpolate = d3.interpolate(d.startAngle, d.endAngle);
                    return function(t) {
                        d.endAngle = interpolate(t);
                        return arc(d); // return i === 1 ? arc(d) : arc_others(d)
                    };
                });
            }, everyTick * countTicksBeforeIndex(animation, animation.majorGrow.index));
        }
    }, {
        key: 'animateDistribution',
        value: function animateDistribution() {
            var svg = this.displayDistribution();
            if (!svg) return; /* ----------------------- graph set up (size, margin) ---------------------- */
            var duration = this.duration(),
                ticks = 10;
            var R = svg.select(".content").property("_r");
            var arc = d3.arc().innerRadius(0).outerRadius(R); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                bgCircleGrow: {
                    duration: 2,
                    index: 0
                },
                legendFadeIn: {
                    duration: 4,
                    index: 1
                },
                arcGrow: {
                    duration: 8,
                    index: 1
                }
            };
            var everyTick = duration / ticks; /* --------------------------- step 0 bgCircleGrow -------------------------- */
            svg.select(".content").append("circle").lower().attr("cx", svg.select(".content").node().getBBox().width / 2).attr("cy", svg.select(".content").node().getBBox().height / 2).attr("fill", _color2.default.BACKGROUND).attr("r", 0).transition().duration(everyTick * animation.bgCircleGrow.duration).attr("r", R); /* --------------------------- step 1 legendFadeIn -------------------------- */
            var legends = svg.selectAll(".legends");
            legends.style("opacity", 0);
            setTimeout(function() {
                legends.transition().duration(everyTick * (animation.legendFadeIn.duration + 0.5)).style("opacity", 1);
            }, everyTick * countTicksBeforeIndex(animation, animation.legendFadeIn.index)); /* ----------------------------- step 1 arcGrow ----------------------------- */
            svg.selectAll(".data_item").attr("d", function(d, i) {
                var _d = Object.assign({}, d);
                _d.endAngle = _d.startAngle;
                return arc(_d);
            });
            setTimeout(function() {
                svg.selectAll(".data_item").transition().duration(everyTick * animation.arcGrow.duration).ease(d3.easeLinear).attrTween("d", function(d, i) {
                    var interpolate = d3.interpolate(d.startAngle, d.endAngle);
                    return function(t) {
                        d.endAngle = interpolate(t);
                        return arc(d);
                    };
                });
            }, everyTick * (countTicksBeforeIndex(animation, animation.arcGrow.index) + 0.5));
        }
    }]);
    return PieChart;
}(_chart2.default);
var initSvg = function initSvg(container, width, height, margin) {
    var svg = d3.select(container).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    return svg;
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
exports.default = PieChart;