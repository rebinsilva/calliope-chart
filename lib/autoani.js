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
var _autovis = require('./autovis');
var _autovis2 = _interopRequireDefault(_autovis);
var _transitions = require('./transitions');

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
var AutoAni = function() {
    function AutoAni() {
        _classCallCheck(this, AutoAni);
        if (!AutoAni.instance) {
            this._container = document.createElement("div");
            this._paragraph = document.createElement("p");
            this._spec = {};
            this._timeouts = [];
            this.autovis = new _autovis2.default();
            AutoAni.instance = this;
        } else {
            return AutoAni.instance;
        }
    }
    _createClass(AutoAni, [{
        key: 'container',
        value: function container(value) {
            if (!value) {
                return this._container;
            }
            this._container = value;
        }
    }, {
        key: 'paragraph',
        value: function paragraph(value) {
            if (!value) {
                return this._paragraph;
            }
            this._paragraph = value;
        }
    }, {
        key: 'load',
        value: function load(spec) {
            this._spec = spec;
        }
    }, {
        key: 'play',
        value: function play() {
            var _this = this;
            var animationDelay = 0;
            var pauseDuration = 1500;
            var transitionDuration = 500;
            var fade = new _transitions.Fade();
            fade.container(this.container());
            fade.duration(transitionDuration);
            var videoSpec = this._spec;
            var dataspec = videoSpec.data;
            var specs = videoSpec.specs;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                var _loop = function _loop() {
                    var spec = _step.value;
                    spec.data = dataspec;
                    var newspec = JSON.parse(JSON.stringify(spec)); // deepclone
                    if (newspec.chart.duration === 0) {
                        newspec.chart.duration = 4000; // default duration
                    } // play chart animation
                    _this._timeouts.push(setTimeout(function() {
                        this.autovis.container(this.container());
                        this.autovis.paragraph(this.paragraph());
                        this.autovis.load(newspec);
                        this.autovis.shouldShowCaption(true);
                        this.autovis.generate();
                    }.bind(_this), animationDelay));
                    animationDelay += newspec.chart.duration; // pause
                    animationDelay += pauseDuration; // play transition
                    _this._timeouts.push(setTimeout(function() {
                        fade.animateTransition();
                    }, animationDelay));
                    animationDelay += transitionDuration;
                };
                for (var _iterator = specs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            for (var i = 0; i < this._timeouts.length; i++) {
                clearTimeout(this._timeouts[i]);
            }
        }
    }]);
    return AutoAni;
}();
exports.default = AutoAni;