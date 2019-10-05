/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var lib_1 = __webpack_require__(/*! ./lib */ "./lib/index.ts");
var mount_1 = __webpack_require__(/*! ./lib/mount */ "./lib/mount.ts");
var testData = {
    name: "Mattias Martens",
    ticker: 0,
    ideas: [
        {
            name: "A bowling ball that shoots lasers",
            conceiveDate: new Date(new Date().valueOf() - 1000 * 1000 * 1000),
            isLikeable: false,
            doYouLikeMyIdea: null
        },
        {
            name: "A remake of Much Ado About Nothing where Benedick dies",
            conceiveDate: new Date(new Date().valueOf() - 8000 * 1000 * 1000),
            isLikeable: true,
            doYouLikeMyIdea: null
        }
    ]
};
var mutator = lib_1.Mutator(testData, {
    tick: function (testData) {
        testData.ticker++;
        return testData;
    }
});
setInterval(mutator.tick, 4000);
var testComponent = function (_a) {
    var name = _a.name, ticker = _a.ticker;
    return lib_1.r(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<p>My name is ", " #", "</p><ul>", "</ul>"], ["<p>My name is ", " #", "</p><ul>",
        "</ul>"])), name, ticker, lib_1.i({
        refiner: function (_a) {
            var ideas = _a.ideas;
            return ({ ideas: ideas });
        },
        iterable: function (_a) {
            var ideas = _a.ideas;
            return ideas;
        },
        transformer: function (_a) {
            var iterated = _a.iterated;
            return iterated.current;
        },
        component: function (_a) {
            var name = _a.name;
            return lib_1.r(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<li>", "</li>"], ["<li>", "</li>"])), name);
        }
    }));
};
var _a = lib_1.makeRenderer(testComponent, testData, console.log), domTree = _a.domTree, cleanup = _a.cleanup;
mount_1.mount(domTree, "#app");
var templateObject_1, templateObject_2;


/***/ }),

/***/ "./lib/component.ts":
/*!**************************!*\
  !*** ./lib/component.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function identity(t) {
    return t;
}
exports.identity = identity;


/***/ }),

/***/ "./lib/fragment.ts":
/*!*************************!*\
  !*** ./lib/fragment.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var provide_1 = __webpack_require__(/*! ./provide */ "./lib/provide.ts");
function IterableFragment(_a) {
    var _b;
    var refiner = _a.refiner, transformer = _a.transformer, component = _a.component, iterable = _a.iterable;
    var val = (_b = {
            refiner: refiner,
            transformer: transformer,
            component: component,
            iterable: iterable
        },
        _b[provide_1.rancorTag] = "iterable",
        _b);
    return val;
}
exports.IterableFragment = IterableFragment;
exports.i = IterableFragment;
function ChildFragment(_a) {
    var _b;
    var refiner = _a.refiner, transformer = _a.transformer, component = _a.component;
    var val = (_b = {
            refiner: refiner,
            transformer: transformer,
            component: component
        },
        _b[provide_1.rancorTag] = "child",
        _b);
    return val;
}
exports.ChildFragment = ChildFragment;
exports.c = ChildFragment;
function ListenerFragment(_a) {
    var _b;
    var element = _a.element, listeners = _a.listeners;
    return _b = {
            element: element,
            listeners: listeners
        },
        _b[provide_1.rancorTag] = "listener",
        _b;
}
exports.ListenerFragment = ListenerFragment;
exports.l = ListenerFragment;
function getChildIfChild(val) {
    if (val === null || val === undefined) {
        return undefined;
    }
    else if (val[provide_1.rancorTag] === "child") {
        return val;
    }
    else {
        return undefined;
    }
}
exports.getChildIfChild = getChildIfChild;
function getIterableIfIterable(val) {
    if (val === null || val === undefined) {
        return undefined;
    }
    else if (val[provide_1.rancorTag] === "iterable") {
        return val;
    }
    else {
        return undefined;
    }
}
exports.getIterableIfIterable = getIterableIfIterable;


/***/ }),

/***/ "./lib/index.ts":
/*!**********************!*\
  !*** ./lib/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
__export(__webpack_require__(/*! ./tag */ "./lib/tag.ts"));
__export(__webpack_require__(/*! ./render */ "./lib/render.ts"));
__export(__webpack_require__(/*! ./fragment */ "./lib/fragment.ts"));
__export(__webpack_require__(/*! ./component */ "./lib/component.ts"));


/***/ }),

/***/ "./lib/mount.ts":
/*!**********************!*\
  !*** ./lib/mount.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function removeAllChildren(domTree) {
    var firstChild;
    while (firstChild = domTree.firstChild) {
        domTree.removeChild(firstChild);
    }
}
function mount(domTree, selector) {
    var mountPoint = document.querySelector(selector);
    if (mountPoint) {
        removeAllChildren(mountPoint);
        mountPoint.appendChild(domTree);
    }
    else {
        throw new Error("Element not found with selector " + selector);
    }
}
exports.mount = mount;


/***/ }),

/***/ "./lib/parse.ts":
/*!**********************!*\
  !*** ./lib/parse.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function parse(rawHtml) {
    var parseNode = document.createElement("fragment");
    parseNode.innerHTML = rawHtml;
    return parseNode;
}
exports.parse = parse;


/***/ }),

/***/ "./lib/provide.ts":
/*!************************!*\
  !*** ./lib/provide.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.rancorTag = Symbol("Rancor Tag");


/***/ }),

/***/ "./lib/render.ts":
/*!***********************!*\
  !*** ./lib/render.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
var fragment_1 = __webpack_require__(/*! ./fragment */ "./lib/fragment.ts");
var parse_1 = __webpack_require__(/*! ./parse */ "./lib/parse.ts");
var utils_1 = __webpack_require__(/*! ../types/utils */ "./types/utils.ts");
function mapValues(object, fn) {
    var ret = {};
    Object.keys(object).forEach(function (key) { return (ret[key] = fn(object[key], key)); });
    return ret;
}
var globalMutationSubscribers = new WeakMap();
function Mutator(w, mutators) {
    var wrapped = mapValues(mutators, function (mutator) {
        return function (i) {
            var oldValue = w;
            var newValue = mutator(w, i);
            var subscribers = globalMutationSubscribers.get(oldValue) || new Map();
            subscribers.forEach(function (fn) { return fn(newValue); });
            if (newValue !== oldValue) {
                globalMutationSubscribers["delete"](oldValue);
                globalMutationSubscribers.set(newValue, subscribers);
            }
        };
    });
    return wrapped;
}
exports.Mutator = Mutator;
/**
 * Given a root component and its data object, return a complete DOM tree.
 * Then, each time a mutation requires a re-render of some subset of that tree, call the provided function with a DOM sub-tree and insertion point.
 */
function makeRenderer(rootComponent, data, patch) {
    var rootComponentUuid = uuid_1.v4();
    var componentGraph = {
        dependencies: [data],
        _uuid: rootComponentUuid,
        children: []
    };
    var renderFn = function () { return render({
        component: rootComponent,
        data: data,
        patch: patch
    }); };
    var domTree = renderFn().output;
    return {
        domTree: domTree,
        /** TODO function that cleans up and destroys this tree */
        cleanup: function () { }
    };
}
exports.makeRenderer = makeRenderer;
function asSkeletonDom(_a) {
    var liveFragments = _a.liveFragments, rawFragments = _a.rawFragments;
    var uuids = liveFragments.map(function () { return uuid_1.v4(); });
    var skeletonString = rawFragments.map(function (str, i) { return str + ((i in liveFragments) ? "<rib id=\"" + uuids[i] + "\" />" : ""); }).join("");
    var fragment = parse_1.parse(skeletonString);
    return {
        fragment: fragment,
        uuids: uuids
    };
}
function findIndex(nl, pred) {
    for (var i = 0; i < nl.length; i++) {
        var el = nl[i];
        if (pred(el)) {
            return i;
        }
    }
    return -1;
}
function splice(nl, index, toDelete, toInsert) {
    var toReinsert = [];
    var currentNode;
    var deleteCursor = index + toDelete - 1;
    while (!!(currentNode = nl[deleteCursor++])) {
        toReinsert.push(currentNode);
    }
    var cursor = index;
    for (var _i = 0, toInsert_1 = toInsert; _i < toInsert_1.length; _i++) {
        var insertee = toInsert_1[_i];
        nl[cursor++] = insertee;
    }
    for (var _a = 0, toReinsert_1 = toReinsert; _a < toReinsert_1.length; _a++) {
        var insertee = toReinsert_1[_a];
        nl[cursor++] = insertee;
    }
    nl.length = cursor;
}
function insertLiveHtmlFragment(documentFragment, uuid, toInsert) {
    var insertionPoint = utils_1.notNullOrUndefined(documentFragment.querySelector("#" + uuid), "Element not found with ID " + uuid);
    var parent = utils_1.notNullOrUndefined(insertionPoint.parentNode);
    var index = findIndex(parent.childNodes, function (n) { return n.id === uuid; });
    parent.replaceChild(toInsert, parent.childNodes[index]);
}
function insertLiveHtmlFragments(documentFragment, uuid, toInsert) {
    var insertionPoint = utils_1.notNullOrUndefined(documentFragment.querySelector("#" + uuid), "Element not found with ID " + uuid);
    var parent = utils_1.notNullOrUndefined(insertionPoint.parentNode);
    var index = findIndex(parent.childNodes, function (n) { return n.id === uuid; });
    splice(parent.childNodes, index, 1, toInsert);
}
function renderRancorTemplate(rancorTemplate, data, patch) {
    var liveFragments = rancorTemplate.liveFragments;
    /**
      * TODO can we cache this so it is not executed on subsequent runs?
      */
    var _a = asSkeletonDom(rancorTemplate), fragment = _a.fragment, uuids = _a.uuids;
    liveFragments.forEach(function (liveFragment, i) {
        var uuid = uuids[i];
        var childFragment = fragment_1.getChildIfChild(liveFragment);
        if (!!childFragment) {
            var _a = renderChildFragment(liveFragment, data, patch), graph = _a.graph, output = _a.output;
            return void insertLiveHtmlFragment(fragment, uuid, output);
        }
        var iterableFragment = fragment_1.getIterableIfIterable(liveFragment);
        if (!!iterableFragment) {
            var items = renderIterableFragment(liveFragment, data, patch);
            return void insertLiveHtmlFragments(fragment, uuid, items.map(function (_a) {
                var output = _a.output;
                return output;
            }));
        }
        var node = document.createTextNode(String(liveFragment));
        insertLiveHtmlFragment(fragment, uuid, node);
    });
    return fragment;
}
/**
 * Render a component and track its place in the tree and its dependencies.
 */
function render(_a) {
    var component = _a.component, data = _a.data, patch = _a.patch;
    var renderedTemplate = component(data);
    if (renderedTemplate instanceof HTMLElement) {
        return {
            output: renderedTemplate
        };
    }
    else {
        var fragment = renderRancorTemplate(renderedTemplate, data, patch);
        return {
            output: fragment
        };
    }
}
function renderChildFragment(_a, data, patch) {
    var component = _a.component, refiner = _a.refiner, transformer = _a.transformer;
    /**
     * TODO the "refiner" function was to be used for dependency injection but may no longer be necessary
     */
    var refined = refiner ? refiner(data) : data;
    var transformed = transformer ? transformer(refined) : data;
    return render({
        component: component,
        data: transformed,
        patch: patch
    });
}
function renderIterableFragment(_a, data, patch) {
    var component = _a.component, refiner = _a.refiner, transformer = _a.transformer, iterable = _a.iterable;
    /**
     * TODO the "refiner" function was to be used for dependency injection but may no longer be necessary
     */
    var refined = refiner ? refiner(data) : data;
    var list = iterable(refined);
    var index = 0;
    var iterator = list[Symbol.iterator]();
    var renderedComponents = [];
    var iterated;
    while (iterated = iterator.next()) {
        var value = iterated.value, done = iterated.done;
        if (done) {
            break;
        }
        renderedComponents.push(render({
            component: component,
            data: transformer({ iterated: { current: value, index: index }, data: data }),
            patch: patch
        }));
        index++;
    }
    return renderedComponents;
}
var listenerMap = new Map();
function renderListenerFragment(_a, data, patch) {
    var element = _a.element, listeners = _a.listeners;
    var htmlElement = typeof element === "string"
        ? parse_1.parse(element)
        : renderRancorTemplate(element, data, patch);
    for (var _i = 0, _b = Object.entries(listeners); _i < _b.length; _i++) {
        var _c = _b[_i], event_1 = _c[0], listener = _c[1];
        htmlElement.id = uuid_1.v4();
        // TODO Realize this map on the real DOM in an update step
        listenerMap.set(htmlElement.id, listeners);
    }
}


/***/ }),

/***/ "./lib/tag.ts":
/*!********************!*\
  !*** ./lib/tag.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var provide_1 = __webpack_require__(/*! ./provide */ "./lib/provide.ts");
function rancor(strings) {
    var _a;
    var values = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        values[_i - 1] = arguments[_i];
    }
    return _a = {
            rawFragments: Array.from(strings),
            liveFragments: values
        },
        _a[provide_1.rancorTag] = "rancor",
        _a;
}
exports.rancor = rancor;
function getRancorIfRancor(val) {
    if (val === null || val === undefined) {
        return undefined;
    }
    else if (val[provide_1.rancorTag] === "rancor") {
        return val;
    }
    else {
        return undefined;
    }
}
exports.r = rancor;


/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./types/utils.ts":
/*!************************!*\
  !*** ./types/utils.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function defined(t, errorMessage) {
    if (t === undefined) {
        throw new Error(errorMessage || "Value was undefined but asserted to be defined.");
    }
    else {
        return t;
    }
}
exports.defined = defined;
function notNullOrUndefined(t, errorMessage) {
    if (t === undefined || t === null) {
        throw new Error(errorMessage || "Value was null or undefined.");
    }
    else {
        return t;
    }
}
exports.notNullOrUndefined = notNullOrUndefined;
function assert(fn, errorMessage) {
    if (typeof fn === "function" ? !fn() : !fn) {
        var error = typeof errorMessage === "string"
            ? errorMessage
            : typeof errorMessage === "function"
                ? errorMessage()
                : "Assertion failed";
        throw new Error(error);
    }
}
exports.assert = assert;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vbGliL2NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9saWIvZnJhZ21lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LnRzIiwid2VicGFjazovLy8uL2xpYi9tb3VudC50cyIsIndlYnBhY2s6Ly8vLi9saWIvcGFyc2UudHMiLCJ3ZWJwYWNrOi8vLy4vbGliL3Byb3ZpZGUudHMiLCJ3ZWJwYWNrOi8vLy4vbGliL3JlbmRlci50cyIsIndlYnBhY2s6Ly8vLi9saWIvdGFnLnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ieXRlc1RvVXVpZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlD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RUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUM7QUFDbkM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7QUM1R0EsVUFBVSxtQkFBTyxDQUFDLHlEQUFXO0FBQzdCLGtCQUFrQixtQkFBTyxDQUFDLGlFQUFtQjs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUM1QmE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9pbmRleC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fbWFrZVRlbXBsYXRlT2JqZWN0ID0gKHRoaXMgJiYgdGhpcy5fX21ha2VUZW1wbGF0ZU9iamVjdCkgfHwgZnVuY3Rpb24gKGNvb2tlZCwgcmF3KSB7XG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cbiAgICByZXR1cm4gY29va2VkO1xufTtcbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG52YXIgbGliXzEgPSByZXF1aXJlKFwiLi9saWJcIik7XG52YXIgbW91bnRfMSA9IHJlcXVpcmUoXCIuL2xpYi9tb3VudFwiKTtcbnZhciB0ZXN0RGF0YSA9IHtcbiAgICBuYW1lOiBcIk1hdHRpYXMgTWFydGVuc1wiLFxuICAgIHRpY2tlcjogMCxcbiAgICBpZGVhczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIkEgYm93bGluZyBiYWxsIHRoYXQgc2hvb3RzIGxhc2Vyc1wiLFxuICAgICAgICAgICAgY29uY2VpdmVEYXRlOiBuZXcgRGF0ZShuZXcgRGF0ZSgpLnZhbHVlT2YoKSAtIDEwMDAgKiAxMDAwICogMTAwMCksXG4gICAgICAgICAgICBpc0xpa2VhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGRvWW91TGlrZU15SWRlYTogbnVsbFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIkEgcmVtYWtlIG9mIE11Y2ggQWRvIEFib3V0IE5vdGhpbmcgd2hlcmUgQmVuZWRpY2sgZGllc1wiLFxuICAgICAgICAgICAgY29uY2VpdmVEYXRlOiBuZXcgRGF0ZShuZXcgRGF0ZSgpLnZhbHVlT2YoKSAtIDgwMDAgKiAxMDAwICogMTAwMCksXG4gICAgICAgICAgICBpc0xpa2VhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZG9Zb3VMaWtlTXlJZGVhOiBudWxsXG4gICAgICAgIH1cbiAgICBdXG59O1xudmFyIG11dGF0b3IgPSBsaWJfMS5NdXRhdG9yKHRlc3REYXRhLCB7XG4gICAgdGljazogZnVuY3Rpb24gKHRlc3REYXRhKSB7XG4gICAgICAgIHRlc3REYXRhLnRpY2tlcisrO1xuICAgICAgICByZXR1cm4gdGVzdERhdGE7XG4gICAgfVxufSk7XG5zZXRJbnRlcnZhbChtdXRhdG9yLnRpY2ssIDQwMDApO1xudmFyIHRlc3RDb21wb25lbnQgPSBmdW5jdGlvbiAoX2EpIHtcbiAgICB2YXIgbmFtZSA9IF9hLm5hbWUsIHRpY2tlciA9IF9hLnRpY2tlcjtcbiAgICByZXR1cm4gbGliXzEucih0ZW1wbGF0ZU9iamVjdF8yIHx8ICh0ZW1wbGF0ZU9iamVjdF8yID0gX19tYWtlVGVtcGxhdGVPYmplY3QoW1wiPHA+TXkgbmFtZSBpcyBcIiwgXCIgI1wiLCBcIjwvcD48dWw+XCIsIFwiPC91bD5cIl0sIFtcIjxwPk15IG5hbWUgaXMgXCIsIFwiICNcIiwgXCI8L3A+PHVsPlwiLFxuICAgICAgICBcIjwvdWw+XCJdKSksIG5hbWUsIHRpY2tlciwgbGliXzEuaSh7XG4gICAgICAgIHJlZmluZXI6IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIGlkZWFzID0gX2EuaWRlYXM7XG4gICAgICAgICAgICByZXR1cm4gKHsgaWRlYXM6IGlkZWFzIH0pO1xuICAgICAgICB9LFxuICAgICAgICBpdGVyYWJsZTogZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgaWRlYXMgPSBfYS5pZGVhcztcbiAgICAgICAgICAgIHJldHVybiBpZGVhcztcbiAgICAgICAgfSxcbiAgICAgICAgdHJhbnNmb3JtZXI6IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdGVkID0gX2EuaXRlcmF0ZWQ7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0ZWQuY3VycmVudDtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50OiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gX2EubmFtZTtcbiAgICAgICAgICAgIHJldHVybiBsaWJfMS5yKHRlbXBsYXRlT2JqZWN0XzEgfHwgKHRlbXBsYXRlT2JqZWN0XzEgPSBfX21ha2VUZW1wbGF0ZU9iamVjdChbXCI8bGk+XCIsIFwiPC9saT5cIl0sIFtcIjxsaT5cIiwgXCI8L2xpPlwiXSkpLCBuYW1lKTtcbiAgICAgICAgfVxuICAgIH0pKTtcbn07XG52YXIgX2EgPSBsaWJfMS5tYWtlUmVuZGVyZXIodGVzdENvbXBvbmVudCwgdGVzdERhdGEsIGNvbnNvbGUubG9nKSwgZG9tVHJlZSA9IF9hLmRvbVRyZWUsIGNsZWFudXAgPSBfYS5jbGVhbnVwO1xubW91bnRfMS5tb3VudChkb21UcmVlLCBcIiNhcHBcIik7XG52YXIgdGVtcGxhdGVPYmplY3RfMSwgdGVtcGxhdGVPYmplY3RfMjtcbiIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmZ1bmN0aW9uIGlkZW50aXR5KHQpIHtcbiAgICByZXR1cm4gdDtcbn1cbmV4cG9ydHMuaWRlbnRpdHkgPSBpZGVudGl0eTtcbiIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciBwcm92aWRlXzEgPSByZXF1aXJlKFwiLi9wcm92aWRlXCIpO1xuZnVuY3Rpb24gSXRlcmFibGVGcmFnbWVudChfYSkge1xuICAgIHZhciBfYjtcbiAgICB2YXIgcmVmaW5lciA9IF9hLnJlZmluZXIsIHRyYW5zZm9ybWVyID0gX2EudHJhbnNmb3JtZXIsIGNvbXBvbmVudCA9IF9hLmNvbXBvbmVudCwgaXRlcmFibGUgPSBfYS5pdGVyYWJsZTtcbiAgICB2YXIgdmFsID0gKF9iID0ge1xuICAgICAgICAgICAgcmVmaW5lcjogcmVmaW5lcixcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyOiB0cmFuc2Zvcm1lcixcbiAgICAgICAgICAgIGNvbXBvbmVudDogY29tcG9uZW50LFxuICAgICAgICAgICAgaXRlcmFibGU6IGl0ZXJhYmxlXG4gICAgICAgIH0sXG4gICAgICAgIF9iW3Byb3ZpZGVfMS5yYW5jb3JUYWddID0gXCJpdGVyYWJsZVwiLFxuICAgICAgICBfYik7XG4gICAgcmV0dXJuIHZhbDtcbn1cbmV4cG9ydHMuSXRlcmFibGVGcmFnbWVudCA9IEl0ZXJhYmxlRnJhZ21lbnQ7XG5leHBvcnRzLmkgPSBJdGVyYWJsZUZyYWdtZW50O1xuZnVuY3Rpb24gQ2hpbGRGcmFnbWVudChfYSkge1xuICAgIHZhciBfYjtcbiAgICB2YXIgcmVmaW5lciA9IF9hLnJlZmluZXIsIHRyYW5zZm9ybWVyID0gX2EudHJhbnNmb3JtZXIsIGNvbXBvbmVudCA9IF9hLmNvbXBvbmVudDtcbiAgICB2YXIgdmFsID0gKF9iID0ge1xuICAgICAgICAgICAgcmVmaW5lcjogcmVmaW5lcixcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyOiB0cmFuc2Zvcm1lcixcbiAgICAgICAgICAgIGNvbXBvbmVudDogY29tcG9uZW50XG4gICAgICAgIH0sXG4gICAgICAgIF9iW3Byb3ZpZGVfMS5yYW5jb3JUYWddID0gXCJjaGlsZFwiLFxuICAgICAgICBfYik7XG4gICAgcmV0dXJuIHZhbDtcbn1cbmV4cG9ydHMuQ2hpbGRGcmFnbWVudCA9IENoaWxkRnJhZ21lbnQ7XG5leHBvcnRzLmMgPSBDaGlsZEZyYWdtZW50O1xuZnVuY3Rpb24gTGlzdGVuZXJGcmFnbWVudChfYSkge1xuICAgIHZhciBfYjtcbiAgICB2YXIgZWxlbWVudCA9IF9hLmVsZW1lbnQsIGxpc3RlbmVycyA9IF9hLmxpc3RlbmVycztcbiAgICByZXR1cm4gX2IgPSB7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgbGlzdGVuZXJzOiBsaXN0ZW5lcnNcbiAgICAgICAgfSxcbiAgICAgICAgX2JbcHJvdmlkZV8xLnJhbmNvclRhZ10gPSBcImxpc3RlbmVyXCIsXG4gICAgICAgIF9iO1xufVxuZXhwb3J0cy5MaXN0ZW5lckZyYWdtZW50ID0gTGlzdGVuZXJGcmFnbWVudDtcbmV4cG9ydHMubCA9IExpc3RlbmVyRnJhZ21lbnQ7XG5mdW5jdGlvbiBnZXRDaGlsZElmQ2hpbGQodmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWxbcHJvdmlkZV8xLnJhbmNvclRhZ10gPT09IFwiY2hpbGRcIikge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG59XG5leHBvcnRzLmdldENoaWxkSWZDaGlsZCA9IGdldENoaWxkSWZDaGlsZDtcbmZ1bmN0aW9uIGdldEl0ZXJhYmxlSWZJdGVyYWJsZSh2YWwpIHtcbiAgICBpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKHZhbFtwcm92aWRlXzEucmFuY29yVGFnXSA9PT0gXCJpdGVyYWJsZVwiKSB7XG4gICAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0SXRlcmFibGVJZkl0ZXJhYmxlID0gZ2V0SXRlcmFibGVJZkl0ZXJhYmxlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBfX2V4cG9ydChtKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xufVxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbl9fZXhwb3J0KHJlcXVpcmUoXCIuL3RhZ1wiKSk7XG5fX2V4cG9ydChyZXF1aXJlKFwiLi9yZW5kZXJcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vZnJhZ21lbnRcIikpO1xuX19leHBvcnQocmVxdWlyZShcIi4vY29tcG9uZW50XCIpKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmZ1bmN0aW9uIHJlbW92ZUFsbENoaWxkcmVuKGRvbVRyZWUpIHtcbiAgICB2YXIgZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoZmlyc3RDaGlsZCA9IGRvbVRyZWUuZmlyc3RDaGlsZCkge1xuICAgICAgICBkb21UcmVlLnJlbW92ZUNoaWxkKGZpcnN0Q2hpbGQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1vdW50KGRvbVRyZWUsIHNlbGVjdG9yKSB7XG4gICAgdmFyIG1vdW50UG9pbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICBpZiAobW91bnRQb2ludCkge1xuICAgICAgICByZW1vdmVBbGxDaGlsZHJlbihtb3VudFBvaW50KTtcbiAgICAgICAgbW91bnRQb2ludC5hcHBlbmRDaGlsZChkb21UcmVlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVsZW1lbnQgbm90IGZvdW5kIHdpdGggc2VsZWN0b3IgXCIgKyBzZWxlY3Rvcik7XG4gICAgfVxufVxuZXhwb3J0cy5tb3VudCA9IG1vdW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZnVuY3Rpb24gcGFyc2UocmF3SHRtbCkge1xuICAgIHZhciBwYXJzZU5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZnJhZ21lbnRcIik7XG4gICAgcGFyc2VOb2RlLmlubmVySFRNTCA9IHJhd0h0bWw7XG4gICAgcmV0dXJuIHBhcnNlTm9kZTtcbn1cbmV4cG9ydHMucGFyc2UgPSBwYXJzZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMucmFuY29yVGFnID0gU3ltYm9sKFwiUmFuY29yIFRhZ1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbnZhciB1dWlkXzEgPSByZXF1aXJlKFwidXVpZFwiKTtcbnZhciBmcmFnbWVudF8xID0gcmVxdWlyZShcIi4vZnJhZ21lbnRcIik7XG52YXIgcGFyc2VfMSA9IHJlcXVpcmUoXCIuL3BhcnNlXCIpO1xudmFyIHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vdHlwZXMvdXRpbHNcIik7XG5mdW5jdGlvbiBtYXBWYWx1ZXMob2JqZWN0LCBmbikge1xuICAgIHZhciByZXQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gKHJldFtrZXldID0gZm4ob2JqZWN0W2tleV0sIGtleSkpOyB9KTtcbiAgICByZXR1cm4gcmV0O1xufVxudmFyIGdsb2JhbE11dGF0aW9uU3Vic2NyaWJlcnMgPSBuZXcgV2Vha01hcCgpO1xuZnVuY3Rpb24gTXV0YXRvcih3LCBtdXRhdG9ycykge1xuICAgIHZhciB3cmFwcGVkID0gbWFwVmFsdWVzKG11dGF0b3JzLCBmdW5jdGlvbiAobXV0YXRvcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IHc7XG4gICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBtdXRhdG9yKHcsIGkpO1xuICAgICAgICAgICAgdmFyIHN1YnNjcmliZXJzID0gZ2xvYmFsTXV0YXRpb25TdWJzY3JpYmVycy5nZXQob2xkVmFsdWUpIHx8IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHN1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7IHJldHVybiBmbihuZXdWYWx1ZSk7IH0pO1xuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGdsb2JhbE11dGF0aW9uU3Vic2NyaWJlcnNbXCJkZWxldGVcIl0ob2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgIGdsb2JhbE11dGF0aW9uU3Vic2NyaWJlcnMuc2V0KG5ld1ZhbHVlLCBzdWJzY3JpYmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIHdyYXBwZWQ7XG59XG5leHBvcnRzLk11dGF0b3IgPSBNdXRhdG9yO1xuLyoqXG4gKiBHaXZlbiBhIHJvb3QgY29tcG9uZW50IGFuZCBpdHMgZGF0YSBvYmplY3QsIHJldHVybiBhIGNvbXBsZXRlIERPTSB0cmVlLlxuICogVGhlbiwgZWFjaCB0aW1lIGEgbXV0YXRpb24gcmVxdWlyZXMgYSByZS1yZW5kZXIgb2Ygc29tZSBzdWJzZXQgb2YgdGhhdCB0cmVlLCBjYWxsIHRoZSBwcm92aWRlZCBmdW5jdGlvbiB3aXRoIGEgRE9NIHN1Yi10cmVlIGFuZCBpbnNlcnRpb24gcG9pbnQuXG4gKi9cbmZ1bmN0aW9uIG1ha2VSZW5kZXJlcihyb290Q29tcG9uZW50LCBkYXRhLCBwYXRjaCkge1xuICAgIHZhciByb290Q29tcG9uZW50VXVpZCA9IHV1aWRfMS52NCgpO1xuICAgIHZhciBjb21wb25lbnRHcmFwaCA9IHtcbiAgICAgICAgZGVwZW5kZW5jaWVzOiBbZGF0YV0sXG4gICAgICAgIF91dWlkOiByb290Q29tcG9uZW50VXVpZCxcbiAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgfTtcbiAgICB2YXIgcmVuZGVyRm4gPSBmdW5jdGlvbiAoKSB7IHJldHVybiByZW5kZXIoe1xuICAgICAgICBjb21wb25lbnQ6IHJvb3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIHBhdGNoOiBwYXRjaFxuICAgIH0pOyB9O1xuICAgIHZhciBkb21UcmVlID0gcmVuZGVyRm4oKS5vdXRwdXQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZG9tVHJlZTogZG9tVHJlZSxcbiAgICAgICAgLyoqIFRPRE8gZnVuY3Rpb24gdGhhdCBjbGVhbnMgdXAgYW5kIGRlc3Ryb3lzIHRoaXMgdHJlZSAqL1xuICAgICAgICBjbGVhbnVwOiBmdW5jdGlvbiAoKSB7IH1cbiAgICB9O1xufVxuZXhwb3J0cy5tYWtlUmVuZGVyZXIgPSBtYWtlUmVuZGVyZXI7XG5mdW5jdGlvbiBhc1NrZWxldG9uRG9tKF9hKSB7XG4gICAgdmFyIGxpdmVGcmFnbWVudHMgPSBfYS5saXZlRnJhZ21lbnRzLCByYXdGcmFnbWVudHMgPSBfYS5yYXdGcmFnbWVudHM7XG4gICAgdmFyIHV1aWRzID0gbGl2ZUZyYWdtZW50cy5tYXAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdXVpZF8xLnY0KCk7IH0pO1xuICAgIHZhciBza2VsZXRvblN0cmluZyA9IHJhd0ZyYWdtZW50cy5tYXAoZnVuY3Rpb24gKHN0ciwgaSkgeyByZXR1cm4gc3RyICsgKChpIGluIGxpdmVGcmFnbWVudHMpID8gXCI8cmliIGlkPVxcXCJcIiArIHV1aWRzW2ldICsgXCJcXFwiIC8+XCIgOiBcIlwiKTsgfSkuam9pbihcIlwiKTtcbiAgICB2YXIgZnJhZ21lbnQgPSBwYXJzZV8xLnBhcnNlKHNrZWxldG9uU3RyaW5nKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBmcmFnbWVudDogZnJhZ21lbnQsXG4gICAgICAgIHV1aWRzOiB1dWlkc1xuICAgIH07XG59XG5mdW5jdGlvbiBmaW5kSW5kZXgobmwsIHByZWQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5sLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlbCA9IG5sW2ldO1xuICAgICAgICBpZiAocHJlZChlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cbmZ1bmN0aW9uIHNwbGljZShubCwgaW5kZXgsIHRvRGVsZXRlLCB0b0luc2VydCkge1xuICAgIHZhciB0b1JlaW5zZXJ0ID0gW107XG4gICAgdmFyIGN1cnJlbnROb2RlO1xuICAgIHZhciBkZWxldGVDdXJzb3IgPSBpbmRleCArIHRvRGVsZXRlIC0gMTtcbiAgICB3aGlsZSAoISEoY3VycmVudE5vZGUgPSBubFtkZWxldGVDdXJzb3IrK10pKSB7XG4gICAgICAgIHRvUmVpbnNlcnQucHVzaChjdXJyZW50Tm9kZSk7XG4gICAgfVxuICAgIHZhciBjdXJzb3IgPSBpbmRleDtcbiAgICBmb3IgKHZhciBfaSA9IDAsIHRvSW5zZXJ0XzEgPSB0b0luc2VydDsgX2kgPCB0b0luc2VydF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgaW5zZXJ0ZWUgPSB0b0luc2VydF8xW19pXTtcbiAgICAgICAgbmxbY3Vyc29yKytdID0gaW5zZXJ0ZWU7XG4gICAgfVxuICAgIGZvciAodmFyIF9hID0gMCwgdG9SZWluc2VydF8xID0gdG9SZWluc2VydDsgX2EgPCB0b1JlaW5zZXJ0XzEubGVuZ3RoOyBfYSsrKSB7XG4gICAgICAgIHZhciBpbnNlcnRlZSA9IHRvUmVpbnNlcnRfMVtfYV07XG4gICAgICAgIG5sW2N1cnNvcisrXSA9IGluc2VydGVlO1xuICAgIH1cbiAgICBubC5sZW5ndGggPSBjdXJzb3I7XG59XG5mdW5jdGlvbiBpbnNlcnRMaXZlSHRtbEZyYWdtZW50KGRvY3VtZW50RnJhZ21lbnQsIHV1aWQsIHRvSW5zZXJ0KSB7XG4gICAgdmFyIGluc2VydGlvblBvaW50ID0gdXRpbHNfMS5ub3ROdWxsT3JVbmRlZmluZWQoZG9jdW1lbnRGcmFnbWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgdXVpZCksIFwiRWxlbWVudCBub3QgZm91bmQgd2l0aCBJRCBcIiArIHV1aWQpO1xuICAgIHZhciBwYXJlbnQgPSB1dGlsc18xLm5vdE51bGxPclVuZGVmaW5lZChpbnNlcnRpb25Qb2ludC5wYXJlbnROb2RlKTtcbiAgICB2YXIgaW5kZXggPSBmaW5kSW5kZXgocGFyZW50LmNoaWxkTm9kZXMsIGZ1bmN0aW9uIChuKSB7IHJldHVybiBuLmlkID09PSB1dWlkOyB9KTtcbiAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHRvSW5zZXJ0LCBwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF0pO1xufVxuZnVuY3Rpb24gaW5zZXJ0TGl2ZUh0bWxGcmFnbWVudHMoZG9jdW1lbnRGcmFnbWVudCwgdXVpZCwgdG9JbnNlcnQpIHtcbiAgICB2YXIgaW5zZXJ0aW9uUG9pbnQgPSB1dGlsc18xLm5vdE51bGxPclVuZGVmaW5lZChkb2N1bWVudEZyYWdtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyB1dWlkKSwgXCJFbGVtZW50IG5vdCBmb3VuZCB3aXRoIElEIFwiICsgdXVpZCk7XG4gICAgdmFyIHBhcmVudCA9IHV0aWxzXzEubm90TnVsbE9yVW5kZWZpbmVkKGluc2VydGlvblBvaW50LnBhcmVudE5vZGUpO1xuICAgIHZhciBpbmRleCA9IGZpbmRJbmRleChwYXJlbnQuY2hpbGROb2RlcywgZnVuY3Rpb24gKG4pIHsgcmV0dXJuIG4uaWQgPT09IHV1aWQ7IH0pO1xuICAgIHNwbGljZShwYXJlbnQuY2hpbGROb2RlcywgaW5kZXgsIDEsIHRvSW5zZXJ0KTtcbn1cbmZ1bmN0aW9uIHJlbmRlclJhbmNvclRlbXBsYXRlKHJhbmNvclRlbXBsYXRlLCBkYXRhLCBwYXRjaCkge1xuICAgIHZhciBsaXZlRnJhZ21lbnRzID0gcmFuY29yVGVtcGxhdGUubGl2ZUZyYWdtZW50cztcbiAgICAvKipcbiAgICAgICogVE9ETyBjYW4gd2UgY2FjaGUgdGhpcyBzbyBpdCBpcyBub3QgZXhlY3V0ZWQgb24gc3Vic2VxdWVudCBydW5zP1xuICAgICAgKi9cbiAgICB2YXIgX2EgPSBhc1NrZWxldG9uRG9tKHJhbmNvclRlbXBsYXRlKSwgZnJhZ21lbnQgPSBfYS5mcmFnbWVudCwgdXVpZHMgPSBfYS51dWlkcztcbiAgICBsaXZlRnJhZ21lbnRzLmZvckVhY2goZnVuY3Rpb24gKGxpdmVGcmFnbWVudCwgaSkge1xuICAgICAgICB2YXIgdXVpZCA9IHV1aWRzW2ldO1xuICAgICAgICB2YXIgY2hpbGRGcmFnbWVudCA9IGZyYWdtZW50XzEuZ2V0Q2hpbGRJZkNoaWxkKGxpdmVGcmFnbWVudCk7XG4gICAgICAgIGlmICghIWNoaWxkRnJhZ21lbnQpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IHJlbmRlckNoaWxkRnJhZ21lbnQobGl2ZUZyYWdtZW50LCBkYXRhLCBwYXRjaCksIGdyYXBoID0gX2EuZ3JhcGgsIG91dHB1dCA9IF9hLm91dHB1dDtcbiAgICAgICAgICAgIHJldHVybiB2b2lkIGluc2VydExpdmVIdG1sRnJhZ21lbnQoZnJhZ21lbnQsIHV1aWQsIG91dHB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGl0ZXJhYmxlRnJhZ21lbnQgPSBmcmFnbWVudF8xLmdldEl0ZXJhYmxlSWZJdGVyYWJsZShsaXZlRnJhZ21lbnQpO1xuICAgICAgICBpZiAoISFpdGVyYWJsZUZyYWdtZW50KSB7XG4gICAgICAgICAgICB2YXIgaXRlbXMgPSByZW5kZXJJdGVyYWJsZUZyYWdtZW50KGxpdmVGcmFnbWVudCwgZGF0YSwgcGF0Y2gpO1xuICAgICAgICAgICAgcmV0dXJuIHZvaWQgaW5zZXJ0TGl2ZUh0bWxGcmFnbWVudHMoZnJhZ21lbnQsIHV1aWQsIGl0ZW1zLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICB2YXIgb3V0cHV0ID0gX2Eub3V0cHV0O1xuICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcobGl2ZUZyYWdtZW50KSk7XG4gICAgICAgIGluc2VydExpdmVIdG1sRnJhZ21lbnQoZnJhZ21lbnQsIHV1aWQsIG5vZGUpO1xuICAgIH0pO1xuICAgIHJldHVybiBmcmFnbWVudDtcbn1cbi8qKlxuICogUmVuZGVyIGEgY29tcG9uZW50IGFuZCB0cmFjayBpdHMgcGxhY2UgaW4gdGhlIHRyZWUgYW5kIGl0cyBkZXBlbmRlbmNpZXMuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcihfYSkge1xuICAgIHZhciBjb21wb25lbnQgPSBfYS5jb21wb25lbnQsIGRhdGEgPSBfYS5kYXRhLCBwYXRjaCA9IF9hLnBhdGNoO1xuICAgIHZhciByZW5kZXJlZFRlbXBsYXRlID0gY29tcG9uZW50KGRhdGEpO1xuICAgIGlmIChyZW5kZXJlZFRlbXBsYXRlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG91dHB1dDogcmVuZGVyZWRUZW1wbGF0ZVxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGZyYWdtZW50ID0gcmVuZGVyUmFuY29yVGVtcGxhdGUocmVuZGVyZWRUZW1wbGF0ZSwgZGF0YSwgcGF0Y2gpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgb3V0cHV0OiBmcmFnbWVudFxuICAgICAgICB9O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbmRlckNoaWxkRnJhZ21lbnQoX2EsIGRhdGEsIHBhdGNoKSB7XG4gICAgdmFyIGNvbXBvbmVudCA9IF9hLmNvbXBvbmVudCwgcmVmaW5lciA9IF9hLnJlZmluZXIsIHRyYW5zZm9ybWVyID0gX2EudHJhbnNmb3JtZXI7XG4gICAgLyoqXG4gICAgICogVE9ETyB0aGUgXCJyZWZpbmVyXCIgZnVuY3Rpb24gd2FzIHRvIGJlIHVzZWQgZm9yIGRlcGVuZGVuY3kgaW5qZWN0aW9uIGJ1dCBtYXkgbm8gbG9uZ2VyIGJlIG5lY2Vzc2FyeVxuICAgICAqL1xuICAgIHZhciByZWZpbmVkID0gcmVmaW5lciA/IHJlZmluZXIoZGF0YSkgOiBkYXRhO1xuICAgIHZhciB0cmFuc2Zvcm1lZCA9IHRyYW5zZm9ybWVyID8gdHJhbnNmb3JtZXIocmVmaW5lZCkgOiBkYXRhO1xuICAgIHJldHVybiByZW5kZXIoe1xuICAgICAgICBjb21wb25lbnQ6IGNvbXBvbmVudCxcbiAgICAgICAgZGF0YTogdHJhbnNmb3JtZWQsXG4gICAgICAgIHBhdGNoOiBwYXRjaFxuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVySXRlcmFibGVGcmFnbWVudChfYSwgZGF0YSwgcGF0Y2gpIHtcbiAgICB2YXIgY29tcG9uZW50ID0gX2EuY29tcG9uZW50LCByZWZpbmVyID0gX2EucmVmaW5lciwgdHJhbnNmb3JtZXIgPSBfYS50cmFuc2Zvcm1lciwgaXRlcmFibGUgPSBfYS5pdGVyYWJsZTtcbiAgICAvKipcbiAgICAgKiBUT0RPIHRoZSBcInJlZmluZXJcIiBmdW5jdGlvbiB3YXMgdG8gYmUgdXNlZCBmb3IgZGVwZW5kZW5jeSBpbmplY3Rpb24gYnV0IG1heSBubyBsb25nZXIgYmUgbmVjZXNzYXJ5XG4gICAgICovXG4gICAgdmFyIHJlZmluZWQgPSByZWZpbmVyID8gcmVmaW5lcihkYXRhKSA6IGRhdGE7XG4gICAgdmFyIGxpc3QgPSBpdGVyYWJsZShyZWZpbmVkKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBpdGVyYXRvciA9IGxpc3RbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICAgIHZhciByZW5kZXJlZENvbXBvbmVudHMgPSBbXTtcbiAgICB2YXIgaXRlcmF0ZWQ7XG4gICAgd2hpbGUgKGl0ZXJhdGVkID0gaXRlcmF0b3IubmV4dCgpKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZXJhdGVkLnZhbHVlLCBkb25lID0gaXRlcmF0ZWQuZG9uZTtcbiAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcmVkQ29tcG9uZW50cy5wdXNoKHJlbmRlcih7XG4gICAgICAgICAgICBjb21wb25lbnQ6IGNvbXBvbmVudCxcbiAgICAgICAgICAgIGRhdGE6IHRyYW5zZm9ybWVyKHsgaXRlcmF0ZWQ6IHsgY3VycmVudDogdmFsdWUsIGluZGV4OiBpbmRleCB9LCBkYXRhOiBkYXRhIH0pLFxuICAgICAgICAgICAgcGF0Y2g6IHBhdGNoXG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlcmVkQ29tcG9uZW50cztcbn1cbnZhciBsaXN0ZW5lck1hcCA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIHJlbmRlckxpc3RlbmVyRnJhZ21lbnQoX2EsIGRhdGEsIHBhdGNoKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBfYS5lbGVtZW50LCBsaXN0ZW5lcnMgPSBfYS5saXN0ZW5lcnM7XG4gICAgdmFyIGh0bWxFbGVtZW50ID0gdHlwZW9mIGVsZW1lbnQgPT09IFwic3RyaW5nXCJcbiAgICAgICAgPyBwYXJzZV8xLnBhcnNlKGVsZW1lbnQpXG4gICAgICAgIDogcmVuZGVyUmFuY29yVGVtcGxhdGUoZWxlbWVudCwgZGF0YSwgcGF0Y2gpO1xuICAgIGZvciAodmFyIF9pID0gMCwgX2IgPSBPYmplY3QuZW50cmllcyhsaXN0ZW5lcnMpOyBfaSA8IF9iLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgX2MgPSBfYltfaV0sIGV2ZW50XzEgPSBfY1swXSwgbGlzdGVuZXIgPSBfY1sxXTtcbiAgICAgICAgaHRtbEVsZW1lbnQuaWQgPSB1dWlkXzEudjQoKTtcbiAgICAgICAgLy8gVE9ETyBSZWFsaXplIHRoaXMgbWFwIG9uIHRoZSByZWFsIERPTSBpbiBhbiB1cGRhdGUgc3RlcFxuICAgICAgICBsaXN0ZW5lck1hcC5zZXQoaHRtbEVsZW1lbnQuaWQsIGxpc3RlbmVycyk7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xudmFyIHByb3ZpZGVfMSA9IHJlcXVpcmUoXCIuL3Byb3ZpZGVcIik7XG5mdW5jdGlvbiByYW5jb3Ioc3RyaW5ncykge1xuICAgIHZhciBfYTtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFsdWVzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICByZXR1cm4gX2EgPSB7XG4gICAgICAgICAgICByYXdGcmFnbWVudHM6IEFycmF5LmZyb20oc3RyaW5ncyksXG4gICAgICAgICAgICBsaXZlRnJhZ21lbnRzOiB2YWx1ZXNcbiAgICAgICAgfSxcbiAgICAgICAgX2FbcHJvdmlkZV8xLnJhbmNvclRhZ10gPSBcInJhbmNvclwiLFxuICAgICAgICBfYTtcbn1cbmV4cG9ydHMucmFuY29yID0gcmFuY29yO1xuZnVuY3Rpb24gZ2V0UmFuY29ySWZSYW5jb3IodmFsKSB7XG4gICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWxbcHJvdmlkZV8xLnJhbmNvclRhZ10gPT09IFwicmFuY29yXCIpIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxufVxuZXhwb3J0cy5yID0gcmFuY29yO1xuIiwidmFyIHYxID0gcmVxdWlyZSgnLi92MScpO1xudmFyIHY0ID0gcmVxdWlyZSgnLi92NCcpO1xuXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgLy8gam9pbiB1c2VkIHRvIGZpeCBtZW1vcnkgaXNzdWUgY2F1c2VkIGJ5IGNvbmNhdGVuYXRpb246IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMxNzUjYzRcbiAgcmV0dXJuIChbYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXV0pLmpvaW4oJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkO1xuIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIHRoZVxuLy8gYnJvd3NlciB0aGlzIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkIGR1ZSB0byB1bmtub3duIHF1YWxpdHkgb2YgTWF0aC5yYW5kb20oKVxuLy8gYW5kIGluY29uc2lzdGVudCBzdXBwb3J0IGZvciB0aGUgYGNyeXB0b2AgQVBJLiAgV2UgZG8gdGhlIGJlc3Qgd2UgY2FuIHZpYVxuLy8gZmVhdHVyZS1kZXRlY3Rpb25cblxuLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvXG4vLyBpbXBsZW1lbnRhdGlvbi4gQWxzbywgZmluZCB0aGUgY29tcGxldGUgaW1wbGVtZW50YXRpb24gb2YgY3J5cHRvIG9uIElFMTEuXG52YXIgZ2V0UmFuZG9tVmFsdWVzID0gKHR5cGVvZihjcnlwdG8pICE9ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZihtc0NyeXB0bykgIT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT0gJ2Z1bmN0aW9uJyAmJiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChtc0NyeXB0bykpO1xuXG5pZiAoZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBnZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn0gZWxzZSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWF0aFJORygpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn1cbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxudmFyIF9ub2RlSWQ7XG52YXIgX2Nsb2Nrc2VxO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMDtcbnZhciBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIG5vZGUgYW5kIGNsb2Nrc2VxIG5lZWQgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gcmFuZG9tIHZhbHVlcyBpZiB0aGV5J3JlIG5vdFxuICAvLyBzcGVjaWZpZWQuICBXZSBkbyB0aGlzIGxhemlseSB0byBtaW5pbWl6ZSBpc3N1ZXMgcmVsYXRlZCB0byBpbnN1ZmZpY2llbnRcbiAgLy8gc3lzdGVtIGVudHJvcHkuICBTZWUgIzE4OVxuICBpZiAobm9kZSA9PSBudWxsIHx8IGNsb2Nrc2VxID09IG51bGwpIHtcbiAgICB2YXIgc2VlZEJ5dGVzID0gcm5nKCk7XG4gICAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgICAgLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG4gICAgICBub2RlID0gX25vZGVJZCA9IFtcbiAgICAgICAgc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgICAgICAgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1cbiAgICAgIF07XG4gICAgfVxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfVxuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxO1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiIsIlwidXNlIHN0cmljdFwiO1xuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmZ1bmN0aW9uIGRlZmluZWQodCwgZXJyb3JNZXNzYWdlKSB7XG4gICAgaWYgKHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlIHx8IFwiVmFsdWUgd2FzIHVuZGVmaW5lZCBidXQgYXNzZXJ0ZWQgdG8gYmUgZGVmaW5lZC5cIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gdDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmluZWQgPSBkZWZpbmVkO1xuZnVuY3Rpb24gbm90TnVsbE9yVW5kZWZpbmVkKHQsIGVycm9yTWVzc2FnZSkge1xuICAgIGlmICh0ID09PSB1bmRlZmluZWQgfHwgdCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlIHx8IFwiVmFsdWUgd2FzIG51bGwgb3IgdW5kZWZpbmVkLlwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB0O1xuICAgIH1cbn1cbmV4cG9ydHMubm90TnVsbE9yVW5kZWZpbmVkID0gbm90TnVsbE9yVW5kZWZpbmVkO1xuZnVuY3Rpb24gYXNzZXJ0KGZuLCBlcnJvck1lc3NhZ2UpIHtcbiAgICBpZiAodHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIgPyAhZm4oKSA6ICFmbikge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlb2YgZXJyb3JNZXNzYWdlID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgICA/IGVycm9yTWVzc2FnZVxuICAgICAgICAgICAgOiB0eXBlb2YgZXJyb3JNZXNzYWdlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICAgICA/IGVycm9yTWVzc2FnZSgpXG4gICAgICAgICAgICAgICAgOiBcIkFzc2VydGlvbiBmYWlsZWRcIjtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycm9yKTtcbiAgICB9XG59XG5leHBvcnRzLmFzc2VydCA9IGFzc2VydDtcbiJdLCJzb3VyY2VSb290IjoiIn0=