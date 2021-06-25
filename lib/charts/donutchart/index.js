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
var _metaphor = require('../../metaphor/metaphor16.png');
var _metaphor2 = _interopRequireDefault(_metaphor);
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
} //proportion
var fontSize = {
    "small": {
        "label": 14
    },
    "middle": {
        "label": 18
    },
    "wide": {
        "label": 20
    },
    "large": {
        "label": 40
    }
};
var chartMargin = {
    "proportion": {
        "small": {
            "top": 2.5,
            "right": 15,
            "bottom": 2.5,
            "left": 10
        },
        "middle": {
            "top": 5,
            "right": 25,
            "bottom": 5,
            "left": 25
        },
        "wide": {
            "top": 5,
            "right": 110,
            "bottom": 5,
            "left": 80
        },
        "large": {
            "top": 30,
            "right": 30,
            "bottom": 30,
            "left": 30
        }
    }
};
var NUMFONT = "Arial-Regular";
var DonutChart = function(_Chart) {
    _inherits(DonutChart, _Chart);

    function DonutChart() {
        _classCallCheck(this, DonutChart);
        return _possibleConstructorReturn(this, (DonutChart.__proto__ || Object.getPrototypeOf(DonutChart)).apply(this, arguments));
    }
    _createClass(DonutChart, [{
        key: 'displayProportion',
        value: function displayProportion() {
            /* -------------------------------- init data ------------------------------- */
            var factData = this.factdata(),
                measure = this.measure(),
                focus = this.focus()[0],
                breakdown = this.breakdown(),
                container = this.container(),
                size = this.size(),
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
            if (this.style() === _style2.default.COMICS) {
                width = 0.9 * width;
                height = 0.9 * height;
            }
            var R = Math.min(height, width) / 2,
                strokeWidth = Math.min(R * 0.04, 8);
            var arc = d3.arc().innerRadius(R * 0.63).outerRadius(R);
            var arc1 = d3.arc().innerRadius(R * 0.65).outerRadius(R * 0.98);
            content.selectAll(".data_item").data(pieData).enter().append("path").lower().attr("class", function(d, i) {
                return +i === 0 ? "data_item focusRing" : "data_item";
            }).attr("transform", "translate(" + R + "," + R + ")").attr("fill", function(d, i) {
                return i === 0 ? _color2.default.HIGHLIGHT : _color2.default.DEFAULT;
            }).attr("stroke-width", strokeWidth / 2).attr("stroke", "#fff").attr("d", function(d, i) {
                if (i === 0) return arc(d);
                else {
                    var _d = d;
                    _d.startAngle = 0;
                    return arc1(_d);
                }
            });
            var text = hint.append("text").attr("class", "percent").attr("x", R).attr("y", R).attr("text-anchor", "middle").attr("dominant-baseline", "ideographic").attr("font-family", NUMFONT).attr("font-size", font.label).attr("font-weight", "600").text(percentText);
            var textE = (0, _multiline2.default)(hint, focus.value, font.label, R, R, R);
            textE.attr("font-weight", "600"); //center text
            hint.attr("transform", 'translate(0, ' + (text.node().getBBox().height - textE.node().getBBox().height) / 2 + ')'); //center
            svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x) + "," + (this.height() - svg.node().getBBox().height) / 2 + ")");
            if (this.style() === _style2.default.COMICS) {
                var metaphor = svg.append("image");
                var metaphorWidth = size === _size2.default.LARGE ? width * 0.35 : width * 0.3;
                var metaphorHeight = metaphorWidth * 0.74;
                metaphor.attr('xlink:href', _metaphor2.default).attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", -metaphorWidth * 0.5).attr("y", -metaphorHeight * 0.16).attr("transform", "rotate(-45)");
                if (size === _size2.default.LARGE) metaphor.attr("y", metaphorHeight * 0.1);
                else if (size === _size2.default.SMALL) metaphor.attr("y", -metaphorHeight * 0.08);
                svg.node().prepend(metaphor.node()); //center居中
                svg.attr("transform", "translate(" + ((this.width() - svg.node().getBBox().width) / 2 - svg.node().getBBox().x - metaphorWidth * 0.1) + "," + ((this.height() - svg.node().getBBox().height) / 2 - svg.node().getBBox().y - metaphorHeight * 0.15) + ")");
            }
            if (this.style() === _style2.default.PICTOGRAPH) { // console.log('focus',focus)
                var pictype = focus.pictype; //获取相应的icon名称
                // pictype = 'BMW'; //测试用 - 定值'BMW'
                // console.log('pictype',pictype)
                // let measureName = measure[0] && measure[0].aggregate === 'count' ? "COUNT" : measure[0].field;
                // let width = chartSize.width - margin.left - margin.right,
                //     height = chartSize.height - margin.top - margin.bottom;
                /*------------------通过名称找寻icon----------------------------*/
                svg.append("defs").append("g").attr("id", 'pictypedp' + pictype).append("path").attr("d", _pictogram2.default[pictype]);
                svg.append("use").attr("xlink:href", '#pictypedp' + pictype).attr("class", "iconpercent"); // .attr("x", R)
                // .attr("y", R);
                var typesizex1 = svg.select('#pictypedp' + pictype).node().getBoundingClientRect().width;
                var typesizey1 = svg.select('#pictypedp' + pictype).node().getBoundingClientRect().height; /*-------------根据chartsize的数据来进行icon的缩放--------------------------------*/
                var scalex = void 0;
                var scalexsize = 1 / 4;
                if (size === 'large') scalexsize = 1 / 4;
                svg.select('#pictypedp' + pictype).attr("transform", function() {
                    scalex = (width > height ? height * scalexsize : width * scalexsize) / (typesizex1 > typesizey1 ? typesizex1 : typesizey1);
                    return 'scale(' + scalex + ')';
                });
                var scaley = scalex; /*----------------计算缩放后的icon长宽------------------------*/
                var typesizex = svg.select('#pictypedp' + pictype).node().getBoundingClientRect().width;
                var typesizey = svg.select('#pictypedp' + pictype).node().getBoundingClientRect().height;
                var typex = svg.select('#pictypedp' + pictype).node().getBBox().x;
                var typey = svg.select('#pictypedp' + pictype).node().getBBox().y;
                svg.select('.iconpercent').attr("x", function() { //console.log('picttttttttttt-x',R)           
                    // scalex= scalexsize /(typesizex1>typesizey1?typesizex1:typesizey1);
                    return R - Math.abs(typex * scalex) - typesizex / 2;
                }).attr("y", function() { // scalex= scalexsize /(typesizex1>typesizey1?typesizex1:typesizey1);
                    return R - Math.abs(typey * scaley) - typesizey / 2;
                }).attr('fill', _color2.default.HIGHLIGHT);
                text.attr('transform', 'translate(0, ' + (text.node().getBBox().height / 2 + textE.node().getBBox().height / 2 + typesizey / 2) + ')');
                textE.attr('opacity', 0);
            }
            return svg;
        }
    }, {
        key: 'animateProportion',
        value: function animateProportion() {
            var svg = this.displayProportion();
            if (!svg) return;
            var size = this.size(),
                margin = chartMargin["proportion"][size],
                width = this.width() - margin.left - margin.right,
                height = this.height() - margin.top - margin.bottom,
                duration = this.duration(),
                ticks = 10;
            var R = Math.min(height, width) / 2;
            var arc = d3.arc().innerRadius(R * 0.64).outerRadius(R); /* ------------------------------ start animate ----------------------------- */ /* ----------------------- animation frame arrangement ---------------------- */
            var animation = {
                bgFadeIn: {
                    duration: 3,
                    index: 0
                },
                labelFadeIn: {
                    duration: 2,
                    index: 1
                },
                majorGrow: {
                    duration: 5,
                    index: 2
                }
            };
            var everyTick = duration / ticks; /* ----------------------------- step 0 bgFadeIn ---------------------------- */
            var bgRing = svg.selectAll(".content").select("path");
            bgRing.attr("opacity", 0);
            bgRing.transition().duration(everyTick * animation.bgFadeIn.duration).attr("opacity", 1); /* ----------------------------- step 1 labelFadeIn ---------------------------- */
            var label = svg.selectAll(".hint").selectAll("text").filter(function() {
                return !this.classList.contains('percent');
            });
            label.attr("opacity", 0);
            label.transition().duration(everyTick * animation.labelFadeIn.duration).delay(everyTick * countTicksBeforeIndex(animation, animation.labelFadeIn.index)).attr("opacity", 1); /* ---------------------------- step 1 majorGrow ---------------------------- */
            var focusRing = svg.selectAll(".content").selectAll(".focusRing");
            focusRing.attr("opacity", 0);
            focusRing.attr("d", function(d, i) {
                var _d = Object.assign({}, d);
                _d.endAngle = _d.startAngle;
                return arc(_d);
            });
            var percentText = svg.selectAll(".hint").selectAll(".percent");
            percentText.attr("opacity", 0);
            percentText.attr("fill", _color2.default.HIGHLIGHT);
            setTimeout(function() {
                focusRing.attr("opacity", 1);
                focusRing.transition().duration(everyTick * (animation.majorGrow.duration + 0.5)).ease(d3.easeLinear).attrTween("d", function(d, i) {
                    var interpolate = d3.interpolate(d.startAngle, d.endAngle);
                    return function(t) {
                        d.endAngle = interpolate(t);
                        return arc(d);
                    };
                });
                percentText.attr("opacity", 1);
                percentText.transition().duration(everyTick * (animation.majorGrow.duration + 0.5)).ease(d3.easeLinear).textTween(function(d) {
                    var final = d3.select(this).text().split("%")[0];
                    var i = d3.interpolate(0.0, final);
                    var numberFormat = d3.format(".1f");
                    return function(t) {
                        var percent = numberFormat(i(t));
                        return percent + "%";
                    };
                });
            }, everyTick * countTicksBeforeIndex(animation, animation.majorGrow.index));
        }
    }]);
    return DonutChart;
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
exports.default = DonutChart;