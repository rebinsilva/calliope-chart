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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var Transition = function() {
    function Transition() {
        _classCallCheck(this, Transition);
        this._container = document.createElement("div");
        this._duration = 1000;
    }
    _createClass(Transition, [{
        key: "container",
        value: function container(value) {
            if (!value) {
                return this._container;
            }
            this._container = value;
        }
    }, {
        key: "duration",
        value: function duration(value) {
            if (!value) {
                return this._duration;
            }
            this._duration = value;
        } /* transition */
    }, {
        key: "animateTransition",
        value: function animateTransition() {}
    }]);
    return Transition;
}();
exports.default = Transition;