"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var updateChartCenter = function updateChartCenter(svg, width, heigh) {
    var _h = svg.node().getBBox().height,
        _w = svg.node().getBBox().width;
    var marginTop = (heigh - _h) / 2 - svg.node().getBBox().y,
        marginLeft = (width - _w) / 2 - svg.node().getBBox().x;
    svg.attr("transform", "translate(" + marginLeft + "," + marginTop + ")");
};
exports.default = updateChartCenter;