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
var _facttype = require('./visualization/facttype');
var _facttype2 = _interopRequireDefault(_facttype);
var _aggregationtype = require('./visualization/aggregationtype');
var _aggregationtype2 = _interopRequireDefault(_aggregationtype);

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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
var Fact = function() {
    function Fact() {
        _classCallCheck(this, Fact); // table, factspec
        this._table = [];
        this._schema = [];
        this._factdata = [];
        this._type = "";
        this._measure = [];
        this._subspace = [];
        this._breakdown = [];
        this._parameter = "";
        this._focus = [];
    }
    _createClass(Fact, [{
        key: 'table',
        value: function table(value) {
            if (!value) {
                return this._table;
            }
            this._table = value;
            this._factdata = value;
        }
    }, {
        key: 'schema',
        value: function schema(value) {
            this._schema = value;
        }
    }, {
        key: 'factdata',
        value: function factdata() {
            return this._factdata;
        }
    }, {
        key: 'fact',
        value: function fact() {
            return {
                type: this._type,
                measure: this._measure,
                subspace: this._subspace,
                breakdown: this._breakdown,
                focus: this._focus,
                parameter: this._parameter
            };
        }
    }, {
        key: 'load',
        value: function load(spec) {
            var _this = this;
            this._type = spec.type ? spec.type : _facttype2.default.Distribution;
            this._measure = spec.measure ? spec.measure : [];
            if (this._measure.length === 0) {
                this._measure = [{
                    'aggregate': 'count'
                }];
            }
            this._subspace = spec.subspace ? spec.subspace : [];
            this._breakdown = spec.breakdown ? spec.breakdown : [];
            this._focus = spec.focus ? spec.focus : [];
            var schemaDict = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = this._schema[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var column = _step.value;
                    schemaDict[column.field] = {};
                    schemaDict[column.field]['subtype'] = column.subtype;
                    schemaDict[column.field]['pictype'] = column.pictype;
                    schemaDict[column.field]['type'] = column.type;
                    schemaDict[column.field]['values'] = column.values;
                    schemaDict[column.field]['isPostCode'] = column.isPostCode;
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
            this._measure = this._measure.map(function(x) {
                if ('field' in x) {
                    x['type'] = schemaDict[x.field]['type'];
                    if (schemaDict[x.field]['subtype']) {
                        x['subtype'] = schemaDict[x.field]['subtype'];
                    }
                    if (schemaDict[x.field]['pictype']) {
                        x['pictype'] = schemaDict[x.field]['pictype'];
                    }
                }
                return x;
            });
            this._subspace = this._subspace.map(function(x) {
                x['type'] = schemaDict[x.field]['type'];
                if (schemaDict[x.field]['subtype']) {
                    x['subtype'] = schemaDict[x.field]['subtype'];
                }
                if (schemaDict[x.field]['pictype']) {
                    x['pictype'] = schemaDict[x.field]['pictype'];
                }
                if (schemaDict[x.field]['isPostCode']) {
                    x['isPostCode'] = schemaDict[x.field]['isPostCode'];
                }
                return x;
            });
            this._breakdown = this._breakdown.map(function(x) {
                x['type'] = schemaDict[x.field]['type'];
                if (schemaDict[x.field]['subtype']) {
                    x['subtype'] = schemaDict[x.field]['subtype'];
                }
                if (schemaDict[x.field]['pictype']) {
                    x['pictype'] = schemaDict[x.field]['pictype'];
                }
                if (schemaDict[x.field]['values']) {
                    x['values'] = schemaDict[x.field]['values'];
                }
                if (schemaDict[x.field]['isPostCode']) {
                    x['isPostCode'] = schemaDict[x.field]['isPostCode'];
                }
                return x;
            });
            this._focus = this._focus.map(function(x) {
                x['type'] = schemaDict[x.field]['type'];
                if (schemaDict[x.field]['subtype']) {
                    x['subtype'] = schemaDict[x.field]['subtype'];
                }
                if (schemaDict[x.field]['pictype']) {
                    x['pictype'] = schemaDict[x.field]['pictype'];
                }
                return x;
            }); /** subspace **/
            if (this._subspace.length > 0) {
                this._factdata = this.filter(this.factdata(), this._subspace);
            } /** aggregate **/
            if (this._measure.length > 0) {
                var measure = this._measure;
                var breakdown = this._breakdown;
                this._factdata = this.aggregate(this._factdata, measure, breakdown);
            } /** parameter **/
            try {
                this._parameter = this.parameter();
            } catch (error) {
                console.log('parameter is wrong');
            }
            return new Promise(function(resolve, reject) {
                resolve(_this);
            });
        }
    }, {
        key: 'parameter',
        value: function parameter() {
            var data = this.factdata();
            var fact = this.fact();
            var breakdown = fact.breakdown;
            var focus = fact.focus;
            var measure = fact.measure;
            switch (fact.type) {
                case _facttype2.default.Association:
                    var pearson = function pearson(items, k1, k2) {
                        var x = 0,
                            xx = 0,
                            y = 0,
                            yy = 0,
                            xy = 0;
                        items.forEach(function(item) {
                            xx += item[k1] * item[k1];
                            x += item[k1];
                            yy += item[k2] * item[k2];
                            y += item[k2];
                            xy += item[k1] * item[k2];
                        });
                        var Lxx = xx - x * x / items.length,
                            Lyy = yy - y * y / items.length,
                            Lxy = xy - x * y / items.length;
                        if (Lxx === 0 || Lyy === 0) return 0;
                        return Lxy / Math.sqrt(Lxx * Lyy);
                    };
                    var x = "measure0:" + (measure[0].aggregate === "count" ? "COUNT" : measure[0].field),
                        y = "measure1:" + (measure[1].aggregate === "count" ? "COUNT" : measure[1].field);
                    var pearsons = pearson(data, x, y);
                    return pearsons;
                case _facttype2.default.Categorization:
                    var categories = data.map(function(d) {
                        return d[breakdown[0].field];
                    });
                    return Array.from(new Set(categories));
                case _facttype2.default.Rank:
                    var rankList = data.sort(function(a, b) {
                        return b['Recovered'] - a['Recovered'];
                    });
                    var rankCaetgories = rankList.map(function(d) {
                        return d[breakdown[0].field];
                    });
                    return rankCaetgories;
                case _facttype2.default.Proportion:
                    var focusItem = data.find(function(d) {
                            return d[focus[0].field] === focus[0].value;
                        }),
                        restItems = data.filter(function(d) {
                            return d[focus[0].field] !== focus[0].value;
                        });
                    var yEncoding = measure[0].field;
                    var seriesData = [focusItem[yEncoding], d3.sum(restItems, function(d) {
                        return d[yEncoding];
                    })];
                    var pieData = d3.pie().sort(null)(seriesData);
                    var percent = pieData[0].value / d3.sum(pieData, function(d) {
                        return d.value;
                    });
                    var percentText = (percent * 100).toFixed(1) + "%";
                    return percentText;
                case _facttype2.default.Value:
                    return data[0][measure[0].field];
                case _facttype2.default.Trend:
                    var getLeastSquares = function getLeastSquares(X, Y) {
                        var ret = {};
                        var sumX = 0;
                        var sumY = 0;
                        var sumXY = 0;
                        var sumXSq = 0;
                        var N = X.length;
                        for (var i = 0; i < N; ++i) {
                            sumX += X[i];
                            sumY += Y[i];
                            sumXY += X[i] * Y[i];
                            sumXSq += X[i] * X[i];
                        }
                        ret.m = (sumXY - sumX * sumY / N) / (sumXSq - sumX * sumX / N);
                        ret.b = sumY / N - ret.m * sumX / N;
                        return ret;
                    };
                    var arr = Array.apply(null, {
                        length: data.length
                    }).map(function(item, index) {
                        return index;
                    });
                    var ret = getLeastSquares(arr, data.map(function(d) {
                        return d[measure[0].field];
                    }));
                    if (ret.m > 0) return 'increasing';
                    if (ret.m < 0) return 'decreasing';
                    return 'flat';
                case _facttype2.default.Difference:
                    var filteredData = [];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
                    try {
                        var _loop = function _loop() {
                            var fs = _step2.value;
                            data.filter(function(x) {
                                return x[fs.field] === fs.value;
                            })[0] && filteredData.push(data.filter(function(x) {
                                return x[fs.field] === fs.value;
                            })[0]);
                        };
                        for (var _iterator2 = focus[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            _loop();
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                    var differenceValue = Math.abs(Number(filteredData[0][measure[0].field]) - Number(filteredData[1] ? filteredData[1][measure[0].field] : 0));
                    return differenceValue;
                case _facttype2.default.Extreme:
                    var extremeItem = data.find(function(d) {
                        return d[focus[0].field] === focus[0].value;
                    });
                    var maxValue = d3.max(data, function(d) {
                        return d[measure[0].field];
                    });
                    var minValue = d3.min(data, function(d) {
                        return d[measure[0].field];
                    });
                    extremeItem.extremeFocus = '';
                    if (extremeItem[measure[0].field] === minValue) extremeItem.extremeFocus = "minimum";
                    if (extremeItem[measure[0].field] === maxValue) extremeItem.extremeFocus = "maximum";
                    return Object.values(extremeItem);
                default:
                    return "";
            }
        }
    }, {
        key: 'filter',
        value: function filter(data, subspace) {
            var filteredData = data; //只有subspace有数据才会进入到该函数
            //先提取出subspace中的第一个内容，观察是否有"operator"选项
            //如果有"operator":那么按照新的过滤方式处理
            //如果没有"operator":那么遵循原来的过滤方式
            var wayFlag = subspace[0].hasOwnProperty("operator");
            if (wayFlag) { //多个subspace
                //一个subspace对应多个value
                //要根据operator选项判断清楚进行何种操作
                subspace.forEach(function(item) {
                    var operator = item["operator"];
                    switch (operator) {
                        case "EQ": //表示==某个值，这里的值仅为某个数值类型的值
                            filteredData = filteredData.filter(function(x) { //比较浮点数的大小
                                return Math.abs(x[item.field] - parseFloat(item.value[0])) < 1e-2;
                            });
                            break;
                        case "IN": //表示==某个值
                            filteredData = filteredData.filter(function(x) {
                                return item.value.includes(x[item.field]);
                            });
                            break;
                        case "RANGE": //表示在某个值的范围内，value中会有两个值
                            //需要将两个值都取出来,转化为数值形式
                            var value1 = parseFloat(item.value[0]);
                            var value2 = parseFloat(item.value[1]);
                            var max = value1;
                            var min = value2; // 比较大小，确定边界范围
                            if (value1 < value2) {
                                max = value2;
                                min = value1;
                            }
                            filteredData = filteredData.filter(function(x) {
                                return x[item.field] >= min && x[item.field] <= max;
                            });
                            break;
                        case "NOT RANGE": //表示在某个值的范围内，value中会有两个值
                            //需要将两个值都取出来,转化为数值形式
                            var valueNoRange1 = parseFloat(item.value[0]);
                            var valueNoRange2 = parseFloat(item.value[1]);
                            var max1 = valueNoRange1;
                            var min1 = valueNoRange2; // 比较大小，确定边界范围
                            if (valueNoRange1 < valueNoRange2) {
                                max1 = valueNoRange2;
                                min1 = valueNoRange1;
                            }
                            filteredData = filteredData.filter(function(x) {
                                return x[item.field] < min1 || x[item.field] > max1;
                            });
                            break;
                        case "GT": //表示大于某个值，所以这里的值仅有一个
                            //需要将其进行转化为数值形式
                            filteredData = filteredData.filter(function(x) {
                                return x[item.field] > parseFloat(item.value[0]);
                            });
                            break;
                        case "LT": //表示小于某个值，所以这里的值仅有一个
                            //需要将其进行转化为数值形式
                            filteredData = filteredData.filter(function(x) {
                                return x[item.field] < parseFloat(item.value[0]);
                            });
                            break;
                        default:
                            console.log("operator error!not in [GT,IN,LT,NOT RANGE,RANGE,EQ]");
                    }
                });
                return filteredData;
            } else {
                /** filter rows **/
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;
                try {
                    var _loop2 = function _loop2() {
                        var sub = _step3.value;
                        filteredData = filteredData.filter(function(x) {
                            return x[sub.field] === sub.value;
                        });
                    };
                    for (var _iterator3 = subspace[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        _loop2();
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
                return filteredData;
            }
        }
    }, {
        key: 'aggregate',
        value: function aggregate(data, measures, breakdowns) {
            var aggdata = [];
            if (measures.length < 1) {
                aggdata = data;
            } else if (measures.length === 1) {
                var measure = measures[0];
                aggdata = this.agg(data, measure, breakdowns);
            } else if (measures.length === 2) { // over one measure
                var aggdata1 = [];
                var aggdata2 = [];
                if (breakdowns.length > 0) {
                    aggdata1 = this.agg(data, measures[0], breakdowns);
                    aggdata2 = this.agg(data, measures[1], breakdowns);
                } else {
                    aggdata1 = JSON.parse(JSON.stringify(data));
                    aggdata2 = JSON.parse(JSON.stringify(data));
                }
                var breakdownfields = breakdowns.map(function(x) {
                    return x.field;
                });
                for (var index = 0; index < aggdata1.length; index++) {
                    var element1 = aggdata1[index];
                    for (var key in element1) {
                        if (!breakdownfields.includes(key)) {
                            element1["measure0:" + key] = element1[key];
                            delete element1[key];
                        }
                    }
                    var element2 = aggdata2[index];
                    for (var _key in element2) {
                        if (!breakdownfields.includes(_key)) {
                            element2["measure1:" + _key] = element2[_key];
                            delete element2[_key];
                        }
                    }
                    aggdata.push(Object.assign(element1, element2));
                }
            }
            return aggdata;
        }
    }, {
        key: 'agg',
        value: function agg(data, measure, breakdowns) {
            var aggdata = {};
            /**
             * filter columns
             */
            var columns = [];
            columns = columns.concat(breakdowns.map(function(x) {
                return x.field;
            }));
            if (measure.aggregate !== "count") {
                columns.push(measure.field);
            }
            aggdata = data.map(function(x) {
                var y = {};
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;
                try {
                    for (var _iterator4 = columns[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var column = _step4.value;
                        y[column] = x[column];
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
                return y;
            });
            switch (measure.aggregate) {
                case _aggregationtype2.default.SUM:
                    aggdata = this.sum(aggdata, measure, breakdowns);
                    break;
                case _aggregationtype2.default.AVG:
                    aggdata = this.avg(aggdata, measure, breakdowns);
                    break;
                case _aggregationtype2.default.MAX:
                    aggdata = this.max(aggdata, measure, breakdowns);
                    break;
                case _aggregationtype2.default.MIN:
                    aggdata = this.min(aggdata, measure, breakdowns);
                    break;
                case _aggregationtype2.default.COUNT:
                    aggdata = this.count(aggdata, measure, breakdowns);
                    break;
                default:
                    aggdata = this.max(aggdata, measure, breakdowns);
                    break;
            }
            return aggdata;
        }
    }, {
        key: 'sum',
        value: function sum(data, measure, breakdowns) {
            var factdata = [];
            if (breakdowns.length > 1) {
                /** has series **/
                var seriesData = d3.nest().key(function(d) {
                    return d[breakdowns[1].field];
                }).entries(data);
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;
                try {
                    var _loop3 = function _loop3() {
                        var series = _step5.value;
                        var calculateData = d3.nest().key(function(d) {
                            return d[breakdowns[0].field];
                        }).entries(series.values);
                        var sumData = new Array(calculateData.length).fill(0);
                        var categoryData = calculateData.map(function(d, i) {
                            d.values.forEach(function(d) {
                                sumData[i] += d[measure.field];
                            });
                            var sumRows = Object.assign({}, d.values[0]);
                            sumRows[measure.field] = sumData[i];
                            return sumRows;
                        });
                        factdata = factdata.concat(categoryData);
                    };
                    for (var _iterator5 = seriesData[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        _loop3();
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }
            } else if (breakdowns.length === 1) {
                /** no series **/
                var calculateData = d3.nest().key(function(d) {
                    return d[breakdowns[0].field];
                }).entries(data);
                var _sumData = new Array(calculateData.length).fill(0);
                factdata = calculateData.map(function(d, i) {
                    d.values.forEach(function(d) {
                        _sumData[i] += d[measure.field];
                    });
                    var sumRows = Object.assign({}, d.values[0]);
                    sumRows[measure.field] = _sumData[i];
                    return sumRows;
                });
            } else {
                /** no breakdown **/
                var agg = {};
                agg[measure.field] = 0;
                for (var index = 0; index < data.length; index++) {
                    agg[measure.field] += data[index][measure.field];
                }
                factdata.push(agg);
            }
            return factdata;
        }
    }, {
        key: 'avg',
        value: function avg(data, measure, breakdowns) {
            var factdata = [];
            if (breakdowns.length > 1) {
                /** has series **/
                var seriesData = d3.nest().key(function(d) {
                    return d[breakdowns[1].field];
                }).entries(data);
                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;
                try {
                    var _loop4 = function _loop4() {
                        var series = _step6.value;
                        var calculateData = d3.nest().key(function(d) {
                            return d[breakdowns[0].field];
                        }).entries(series.values);
                        var sumData = new Array(calculateData.length).fill(0);
                        var categoryData = calculateData.map(function(d, i) {
                            d.values.forEach(function(d) {
                                sumData[i] += d[measure.field];
                            });
                            var sumRows = Object.assign({}, d.values[0]);
                            sumRows[measure.field] = sumData[i] / d.values.length;
                            return sumRows;
                        });
                        factdata = factdata.concat(categoryData);
                    };
                    for (var _iterator6 = seriesData[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        _loop4();
                    }
                } catch (err) {
                    _didIteratorError6 = true;
                    _iteratorError6 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion6 && _iterator6.return) {
                            _iterator6.return();
                        }
                    } finally {
                        if (_didIteratorError6) {
                            throw _iteratorError6;
                        }
                    }
                }
            } else if (breakdowns.length === 1) {
                /** no series **/
                var calculateData = d3.nest().key(function(d) {
                    return d[breakdowns[0].field];
                }).entries(data);
                var _sumData2 = new Array(calculateData.length).fill(0);
                factdata = calculateData.map(function(d, i) {
                    d.values.forEach(function(d) {
                        _sumData2[i] += d[measure.field];
                    });
                    var sumRows = Object.assign({}, d.values[0]);
                    sumRows[measure.field] = _sumData2[i] / d.values.length;
                    return sumRows;
                });
            } else {
                /** no breakdown **/
                var agg = {};
                agg[measure.field] = 0;
                for (var index = 0; index < data.length; index++) {
                    agg[measure.field] += data[index][measure.field];
                }
                agg[measure.field] /= data.length;
                factdata.push(agg);
            }
            return factdata;
        }
    }, {
        key: 'max',
        value: function max(data, measure, breakdowns) {
            var factdata = [];
            if (breakdowns.length > 1) {
                /** has series **/
                var seriesData = d3.nest().key(function(d) {
                    return d[breakdowns[1].field];
                }).entries(data);
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;
                try {
                    for (var _iterator7 = seriesData[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var series = _step7.value;
                        var calculateData = d3.nest().key(function(d) {
                            return d[breakdowns[0].field];
                        }).entries(series.values);
                        var categoryData = calculateData.map(function(d, i) {
                            var index = d3.scan(d.values, function(a, b) {
                                if (a[measure.field] && b[measure.field]) return b[measure.field] - a[measure.field];
                            });
                            if (index >= 0) {
                                return d.values[index];
                            } else {
                                return d.values[0];
                            }
                        });
                        factdata = factdata.concat(categoryData);
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7.return) {
                            _iterator7.return();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }
            } else if (breakdowns.length === 1) {
                /** no series **/
                var _calculateData = d3.nest().key(function(d) {
                    return d[breakdowns[0].field];
                }).entries(data);
                factdata = _calculateData.map(function(d, i) {
                    var index = d3.scan(d.values, function(a, b) {
                        if (a[measure.field] && b[measure.field]) return b[measure.field] - a[measure.field];
                    });
                    if (index >= 0) {
                        return d.values[index];
                    } else {
                        return d.values[0];
                    }
                });
            } else {
                /** no breakdown **/
                var agg = {};
                agg[measure.field] = data[0][measure.field];
                for (var index = 0; index < data.length; index++) {
                    if (agg[measure.field] < data[index][measure.field]) {
                        agg[measure.field] = data[index][measure.field];
                    }
                }
                factdata.push(agg);
            }
            return factdata;
        }
    }, {
        key: 'min',
        value: function min(data, measure, breakdowns) {
            var factdata = [];
            if (breakdowns.length > 1) {
                /** has series **/
                var seriesData = d3.nest().key(function(d) {
                    return d[breakdowns[1].field];
                }).entries(data);
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;
                try {
                    for (var _iterator8 = seriesData[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var series = _step8.value;
                        var calculateData = d3.nest().key(function(d) {
                            return d[breakdowns[0].field];
                        }).entries(series.values);
                        var categoryData = calculateData.map(function(d) {
                            var index = d3.scan(d.values, function(a, b) {
                                if (a[measure.field] && b[measure.field]) return a[measure.field] - b[measure.field];
                            });
                            if (index >= 0) {
                                return d.values[index];
                            } else {
                                return d.values[0];
                            }
                        });
                        factdata = factdata.concat(categoryData);
                    }
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
                            _iterator8.return();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
                        }
                    }
                }
            } else if (breakdowns.length === 1) {
                /** no series **/
                var _calculateData2 = d3.nest().key(function(d) {
                    return d[breakdowns[0].field];
                }).entries(data);
                factdata = _calculateData2.map(function(d) {
                    var index = d3.scan(d.values, function(a, b) {
                        if (a[measure.field] && b[measure.field]) return a[measure.field] - b[measure.field];
                    });
                    if (index >= 0) {
                        return d.values[index];
                    } else {
                        return d.values[0];
                    }
                });
            } else {
                /** no breakdown **/
                var agg = {};
                agg[measure.field] = data[0][measure.field];
                for (var index = 0; index < data.length; index++) {
                    if (agg[measure.field] > data[index][measure.field]) {
                        agg[measure.field] = data[index][measure.field];
                    }
                }
                factdata.push(agg);
            }
            return factdata;
        }
    }, {
        key: 'count',
        value: function count(data, measure, breakdowns) {
            var factdata = [];
            if (breakdowns.length > 1) {
                /** has series **/
                var seriesData = d3.nest().key(function(d) {
                    return d[breakdowns[1].field];
                }).entries(data);
                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;
                try {
                    var _loop5 = function _loop5() {
                        var series = _step9.value;
                        var calculateData = d3.nest().key(function(d) {
                            return d[breakdowns[0].field];
                        }).entries(series.values);
                        var countData = new Array(calculateData.length).fill(0);
                        var categoryData = calculateData.map(function(d, i) {
                            d.values.forEach(function() {
                                countData[i] += 1;
                            });
                            var countRows = d.values[0];
                            countRows['COUNT'] = countData[i];
                            return countRows;
                        });
                        factdata = factdata.concat(categoryData);
                    };
                    for (var _iterator9 = seriesData[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        _loop5();
                    }
                } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion9 && _iterator9.return) {
                            _iterator9.return();
                        }
                    } finally {
                        if (_didIteratorError9) {
                            throw _iteratorError9;
                        }
                    }
                }
            } else if (breakdowns.length === 1) {
                /** no series **/
                var calculateData = d3.nest().key(function(d) {
                    return d[breakdowns[0].field];
                }).entries(data);
                var _countData = new Array(calculateData.length).fill(0);
                factdata = calculateData.map(function(d, i) {
                    d.values.forEach(function() {
                        _countData[i] += 1;
                    });
                    var countRows = d.values[0];
                    countRows['COUNT'] = _countData[i];
                    return countRows;
                });
            } else {
                /** no breakdown **/
                var agg = {
                    'COUNT': data.length
                };
                factdata.push(agg);
            }
            return factdata;
        }
    }]);
    return Fact;
}();
exports.default = Fact;