"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var textMultiline = function textMultiline(container, text, textSize, maxWidth, x, y) {
    var textAnchor = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : "middle";
    var words = text.split(" ").filter(function(d) {
        return d !== "";
    });
    var virtualE = container.append("text").attr("font-family", 'Arial-Regular').attr("font-size", textSize).text(words[0]);
    var textE = container.append("text").attr("transform", "translate(" + x + "," + y + ")").attr("font-family", 'Arial-Regular').attr("font-size", textSize).attr("text-anchor", textAnchor);
    maxWidth = Math.max(virtualE.node().getComputedTextLength(), maxWidth);
    var lineHeight = virtualE.node().getBBox().height * 0.9;
    var line = '';
    var rowCount = 0;
    var maxRow = 2;
    for (var n = 0; n < words.length; n++) {
        var testLine = line + ' ' + words[n]; /*  Add line in testElement */
        if (rowCount === maxRow - 1) {
            virtualE.text(testLine + "…");
        } else {
            virtualE.text(testLine);
        } /* Messure textElement */
        var testWidth = virtualE.node().getComputedTextLength();
        if (testWidth > maxWidth) {
            if (rowCount === maxRow - 1) { //最后一行还有文字没显示
                line += "…";
                break;
            } else { //new row
                textE.append("tspan").attr("x", 0).attr("dy", lineHeight).text(line);
                line = words[n];
                rowCount++;
            }
        } else {
            line = testLine;
        }
    }
    textE.append("tspan").attr("x", 0).attr("dy", lineHeight).text(line);
    virtualE.remove();
    return textE;
};
exports.default = textMultiline;