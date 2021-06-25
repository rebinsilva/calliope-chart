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
var _metaphor = require('../../metaphor/metaphor29.png');
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
}
var fontSize = {
    "small": {
        "axis": 12
    },
    "middle": {
        "axis": 14
    },
    "wide": {
        "axis": 16
    },
    "large": {
        "axis": 20
    }
};
var chartMargin = {
    "small": {
        "top": 5,
        "right": 5,
        "bottom": 20,
        "left": 20
    },
    "middle": {
        "top": 10,
        "right": 10,
        "bottom": 24,
        "left": 24
    },
    "wide": {
        "top": 10,
        "right": 10,
        "bottom": 26,
        "left": 26
    },
    "large": {
        "top": 20,
        "right": 20,
        "bottom": 40,
        "left": 40
    }
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

function basicDraw(factData, xEncoding, yEncoding, svg, width, height) {
    var axis = svg.append("g").attr("class", "axis"),
        content = svg.append("g").attr("class", "content").attr("chartWidth", width).attr("chartHeight", height); // set the ranges
    var xScale = d3.scaleLinear().range([0, width]).domain([0, d3.max(factData, function(d) {
        return d[xEncoding];
    })]).nice();
    var yScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(factData, function(d) {
        return d[yEncoding];
    })]).nice();
    var axisX = d3.axisBottom(xScale).ticks(5).tickPadding(5).tickFormat(function(d) {
        if (d / 1000000 >= 1) {
            d = d / 1000000 + "M";
        } else if (d / 1000 >= 1) {
            d = d / 1000 + "K";
        }
        return d;
    });
    var axisY = d3.axisLeft(yScale).ticks(5).tickPadding(5).tickFormat(function(d) {
        if (d / 1000000 >= 1) {
            d = d / 1000000 + "M";
        } else if (d / 1000 >= 1) {
            d = d / 1000 + "K";
        }
        return d;
    });
    axis.append("g").attr("class", "axis_x").attr('transform', 'translate(0, ' + height + ')').call(axisX);
    axis.append("g").attr("class", "axis_y").call(axisY); /* draw points */
    var circleSize = Math.min(Math.ceil(Math.sqrt(height * width) / 50), 7);
    content.append("g").selectAll("circle").data(factData).enter().append("circle").attr("class", "data_item").attr("r", circleSize).attr("stroke", "#FFF").attr("stroke-width", 0).attr("fill", _color2.default.DEFAULT).attr("opacity", 0.6).attr("cx", function(d) {
        return xScale(d[xEncoding]);
    }).attr("cy", function(d) {
        return yScale(d[yEncoding]);
    });
    return svg;
}
var NUMFONT = "Arial-Regular";
var Scatterplot = function(_Chart) {
    _inherits(Scatterplot, _Chart);

    function Scatterplot() {
        _classCallCheck(this, Scatterplot);
        return _possibleConstructorReturn(this, (Scatterplot.__proto__ || Object.getPrototypeOf(Scatterplot)).apply(this, arguments));
    }
    _createClass(Scatterplot, [{
        key: 'animateTrend',
        value: function animateTrend() {
            var _this2 = this;
            var chartMargin = {
                "small": {
                    "top": 10,
                    "right": 10,
                    "bottom": 30,
                    "left": 50
                },
                "middle": {
                    "top": 20,
                    "right": 20,
                    "bottom": 40,
                    "left": 40
                },
                "wide": {
                    "top": 20,
                    "right": 20,
                    "bottom": 40,
                    "left": 50
                },
                "large": {
                    "top": 30,
                    "right": 50,
                    "bottom": 50,
                    "left": 60
                }
            }; /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata(),
                measure = this.measure(),
                breakdown = this.breakdown(),
                container = this.container(),
                size = this.size();
            if (measure.length < 2 || breakdown.length < 2) return;
            var seriesData = d3.nest().key(function(d) {
                return d[breakdown[1].field];
            }).entries(factData);
            var duration = this.duration();
            var tick = duration / seriesData.length;
            var data_index = 0;
            for (var i = 0; i < factData.length; i++) {
                factData[i]["Recovered"] = Math.floor(Math.random() * 11);
            } /* ----------------------- graph set up (size, margin) ---------------------- */
            var margin = chartMargin[size],
                width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom,
                font = fontSize[size],
                strokeWidth = size === _size2.default.SMALL || size === _size2.default.MIDDLE ? 1 : 2; /* ----------------------------- data prosessing ---------------------------- */ //association需两个measure
            var xEncoding = "measure0:" + (measure[0].aggregate === "count" ? "COUNT" : measure[0].field),
                yEncoding = "measure1:" + (measure[1].aggregate === "count" ? "COUNT" : measure[1].field); /* ----------------------------------- vis ---------------------------------- */
            var svg = d3.select(container).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            var axis = svg.append("g").attr("class", "axis"),
                content = svg.append("g").attr("class", "content").attr("chartWidth", width).attr("chartHeight", height); // set the ranges
            var xScale = d3.scaleLinear().range([0, width]).domain([0, 1.1 * d3.max(factData, function(d) {
                return d[xEncoding];
            })]).nice();
            var yScale = d3.scaleLinear().range([height, 0]).domain([0, 1.1 * d3.max(factData, function(d) {
                return d[yEncoding];
            })]).nice();
            var axisX = d3.axisBottom(xScale).ticks(5).tickPadding(5).tickFormat(function(d) {
                if (d / 1000000 >= 1) {
                    d = d / 1000000 + "M";
                } else if (d / 1000 >= 1) {
                    d = d / 1000 + "K";
                }
                return d;
            });
            var axisY = d3.axisLeft(yScale).ticks(5).tickPadding(5).tickFormat(function(d) {
                if (d / 1000000 >= 1) {
                    d = d / 1000000 + "M";
                } else if (d / 1000 >= 1) {
                    d = d / 1000 + "K";
                }
                return d;
            });
            axis.append("g").attr("class", "axis_x").attr('transform', 'translate(0, ' + height + ')').call(axisX).call(function(g) {
                g.selectAll(".tick").filter(function(d, i) {
                    return i === g.selectAll(".tick").size() - 1;
                }).remove();
                g.selectAll(".tick").selectAll("line").attr("y2", _this2.height() === 640 ? 6 : 6 * _this2.height() / 320).attr("stroke-width", strokeWidth);
                g.selectAll("text").attr("y", _this2.height() === 640 ? 9 : 9 * _this2.height() / 320);
                g.attr('font-size', font.axis);
                var domainD = g.selectAll(".domain").attr("d");
                var start = domainD.split(",")[0].substr(1);
                var end = domainD.split("H")[1].split("V")[0];
                g.selectAll(".domain").attr("stroke-width", strokeWidth).attr('stroke', _color2.default.AXIS).attr('d', "M" + +start + ",0H" + +end);
            });
            axis.append("g").attr("class", "axis_y").call(axisY).call(function(g) {
                g.selectAll(".tick").filter(function(d, i) {
                    return i === g.selectAll(".tick").size() - 1;
                }).remove();
                g.selectAll(".tick").selectAll("line").attr("x2", _this2.height() === 640 ? -6 : -6 * _this2.height() / 320).attr("stroke-width", strokeWidth);;
                g.selectAll("text").attr("x", _this2.height() === 640 ? -9 : -9 * _this2.height() / 320);
                g.attr('font-size', font.axis);
                var domainDY = g.selectAll(".domain").attr("d");
                var startY = domainDY.split(",")[1].split("H")[0];
                var endY = domainDY.split("V")[1].split("H")[0];
                g.selectAll(".domain").attr("stroke-width", strokeWidth).attr('stroke', _color2.default.AXIS).attr('d', "M0, " + startY + "V" + endY);
            }); //change style
            /* Axis */
            var padding = font.axis * 0.6,
                triangleSize = Math.ceil(Math.sqrt(height * width) / 10);
            axis = svg.select('.axis'); // svg.select(".axis_x").remove();
            // svg.select(".axis_y").remove();
            var textX = axis.append("text").attr("x", width / 2).attr("y", height + svg.selectAll(".axis_x").node().getBBox().height + padding).attr("font-family", NUMFONT).attr("font-size", font.axis * 1.2).attr("text-anchor", "middle").attr("dominant-baseline", "hanging").text(measure[0].field || "Count");
            axis.append("path").attr("class", "triangle").attr("transform", 'translate(' + (width - triangleSize / 25 * 2) + ', ' + height + ')rotate(90)').attr("d", d3.symbol().type(d3.symbolTriangle).size(triangleSize)).attr("fill", _color2.default.AXIS);
            var textY = axis.append("text").attr("transform", 'translate(' + (-padding - svg.selectAll(".axis_y").node().getBBox().width) + ', ' + height / 2 + ') rotate(-90)').attr("font-family", NUMFONT).attr("font-size", font.axis * 1.2).attr("text-anchor", "middle").text(measure[1].field || "Count"); //wrap
            wrap(textX, width);
            wrap(textY, height);

            function wrap(self, maxWidth) {
                var textLength = self.node().getComputedTextLength(),
                    text = self.text();
                while (textLength > maxWidth && text.length > 0) {
                    text = text.slice(0, -1);
                    self.text(text + '…');
                    textLength = self.node().getComputedTextLength();
                }
            }
            axis.append("path").attr("class", "triangle").attr("transform", 'translate(0, ' + triangleSize / 25 * 2 + ')').attr("d", d3.symbol().type(d3.symbolTriangle).size(triangleSize)).attr("fill", _color2.default.AXIS); /* draw points */
            var circleSize = Math.min(Math.ceil(Math.sqrt(height * width) / 50), 7);
            var circle_content = content.append("g");
            circle_content.selectAll("circle").data(seriesData[data_index].values).enter().append("circle").attr("class", "data_item").attr("r", circleSize).attr("stroke", "#FFF").attr("stroke-width", 0).attr("fill", _color2.default.DEFAULT) // .attr("opacity", 0.7)
                .attr("cx", function(d) {
                    return xScale(d[xEncoding]);
                }).attr("cy", function(d) {
                    return yScale(d[yEncoding]);
                }).attr("opacity", 0).transition().duration(tick).attr("opacity", 0.7);
            var time_text = content.append("g").append("text").attr("fill", _color2.default.TEXT).attr("font-size", font.axis * 2).attr("x", svg.select(".axis_y").node().getBBox().x + svg.select(".axis_y").node().getBBox().width * 1.2).attr("y", svg.select(".axis_y").node().getBBox().y).text(seriesData[data_index].key).attr("dominant-baseline", "hanging");
            time_text.attr("opacity", 0).transition().duration(tick).attr("opacity", 1);
            var time_id = setInterval(function() {
                data_index += 1; // start from 1
                // redraw circles
                var circles = circle_content.selectAll("circle").data(seriesData[data_index].values);
                circles.enter().append("circle").attr("class", "data_item").attr("r", circleSize).attr("stroke", "#FFF").attr("stroke-width", 0).attr("fill", _color2.default.DEFAULT).attr("opacity", 0.7).attr("cx", function(d) {
                    return xScale(d[xEncoding]);
                }).attr("cy", function(d) {
                    return yScale(d[yEncoding]);
                });
                circles.exit().remove();
                circles.transition().duration(tick).attr("cx", function(d) {
                    return xScale(d[xEncoding]);
                }).attr("cy", function(d) {
                    return yScale(d[yEncoding]);
                });
                time_text.transition().duration(tick) //GAP
                    .text(seriesData[data_index].key);
                if (data_index === seriesData.length - 1) clearInterval(time_id);
            }, tick); // align horizontal center
            var marginLeft = (this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x;
            var marginTop = (this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y;
            svg.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
            return svg;
        }
    }, {
        key: 'displayAssociation',
        value: function displayAssociation() {
            /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata(),
                measure = this.measure(), // container = this.container(),
                size = this.size();
            if (measure.length < 2) return; /* ----------------------- graph set up (size, margin) ---------------------- */
            var margin = chartMargin[size],
                width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom,
                font = fontSize[size],
                strokeWidth = size === _size2.default.SMALL || size === _size2.default.MIDDLE ? 1 : 2; /* ----------------------------- data prosessing ---------------------------- */ //association需两个measure
            var xEncoding = "measure0:" + (measure[0].aggregate === "count" ? "COUNT" : measure[0].field),
                yEncoding = "measure1:" + (measure[1].aggregate === "count" ? "COUNT" : measure[1].field); /* ----------------------------------- vis ---------------------------------- */
            var svg = initSvg(this.container(), width, height, margin);
            if (this.style() === _style2.default.COMICS) width = 0.8 * width;
            basicDraw(factData, xEncoding, yEncoding, svg, width, height, margin); //change style
            /* Axis */
            var padding = font.axis * 0.6,
                triangleSize = Math.ceil(Math.sqrt(height * width) / 10);
            var axis = svg.select('.axis');
            svg.select(".axis_x").remove();
            svg.select(".axis_y").remove();
            var textX = axis.append("text").attr("x", width / 2).attr("y", height + padding - 1).attr("font-family", NUMFONT).attr("font-size", font.axis).attr("text-anchor", "middle").attr("dominant-baseline", "hanging").text(measure[0].field || "Count");
            axis.append("path").attr("class", "triangle").attr("transform", 'translate(' + (width - triangleSize / 25 * 2) + ', ' + height + ')rotate(90)').attr("d", d3.symbol().type(d3.symbolTriangle).size(triangleSize)).attr("fill", _color2.default.AXIS);
            axis.append("line").attr("x1", -strokeWidth / 2).attr("x2", width).attr("y1", height).attr("y2", height).attr("stroke-width", strokeWidth).attr("stroke", _color2.default.AXIS);
            var textY = axis.append("text").attr("transform", 'translate(' + -padding + ', ' + height / 2 + ') rotate(-90)').attr("font-family", NUMFONT).attr("font-size", font.axis).attr("text-anchor", "middle").text(measure[1].field || "Count"); //wrap
            wrap(textX, width);
            wrap(textY, height);

            function wrap(self, maxWidth) {
                var textLength = self.node().getComputedTextLength(),
                    text = self.text();
                while (textLength > maxWidth && text.length > 0) {
                    text = text.slice(0, -1);
                    self.text(text + '�');
                    textLength = self.node().getComputedTextLength();
                }
            }
            axis.append("path").attr("class", "triangle").attr("transform", 'translate(0, ' + triangleSize / 25 * 2 + ')').attr("d", d3.symbol().type(d3.symbolTriangle).size(triangleSize)).attr("fill", _color2.default.AXIS);
            axis.append("line").attr("y1", 0).attr("y2", height).attr("stroke-width", strokeWidth).attr("stroke", _color2.default.AXIS); //trend
            var xScale = d3.scaleLinear().range([0, width]).domain([0, d3.max(factData, function(d) {
                return d[xEncoding];
            })]).nice();
            var yScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(factData, function(d) {
                return d[yEncoding];
            })]).nice();
            var ret = getLeastSquares(factData.map(function(d) {
                return xScale(d[xEncoding]);
            }), factData.map(function(d) {
                return yScale(d[yEncoding]);
            }));
            var x1 = 0,
                x2 = width; //regression in range, can not out of content
            var x_ymin = (height - ret.b) / ret.m,
                x_ymax = (0 - ret.b) / ret.m;
            if (x_ymin > x_ymax) {
                var i = x_ymin;
                x_ymin = x_ymax;
                x_ymax = i;
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
            var trend = svg.append("g");
            svg.node().prepend(trend.node());
            trend.append("line").attr('class', "trendlineLayer").attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2).attr("stroke-width", strokeWidth).attr("stroke", "#A9A8A8").attr("stroke-dasharray", "5,5");
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.3,
                    metaphorHeight = 1.23 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor2.default).attr("width", metaphorWidth).attr("height", metaphorHeight);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.25;
                    metaphorHeight = 1.23 * metaphorWidth;
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width).attr("y", height - metaphorHeight * 0.96);
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.28;
                    metaphorHeight = 1.23 * metaphorWidth;
                    metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width).attr("y", height - metaphorHeight * 0.96);
                } else {
                    metaphor.attr("x", width - metaphorWidth * 0.1).attr("y", height - metaphorHeight * 0.96);
                }
            }
            return svg;
        }
    }, {
        key: 'animateAssociation',
        value: function animateAssociation() {
            var svg = this.displayAssociation();
            if (!svg) return;
            var duration = this.duration();
            svg.selectAll(".axis").attr("opacity", 0).transition().duration(duration / 4).attr("opacity", 1);
            svg.selectAll('circle').attr("fill-opacity", 0).transition().duration(duration / 4 * 1.5).delay(duration / 4).attr("fill-opacity", 1);
            var trendline = svg.selectAll(".trendlineLayer");
            var originEndX2 = trendline.attr("x2");
            var originEndY2 = trendline.attr("y2");
            var originEndX1 = trendline.attr("x1");
            var originEndY1 = trendline.attr("y1");
            trendline.attr("x2", originEndX1).attr("y2", originEndY1);
            setTimeout(function() {
                trendline.attr("x2", originEndX1).attr("y2", originEndY1).transition().duration(duration / 4 * 1.5).attr("x2", originEndX2).attr("y2", originEndY2);
            }, duration / 4 * 2.5);
        }
    }]);
    return Scatterplot;
}(_chart2.default);
var initSvg = function initSvg(container, width, height, margin) {
    var svg = d3.select(container).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    return svg;
};
exports.default = Scatterplot;