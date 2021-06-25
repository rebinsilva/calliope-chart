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
var _chart = require('../../chart');
var _chart2 = _interopRequireDefault(_chart);
var _color = require('../../visualization/color');
var _color2 = _interopRequireDefault(_color);
var _size = require('../../visualization/size');
var _size2 = _interopRequireDefault(_size);
var _style = require('../../visualization/style');
var _style2 = _interopRequireDefault(_style);
var _metaphor = require('../../metaphor/metaphor3.png');
var _metaphor2 = _interopRequireDefault(_metaphor);
var _metaphor3 = require('../../metaphor/metaphor5.png');
var _metaphor4 = _interopRequireDefault(_metaphor3);
var _metaphor5 = require('../../metaphor/metaphor30.png');
var _metaphor6 = _interopRequireDefault(_metaphor5);
var _pictogram = require('../../visualization/pictogram');
var _pictogram2 = _interopRequireDefault(_pictogram);

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

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} //categorization
//proportion
//distribution
var chartSize = {
    "small": {
        "width": 80,
        "height": 60,
        "fontSize": 12,
        "padding": 0.3,
        "strokeWidth": 1,
        "maxRectWidth": 10,
        "maxRectHeight": 25,
        "margin": {
            left: 2,
            bottom: 2, //for categotization            
            top: 12, //for proportion               
            lineSpace: 1 //for proportion 
        },
        "titleHeight": 46,
        "maxTitleWidth": 40,
        'paddingTop': 20
    },
    "middle": {
        "width": 140,
        "height": 100,
        "fontSize": 14,
        "padding": 0.5,
        "strokeWidth": 1,
        "maxRectWidth": 25,
        "maxRectHeight": 13,
        "margin": {
            left: 4,
            bottom: 4, //for categotization            
            top: 14, //for proportion               
            lineSpace: 1 //for proportion  
        },
        "titleHeight": 40,
        "maxTitleWidth": 50,
        'paddingTop': 24.5
    },
    "wide": {
        "width": 280,
        "height": 100,
        "fontSize": 16,
        "padding": 0.8,
        "strokeWidth": 2,
        "maxRectWidth": 42,
        "maxRectHeight": 16,
        "margin": {
            left: 8,
            bottom: 6, //for categotization            
            top: 17, //for proportion               
            lineSpace: 1 //for proportion  
        },
        "titleHeight": 31,
        "maxTitleWidth": 60,
        'paddingTop': 22.5
    },
    "large": {
        "width": 320,
        "height": 320,
        "fontSize": 20,
        "padding": 1,
        "strokeWidth": 3,
        "maxRectWidth": 31,
        "maxRectHeight": 23,
        "margin": {
            left: 6,
            bottom: 8, //for categotization            
            top: 22, //for proportion               
            lineSpace: 3 //for proportion  
        },
        "titleHeight": 33,
        "maxTitleWidth": 90,
        'paddingTop': 34
    }
};
var NUMFONT = "Arial-Regular";
var TreeMap = function(_Chart) {
    _inherits(TreeMap, _Chart);

    function TreeMap() {
        _classCallCheck(this, TreeMap);
        return _possibleConstructorReturn(this, (TreeMap.__proto__ || Object.getPrototypeOf(TreeMap)).apply(this, arguments));
    }
    _createClass(TreeMap, [{
        key: 'displayCategorization',
        value: function displayCategorization() {
            var factData = this.factdata(); // let measure = this.measure();
            var breakdown = this.breakdown();
            var size = this.size();
            var chartWidth = this.width();
            var chartHeight = this.height();
            var COUNT = "COUNT";
            var data = {
                name: "treemap",
                children: []
            };
            var seriesName = void 0;
            if (breakdown.length === 2) {
                var seriesData = d3.nest().key(function(d) {
                    return d[breakdown[0].field];
                }).entries(factData);
                seriesData.map(function(d) {
                    data.children.push({
                        name: d.key,
                        children: d.values.map(function(d) {
                            return { // name: [d[breakdown[0].field], d[breakdown[1].field]],
                                name: [d[breakdown[1].field]],
                                value: d[COUNT]
                            };
                        })
                    });
                    return true;
                });
            } else {
                var _loop = function _loop(i) {
                    data.children.push({ // name: factData[i][breakdown[0].field],
                        name: breakdown.map(function(d) {
                            return factData[i][d.field];
                        }),
                        value: factData[i][COUNT]
                    });
                };
                for (var i = 0; i < factData.length; i++) {
                    _loop(i);
                }
            }
            var margin = {
                    top: 20 * chartHeight / 320,
                    right: 20 * chartWidth / 320,
                    bottom: 20 * chartHeight / 320,
                    left: 20 * chartWidth / 320
                },
                width = chartWidth - margin.left - margin.right,
                height = chartHeight - margin.top - margin.bottom + chartSize[size].paddingTop;
            if (breakdown.length === 2) {
                margin.top = margin.top - chartSize[size].paddingTop;
            }
            if (breakdown.length === 1) {
                height = chartHeight - margin.top - margin.bottom;
            }
            var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // let format = d3.format(",d")
            if (this.style() === _style2.default.COMICS) width = this.size() === _size2.default.WIDE ? 0.82 * width : 0.8 * width;
            var nestTreemap = function nestTreemap(data) {
                return d3.treemap() // .tile(tile)
                    .size([width, height]).padding(breakdown.length === 2 ? 1 : chartSize[size].padding).paddingTop(chartSize[size].paddingTop) // .paddingOuter(3)
                    .paddingInner(1).round(true)(d3.hierarchy(data).sum(function(d) {
                        return d.value;
                    }).sort(function(a, b) {
                        return b.value - a.value;
                    }));
            };
            var treemap = function treemap(data) {
                return d3.treemap() // .tile(tile)
                    .size([width, height]).padding(chartSize[size].padding).paddingInner(1).round(true)(d3.hierarchy(data).sum(function(d) {
                        return d.value;
                    }).sort(function(a, b) {
                        return b.value - a.value;
                    }));
            };
            var root = void 0;
            if (breakdown.length === 2) {
                root = nestTreemap(data);
            } else {
                root = treemap(data);
            }
            if (breakdown.length === 2) {
                var titleLayer = svg.append('g').attr('class', 'title-layer');
                titleLayer // .attr('clip-path', 'url(#clip_tree)')
                    .selectAll("titles").data(root.descendants().filter(function(d) {
                        return d.depth === 1;
                    })).enter().append("rect").attr('id', function(d, i) {
                        return 'titleRect_' + i;
                    }).attr("x", function(d) {
                        return d.x0;
                    }).attr("y", function(d) {
                        return d.y0;
                    }) //21
                    .attr("width", function(d) {
                        return d.x1 - d.x0 >= 0 ? d.x1 - d.x0 : 0;
                    }).attr("height", function(d) {
                        return d.y1 - d.y0;
                    }).attr("fill", function(d, i) {
                        if (d.depth === 2) {
                            d = d.parent;
                            return _color2.default.CATEGORICAL[seriesName.indexOf(d.data.name) % 10];
                        } else return _color2.default.CATEGORICAL[i % 10];
                    });
                titleLayer.append('defs').append('clipPath').attr('id', 'clip_tree').append('rect').attr("width", width).attr('height', height); // titleLayer
                //     .selectAll('rect')
                //     .append('clipPath')
                //     .append('rect')
                //     .attr('id', (d,i)=>'clip_title'+i)
                //     .attr("x", d=>d.x0+1)
                //     .attr("y", d=>d.y0 + 21 ) //21
                //     .attr("width", function (d) { return d.x1 - d.x0 >= 2 ? d.x1 - d.x0 - 2 : 0 })
                //     .attr("height", 23)
                titleLayer.selectAll("titles").data(root.descendants().filter(function(d) {
                        return d.depth === 1;
                    })).enter().append("text").attr('id', function(d, i) {
                        return 'titleText_' + i;
                    }).attr("x", function(d) {
                        return d.x0 + chartSize[size].margin.left;
                    }).attr("y", function(d) {
                        return d.y0 - chartSize[size].fontSize / 2;
                    }).text(function(d) {
                        var nShow = parseInt((d.x1 - d.x0 - chartSize[size].margin.left) / chartSize[size].fontSize * 1.5);
                        if (nShow < 3) return '';
                        if (nShow >= d.data.name.length) {
                            return d.data.name;
                        } else return d.data.name.substr(0, nShow - 3) + '...';
                    }).attr("font-size", chartSize[size].fontSize).attr("font-family", NUMFONT) // .attr("opacity", d => {
                    //     if (d.x1 - d.x0 < chartSize[size].maxTitleWidth)
                    //         return 0
                    //     else return 1
                    // })
                    .attr("transform", 'translate(0,' + chartSize[size].paddingTop + ')').append("title").text(function(d) {
                        return d.data.name;
                    }); // .attr('clip-path', (d, i) => 'url(#clip_' + i + ')')
            }
            var leaf = svg.append('g').attr('class', 'leaf-layer').selectAll("g").data(root.leaves()).join("g").attr("transform", function(d) {
                return 'translate(' + d.x0 + ',' + d.y0 + ')';
            });
            seriesName = Array.from(new Set(root.leaves().map(function(d) {
                return d.parent.data.name;
            })));
            leaf.append("rect").attr('class', 'leaf').attr('id', function(d, i) {
                return 'rect_' + i;
            }).attr("fill", function(d, i) {
                if (breakdown.length === 2) return 'white';
                if (d.depth === 2) {
                    d = d.parent;
                    return _color2.default.CATEGORICAL[seriesName.indexOf(d.data.name) % 10];
                } else return _color2.default.CATEGORICAL[i % 10];
            }).attr('opacity', function(d, i) {
                if (breakdown.length === 2) return 0.3;
                else return 1;
            }).attr("width", function(d) {
                return d.x1 - d.x0;
            }).attr("height", function(d) {
                return d.y1 - d.y0;
            });
            var format = d3.format(",d");
            leaf.append("title").text(function(d) { // if (d.depth === 2) return `${d.parent.data.name}\n${d.data.name}\n${format(d.value)}`
                // else 
                return d.data.name + '\n' + format(d.value);
            }); //         leaf.append("title")
            //   .text(d => `${d.ancestors().reverse().map(d => d.data.name).join("/")}\n${format(d.value)}`);
            leaf.append("clipPath").attr('id', function(d, i) {
                return 'clip_' + i;
            }).append('rect').attr("width", function(d) {
                return d.x1 - d.x0;
            }).attr('height', function(d) {
                return d.y1 - d.y0;
            });
            leaf.append("text").attr('id', function(d, i) {
                    return 'label_' + i;
                }).attr('class', 'labels').attr('fill', 'black') // .attr('fill', Color.TEXT)
                // .style('mix-blend-mode', 'difference')
                // .style('text-shadow', '0.1em 0.1em 0.1em #000000')
                .attr("font-family", NUMFONT).attr('font-size', chartSize[size].fontSize).attr('clip-path', function(d, i) {
                    return 'url(#clip_' + i + ')';
                }) // .selectAll("tspan")
                // .data(d => d.data.name)
                // .enter()
                // .append("tspan")
                .attr("x", chartSize[size].margin.left).attr("dy", "1.1em").text(function(d) {
                    var nShow = parseInt((d.x1 - d.x0 - chartSize[size].margin.left) / chartSize[size].fontSize * 1.5);
                    if (nShow <= 3) return '';
                    if (nShow >= d.data.name[0].length) return d.data.name[0];
                    else return d.data.name[0].substr(0, nShow - 3) + '...';
                });
            leaf.selectAll(".labels").each(function(d) {
                var opacity = 1;
                var i = d3.select(this).node().id.split("_")[1]; // let textWdith = leaf.select('#label_' + i).node().getBBox().width
                // let textHeight = leaf.select('#label_' + i).node().getBBox().height
                var rectWidth = leaf.select('#rect_' + i).node().getBBox().width;
                var rectHeight = leaf.select('#rect_' + i).node().getBBox().height;
                if (rectWidth < chartSize[size].maxRectWidth) opacity = 0;
                if (rectHeight < chartSize[size].maxRectHeight) opacity = 0;
                d3.select(this).attr('opacity', opacity);
            });
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.26,
                    metaphorHeight = 1.38 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor2.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.21;
                    metaphorHeight = 1.38 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.24;
                    metaphorHeight = 1.38 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
            }
            return svg;
        }
    }, {
        key: 'displayDistribution',
        value: function displayDistribution() {
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var size = this.size();
            var chartWidth = this.width();
            var chartHeight = this.height();
            var data = {
                name: "treemap",
                children: []
            };
            var mesuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
            var maxValue = d3.max(factData, function(d) {
                return d[mesuredField];
            });
            var seriesName = void 0;
            if (breakdown.length === 2) {
                var seriesData = d3.nest().key(function(d) {
                    return d[breakdown[0].field];
                }).entries(factData);
                seriesData.map(function(d) {
                    data.children.push({
                        name: d.key,
                        children: d.values.map(function(d) {
                            return { // name: [d[breakdown[0].field], d[breakdown[1].field]],
                                name: [d[breakdown[1].field]],
                                value: d[mesuredField]
                            };
                        })
                    });
                    return true;
                });
            } else {
                var _loop2 = function _loop2(i) {
                    data.children.push({ // name: factData[i][breakdown[0].field],
                        name: breakdown.map(function(d) {
                            return factData[i][d.field];
                        }),
                        value: factData[i][mesuredField]
                    });
                };
                for (var i = 0; i < factData.length; i++) {
                    _loop2(i);
                }
            }
            var margin = {
                    top: 20 * chartHeight / 320,
                    right: 20 * chartWidth / 320,
                    bottom: 20 * chartHeight / 320,
                    left: 20 * chartWidth / 320
                },
                width = chartWidth - margin.left - margin.right,
                height = chartHeight - margin.top - margin.bottom + chartSize[size].paddingTop;
            if (breakdown.length === 2) {
                margin.top = margin.top - chartSize[size].paddingTop;
            }
            if (breakdown.length === 1) {
                height = chartHeight - margin.top - margin.bottom;
            }
            var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            if (this.style() === _style2.default.COMICS) width = this.size() === _size2.default.WIDE ? 0.82 * width : 0.8 * width; // let format = d3.format(",d")
            var nestTreemap = function nestTreemap(data) {
                return d3.treemap() // .tile(tile)
                    .size([width, height]).padding(breakdown.length === 2 ? 1 : chartSize[size].padding).paddingTop(chartSize[size].paddingTop) // .paddingOuter(3)
                    .paddingInner(1).round(true)(d3.hierarchy(data).sum(function(d) {
                        return d.value;
                    }).sort(function(a, b) {
                        return b.value - a.value;
                    }));
            };
            var treemap = function treemap(data) {
                return d3.treemap() // .tile(tile)
                    .size([width, height]).padding(chartSize[size].padding).paddingInner(1).round(true)(d3.hierarchy(data).sum(function(d) {
                        return d.value;
                    }).sort(function(a, b) {
                        return b.value - a.value;
                    }));
            };
            var root = void 0;
            if (breakdown.length === 2) {
                root = nestTreemap(data);
            } else {
                root = treemap(data);
            }
            if (breakdown.length === 2) {
                var titleLayer = svg.append('g').attr('class', 'title-layer');
                titleLayer // .attr('clip-path', 'url(#clip_tree)')
                    .selectAll("titles").data(root.descendants().filter(function(d) {
                        return d.depth === 1;
                    })).enter().append("rect").attr('id', function(d, i) {
                        return 'titleRect_' + i;
                    }).attr("x", function(d) {
                        return d.x0;
                    }).attr("y", function(d) {
                        return d.y0;
                    }) //21
                    .attr("width", function(d) {
                        return d.x1 - d.x0 >= 0 ? d.x1 - d.x0 : 0;
                    }).attr("height", function(d) {
                        return d.y1 - d.y0;
                    }).attr("fill", function(d, i) {
                        if (d.depth === 2) {
                            d = d.parent;
                            return _color2.default.CATEGORICAL[seriesName.indexOf(d.data.name) % 10];
                        } else return _color2.default.CATEGORICAL[i % 10];
                    }); // .attr('fill-opacity', 1)
                // .attr("transform", "translate(0,-40)")
                titleLayer.append('defs').append('clipPath').attr('id', 'clip_tree').append('rect').attr("width", width).attr('height', height); // titleLayer
                //     .selectAll('rect')
                //     .append('clipPath')
                //     .append('rect')
                //     .attr('id', (d,i)=>'clip_title'+i)
                //     .attr("x", d=>d.x0+1)
                //     .attr("y", d=>d.y0 + 21 ) //21
                //     .attr("width", function (d) { return d.x1 - d.x0 >= 2 ? d.x1 - d.x0 - 2 : 0 })
                //     .attr("height", 23)
                titleLayer.selectAll("titles").data(root.descendants().filter(function(d) {
                        return d.depth === 1;
                    })).enter().append("text").attr('id', function(d, i) {
                        return 'titleText_' + i;
                    }).attr("x", function(d) {
                        return d.x0 + chartSize[size].margin.left;
                    }).attr("y", function(d) {
                        return d.y0 - chartSize[size].fontSize / 2;
                    }).text(function(d) {
                        var nShow = parseInt((d.x1 - d.x0 - chartSize[size].margin.left) / chartSize[size].fontSize * 1.5);
                        if (nShow <= 3) return '';
                        if (nShow >= d.data.name.length) return d.data.name;
                        else return d.data.name.substr(0, nShow - 3) + '...';
                    }).attr("font-size", chartSize[size].fontSize).attr("font-family", NUMFONT) // .attr("opacity", d => {
                    //     if (d.x1 - d.x0 < chartSize[size].maxTitleWidth)
                    //         return 0
                    //     else return 1
                    // })
                    .attr("transform", 'translate(0,' + chartSize[size].paddingTop + ')').append("title").text(function(d) {
                        return d.data.name;
                    }); // .attr('clip-path', (d, i) => 'url(#clip_' + i + ')')
            }
            var leaf = svg.append('g').attr('class', 'leaf-layer').selectAll("g").data(root.leaves()).join("g").attr("transform", function(d) {
                return 'translate(' + d.x0 + ',' + d.y0 + ')';
            });
            seriesName = Array.from(new Set(root.leaves().map(function(d) {
                return d.parent.data.name;
            })));
            leaf.append("rect").attr('class', 'leaf').attr('id', function(d, i) {
                return 'rect_' + i;
            }).attr("fill", function(d, i) {
                if (breakdown.length === 2) return 'white';
                if (d.depth === 2) {
                    d = d.parent;
                    return _color2.default.CATEGORICAL[seriesName.indexOf(d.data.name) % 10];
                }
                if (breakdown.length === 1) {
                    if (factData.length > 30) return _color2.default.DEFAULT;
                    else return _color2.default.CATEGORICAL[i % 10];
                } else return _color2.default.CATEGORICAL[i % 10];
            }).attr('opacity', function(d, i) {
                if (breakdown.length === 2) return 0.3;
                if (breakdown.length === 1) return d.value / maxValue;
                else return 1;
            }).attr("width", function(d) {
                return d.x1 - d.x0;
            }).attr("height", function(d) {
                return d.y1 - d.y0;
            });
            var format = d3.format(",d");
            leaf.append("title").text(function(d) { // if (d.depth === 2) return `${d.parent.data.name}\n${d.data.name}\n${format(d.value)}`
                // else 
                return d.data.name + '\n' + format(d.value);
            }); //         leaf.append("title")
            //   .text(d => `${d.ancestors().reverse().map(d => d.data.name).join("/")}\n${format(d.value)}`);
            leaf.append("clipPath").attr('id', function(d, i) {
                return 'clip_' + i;
            }).append('rect').attr("width", function(d) {
                return d.x1 - d.x0;
            }).attr('height', function(d) {
                return d.y1 - d.y0;
            });
            if (breakdown.length === 1) {
                leaf.append("text").attr('id', function(d, i) {
                        return 'label_' + i;
                    }).attr('class', 'labels').attr('fill', 'black') // .attr('fill', Color.TEXT)
                    // .style('mix-blend-mode', 'difference')
                    // .style('text-shadow', '0.1em 0.1em 0.1em #000000')
                    .attr("font-family", NUMFONT).attr('font-size', chartSize[size].fontSize).attr('clip-path', function(d, i) {
                        return 'url(#clip_' + i + ')';
                    }) // .selectAll("tspan")
                    // .data(d => [d.data.name[0], d.data.value])
                    // .enter()
                    // .append("tspan")
                    // .attr("x", chartSize[size].margin.left)
                    // .attr("dy", "1.1em")
                    // .text(d => {
                    //     return d
                    // })
                    .attr("x", chartSize[size].margin.left).attr("dy", "1.1em").text(function(d) {
                        var nShow = parseInt((d.x1 - d.x0 - chartSize[size].margin.left) / chartSize[size].fontSize * 1.5);
                        if (nShow <= 3) return '';
                        if (nShow >= d.data.name[0].length) return d.data.name[0];
                        else return d.data.name[0].substr(0, nShow - 3) + '...';
                    });
            } else {
                leaf.append("text").attr('id', function(d, i) {
                        return 'label_' + i;
                    }).attr('class', 'labels').attr('fill', 'black') // .attr('fill', Color.TEXT)
                    // .style('mix-blend-mode', 'difference')
                    // .style('text-shadow', '0.1em 0.1em 0.1em #000000')
                    .attr("font-family", NUMFONT).attr('font-size', chartSize[size].fontSize).attr('clip-path', function(d, i) {
                        return 'url(#clip_' + i + ')';
                    }) // .selectAll("tspan")
                    // .data(d => d.data.name)
                    // .enter()
                    // .append("tspan")
                    .attr("x", chartSize[size].margin.left).attr("dy", "1.1em").text(function(d) {
                        var nShow = parseInt((d.x1 - d.x0 - chartSize[size].margin.left) / chartSize[size].fontSize * 1.5);
                        if (nShow <= 3) return '';
                        if (nShow >= d.data.name[0].length) return d.data.name[0];
                        else return d.data.name[0].substr(0, nShow - 3) + '...';
                    });
            }
            leaf.selectAll(".labels").each(function(d) {
                var opacity = 1;
                var i = d3.select(this).node().id.split("_")[1]; // let textWdith = leaf.select('#label_' + i).node().getBBox().width
                // let textHeight = leaf.select('#label_' + i).node().getBBox().height
                var rectWidth = leaf.select('#rect_' + i).node().getBBox().width;
                var rectHeight = leaf.select('#rect_' + i).node().getBBox().height;
                if (rectWidth < chartSize[size].maxRectWidth) opacity = 0;
                if (rectHeight < chartSize[size].maxRectHeight) opacity = 0;
                d3.select(this).attr('opacity', opacity);
            });
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.26,
                    metaphorHeight = 1.25 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor6.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.21;
                    metaphorHeight = 1.25 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.24;
                    metaphorHeight = 1.25 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
            }
            return svg;
        }
    }, {
        key: 'displayProportion',
        value: function displayProportion() {
            var factData = this.factdata();
            var measure = this.measure();
            var breakdown = this.breakdown();
            var focus = this.focus();
            var size = this.size();
            var chartWidth = this.width();
            var chartHeight = this.height();
            var data = {
                name: "treemap",
                children: []
            };
            var sumValue = 0;
            var mesuredField = measure[0].aggregate === "count" ? "COUNT" : measure[0].field;
            factData.map(function(d) {
                sumValue += d[mesuredField];
                return sumValue;
            });
            for (var i = 0; i < factData.length; i++) {
                data.children.push({
                    name: factData[i][breakdown[0].field],
                    value: factData[i][mesuredField],
                    percentage: Math.round(factData[i][mesuredField] / sumValue * 100) + '%'
                });
            }
            var margin = {
                    top: 20 * chartHeight / 320,
                    right: 20 * chartWidth / 320,
                    bottom: 20 * chartHeight / 320,
                    left: 20 * chartWidth / 320
                },
                width = chartWidth - margin.left - margin.right,
                height = chartHeight - margin.top - margin.bottom;
            var svg = d3.select(this.container()).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            if (breakdown.length > 1) return svg; // let format = d3.format(",d")
            if (this.style() === _style2.default.COMICS) width = this.size() === _size2.default.WIDE ? 0.82 * width : 0.8 * width;
            var treemap = function treemap(data) {
                return d3.treemap() // .tile(tile)
                    .size([width, height]).padding(chartSize[size].padding).round(true)(d3.hierarchy(data).sum(function(d) {
                        return d.value;
                    }).sort(function(a, b) {
                        return b.value - a.value;
                    }));
            };
            var root = treemap(data);
            var leaf = svg.selectAll("g").attr('class', 'leaf').data(root.leaves()).join("g").attr('id', function(d, i) {
                return 'gtree' + i;
            }).attr("transform", function(d) {
                return 'translate(' + d.x0 + ',' + d.y0 + ')';
            });
            leaf.append("rect") // .attr('id', ({ index }) => 'rect_' + index)
                .attr("id", function(d, i) {
                    return 'rect_' + i;
                }).attr("fill", function(d, i) {
                    while (d.depth > 1) {
                        d = d.parent;
                    }
                    return _color2.default.CATEGORICAL[i % 10];
                }).attr("width", function(d) {
                    return d.x1 - d.x0;
                }).attr("height", function(d) {
                    return d.y1 - d.y0;
                }); // let format = d3.format(",d")
            leaf.append("title").text(function(d) {
                return d.data.name + '\n' + d.data.percentage;
            });
            leaf.append("clipPath").attr('id', function(d, i) {
                return 'clip_' + i;
            }).append('rect').attr("width", function(d) {
                return d.x1 - d.x0;
            }).attr('height', function(d) {
                return d.y1 - d.y0;
            });
            leaf.append("text").attr("class", "label-text").attr('id', function(d, i) {
                    return 'label_' + i;
                }).attr("x", chartSize[size].margin.left).attr("y", chartSize[size].margin.top) // .attr('fill', '#ffffff')
                // .style('text-shadow', '0.1em 0.1em 0.1em #000000')
                .attr("font-family", NUMFONT).attr('font-size', chartSize[size].fontSize).text(function(d) {
                    var nShow = parseInt((d.x1 - d.x0 - chartSize[size].margin.left) / chartSize[size].fontSize * 1.5);
                    if (nShow <= 3) return '';
                    if (nShow >= d.data.name.length) return d.data.name;
                    else return d.data.name.substr(0, nShow - 3) + '...';
                }).attr('clip-path', function(d, i) {
                    return 'url(#clip_' + i + ')';
                }).attr('opacity', function(d, i) {
                    var opacity = 1;
                    var rectWidth = leaf.select('#rect_' + i).node().getBBox().width;
                    var rectHeight = leaf.select('#rect_' + i).node().getBBox().height;
                    if (rectWidth < chartSize[size].maxRectWidth) opacity = 0;
                    if (rectHeight < chartSize[size].maxRectHeight * 2) opacity = 0;
                    return opacity; // let opacity = 1
                    // let textWdith = leaf.select('#label_' + i).node().getBBox().width
                    // let textHeight = leaf.select('#label_' + i).node().getBBox().height
                    // let rectWidth = leaf.select('#rect_' + i).node().getBBox().width
                    // let rectHeight = leaf.select('#rect_' + i).node().getBBox().height
                    // if (rectWidth < textWdith + chartSize[size].margin.left) opacity = 0
                    // if (rectHeight < textHeight * 2) opacity = 0
                    // return opacity
                });
            leaf.append("text").join("tspan").attr('id', function(d, i) {
                    return 'percentage_' + i;
                }).attr('class', "percentage-text").attr("x", chartSize[size].margin.left).attr("y", chartSize[size].margin.top + chartSize[size].fontSize + chartSize[size].margin.lineSpace) // .attr('fill', '#ffffff')
                // .style('text-shadow', '0.1em 0.1em 0.1em #000000')
                .attr("font-family", NUMFONT).attr('font-size', chartSize[size].fontSize).text(function(d) {
                    return d.data.percentage;
                }).attr('clip-path', function(d, i) {
                    return 'url(#clip_' + i + ')';
                }).attr('opacity', function(d, i) {
                    var opacity = 1;
                    var rectWidth = leaf.select('#rect_' + i).node().getBBox().width;
                    var rectHeight = leaf.select('#rect_' + i).node().getBBox().height;
                    if (rectWidth < chartSize[size].maxRectWidth) opacity = 0;
                    if (rectHeight < chartSize[size].maxRectHeight * 2) opacity = 0;
                    if (d3.select('#label_' + i).text().length === 0) opacity = 0;
                    return opacity; // let opacity = 1
                    // let textWdith = leaf.select('#label_' + i).node().getBBox().width
                    // let textHeight = leaf.select('#label_' + i).node().getBBox().height
                    // let rectWidth = leaf.select('#rect_' + i).node().getBBox().width
                    // let rectHeight = leaf.select('#rect_' + i).node().getBBox().height
                    // if (rectWidth < textWdith + chartSize[size].margin.left) opacity = 0
                    // if (rectHeight < textHeight * 2) opacity = 0
                    // return opacity
                });
            leaf.selectAll('rect') // set rest rects' opacity
                .attr('opacity', function(d) {
                    if (d.data.name === focus[0].value) return 1;
                    else return 0.3;
                }) // highlight focus
                .attr('stroke-width', function(d) {
                    if (d.data.name === focus[0].value) return chartSize[size].strokeWidth;
                    else return 0;
                }).attr('stroke', _color2.default.HIGHLIGHT);
            if (this.style() === _style2.default.COMICS) {
                var metaphorWidth = width * 0.26,
                    metaphorHeight = 1.31 * metaphorWidth;
                var metaphor = svg.append("image").attr('xlink:href', _metaphor4.default);
                if (this.size() === _size2.default.WIDE) {
                    metaphorWidth = width * 0.21;
                    metaphorHeight = 1.31 * metaphorWidth;
                } else if (this.size() === _size2.default.MIDDLE) {
                    metaphorWidth = width * 0.24;
                    metaphorHeight = 1.31 * metaphorWidth;
                }
                metaphor.attr("width", metaphorWidth).attr("height", metaphorHeight).attr("x", width + metaphorWidth * 0.06).attr("y", height - metaphorHeight * 0.96);
            }
            if (this.style() === _style2.default.PICTOGRAPH) {
                root.leaves().forEach(function(d, i) {
                    var pictype = d.data.name; //获取相应的icon名称
                    // pictype = 'BMW'; //测试用 - 定值'BMW'
                    /*------------------通过名称找寻icon----------------------------*/
                    svg.select('#gtree' + i).append("defs").append("g").attr("id", 'pictypetreepro' + pictype).append("path").attr("d", _pictogram2.default[pictype]); /*----------------计算缩放前的icon长宽------------------------*/
                    var typesizex1;
                    var typesizey1;
                    var iconRatio; //计算长宽比-防止缩放后出现sizex/sizey因为过小而变为0的情况
                    /*-------------根据chartsize的数据来进行icon的缩放--------------------------------*/
                    var scalex = void 0; // let scalexsize;
                    // let scaley;
                    // let scaleysize;
                    /*----------------计算缩放后的icon长宽------------------------*/
                    var typesizex = void 0;
                    var typesizey = void 0; // let typex;
                    //let typey;
                    var rectsizex = void 0;
                    var rectsizey = void 0; //let rectx;
                    //let recty;
                    svg.select('#gtree' + i).append("use").attr("fill", _color2.default.HIGHLIGHT) // .attr("fill-opacity", 0.5)
                        // .attr("stroke", Color.HIGHLIGHT)
                        // .attr("stroke-width", 0.5)
                        // .selectAll('.iconbubble')
                        // .data(GeoData.features)
                        // .enter()
                        // .filter(d => geoValues.indexOf(d.properties.enName) !== -1)
                        // .append("use")
                        .attr("xlink:href", '#pictypetreepro' + pictype).attr("class", "icontreetreepro").attr("id", "icontreetreepro" + i).attr("x", function() {
                            typesizex1 = svg.select('#icontreetreepro' + i).node().getBoundingClientRect().width;
                            typesizey1 = svg.select('#icontreetreepro' + i).node().getBoundingClientRect().height; // typex = svg.select(`#icontreetreepro${i}`).node().getBoundingClientRect().x;
                            // typey = svg.select(`#icontreetreepro${i}`).node().getBoundingClientRect().y;
                            iconRatio = typesizey1 === 0 ? 0 : typesizex1 / typesizey1; /*-------------根据chartsize的数据来进行icon的缩放--------------------------------*/ // let scalex;
                            // scalex= typesizex1 === 0? 0:30/(typesizex1>typesizey1?typesizex1:typesizey1);
                            // if(this.size() ==='large') scalex= typesizex1 === 0?0:30/(typesizex1>typesizey1?typesizex1:typesizey1);
                            // svg.select(`#icontreetreepro${i}`)
                            // .attr("transform", function(){      
                            //     return  `scale(${scalex}) `                       
                            // });
                            // scaley = scalex;
                            // /*----------------获取缩放后的icon长宽------------------------*/
                            // typesizex=svg.select(`#icontreetreepro${i}`).node().getBoundingClientRect().width;
                            // typesizey=svg.select(`#icontree${i}`).node().getBoundingClientRect().height;
                            // typesizey = typesizex===0?0:typesizex/iconRatio;
                            // typex= svg.select(`#icontreetreepro${i}`).node().getBBox().x;
                            // typey=svg.select(`#icontreetreepro${i}`).node().getBBox().y;
                            /*----------------获取treemapmeig矩形区域的位置------------------------*/
                            rectsizex = svg.select('#rect_' + i).node().getBoundingClientRect().width;
                            rectsizey = svg.select('#rect_' + i).node().getBoundingClientRect().height;
                            if (iconRatio === 0) scalex = 0;
                            else scalex = rectsizex > rectsizey ? rectsizey * 4 / 5 / (typesizey1 > typesizex1 ? typesizey1 : typesizex1) : rectsizex * 4 / 5 / (typesizey1 > typesizex1 ? typesizey1 : typesizex1); //scalex=rectsizex*rectsizey/(typesizex1*typesizey1)
                            // rectx= svg.select(`#rect_${i}`).node().getBBox().x;
                            //recty=svg.select(`#rect_${i}`).node().getBBox().y;
                            svg.select('#icontreetreepro' + i).attr("transform", function() {
                                return 'scale(' + scalex + ') ';
                            }); /*----------------获取缩放后的icon长宽------------------------*/
                            typesizex = svg.select('#icontreetreepro' + i).node().getBoundingClientRect().width;
                            typesizey = svg.select('#icontreetreepro' + i).node().getBoundingClientRect().height;
                            typesizey = typesizex === 0 ? 0 : typesizex / iconRatio; //typex= svg.select(`#icontreetreepro${i}`).node().getBBox().x;
                            //typey=svg.select(`#icontreetreepro${i}`).node().getBBox().y;
                            return typesizex === 0 ? 0 : 1 / 2 * rectsizex / scalex - typesizex / 2 / scalex;
                        }).attr("y", function() { // let countryName = geoValues[geoValues.indexOf(d.properties.enName)]
                            // let value;
                            // factdata.map(data => {
                            //     if (data[breakdown[0].field] === countryName) {
                            //         value = data[measuredField];
                            //     }
                            //     return data;
                            // })
                            // typesizex1=svg.select(`#icontree${i}`).node().getBoundingClientRect().width;
                            // typesizey1=svg.select(`#icontree${i}`).node().getBoundingClientRect().height;
                            // iconRatio = typesizex1/typesizey1;
                            // /*-------------根据chartsize的数据来进行icon的缩放--------------------------------*/
                            // // let scalex;
                            // scalexsize= 2*40/(typesizex1>typesizey1?typesizex1:typesizey1);
                            // console.log('typesizex1-x',typesizex1)
                            // if(this.size() ==='large') scalexsize= 2*40/(typesizex1>typesizey1?typesizex1:typesizey1);
                            // svg.select(`#iconbubble${i}`)
                            // .attr("transform", function(){                
                            //     // scalex= scalexsize /(typesizex1>typesizey1?typesizex1:typesizey1);
                            //     return  `scale(${scalexsize}) `                       
                            // });
                            // scaley = scalex;
                            /*----------------获取缩放后的icon长宽------------------------*/
                            typesizex = svg.select('#icontreetreepro' + i).node().getBoundingClientRect().width; // typesizey=svg.select(`#icontree${i}`).node().getBoundingClientRect().height;
                            typesizey = typesizex === 0 ? 0 : typesizex / iconRatio; //  typex= svg.select(`#icontreetreepro${i}`).node().getBBox().x;
                            // typey=svg.select(`#icontreetreepro${i}`).node().getBBox().y;
                            /*----------------获取treemapmeig矩形区域的位置------------------------*/
                            rectsizex = svg.select('#rect_' + i).node().getBoundingClientRect().width;
                            rectsizey = svg.select('#rect_' + i).node().getBoundingClientRect().height; // typesizey = typesizex/iconRatio;
                            //rectx= svg.select(`#rect_${i}`).node().getBBox().x;
                            // recty=svg.select(`#rect_${i}`).node().getBBox().y;
                            return typesizey === 0 ? 0 : 1 / 2 * rectsizey / scalex - typesizey / 2 / scalex;
                        }); // .attr("opacity",(d,i) => {
                    //     return d.properties.enName === subspace[0].value? 1: 0;
                    // });
                }); // leaf.append("rect")
                // // .attr('id', ({ index }) => 'rect_' + index)
                // .attr("id", (d, i) => 'rect_' + i)
                // .attr("fill", (d, i) => { while (d.depth > 1) d = d.parent; return Color.CATEGORICAL[i % 10]; })
                // .attr("width", d => d.x1 - d.x0)
                // .attr("height", d => d.y1 - d.y0)
            }
            return svg;
        }
    }, {
        key: 'animateCategorization',
        value: function animateCategorization() {
            var svg = this.displayCategorization();
            if (!svg) return;
            var duration = this.duration();
            var leafNodes = svg.selectAll('.leaf').nodes();
            var rectNum = leafNodes.length;
            var i = 0;
            svg.select('.leaf-layer').selectAll('rect').attr("fill-opacity", 0);
            svg.select('.leaf-layer').selectAll('text').attr("fill-opacity", 0);
            var interval = setInterval(function() {
                svg.selectAll('#rect_' + i) // .attr("fill-opacity", 0)
                    // .transition()
                    // .duration(duration)
                    .attr("fill-opacity", 1);
                svg.selectAll('#label_' + i) // .attr("fill-opacity", 0)
                    // .transition()
                    // .duration(duration)
                    .attr("fill-opacity", 1);
                i++;
                if (i === rectNum) {
                    clearInterval(interval);
                }
            }, duration / rectNum); // breakdown === 2
            if (this.breakdown().length === 2) {
                var titleLayerNodes = svg.selectAll('.title-layer').selectAll('rect').nodes();
                var titleLayerNum = titleLayerNodes.length;
                svg.select('.title-layer').selectAll('rect').attr("fill-opacity", 0);
                svg.select('.title-layer').selectAll('text').attr("fill-opacity", 0);
                var j = 0;
                var interval2 = setInterval(function() {
                    svg.selectAll('#titleRect_' + j).attr("fill-opacity", 0).transition().duration(duration).attr("fill-opacity", 1);
                    svg.selectAll('#titleText_' + j).attr("fill-opacity", 0).transition().duration(duration).attr("fill-opacity", 1);
                    j++;
                    if (j === titleLayerNum) {
                        clearInterval(interval2);
                    }
                }, duration / titleLayerNum);
            }
        }
    }, {
        key: 'animateDistribution',
        value: function animateDistribution() {
            var svg = this.displayDistribution();
            if (!svg) return;
            var duration = this.duration(); // let leafNodes = svg.selectAll('.leaf').nodes()
            // let rectNum = leafNodes.length
            // let i = 0
            svg.select('.leaf-layer').selectAll('rect').attr("fill-opacity", 0);
            svg.select('.leaf-layer').selectAll('text').attr("fill-opacity", 0);
            svg.selectAll('rect').transition().duration(duration).attr("fill-opacity", 1);
            svg.selectAll('text').transition().duration(duration).attr("fill-opacity", 1); // let interval = setInterval(function () {
            //     svg.selectAll('#rect_' + i)
            //         .attr("fill-opacity", 0)
            //         .transition()
            //         .duration(duration)
            //         .attr("fill-opacity", 1);
            //     svg.selectAll('#label_' + i)
            //         .attr("fill-opacity", 0)
            //         .transition()
            //         .duration(duration)
            //         .attr("fill-opacity", 1);
            //     i++;
            //     if (i === rectNum) {
            //         clearInterval(interval);
            //     }
            // }, duration / rectNum);
            // breakdown === 2
            if (this.breakdown().length === 2) { // let titleLayerNodes = svg.selectAll('.title-layer').selectAll('rect').nodes()
                // let titleLayerNum = titleLayerNodes.length
                svg.select('.title-layer').selectAll('rect').attr("fill-opacity", 0);
                svg.select('.title-layer').selectAll('text').attr("fill-opacity", 0); // let j = 0
                svg.selectAll('rect').transition().duration(duration).attr("fill-opacity", 1);
                svg.selectAll('text').transition().duration(duration).attr("fill-opacity", 1); // let interval2 = setInterval(function () {
                //     svg.selectAll('#titleRect_' + j)
                //         .attr("fill-opacity", 0)
                //         .transition()
                //         .duration(duration)
                //         .attr("fill-opacity", 1);
                //     svg.selectAll('#titleText_' + j)
                //         .attr("fill-opacity", 0)
                //         .transition()
                //         .duration(duration)
                //         .attr("fill-opacity", 1);
                //     j++;
                //     if (j === titleLayerNum) {
                //         clearInterval(interval2);
                //     }
                // }, duration / titleLayerNum);
            }
        }
    }, {
        key: 'animateProportion',
        value: function animateProportion() {
            var svg = this.displayProportion();
            if (!svg) return;
            var duration = this.duration();
            var focus = this.focus(); // let size = this.size();
            // svg.selectAll('rect').attr('opacity', 1).attr('stroke-width', 0)
            svg.selectAll('rect').attr('fill', _color2.default.DEFAULT).attr('opacity', 0).attr('stroke-width', 0);
            svg.selectAll('.label-text').attr('opacity', 0).attr('font-size', 32).attr('font-weight', 800).attr('y', 32).attr('x', 12);
            svg.selectAll('.percentage-text').attr('opacity', 0).attr('font-size', 32).attr('font-weight', 800).attr('y', 64).attr('x', 12); // svg.selectAll('rect').attr('opacity', 0).attr('stroke-width', 0)
            // svg.selectAll('text').attr('opacity', 0)
            svg.selectAll('rect').transition().duration(duration / 3).attr('opacity', 1); // svg.selectAll('.label-text')
            //     .transition()
            //     .duration(duration / 2)
            //     .attr('opacity', 1)
            setTimeout(function() {
                svg.selectAll('.label-text').transition().duration(duration / 3).attr('opacity', function(d) {
                    if (d.data.name === focus[0].value) return 1;
                    else return 0;
                });
            }, duration / 3);
            setTimeout(function() {
                svg.selectAll('rect').transition().duration(duration / 3).attr('fill', function(d) {
                    if (d.data.name === focus[0].value) return _color2.default.HIGHLIGHT;
                    else return _color2.default.DEFAULT;
                });
                svg.selectAll('.percentage-text').transition().duration(duration / 3).attr('opacity', function(d) {
                    if (d.data.name === focus[0].value) return 1;
                    else return 0;
                });
            }, duration / 3 * 2);
        }
    }]);
    return TreeMap;
}(_chart2.default);
exports.default = TreeMap;