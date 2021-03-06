(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSparklines"] = factory(require("react"));
	else
		root["ReactSparklines"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].e;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			e: {},
/******/ 			i: moduleId,
/******/ 			l: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.e, module, module.e, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.e;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	module.e = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DataProcessor = function () {
	    function DataProcessor() {
	        _classCallCheck(this, DataProcessor);
	    }

	    _createClass(DataProcessor, null, [{
	        key: "dataToPoints",
	        value: function dataToPoints(data, limit) {
	            var width = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	            var height = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];
	            var margin = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

	            var _this = this;

	            var max = arguments.length <= 5 || arguments[5] === undefined ? this.max(data) : arguments[5];
	            var min = arguments.length <= 6 || arguments[6] === undefined ? this.min(data) : arguments[6];


	            var len = data.length;

	            if (limit && limit < len) {
	                data = data.slice(len - limit);
	            }

	            var vfactor = (height - margin * 2) / (max - min || 2);
	            var hfactor = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0));

	            return data.map(function (d, i) {
	                return {
	                    x: i * hfactor + margin,
	                    y: _this.isGapValue(d) ? d : (max === min ? 1 : max - d) * vfactor + margin
	                };
	            });
	        }
	    }, {
	        key: "nonGapValues",
	        value: function nonGapValues(data) {
	            var _this2 = this;

	            return data.filter(function (d) {
	                return !_this2.isGapValue(d);
	            });
	        }
	    }, {
	        key: "max",
	        value: function max(data) {
	            return Math.max.apply(Math, this.nonGapValues(data));
	        }
	    }, {
	        key: "min",
	        value: function min(data) {
	            return Math.min.apply(Math, this.nonGapValues(data));
	        }
	    }, {
	        key: "mean",
	        value: function mean(data) {
	            data = this.nonGapValues(data);
	            return (this.max(data) - this.min(data)) / 2;
	        }
	    }, {
	        key: "avg",
	        value: function avg(data) {
	            data = this.nonGapValues(data);
	            return data.reduce(function (a, b) {
	                return a + b;
	            }) / data.length;
	        }
	    }, {
	        key: "median",
	        value: function median(data) {
	            data = this.nonGapValues(data);
	            return data.sort(function (a, b) {
	                return a - b;
	            })[Math.floor(data.length / 2)];
	        }
	    }, {
	        key: "variance",
	        value: function variance(data) {
	            data = this.nonGapValues(data);
	            var mean = this.mean(data);
	            var sq = data.map(function (n) {
	                return Math.pow(n - mean, 2);
	            });
	            return this.mean(sq);
	        }
	    }, {
	        key: "stdev",
	        value: function stdev(data) {
	            data = this.nonGapValues(data);
	            var mean = this.mean(data);
	            var sqDiff = data.map(function (n) {
	                return Math.pow(n - mean, 2);
	            });
	            var avgSqDiff = this.avg(sqDiff);
	            return Math.sqrt(avgSqDiff);
	        }
	    }, {
	        key: "calculateFromData",
	        value: function calculateFromData(data, calculationType) {
	            return this[calculationType].call(this, data);
	        }
	    }, {
	        key: "pointsToSegments",
	        value: function pointsToSegments(points) {
	            var segment = void 0,
	                segments = [];
	            var newSegment = function newSegment(isGap) {
	                return { points: [], isGap: isGap };
	            };
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = points[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var point = _step.value;

	                    if (!segment) segment = newSegment(false);
	                    var isGapHere = this.isGapValue(point.y);
	                    if (segment.isGap != isGapHere) {
	                        if (segment.points.length) segments.push(segment);
	                        segment = newSegment(isGapHere);
	                    }
	                    segment.points.push(point);
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

	            if (segment && segment.points.length) segments.push(segment);
	            return segments;
	        }
	    }, {
	        key: "isGapValue",
	        value: function isGapValue(y) {
	            return !Number.isFinite(y);
	        }
	    }]);

	    return DataProcessor;
	}();

	exports.default = DataProcessor;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _DataProcessor = __webpack_require__(1);

	var _DataProcessor2 = _interopRequireDefault(_DataProcessor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SparklinesSegmentContainer = function (_React$Component) {
	    _inherits(SparklinesSegmentContainer, _React$Component);

	    function SparklinesSegmentContainer() {
	        _classCallCheck(this, SparklinesSegmentContainer);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesSegmentContainer).apply(this, arguments));
	    }

	    _createClass(SparklinesSegmentContainer, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var points = _props.points;
	            var children = _props.children;

	            var props = _objectWithoutProperties(_props, ['points', 'children']);

	            var groups = _DataProcessor2.default.pointsToSegments(points).filter(function (segment) {
	                return !segment.isGap;
	            }).map(function (segment, i) {
	                return _react2.default.cloneElement(_react2.default.Children.only(children), _extends({
	                    key: i,
	                    points: segment.points
	                }, props));
	            });
	            if (groups.length === 1) return groups[0];
	            return _react2.default.createElement(
	                'g',
	                null,
	                groups
	            );
	        }
	    }]);

	    return SparklinesSegmentContainer;
	}(_react2.default.Component);

	exports.default = SparklinesSegmentContainer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var lineStyle = exports.lineStyle = {
	    stroke: 'slategray',
	    strokeWidth: '1',
	    strokeLinejoin: 'round',
	    strokeLinecap: 'round',
	    fill: 'none'
	};

	var fillStyle = exports.fillStyle = {
	    stroke: 'none',
	    strokeWidth: '0',
	    fillOpacity: '.1',
	    fill: 'slategray'
	};

	var getLineStyle = exports.getLineStyle = function getLineStyle(_ref) {
	    var color = _ref.color;
	    var style = _ref.style;

	    var defaultStyle = lineStyle;
	    style = style || {};

	    return {
	        stroke: color || style.stroke || defaultStyle.stroke,
	        strokeWidth: style.strokeWidth || defaultStyle.strokeWidth,
	        strokeLinejoin: style.strokeLinejoin || defaultStyle.strokeLinejoin,
	        strokeLinecap: style.strokeLinecap || defaultStyle.strokeLinecap,
	        fill: defaultStyle.fill
	    };
	};

	var getFillStyle = exports.getFillStyle = function getFillStyle(_ref2) {
	    var color = _ref2.color;
	    var style = _ref2.style;

	    var defaultStyle = fillStyle;
	    style = style || {};

	    return {
	        stroke: style.stroke || defaultStyle.stroke,
	        strokeWidth: defaultStyle.strokeWidth,
	        fillOpacity: style.fillOpacity || defaultStyle.fillOpacity,
	        fill: style.fill || color || defaultStyle.fill
	    };
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.e = __webpack_require__(5);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DataProcessor = exports.SparklinesNormalBand = exports.SparklinesReferenceLine = exports.SparklinesSpots = exports.SparklinesBars = exports.SparklinesCurve = exports.SparklinesLine = exports.Sparklines = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _SparklinesLine = __webpack_require__(8);

	var _SparklinesLine2 = _interopRequireDefault(_SparklinesLine);

	var _SparklinesCurve = __webpack_require__(7);

	var _SparklinesCurve2 = _interopRequireDefault(_SparklinesCurve);

	var _SparklinesBars = __webpack_require__(6);

	var _SparklinesBars2 = _interopRequireDefault(_SparklinesBars);

	var _SparklinesSpots = __webpack_require__(11);

	var _SparklinesSpots2 = _interopRequireDefault(_SparklinesSpots);

	var _SparklinesReferenceLine = __webpack_require__(10);

	var _SparklinesReferenceLine2 = _interopRequireDefault(_SparklinesReferenceLine);

	var _SparklinesNormalBand = __webpack_require__(9);

	var _SparklinesNormalBand2 = _interopRequireDefault(_SparklinesNormalBand);

	var _DataProcessor = __webpack_require__(1);

	var _DataProcessor2 = _interopRequireDefault(_DataProcessor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Sparklines = function (_React$Component) {
	    _inherits(Sparklines, _React$Component);

	    function Sparklines(props) {
	        _classCallCheck(this, Sparklines);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Sparklines).call(this, props));
	    }

	    _createClass(Sparklines, [{
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps) {
	            var _this2 = this;

	            return nextProps.width != this.props.width || nextProps.height != this.props.height || nextProps.svgWidth != this.props.svgWidth || nextProps.svgHeight != this.props.svgHeight || nextProps.preserveAspectRatio != this.props.preserveAspectRatio || nextProps.margin != this.props.margin || nextProps.min != this.props.min || nextProps.max != this.props.max || nextProps.limit != this.props.limit || nextProps.data.length != this.props.data.length || nextProps.data.some(function (d, i) {
	                return !Object.is(d, _this2.props.data[i]);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var data = _props.data;
	            var limit = _props.limit;
	            var width = _props.width;
	            var height = _props.height;
	            var svgWidth = _props.svgWidth;
	            var svgHeight = _props.svgHeight;
	            var preserveAspectRatio = _props.preserveAspectRatio;
	            var margin = _props.margin;
	            var style = _props.style;
	            var max = _props.max;
	            var min = _props.min;


	            if (data.length === 0) return null;

	            var points = _DataProcessor2.default.dataToPoints(data, limit, width, height, margin, max, min);

	            var svgOpts = { style: style, viewBox: '0 0 ' + width + ' ' + height, preserveAspectRatio: preserveAspectRatio };
	            if (svgWidth > 0) svgOpts.width = svgWidth;
	            if (svgHeight > 0) svgOpts.height = svgHeight;

	            return _react2.default.createElement(
	                'svg',
	                svgOpts,
	                _react2.default.Children.map(this.props.children, function (child) {
	                    return _react2.default.cloneElement(child, { points: points, width: width, height: height, margin: margin });
	                })
	            );
	        }
	    }]);

	    return Sparklines;
	}(_react2.default.Component);

	Sparklines.propTypes = {
	    data: _react2.default.PropTypes.array,
	    limit: _react2.default.PropTypes.number,
	    width: _react2.default.PropTypes.number,
	    height: _react2.default.PropTypes.number,
	    svgWidth: _react2.default.PropTypes.number,
	    svgHeight: _react2.default.PropTypes.number,
	    preserveAspectRatio: _react2.default.PropTypes.string,
	    margin: _react2.default.PropTypes.number,
	    style: _react2.default.PropTypes.object,
	    min: _react2.default.PropTypes.number,
	    max: _react2.default.PropTypes.number
	};
	Sparklines.defaultProps = {
	    data: [],
	    width: 240,
	    height: 60,
	    //Scale the graphic content of the given element non-uniformly if necessary such that the element's bounding box exactly matches the viewport rectangle.
	    preserveAspectRatio: 'none', //https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
	    margin: 2
	};
	exports.Sparklines = Sparklines;
	exports.SparklinesLine = _SparklinesLine2.default;
	exports.SparklinesCurve = _SparklinesCurve2.default;
	exports.SparklinesBars = _SparklinesBars2.default;
	exports.SparklinesSpots = _SparklinesSpots2.default;
	exports.SparklinesReferenceLine = _SparklinesReferenceLine2.default;
	exports.SparklinesNormalBand = _SparklinesNormalBand2.default;
	exports.DataProcessor = _DataProcessor2.default;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _DataProcessor = __webpack_require__(1);

	var _DataProcessor2 = _interopRequireDefault(_DataProcessor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SparklinesBars = function (_React$Component) {
	    _inherits(SparklinesBars, _React$Component);

	    function SparklinesBars() {
	        _classCallCheck(this, SparklinesBars);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesBars).apply(this, arguments));
	    }

	    _createClass(SparklinesBars, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var points = _props.points;
	            var height = _props.height;
	            var style = _props.style;
	            var barWidth = _props.barWidth;

	            var strokeWidth = 1 * (style && style.strokeWidth || 0);
	            var width = barWidth || (points && points.length >= 2 ? Math.ceil(Math.max(0, points[1].x - points[0].x - strokeWidth)) : 0);

	            return _react2.default.createElement(
	                'g',
	                null,
	                points.map(function (p, i) {
	                    return _DataProcessor2.default.isGapValue(p.y) ? null : _react2.default.createElement('rect', {
	                        key: i,
	                        x: Math.ceil(p.x - strokeWidth * i),
	                        y: Math.ceil(p.y),
	                        width: Math.ceil(width),
	                        height: Math.ceil(Math.max(0, height - p.y)),
	                        style: style });
	                })
	            );
	        }
	    }]);

	    return SparklinesBars;
	}(_react2.default.Component);

	SparklinesBars.propTypes = {
	    points: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
	    height: _react2.default.PropTypes.number,
	    style: _react2.default.PropTypes.object,
	    barWidth: _react2.default.PropTypes.number
	};
	SparklinesBars.defaultProps = {
	    style: { fill: 'slategray' }
	};
	exports.default = SparklinesBars;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _defaults = __webpack_require__(3);

	var defaults = _interopRequireWildcard(_defaults);

	var _SparklinesSegmentContainer = __webpack_require__(2);

	var _SparklinesSegmentContainer2 = _interopRequireDefault(_SparklinesSegmentContainer);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function SparklinesCurveSegment(_ref) {
	    var points = _ref.points;
	    var width = _ref.width;
	    var height = _ref.height;
	    var margin = _ref.margin;
	    var color = _ref.color;
	    var style = _ref.style;
	    var _ref$divisor = _ref.divisor;
	    var divisor = _ref$divisor === undefined ? 0.25 : _ref$divisor;

	    var prev = void 0;
	    var curve = function curve(p) {
	        var res = void 0;
	        if (!prev) {
	            res = [p.x, p.y];
	        } else {
	            var len = (p.x - prev.x) * divisor;
	            res = ["C",
	            //x1
	            prev.x + len,
	            //y1
	            prev.y,
	            //x2,
	            p.x - len,
	            //y2,
	            p.y,
	            //x,
	            p.x,
	            //y
	            p.y];
	        }
	        prev = p;
	        return res;
	    };
	    var linePoints = points.map(function (p) {
	        return curve(p);
	    }).reduce(function (a, b) {
	        return a.concat(b);
	    });
	    var closePolyPoints = ["L" + points[points.length - 1].x, height - margin, points[0].x, height - margin, points[0].x, points[0].y];
	    var fillPoints = linePoints.concat(closePolyPoints);

	    var lineStyle = defaults.getLineStyle({ color: color, style: style });

	    var fillStyle = defaults.getFillStyle({ color: color, style: style });

	    return _react2.default.createElement(
	        'g',
	        null,
	        _react2.default.createElement('path', { d: "M" + fillPoints.join(' '), style: fillStyle }),
	        _react2.default.createElement('path', { d: "M" + linePoints.join(' '), style: lineStyle })
	    );
	}

	var SparklinesCurve = function (_React$Component) {
	    _inherits(SparklinesCurve, _React$Component);

	    function SparklinesCurve() {
	        _classCallCheck(this, SparklinesCurve);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesCurve).apply(this, arguments));
	    }

	    _createClass(SparklinesCurve, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                _SparklinesSegmentContainer2.default,
	                this.props,
	                _react2.default.createElement(SparklinesCurveSegment, null)
	            );
	        }
	    }]);

	    return SparklinesCurve;
	}(_react2.default.Component);

	SparklinesCurve.propTypes = {
	    color: _react2.default.PropTypes.string,
	    style: _react2.default.PropTypes.object
	};
	SparklinesCurve.defaultProps = {
	    style: {}
	};
	exports.default = SparklinesCurve;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _defaults = __webpack_require__(3);

	var defaults = _interopRequireWildcard(_defaults);

	var _SparklinesSegmentContainer = __webpack_require__(2);

	var _SparklinesSegmentContainer2 = _interopRequireDefault(_SparklinesSegmentContainer);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function SparklinesLineSegment(_ref) {
	    var points = _ref.points;
	    var width = _ref.width;
	    var height = _ref.height;
	    var margin = _ref.margin;
	    var color = _ref.color;
	    var style = _ref.style;

	    if (!style) style = {};

	    var linePoints = points.map(function (p) {
	        return [p.x, p.y];
	    }).reduce(function (a, b) {
	        return a.concat(b);
	    });
	    var closePolyPoints = [points[points.length - 1].x, height - margin, points[0].x, height - margin, points[0].x, points[0].y];
	    var fillPoints = linePoints.concat(closePolyPoints);

	    var lineStyle = defaults.getLineStyle({ color: color, style: style });

	    var fillStyle = defaults.getFillStyle({ color: color, style: style });

	    return _react2.default.createElement(
	        'g',
	        null,
	        _react2.default.createElement('polyline', { points: fillPoints.join(' '), style: fillStyle }),
	        _react2.default.createElement('polyline', { points: linePoints.join(' '), style: lineStyle })
	    );
	}

	var SparklinesLine = function (_React$Component) {
	    _inherits(SparklinesLine, _React$Component);

	    function SparklinesLine() {
	        _classCallCheck(this, SparklinesLine);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesLine).apply(this, arguments));
	    }

	    _createClass(SparklinesLine, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                _SparklinesSegmentContainer2.default,
	                this.props,
	                _react2.default.createElement(SparklinesLineSegment, null)
	            );
	        }
	    }]);

	    return SparklinesLine;
	}(_react2.default.Component);

	SparklinesLine.propTypes = {
	    color: _react2.default.PropTypes.string,
	    style: _react2.default.PropTypes.object
	};
	SparklinesLine.defaultProps = {
	    style: {}
	};
	exports.default = SparklinesLine;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _DataProcessor = __webpack_require__(1);

	var _DataProcessor2 = _interopRequireDefault(_DataProcessor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SparklinesNormalBand = function (_React$Component) {
	    _inherits(SparklinesNormalBand, _React$Component);

	    function SparklinesNormalBand() {
	        _classCallCheck(this, SparklinesNormalBand);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesNormalBand).apply(this, arguments));
	    }

	    _createClass(SparklinesNormalBand, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var points = _props.points;
	            var margin = _props.margin;
	            var style = _props.style;


	            var ypoints = points.map(function (p) {
	                return p.y;
	            });
	            var mean = _DataProcessor2.default.calculateFromData(ypoints, 'mean');
	            var stdev = _DataProcessor2.default.calculateFromData(ypoints, 'stdev');

	            return _react2.default.createElement('rect', { x: points[0].x, y: mean - stdev + margin,
	                width: points[points.length - 1].x - points[0].x, height: stdev * 2,
	                style: style });
	        }
	    }]);

	    return SparklinesNormalBand;
	}(_react2.default.Component);

	SparklinesNormalBand.propTypes = {
	    style: _react2.default.PropTypes.object
	};
	SparklinesNormalBand.defaultProps = {
	    style: { fill: 'red', fillOpacity: .1 }
	};
	exports.default = SparklinesNormalBand;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	var _DataProcessor = __webpack_require__(1);

	var _DataProcessor2 = _interopRequireDefault(_DataProcessor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SparklinesReferenceLine = function (_React$Component) {
	    _inherits(SparklinesReferenceLine, _React$Component);

	    function SparklinesReferenceLine() {
	        _classCallCheck(this, SparklinesReferenceLine);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesReferenceLine).apply(this, arguments));
	    }

	    _createClass(SparklinesReferenceLine, [{
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var points = _props.points;
	            var margin = _props.margin;
	            var type = _props.type;
	            var style = _props.style;
	            var value = _props.value;


	            var ypoints = points.map(function (p) {
	                return p.y;
	            });
	            var y = type == 'custom' ? value : _DataProcessor2.default.calculateFromData(ypoints, type);

	            return _react2.default.createElement('line', {
	                x1: points[0].x, y1: y + margin,
	                x2: points[points.length - 1].x, y2: y + margin,
	                style: style });
	        }
	    }]);

	    return SparklinesReferenceLine;
	}(_react2.default.Component);

	SparklinesReferenceLine.propTypes = {
	    type: _react2.default.PropTypes.oneOf(['max', 'min', 'mean', 'avg', 'median', 'custom']),
	    value: _react2.default.PropTypes.number,
	    style: _react2.default.PropTypes.object
	};
	SparklinesReferenceLine.defaultProps = {
	    type: 'mean',
	    style: { stroke: 'red', strokeOpacity: .75, strokeDasharray: '2, 2' }
	};
	exports.default = SparklinesReferenceLine;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(0);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SparklinesSpots = function (_React$Component) {
	    _inherits(SparklinesSpots, _React$Component);

	    function SparklinesSpots() {
	        _classCallCheck(this, SparklinesSpots);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesSpots).apply(this, arguments));
	    }

	    _createClass(SparklinesSpots, [{
	        key: 'lastDirection',
	        value: function lastDirection(points) {

	            Math.sign = Math.sign || function (x) {
	                return x > 0 ? 1 : -1;
	            };

	            return points.length < 2 ? 0 : Math.sign(points[points.length - 2].y - points[points.length - 1].y);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _props = this.props;
	            var points = _props.points;
	            var width = _props.width;
	            var height = _props.height;
	            var size = _props.size;
	            var style = _props.style;
	            var spotColors = _props.spotColors;


	            var startSpot = _react2.default.createElement('circle', {
	                cx: points[0].x,
	                cy: points[0].y,
	                r: size,
	                style: style });

	            var endSpot = _react2.default.createElement('circle', {
	                cx: points[points.length - 1].x,
	                cy: points[points.length - 1].y,
	                r: size,
	                style: style || { fill: spotColors[this.lastDirection(points)] } });

	            return _react2.default.createElement(
	                'g',
	                null,
	                style && startSpot,
	                endSpot
	            );
	        }
	    }]);

	    return SparklinesSpots;
	}(_react2.default.Component);

	SparklinesSpots.propTypes = {
	    size: _react2.default.PropTypes.number,
	    style: _react2.default.PropTypes.object,
	    spotColors: _react2.default.PropTypes.object
	};
	SparklinesSpots.defaultProps = {
	    size: 2,
	    spotColors: {
	        '-1': 'red',
	        '0': 'black',
	        '1': 'green'
	    }
	};
	exports.default = SparklinesSpots;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.e = __webpack_require__(4);


/***/ }
/******/ ])
});
;