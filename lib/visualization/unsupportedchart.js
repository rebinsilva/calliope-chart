'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _color = require('./color');
var _color2 = _interopRequireDefault(_color);
var _d = require('d3');
var d3 = _interopRequireWildcard(_d);

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
var NUMFONT = "Arial-Regular";
var unsupportedchart = function unsupportedchart(svg, chartSize, annotationSize, size) {
    var _getMargin = getMargin(size),
        left = _getMargin.left,
        top = _getMargin.top,
        offset = _getMargin.offset,
        iconMargin = _getMargin.iconMargin,
        iconR = _getMargin.iconR,
        strokeW = _getMargin.strokeW;
    var group = svg.append("g").attr("transform", 'translate(' + left + ',' + top + ')');
    group.append("rect").attr("width", chartSize.width - 2 * left).attr("height", chartSize.height - 2 * top).attr("x", offset).attr("y", offset).attr("fill", _color2.default.DEFAULT);
    group.append("rect").attr("width", chartSize.width - 2 * left).attr("height", chartSize.height - 2 * top).attr("fill", _color2.default.BACKGROUND).attr("stroke", _color2.default.DEFAULT).attr("stroke-width", strokeW * 1.2);
    var contentGroup = group.append("g");
    var r = iconR,
        startY = (chartSize.height - 2 * top) / 2;
    var arc = d3.arc().innerRadius(r - strokeW * 2).outerRadius(r).startAngle(-1 / 2 * Math.PI - 1 / 6 * Math.PI).endAngle(Math.PI + 1 / 6 * Math.PI);
    contentGroup.append("g").attr("class", "arc").attr("transform", 'translate(' + (iconR + iconMargin) + ',' + startY + ')').append("path").attr("d", arc()).attr("fill", _color2.default.DEFAULT);
    var rectW = r * 0.2;
    contentGroup.append("rect").attr("width", rectW).attr("height", iconR * 0.7).attr("x", iconR + iconMargin - rectW / 2).attr("y", startY - iconR * 0.5).attr("rx", rectW / 2).attr("ry", rectW / 2).attr("fill", _color2.default.DEFAULT);
    contentGroup.append("circle").attr("cx", iconR + iconMargin).attr("cy", startY + iconR * 0.5).attr("r", rectW / 1.5).attr("fill", _color2.default.DEFAULT);
    if (size === 'middle' || size === 'small') {
        annotationSize = annotationSize * 0.7;
    }
    var textStartX = (iconR + iconMargin) * 2;
    var textE = contentGroup.append("text").attr("font-family", NUMFONT).attr("font-size", annotationSize * 1.3).attr("text-anchor", 'start').attr("width", chartSize.width - 4 * left - 2 * r).attr("height", (chartSize.height - 2 * top) / 2).attr("x", textStartX).attr("y", startY).attr("dominant-baseline", "central"); // let h = "2";
    // if (size === "small") {
    //     h = "1";
    // }
    textE.append("tspan").attr("x", textStartX) // .attr("dy", `-${h / 2}rem`)
        .attr("dy", -offset).text("The current data does not");
    textE.append("tspan").attr("x", textStartX) // .attr("dy", `${h}rem`)
        .attr("dy", offset * 2).text("apply to this chart.");
};
/*
 * offset 背景偏移量
 */
var getMargin = function getMargin(size) {
    switch (size) {
        case 'large':
            return {
                left: 40, top: 180, offset: 15, iconMargin: 35, iconR: 35, strokeW: 2.5
            };
        case 'middle':
            return {
                left: 30, top: 40, offset: 10, iconMargin: 10, iconR: 18, strokeW: 1.5
            };
        case 'wide':
            return {
                left: 60, top: 30, offset: 10, iconMargin: 20, iconR: 25, strokeW: 2
            };
        case 'small':
            return {
                left: 10, top: 30, offset: 5, iconMargin: 10, iconR: 15, strokeW: 1.5
            };
        default:
            return {
                left: 30, top: 30, offset: 15, iconMargin: 10, iconR: 15, strokeW: 2.5
            };
    }
};
exports.default = unsupportedchart;