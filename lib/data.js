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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var Data = function() {
    function Data() {
        _classCallCheck(this, Data);
        this._table = [];
        this._schema = [];
    }
    _createClass(Data, [{
        key: 'table',
        value: function table() {
            return this._table;
        }
    }, {
        key: 'schema',
        value: function schema() {
            return this._schema;
        }
    }, {
        key: 'load',
        value: function load(spec) {
            var _this = this;
            return new Promise(function(resolve, reject) {
                var numericalFields = [];
                var numerical = spec.schema.filter(function(d) {
                    return d.type === "numerical";
                });
                numericalFields = numerical.map(function(d) {
                    return d.field;
                });
                if ('values' in spec) {
                    var data = spec.values;
                    data.forEach(function(d, i) {
                        for (var key in d) {
                            if (numericalFields.indexOf(key) !== -1) {
                                d[key] = parseFloat(d[key]);
                            }
                        }
                    });
                    _this._table = data;
                    _this._schema = spec.schema;
                    resolve(_this);
                } else {
                    d3.csv(spec.url).then(function(data) {
                        data.forEach(function(d, i) {
                            for (var key in d) {
                                if (numericalFields.indexOf(key) !== -1) {
                                    d[key] = parseFloat(d[key]);
                                }
                            }
                        });
                        this._table = data;
                        this._schema = spec.schema;
                        resolve(this);
                    }.bind(_this)).catch(function(error) {
                        reject(error);
                    });
                }
            });
        }
    }]);
    return Data;
}();
exports.default = Data;