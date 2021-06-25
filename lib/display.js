"use strict";
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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var Display = function() {
    function Display() {
        _classCallCheck(this, Display); // visualization
        this._container = "";
        this._paragraph = "";
        this._vis = {};
    }
    _createClass(Display, [{
        key: "container",
        value: function container(value) {
            this._container = value;
        }
    }, {
        key: "paragraph",
        value: function paragraph(value) {
            this._paragraph = value;
        }
    }, {
        key: "vis",
        value: function vis(value) {
            if (!value) {
                return this._vis;
            }
            this._vis = value;
        }
    }, {
        key: "render",
        value: function render() {
            var vis = this.vis();
            var chart = vis.chart();
            chart.container(this._container);
            var fact = vis.fact();
            if (chart.duration() === 0) {
                chart.display(fact.type);
            } else {
                chart.animate(fact.type);
            }
        }
    }, {
        key: "update",
        value: function update(prefact, nextfact) {
            var vis = this.vis();
            var chart = vis.chart();
            chart.update(prefact, nextfact);
        }
    }, {
        key: "showCaption",
        value: function showCaption() {
            var vis = this.vis();
            d3.select(this._paragraph).style('font-size', '1.5em').style('text-align', 'center').text(vis.caption());
        }
    }]);
    return Display;
}();
exports.default = Display;