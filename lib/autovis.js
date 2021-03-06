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
var _data = require('./data');
var _data2 = _interopRequireDefault(_data);
var _fact = require('./fact');
var _fact2 = _interopRequireDefault(_fact);
var _visualization = require('./visualization');
var _visualization2 = _interopRequireDefault(_visualization);
var _display = require('./display');
var _display2 = _interopRequireDefault(_display);
var _sentencer = require('./sentencer');
var _sentencer2 = _interopRequireDefault(_sentencer);

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
var AutoVis = function() {
    function AutoVis() {
        _classCallCheck(this, AutoVis);
        this._container = document.createElement("div");
        this._paragraph = document.createElement("p");
        this._data = new _data2.default();
        this._fact = new _fact2.default();
        this._vis = new _visualization2.default();
        this._display = new _display2.default();
        this._spec = {};
        this._shouldShowCaption = false;
    }
    _createClass(AutoVis, [{
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
        key: 'shouldShowCaption',
        value: function shouldShowCaption(value) {
            if (!value) {
                return this._shouldShowCaption;
            }
            this._shouldShowCaption = value;
        }
    }, {
        key: 'generate',
        value: function generate() {
            var _this = this; // STEP 0: parse specification
            var spec = this._spec;
            var dataspec = spec.data ? spec.data : {};
            var factspec = spec.fact ? spec.fact : {};
            var chartspec = spec.chart ? spec.chart : {}; // STEP 1: data
            this._data.load(dataspec).then(function(data) { // STEP 2: fact
                _this._fact.table(data.table());
                _this._fact.schema(data.schema());
                return _this._fact.load(factspec);
            }).then(function(fact) { // STEP 3: generate caption and setup visualization
                _this._vis.table(fact.table());
                _this._vis.data(fact.factdata());
                _this._vis.fact(fact.fact());
                try {
                    var caption = "";
                    if (chartspec.caption && chartspec.caption !== "") {
                        caption = chartspec.caption;
                    } else {
                        caption = (0, _sentencer2.default)(fact.fact());
                    }
                    _this._vis.caption(caption); // console.log("Caption: "+caption);
                } catch (error) {
                    console.log(error);
                }
                return _this._vis.load(chartspec);
            }).then(function(vis) { // STEP 4: display
                _this._display.container(_this.container());
                _this._display.paragraph(_this.paragraph());
                _this._display.vis(vis);
                _this._display.render();
                if (_this.shouldShowCaption()) {
                    _this._display.showCaption();
                }
            }).catch(function(reason) {
                console.log(reason);
            });
        }
    }, {
        key: 'update',
        value: function update(spec) {
            var _this2 = this;
            this._spec = spec; // let dataspec = spec.data ? spec.data : {};
            var nextfact = spec.fact ? spec.fact : {};
            var chartspec = spec.chart ? spec.chart : {}; // STEP 1: load new fact spec
            var prefact = this._fact.fact();
            this._fact.load(nextfact).then(function(fact) { // STEP 2: change fact in visualization
                _this2._vis.fact(fact.fact());
                _this2._vis.data(fact.factdata());
                try {
                    var caption = "";
                    if (chartspec.caption && chartspec.caption !== "") {
                        caption = chartspec.caption;
                    } else {
                        caption = (0, _sentencer2.default)(fact.fact());
                    }
                    _this2._vis.caption(caption); // console.log("Caption: "+caption);
                } catch (error) {
                    console.log(error);
                }
                return _this2._vis.update();
            }).then(function(vis) { // STEP 3: display
                _this2._display.vis(vis);
                _this2._display.update(prefact, nextfact);
                if (_this2.shouldShowCaption()) {
                    _this2._display.showCaption();
                }
            }).catch(function(reason) {
                console.log(reason);
            });
        }
    }]);
    return AutoVis;
}();
exports.default = AutoVis;