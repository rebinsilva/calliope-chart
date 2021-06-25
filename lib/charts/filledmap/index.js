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
var _china = require('../../visualization/map/china');
var _china2 = _interopRequireDefault(_china);
var _usa = require('../../visualization/map/usa');
var _usa2 = _interopRequireDefault(_usa);
var _world = require('../../visualization/map/world');
var _world2 = _interopRequireDefault(_world);
var _size = require('../../visualization/size');
var _size2 = _interopRequireDefault(_size);
var _style = require('../../visualization/style');
var _style2 = _interopRequireDefault(_style);
var _format = require('../../visualization/format');
var _format2 = _interopRequireDefault(_format);
var _updateChartCenter = require('../../visualization/updateChartCenter');
var _updateChartCenter2 = _interopRequireDefault(_updateChartCenter);
var _tooltipForMap = require('../../visualization/tooltipForMap');
var _tooltipForMap2 = _interopRequireDefault(_tooltipForMap);
var _metaphor = require('../../metaphor/metaphor4.png');
var _metaphor2 = _interopRequireDefault(_metaphor);
var _metaphor3 = require('../../metaphor/metaphor26.png');
var _metaphor4 = _interopRequireDefault(_metaphor3);
var _metaphor5 = require('../../metaphor/metaphor3.png');
var _metaphor6 = _interopRequireDefault(_metaphor5);
var _metaphor7 = require('../../metaphor/metaphor25.png');
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
} //value
//distribution
//categorization
//difference
var NUMFONT = "Arial-Regular";
var TEXTFONT = "Arial-Bold";
var FilledMap = function(_Chart) {
    _inherits(FilledMap, _Chart);

    function FilledMap() {
        _classCallCheck(this, FilledMap);
        return _possibleConstructorReturn(this, (FilledMap.__proto__ || Object.getPrototypeOf(FilledMap)).apply(this, arguments));
    }
    _createClass(FilledMap, [{
        key: 'displayDistribution',
        value: function displayDistribution() {
            var _getSizeBySize = getSizeBySize(this.size(), "distribution"),
                margin = _getSizeBySize.margin,
                rectWidth = _getSizeBySize.rectWidth,
                rectHight = _getSizeBySize.rectHight;
            var width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", this.width()).attr("height", this.height()).append("g").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
            if (this.style() === _style2.default.COMICS) width = 0.9 * width;
            var factdata = this.factdata();
            var breakdown = this.breakdown(),
                mapType = breakdown[0].subtype;
            var measure = this.measure();
            if (measure.length > 1 || breakdown[0].type !== 'geographical') {
                return svg;
            }
            if (breakdown[0].type === 'geographical' && breakdown[0].isPostCode) {
                return svg;
            }
            var measuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
            var data = factdata;
            var minValue = d3.min(data, function(d) {
                    return d[measuredField];
                }),
                maxValue = d3.max(data, function(d) {
                    return d[measuredField];
                });
            if (measure[0]["min"] && measure[0].min < minValue) {
                minValue = measure[0].min;
            }
            if (measure[0]['max'] && measure[0].max > maxValue) {
                maxValue = measure[0].max;
            } //定义最小值和最大值对应的颜色
            var blueColor = _color2.default.DIVERGING[1];
            var whiteColor = _color2.default.DIVERGING[5];
            var redColor = _color2.default.DIVERGING[9];
            var computeColor = void 0;
            var isShowWhite = false;
            if (minValue >= 0) { //如果都是大于0的数，就直接从白到红即可，不需要蓝色
                computeColor = d3.interpolate(_color2.default.SEQUENTIAL[9], _color2.default.SEQUENTIAL[0]);
            } else if (minValue < 0 && maxValue >= 0) { //如果数据中有负数，有正数，取绝对值最大的值最大值，取相反数为最小值；负数为蓝，正数为红, 零为白色
                computeColor = d3.interpolate(blueColor, redColor);
                maxValue = Math.abs(minValue) >= maxValue ? Math.abs(minValue) : maxValue;
                minValue = -maxValue;
                isShowWhite = true;
            } else {
                computeColor = d3.interpolate(blueColor, redColor); //console.log("数值全负数。。。")
            }
            var scale = void 0;
            scale = d3.scaleLinear().domain([minValue, maxValue]);
            var geoValues = data.map(function(d) {
                return d[breakdown[0].field];
            });
            var projection = d3.geoMercator(); //append map
            var GeoData = _china2.default;
            if (mapType === "world") {
                GeoData = _world2.default;
            } else if (mapType === "china") {
                GeoData = _china2.default;
            } else if (mapType === "usa") {
                GeoData = _usa2.default;
                projection = d3.geoAlbersUsa();
            }
            projection.fitSize([width - margin.right * 3, height], GeoData); // 定义地理路径生成器
            var path = d3.geoPath().projection(projection);
            var map_svg = svg.append('g').attr('class', 'map');
            map_svg.selectAll('path').data(GeoData.features).enter().append('path').attr('id', function(d) {
                return d.properties.enName;
            }).attr('stroke', 'grey').attr('stroke-width', 0.3).attr('fill', function(d, i) {
                if (geoValues.indexOf(d.properties.enName) !== -1) {
                    var countryName = geoValues[geoValues.indexOf(d.properties.enName)];
                    var value = void 0;
                    factdata.map(function(data) {
                        if (data[breakdown[0].field] === countryName) {
                            value = data[measuredField];
                        }
                        return data;
                    });
                    if (!value) return _color2.default.BACKGROUND;
                    return computeColor(scale(value));
                } else {
                    return _color2.default.BACKGROUND;
                }
            }).attr('d', path);
            if (mapType === "china") {
                appendSouthChinaSea(map_svg);
            } //append legend 
            //定义一个线性渐变
            var defs = svg.append("defs");
            var linearGradient = defs.append("linearGradient").attr("id", "linearColor").attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%");
            linearGradient.append("stop").attr("offset", "0%").attr("stop-color", computeColor(scale(maxValue)));
            if (isShowWhite) {
                linearGradient.append("stop").attr("offset", '50%').attr("stop-color", whiteColor);
            }
            linearGradient.append("stop").attr("offset", "100%").attr("stop-color", computeColor(scale(minValue))); //添加一个矩形，并应用线性渐变
            svg.append("rect").attr("x", this.width() - margin.left - margin.right - margin.right).attr("y", (height - rectHight) / 2).attr("width", rectWidth).attr("height", rectHight).attr("fill", "url(#" + linearGradient.attr("id") + ")");
            var offsetText = 20;
            svg.append("text").attr("class", "valueText").attr("x", this.width() - margin.left - margin.right - margin.right + rectWidth / 2).attr("y", height / 2 + rectHight / 2 + offsetText).attr("dy", "-0.3em").attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging').attr('font-size', 14).text(function() {
                return (0, _format2.default)(minValue);
            });
            svg.append("text").attr("class", "valueText").attr("x", this.width() - margin.left - margin.right - margin.right + rectWidth / 2).attr("y", height / 2 - rectHight / 2 - offsetText).attr("dy", "-0.3em").attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging').attr('font-size', 14).text(function() {
                return (0, _format2.default)(maxValue);
            });
            if (this.style() === _style2.default.COMICS) {
                var mapBBox = svg.select('.map').node().getBBox();
                var metaphorWidth = width * 0.22,
                    metaphorHeight = 1.29 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor4.default).attr("x", mapBBox.width + mapBBox.x - metaphorWidth * 0.1).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.16);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.18;
                    metaphorHeight = 1.29 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.2).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.16);
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.23;
                    metaphorHeight = 1.29 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x - metaphorWidth * 0.15).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.16);
                } else if (this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.23;
                    metaphorHeight = 1.29 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x - metaphorWidth * 0.1).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.16);
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight);
            } //finally update chart horizental cental
            (0, _updateChartCenter2.default)(svg, this.width(), this.height());
            return svg;
        }
    }, {
        key: 'displayValue',
        value: function displayValue() {
            var _getSizeBySize2 = getSizeBySize(this.size(), "value"),
                margin = _getSizeBySize2.margin,
                hightLightFontSize = _getSizeBySize2.hightLightFontSize;
            var width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", this.width()).attr("height", this.height()).append("g").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
            if (this.style() === _style2.default.COMICS) width = 0.85 * width;
            var subspace = this.subspace(),
                mapType = subspace[0].subtype;
            var measure = this.measure();
            if (measure.length > 1 || subspace[0].type !== 'geographical') {
                return svg;
            }
            if (subspace[0].type === 'geographical' && subspace[0].isPostCode) {
                return svg;
            }
            var countryName = subspace[0].value;
            var projection = d3.geoMercator(); //append map
            var GeoData = _china2.default;
            if (mapType === "world") {
                GeoData = _world2.default;
            } else if (mapType === "china") {
                GeoData = _china2.default;
            } else if (mapType === "usa") {
                GeoData = _usa2.default;
                projection = d3.geoAlbersUsa();
            } //append legends first to measure the width
            //legends
            // let legendW = 200,
            //     measuredWidth = 0,
            //     measuredHeight = 0;//inital 
            var seriesName = [countryName]; // // console.log("seriesName", seriesName)
            // let _that = this;
            // svg.append("foreignObject")
            //     .style('display', 'none')
            //     .attr("x", width - legendW)
            //     .attr("y", height / 2)
            //     .attr("width", legendW)
            //     .attr("height", height)
            //     .attr("class", "foreignObject")
            //     .append("xhtml:div")
            //     .attr("class", "legends")
            //     .style("display", "flex")
            //     .style("flex-direction", "column")
            //     .style("flex-wrap", "wrap")
            //     .style("height", "100%")
            //     .selectAll(".legend")
            //     .data(seriesName)
            //     .enter()
            //     .append("xhtml:div")
            //     .attr("class", "legend")
            //     .style("line-height", 1)
            //     .style("margin-right", 5 * this.width() / 320 + "px")
            //     .each(function (d, i) {
            //         let legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg").attr("display", "block")
            //         legend.append("rect")
            //             .attr("fill", Color.HIGHLIGHT)
            //             .attr("width", 10 * fontSize / 12)
            //             .attr('height', 10 * fontSize / 12)
            //             .attr("rx", 1.5 * _that.width() / 640)
            //             .attr("ry", 1.5 * _that.width() / 640)
            //         legend.append("text")
            //             .attr("fill", Color.TEXT)
            //             .attr("x", 12 * fontSize / 12)
            //             .text(d => {
            //                 return `${countryName}: ${valueText}`;
            //             })
            //             .attr("font-size", fontSize * 0.8)
            //             .attr("font-family", NUMFONT)
            //             .attr("alignment-baseline", "hanging");
            //         legend.attr("width", legend.node().getBBox().width);
            //         legend.attr("height", legend.node().getBBox().height);
            //         let selfWidth = d3.select(this).select("svg").node().getAttribute("width"),
            //             selfHeight = d3.select(this).select("svg").node().getAttribute("height");
            //         if (Number(selfWidth) > Number(measuredWidth)) {
            //             measuredWidth = selfWidth;
            //         }
            //         measuredHeight += Number(selfHeight);
            //     });
            // //update legend center
            // let xPos = this.width() - margin.right - measuredWidth - margin.right / 2,
            //     yPos = (this.height() - measuredHeight) / 2 - margin.top;
            // let offset = this.size() === 'small' ? 2 : 5;
            // svg.select(".foreignObject").node().setAttribute("x", xPos);
            // svg.select(".foreignObject").node().setAttribute("y", yPos);
            // svg.select(".foreignObject").node().setAttribute("width", Number(measuredWidth + offset));
            // svg.select(".foreignObject").node().setAttribute("height", Number(measuredHeight));
            // projection.fitSize([width - margin.right - measuredWidth, height], GeoData);
            projection.fitSize([width - margin.right, height], GeoData); // 定义地理路径生成器
            var path = d3.geoPath().projection(projection);
            var map_svg = svg.append('g').attr("class", "map");
            map_svg.selectAll('path').data(GeoData.features).enter().append('path').attr('id', function(d) {
                return d.properties.enName;
            }).attr('class', function(d, i) {
                if (d.properties.enName === countryName) {
                    return 'selected-path';
                }
                return '';
            }).attr('stroke', 'grey').attr('stroke-width', 0.3).attr('fill', function(d, i) { //console.log("11", i, d.properties.enName)
                if (d.properties.enName === countryName) { //console.log("22")
                    return _color2.default.HIGHLIGHT;
                }
                return _color2.default.BACKGROUND;
            }).attr('d', path);
            if (mapType === "china") {
                appendSouthChinaSea(map_svg);
            } /******value******/
            var factdata = this.factdata(),
                measuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field,
                marginTextLeft = margin.right;
            var positionL = svg.selectAll('.selected-path').node().getBBox(),
                lineWidth = this.size() === "wide" ? width / 5 : width / 10;
            if (positionL.x + positionL.width / 2 <= this.width() / 2) { //靠右
                // if (true) {
                svg.append('line').attr('class', 'tooltip-line').attr('x1', positionL.x + positionL.width / 2).attr('x2', positionL.x + positionL.width / 2 + lineWidth).attr('y1', positionL.y + positionL.height / 2).attr('y2', positionL.y + positionL.height / 2).attr("stroke-width", 1).attr("stroke", "black").property("_direction", "right");
                var valueG = svg.append("g").attr("class", 'value-tooltip').attr("transform", 'translate(' + (positionL.x + (lineWidth + 3)) + (positionL.y + positionL.height / 2) + ')');
                valueG.append("text").attr('class', 'tooltip-text').attr('dy', '-1.25em').attr('font-size', hightLightFontSize).attr('font-family', NUMFONT).attr('text-anchor', 'middle').text(seriesName[0]);
                valueG.append("text").attr('class', 'tooltip-value').attr('font-size', hightLightFontSize).attr('font-family', NUMFONT).attr('text-anchor', 'middle').text((0, _format2.default)(factdata[0][measuredField]));
                var _selfWidth = valueG.node().getBBox().width,
                    _selfHeight = valueG.node().getBBox().height; //update
                valueG.node().setAttribute("transform", 'translate(' + (positionL.x + positionL.width / 2 + lineWidth + _selfWidth / 2 + marginTextLeft) + ' ' + (positionL.y + positionL.height / 2 + _selfHeight / 2) + ')');
            } else {
                svg.append('line').attr('class', 'tooltip-line').attr('x2', positionL.x + positionL.width / 2).attr('x1', positionL.x + positionL.width / 2 - lineWidth).attr('y1', positionL.y + positionL.height / 2).attr('y2', positionL.y + positionL.height / 2).attr("stroke-width", 1).attr("stroke", "black").property("_direction", "left");
                var _valueG = svg.append("g").attr("class", 'value-tooltip').attr("transform", 'translate(' + (positionL.x - (lineWidth + 3)) + (positionL.y + positionL.height / 2) + ')');
                _valueG.append("text").attr('class', 'tooltip-text').attr('dy', '-1.25em').attr('font-size', hightLightFontSize).attr('font-family', NUMFONT).attr('text-anchor', 'middle').text(seriesName[0]);
                _valueG.append("text").attr('class', 'tooltip-value').attr('font-size', hightLightFontSize).attr('font-family', NUMFONT).attr('text-anchor', 'middle').text((0, _format2.default)(factdata[0][measuredField]));
                var _selfWidth2 = _valueG.node().getBBox().width,
                    _selfHeight2 = _valueG.node().getBBox().height; //update
                _valueG.node().setAttribute("transform", 'translate(' + (positionL.x + positionL.width / 2 - lineWidth - _selfWidth2 / 2 - marginTextLeft) + ' ' + (positionL.y + positionL.height / 2 + _selfHeight2 / 2) + ')');
            } /******value the end******/
            if (this.style() === _style2.default.COMICS) {
                var svgBBox = svg.node().getBBox();
                var metaphorWidth = width * 0.22,
                    metaphorHeight = 1.18 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor2.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.20;
                    metaphorHeight = 1.18 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.24;
                    metaphorHeight = 1.18 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", svgBBox.width + svgBBox.x + metaphorWidth * 0.06).attr("y", svgBBox.height + svgBBox.y - metaphorHeight * 1.16);
            } //finally update chart horizental cental
            (0, _updateChartCenter2.default)(svg, this.width(), this.height());
            return svg;
        }
    }, {
        key: 'displayDifference',
        value: function displayDifference() {
            var _this2 = this;
            var _getSizeBySize3 = getSizeBySize(this.size(), "difference"),
                margin = _getSizeBySize3.margin,
                hightLightFontSize = _getSizeBySize3.hightLightFontSize,
                tickFontSize = _getSizeBySize3.tickFontSize;
            var width = this.width() - margin.left - margin.right,
                height = this.height() - margin.left - margin.right;
            var svg = d3.select(this.container()).append("svg").attr("width", this.width()).attr("height", this.height()).append("g").attr("display", "block").attr("class", "chartG");
            if (this.style() === _style2.default.COMICS) width = this.size() === _size2.default.LARGE ? 0.85 * width : 0.75 * width;
            var factdata = this.factdata();
            var focus = this.focus();
            var breakdown = this.breakdown(),
                mapType = breakdown[0].subtype;
            var filteredData = []; //sorted by focus
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                var _loop = function _loop() {
                    var fs = _step.value;
                    _this2.factdata().filter(function(x) {
                        return x[fs.field] === fs.value;
                    })[0] && filteredData.push(_this2.factdata().filter(function(x) {
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
            var focusCName = filteredData.map(function(d) {
                return d[breakdown[0].field];
            });
            var measure = this.measure();
            if (measure.length > 1 || breakdown[0].type !== 'geographical') {
                return svg;
            }
            if (breakdown[0].type === 'geographical' && breakdown[0].isPostCode) {
                return svg;
            }
            var measuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
            var data = factdata;
            var geoValues = data.map(function(d) {
                return d[breakdown[0].field];
            });
            var projection = d3.geoMercator(); //(1)append valueText first to measure the width
            // let mapML = margin.left;
            // if (this.size() === "wide") {
            //     mapML = 0;
            // }
            if (!filteredData[1][measuredField]) filteredData[1][measuredField] = 0;
            if (!filteredData[0][measuredField]) filteredData[0][measuredField] = 0;
            var valueText = Math.abs(Number(filteredData[1][measuredField]) - Number(filteredData[0][measuredField]));
            var legendH = margin.bottom * 1.5; //两个legend不超过一行
            var mapWidth = width,
                mapHeight = 0; //inital
            var measuredValueTextHeight = margin.top;
            var differenceValueG = void 0;
            if (this.size() === "large") {
                differenceValueG = svg.append("g").attr("display", "block").attr("class", "difference-value-box");
                differenceValueG.append("text").attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('fill', _color2.default.HIGHLIGHT).attr('text-anchor', 'middle').attr('dominant-baseline', 'hanging').text("Difference");
                differenceValueG.append("text").attr("dy", "1.25em").attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('fill', _color2.default.HIGHLIGHT).attr('text-anchor', 'middle').attr('dominant-baseline', 'hanging').text(valueText < 0 ? '-' + (0, _format2.default)(-valueText) : (0, _format2.default)(valueText));
                var _selfHeight = svg.select(".difference-value-box").node().getBBox().height;
                mapHeight = height - _selfHeight - legendH;
                measuredValueTextHeight = _selfHeight;
                differenceValueG.node().setAttribute("transform", 'translate(' + width / 2 + ',' + margin.top + ')');
            } else {
                differenceValueG = svg.append("g").attr("display", "block").attr("class", "difference-value-box");
                differenceValueG.append("text").attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('fill', _color2.default.HIGHLIGHT).attr('text-anchor', 'middle').attr('dominant-baseline', 'hanging').text("Difference");
                differenceValueG.append("text").attr("dy", "1.25em").attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('fill', _color2.default.HIGHLIGHT).attr('text-anchor', 'middle').attr('dominant-baseline', 'hanging').text(valueText < 0 ? '-' + (0, _format2.default)(-valueText) : (0, _format2.default)(valueText));
                var _selfWidth = svg.select(".difference-value-box").node().getBBox().width;
                differenceValueG.node().setAttribute("transform", 'translate(' + (this.width() - _selfWidth / 2 - margin.right) + ',' + (this.height() - legendH) / 2 + ')');
                mapWidth = this.width() - _selfWidth - margin.right * 1.5;
                mapHeight = this.height() - legendH - margin.top;
            }
            var seriesName = focusCName; //(2)append legend 
            //inital params
            var ellipsisNumber = 11;
            if (this.size() === "large") {
                ellipsisNumber = 15;
            } else if (this.size() === "wide") {
                ellipsisNumber = 20;
            } else if (this.size() === "middle") {
                ellipsisNumber = 11;
            } else if (this.size() === "small") {
                ellipsisNumber = 5;
            } //(3)append map
            var GeoData = _china2.default;
            if (mapType === "world") {
                GeoData = _world2.default;
            } else if (mapType === "china") {
                GeoData = _china2.default;
            } else if (mapType === "usa") {
                GeoData = _usa2.default;
                projection = d3.geoAlbersUsa();
            }
            projection.fitSize([mapWidth, mapHeight], GeoData); // 定义地理路径生成器
            var path = d3.geoPath().projection(projection);
            var map_svg = svg.append('g').attr("class", "leftGroup");
            if (this.size() === "large") {
                map_svg.attr("transform", 'translate(' + 0 + ' ' + measuredValueTextHeight + ')');
            }
            map_svg.append("g").attr("class", "map").selectAll('path').data(GeoData.features).enter().append('path').attr('id', function(d) {
                return d.properties.enName;
            }).attr('stroke', 'grey').attr('stroke-width', 0.3).attr('fill', function(d, i) {
                if (geoValues.indexOf(d.properties.enName) !== -1) {
                    var name = geoValues[geoValues.indexOf(d.properties.enName)]; // console.log("ss",name)
                    if (focusCName.indexOf(name) !== -1) { // console.log("ss", focusCName.indexOf(name))
                        return _color2.default.CATEGORICAL[focusCName.indexOf(name) === 0 ? 0 : 1];
                    }
                    return _color2.default.BACKGROUND;
                } else {
                    return _color2.default.BACKGROUND;
                }
            }).attr("class", function(d) {
                if (seriesName.indexOf(d3.select(this).node().id) === 0) {
                    return 'difference-path-1';
                } else if (seriesName.indexOf(d3.select(this).node().id) === 1) {
                    return 'difference-path-2';
                } else return '';
            }).attr('d', path); //update center
            if (this.size() !== "large") {
                var measuredMapHeight = map_svg.node().getBBox().height;
                map_svg.attr("transform", 'translate(' + 0 + ' ' + ((this.height() - legendH) / 2 - measuredMapHeight / 2) + ')');
            }
            if (mapType === "china") {
                appendSouthChinaSea(map_svg);
            }
            if (this.style() === _style2.default.COMICS) {
                var mapBBox = map_svg.select('.map').node().getBBox();
                var metaphorWidth = width * 0.24,
                    metaphorHeight = 1.29 * metaphorWidth;
                var metaphor = map_svg.append("image").attr('xlink:href', _metaphor8.default);
                metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.02).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.1);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.15;
                    metaphorHeight = 1.29 * metaphorWidth;
                    if (mapType === "usa") {
                        metaphor.attr("x", mapBBox.width + mapBBox.x - metaphorWidth * 0.3).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.1);
                    } else {
                        metaphor.attr("x", mapBBox.width + mapBBox.x).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.1);
                    }
                } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.18;
                    metaphorHeight = 1.29 * metaphorWidth;
                    if (mapType === "china" || mapType === "usa") {
                        metaphor.attr("x", mapBBox.width + mapBBox.x - metaphorWidth * 0.15).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.1);
                    } else {
                        metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.05).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.1);
                    }
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight);
                width = this.width() - margin.left - margin.right;
            } //relocate text pos
            svg.select(".difference-value-box").node().setAttribute("x", margin.left + map_svg.node().getBBox().width + map_svg.node().getBBox().x + 2); //center居中
            svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x) + "," + 0 + ")");
            var legendY = void 0;
            if (this.size() === "large") {
                legendY = measuredValueTextHeight + mapHeight + margin.bottom;
            } else if (this.size() === "wide") {
                legendY = margin.top + mapHeight;
            } else {
                legendY = margin.top + mapHeight + margin.bottom;
            }
            var measuredWidth = 0;
            svg.append("foreignObject").attr("x", 0).attr("y", legendY) //inital
                .attr("width", width).attr("height", legendH).attr("class", "foreignObject").append("xhtml:div").attr("class", "legends").style("display", "grid").style("width", "100%").style("grid-template-rows", 'repeat(1, min-content)').style("grid-template-columns", 'repeat(2, auto)') //.style("justify-content", "space-around")
                .style("justify-content", "center").style("grid-auto-flow", "row").style("height", "100%").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").attr("width", width).style("line-height", 1).style("margin-right", 5 * this.width() / 320 + "px").each(function(d, i) {
                    var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg").attr("display", "block");
                    legend.append("rect").attr("fill", _color2.default.CATEGORICAL[i]).attr("width", tickFontSize).attr('height', tickFontSize).attr("rx", tickFontSize / 6).attr("ry", tickFontSize / 6);
                    legend.append("text").attr("fill", _color2.default.TEXT).attr("x", tickFontSize * 2).text(function(d) {
                        var value = filteredData.filter(function(data) {
                            return data[breakdown[0].field] === d;
                        })[0][measuredField];
                        value = (0, _format2.default)(value);
                        return (d.length > ellipsisNumber ? d.substring(0, ellipsisNumber - 1) + "…" : d) + ': ' + (value.length > ellipsisNumber ? value.substring(0, ellipsisNumber - 1) + "…" : value);
                    }).attr("font-size", tickFontSize).attr("font-family", NUMFONT).attr("alignment-baseline", "hanging");
                    legend.attr("width", legend.node().getBBox().width);
                    legend.attr("height", legend.node().getBBox().height);
                    var selfWidth = d3.select(this).select("svg").node().getAttribute("width");
                    if (Number(selfWidth) > Number(measuredWidth)) {
                        measuredWidth = selfWidth;
                    }
                }); //update legend center
            svg.select(".foreignObject").node().setAttribute("width", svg.node().getBBox().width);
            if (this.size() === "large") { //update for commic
                //update difference value center
                differenceValueG.node().setAttribute("transform", 'translate(' + svg.node().getBBox().width / 2 + ',' + margin.top + ')'); //update map center
                map_svg.node().setAttribute("transform", 'translate(' + (svg.node().getBBox().width - svg.select(".leftGroup").node().getBBox().width) / 2 + ',' + measuredValueTextHeight + ')');
            } //finally update chart horizental cental
            (0, _updateChartCenter2.default)(svg, this.width(), this.height());
            return svg;
        }
    }, {
        key: 'displayCategorization',
        value: function displayCategorization() {
            var _getSizeBySize4 = getSizeBySize(this.size(), "categorization"),
                margin = _getSizeBySize4.margin,
                legendSize = _getSizeBySize4.legendSize;
            var width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", this.width()).attr("height", this.height()).append("g").attr("transform", 'translate(' + margin.left + ', ' + margin.top + ')');
            if (this.style() === _style2.default.COMICS) width = 0.88 * width;
            var factdata = this.factdata();
            var breakdown = this.breakdown(),
                mapType = breakdown[0].subtype;
            var measureField = "COUNT";
            if (breakdown[0].type !== 'geographical') {
                return svg;
            }
            if (breakdown[0].type === 'geographical' && breakdown[0].isPostCode) {
                return svg;
            } //data
            var calculateData = d3.nest().key(function(d) {
                return d[breakdown[0].field];
            }).entries(factdata);
            var data = calculateData.map(function(d, i) {
                var countRows = d.values[0];
                countRows[measureField] = d.values.length;
                return countRows;
            });
            data = data.slice(0, 9); //取前9
            var geoValues = data.map(function(d) {
                return d[breakdown[0].field];
            });
            var projection = d3.geoMercator(); //append legends first to measure the width
            //legends
            var legendW = 200,
                measuredWidth = 0,
                measuredHeight = 0; //inital 
            var seriesName = geoValues; //console.log("seriesName", seriesName)
            if (this.size() === _size2.default.SMALL) {
                var _that = this;
                svg.append("foreignObject").attr("x", 0).attr("y", 0).attr("width", legendW).attr("class", "foreignObject").append("xhtml:div").attr("class", "legends").style("display", "grid").style("width", "100%").style("grid-template-rows", 'repeat(4, min-content)').style("grid-template-columns", 'repeat(3, auto)').style("justify-content", "space-around").style("grid-auto-flow", "row").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 1).style("margin-right", 5 * this.width() / 320 + "px").each(function(d, i) {
                    var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg").attr("display", "block");
                    legend.append("rect").attr("fill", function(countryName) { //console.log("countryName", countryName, i)
                        return _color2.default.CATEGORICAL[i];
                    }).attr("width", legendSize).attr('height', legendSize).attr("rx", 1.5 * _that.width() / 320).attr("ry", 1.5 * _that.width() / 320);
                    legend.append("text").attr("fill", _color2.default.TEXT).attr("x", legendSize + 2).text(function(text) {
                        text = text.length > 7 ? text.substring(0, 5) + "…" : text;
                        return text;
                    }).attr("font-size", legendSize).attr("font-family", NUMFONT).attr("alignment-baseline", "hanging");
                    legend.attr("width", legend.node().getBBox().width);
                    legend.attr("height", legend.node().getBBox().height);
                });
                var maxLegendH = 40;
                measuredHeight = maxLegendH;
                svg.select(".foreignObject").attr("transform", 'translate(0,' + (this.height() - maxLegendH - margin.top) + ')');
                svg.select(".foreignObject").node().setAttribute("height", maxLegendH);
            } else {
                var _that2 = this;
                svg.append("foreignObject").attr("x", width - legendW).attr("y", height / 2).attr("width", legendW).attr("height", height).attr("class", "foreignObject").append("xhtml:div").attr("class", "legends").style("display", "flex").style("flex-direction", "column").style("flex-wrap", "wrap").style("height", "100%").selectAll(".legend").data(seriesName).enter().append("xhtml:div").attr("class", "legend").style("line-height", 1).style("margin-right", 5 * this.width() / 320 + "px").each(function(d, i) {
                    var legend = d3.select(svg.selectAll(".legend").nodes()[i]).append("svg").attr("display", "block");
                    legend.append("rect").attr("fill", function(countryName) { //console.log("countryName", countryName, i)
                        return _color2.default.CATEGORICAL[i];
                    }).attr("width", legendSize).attr('height', legendSize).attr("rx", 1.5 * _that2.width() / 320).attr("ry", 1.5 * _that2.width() / 320);
                    legend.append("text").attr("fill", _color2.default.TEXT).attr("x", legendSize + 2).text(function(text) {
                        text = text.length > 9 ? text.substring(0, 7) + "…" : text;
                        return text;
                    }).attr("font-size", legendSize).attr("font-family", NUMFONT).attr("alignment-baseline", "hanging");
                    legend.attr("width", legend.node().getBBox().width);
                    legend.attr("height", legend.node().getBBox().height);
                    var selfWidth = d3.select(this).select("svg").node().getAttribute("width"),
                        selfHeight = d3.select(this).select("svg").node().getAttribute("height"); // console.log("selfWidth", selfWidth, measuredWidth)
                    if (Number(selfWidth) > Number(measuredWidth)) {
                        measuredWidth = selfWidth;
                    }
                    measuredHeight += Number(selfHeight);
                }); //update legend center
                var xPos = this.width() - margin.right - measuredWidth - margin.right / 2,
                    yPos = (this.height() - measuredHeight) / 2 - margin.top;
                var offset = this.size() === 'small' ? 2 : 5;
                svg.select(".foreignObject").node().setAttribute("x", xPos);
                svg.select(".foreignObject").node().setAttribute("y", yPos);
                svg.select(".foreignObject").node().setAttribute("width", Number(measuredWidth + offset));
                svg.select(".foreignObject").node().setAttribute("height", Number(measuredHeight));
            } //append map
            var GeoData = _china2.default;
            if (mapType === "world") {
                GeoData = _world2.default;
            } else if (mapType === "china") {
                GeoData = _china2.default;
            } else if (mapType === "usa") {
                GeoData = _usa2.default;
                projection = d3.geoAlbersUsa();
            }
            if (this.size() === _size2.default.SMALL) {
                projection.fitSize([width - margin.left, height - measuredHeight], GeoData);
            } else {
                projection.fitSize([width - measuredWidth - margin.left, height], GeoData);
            } // 定义地理路径生成器
            var path = d3.geoPath().projection(projection);
            var map_svg = svg.append('g').attr('class', 'map');
            map_svg.selectAll('path').data(GeoData.features).enter().append('path').attr('id', function(d) {
                return d.properties.enName;
            }).attr('stroke', 'grey').attr('stroke-width', 0.3).attr('fill', function(d, i) {
                if (geoValues.indexOf(d.properties.enName) !== -1) {
                    var countryName = geoValues[geoValues.indexOf(d.properties.enName)]; //console.log("map", countryName, seriesName.indexOf(countryName));
                    return _color2.default.CATEGORICAL[seriesName.indexOf(countryName)];
                } else {
                    return _color2.default.BACKGROUND;
                }
            }).attr('d', path);
            if (mapType === "china") {
                appendSouthChinaSea(map_svg);
            }
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.20,
                    metaphorHeight = 1.38 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor6.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.18;
                    metaphorHeight = 1.38 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.21;
                    metaphorHeight = 1.38 * metaphorWidth;
                }
                var mapBBox = svg.select('.map').node().getBBox();
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.06).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1);
                if (mapType === "usa") {
                    metaphor.attr("x", mapBBox.width + mapBBox.x - metaphorWidth * 0.05);
                    if (this.size() === _size2.default.WIDE) metaphor.attr("x", mapBBox.width + mapBBox.x - metaphorWidth * 0.15);
                }
            } //finally update chart horizental cental
            var _h = svg.node().getBBox().height,
                _w = svg.node().getBBox().width;
            var marginTop = (this.height() - _h) / 2 - svg.node().getBBox().y,
                marginLeft = (this.width() - _w) / 2 - svg.node().getBBox().x;
            svg.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
            return svg;
        }
    }, {
        key: 'displayOutlier',
        value: function displayOutlier() {
            var _this3 = this;
            var _getSizeBySize5 = getSizeBySize(this.size(), "distribution"),
                margin = _getSizeBySize5.margin,
                rectWidth = _getSizeBySize5.rectWidth,
                rectHight = _getSizeBySize5.rectHight,
                legendSize = _getSizeBySize5.legendSize,
                tickFontSize = _getSizeBySize5.tickFontSize;
            var width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", this.width()).attr("height", this.height()).append("g").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
            if (this.style() === _style2.default.COMICS) width = 0.9 * width;
            var factdata = this.factdata();
            var breakdown = this.breakdown(),
                mapType = breakdown[0].subtype;
            var measure = this.measure();
            if (measure.length > 1 || breakdown[0].type !== 'geographical') {
                return svg;
            }
            if (breakdown[0].type === 'geographical' && breakdown[0].isPostCode) {
                return svg;
            }
            var measuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
            var data = factdata;
            var minValue = d3.min(data, function(d) {
                    return d[measuredField];
                }),
                maxValue = d3.max(data, function(d) {
                    return d[measuredField];
                });
            if (measure[0]["min"] && measure[0].min < minValue) {
                minValue = measure[0].min;
            }
            if (measure[0]['max'] && measure[0].max > maxValue) {
                maxValue = measure[0].max;
            } //定义最小值和最大值对应的颜色
            var blueColor = _color2.default.DIVERGING[1];
            var whiteColor = _color2.default.DIVERGING[5];
            var redColor = _color2.default.DIVERGING[9];
            var computeColor = void 0;
            var isShowWhite = false;
            if (minValue >= 0) { //如果都是大于0的数，就直接从白到红即可，不需要蓝色
                computeColor = d3.interpolate(_color2.default.SEQUENTIAL[9], _color2.default.SEQUENTIAL[0]);
            } else if (minValue < 0 && maxValue >= 0) { //如果数据中有负数，有正数，取绝对值最大的值最大值，取相反数为最小值；负数为蓝，正数为红, 零为白色
                computeColor = d3.interpolate(blueColor, redColor);
                maxValue = Math.abs(minValue) >= maxValue ? Math.abs(minValue) : maxValue;
                minValue = -maxValue;
                isShowWhite = true;
            } else {
                computeColor = d3.interpolate(blueColor, redColor); //console.log("数值全负数。。。")
            }
            var scale = void 0;
            scale = d3.scaleLinear().domain([minValue, maxValue]);
            var geoValues = data.map(function(d) {
                return d[breakdown[0].field];
            });
            var projection = d3.geoMercator(); //append map
            var GeoData = _china2.default;
            if (mapType === "world") {
                GeoData = _world2.default;
            } else if (mapType === "china") {
                GeoData = _china2.default;
            } else if (mapType === "usa") {
                GeoData = _usa2.default;
                projection = d3.geoAlbersUsa();
            }
            projection.fitSize([width - margin.right * 3, height], GeoData); // 定义地理路径生成器
            var path = d3.geoPath().projection(projection);
            var focusName = this.focus()[0].value;
            var map_svg = svg.append('g').attr('class', 'map');
            map_svg.selectAll('path').data(GeoData.features).enter().append('path').attr('id', function(d) {
                return d.properties.enName;
            }).attr('class', function(d, i) {
                if (d.properties.enName === focusName) {
                    return 'selected-path';
                }
                return '';
            }).attr('stroke', 'grey').attr('stroke-width', 0.3).attr('fill', function(d, i) {
                if (geoValues.indexOf(d.properties.enName) !== -1) {
                    var countryName = geoValues[geoValues.indexOf(d.properties.enName)];
                    var value = void 0;
                    factdata.map(function(data) {
                        if (data[breakdown[0].field] === countryName) {
                            value = data[measuredField];
                        }
                        return data;
                    });
                    if (!value) return _color2.default.BACKGROUND;
                    return computeColor(scale(value));
                } else {
                    return _color2.default.BACKGROUND;
                }
            }).attr('d', path);
            if (mapType === "china") {
                appendSouthChinaSea(map_svg);
            } /******value******/
            var oulierValue = factdata.filter(function(d) {
                return d[_this3.breakdown()[0].field] === focusName;
            })[0][measuredField];
            var focusedNodeBox = map_svg.selectAll('.selected-path').node().getBBox();
            (0, _tooltipForMap2.default)(map_svg, focusedNodeBox, focusName, oulierValue, margin, width, tickFontSize); /******value the end******/ //scale map to fitin
            var maxMapWidth = width * 0.9;
            var mesuredMapWidth = map_svg.node().getBBox().width;
            if (mesuredMapWidth > maxMapWidth) {
                map_svg.node().setAttribute("transform", 'scale(' + maxMapWidth / mesuredMapWidth + ')');
                map_svg.node().setAttribute("transform-origin", "center");
            } //append legend 
            //定义一个线性渐变
            var defs = map_svg.append("defs");
            var linearGradient = defs.append("linearGradient").attr("id", "linearColor").attr("x1", "0%").attr("y1", "0%").attr("x2", "0%").attr("y2", "100%");
            linearGradient.append("stop").attr("offset", "0%").attr("stop-color", computeColor(scale(maxValue)));
            if (isShowWhite) {
                linearGradient.append("stop").attr("offset", '50%').attr("stop-color", whiteColor);
            }
            linearGradient.append("stop").attr("offset", "100%").attr("stop-color", computeColor(scale(minValue))); //添加一个矩形，并应用线性渐变
            var starX = maxMapWidth + margin.left;
            svg.append("rect").attr("x", starX).attr("y", (height - rectHight) / 2).attr("width", rectWidth).attr("height", rectHight).attr("fill", "url(#" + linearGradient.attr("id") + ")");
            var offsetText = 20;
            svg.append("text").attr("class", "valueText").attr("x", starX + rectWidth / 2).attr("y", height / 2 + rectHight / 2 + offsetText).attr("dy", "-0.3em").attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging').attr('font-family', NUMFONT).attr('font-size', legendSize).text(function() {
                return (0, _format2.default)(minValue);
            });
            svg.append("text").attr("class", "valueText").attr("x", starX + rectWidth / 2).attr("y", height / 2 - rectHight / 2 - offsetText).attr("dy", "-0.3em").attr('text-anchor', 'middle').attr('alignment-baseline', 'hanging').attr('font-family', NUMFONT).attr('font-size', legendSize).text(function() {
                return (0, _format2.default)(maxValue);
            });
            if (this.style() === _style2.default.COMICS) {
                var mapBBox = svg.select('.map').node().getBBox();
                var metaphorWidth = width * 0.22,
                    metaphorHeight = 1.29 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor4.default).attr("x", mapBBox.width + mapBBox.x - metaphorWidth * 0.1).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.16);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.18;
                    metaphorHeight = 1.29 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.2).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.16);
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.23;
                    metaphorHeight = 1.29 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x - metaphorWidth * 0.15).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.16);
                } else if (this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.23;
                    metaphorHeight = 1.29 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x - metaphorWidth * 0.1).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1.16);
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight);
            } //finally update chart horizental cental
            (0, _updateChartCenter2.default)(svg, this.width(), this.height());
            return svg;
        }
    }, {
        key: 'displayExtreme',
        value: function displayExtreme() {
            this.displayOutlier();
        }
    }, {
        key: 'displayProportion',
        value: function displayProportion() {
            this.displayDistribution();
        }
    }, {
        key: 'displayRank',
        value: function displayRank() {
            this.displayDistribution();
        }
    }, {
        key: 'animateValue',
        value: function animateValue() {
            var svg = this.displayValue();
            if (!svg) return;
            var duration = this.duration();
            svg.selectAll(".map").attr("opacity", 0).transition().duration(duration / 10 * 2).attr("opacity", 1); // step 1 highlight
            svg.selectAll('.selected-path').attr("fill", _color2.default.BACKGROUND).transition().duration(duration / 10 * 4).delay(duration / 10 * 2).attr("fill", _color2.default.DEFAULT); // step 2 draw line
            var tooltipLine = svg.selectAll(".tooltip-line");
            tooltipLine.attr("opacity", 0);
            var _xChange = void 0,
                _xStay = void 0;
            if (tooltipLine.property("_direction") === "right") {
                _xChange = "x2";
                _xStay = "x1";
            } else {
                _xChange = "x1";
                _xStay = "x2";
            }
            var originalX = tooltipLine.attr(_xChange);
            tooltipLine.attr(_xChange, tooltipLine.attr(_xStay));
            svg.selectAll('.value-tooltip').attr("opacity", 0);
            setTimeout(function() {
                svg.selectAll('.tooltip-line').attr("opacity", 1);
                svg.selectAll('.tooltip-line').transition().duration(duration / 10 * 2).attr(_xChange, originalX);
            }, duration / 10 * 6);
            setTimeout(function() {
                svg.selectAll('.value-tooltip').attr("opacity", 0).transition().duration(duration / 10 * 2).attr("opacity", 1);
            }, duration / 10 * 8); // step 3 fade in text
        }
    }, {
        key: 'animateDistribution',
        value: function animateDistribution() {
            var svg = this.displayDistribution();
            if (!svg) return;
            var duration = this.duration();
            svg.attr("opacity", 0).transition().duration(duration / 4).attr("opacity", 1);
            svg.selectAll('path').each(function(d) {
                var color = d3.select(this).attr("fill");
                d3.select(this).attr("fill", _color2.default.BACKGROUND).transition().duration(duration).delay(duration / 4).attr("fill", color);
            });
        }
    }, {
        key: 'animateCategorization',
        value: function animateCategorization() {
            var svg = this.displayCategorization();
            if (!svg) return;
            var duration = this.duration();
            svg.selectAll(".map").attr("opacity", 0).transition().duration(duration / 5).attr("opacity", 1);
            svg.select('.legends').style("opacity", 0).transition().duration(duration / 5).style("opacity", 1);
            var filledPath = svg.selectAll("path").filter(function(d, i) {
                var color = d3.select(this).attr("fill");
                return color !== _color2.default.BACKGROUND;
            });
            var filledPathsSize = filledPath.size();
            filledPath.each(function(d, i) {
                var color = d3.select(this).attr("fill");
                d3.select(this).attr("fill", _color2.default.BACKGROUND).transition().duration(duration / 5 * 4 / filledPathsSize).delay(duration / 5 + duration / 5 * 4 / filledPathsSize * i).attr("fill", color);
            });
        }
    }, {
        key: 'animateDifference',
        value: function animateDifference() {
            var svg = this.displayDifference();
            if (!svg) return;
            var duration = this.duration();
            var difference_color1 = svg.selectAll('.difference-path-1').attr("fill");
            var difference_color2 = svg.selectAll('.difference-path-2').attr("fill");
            svg.selectAll(".map").attr("opacity", 0).transition().duration(duration / 4).attr("opacity", 1);
            svg.selectAll('.difference-path-1').attr("fill", _color2.default.BACKGROUND).transition().duration(duration / 2).delay(duration / 4).attr("fill", difference_color1);
            svg.selectAll('.difference-path-2').attr("fill", _color2.default.BACKGROUND).transition().duration(duration / 2).delay(duration / 4).attr("fill", difference_color2);
            svg.select('.legends').style("opacity", 0).transition().duration(duration / 2).delay(duration / 4).style("opacity", 1);
            svg.selectAll('.difference-value-box').selectAll("text").nodes()[0].remove();
            svg.selectAll('.difference-value-box').attr("opacity", 0);
            setTimeout(function() {
                svg.selectAll('.difference-value-box').attr("opacity", 0).transition().duration(duration / 4).attr("opacity", 1);
            }, duration / 4 * 3);
        }
    }, {
        key: 'animateOutlier',
        value: function animateOutlier() {
            this.animateDistribution();
        }
    }, {
        key: 'animateExtreme',
        value: function animateExtreme() {
            this.animateDistribution();
        }
    }, {
        key: 'animateProportion',
        value: function animateProportion() {
            this.animateDistribution();
        }
    }, {
        key: 'animateRank',
        value: function animateRank() {
            this.animateDistribution();
        }
    }]);
    return FilledMap;
}(_chart2.default);
var appendSouthChinaSea = function appendSouthChinaSea(map_svg) {
    var HWRitiao = 200 / 150;
    var sea2ChinaRitiao = 0.12;
    var appendWidth = map_svg.node().getBBox().width * sea2ChinaRitiao,
        appendHeight = appendWidth * HWRitiao,
        scale = appendWidth / 150;
    var x = map_svg.node().getBBox().width + map_svg.node().getBBox().x - appendWidth,
        y = map_svg.node().getBBox().height + map_svg.node().getBBox().y - appendHeight;
    var southchinaseaG = map_svg.append("g").attr("stroke", "black").attr("stroke-width", 1).attr('stroke', 'grey').attr("fill", "#F4F5FA") //'rgb(227, 228, 229)')
        .attr("transform-origin", x + ' ' + y + ' ').attr("transform", 'scale(' + scale + ')translate(' + x + ' ' + y + ')');
    southchinaseaG.append("line").attr("id", "svg_1").attr("y2", 7).attr("x2", 145).attr("y1", 7).attr("x1", 20);
    southchinaseaG.append("line").attr("id", "svg_2").attr("y2", 24).attr("x2", 6).attr("y1", 7).attr("x1", 20);
    southchinaseaG.append("line").attr("id", "svg_3").attr("y2", 195).attr("x2", 145).attr("y1", 7).attr("x1", 145);
    southchinaseaG.append("line").attr("id", "svg_4").attr("y2", 195).attr("x2", 6).attr("y1", 24).attr("x1", 6);
    southchinaseaG.append("line").attr("id", "svg_5").attr("y2", 195).attr("x2", 145).attr("y1", 195).attr("x1", 6);
    southchinaseaG.append("path").attr("id", "svg_6").attr("d", "m6,31.5l9,7.5l15,9l15,4l18,0l17,-14l21,-31L20,7L6,24z");
    southchinaseaG.append("path").attr("id", "svg_7").attr("d", "m113,7l10,25l11,-25z");
    southchinaseaG.append("path").attr("id", "svg_9").attr("d", "m46.5,66.5l14.5,-6.5l-1,13l-7,7l-15,4l8.5,-17.5z");
    southchinaseaG.append("line").attr("id", "svg_10").attr("y2", 46.5).attr("x2", 132.5).attr("y1", 31.5).attr("x1", 141.5);
    southchinaseaG.append("line").attr("id", "svg_11").attr("y2", 76.5).attr("x2", 115.5).attr("y1", 61.5).attr("x1", 121.5);
    southchinaseaG.append("line").attr("id", "svg_12").attr("y2", 111.5).attr("x2", 110.5).attr("y1", 92.5).attr("x1", 110.5);
    southchinaseaG.append("line").attr("id", "svg_13").attr("y2", 147.5).attr("x2", 101.5).attr("y1", 127.5).attr("x1", 108.5);
    southchinaseaG.append("line").attr("id", "svg_14").attr("y2", 177.5).attr("x2", 78.5).attr("y1", 163.5).attr("x1", 91.5);
    southchinaseaG.append("line").attr("id", "svg_15").attr("y2", 188.5).attr("x2", 39.5).attr("y1", 184.5).attr("x1", 54.5);
    southchinaseaG.append("line").attr("id", "svg_16").attr("y2", 158.5).attr("x2", 11.5).attr("y1", 172.5).attr("x1", 17.5);
    southchinaseaG.append("line").attr("id", "svg_17").attr("y2", 132.5).attr("x2", 39.5).attr("y1", 142.5).attr("x1", 24.5);
    southchinaseaG.append("line").attr("id", "svg_18").attr("y2", 98.5).attr("x2", 37.5).attr("y1", 113.5).attr("x1", 40.5);
};
var getSizeBySize = function getSizeBySize(size, factType) {
    var margin = void 0,
        fontSize = void 0,
        rectWidth = void 0,
        rectHight = void 0,
        hightLightFontSize = void 0,
        tickFontSize = void 0,
        legendSize = void 0;
    switch (size) {
        case _size2.default.WIDE:
            tickFontSize = 16;
            rectWidth = 7;
            rectHight = 80;
            margin = {
                top: 20,
                right: 30,
                bottom: 20,
                left: 5
            };
            fontSize = 12;
            hightLightFontSize = 26;
            legendSize = 14;
            break;
        case _size2.default.MIDDLE:
            tickFontSize = 14;
            rectWidth = 6;
            rectHight = 65;
            margin = {
                top: 20,
                right: 15,
                bottom: 20,
                left: 5
            };
            if (factType === "categorization") {
                margin = {
                    top: 20,
                    right: 30,
                    bottom: 20,
                    left: 30
                };
            }
            if (factType === "difference") {
                margin = {
                    top: 20,
                    right: 30,
                    bottom: 10,
                    left: 30
                };
            }
            fontSize = 10;
            hightLightFontSize = 20;
            legendSize = 12;
            break;
        case _size2.default.SMALL:
            tickFontSize = 12;
            rectWidth = 4;
            rectHight = 50;
            margin = {
                top: 20,
                right: 13,
                bottom: 20,
                left: 5
            };
            if (factType === "categorization" || factType === "difference") {
                margin = {
                    top: 10,
                    right: 15,
                    bottom: 10,
                    left: 15
                };
            }
            fontSize = 8;
            legendSize = 10;
            hightLightFontSize = 16;
            break;
        case _size2.default.LARGE:
        default:
            tickFontSize = 20;
            rectWidth = 12;
            rectHight = 150;
            margin = {
                top: 20,
                right: 40,
                bottom: 20,
                left: 40
            };
            fontSize = 14;
            hightLightFontSize = 40;
            legendSize = 21;
            break;
    }
    return {
        margin: margin,
        rectWidth: rectWidth,
        rectHight: rectHight,
        fontSize: fontSize,
        hightLightFontSize: hightLightFontSize,
        tickFontSize: tickFontSize,
        legendSize: legendSize
    };
};
exports.default = FilledMap;