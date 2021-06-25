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
var _chart = require('../../chart');
var _chart2 = _interopRequireDefault(_chart);
var _d = require('d3');
var d3 = _interopRequireWildcard(_d);
var _color = require('../../visualization/color');
var _color2 = _interopRequireDefault(_color);
var _format = require('../../visualization/format');
var _format2 = _interopRequireDefault(_format);
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
var _metaphor = require('../../metaphor/metaphor4.png');
var _metaphor2 = _interopRequireDefault(_metaphor);
var _metaphor3 = require('../../metaphor/metaphor24.png');
var _metaphor4 = _interopRequireDefault(_metaphor3);
var _pictogram = require('../../visualization/pictogram');
var _pictogram2 = _interopRequireDefault(_pictogram);

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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
var NUMFONT = "Arial-Regular";
var BubbleMap = function(_Chart) {
    _inherits(BubbleMap, _Chart);

    function BubbleMap() {
        _classCallCheck(this, BubbleMap);
        return _possibleConstructorReturn(this, (BubbleMap.__proto__ || Object.getPrototypeOf(BubbleMap)).apply(this, arguments));
    }
    _createClass(BubbleMap, [{
        key: 'displayDistribution',
        value: function displayDistribution() {
            var _this2 = this;
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize = getSizeBySize(chartSize, this.size(), "distribution"),
                margin = _getSizeBySize.margin,
                hightLightFontSize = _getSizeBySize.hightLightFontSize;
            var width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", this.width()).attr("height", this.height());
            var contentG = svg.append("g").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
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
            }
            var maxR = hightLightFontSize / 2 * this.width() / 640;
            if (this.size() === 'small' || this.size() === 'middle') {
                maxR = hightLightFontSize * this.width() / 640;
            }
            var scale = d3.scaleSqrt([minValue, maxValue], [0, maxR]);
            var geoValues = data.map(function(d) {
                return d[breakdown[0].field];
            });
            var projection = d3.geoMercator(); //init legends data
            var stepsLen = 3,
                stepWidth = (maxValue - minValue) / stepsLen;
            stepWidth = getFormatedValue(stepWidth); // console.log("getFormatedValue", stepWidth)
            var legendsData = [];
            for (var i = 1; i < stepsLen + 1; i++) {
                legendsData.push(stepWidth * i);
            }
            var marginBt = hightLightFontSize / 4,
                offsetY = 0; //append legends circle first
            var measuredWidth = margin.left; //inital
            var legends = contentG.append("g").attr("class", "legendsG").attr("transform", 'translate(' + (width - measuredWidth) + ' ' + 0 + ')');
            legends.append("g").attr("class", "circleL").selectAll('.circle').data(legendsData).enter().append("circle").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 0.5).attr("cx", 0).attr("cy", function(g, i) {
                var selfR = scale(legendsData[i]);
                offsetY += 2 * selfR + marginBt;
                return offsetY;
            }).attr("r", function(g, i) {
                return scale(legendsData[i]);
            }); //legends text
            if (this.size() === "small") {} else if (this.size() === "middle") {
                hightLightFontSize = hightLightFontSize / 1.5;
            } else {
                hightLightFontSize = hightLightFontSize / 2;
            }
            var textOffsetY = 0;
            legends.append("g").attr("class", "textL").selectAll('.text').data(legendsData).enter().append("text").attr("fill", "black").attr('font-size', hightLightFontSize).attr('font-family', NUMFONT).attr("stroke", "black").attr("stroke-width", 0.5).attr("dominant-baseline", "central").attr("x", function(g, i) {
                return scale(legendsData[i]) + marginBt;
            }).attr("y", function(g, i) {
                var selfR = scale(legendsData[i]);
                textOffsetY += 2 * selfR + marginBt;
                return textOffsetY;
            }).text(function(g, i) {
                return getTickFormat(legendsData[i]);
            });
            measuredWidth = contentG.select(".legendsG").node().getBBox().width; //svg.select(".legendsG").node().setAttribute("x", width - measuredWidth)
            //console.log("measuredWidth", measuredWidth)
            if (this.size() === "large") {
                measuredWidth = 63;
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
            projection.fitSize([width - measuredWidth, height], GeoData); // 定义地理路径生成器
            var path = d3.geoPath().projection(projection);
            var map_svg = contentG.append('g').attr('class', 'map');
            map_svg.selectAll('path').data(GeoData.features).enter().append('path').attr('id', function(d) {
                return d.properties.enName;
            }).attr('stroke', 'grey').attr('stroke-width', 0.3).attr('fill', _color2.default.BACKGROUND).attr('d', path);
            if (mapType === "china") {
                appendSouthChinaSea(map_svg);
            } //draw circles
            var bubbleColor = _color2.default.SEQUENTIAL[5];
            if (measure[0]["color"]) {
                bubbleColor = measure[0]["color"];
            }
            contentG.append("g").attr("fill", bubbleColor).attr("fill-opacity", 0.8).attr("stroke", bubbleColor).attr("stroke-width", 0.8).selectAll('.bubble').data(GeoData.features).enter().filter(function(d) {
                if (d.properties.enName === 'Puerto Rico') return false;
                return geoValues.indexOf(d.properties.enName) !== -1;
            }).append('circle').attr("class", function(d) {
                return "bubble " + d.properties.enName;
            }).attr("id", function(d, i) {
                return "bubble" + i;
            }).attr("cx", function(d, i) {
                return path.centroid(d)[0];
            }).attr("cy", function(d, i) {
                return path.centroid(d)[1];
            }).attr("r", function(d) {
                var countryName = geoValues[geoValues.indexOf(d.properties.enName)];
                var value = void 0;
                factdata.map(function(data) {
                    if (data[breakdown[0].field] === countryName) {
                        value = data[measuredField];
                    }
                    return data;
                }); //console.log("r", scale.domain(),scale(value))
                return scale(value);
            }); //finally update chart horizental cental
            if (this.size() !== 'large') {
                var _h = contentG.node().getBBox().height,
                    _w = contentG.node().getBBox().width;
                var marginTop = (this.height() - _h) / 2 - contentG.node().getBBox().y,
                    marginLeft = (this.width() - _w) / 2 - contentG.node().getBBox().x;
                contentG.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
            }
            if (this.style() === _style2.default.COMICS) {
                var mapBBox = svg.select('.map').node().getBBox();
                var metaphorWidth = width * 0.22,
                    metaphorHeight = 1.30 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor4.default).attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.5).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.5);
                if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.2;
                    metaphorHeight = 1.30 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.55).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.9);
                    if (mapType === "usa") {
                        metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.55).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.75);
                    }
                } else if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.18;
                    metaphorHeight = 1.30 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.35).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1);
                } else if (this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.24;
                    metaphorHeight = 1.30 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.4).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.7);
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight);
                legends.attr("transform", 'translate(' + (width / 0.9 - margin.left * 2) + ' ' + 0 + ')');
            }
            if (this.style() === _style2.default.PICTOGRAPH) { // console.log('picccc')
                var pictype = this.measure()[0].field; //获取相应的icon名称
                // console.log('pictype',pictype);
                pictype = 'BMW'; //测试用 - 定值'BMW'
                // console.log('pictype',pictype)
                // let measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
                // let width = chartSize.width - margin.left - margin.right,
                //     height = chartSize.height - margin.top - margin.bottom;
                /*------------------通过名称找寻icon----------------------------*/
                contentG.append("defs").append("g").attr("id", 'pictypebmdis' + pictype).append("path").attr("d", _pictogram2.default[pictype]); /*----------------计算缩放前的icon长宽------------------------*/
                var typesizex1;
                var typesizey1;
                var iconRatio; //计算长宽比-防止缩放后出现sizex/sizey因为过小而变为0的情况
                /*-------------根据chartsize的数据来进行icon的缩放--------------------------------*/ // let scalex;
                var scalexsize = void 0; // let scaley;
                var scaleysize = void 0; /*----------------计算缩放后的icon长宽------------------------*/
                var typesizex = void 0;
                var typesizey = void 0;
                var typex = void 0;
                var typey = void 0; //draw iconcircles
                contentG.append("g").attr("fill", _color2.default.SEQUENTIAL[2]).attr("fill-opacity", 0.5).attr("stroke", _color2.default.DEFAULT).attr("stroke-width", 0.5).selectAll('.iconbubblebmdis').data(GeoData.features).enter().filter(function(d) {
                    return geoValues.indexOf(d.properties.enName) !== -1;
                }).append("use").attr("xlink:href", '#pictypebmdis' + pictype).attr("class", "iconbubblebmdis").attr("id", function(d, i) {
                    return "iconbubblebmdis" + i;
                }).attr("x", function(d, i) {
                    var countryName = geoValues[geoValues.indexOf(d.properties.enName)];
                    var value = void 0;
                    factdata.map(function(data) {
                        if (data[breakdown[0].field] === countryName) {
                            value = data[measuredField];
                        }
                        return data;
                    });
                    typesizex1 = svg.select('#iconbubblebmdis' + i).node().getBoundingClientRect().width;
                    typesizey1 = svg.select('#iconbubblebmdis' + i).node().getBoundingClientRect().height;
                    iconRatio = typesizex1 / typesizey1; /*-------------根据chartsize的数据来进行icon的缩放--------------------------------*/ // let scalex;
                    scalexsize = 2 * scale(value) / (typesizex1 > typesizey1 ? typesizex1 : typesizey1); // console.log('typesizex1-x',typesizex1)
                    if (_this2.size() === 'large') scalexsize = 2 * scale(value) / (typesizex1 > typesizey1 ? typesizex1 : typesizey1);
                    svg.select('#iconbubblebmdis' + i).attr("transform", function() { // scalex= scalexsize /(typesizex1>typesizey1?typesizex1:typesizey1);
                        return 'scale(' + scalexsize + ') ';
                    });
                    scaleysize = scalexsize; /*----------------获取缩放后的icon长宽------------------------*/
                    typesizex = svg.select('#iconbubblebmdis' + i).node().getBoundingClientRect().width; // typesizey=svg.select(`#iconbubble${i}`).node().getBoundingClientRect().height;
                    typesizey = typesizex / iconRatio;
                    typex = svg.select('#iconbubblebmdis' + i).node().getBBox().x;
                    typey = svg.select('#iconbubblebmdis' + i).node().getBBox().y;
                    return typesizex === 0 ? 0 : (path.centroid(GeoData.features[i])[0] - Math.abs(typex) - typesizex / 2) / scalexsize;
                }).attr("y", function(d, i) {
                    var countryName = geoValues[geoValues.indexOf(d.properties.enName)];
                    var value = void 0;
                    factdata.map(function(data) {
                        if (data[breakdown[0].field] === countryName) {
                            value = data[measuredField];
                        }
                        return data;
                    });
                    scaleysize = 2 * scale(value) / (typesizex1 > typesizey1 ? typesizex1 : typesizey1); /*----------------获取缩放后的icon长宽------------------------*/
                    typesizex = svg.select('#iconbubblebmdis' + i).node().getBoundingClientRect().width; // typesizey=svg.select(`#iconbubble${i}`).node().getBoundingClientRect().height;
                    typesizey = typesizex / iconRatio;
                    typex = svg.select('#iconbubblebmdis' + i).node().getBBox().x;
                    typey = svg.select('#iconbubblebmdis' + i).node().getBBox().y;
                    return scaleysize === 0 ? 0 : (path.centroid(GeoData.features[i])[1] - Math.abs(typey) - typesizey / 2) / scaleysize;
                });
                svg.selectAll('.bubble').attr("opacity", 0); // svg.remove('circle');
            }
            return svg;
        }
    }, {
        key: 'displayValue',
        value: function displayValue() {
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize2 = getSizeBySize(chartSize, this.size(), "value"),
                margin = _getSizeBySize2.margin,
                hightLightFontSize = _getSizeBySize2.hightLightFontSize;
            var width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", this.width()).attr("height", this.height());
            var contentG = svg.append("g").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
            if (this.style() === _style2.default.COMICS) {
                width *= 0.9;
                height *= 0.9;
            }
            var factdata = this.factdata();
            var subspace = this.subspace(),
                mapType = subspace[0].subtype;
            var measure = this.measure();
            if (measure.length > 1 || subspace[0].type !== 'geographical') {
                return svg;
            }
            if (subspace[0].type === 'geographical' && subspace[0].isPostCode) {
                return svg;
            }
            var measuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
            var maxR = hightLightFontSize / 2 * this.width() / 640;
            if (this.size() === 'small' || this.size() === 'middle') {
                maxR = hightLightFontSize * this.width() / 640;
            }
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
            projection.fitSize([width - margin.right, height], GeoData); // 定义地理路径生成器
            var path = d3.geoPath().projection(projection);
            var map_svg = contentG.append('g').attr("class", "map");
            var countryName = subspace[0].value;
            map_svg.selectAll('path').data(GeoData.features).enter().append('path').attr('id', function(d) {
                return d.properties.enName;
            }).attr('stroke', 'grey').attr('stroke-width', 0.3).attr('fill', _color2.default.BACKGROUND).attr('class', function(d, i) {
                if (d.properties.enName === countryName) {
                    return 'selected-path';
                }
                return '';
            }).attr('d', path);
            if (mapType === "china") {
                appendSouthChinaSea(map_svg);
            } //draw circles
            contentG.append("g").attr("fill", _color2.default.CATEGORICAL[5]).attr("fill-opacity", 0.8).attr("stroke", _color2.default.CATEGORICAL[5]).attr("stroke-width", 0.8).selectAll('.bubble').data(GeoData.features).enter().append('circle').attr("class", "bubble").attr('id', function(d, i) {
                return 'bubble' + i;
            }).attr("cx", function(d, i) {
                return path.centroid(GeoData.features[i])[0] ? path.centroid(GeoData.features[i])[0] : 0;
            }).attr("cy", function(d, i) {
                return path.centroid(GeoData.features[i])[1] ? path.centroid(GeoData.features[i])[1] : 0;
            }).attr("r", function(d, i) {
                var value = 0;
                if (d.properties.enName === subspace[0].value) {
                    value = 1; //非零即可
                }
                return value ? maxR : 0;
            }); /******value******/
            var marginTextLeft = margin.right;
            var positionL = svg.selectAll('.selected-path').node().getBBox(),
                lineWidth = this.size() === "wide" ? width / 5 : width / 10;
            var onlyCircle = contentG.selectAll("circle").filter(function(d, i) {
                return d.properties.enName === subspace[0].value;
            });
            if (positionL.x + positionL.width / 2 <= this.width() / 2) { //靠右
                // if (true) {
                contentG.append('line').attr('class', 'tooltip-line').attr('x1', positionL.x + positionL.width / 2).attr('x2', positionL.x + positionL.width / 2 + lineWidth).attr('y1', onlyCircle.attr("cy")) // positionL.y + positionL.height / 2)
                    .attr('y2', onlyCircle.attr("cy")) // positionL.y + positionL.height / 2)
                    .attr("stroke-width", 1).attr("stroke", "black").property("_direction", "right");
                var valueG = contentG.append("g").attr("class", 'value-tooltip').attr("transform", 'translate(' + (positionL.x + (lineWidth + 3)) + (positionL.y + positionL.height / 2) + ')');
                valueG.append("text").attr('class', 'tooltip-text').attr('dy', '-1.25em').attr('font-size', hightLightFontSize).attr('font-family', NUMFONT).attr('text-anchor', 'middle').text(countryName);
                valueG.append("text").attr('class', 'tooltip-value').attr('font-size', hightLightFontSize).attr('font-family', NUMFONT).attr('text-anchor', 'middle').text((0, _format2.default)(factdata[0][measuredField]));
                var _selfWidth = valueG.node().getBBox().width,
                    _selfHeight = valueG.node().getBBox().height; //update
                valueG.node().setAttribute("transform", 'translate(' + (positionL.x + positionL.width / 2 + lineWidth + _selfWidth / 2 + marginTextLeft) + ' ' + (positionL.y + positionL.height / 2 + _selfHeight / 2) + ')');
            } else {
                contentG.append('line').attr('class', 'tooltip-line').attr('x2', positionL.x + positionL.width / 2).attr('x1', positionL.x + positionL.width / 2 - lineWidth).attr('y1', onlyCircle.attr("cy")) // .attr('y1', positionL.y + positionL.height / 2)
                    .attr('y2', onlyCircle.attr("cy")) // .attr('y2', positionL.y + positionL.height / 2)
                    .attr("stroke-width", 1).attr("stroke", "black").property("_direction", "left");
                var _valueG = contentG.append("g").attr("class", 'value-tooltip').attr("transform", 'translate(' + (positionL.x - (lineWidth + 3)) + (positionL.y + positionL.height / 2) + ')');
                _valueG.append("text").attr('class', 'tooltip-text').attr('dy', '-1.25em').attr('font-size', hightLightFontSize).attr('font-family', NUMFONT).attr('text-anchor', 'middle').text(countryName);
                _valueG.append("text").attr('class', 'tooltip-value').attr('font-size', hightLightFontSize).attr('font-family', NUMFONT).attr('text-anchor', 'middle').text((0, _format2.default)(factdata[0][measuredField]));
                var _selfWidth2 = _valueG.node().getBBox().width,
                    _selfHeight2 = _valueG.node().getBBox().height; //update
                _valueG.node().setAttribute("transform", 'translate(' + (positionL.x + positionL.width / 2 - lineWidth - _selfWidth2 / 2 - marginTextLeft) + ' ' + (positionL.y + positionL.height / 2 + _selfHeight2 / 2) + ')');
            } // //append legends
            // //legends circle
            // let legends = contentG.append("g")
            //     .attr("class", "legendsG")
            //     .attr("transform", `translate(${width - margin.left * 2} ${0})`);
            // legends.append("g")
            //     .attr("class", "circleL")
            //     .selectAll('.circle')
            //     .data(subspace)
            //     .enter()
            //     .append("circle")
            //     .attr("fill", "none")
            //     .attr("stroke", "black")
            //     .attr("stroke-width", 0.5)
            //     .attr("cx", -maxR * 2)
            //     .attr("cy", 0)
            //     .attr("r", maxR);
            // //legends text
            // legends.append("g")
            //     .attr("class", "textL")
            //     .selectAll('.text')
            //     .data(subspace)
            //     .enter()
            //     .append("text")
            //     .attr("fill", "black")
            //     .attr('font-size', hightLightFontSize)
            //     .attr('font-family', NUMFONT)
            //     .attr("stroke", "black")
            //     .attr("stroke-width", 0.5)
            //     .attr("dominant-baseline", "central")
            //     .attr("x", (g, i) => -maxR + 10) //margin left
            //     .attr("y", 0)
            //     .text((g, i) => {
            //         return formatNumber(factdata[0][measuredField]);
            //     });
            if (this.style() === _style2.default.COMICS) {
                var mapBBox = svg.select('.map').node().getBBox();
                var metaphorWidth = width * 0.22,
                    metaphorHeight = 1.18 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor2.default).attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.2).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.4);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.20;
                    metaphorHeight = 1.18 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.2).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.8);
                } else if (this.size() === _size2.default.MIDDLE || this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.24;
                    metaphorHeight = 1.18 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.2).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.8);
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight); // if (this.size() === Size.SMALL) {
                //     legends.attr("transform", `translate(${width / 0.95 - margin.left * 2} ${0})`);
                // } else legends.attr("transform", `translate(${width / 0.9 - margin.left * 2} ${0})`);
            }
            if (this.style() === _style2.default.PICTOGRAPH) { // let geoValues = data.map(d => d[breakdown[0].field]);
                var pictype = subspace[0].field; //获取相应的icon名称
                pictype = 'BMW'; //测试用 - 定值'BMW'
                // console.log('pictype',pictype)
                // let measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
                // let width = chartSize.width - margin.left - margin.right,
                //     height = chartSize.height - margin.top - margin.bottom;
                /*------------------通过名称找寻icon----------------------------*/
                contentG.append("defs").append("g").attr("id", 'pictypebmv' + pictype).append("path").attr("d", _pictogram2.default[pictype]); /*----------------计算缩放前的icon长宽------------------------*/
                var typesizex1 = void 0;
                var typesizey1 = void 0; //let iconRatio; //计算长宽比-防止缩放后出现sizex/sizey因为过小而变为0的情况
                /*-------------根据chartsize的数据来进行icon的缩放--------------------------------*/
                var scalexsize = void 0; // let scaleysize;
                /*----------------计算缩放后的icon长宽------------------------*/ // let typesizex;
                // let typesizey;
                var typex = void 0;
                var typey = void 0;
                typesizex1 = svg.select('#pictypebmv' + pictype).node().getBBox().width;
                typesizey1 = svg.select('#pictypebmv' + pictype).node().getBBox().height; //  iconRatio = typesizex1/typesizey1;
                /*-------------根据chartsize的数据来进行icon的缩放--------------------------------*/ // let scalex;
                scalexsize = 2 * maxR / (typesizex1 > typesizey1 ? typesizex1 : typesizey1); //scaleysize= maxR/(typesizex1>typesizey1?typesizex1:typesizey1);
                //  if(this.size() ==='large') scalexsize= 2*maxR/(typesizex1>typesizey1?typesizex1:typesizey1);
                svg.select('#pictypebmv' + pictype).attr("transform", function() { // scalex= scalexsize /(typesizex1>typesizey1?typesizex1:typesizey1);
                    return 'scale(' + scalexsize + ') ';
                }); /*----------------获取缩放后的icon长宽------------------------*/ // typesizex=svg.select(`#iconbubble${i}`).node().getBBox().width;
                // // typesizey=svg.select(`#iconbubble${i}`).node().getBoundingClientRect().height;
                // typesizey = typesizex/iconRatio;
                typex = svg.select('#pictypebmv' + pictype).node().getBBox().x;
                typey = svg.select('#pictypebmv' + pictype).node().getBBox().y; // let circlex = svg.select(`.bubble`).node().getBBox().x;
                // contentG.append("g")
                // .attr("fill", Color.CATEGORICAL[5])
                // .attr("fill-opacity", 0.8)
                // .attr("stroke", Color.CATEGORICAL[5])
                // .attr("stroke-width", 0.8)
                // .selectAll('.bubble')
                // .data(GeoData.features)
                // .enter()
                // .append('circle')
                // .attr("class", "bubble")
                // .attr("cx", (d, i) => {
                //     return path.centroid(GeoData.features[i])[0] ? path.centroid(GeoData.features[i])[0] : 0;
                // })
                // .attr("cy", (d, i) => {
                //     return path.centroid(GeoData.features[i])[1] ? path.centroid(GeoData.features[i])[1] : 0;
                // })
                // .attr("r", (d, i) => {
                //     let value = 0;
                //     if (d.properties.enName === subspace[0].value) {
                //         value = 1; //非零即可
                //     }
                //     return value ? maxR : 0
                // });
                //draw iconcircles
                contentG.append("g").attr("fill", _color2.default.HIGHLIGHT).attr("fill-opacity", 0.5).attr("stroke", _color2.default.HIGHLIGHT).attr("stroke-width", 0.5).selectAll('.iconbubblebmv').data(GeoData.features).enter().filter(function(d) {
                    return d.properties.enName === subspace[0].value;
                }).append("use").attr("xlink:href", '#pictypebmv' + pictype).attr("class", "iconbubblebmv").attr("id", function(d, i) {
                    return "iconbubblebmv" + i;
                }).attr("x", function(d, i) { // let countryName = geoValues[geoValues.indexOf(d.properties.enName)]
                    // let value;
                    // factdata.map(data => {
                    //     if (data[breakdown[0].field] === countryName) {
                    //         value = data[measuredField];
                    //     }
                    //     return data;
                    // })
                    // return typesizex===0?0:(circlex-Math.abs(typex)-typesizex/2)/scalexsize;
                    //    return path.centroid(GeoData.features[i])[0] ? path.centroid(GeoData.features[i])[0] : 0-Math.sqrt(typex*scalexsize)-typesizex/2;
                    // return (path.centroid(GeoData.features[i])[0] ? path.centroid(GeoData.features[i])[0] : 0)-Math.abs(typex*scalexsize)-typesizex1*scalexsize/2;
                    return positionL.x + positionL.width / 2 - Math.abs(typex * scalexsize) - typesizex1 * scalexsize / 2;
                }).attr("y", function(d, i) { // let countryName = geoValues[geoValues.indexOf(d.properties.enName)]
                    // let value;
                    // factdata.map(data => {
                    //     if (data[breakdown[0].field] === countryName) {
                    //         value = data[measuredField];
                    //     }
                    //     return data;
                    // })
                    // scaleysize= maxR/(typesizex1>typesizey1?typesizex1:typesizey1);
                    // console.log('scaleysize',scaleysize)
                    /*----------------获取缩放后的icon长宽------------------------*/ // typesizex=svg.select(`#iconbubble${i}`).node().getBoundingClientRect().width;
                    // // typesizey=svg.select(`#iconbubble${i}`).node().getBoundingClientRect().height;
                    // typesizey = typesizex/iconRatio;
                    // typex= svg.select(`#iconbubble${i}`).node().getBBox().x;
                    // typey=svg.select(`#iconbubble${i}`).node().getBBox().y;
                    // let circley = svg.select(`.bubble`).node().getBBox().y;
                    //return scaleysize===0?0:(circley-Math.abs(typey)-typesizey/2)/scaleysize;
                    // return path.centroid(GeoData.features[i])[1] ? path.centroid(GeoData.features[i])[1] : 0-Math.sqrt(typey*scaleysize)-typesizey/2;
                    return onlyCircle.attr("cy") - Math.abs(typey * scalexsize) - typesizey1 * scalexsize / 2; //return (path.centroid(GeoData.features[i])[1] ? path.centroid(GeoData.features[i])[1] : 0)-Math.abs(typey*scalexsize)-typesizey1*scalexsize/2;
                }).attr("opacity", function(d, i) {
                    return d.properties.enName === subspace[0].value ? 1 : 0;
                });
                contentG.selectAll('.bubble').remove(); // .attr("opacity", 0);
                // svg.remove('circle');
            } //finally update chart horizental cental
            var _h = contentG.node().getBBox().height,
                _w = contentG.node().getBBox().width;
            var marginTop = (this.height() - _h) / 2 - contentG.node().getBBox().y,
                marginLeft = (this.width() - _w) / 2 - contentG.node().getBBox().x;
            contentG.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
            return svg;
        } // displayOutlier() {
        //     this.displayDistribution()
        // }
        // displayExtreme() {
        //     this.displayDistribution()
        // }
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
        key: 'animateDistribution',
        value: function animateDistribution() {
            var chartSize = {
                width: this.width(),
                height: this.height()
            };
            var _getSizeBySize3 = getSizeBySize(chartSize, this.size(), "distribution"),
                margin = _getSizeBySize3.margin,
                hightLightFontSize = _getSizeBySize3.hightLightFontSize;
            var width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", this.width()).attr("height", this.height());
            var subspace = this.subspace();
            if (subspace.length > 0) {
                svg.append("text").text(subspace[0].value).attr("font-size", '100').attr('font-family', 'impact').attr("y", margin.top + 85).attr("x", this.width() / 2).attr("fill", _color2.default.DEFAULT).attr("text-anchor", "middle");
            }
            if (subspace.length > 0) margin.top = margin.top + 100;
            var contentG = svg.append("g").attr("transform", 'translate(' + margin.left + ',' + margin.top + ')');
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
            }
            var maxR = hightLightFontSize / 2 * this.width() / 640;
            if (this.size() === 'small' || this.size() === 'middle') {
                maxR = hightLightFontSize * this.width() / 640;
            }
            var scale = d3.scaleSqrt([minValue, maxValue], [0, maxR]);
            var geoValues = data.map(function(d) {
                return d[breakdown[0].field];
            });
            var projection = d3.geoMercator(); //init legends data
            var stepsLen = 3,
                stepWidth = (maxValue - minValue) / stepsLen;
            stepWidth = getFormatedValue(stepWidth); // console.log("getFormatedValue", stepWidth)
            var legendsData = [];
            for (var i = 1; i < stepsLen + 1; i++) {
                legendsData.push(stepWidth * i);
            }
            var marginBt = hightLightFontSize / 4,
                offsetY = 0; //append legends circle first
            var measuredWidth = margin.left; //inital
            var legends = contentG.append("g").attr("class", "legendsG").attr("transform", 'translate(' + (width - measuredWidth) + ' ' + 0 + ')');
            legends.append("g").attr("class", "circleL").selectAll('.circle').data(legendsData).enter().append("circle").attr("fill", "none").attr("stroke", "black").attr("stroke-width", 0.5).attr("cx", 0).attr("cy", function(g, i) {
                var selfR = scale(legendsData[i]);
                offsetY += 2 * selfR + marginBt;
                return offsetY;
            }).attr("r", function(g, i) {
                return scale(legendsData[i]);
            }); //legends text
            if (this.size() === "small") {} else if (this.size() === "middle") {
                hightLightFontSize = hightLightFontSize / 1.5;
            } else {
                hightLightFontSize = hightLightFontSize / 2;
            }
            var textOffsetY = 0;
            legends.append("g").attr("class", "textL").selectAll('.text').data(legendsData).enter().append("text").attr("fill", "black").attr('font-size', hightLightFontSize).attr('font-family', NUMFONT).attr("stroke", "black").attr("stroke-width", 0.5).attr("dominant-baseline", "central").attr("x", function(g, i) {
                return scale(legendsData[i]) + marginBt;
            }).attr("y", function(g, i) {
                var selfR = scale(legendsData[i]);
                textOffsetY += 2 * selfR + marginBt;
                return textOffsetY;
            }).text(function(g, i) {
                return getTickFormat(legendsData[i]);
            });
            measuredWidth = contentG.select(".legendsG").node().getBBox().width; //svg.select(".legendsG").node().setAttribute("x", width - measuredWidth)
            //console.log("measuredWidth", measuredWidth)
            if (this.size() === "large") {
                measuredWidth = 63;
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
            projection.fitSize([width - measuredWidth, height], GeoData); // 定义地理路径生成器
            var path = d3.geoPath().projection(projection);
            var map_svg = contentG.append('g').attr('class', 'map');
            map_svg.selectAll('path').data(GeoData.features).enter().append('path').attr('id', function(d) {
                return d.properties.enName;
            }).attr('stroke', 'grey').attr('stroke-width', 0.3).attr('fill', _color2.default.BACKGROUND).attr('d', path);
            if (mapType === "china") {
                appendSouthChinaSea(map_svg);
            } //draw circles
            var bubbleColor = _color2.default.SEQUENTIAL[5];
            if (measure[0]["color"]) {
                bubbleColor = measure[0]["color"];
            }
            contentG.append("g").attr("fill", bubbleColor).attr("fill-opacity", 0.8).attr("stroke", bubbleColor).attr("stroke-width", 0.8).selectAll('.bubble').data(GeoData.features).enter().filter(function(d) {
                if (d.properties.enName === 'Puerto Rico') return false;
                return geoValues.indexOf(d.properties.enName) !== -1;
            }).append('circle').attr("class", function(d) {
                return "bubble " + d.properties.enName;
            }).attr("cx", function(d, i) {
                return path.centroid(d)[0];
            }).attr("cy", function(d, i) {
                return path.centroid(d)[1];
            }).attr("r", function(d) {
                var countryName = geoValues[geoValues.indexOf(d.properties.enName)];
                var value = void 0;
                factdata.map(function(data) {
                    if (data[breakdown[0].field] === countryName) {
                        value = data[measuredField];
                    }
                    return data;
                }); //console.log("r", scale.domain(),scale(value))
                return scale(value);
            }); //finally update chart horizental cental
            if (this.size() !== 'large') {
                var _h = contentG.node().getBBox().height,
                    _w = contentG.node().getBBox().width;
                var marginTop = (this.height() - _h) / 2 - contentG.node().getBBox().y,
                    marginLeft = (this.width() - _w) / 2 - contentG.node().getBBox().x;
                contentG.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
            }
            if (this.style() === _style2.default.COMICS) {
                var mapBBox = svg.select('.map').node().getBBox();
                var metaphorWidth = width * 0.22,
                    metaphorHeight = 1.30 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor4.default).attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.5).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.5);
                if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.2;
                    metaphorHeight = 1.30 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.55).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.9);
                    if (mapType === "usa") {
                        metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.55).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.75);
                    }
                } else if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.18;
                    metaphorHeight = 1.30 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.35).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 1);
                } else if (this.size() === _size2.default.SMALL) {
                    metaphorWidth = width * 0.24;
                    metaphorHeight = 1.30 * metaphorWidth;
                    metaphor.attr("x", mapBBox.width + mapBBox.x + metaphorWidth * 0.4).attr("y", mapBBox.height + mapBBox.y - metaphorHeight * 0.7);
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight);
                legends.attr("transform", 'translate(' + (width / 0.9 - margin.left * 2) + ' ' + 0 + ')');
            } // let svg = this.displayDistribution();
            if (!svg) return;
            var duration = this.duration();
            var circleR = svg.selectAll('.bubble').nodes().map(function(d) {
                return d.getAttribute('r');
            });
            svg.selectAll(".map").attr("opacity", 0).transition().duration(duration / 4).attr("opacity", 1);
            svg.selectAll(".legendsG").style("opacity", 0).transition().duration(duration / 4).style("opacity", 1);
            svg.selectAll('.bubble').attr("r", 0).transition().duration(duration / 4 * 3).delay(duration / 4).attr("r", function(d, i) {
                return circleR[i];
            });
        }
    }, {
        key: 'animateValue',
        value: function animateValue() {
            var svg = this.displayValue();
            if (!svg) return;
            var duration = this.duration();
            var circleR = svg.selectAll('.bubble').nodes().map(function(d) {
                return d.getAttribute('r');
            });
            svg.selectAll(".map").attr("opacity", 0).transition().duration(duration / 10 * 2).attr("opacity", 1);
            svg.selectAll('.bubble').attr("r", 0).transition().duration(duration / 10 * 4).delay(duration / 10 * 2).attr("r", function(d, i) {
                return circleR[i];
            });
            var tooltip = svg.selectAll(".value-tooltip");
            var tooltipLine = svg.selectAll(".tooltip-line");
            tooltip.attr("opacity", 0);
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
            tooltipLine.transition().duration(duration / 10 * 2).delay(duration / 10 * 6).attr(_xChange, originalX);
            tooltip.transition().duration(duration / 10 * 2).delay(duration / 10 * 8).attr("opacity", 1);
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
    return BubbleMap;
}(_chart2.default); /****tick取整数 */
var getFormatedValue = function getFormatedValue(d) { // console.log("d", d)
    if (d / 1000000 >= 1) {
        d = parseInt(d / 1000000) * 1000000;
    } else if (d / 1000 >= 1) {
        d = parseInt(d / 1000) * 1000;
    }
    return parseInt(d);
};
var getTickFormat = function getTickFormat(d) {
    if (d / 1000000 >= 1) {
        d = d / 1000000 + "M";
    } else if (d / 1000 >= 1) {
        d = d / 1000 + "K";
    }
    return d;
};
var appendSouthChinaSea = function appendSouthChinaSea(map_svg) {
    var HWRitiao = 200 / 150;
    var sea2ChinaRitiao = 0.12;
    var appendWidth = map_svg.node().getBBox().width * sea2ChinaRitiao,
        appendHeight = appendWidth * HWRitiao,
        scale = appendWidth / 150;
    var x = map_svg.node().getBBox().width + map_svg.node().getBBox().x - appendWidth,
        y = map_svg.node().getBBox().height + map_svg.node().getBBox().y - appendHeight;
    var southchinaseaG = map_svg.append("g").attr("stroke", "black").attr("stroke-width", 1).attr('stroke', 'grey').attr("fill", 'rgb(227, 228, 229)').attr("transform-origin", x + ' ' + y + ' ').attr("transform", 'scale(' + scale + ')translate(' + x + ' ' + y + ')');
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
var getSizeBySize = function getSizeBySize(chartSize, size) {
    var fontSize = void 0,
        rectWidth = void 0,
        rectHight = void 0,
        hightLightFontSize = void 0;
    switch (size) {
        case _size2.default.WIDE:
            rectWidth = 7;
            rectHight = 80;
            fontSize = 12;
            hightLightFontSize = 26;
            break;
        case _size2.default.MIDDLE:
            rectWidth = 6;
            rectHight = 65;
            fontSize = 10;
            hightLightFontSize = 20;
            break;
        case _size2.default.SMALL:
            rectWidth = 4;
            rectHight = 50;
            fontSize = 8;
            hightLightFontSize = 16;
            break;
        case _size2.default.LARGE:
        default:
            rectWidth = 12;
            rectHight = 150;
            fontSize = 14;
            hightLightFontSize = 40;
            break;
    }
    return {
        margin: {
            top: 40 * chartSize.height / 640,
            right: 40 * chartSize.width / 640,
            bottom: 40 * chartSize.height / 640,
            left: 40 * chartSize.width / 640
        },
        rectWidth: rectWidth,
        rectHight: rectHight,
        fontSize: fontSize,
        hightLightFontSize: hightLightFontSize
    };
};
exports.default = BubbleMap;