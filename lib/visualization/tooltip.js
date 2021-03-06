'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _d = require('d3');
var d3 = _interopRequireWildcard(_d);
var _color = require('../visualization/color');
var _color2 = _interopRequireDefault(_color);
var _multiline = require('./multiline');
var _multiline2 = _interopRequireDefault(_multiline);

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
var DirectionType = {
    'Right': 0,
    'Left': 1,
    'Up': 2,
    'Down': 3
};
var fontFamily = {
    'temporal': 'Arial-Regular',
    'categorical': 'Arial-Regular',
    'numerical': 'Arial-Regular'
};
var generateToolTip = function generateToolTip(circleX, circleY, toolTipValue, svg, chartSize, annotationSize) {
    var direction = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "Up";
    var textType = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : "numerical"; //direction:tooltip的位置, Up在上方，Down在下方，Right在右边，Left在左边
    //textType: 根据文字的类型设置字体
    var toolTipSvg = svg.append("g").attr("class", "tooltip");
    var tooltipRect = toolTipSvg.append('rect').attr("class", "tooltipRect");
    var tooltip = toolTipSvg.append("text").attr("font-size", annotationSize).attr("font-family", fontFamily[textType] || 'Arial-Bold').attr("fill", 'white');
    if (textType === "categorical" || textType === "geographical") {
        tooltip.remove();
        tooltip = (0, _multiline2.default)(toolTipSvg, toolTipValue, annotationSize, chartSize.width * 0.3, circleX, circleY);
        tooltip.attr("transform", "translate(" + circleX + "," + 0 + ")").attr("fill", 'white');
    } else {
        tooltip.append("tspan").text(toolTipValue).attr("dy", tooltip.selectAll("tspan").node().getBBox().height * 0.9);
    }
    var textWidth = tooltip.node().getBBox().width;
    var textHeight = tooltip.node().getBBox().height;
    var widthAlpha = 0.7;
    var rectWidth = Math.min(textWidth / widthAlpha, textWidth + 12);
    var rectHeight = textHeight / 0.8;
    tooltipRect.attr("rx", 0.1 * textHeight).attr("ry", 0.1 * textHeight).attr("width", rectWidth).attr("height", rectHeight).attr("fill", _color2.default.ANNOTATION).attr("opacity", 1.0);
    var tooltipTriangle = toolTipSvg.append("path").attr("class", "triangle").attr("transform", "translate(" + circleX + "," + circleY + ")rotate(180)").attr("d", d3.symbol().type(d3.symbolTriangle).size(chartSize.height / 8)).attr("fill", _color2.default.ANNOTATION);
    tooltipRect.attr("x", circleX - rectWidth / 2).attr("y", circleY - rectHeight);
    tooltip.attr("width", textWidth).attr("height", textHeight).attr("x", circleX - rectWidth / 2 + (rectWidth - textWidth) / 2).attr("y", circleY - rectHeight / 2 - rectHeight / 2);
    switch (DirectionType[direction]) {
        case 0:
            tooltipTriangle.attr("opacity", 0);
            tooltipRect.attr("x", circleX).attr("y", circleY - rectHeight / 2);
            tooltip.attr("x", circleX + (rectWidth - textWidth) / 2).attr("y", circleY - rectHeight / 2.1);
            break;
        case 1:
            tooltipTriangle.attr("opacity", 0);
            tooltipRect.attr("x", circleX - rectWidth).attr("y", circleY - rectHeight / 2);
            tooltip.attr("x", circleX - rectWidth + (rectWidth - textWidth) / 2).attr("y", circleY - rectHeight / 2.1);
            break;
        case 3:
            tooltipTriangle.attr("transform", "translate(" + circleX + "," + circleY + ")");
            tooltipRect.attr("y", circleY);
            tooltip.attr("y", circleY + rectHeight / 2 - rectHeight / 2);
            break;
        default:
            break;
    }
};
exports.default = generateToolTip;