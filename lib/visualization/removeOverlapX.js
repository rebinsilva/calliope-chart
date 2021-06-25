"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _d = require("d3");
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
var removeOverlapX = function removeOverlapX(g, x) { // get tick width;
    var tickWidth = 0;
    g.selectAll(".tick").each(function(d, i) {
        var _thisWidth = d3.select(this).node().getBBox().width;
        if (tickWidth < _thisWidth) tickWidth = _thisWidth;
    });
    tickWidth = tickWidth * 1.5;
    var tickCount = g.selectAll(".tick").size();
    var xAxisWidth = x.range()[1] - x.range()[0];
    if (x.range()[0] === 0) xAxisWidth = xAxisWidth * 0.8;
    else xAxisWidth = xAxisWidth * 0.9;
    var possibleTickCount = Math.round(xAxisWidth / tickWidth) + 1;
    var enough = tickCount * tickWidth >= xAxisWidth ? false : true;
    var largestInterval = Math.floor((tickCount % 2 ? tickCount : tickCount - 1) / (possibleTickCount - 1)); // TODO 只有一个tick 显示首尾 但是如何避免真的两个都放不下呢？
    if (possibleTickCount === 1 && 2 * tickWidth < xAxisWidth) {
        var size = g.selectAll(".tick").size();
        g.selectAll(".tick").each(function(d, i) {
            if (!enough && i !== 0 && i !== size - 1) {
                this.remove();
            }
        });
    } else {
        if ((g.selectAll(".tick").size() - 1) % Math.floor(tickCount / possibleTickCount) === 0) { // 最后一个保证会被显示
            // 间隔少
            g.selectAll(".tick").each(function(d, i) {
                if (!enough && i % Math.floor(tickCount / possibleTickCount) !== 0) {
                    this.remove();
                }
            });
        } else { // 最后一个不保证会被显示
            // 间隔尽量长少
            g.selectAll(".tick").each(function(d, i) {
                if (!enough && i % largestInterval !== 0) {
                    this.remove(); // d3.select(this).attr("opacity", 0)
                }
            });
        }
    }
};
exports.default = removeOverlapX;