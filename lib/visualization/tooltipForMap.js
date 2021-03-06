"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _format = require("./format");
var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var TEXTFONT = "Arial-Bold";
var generateToolTip = function generateToolTip(map_svg, focusedNodeBox, focusName, focusValue, margin, width, hightLightFontSize) {
    var marginTextLeft = margin.right,
        lineWidth = width / 10;
    var def = map_svg.append("defs");
    var bgFilter = def.append("filter").attr("id", "bgfilter").attr("x", "-6.7%").attr("y", "-11.7%").attr("width", "113.3%").attr("height", "126.7%"); //filterUnits="objectBoundingBox"
    bgFilter.append("feOffset").attr("dx", "0").attr("dy", "0").attr("in", "SourceAlpha").attr("result", "shadowOffsetOuter1");
    bgFilter.append("feGaussianBlur").attr("stdDeviation", 2.5) // .attr("result", "shadowBlurOuter1")
        .attr("in", "shadowOffsetOuter1");
    bgFilter.append("feComposite").attr("result", "out") // .attr("operator", "shadowBlurOuter1")
        .attr("in2", "SourceAlpha"); // .attr("in", "shadowBlurOuter1")
    bgFilter.append("feColorMatrix").attr("values", "0 0 0 0 0.693642437   0 0 0 0 0.693642437   0 0 0 0 0.693642437  0 0 0 0.5 0").attr("type", "matrix"); // .attr("in", "shadowBlurOuter1")
    if (focusedNodeBox.x + focusedNodeBox.width / 2 <= width / 2) { //ToolTip在右测
        map_svg.append('line').attr('class', 'tooltip-line').attr('x1', focusedNodeBox.x + focusedNodeBox.width / 2).attr('x2', focusedNodeBox.x + focusedNodeBox.width / 2 + lineWidth).attr('y1', focusedNodeBox.y + focusedNodeBox.height / 2).attr('y2', focusedNodeBox.y + focusedNodeBox.height / 2).attr("stroke-width", 1).attr("stroke", "black").property("_direction", "right");
        var valueG = map_svg.append("g").attr("class", 'value-tooltip'); //[1]append text first to measure the width/height for tooltipBox
        valueG.append("text").attr('class', 'tooltip-text').attr("visibility", "hidden") //virtue 
            .attr('dy', '-1.25em').attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('font-weight', 'bold').attr('text-anchor', 'middle').text(focusName);
        valueG.append("text").attr('class', 'tooltip-value').attr("visibility", "hidden") //virtue 
            .attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('font-weight', 'bold').attr('text-anchor', 'middle').text((0, _format2.default)(focusValue));
        var _selfWidth = valueG.node().getBBox().width,
            _selfHeight = valueG.node().getBBox().height; //[2] append  tooltipBox
        var tooltipBox = valueG.node().getBBox();
        var borderPadding = 2,
            boxPadding = 7;
        var tooltipBox_W = tooltipBox.width + boxPadding * 2,
            tooltipBox_H = tooltipBox.height + boxPadding * 2; //black   
        map_svg.append("rect").attr("width", tooltipBox_W + borderPadding * 2).attr("height", tooltipBox_H + borderPadding * 2).attr("x", focusedNodeBox.x + focusedNodeBox.width / 2 + lineWidth).attr("y", focusedNodeBox.y + focusedNodeBox.height / 2 - tooltipBox.height / 2).attr("rx", 8).attr("ry", 8).attr("fill", 'black').attr("fill-opacity", 1).attr("filter", "url(#" + bgFilter.attr("id") + ")"); //white
        map_svg.append("rect").attr("width", tooltipBox_W).attr("height", tooltipBox_H).attr("x", focusedNodeBox.x + focusedNodeBox.width / 2 + lineWidth + borderPadding).attr("y", focusedNodeBox.y + focusedNodeBox.height / 2 - tooltipBox.height / 2 + borderPadding).attr("rx", 8).attr("ry", 8).attr("fill", '#ffffff').attr("fill-opacity", 0.65); // [3] append text on the tooltipBox 
        map_svg.append("text").attr("width", tooltipBox.width - borderPadding * 2).attr("height", tooltipBox.height - borderPadding * 2).attr("x", focusedNodeBox.x + focusedNodeBox.width / 2 + lineWidth + borderPadding + boxPadding).attr("y", focusedNodeBox.y + focusedNodeBox.height / 2 - tooltipBox.height / 2 + borderPadding + boxPadding).attr('class', 'tooltip-value').attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('font-weight', 'bold').attr('text-anchor', 'start').attr('dy', '1em').text(focusName);
        map_svg.append("text").attr("width", tooltipBox.width - borderPadding * 2).attr("height", tooltipBox.height - borderPadding * 2).attr("x", focusedNodeBox.x + focusedNodeBox.width / 2 + lineWidth + borderPadding + boxPadding).attr("y", focusedNodeBox.y + focusedNodeBox.height / 2 - tooltipBox.height / 2 + borderPadding + boxPadding).attr('class', 'tooltip-text').attr('dy', '2.25em').attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('font-weight', 'bold').attr('text-anchor', 'start').text((0, _format2.default)(focusValue)); //update
        valueG.node().setAttribute("transform", "translate(" + (focusedNodeBox.x + focusedNodeBox.width / 2 + lineWidth + _selfWidth / 2 + marginTextLeft) + " " + (focusedNodeBox.y + focusedNodeBox.height / 2 + _selfHeight / 2) + ")");
    } else {
        map_svg.append('line').attr('class', 'tooltip-line').attr('x2', focusedNodeBox.x + focusedNodeBox.width / 2).attr('x1', focusedNodeBox.x + focusedNodeBox.width / 2 - lineWidth).attr('y1', focusedNodeBox.y + focusedNodeBox.height / 2).attr('y2', focusedNodeBox.y + focusedNodeBox.height / 2).attr("stroke-width", 1).attr("stroke", "black").property("_direction", "left");
        var _valueG = map_svg.append("g").attr("class", 'value-tooltip');
        _valueG.append("text").attr('class', 'tooltip-text').attr("visibility", "hidden").attr('dy', '-1.25em').attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('text-anchor', 'middle').text(focusName);
        _valueG.append("text").attr('class', 'tooltip-value').attr("visibility", "hidden").attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('text-anchor', 'middle').text((0, _format2.default)(focusValue));
        var _selfWidth2 = _valueG.node().getBBox().width,
            _selfHeight2 = _valueG.node().getBBox().height; //[2] append  tooltipBox
        var _tooltipBox = _valueG.node().getBBox();
        var _borderPadding = 2,
            _boxPadding = 7;
        var _tooltipBox_W = _tooltipBox.width + _boxPadding * 2,
            _tooltipBox_H = _tooltipBox.height + _boxPadding * 2; //black   
        map_svg.append("rect").attr("width", _tooltipBox_W + _borderPadding * 2).attr("height", _tooltipBox_H + _borderPadding * 2).attr("x", focusedNodeBox.x + focusedNodeBox.width / 2 - lineWidth - _tooltipBox_W).attr("y", focusedNodeBox.y + focusedNodeBox.height / 2 - _tooltipBox.height / 2).attr("rx", 8).attr("ry", 8).attr("fill", 'black').attr("fill-opacity", 1).attr("filter", "url(#" + bgFilter.attr("id") + ")"); //white
        map_svg.append("rect").attr("width", _tooltipBox_W).attr("height", _tooltipBox_H).attr("x", focusedNodeBox.x + focusedNodeBox.width / 2 - lineWidth - _tooltipBox_W).attr("y", focusedNodeBox.y + focusedNodeBox.height / 2 - _tooltipBox.height / 2 + _borderPadding).attr("rx", 8).attr("ry", 8).attr("fill", '#ffffff').attr("fill-opacity", 0.65); // [3] append text on the tooltipBox
        map_svg.append("text").attr("width", _tooltipBox.width - _borderPadding * 2).attr("height", _tooltipBox.height - _borderPadding * 2).attr("x", focusedNodeBox.x + focusedNodeBox.width / 2 - lineWidth - _boxPadding).attr("y", focusedNodeBox.y + focusedNodeBox.height / 2 - _tooltipBox.height / 2 + _borderPadding + _boxPadding).attr('class', 'tooltip-value').attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('font-weight', 'bold').attr('text-anchor', 'end').attr('dy', '1em').text(focusName);
        map_svg.append("text").attr("width", _tooltipBox.width - _borderPadding * 2).attr("height", _tooltipBox.height - _borderPadding * 2).attr("x", focusedNodeBox.x + focusedNodeBox.width / 2 - lineWidth - _boxPadding).attr("y", focusedNodeBox.y + focusedNodeBox.height / 2 - _tooltipBox.height / 2 + _borderPadding + _boxPadding).attr('class', 'tooltip-text').attr('dy', '2.25em').attr('font-size', hightLightFontSize).attr('font-family', TEXTFONT).attr('font-weight', 'bold').attr('text-anchor', 'end').text((0, _format2.default)(focusValue)); //update
        _valueG.node().setAttribute("transform", "translate(" + (focusedNodeBox.x + focusedNodeBox.width / 2 - lineWidth - _selfWidth2 / 2 - marginTextLeft) + " " + (focusedNodeBox.y + focusedNodeBox.height / 2 + _selfHeight2 / 2) + ")");
    }
};
exports.default = generateToolTip;