function _mergeNamespaces(n2, m2) {
  for (var i2 = 0; i2 < m2.length; i2++) {
    const e2 = m2[i2];
    if (typeof e2 !== "string" && !Array.isArray(e2)) {
      for (const k2 in e2) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d2 = Object.getOwnPropertyDescriptor(e2, k2);
          if (d2) {
            Object.defineProperty(n2, k2, d2.get ? d2 : {
              enumerable: true,
              get: () => e2[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$2 = Symbol.for("react.element"), n$3 = Symbol.for("react.portal"), p$3 = Symbol.for("react.fragment"), q$1 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t$1 = Symbol.for("react.provider"), u$1 = Symbol.for("react.context"), v$2 = Symbol.for("react.forward_ref"), w$2 = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), z$1 = Symbol.iterator;
function A$1(a2) {
  if (null === a2 || "object" !== typeof a2) return null;
  a2 = z$1 && a2[z$1] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$2 = Object.assign, D$2 = {};
function E$2(a2, b, e2) {
  this.props = a2;
  this.context = b;
  this.refs = D$2;
  this.updater = e2 || B$1;
}
E$2.prototype.isReactComponent = {};
E$2.prototype.setState = function(a2, b) {
  if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a2, b, "setState");
};
E$2.prototype.forceUpdate = function(a2) {
  this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
};
function F$1() {
}
F$1.prototype = E$2.prototype;
function G$1(a2, b, e2) {
  this.props = a2;
  this.context = b;
  this.refs = D$2;
  this.updater = e2 || B$1;
}
var H$2 = G$1.prototype = new F$1();
H$2.constructor = G$1;
C$2(H$2, E$2.prototype);
H$2.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$2 = { key: true, ref: true, __self: true, __source: true };
function M$1(a2, b, e2) {
  var d2, c2 = {}, k2 = null, h2 = null;
  if (null != b) for (d2 in void 0 !== b.ref && (h2 = b.ref), void 0 !== b.key && (k2 = "" + b.key), b) J.call(b, d2) && !L$2.hasOwnProperty(d2) && (c2[d2] = b[d2]);
  var g2 = arguments.length - 2;
  if (1 === g2) c2.children = e2;
  else if (1 < g2) {
    for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++) f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a2 && a2.defaultProps) for (d2 in g2 = a2.defaultProps, g2) void 0 === c2[d2] && (c2[d2] = g2[d2]);
  return { $$typeof: l$2, type: a2, key: k2, ref: h2, props: c2, _owner: K$1.current };
}
function N$2(a2, b) {
  return { $$typeof: l$2, type: a2.type, key: b, ref: a2.ref, props: a2.props, _owner: a2._owner };
}
function O$1(a2) {
  return "object" === typeof a2 && null !== a2 && a2.$$typeof === l$2;
}
function escape(a2) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a2.replace(/[=:]/g, function(a3) {
    return b[a3];
  });
}
var P$2 = /\/+/g;
function Q$2(a2, b) {
  return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b.toString(36);
}
function R$1(a2, b, e2, d2, c2) {
  var k2 = typeof a2;
  if ("undefined" === k2 || "boolean" === k2) a2 = null;
  var h2 = false;
  if (null === a2) h2 = true;
  else switch (k2) {
    case "string":
    case "number":
      h2 = true;
      break;
    case "object":
      switch (a2.$$typeof) {
        case l$2:
        case n$3:
          h2 = true;
      }
  }
  if (h2) return h2 = a2, c2 = c2(h2), a2 = "" === d2 ? "." + Q$2(h2, 0) : d2, I$1(c2) ? (e2 = "", null != a2 && (e2 = a2.replace(P$2, "$&/") + "/"), R$1(c2, b, e2, "", function(a3) {
    return a3;
  })) : null != c2 && (O$1(c2) && (c2 = N$2(c2, e2 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P$2, "$&/") + "/") + a2)), b.push(c2)), 1;
  h2 = 0;
  d2 = "" === d2 ? "." : d2 + ":";
  if (I$1(a2)) for (var g2 = 0; g2 < a2.length; g2++) {
    k2 = a2[g2];
    var f2 = d2 + Q$2(k2, g2);
    h2 += R$1(k2, b, e2, f2, c2);
  }
  else if (f2 = A$1(a2), "function" === typeof f2) for (a2 = f2.call(a2), g2 = 0; !(k2 = a2.next()).done; ) k2 = k2.value, f2 = d2 + Q$2(k2, g2++), h2 += R$1(k2, b, e2, f2, c2);
  else if ("object" === k2) throw b = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h2;
}
function S$2(a2, b, e2) {
  if (null == a2) return a2;
  var d2 = [], c2 = 0;
  R$1(a2, d2, "", "", function(a3) {
    return b.call(e2, a3, c2++);
  });
  return d2;
}
function T$1(a2) {
  if (-1 === a2._status) {
    var b = a2._result;
    b = b();
    b.then(function(b2) {
      if (0 === a2._status || -1 === a2._status) a2._status = 1, a2._result = b2;
    }, function(b2) {
      if (0 === a2._status || -1 === a2._status) a2._status = 2, a2._result = b2;
    });
    -1 === a2._status && (a2._status = 0, a2._result = b);
  }
  if (1 === a2._status) return a2._result.default;
  throw a2._result;
}
var U$1 = { current: null }, V$2 = { transition: null }, W$2 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$2, ReactCurrentOwner: K$1 };
function X$1() {
  throw Error("act(...) is not supported in production builds of React.");
}
react_production_min.Children = { map: S$2, forEach: function(a2, b, e2) {
  S$2(a2, function() {
    b.apply(this, arguments);
  }, e2);
}, count: function(a2) {
  var b = 0;
  S$2(a2, function() {
    b++;
  });
  return b;
}, toArray: function(a2) {
  return S$2(a2, function(a3) {
    return a3;
  }) || [];
}, only: function(a2) {
  if (!O$1(a2)) throw Error("React.Children.only expected to receive a single React element child.");
  return a2;
} };
react_production_min.Component = E$2;
react_production_min.Fragment = p$3;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$1;
react_production_min.Suspense = w$2;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$2;
react_production_min.act = X$1;
react_production_min.cloneElement = function(a2, b, e2) {
  if (null === a2 || void 0 === a2) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
  var d2 = C$2({}, a2.props), c2 = a2.key, k2 = a2.ref, h2 = a2._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h2 = K$1.current);
    void 0 !== b.key && (c2 = "" + b.key);
    if (a2.type && a2.type.defaultProps) var g2 = a2.type.defaultProps;
    for (f2 in b) J.call(b, f2) && !L$2.hasOwnProperty(f2) && (d2[f2] = void 0 === b[f2] && void 0 !== g2 ? g2[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2) d2.children = e2;
  else if (1 < f2) {
    g2 = Array(f2);
    for (var m2 = 0; m2 < f2; m2++) g2[m2] = arguments[m2 + 2];
    d2.children = g2;
  }
  return { $$typeof: l$2, type: a2.type, key: c2, ref: k2, props: d2, _owner: h2 };
};
react_production_min.createContext = function(a2) {
  a2 = { $$typeof: u$1, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a2.Provider = { $$typeof: t$1, _context: a2 };
  return a2.Consumer = a2;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a2) {
  var b = M$1.bind(null, a2);
  b.type = a2;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a2) {
  return { $$typeof: v$2, render: a2 };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a2) {
  return { $$typeof: y, _payload: { _status: -1, _result: a2 }, _init: T$1 };
};
react_production_min.memo = function(a2, b) {
  return { $$typeof: x, type: a2, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a2) {
  var b = V$2.transition;
  V$2.transition = {};
  try {
    a2();
  } finally {
    V$2.transition = b;
  }
};
react_production_min.unstable_act = X$1;
react_production_min.useCallback = function(a2, b) {
  return U$1.current.useCallback(a2, b);
};
react_production_min.useContext = function(a2) {
  return U$1.current.useContext(a2);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a2) {
  return U$1.current.useDeferredValue(a2);
};
react_production_min.useEffect = function(a2, b) {
  return U$1.current.useEffect(a2, b);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a2, b, e2) {
  return U$1.current.useImperativeHandle(a2, b, e2);
};
react_production_min.useInsertionEffect = function(a2, b) {
  return U$1.current.useInsertionEffect(a2, b);
};
react_production_min.useLayoutEffect = function(a2, b) {
  return U$1.current.useLayoutEffect(a2, b);
};
react_production_min.useMemo = function(a2, b) {
  return U$1.current.useMemo(a2, b);
};
react_production_min.useReducer = function(a2, b, e2) {
  return U$1.current.useReducer(a2, b, e2);
};
react_production_min.useRef = function(a2) {
  return U$1.current.useRef(a2);
};
react_production_min.useState = function(a2) {
  return U$1.current.useState(a2);
};
react_production_min.useSyncExternalStore = function(a2, b, e2) {
  return U$1.current.useSyncExternalStore(a2, b, e2);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.3.1";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
const React$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: React
}, [reactExports]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$2 = reactExports, k$1 = Symbol.for("react.element"), l$1 = Symbol.for("react.fragment"), m$2 = Object.prototype.hasOwnProperty, n$2 = f$2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$2 = { key: true, ref: true, __self: true, __source: true };
function q(c2, a2, g2) {
  var b, d2 = {}, e2 = null, h2 = null;
  void 0 !== g2 && (e2 = "" + g2);
  void 0 !== a2.key && (e2 = "" + a2.key);
  void 0 !== a2.ref && (h2 = a2.ref);
  for (b in a2) m$2.call(a2, b) && !p$2.hasOwnProperty(b) && (d2[b] = a2[b]);
  if (c2 && c2.defaultProps) for (b in a2 = c2.defaultProps, a2) void 0 === d2[b] && (d2[b] = a2[b]);
  return { $$typeof: k$1, type: c2, key: e2, ref: h2, props: d2, _owner: n$2.current };
}
reactJsxRuntime_production_min.Fragment = l$1;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a2, b) {
    var c2 = a2.length;
    a2.push(b);
    a: for (; 0 < c2; ) {
      var d2 = c2 - 1 >>> 1, e2 = a2[d2];
      if (0 < g2(e2, b)) a2[d2] = b, a2[c2] = e2, c2 = d2;
      else break a;
    }
  }
  function h2(a2) {
    return 0 === a2.length ? null : a2[0];
  }
  function k2(a2) {
    if (0 === a2.length) return null;
    var b = a2[0], c2 = a2.pop();
    if (c2 !== b) {
      a2[0] = c2;
      a: for (var d2 = 0, e2 = a2.length, w2 = e2 >>> 1; d2 < w2; ) {
        var m2 = 2 * (d2 + 1) - 1, C2 = a2[m2], n2 = m2 + 1, x2 = a2[n2];
        if (0 > g2(C2, c2)) n2 < e2 && 0 > g2(x2, C2) ? (a2[d2] = x2, a2[n2] = c2, d2 = n2) : (a2[d2] = C2, a2[m2] = c2, d2 = m2);
        else if (n2 < e2 && 0 > g2(x2, c2)) a2[d2] = x2, a2[n2] = c2, d2 = n2;
        else break a;
      }
    }
    return b;
  }
  function g2(a2, b) {
    var c2 = a2.sortIndex - b.sortIndex;
    return 0 !== c2 ? c2 : a2.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a2) {
    for (var b = h2(t2); null !== b; ) {
      if (null === b.callback) k2(t2);
      else if (b.startTime <= a2) k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else break;
      b = h2(t2);
    }
  }
  function H2(a2) {
    B2 = false;
    G2(a2);
    if (!A2) if (null !== h2(r2)) A2 = true, I2(J2);
    else {
      var b = h2(t2);
      null !== b && K2(H2, b.startTime - a2);
    }
  }
  function J2(a2, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c2 = y2;
    try {
      G2(b);
      for (v2 = h2(r2); null !== v2 && (!(v2.expirationTime > b) || a2 && !M2()); ) {
        var d2 = v2.callback;
        if ("function" === typeof d2) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d2(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e2 ? v2.callback = e2 : v2 === h2(r2) && k2(r2);
          G2(b);
        } else k2(r2);
        v2 = h2(r2);
      }
      if (null !== v2) var w2 = true;
      else {
        var m2 = h2(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a2 = exports.unstable_now();
      Q2 = a2;
      var b = true;
      try {
        b = O2(true, a2);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else N2 = false;
  }
  var S2;
  if ("function" === typeof F2) S2 = function() {
    F2(R2);
  };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else S2 = function() {
    D2(R2, 0);
  };
  function I2(a2) {
    O2 = a2;
    N2 || (N2 = true, S2());
  }
  function K2(a2, b) {
    L2 = D2(function() {
      a2(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a2) {
    a2.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a2) {
    0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a2 ? Math.floor(1e3 / a2) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h2(r2);
  };
  exports.unstable_next = function(a2) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c2 = y2;
    y2 = b;
    try {
      return a2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a2, b) {
    switch (a2) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a2 = 3;
    }
    var c2 = y2;
    y2 = a2;
    try {
      return b();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a2, b, c2) {
    var d2 = exports.unstable_now();
    "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
    switch (a2) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c2 + e2;
    a2 = { id: u2++, callback: b, priorityLevel: a2, startTime: c2, expirationTime: e2, sortIndex: -1 };
    c2 > d2 ? (a2.sortIndex = c2, f2(t2, a2), null === h2(r2) && a2 === h2(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d2))) : (a2.sortIndex = e2, f2(r2, a2), A2 || z2 || (A2 = true, I2(J2)));
    return a2;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a2) {
    var b = y2;
    return function() {
      var c2 = y2;
      y2 = b;
      try {
        return a2.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p$1(a2) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++) b += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a2 + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a2, b) {
  ha(a2, b);
  ha(a2 + "Capture", b);
}
function ha(a2, b) {
  ea[a2] = b;
  for (a2 = 0; a2 < b.length; a2++) da.add(b[a2]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a2) {
  if (ja.call(ma, a2)) return true;
  if (ja.call(la, a2)) return false;
  if (ka.test(a2)) return ma[a2] = true;
  la[a2] = true;
  return false;
}
function pa(a2, b, c2, d2) {
  if (null !== c2 && 0 === c2.type) return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d2) return false;
      if (null !== c2) return !c2.acceptsBooleans;
      a2 = a2.toLowerCase().slice(0, 5);
      return "data-" !== a2 && "aria-" !== a2;
    default:
      return false;
  }
}
function qa(a2, b, c2, d2) {
  if (null === b || "undefined" === typeof b || pa(a2, b, c2, d2)) return true;
  if (d2) return false;
  if (null !== c2) switch (c2.type) {
    case 3:
      return !b;
    case 4:
      return false === b;
    case 5:
      return isNaN(b);
    case 6:
      return isNaN(b) || 1 > b;
  }
  return false;
}
function v$1(a2, b, c2, d2, e2, f2, g2) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d2;
  this.attributeNamespace = e2;
  this.mustUseProperty = c2;
  this.propertyName = a2;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g2;
}
var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
  z[a2] = new v$1(a2, 0, false, a2, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
  var b = a2[0];
  z[b] = new v$1(b, 1, false, a2[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
  z[a2] = new v$1(a2, 2, false, a2.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
  z[a2] = new v$1(a2, 2, false, a2, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
  z[a2] = new v$1(a2, 3, false, a2.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a2) {
  z[a2] = new v$1(a2, 3, true, a2, null, false, false);
});
["capture", "download"].forEach(function(a2) {
  z[a2] = new v$1(a2, 4, false, a2, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a2) {
  z[a2] = new v$1(a2, 6, false, a2, null, false, false);
});
["rowSpan", "start"].forEach(function(a2) {
  z[a2] = new v$1(a2, 5, false, a2.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a2) {
  return a2[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
  var b = a2.replace(
    ra,
    sa
  );
  z[b] = new v$1(b, 1, false, a2, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
  var b = a2.replace(ra, sa);
  z[b] = new v$1(b, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
  var b = a2.replace(ra, sa);
  z[b] = new v$1(b, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a2) {
  z[a2] = new v$1(a2, 1, false, a2.toLowerCase(), null, false, false);
});
z.xlinkHref = new v$1("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a2) {
  z[a2] = new v$1(a2, 1, false, a2.toLowerCase(), null, true, true);
});
function ta(a2, b, c2, d2) {
  var e2 = z.hasOwnProperty(b) ? z[b] : null;
  if (null !== e2 ? 0 !== e2.type : d2 || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c2, e2, d2) && (c2 = null), d2 || null === e2 ? oa(b) && (null === c2 ? a2.removeAttribute(b) : a2.setAttribute(b, "" + c2)) : e2.mustUseProperty ? a2[e2.propertyName] = null === c2 ? 3 === e2.type ? false : "" : c2 : (b = e2.attributeName, d2 = e2.attributeNamespace, null === c2 ? a2.removeAttribute(b) : (e2 = e2.type, c2 = 3 === e2 || 4 === e2 && true === c2 ? "" : "" + c2, d2 ? a2.setAttributeNS(d2, b, c2) : a2.setAttribute(b, c2)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a2) {
  if (null === a2 || "object" !== typeof a2) return null;
  a2 = Ja && a2[Ja] || a2["@@iterator"];
  return "function" === typeof a2 ? a2 : null;
}
var A = Object.assign, La;
function Ma(a2) {
  if (void 0 === La) try {
    throw Error();
  } catch (c2) {
    var b = c2.stack.trim().match(/\n( *(at )?)/);
    La = b && b[1] || "";
  }
  return "\n" + La + a2;
}
var Na = false;
function Oa(a2, b) {
  if (!a2 || Na) return "";
  Na = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b) if (b = function() {
      throw Error();
    }, Object.defineProperty(b.prototype, "props", { set: function() {
      throw Error();
    } }), "object" === typeof Reflect && Reflect.construct) {
      try {
        Reflect.construct(b, []);
      } catch (l2) {
        var d2 = l2;
      }
      Reflect.construct(a2, [], b);
    } else {
      try {
        b.call();
      } catch (l2) {
        d2 = l2;
      }
      a2.call(b.prototype);
    }
    else {
      try {
        throw Error();
      } catch (l2) {
        d2 = l2;
      }
      a2();
    }
  } catch (l2) {
    if (l2 && d2 && "string" === typeof l2.stack) {
      for (var e2 = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e2.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e2[g2] !== f2[h2]; ) h2--;
      for (; 1 <= g2 && 0 <= h2; g2--, h2--) if (e2[g2] !== f2[h2]) {
        if (1 !== g2 || 1 !== h2) {
          do
            if (g2--, h2--, 0 > h2 || e2[g2] !== f2[h2]) {
              var k2 = "\n" + e2[g2].replace(" at new ", " at ");
              a2.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a2.displayName));
              return k2;
            }
          while (1 <= g2 && 0 <= h2);
        }
        break;
      }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c2;
  }
  return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
}
function Pa(a2) {
  switch (a2.tag) {
    case 5:
      return Ma(a2.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a2 = Oa(a2.type, false), a2;
    case 11:
      return a2 = Oa(a2.type.render, false), a2;
    case 1:
      return a2 = Oa(a2.type, true), a2;
    default:
      return "";
  }
}
function Qa(a2) {
  if (null == a2) return null;
  if ("function" === typeof a2) return a2.displayName || a2.name || null;
  if ("string" === typeof a2) return a2;
  switch (a2) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a2) switch (a2.$$typeof) {
    case Ca:
      return (a2.displayName || "Context") + ".Consumer";
    case Ba:
      return (a2._context.displayName || "Context") + ".Provider";
    case Da:
      var b = a2.render;
      a2 = a2.displayName;
      a2 || (a2 = b.displayName || b.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
      return a2;
    case Ga:
      return b = a2.displayName || null, null !== b ? b : Qa(a2.type) || "Memo";
    case Ha:
      b = a2._payload;
      a2 = a2._init;
      try {
        return Qa(a2(b));
      } catch (c2) {
      }
  }
  return null;
}
function Ra(a2) {
  var b = a2.type;
  switch (a2.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a2 = b.render, a2 = a2.displayName || a2.name || "", b.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b) return b.displayName || b.name || null;
      if ("string" === typeof b) return b;
  }
  return null;
}
function Sa(a2) {
  switch (typeof a2) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a2;
    case "object":
      return a2;
    default:
      return "";
  }
}
function Ta(a2) {
  var b = a2.type;
  return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a2) {
  var b = Ta(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b), d2 = "" + a2[b];
  if (!a2.hasOwnProperty(b) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
    var e2 = c2.get, f2 = c2.set;
    Object.defineProperty(a2, b, { configurable: true, get: function() {
      return e2.call(this);
    }, set: function(a3) {
      d2 = "" + a3;
      f2.call(this, a3);
    } });
    Object.defineProperty(a2, b, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d2;
    }, setValue: function(a3) {
      d2 = "" + a3;
    }, stopTracking: function() {
      a2._valueTracker = null;
      delete a2[b];
    } };
  }
}
function Va(a2) {
  a2._valueTracker || (a2._valueTracker = Ua(a2));
}
function Wa(a2) {
  if (!a2) return false;
  var b = a2._valueTracker;
  if (!b) return true;
  var c2 = b.getValue();
  var d2 = "";
  a2 && (d2 = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
  a2 = d2;
  return a2 !== c2 ? (b.setValue(a2), true) : false;
}
function Xa(a2) {
  a2 = a2 || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a2) return null;
  try {
    return a2.activeElement || a2.body;
  } catch (b) {
    return a2.body;
  }
}
function Ya(a2, b) {
  var c2 = b.checked;
  return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
}
function Za(a2, b) {
  var c2 = null == b.defaultValue ? "" : b.defaultValue, d2 = null != b.checked ? b.checked : b.defaultChecked;
  c2 = Sa(null != b.value ? b.value : c2);
  a2._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a2, b) {
  b = b.checked;
  null != b && ta(a2, "checked", b, false);
}
function bb(a2, b) {
  ab(a2, b);
  var c2 = Sa(b.value), d2 = b.type;
  if (null != c2) if ("number" === d2) {
    if (0 === c2 && "" === a2.value || a2.value != c2) a2.value = "" + c2;
  } else a2.value !== "" + c2 && (a2.value = "" + c2);
  else if ("submit" === d2 || "reset" === d2) {
    a2.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a2, b.type, c2) : b.hasOwnProperty("defaultValue") && cb(a2, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a2.defaultChecked = !!b.defaultChecked);
}
function db(a2, b, c2) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d2 = b.type;
    if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b.value && null !== b.value)) return;
    b = "" + a2._wrapperState.initialValue;
    c2 || b === a2.value || (a2.value = b);
    a2.defaultValue = b;
  }
  c2 = a2.name;
  "" !== c2 && (a2.name = "");
  a2.defaultChecked = !!a2._wrapperState.initialChecked;
  "" !== c2 && (a2.name = c2);
}
function cb(a2, b, c2) {
  if ("number" !== b || Xa(a2.ownerDocument) !== a2) null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
}
var eb = Array.isArray;
function fb(a2, b, c2, d2) {
  a2 = a2.options;
  if (b) {
    b = {};
    for (var e2 = 0; e2 < c2.length; e2++) b["$" + c2[e2]] = true;
    for (c2 = 0; c2 < a2.length; c2++) e2 = b.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e2 && (a2[c2].selected = e2), e2 && d2 && (a2[c2].defaultSelected = true);
  } else {
    c2 = "" + Sa(c2);
    b = null;
    for (e2 = 0; e2 < a2.length; e2++) {
      if (a2[e2].value === c2) {
        a2[e2].selected = true;
        d2 && (a2[e2].defaultSelected = true);
        return;
      }
      null !== b || a2[e2].disabled || (b = a2[e2]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a2, b) {
  if (null != b.dangerouslySetInnerHTML) throw Error(p$1(91));
  return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
}
function hb(a2, b) {
  var c2 = b.value;
  if (null == c2) {
    c2 = b.children;
    b = b.defaultValue;
    if (null != c2) {
      if (null != b) throw Error(p$1(92));
      if (eb(c2)) {
        if (1 < c2.length) throw Error(p$1(93));
        c2 = c2[0];
      }
      b = c2;
    }
    null == b && (b = "");
    c2 = b;
  }
  a2._wrapperState = { initialValue: Sa(c2) };
}
function ib(a2, b) {
  var c2 = Sa(b.value), d2 = Sa(b.defaultValue);
  null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
  null != d2 && (a2.defaultValue = "" + d2);
}
function jb(a2) {
  var b = a2.textContent;
  b === a2._wrapperState.initialValue && "" !== b && null !== b && (a2.value = b);
}
function kb(a2) {
  switch (a2) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a2, b) {
  return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb(b) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a2;
}
var mb, nb = function(a2) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c2, d2, e2) {
    MSApp.execUnsafeLocalFunction(function() {
      return a2(b, c2, d2, e2);
    });
  } : a2;
}(function(a2, b) {
  if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2) a2.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a2.firstChild; ) a2.removeChild(a2.firstChild);
    for (; b.firstChild; ) a2.appendChild(b.firstChild);
  }
});
function ob(a2, b) {
  if (b) {
    var c2 = a2.firstChild;
    if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
      c2.nodeValue = b;
      return;
    }
  }
  a2.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a2) {
  qb.forEach(function(b) {
    b = b + a2.charAt(0).toUpperCase() + a2.substring(1);
    pb[b] = pb[a2];
  });
});
function rb(a2, b, c2) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c2 || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b).trim() : b + "px";
}
function sb(a2, b) {
  a2 = a2.style;
  for (var c2 in b) if (b.hasOwnProperty(c2)) {
    var d2 = 0 === c2.indexOf("--"), e2 = rb(c2, b[c2], d2);
    "float" === c2 && (c2 = "cssFloat");
    d2 ? a2.setProperty(c2, e2) : a2[c2] = e2;
  }
}
var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a2, b) {
  if (b) {
    if (tb[a2] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p$1(137, a2));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children) throw Error(p$1(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p$1(61));
    }
    if (null != b.style && "object" !== typeof b.style) throw Error(p$1(62));
  }
}
function vb(a2, b) {
  if (-1 === a2.indexOf("-")) return "string" === typeof b.is;
  switch (a2) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a2) {
  a2 = a2.target || a2.srcElement || window;
  a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
  return 3 === a2.nodeType ? a2.parentNode : a2;
}
var yb = null, zb = null, Ab = null;
function Bb(a2) {
  if (a2 = Cb(a2)) {
    if ("function" !== typeof yb) throw Error(p$1(280));
    var b = a2.stateNode;
    b && (b = Db(b), yb(a2.stateNode, a2.type, b));
  }
}
function Eb(a2) {
  zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
}
function Fb() {
  if (zb) {
    var a2 = zb, b = Ab;
    Ab = zb = null;
    Bb(a2);
    if (b) for (a2 = 0; a2 < b.length; a2++) Bb(b[a2]);
  }
}
function Gb(a2, b) {
  return a2(b);
}
function Hb() {
}
var Ib = false;
function Jb(a2, b, c2) {
  if (Ib) return a2(b, c2);
  Ib = true;
  try {
    return Gb(a2, b, c2);
  } finally {
    if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
  }
}
function Kb(a2, b) {
  var c2 = a2.stateNode;
  if (null === c2) return null;
  var d2 = Db(c2);
  if (null === d2) return null;
  c2 = d2[b];
  a: switch (b) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (d2 = !d2.disabled) || (a2 = a2.type, d2 = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
      a2 = !d2;
      break a;
    default:
      a2 = false;
  }
  if (a2) return null;
  if (c2 && "function" !== typeof c2) throw Error(p$1(231, b, typeof c2));
  return c2;
}
var Lb = false;
if (ia) try {
  var Mb = {};
  Object.defineProperty(Mb, "passive", { get: function() {
    Lb = true;
  } });
  window.addEventListener("test", Mb, Mb);
  window.removeEventListener("test", Mb, Mb);
} catch (a2) {
  Lb = false;
}
function Nb(a2, b, c2, d2, e2, f2, g2, h2, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a2) {
  Ob = true;
  Pb = a2;
} };
function Tb(a2, b, c2, d2, e2, f2, g2, h2, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a2, b, c2, d2, e2, f2, g2, h2, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else throw Error(p$1(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a2) {
  var b = a2, c2 = a2;
  if (a2.alternate) for (; b.return; ) b = b.return;
  else {
    a2 = b;
    do
      b = a2, 0 !== (b.flags & 4098) && (c2 = b.return), a2 = b.return;
    while (a2);
  }
  return 3 === b.tag ? c2 : null;
}
function Wb(a2) {
  if (13 === a2.tag) {
    var b = a2.memoizedState;
    null === b && (a2 = a2.alternate, null !== a2 && (b = a2.memoizedState));
    if (null !== b) return b.dehydrated;
  }
  return null;
}
function Xb(a2) {
  if (Vb(a2) !== a2) throw Error(p$1(188));
}
function Yb(a2) {
  var b = a2.alternate;
  if (!b) {
    b = Vb(a2);
    if (null === b) throw Error(p$1(188));
    return b !== a2 ? null : a2;
  }
  for (var c2 = a2, d2 = b; ; ) {
    var e2 = c2.return;
    if (null === e2) break;
    var f2 = e2.alternate;
    if (null === f2) {
      d2 = e2.return;
      if (null !== d2) {
        c2 = d2;
        continue;
      }
      break;
    }
    if (e2.child === f2.child) {
      for (f2 = e2.child; f2; ) {
        if (f2 === c2) return Xb(e2), a2;
        if (f2 === d2) return Xb(e2), b;
        f2 = f2.sibling;
      }
      throw Error(p$1(188));
    }
    if (c2.return !== d2.return) c2 = e2, d2 = f2;
    else {
      for (var g2 = false, h2 = e2.child; h2; ) {
        if (h2 === c2) {
          g2 = true;
          c2 = e2;
          d2 = f2;
          break;
        }
        if (h2 === d2) {
          g2 = true;
          d2 = e2;
          c2 = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g2) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c2) {
            g2 = true;
            c2 = f2;
            d2 = e2;
            break;
          }
          if (h2 === d2) {
            g2 = true;
            d2 = f2;
            c2 = e2;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g2) throw Error(p$1(189));
      }
    }
    if (c2.alternate !== d2) throw Error(p$1(190));
  }
  if (3 !== c2.tag) throw Error(p$1(188));
  return c2.stateNode.current === c2 ? a2 : b;
}
function Zb(a2) {
  a2 = Yb(a2);
  return null !== a2 ? $b(a2) : null;
}
function $b(a2) {
  if (5 === a2.tag || 6 === a2.tag) return a2;
  for (a2 = a2.child; null !== a2; ) {
    var b = $b(a2);
    if (null !== b) return b;
    a2 = a2.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a2) {
  if (lc && "function" === typeof lc.onCommitFiberRoot) try {
    lc.onCommitFiberRoot(kc, a2, void 0, 128 === (a2.current.flags & 128));
  } catch (b) {
  }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a2) {
  a2 >>>= 0;
  return 0 === a2 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a2) {
  switch (a2 & -a2) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a2 & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a2 & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a2;
  }
}
function uc(a2, b) {
  var c2 = a2.pendingLanes;
  if (0 === c2) return 0;
  var d2 = 0, e2 = a2.suspendedLanes, f2 = a2.pingedLanes, g2 = c2 & 268435455;
  if (0 !== g2) {
    var h2 = g2 & ~e2;
    0 !== h2 ? d2 = tc(h2) : (f2 &= g2, 0 !== f2 && (d2 = tc(f2)));
  } else g2 = c2 & ~e2, 0 !== g2 ? d2 = tc(g2) : 0 !== f2 && (d2 = tc(f2));
  if (0 === d2) return 0;
  if (0 !== b && b !== d2 && 0 === (b & e2) && (e2 = d2 & -d2, f2 = b & -b, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240))) return b;
  0 !== (d2 & 4) && (d2 |= c2 & 16);
  b = a2.entangledLanes;
  if (0 !== b) for (a2 = a2.entanglements, b &= d2; 0 < b; ) c2 = 31 - oc(b), e2 = 1 << c2, d2 |= a2[c2], b &= ~e2;
  return d2;
}
function vc(a2, b) {
  switch (a2) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a2, b) {
  for (var c2 = a2.suspendedLanes, d2 = a2.pingedLanes, e2 = a2.expirationTimes, f2 = a2.pendingLanes; 0 < f2; ) {
    var g2 = 31 - oc(f2), h2 = 1 << g2, k2 = e2[g2];
    if (-1 === k2) {
      if (0 === (h2 & c2) || 0 !== (h2 & d2)) e2[g2] = vc(h2, b);
    } else k2 <= b && (a2.expiredLanes |= h2);
    f2 &= ~h2;
  }
}
function xc(a2) {
  a2 = a2.pendingLanes & -1073741825;
  return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a2 = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a2;
}
function zc(a2) {
  for (var b = [], c2 = 0; 31 > c2; c2++) b.push(a2);
  return b;
}
function Ac(a2, b, c2) {
  a2.pendingLanes |= b;
  536870912 !== b && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
  a2 = a2.eventTimes;
  b = 31 - oc(b);
  a2[b] = c2;
}
function Bc(a2, b) {
  var c2 = a2.pendingLanes & ~b;
  a2.pendingLanes = b;
  a2.suspendedLanes = 0;
  a2.pingedLanes = 0;
  a2.expiredLanes &= b;
  a2.mutableReadLanes &= b;
  a2.entangledLanes &= b;
  b = a2.entanglements;
  var d2 = a2.eventTimes;
  for (a2 = a2.expirationTimes; 0 < c2; ) {
    var e2 = 31 - oc(c2), f2 = 1 << e2;
    b[e2] = 0;
    d2[e2] = -1;
    a2[e2] = -1;
    c2 &= ~f2;
  }
}
function Cc(a2, b) {
  var c2 = a2.entangledLanes |= b;
  for (a2 = a2.entanglements; c2; ) {
    var d2 = 31 - oc(c2), e2 = 1 << d2;
    e2 & b | a2[d2] & b && (a2[d2] |= b);
    c2 &= ~e2;
  }
}
var C$1 = 0;
function Dc(a2) {
  a2 &= -a2;
  return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a2, b) {
  switch (a2) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a2, b, c2, d2, e2, f2) {
  if (null === a2 || a2.nativeEvent !== f2) return a2 = { blockedOn: b, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e2] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a2;
  a2.eventSystemFlags |= d2;
  b = a2.targetContainers;
  null !== e2 && -1 === b.indexOf(e2) && b.push(e2);
  return a2;
}
function Uc(a2, b, c2, d2, e2) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a2, b, c2, d2, e2), true;
    case "dragenter":
      return Mc = Tc(Mc, a2, b, c2, d2, e2), true;
    case "mouseover":
      return Nc = Tc(Nc, a2, b, c2, d2, e2), true;
    case "pointerover":
      var f2 = e2.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a2, b, c2, d2, e2));
      return true;
    case "gotpointercapture":
      return f2 = e2.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a2, b, c2, d2, e2)), true;
  }
  return false;
}
function Vc(a2) {
  var b = Wc(a2.target);
  if (null !== b) {
    var c2 = Vb(b);
    if (null !== c2) {
      if (b = c2.tag, 13 === b) {
        if (b = Wb(c2), null !== b) {
          a2.blockedOn = b;
          Ic(a2.priority, function() {
            Gc(c2);
          });
          return;
        }
      } else if (3 === b && c2.stateNode.current.memoizedState.isDehydrated) {
        a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a2.blockedOn = null;
}
function Xc(a2) {
  if (null !== a2.blockedOn) return false;
  for (var b = a2.targetContainers; 0 < b.length; ) {
    var c2 = Yc(a2.domEventName, a2.eventSystemFlags, b[0], a2.nativeEvent);
    if (null === c2) {
      c2 = a2.nativeEvent;
      var d2 = new c2.constructor(c2.type, c2);
      wb = d2;
      c2.target.dispatchEvent(d2);
      wb = null;
    } else return b = Cb(c2), null !== b && Fc(b), a2.blockedOn = c2, false;
    b.shift();
  }
  return true;
}
function Zc(a2, b, c2) {
  Xc(a2) && c2.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a2, b) {
  a2.blockedOn === b && (a2.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a2) {
  function b(b2) {
    return ad(b2, a2);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a2);
    for (var c2 = 1; c2 < Kc.length; c2++) {
      var d2 = Kc[c2];
      d2.blockedOn === a2 && (d2.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a2);
  null !== Mc && ad(Mc, a2);
  null !== Nc && ad(Nc, a2);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c2 = 0; c2 < Qc.length; c2++) d2 = Qc[c2], d2.blockedOn === a2 && (d2.blockedOn = null);
  for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); ) Vc(c2), null === c2.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a2, b, c2, d2) {
  var e2 = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 1, fd(a2, b, c2, d2);
  } finally {
    C$1 = e2, cd.transition = f2;
  }
}
function gd(a2, b, c2, d2) {
  var e2 = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 4, fd(a2, b, c2, d2);
  } finally {
    C$1 = e2, cd.transition = f2;
  }
}
function fd(a2, b, c2, d2) {
  if (dd) {
    var e2 = Yc(a2, b, c2, d2);
    if (null === e2) hd(a2, b, d2, id, c2), Sc(a2, d2);
    else if (Uc(e2, a2, b, c2, d2)) d2.stopPropagation();
    else if (Sc(a2, d2), b & 4 && -1 < Rc.indexOf(a2)) {
      for (; null !== e2; ) {
        var f2 = Cb(e2);
        null !== f2 && Ec(f2);
        f2 = Yc(a2, b, c2, d2);
        null === f2 && hd(a2, b, d2, id, c2);
        if (f2 === e2) break;
        e2 = f2;
      }
      null !== e2 && d2.stopPropagation();
    } else hd(a2, b, d2, null, c2);
  }
}
var id = null;
function Yc(a2, b, c2, d2) {
  id = null;
  a2 = xb(d2);
  a2 = Wc(a2);
  if (null !== a2) if (b = Vb(a2), null === b) a2 = null;
  else if (c2 = b.tag, 13 === c2) {
    a2 = Wb(b);
    if (null !== a2) return a2;
    a2 = null;
  } else if (3 === c2) {
    if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
    a2 = null;
  } else b !== a2 && (a2 = null);
  id = a2;
  return null;
}
function jd(a2) {
  switch (a2) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md) return md;
  var a2, b = ld, c2 = b.length, d2, e2 = "value" in kd ? kd.value : kd.textContent, f2 = e2.length;
  for (a2 = 0; a2 < c2 && b[a2] === e2[a2]; a2++) ;
  var g2 = c2 - a2;
  for (d2 = 1; d2 <= g2 && b[c2 - d2] === e2[f2 - d2]; d2++) ;
  return md = e2.slice(a2, 1 < d2 ? 1 - d2 : void 0);
}
function od(a2) {
  var b = a2.keyCode;
  "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b && (a2 = 13)) : a2 = b;
  10 === a2 && (a2 = 13);
  return 32 <= a2 || 13 === a2 ? a2 : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a2) {
  function b(b2, d2, e2, f2, g2) {
    this._reactName = b2;
    this._targetInst = e2;
    this.type = d2;
    this.nativeEvent = f2;
    this.target = g2;
    this.currentTarget = null;
    for (var c2 in a2) a2.hasOwnProperty(c2) && (b2 = a2[c2], this[c2] = b2 ? b2(f2) : f2[c2]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a3 = this.nativeEvent;
    a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a3 = this.nativeEvent;
    a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
  return a2.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
  return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
}, movementX: function(a2) {
  if ("movementX" in a2) return a2.movementX;
  a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
  return wd;
}, movementY: function(a2) {
  return "movementY" in a2 ? a2.movementY : xd;
} }), Bd = rd(Ad), Cd = A({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A({}, sd, { clipboardData: function(a2) {
  return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a2) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a2) : (a2 = Od[a2]) ? !!b[a2] : false;
}
function zd() {
  return Pd;
}
var Qd = A({}, ud, { key: function(a2) {
  if (a2.key) {
    var b = Md[a2.key] || a2.key;
    if ("Unidentified" !== b) return b;
  }
  return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
  return "keypress" === a2.type ? od(a2) : 0;
}, keyCode: function(a2) {
  return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
}, which: function(a2) {
  return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
} }), Rd = rd(Qd), Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A({}, Ad, {
  deltaX: function(a2) {
    return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
  },
  deltaY: function(a2) {
    return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be$1 = null;
ia && "documentMode" in document && (be$1 = document.documentMode);
var ce$1 = ia && "TextEvent" in window && !be$1, de$1 = ia && (!ae || be$1 && 8 < be$1 && 11 >= be$1), ee = String.fromCharCode(32), fe = false;
function ge$1(a2, b) {
  switch (a2) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he$1(a2) {
  a2 = a2.detail;
  return "object" === typeof a2 && "data" in a2 ? a2.data : null;
}
var ie$1 = false;
function je(a2, b) {
  switch (a2) {
    case "compositionend":
      return he$1(b);
    case "keypress":
      if (32 !== b.which) return null;
      fe = true;
      return ee;
    case "textInput":
      return a2 = b.data, a2 === ee && fe ? null : a2;
    default:
      return null;
  }
}
function ke$1(a2, b) {
  if (ie$1) return "compositionend" === a2 || !ae && ge$1(a2, b) ? (a2 = nd(), md = ld = kd = null, ie$1 = false, a2) : null;
  switch (a2) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length) return b.char;
        if (b.which) return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de$1 && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le$1 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me$1(a2) {
  var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return "input" === b ? !!le$1[a2.type] : "textarea" === b ? true : false;
}
function ne(a2, b, c2, d2) {
  Eb(d2);
  b = oe(b, "onChange");
  0 < b.length && (c2 = new td("onChange", "change", null, c2, d2), a2.push({ event: c2, listeners: b }));
}
var pe = null, qe = null;
function re$1(a2) {
  se$1(a2, 0);
}
function te(a2) {
  var b = ue(a2);
  if (Wa(b)) return a2;
}
function ve$1(a2, b) {
  if ("change" === a2) return b;
}
var we$1 = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else xe = false;
  we$1 = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae$1() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a2) {
  if ("value" === a2.propertyName && te(qe)) {
    var b = [];
    ne(b, qe, a2, xb(a2));
    Jb(re$1, b);
  }
}
function Ce$1(a2, b, c2) {
  "focusin" === a2 ? (Ae$1(), pe = b, qe = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a2 && Ae$1();
}
function De$1(a2) {
  if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2) return te(qe);
}
function Ee$1(a2, b) {
  if ("click" === a2) return te(b);
}
function Fe$1(a2, b) {
  if ("input" === a2 || "change" === a2) return te(b);
}
function Ge(a2, b) {
  return a2 === b && (0 !== a2 || 1 / a2 === 1 / b) || a2 !== a2 && b !== b;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie$1(a2, b) {
  if (He(a2, b)) return true;
  if ("object" !== typeof a2 || null === a2 || "object" !== typeof b || null === b) return false;
  var c2 = Object.keys(a2), d2 = Object.keys(b);
  if (c2.length !== d2.length) return false;
  for (d2 = 0; d2 < c2.length; d2++) {
    var e2 = c2[d2];
    if (!ja.call(b, e2) || !He(a2[e2], b[e2])) return false;
  }
  return true;
}
function Je(a2) {
  for (; a2 && a2.firstChild; ) a2 = a2.firstChild;
  return a2;
}
function Ke(a2, b) {
  var c2 = Je(a2);
  a2 = 0;
  for (var d2; c2; ) {
    if (3 === c2.nodeType) {
      d2 = a2 + c2.textContent.length;
      if (a2 <= b && d2 >= b) return { node: c2, offset: b - a2 };
      a2 = d2;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Je(c2);
  }
}
function Le(a2, b) {
  return a2 && b ? a2 === b ? true : a2 && 3 === a2.nodeType ? false : b && 3 === b.nodeType ? Le(a2, b.parentNode) : "contains" in a2 ? a2.contains(b) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b) & 16) : false : false;
}
function Me$1() {
  for (var a2 = window, b = Xa(); b instanceof a2.HTMLIFrameElement; ) {
    try {
      var c2 = "string" === typeof b.contentWindow.location.href;
    } catch (d2) {
      c2 = false;
    }
    if (c2) a2 = b.contentWindow;
    else break;
    b = Xa(a2.document);
  }
  return b;
}
function Ne(a2) {
  var b = a2 && a2.nodeName && a2.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b || "true" === a2.contentEditable);
}
function Oe$1(a2) {
  var b = Me$1(), c2 = a2.focusedElem, d2 = a2.selectionRange;
  if (b !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
    if (null !== d2 && Ne(c2)) {
      if (b = d2.start, a2 = d2.end, void 0 === a2 && (a2 = b), "selectionStart" in c2) c2.selectionStart = b, c2.selectionEnd = Math.min(a2, c2.value.length);
      else if (a2 = (b = c2.ownerDocument || document) && b.defaultView || window, a2.getSelection) {
        a2 = a2.getSelection();
        var e2 = c2.textContent.length, f2 = Math.min(d2.start, e2);
        d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e2);
        !a2.extend && f2 > d2 && (e2 = d2, d2 = f2, f2 = e2);
        e2 = Ke(c2, f2);
        var g2 = Ke(
          c2,
          d2
        );
        e2 && g2 && (1 !== a2.rangeCount || a2.anchorNode !== e2.node || a2.anchorOffset !== e2.offset || a2.focusNode !== g2.node || a2.focusOffset !== g2.offset) && (b = b.createRange(), b.setStart(e2.node, e2.offset), a2.removeAllRanges(), f2 > d2 ? (a2.addRange(b), a2.extend(g2.node, g2.offset)) : (b.setEnd(g2.node, g2.offset), a2.addRange(b)));
      }
    }
    b = [];
    for (a2 = c2; a2 = a2.parentNode; ) 1 === a2.nodeType && b.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
    "function" === typeof c2.focus && c2.focus();
    for (c2 = 0; c2 < b.length; c2++) a2 = b[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
  }
}
var Pe$1 = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re$1 = null, Se$1 = null, Te$1 = false;
function Ue(a2, b, c2) {
  var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
  Te$1 || null == Qe || Qe !== Xa(d2) || (d2 = Qe, "selectionStart" in d2 && Ne(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Se$1 && Ie$1(Se$1, d2) || (Se$1 = d2, d2 = oe(Re$1, "onSelect"), 0 < d2.length && (b = new td("onSelect", "select", null, b, c2), a2.push({ event: b, listeners: d2 }), b.target = Qe)));
}
function Ve(a2, b) {
  var c2 = {};
  c2[a2.toLowerCase()] = b.toLowerCase();
  c2["Webkit" + a2] = "webkit" + b;
  c2["Moz" + a2] = "moz" + b;
  return c2;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a2) {
  if (Xe[a2]) return Xe[a2];
  if (!We[a2]) return a2;
  var b = We[a2], c2;
  for (c2 in b) if (b.hasOwnProperty(c2) && c2 in Ye) return Xe[a2] = b[c2];
  return a2;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a2, b) {
  df.set(a2, b);
  fa(b, [a2]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a2, b, c2) {
  var d2 = a2.type || "unknown-event";
  a2.currentTarget = c2;
  Ub(d2, b, void 0, a2);
  a2.currentTarget = null;
}
function se$1(a2, b) {
  b = 0 !== (b & 4);
  for (var c2 = 0; c2 < a2.length; c2++) {
    var d2 = a2[c2], e2 = d2.event;
    d2 = d2.listeners;
    a: {
      var f2 = void 0;
      if (b) for (var g2 = d2.length - 1; 0 <= g2; g2--) {
        var h2 = d2[g2], k2 = h2.instance, l2 = h2.currentTarget;
        h2 = h2.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h2, l2);
        f2 = k2;
      }
      else for (g2 = 0; g2 < d2.length; g2++) {
        h2 = d2[g2];
        k2 = h2.instance;
        l2 = h2.currentTarget;
        h2 = h2.listener;
        if (k2 !== f2 && e2.isPropagationStopped()) break a;
        nf(e2, h2, l2);
        f2 = k2;
      }
    }
  }
  if (Qb) throw a2 = Rb, Qb = false, Rb = null, a2;
}
function D$1(a2, b) {
  var c2 = b[of];
  void 0 === c2 && (c2 = b[of] = /* @__PURE__ */ new Set());
  var d2 = a2 + "__bubble";
  c2.has(d2) || (pf(b, a2, 2, false), c2.add(d2));
}
function qf(a2, b, c2) {
  var d2 = 0;
  b && (d2 |= 4);
  pf(c2, a2, d2, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a2) {
  if (!a2[rf]) {
    a2[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a2), qf(b2, true, a2));
    });
    var b = 9 === a2.nodeType ? a2 : a2.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a2, b, c2, d2) {
  switch (jd(b)) {
    case 1:
      var e2 = ed;
      break;
    case 4:
      e2 = gd;
      break;
    default:
      e2 = fd;
  }
  c2 = e2.bind(null, b, c2, a2);
  e2 = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e2 = true);
  d2 ? void 0 !== e2 ? a2.addEventListener(b, c2, { capture: true, passive: e2 }) : a2.addEventListener(b, c2, true) : void 0 !== e2 ? a2.addEventListener(b, c2, { passive: e2 }) : a2.addEventListener(b, c2, false);
}
function hd(a2, b, c2, d2, e2) {
  var f2 = d2;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d2) a: for (; ; ) {
    if (null === d2) return;
    var g2 = d2.tag;
    if (3 === g2 || 4 === g2) {
      var h2 = d2.stateNode.containerInfo;
      if (h2 === e2 || 8 === h2.nodeType && h2.parentNode === e2) break;
      if (4 === g2) for (g2 = d2.return; null !== g2; ) {
        var k2 = g2.tag;
        if (3 === k2 || 4 === k2) {
          if (k2 = g2.stateNode.containerInfo, k2 === e2 || 8 === k2.nodeType && k2.parentNode === e2) return;
        }
        g2 = g2.return;
      }
      for (; null !== h2; ) {
        g2 = Wc(h2);
        if (null === g2) return;
        k2 = g2.tag;
        if (5 === k2 || 6 === k2) {
          d2 = f2 = g2;
          continue a;
        }
        h2 = h2.parentNode;
      }
    }
    d2 = d2.return;
  }
  Jb(function() {
    var d3 = f2, e3 = xb(c2), g3 = [];
    a: {
      var h3 = df.get(a2);
      if (void 0 !== h3) {
        var k3 = td, n2 = a2;
        switch (a2) {
          case "keypress":
            if (0 === od(c2)) break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c2.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a2, x2 = t2 ? null !== h3 ? h3 + "Capture" : null : h3;
        t2 = [];
        for (var w2 = d3, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2) break;
          w2 = w2.return;
        }
        0 < t2.length && (h3 = new k3(h3, n2, null, c2, e3), g3.push({ event: h3, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h3 = "mouseover" === a2 || "pointerover" === a2;
        k3 = "mouseout" === a2 || "pointerout" === a2;
        if (h3 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf])) break a;
        if (k3 || h3) {
          h3 = e3.window === e3 ? e3 : (h3 = e3.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d3, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag)) n2 = null;
          } else k3 = null, n2 = d3;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a2 || "pointerover" === a2) t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h3 : ue(k3);
            u2 = null == n2 ? h3 : ue(n2);
            h3 = new t2(F2, w2 + "leave", k3, c2, e3);
            h3.target = J2;
            h3.relatedTarget = u2;
            F2 = null;
            Wc(e3) === d3 && (t2 = new t2(x2, w2 + "enter", n2, c2, e3), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2) b: {
              t2 = k3;
              x2 = n2;
              w2 = 0;
              for (u2 = t2; u2; u2 = vf(u2)) w2++;
              u2 = 0;
              for (F2 = x2; F2; F2 = vf(F2)) u2++;
              for (; 0 < w2 - u2; ) t2 = vf(t2), w2--;
              for (; 0 < u2 - w2; ) x2 = vf(x2), u2--;
              for (; w2--; ) {
                if (t2 === x2 || null !== x2 && t2 === x2.alternate) break b;
                t2 = vf(t2);
                x2 = vf(x2);
              }
              t2 = null;
            }
            else t2 = null;
            null !== k3 && wf(g3, h3, k3, t2, false);
            null !== n2 && null !== J2 && wf(g3, J2, n2, t2, true);
          }
        }
      }
      a: {
        h3 = d3 ? ue(d3) : window;
        k3 = h3.nodeName && h3.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h3.type) var na = ve$1;
        else if (me$1(h3)) if (we$1) na = Fe$1;
        else {
          na = De$1;
          var xa = Ce$1;
        }
        else (k3 = h3.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na = Ee$1);
        if (na && (na = na(a2, d3))) {
          ne(g3, na, c2, e3);
          break a;
        }
        xa && xa(a2, h3, d3);
        "focusout" === a2 && (xa = h3._wrapperState) && xa.controlled && "number" === h3.type && cb(h3, "number", h3.value);
      }
      xa = d3 ? ue(d3) : window;
      switch (a2) {
        case "focusin":
          if (me$1(xa) || "true" === xa.contentEditable) Qe = xa, Re$1 = d3, Se$1 = null;
          break;
        case "focusout":
          Se$1 = Re$1 = Qe = null;
          break;
        case "mousedown":
          Te$1 = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te$1 = false;
          Ue(g3, c2, e3);
          break;
        case "selectionchange":
          if (Pe$1) break;
        case "keydown":
        case "keyup":
          Ue(g3, c2, e3);
      }
      var $a;
      if (ae) b: {
        switch (a2) {
          case "compositionstart":
            var ba = "onCompositionStart";
            break b;
          case "compositionend":
            ba = "onCompositionEnd";
            break b;
          case "compositionupdate":
            ba = "onCompositionUpdate";
            break b;
        }
        ba = void 0;
      }
      else ie$1 ? ge$1(a2, c2) && (ba = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba = "onCompositionStart");
      ba && (de$1 && "ko" !== c2.locale && (ie$1 || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie$1 && ($a = nd()) : (kd = e3, ld = "value" in kd ? kd.value : kd.textContent, ie$1 = true)), xa = oe(d3, ba), 0 < xa.length && (ba = new Ld(ba, a2, null, c2, e3), g3.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he$1(c2), null !== $a && (ba.data = $a))));
      if ($a = ce$1 ? je(a2, c2) : ke$1(a2, c2)) d3 = oe(d3, "onBeforeInput"), 0 < d3.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c2, e3), g3.push({ event: e3, listeners: d3 }), e3.data = $a);
    }
    se$1(g3, b);
  });
}
function tf(a2, b, c2) {
  return { instance: a2, listener: b, currentTarget: c2 };
}
function oe(a2, b) {
  for (var c2 = b + "Capture", d2 = []; null !== a2; ) {
    var e2 = a2, f2 = e2.stateNode;
    5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb(a2, c2), null != f2 && d2.unshift(tf(a2, f2, e2)), f2 = Kb(a2, b), null != f2 && d2.push(tf(a2, f2, e2)));
    a2 = a2.return;
  }
  return d2;
}
function vf(a2) {
  if (null === a2) return null;
  do
    a2 = a2.return;
  while (a2 && 5 !== a2.tag);
  return a2 ? a2 : null;
}
function wf(a2, b, c2, d2, e2) {
  for (var f2 = b._reactName, g2 = []; null !== c2 && c2 !== d2; ) {
    var h2 = c2, k2 = h2.alternate, l2 = h2.stateNode;
    if (null !== k2 && k2 === d2) break;
    5 === h2.tag && null !== l2 && (h2 = l2, e2 ? (k2 = Kb(c2, f2), null != k2 && g2.unshift(tf(c2, k2, h2))) : e2 || (k2 = Kb(c2, f2), null != k2 && g2.push(tf(c2, k2, h2))));
    c2 = c2.return;
  }
  0 !== g2.length && a2.push({ event: b, listeners: g2 });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a2) {
  return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
}
function Af(a2, b, c2) {
  b = zf(b);
  if (zf(a2) !== b && c2) throw Error(p$1(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a2, b) {
  return "textarea" === a2 || "noscript" === a2 || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
  return Hf.resolve(null).then(a2).catch(If);
} : Ff;
function If(a2) {
  setTimeout(function() {
    throw a2;
  });
}
function Kf(a2, b) {
  var c2 = b, d2 = 0;
  do {
    var e2 = c2.nextSibling;
    a2.removeChild(c2);
    if (e2 && 8 === e2.nodeType) if (c2 = e2.data, "/$" === c2) {
      if (0 === d2) {
        a2.removeChild(e2);
        bd(b);
        return;
      }
      d2--;
    } else "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
    c2 = e2;
  } while (c2);
  bd(b);
}
function Lf(a2) {
  for (; null != a2; a2 = a2.nextSibling) {
    var b = a2.nodeType;
    if (1 === b || 3 === b) break;
    if (8 === b) {
      b = a2.data;
      if ("$" === b || "$!" === b || "$?" === b) break;
      if ("/$" === b) return null;
    }
  }
  return a2;
}
function Mf(a2) {
  a2 = a2.previousSibling;
  for (var b = 0; a2; ) {
    if (8 === a2.nodeType) {
      var c2 = a2.data;
      if ("$" === c2 || "$!" === c2 || "$?" === c2) {
        if (0 === b) return a2;
        b--;
      } else "/$" === c2 && b++;
    }
    a2 = a2.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a2) {
  var b = a2[Of];
  if (b) return b;
  for (var c2 = a2.parentNode; c2; ) {
    if (b = c2[uf] || c2[Of]) {
      c2 = b.alternate;
      if (null !== b.child || null !== c2 && null !== c2.child) for (a2 = Mf(a2); null !== a2; ) {
        if (c2 = a2[Of]) return c2;
        a2 = Mf(a2);
      }
      return b;
    }
    a2 = c2;
    c2 = a2.parentNode;
  }
  return null;
}
function Cb(a2) {
  a2 = a2[Of] || a2[uf];
  return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
}
function ue(a2) {
  if (5 === a2.tag || 6 === a2.tag) return a2.stateNode;
  throw Error(p$1(33));
}
function Db(a2) {
  return a2[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a2) {
  return { current: a2 };
}
function E$1(a2) {
  0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a2, b) {
  Tf++;
  Sf[Tf] = a2.current;
  a2.current = b;
}
var Vf = {}, H$1 = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a2, b) {
  var c2 = a2.type.contextTypes;
  if (!c2) return Vf;
  var d2 = a2.stateNode;
  if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b) return d2.__reactInternalMemoizedMaskedChildContext;
  var e2 = {}, f2;
  for (f2 in c2) e2[f2] = b[f2];
  d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b, a2.__reactInternalMemoizedMaskedChildContext = e2);
  return e2;
}
function Zf(a2) {
  a2 = a2.childContextTypes;
  return null !== a2 && void 0 !== a2;
}
function $f() {
  E$1(Wf);
  E$1(H$1);
}
function ag(a2, b, c2) {
  if (H$1.current !== Vf) throw Error(p$1(168));
  G(H$1, b);
  G(Wf, c2);
}
function bg(a2, b, c2) {
  var d2 = a2.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d2.getChildContext) return c2;
  d2 = d2.getChildContext();
  for (var e2 in d2) if (!(e2 in b)) throw Error(p$1(108, Ra(a2) || "Unknown", e2));
  return A({}, c2, d2);
}
function cg(a2) {
  a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H$1.current;
  G(H$1, a2);
  G(Wf, Wf.current);
  return true;
}
function dg(a2, b, c2) {
  var d2 = a2.stateNode;
  if (!d2) throw Error(p$1(169));
  c2 ? (a2 = bg(a2, b, Xf), d2.__reactInternalMemoizedMergedChildContext = a2, E$1(Wf), E$1(H$1), G(H$1, a2)) : E$1(Wf);
  G(Wf, c2);
}
var eg = null, fg = false, gg = false;
function hg(a2) {
  null === eg ? eg = [a2] : eg.push(a2);
}
function ig(a2) {
  fg = true;
  hg(a2);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a2 = 0, b = C$1;
    try {
      var c2 = eg;
      for (C$1 = 1; a2 < c2.length; a2++) {
        var d2 = c2[a2];
        do
          d2 = d2(true);
        while (null !== d2);
      }
      eg = null;
      fg = false;
    } catch (e2) {
      throw null !== eg && (eg = eg.slice(a2 + 1)), ac(fc, jg), e2;
    } finally {
      C$1 = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a2, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a2;
  ng = b;
}
function ug(a2, b, c2) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a2;
  var d2 = rg;
  a2 = sg;
  var e2 = 32 - oc(d2) - 1;
  d2 &= ~(1 << e2);
  c2 += 1;
  var f2 = 32 - oc(b) + e2;
  if (30 < f2) {
    var g2 = e2 - e2 % 5;
    f2 = (d2 & (1 << g2) - 1).toString(32);
    d2 >>= g2;
    e2 -= g2;
    rg = 1 << 32 - oc(b) + e2 | c2 << e2 | d2;
    sg = f2 + a2;
  } else rg = 1 << f2 | c2 << e2 | d2, sg = a2;
}
function vg(a2) {
  null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
}
function wg(a2) {
  for (; a2 === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a2 === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a2, b) {
  var c2 = Bg(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b;
  c2.return = a2;
  b = a2.deletions;
  null === b ? (a2.deletions = [c2], a2.flags |= 16) : b.push(c2);
}
function Cg(a2, b) {
  switch (a2.tag) {
    case 5:
      var c2 = a2.type;
      b = 1 !== b.nodeType || c2.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a2.stateNode = b, xg = a2, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a2.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a2.stateNode = b, xg = a2, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a2) {
  return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
}
function Eg(a2) {
  if (I) {
    var b = yg;
    if (b) {
      var c2 = b;
      if (!Cg(a2, b)) {
        if (Dg(a2)) throw Error(p$1(418));
        b = Lf(c2.nextSibling);
        var d2 = xg;
        b && Cg(a2, b) ? Ag(d2, c2) : (a2.flags = a2.flags & -4097 | 2, I = false, xg = a2);
      }
    } else {
      if (Dg(a2)) throw Error(p$1(418));
      a2.flags = a2.flags & -4097 | 2;
      I = false;
      xg = a2;
    }
  }
}
function Fg(a2) {
  for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; ) a2 = a2.return;
  xg = a2;
}
function Gg(a2) {
  if (a2 !== xg) return false;
  if (!I) return Fg(a2), I = true, false;
  var b;
  (b = 3 !== a2.tag) && !(b = 5 !== a2.tag) && (b = a2.type, b = "head" !== b && "body" !== b && !Ef(a2.type, a2.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a2)) throw Hg(), Error(p$1(418));
    for (; b; ) Ag(a2, b), b = Lf(b.nextSibling);
  }
  Fg(a2);
  if (13 === a2.tag) {
    a2 = a2.memoizedState;
    a2 = null !== a2 ? a2.dehydrated : null;
    if (!a2) throw Error(p$1(317));
    a: {
      a2 = a2.nextSibling;
      for (b = 0; a2; ) {
        if (8 === a2.nodeType) {
          var c2 = a2.data;
          if ("/$" === c2) {
            if (0 === b) {
              yg = Lf(a2.nextSibling);
              break a;
            }
            b--;
          } else "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b++;
        }
        a2 = a2.nextSibling;
      }
      yg = null;
    }
  } else yg = xg ? Lf(a2.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a2 = yg; a2; ) a2 = Lf(a2.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a2) {
  null === zg ? zg = [a2] : zg.push(a2);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a2, b, c2) {
  a2 = c2.ref;
  if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (1 !== c2.tag) throw Error(p$1(309));
        var d2 = c2.stateNode;
      }
      if (!d2) throw Error(p$1(147, a2));
      var e2 = d2, f2 = "" + a2;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2) return b.ref;
      b = function(a3) {
        var b2 = e2.refs;
        null === a3 ? delete b2[f2] : b2[f2] = a3;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a2) throw Error(p$1(284));
    if (!c2._owner) throw Error(p$1(290, a2));
  }
  return a2;
}
function Mg(a2, b) {
  a2 = Object.prototype.toString.call(b);
  throw Error(p$1(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b).join(", ") + "}" : a2));
}
function Ng(a2) {
  var b = a2._init;
  return b(a2._payload);
}
function Og(a2) {
  function b(b2, c3) {
    if (a2) {
      var d3 = b2.deletions;
      null === d3 ? (b2.deletions = [c3], b2.flags |= 16) : d3.push(c3);
    }
  }
  function c2(c3, d3) {
    if (!a2) return null;
    for (; null !== d3; ) b(c3, d3), d3 = d3.sibling;
    return null;
  }
  function d2(a3, b2) {
    for (a3 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a3.set(b2.key, b2) : a3.set(b2.index, b2), b2 = b2.sibling;
    return a3;
  }
  function e2(a3, b2) {
    a3 = Pg(a3, b2);
    a3.index = 0;
    a3.sibling = null;
    return a3;
  }
  function f2(b2, c3, d3) {
    b2.index = d3;
    if (!a2) return b2.flags |= 1048576, c3;
    d3 = b2.alternate;
    if (null !== d3) return d3 = d3.index, d3 < c3 ? (b2.flags |= 2, c3) : d3;
    b2.flags |= 2;
    return c3;
  }
  function g2(b2) {
    a2 && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h2(a3, b2, c3, d3) {
    if (null === b2 || 6 !== b2.tag) return b2 = Qg(c3, a3.mode, d3), b2.return = a3, b2;
    b2 = e2(b2, c3);
    b2.return = a3;
    return b2;
  }
  function k2(a3, b2, c3, d3) {
    var f3 = c3.type;
    if (f3 === ya) return m2(a3, b2, c3.props.children, d3, c3.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && Ng(f3) === b2.type)) return d3 = e2(b2, c3.props), d3.ref = Lg(a3, b2, c3), d3.return = a3, d3;
    d3 = Rg(c3.type, c3.key, c3.props, null, a3.mode, d3);
    d3.ref = Lg(a3, b2, c3);
    d3.return = a3;
    return d3;
  }
  function l2(a3, b2, c3, d3) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c3.containerInfo || b2.stateNode.implementation !== c3.implementation) return b2 = Sg(c3, a3.mode, d3), b2.return = a3, b2;
    b2 = e2(b2, c3.children || []);
    b2.return = a3;
    return b2;
  }
  function m2(a3, b2, c3, d3, f3) {
    if (null === b2 || 7 !== b2.tag) return b2 = Tg(c3, a3.mode, d3, f3), b2.return = a3, b2;
    b2 = e2(b2, c3);
    b2.return = a3;
    return b2;
  }
  function q2(a3, b2, c3) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a3.mode, c3), b2.return = a3, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c3 = Rg(b2.type, b2.key, b2.props, null, a3.mode, c3), c3.ref = Lg(a3, null, b2), c3.return = a3, c3;
        case wa:
          return b2 = Sg(b2, a3.mode, c3), b2.return = a3, b2;
        case Ha:
          var d3 = b2._init;
          return q2(a3, d3(b2._payload), c3);
      }
      if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a3.mode, c3, null), b2.return = a3, b2;
      Mg(a3, b2);
    }
    return null;
  }
  function r2(a3, b2, c3, d3) {
    var e3 = null !== b2 ? b2.key : null;
    if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3) return null !== e3 ? null : h2(a3, b2, "" + c3, d3);
    if ("object" === typeof c3 && null !== c3) {
      switch (c3.$$typeof) {
        case va:
          return c3.key === e3 ? k2(a3, b2, c3, d3) : null;
        case wa:
          return c3.key === e3 ? l2(a3, b2, c3, d3) : null;
        case Ha:
          return e3 = c3._init, r2(
            a3,
            b2,
            e3(c3._payload),
            d3
          );
      }
      if (eb(c3) || Ka(c3)) return null !== e3 ? null : m2(a3, b2, c3, d3, null);
      Mg(a3, c3);
    }
    return null;
  }
  function y2(a3, b2, c3, d3, e3) {
    if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3) return a3 = a3.get(c3) || null, h2(b2, a3, "" + d3, e3);
    if ("object" === typeof d3 && null !== d3) {
      switch (d3.$$typeof) {
        case va:
          return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, k2(b2, a3, d3, e3);
        case wa:
          return a3 = a3.get(null === d3.key ? c3 : d3.key) || null, l2(b2, a3, d3, e3);
        case Ha:
          var f3 = d3._init;
          return y2(a3, b2, c3, f3(d3._payload), e3);
      }
      if (eb(d3) || Ka(d3)) return a3 = a3.get(c3) || null, m2(b2, a3, d3, e3, null);
      Mg(b2, d3);
    }
    return null;
  }
  function n2(e3, g3, h3, k3) {
    for (var l3 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e3, u2, h3[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a2 && u2 && null === n3.alternate && b(e3, u2);
      g3 = f2(n3, g3, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h3.length) return c2(e3, u2), I && tg(e3, w2), l3;
    if (null === u2) {
      for (; w2 < h3.length; w2++) u2 = q2(e3, h3[w2], k3), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e3, w2);
      return l3;
    }
    for (u2 = d2(e3, u2); w2 < h3.length; w2++) x2 = y2(u2, e3, w2, h3[w2], k3), null !== x2 && (a2 && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a2 && u2.forEach(function(a3) {
      return b(e3, a3);
    });
    I && tg(e3, w2);
    return l3;
  }
  function t2(e3, g3, h3, k3) {
    var l3 = Ka(h3);
    if ("function" !== typeof l3) throw Error(p$1(150));
    h3 = l3.call(h3);
    if (null == h3) throw Error(p$1(151));
    for (var u2 = l3 = null, m3 = g3, w2 = g3 = 0, x2 = null, n3 = h3.next(); null !== m3 && !n3.done; w2++, n3 = h3.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e3, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a2 && m3 && null === t3.alternate && b(e3, m3);
      g3 = f2(t3, g3, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done) return c2(
      e3,
      m3
    ), I && tg(e3, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h3.next()) n3 = q2(e3, n3.value, k3), null !== n3 && (g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e3, w2);
      return l3;
    }
    for (m3 = d2(e3, m3); !n3.done; w2++, n3 = h3.next()) n3 = y2(m3, e3, w2, n3.value, k3), null !== n3 && (a2 && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a2 && m3.forEach(function(a3) {
      return b(e3, a3);
    });
    I && tg(e3, w2);
    return l3;
  }
  function J2(a3, d3, f3, h3) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d3; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c2(a3, l3.sibling);
                    d3 = e2(l3, f3.props.children);
                    d3.return = a3;
                    a3 = d3;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && Ng(k3) === l3.type) {
                  c2(a3, l3.sibling);
                  d3 = e2(l3, f3.props);
                  d3.ref = Lg(a3, l3, f3);
                  d3.return = a3;
                  a3 = d3;
                  break a;
                }
                c2(a3, l3);
                break;
              } else b(a3, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d3 = Tg(f3.props.children, a3.mode, h3, f3.key), d3.return = a3, a3 = d3) : (h3 = Rg(f3.type, f3.key, f3.props, null, a3.mode, h3), h3.ref = Lg(a3, d3, f3), h3.return = a3, a3 = h3);
          }
          return g2(a3);
        case wa:
          a: {
            for (l3 = f3.key; null !== d3; ) {
              if (d3.key === l3) if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                c2(a3, d3.sibling);
                d3 = e2(d3, f3.children || []);
                d3.return = a3;
                a3 = d3;
                break a;
              } else {
                c2(a3, d3);
                break;
              }
              else b(a3, d3);
              d3 = d3.sibling;
            }
            d3 = Sg(f3, a3.mode, h3);
            d3.return = a3;
            a3 = d3;
          }
          return g2(a3);
        case Ha:
          return l3 = f3._init, J2(a3, d3, l3(f3._payload), h3);
      }
      if (eb(f3)) return n2(a3, d3, f3, h3);
      if (Ka(f3)) return t2(a3, d3, f3, h3);
      Mg(a3, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a3, d3.sibling), d3 = e2(d3, f3), d3.return = a3, a3 = d3) : (c2(a3, d3), d3 = Qg(f3, a3.mode, h3), d3.return = a3, a3 = d3), g2(a3)) : c2(a3, d3);
  }
  return J2;
}
var Ug = Og(true), Vg = Og(false), Wg = Uf(null), Xg = null, Yg = null, Zg = null;
function $g() {
  Zg = Yg = Xg = null;
}
function ah(a2) {
  var b = Wg.current;
  E$1(Wg);
  a2._currentValue = b;
}
function bh(a2, b, c2) {
  for (; null !== a2; ) {
    var d2 = a2.alternate;
    (a2.childLanes & b) !== b ? (a2.childLanes |= b, null !== d2 && (d2.childLanes |= b)) : null !== d2 && (d2.childLanes & b) !== b && (d2.childLanes |= b);
    if (a2 === c2) break;
    a2 = a2.return;
  }
}
function ch(a2, b) {
  Xg = a2;
  Zg = Yg = null;
  a2 = a2.dependencies;
  null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b) && (dh = true), a2.firstContext = null);
}
function eh(a2) {
  var b = a2._currentValue;
  if (Zg !== a2) if (a2 = { context: a2, memoizedValue: b, next: null }, null === Yg) {
    if (null === Xg) throw Error(p$1(308));
    Yg = a2;
    Xg.dependencies = { lanes: 0, firstContext: a2 };
  } else Yg = Yg.next = a2;
  return b;
}
var fh = null;
function gh(a2) {
  null === fh ? fh = [a2] : fh.push(a2);
}
function hh(a2, b, c2, d2) {
  var e2 = b.interleaved;
  null === e2 ? (c2.next = c2, gh(b)) : (c2.next = e2.next, e2.next = c2);
  b.interleaved = c2;
  return ih(a2, d2);
}
function ih(a2, b) {
  a2.lanes |= b;
  var c2 = a2.alternate;
  null !== c2 && (c2.lanes |= b);
  c2 = a2;
  for (a2 = a2.return; null !== a2; ) a2.childLanes |= b, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b), c2 = a2, a2 = a2.return;
  return 3 === c2.tag ? c2.stateNode : null;
}
var jh = false;
function kh(a2) {
  a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function lh(a2, b) {
  a2 = a2.updateQueue;
  b.updateQueue === a2 && (b.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
}
function mh(a2, b) {
  return { eventTime: a2, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function nh(a2, b, c2) {
  var d2 = a2.updateQueue;
  if (null === d2) return null;
  d2 = d2.shared;
  if (0 !== (K & 2)) {
    var e2 = d2.pending;
    null === e2 ? b.next = b : (b.next = e2.next, e2.next = b);
    d2.pending = b;
    return ih(a2, c2);
  }
  e2 = d2.interleaved;
  null === e2 ? (b.next = b, gh(d2)) : (b.next = e2.next, e2.next = b);
  d2.interleaved = b;
  return ih(a2, c2);
}
function oh(a2, b, c2) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c2 & 4194240))) {
    var d2 = b.lanes;
    d2 &= a2.pendingLanes;
    c2 |= d2;
    b.lanes = c2;
    Cc(a2, c2);
  }
}
function ph(a2, b) {
  var c2 = a2.updateQueue, d2 = a2.alternate;
  if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
    var e2 = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (null !== c2) {
      do {
        var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        null === f2 ? e2 = f2 = g2 : f2 = f2.next = g2;
        c2 = c2.next;
      } while (null !== c2);
      null === f2 ? e2 = f2 = b : f2 = f2.next = b;
    } else e2 = f2 = b;
    c2 = { baseState: d2.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
    a2.updateQueue = c2;
    return;
  }
  a2 = c2.lastBaseUpdate;
  null === a2 ? c2.firstBaseUpdate = b : a2.next = b;
  c2.lastBaseUpdate = b;
}
function qh(a2, b, c2, d2) {
  var e2 = a2.updateQueue;
  jh = false;
  var f2 = e2.firstBaseUpdate, g2 = e2.lastBaseUpdate, h2 = e2.shared.pending;
  if (null !== h2) {
    e2.shared.pending = null;
    var k2 = h2, l2 = k2.next;
    k2.next = null;
    null === g2 ? f2 = l2 : g2.next = l2;
    g2 = k2;
    var m2 = a2.alternate;
    null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g2 && (null === h2 ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e2.baseState;
    g2 = 0;
    m2 = l2 = k2 = null;
    h2 = f2;
    do {
      var r2 = h2.lane, y2 = h2.eventTime;
      if ((d2 & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h2.tag,
          payload: h2.payload,
          callback: h2.callback,
          next: null
        });
        a: {
          var n2 = a2, t2 = h2;
          r2 = b;
          y2 = c2;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2) break a;
              q2 = A({}, q2, r2);
              break a;
            case 2:
              jh = true;
          }
        }
        null !== h2.callback && 0 !== h2.lane && (a2.flags |= 64, r2 = e2.effects, null === r2 ? e2.effects = [h2] : r2.push(h2));
      } else y2 = { eventTime: y2, lane: r2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g2 |= r2;
      h2 = h2.next;
      if (null === h2) if (h2 = e2.shared.pending, null === h2) break;
      else r2 = h2, h2 = r2.next, r2.next = null, e2.lastBaseUpdate = r2, e2.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e2.baseState = k2;
    e2.firstBaseUpdate = l2;
    e2.lastBaseUpdate = m2;
    b = e2.shared.interleaved;
    if (null !== b) {
      e2 = b;
      do
        g2 |= e2.lane, e2 = e2.next;
      while (e2 !== b);
    } else null === f2 && (e2.shared.lanes = 0);
    rh |= g2;
    a2.lanes = g2;
    a2.memoizedState = q2;
  }
}
function sh(a2, b, c2) {
  a2 = b.effects;
  b.effects = null;
  if (null !== a2) for (b = 0; b < a2.length; b++) {
    var d2 = a2[b], e2 = d2.callback;
    if (null !== e2) {
      d2.callback = null;
      d2 = c2;
      if ("function" !== typeof e2) throw Error(p$1(191, e2));
      e2.call(d2);
    }
  }
}
var th = {}, uh = Uf(th), vh = Uf(th), wh = Uf(th);
function xh(a2) {
  if (a2 === th) throw Error(p$1(174));
  return a2;
}
function yh(a2, b) {
  G(wh, b);
  G(vh, a2);
  G(uh, th);
  a2 = b.nodeType;
  switch (a2) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a2 = 8 === a2 ? b.parentNode : b, b = a2.namespaceURI || null, a2 = a2.tagName, b = lb(b, a2);
  }
  E$1(uh);
  G(uh, b);
}
function zh() {
  E$1(uh);
  E$1(vh);
  E$1(wh);
}
function Ah(a2) {
  xh(wh.current);
  var b = xh(uh.current);
  var c2 = lb(b, a2.type);
  b !== c2 && (G(vh, a2), G(uh, c2));
}
function Bh(a2) {
  vh.current === a2 && (E$1(uh), E$1(vh));
}
var L$1 = Uf(0);
function Ch(a2) {
  for (var b = a2; null !== b; ) {
    if (13 === b.tag) {
      var c2 = b.memoizedState;
      if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data)) return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128)) return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a2) break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a2) return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Dh = [];
function Eh() {
  for (var a2 = 0; a2 < Dh.length; a2++) Dh[a2]._workInProgressVersionPrimary = null;
  Dh.length = 0;
}
var Fh = ua.ReactCurrentDispatcher, Gh = ua.ReactCurrentBatchConfig, Hh = 0, M = null, N$1 = null, O = null, Ih = false, Jh = false, Kh = 0, Lh = 0;
function P$1() {
  throw Error(p$1(321));
}
function Mh(a2, b) {
  if (null === b) return false;
  for (var c2 = 0; c2 < b.length && c2 < a2.length; c2++) if (!He(a2[c2], b[c2])) return false;
  return true;
}
function Nh(a2, b, c2, d2, e2, f2) {
  Hh = f2;
  M = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Fh.current = null === a2 || null === a2.memoizedState ? Oh : Ph;
  a2 = c2(d2, e2);
  if (Jh) {
    f2 = 0;
    do {
      Jh = false;
      Kh = 0;
      if (25 <= f2) throw Error(p$1(301));
      f2 += 1;
      O = N$1 = null;
      b.updateQueue = null;
      Fh.current = Qh;
      a2 = c2(d2, e2);
    } while (Jh);
  }
  Fh.current = Rh;
  b = null !== N$1 && null !== N$1.next;
  Hh = 0;
  O = N$1 = M = null;
  Ih = false;
  if (b) throw Error(p$1(300));
  return a2;
}
function Sh() {
  var a2 = 0 !== Kh;
  Kh = 0;
  return a2;
}
function Th() {
  var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === O ? M.memoizedState = O = a2 : O = O.next = a2;
  return O;
}
function Uh() {
  if (null === N$1) {
    var a2 = M.alternate;
    a2 = null !== a2 ? a2.memoizedState : null;
  } else a2 = N$1.next;
  var b = null === O ? M.memoizedState : O.next;
  if (null !== b) O = b, N$1 = a2;
  else {
    if (null === a2) throw Error(p$1(310));
    N$1 = a2;
    a2 = { memoizedState: N$1.memoizedState, baseState: N$1.baseState, baseQueue: N$1.baseQueue, queue: N$1.queue, next: null };
    null === O ? M.memoizedState = O = a2 : O = O.next = a2;
  }
  return O;
}
function Vh(a2, b) {
  return "function" === typeof b ? b(a2) : b;
}
function Wh(a2) {
  var b = Uh(), c2 = b.queue;
  if (null === c2) throw Error(p$1(311));
  c2.lastRenderedReducer = a2;
  var d2 = N$1, e2 = d2.baseQueue, f2 = c2.pending;
  if (null !== f2) {
    if (null !== e2) {
      var g2 = e2.next;
      e2.next = f2.next;
      f2.next = g2;
    }
    d2.baseQueue = e2 = f2;
    c2.pending = null;
  }
  if (null !== e2) {
    f2 = e2.next;
    d2 = d2.baseState;
    var h2 = g2 = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Hh & m2) === m2) null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a2(d2, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h2 = k2 = q2, g2 = d2) : k2 = k2.next = q2;
        M.lanes |= m2;
        rh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g2 = d2 : k2.next = h2;
    He(d2, b.memoizedState) || (dh = true);
    b.memoizedState = d2;
    b.baseState = g2;
    b.baseQueue = k2;
    c2.lastRenderedState = d2;
  }
  a2 = c2.interleaved;
  if (null !== a2) {
    e2 = a2;
    do
      f2 = e2.lane, M.lanes |= f2, rh |= f2, e2 = e2.next;
    while (e2 !== a2);
  } else null === e2 && (c2.lanes = 0);
  return [b.memoizedState, c2.dispatch];
}
function Xh(a2) {
  var b = Uh(), c2 = b.queue;
  if (null === c2) throw Error(p$1(311));
  c2.lastRenderedReducer = a2;
  var d2 = c2.dispatch, e2 = c2.pending, f2 = b.memoizedState;
  if (null !== e2) {
    c2.pending = null;
    var g2 = e2 = e2.next;
    do
      f2 = a2(f2, g2.action), g2 = g2.next;
    while (g2 !== e2);
    He(f2, b.memoizedState) || (dh = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d2];
}
function Yh() {
}
function Zh(a2, b) {
  var c2 = M, d2 = Uh(), e2 = b(), f2 = !He(d2.memoizedState, e2);
  f2 && (d2.memoizedState = e2, dh = true);
  d2 = d2.queue;
  $h(ai.bind(null, c2, d2, a2), [a2]);
  if (d2.getSnapshot !== b || f2 || null !== O && O.memoizedState.tag & 1) {
    c2.flags |= 2048;
    bi(9, ci.bind(null, c2, d2, e2, b), void 0, null);
    if (null === Q$1) throw Error(p$1(349));
    0 !== (Hh & 30) || di(c2, b, e2);
  }
  return e2;
}
function di(a2, b, c2) {
  a2.flags |= 16384;
  a2 = { getSnapshot: b, value: c2 };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a2]) : (c2 = b.stores, null === c2 ? b.stores = [a2] : c2.push(a2));
}
function ci(a2, b, c2, d2) {
  b.value = c2;
  b.getSnapshot = d2;
  ei(b) && fi(a2);
}
function ai(a2, b, c2) {
  return c2(function() {
    ei(b) && fi(a2);
  });
}
function ei(a2) {
  var b = a2.getSnapshot;
  a2 = a2.value;
  try {
    var c2 = b();
    return !He(a2, c2);
  } catch (d2) {
    return true;
  }
}
function fi(a2) {
  var b = ih(a2, 1);
  null !== b && gi(b, a2, 1, -1);
}
function hi(a2) {
  var b = Th();
  "function" === typeof a2 && (a2 = a2());
  b.memoizedState = b.baseState = a2;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
  b.queue = a2;
  a2 = a2.dispatch = ii.bind(null, M, a2);
  return [b.memoizedState, a2];
}
function bi(a2, b, c2, d2) {
  a2 = { tag: a2, create: b, destroy: c2, deps: d2, next: null };
  b = M.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a2.next = a2) : (c2 = b.lastEffect, null === c2 ? b.lastEffect = a2.next = a2 : (d2 = c2.next, c2.next = a2, a2.next = d2, b.lastEffect = a2));
  return a2;
}
function ji() {
  return Uh().memoizedState;
}
function ki(a2, b, c2, d2) {
  var e2 = Th();
  M.flags |= a2;
  e2.memoizedState = bi(1 | b, c2, void 0, void 0 === d2 ? null : d2);
}
function li(a2, b, c2, d2) {
  var e2 = Uh();
  d2 = void 0 === d2 ? null : d2;
  var f2 = void 0;
  if (null !== N$1) {
    var g2 = N$1.memoizedState;
    f2 = g2.destroy;
    if (null !== d2 && Mh(d2, g2.deps)) {
      e2.memoizedState = bi(b, c2, f2, d2);
      return;
    }
  }
  M.flags |= a2;
  e2.memoizedState = bi(1 | b, c2, f2, d2);
}
function mi(a2, b) {
  return ki(8390656, 8, a2, b);
}
function $h(a2, b) {
  return li(2048, 8, a2, b);
}
function ni(a2, b) {
  return li(4, 2, a2, b);
}
function oi(a2, b) {
  return li(4, 4, a2, b);
}
function pi(a2, b) {
  if ("function" === typeof b) return a2 = a2(), b(a2), function() {
    b(null);
  };
  if (null !== b && void 0 !== b) return a2 = a2(), b.current = a2, function() {
    b.current = null;
  };
}
function qi(a2, b, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return li(4, 4, pi.bind(null, b, a2), c2);
}
function ri() {
}
function si(a2, b) {
  var c2 = Uh();
  b = void 0 === b ? null : b;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b && Mh(b, d2[1])) return d2[0];
  c2.memoizedState = [a2, b];
  return a2;
}
function ti(a2, b) {
  var c2 = Uh();
  b = void 0 === b ? null : b;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b && Mh(b, d2[1])) return d2[0];
  a2 = a2();
  c2.memoizedState = [a2, b];
  return a2;
}
function ui(a2, b, c2) {
  if (0 === (Hh & 21)) return a2.baseState && (a2.baseState = false, dh = true), a2.memoizedState = c2;
  He(c2, b) || (c2 = yc(), M.lanes |= c2, rh |= c2, a2.baseState = true);
  return b;
}
function vi(a2, b) {
  var c2 = C$1;
  C$1 = 0 !== c2 && 4 > c2 ? c2 : 4;
  a2(true);
  var d2 = Gh.transition;
  Gh.transition = {};
  try {
    a2(false), b();
  } finally {
    C$1 = c2, Gh.transition = d2;
  }
}
function wi() {
  return Uh().memoizedState;
}
function xi(a2, b, c2) {
  var d2 = yi(a2);
  c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a2)) Ai(b, c2);
  else if (c2 = hh(a2, b, c2, d2), null !== c2) {
    var e2 = R();
    gi(c2, a2, d2, e2);
    Bi(c2, b, d2);
  }
}
function ii(a2, b, c2) {
  var d2 = yi(a2), e2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (zi(a2)) Ai(b, e2);
  else {
    var f2 = a2.alternate;
    if (0 === a2.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2)) try {
      var g2 = b.lastRenderedState, h2 = f2(g2, c2);
      e2.hasEagerState = true;
      e2.eagerState = h2;
      if (He(h2, g2)) {
        var k2 = b.interleaved;
        null === k2 ? (e2.next = e2, gh(b)) : (e2.next = k2.next, k2.next = e2);
        b.interleaved = e2;
        return;
      }
    } catch (l2) {
    } finally {
    }
    c2 = hh(a2, b, e2, d2);
    null !== c2 && (e2 = R(), gi(c2, a2, d2, e2), Bi(c2, b, d2));
  }
}
function zi(a2) {
  var b = a2.alternate;
  return a2 === M || null !== b && b === M;
}
function Ai(a2, b) {
  Jh = Ih = true;
  var c2 = a2.pending;
  null === c2 ? b.next = b : (b.next = c2.next, c2.next = b);
  a2.pending = b;
}
function Bi(a2, b, c2) {
  if (0 !== (c2 & 4194240)) {
    var d2 = b.lanes;
    d2 &= a2.pendingLanes;
    c2 |= d2;
    b.lanes = c2;
    Cc(a2, c2);
  }
}
var Rh = { readContext: eh, useCallback: P$1, useContext: P$1, useEffect: P$1, useImperativeHandle: P$1, useInsertionEffect: P$1, useLayoutEffect: P$1, useMemo: P$1, useReducer: P$1, useRef: P$1, useState: P$1, useDebugValue: P$1, useDeferredValue: P$1, useTransition: P$1, useMutableSource: P$1, useSyncExternalStore: P$1, useId: P$1, unstable_isNewReconciler: false }, Oh = { readContext: eh, useCallback: function(a2, b) {
  Th().memoizedState = [a2, void 0 === b ? null : b];
  return a2;
}, useContext: eh, useEffect: mi, useImperativeHandle: function(a2, b, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
  return ki(
    4194308,
    4,
    pi.bind(null, b, a2),
    c2
  );
}, useLayoutEffect: function(a2, b) {
  return ki(4194308, 4, a2, b);
}, useInsertionEffect: function(a2, b) {
  return ki(4, 2, a2, b);
}, useMemo: function(a2, b) {
  var c2 = Th();
  b = void 0 === b ? null : b;
  a2 = a2();
  c2.memoizedState = [a2, b];
  return a2;
}, useReducer: function(a2, b, c2) {
  var d2 = Th();
  b = void 0 !== c2 ? c2(b) : b;
  d2.memoizedState = d2.baseState = b;
  a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b };
  d2.queue = a2;
  a2 = a2.dispatch = xi.bind(null, M, a2);
  return [d2.memoizedState, a2];
}, useRef: function(a2) {
  var b = Th();
  a2 = { current: a2 };
  return b.memoizedState = a2;
}, useState: hi, useDebugValue: ri, useDeferredValue: function(a2) {
  return Th().memoizedState = a2;
}, useTransition: function() {
  var a2 = hi(false), b = a2[0];
  a2 = vi.bind(null, a2[1]);
  Th().memoizedState = a2;
  return [b, a2];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a2, b, c2) {
  var d2 = M, e2 = Th();
  if (I) {
    if (void 0 === c2) throw Error(p$1(407));
    c2 = c2();
  } else {
    c2 = b();
    if (null === Q$1) throw Error(p$1(349));
    0 !== (Hh & 30) || di(d2, b, c2);
  }
  e2.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b };
  e2.queue = f2;
  mi(ai.bind(
    null,
    d2,
    f2,
    a2
  ), [a2]);
  d2.flags |= 2048;
  bi(9, ci.bind(null, d2, f2, c2, b), void 0, null);
  return c2;
}, useId: function() {
  var a2 = Th(), b = Q$1.identifierPrefix;
  if (I) {
    var c2 = sg;
    var d2 = rg;
    c2 = (d2 & ~(1 << 32 - oc(d2) - 1)).toString(32) + c2;
    b = ":" + b + "R" + c2;
    c2 = Kh++;
    0 < c2 && (b += "H" + c2.toString(32));
    b += ":";
  } else c2 = Lh++, b = ":" + b + "r" + c2.toString(32) + ":";
  return a2.memoizedState = b;
}, unstable_isNewReconciler: false }, Ph = {
  readContext: eh,
  useCallback: si,
  useContext: eh,
  useEffect: $h,
  useImperativeHandle: qi,
  useInsertionEffect: ni,
  useLayoutEffect: oi,
  useMemo: ti,
  useReducer: Wh,
  useRef: ji,
  useState: function() {
    return Wh(Vh);
  },
  useDebugValue: ri,
  useDeferredValue: function(a2) {
    var b = Uh();
    return ui(b, N$1.memoizedState, a2);
  },
  useTransition: function() {
    var a2 = Wh(Vh)[0], b = Uh().memoizedState;
    return [a2, b];
  },
  useMutableSource: Yh,
  useSyncExternalStore: Zh,
  useId: wi,
  unstable_isNewReconciler: false
}, Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
  return Xh(Vh);
}, useDebugValue: ri, useDeferredValue: function(a2) {
  var b = Uh();
  return null === N$1 ? b.memoizedState = a2 : ui(b, N$1.memoizedState, a2);
}, useTransition: function() {
  var a2 = Xh(Vh)[0], b = Uh().memoizedState;
  return [a2, b];
}, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
function Ci(a2, b) {
  if (a2 && a2.defaultProps) {
    b = A({}, b);
    a2 = a2.defaultProps;
    for (var c2 in a2) void 0 === b[c2] && (b[c2] = a2[c2]);
    return b;
  }
  return b;
}
function Di(a2, b, c2, d2) {
  b = a2.memoizedState;
  c2 = c2(d2, b);
  c2 = null === c2 || void 0 === c2 ? b : A({}, b, c2);
  a2.memoizedState = c2;
  0 === a2.lanes && (a2.updateQueue.baseState = c2);
}
var Ei = { isMounted: function(a2) {
  return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
}, enqueueSetState: function(a2, b, c2) {
  a2 = a2._reactInternals;
  var d2 = R(), e2 = yi(a2), f2 = mh(d2, e2);
  f2.payload = b;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b = nh(a2, f2, e2);
  null !== b && (gi(b, a2, e2, d2), oh(b, a2, e2));
}, enqueueReplaceState: function(a2, b, c2) {
  a2 = a2._reactInternals;
  var d2 = R(), e2 = yi(a2), f2 = mh(d2, e2);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b = nh(a2, f2, e2);
  null !== b && (gi(b, a2, e2, d2), oh(b, a2, e2));
}, enqueueForceUpdate: function(a2, b) {
  a2 = a2._reactInternals;
  var c2 = R(), d2 = yi(a2), e2 = mh(c2, d2);
  e2.tag = 2;
  void 0 !== b && null !== b && (e2.callback = b);
  b = nh(a2, e2, d2);
  null !== b && (gi(b, a2, d2, c2), oh(b, a2, d2));
} };
function Fi(a2, b, c2, d2, e2, f2, g2) {
  a2 = a2.stateNode;
  return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d2, f2, g2) : b.prototype && b.prototype.isPureReactComponent ? !Ie$1(c2, d2) || !Ie$1(e2, f2) : true;
}
function Gi(a2, b, c2) {
  var d2 = false, e2 = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = eh(f2) : (e2 = Zf(b) ? Xf : H$1.current, d2 = b.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Yf(a2, e2) : Vf);
  b = new b(c2, f2);
  a2.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = Ei;
  a2.stateNode = b;
  b._reactInternals = a2;
  d2 && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e2, a2.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function Hi(a2, b, c2, d2) {
  a2 = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c2, d2);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c2, d2);
  b.state !== a2 && Ei.enqueueReplaceState(b, b.state, null);
}
function Ii(a2, b, c2, d2) {
  var e2 = a2.stateNode;
  e2.props = c2;
  e2.state = a2.memoizedState;
  e2.refs = {};
  kh(a2);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e2.context = eh(f2) : (f2 = Zf(b) ? Xf : H$1.current, e2.context = Yf(a2, f2));
  e2.state = a2.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (Di(a2, b, f2, c2), e2.state = a2.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b !== e2.state && Ei.enqueueReplaceState(e2, e2.state, null), qh(a2, c2, e2, d2), e2.state = a2.memoizedState);
  "function" === typeof e2.componentDidMount && (a2.flags |= 4194308);
}
function Ji(a2, b) {
  try {
    var c2 = "", d2 = b;
    do
      c2 += Pa(d2), d2 = d2.return;
    while (d2);
    var e2 = c2;
  } catch (f2) {
    e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a2, source: b, stack: e2, digest: null };
}
function Ki(a2, b, c2) {
  return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b ? b : null };
}
function Li(a2, b) {
  try {
    console.error(b.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Mi = "function" === typeof WeakMap ? WeakMap : Map;
function Ni(a2, b, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d2 = b.value;
  c2.callback = function() {
    Oi || (Oi = true, Pi = d2);
    Li(a2, b);
  };
  return c2;
}
function Qi(a2, b, c2) {
  c2 = mh(-1, c2);
  c2.tag = 3;
  var d2 = a2.type.getDerivedStateFromError;
  if ("function" === typeof d2) {
    var e2 = b.value;
    c2.payload = function() {
      return d2(e2);
    };
    c2.callback = function() {
      Li(a2, b);
    };
  }
  var f2 = a2.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
    Li(a2, b);
    "function" !== typeof d2 && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
    var c3 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c3 ? c3 : "" });
  });
  return c2;
}
function Si(a2, b, c2) {
  var d2 = a2.pingCache;
  if (null === d2) {
    d2 = a2.pingCache = new Mi();
    var e2 = /* @__PURE__ */ new Set();
    d2.set(b, e2);
  } else e2 = d2.get(b), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d2.set(b, e2));
  e2.has(c2) || (e2.add(c2), a2 = Ti.bind(null, a2, b, c2), b.then(a2, a2));
}
function Ui(a2) {
  do {
    var b;
    if (b = 13 === a2.tag) b = a2.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b) return a2;
    a2 = a2.return;
  } while (null !== a2);
  return null;
}
function Vi(a2, b, c2, d2, e2) {
  if (0 === (a2.mode & 1)) return a2 === b ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c2, b, 1))), c2.lanes |= 1), a2;
  a2.flags |= 65536;
  a2.lanes = e2;
  return a2;
}
var Wi = ua.ReactCurrentOwner, dh = false;
function Xi(a2, b, c2, d2) {
  b.child = null === a2 ? Vg(b, null, c2, d2) : Ug(b, a2.child, c2, d2);
}
function Yi(a2, b, c2, d2, e2) {
  c2 = c2.render;
  var f2 = b.ref;
  ch(b, e2);
  d2 = Nh(a2, b, c2, d2, f2, e2);
  c2 = Sh();
  if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b, e2);
  I && c2 && vg(b);
  b.flags |= 1;
  Xi(a2, b, d2, e2);
  return b.child;
}
function $i(a2, b, c2, d2, e2) {
  if (null === a2) {
    var f2 = c2.type;
    if ("function" === typeof f2 && !aj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps) return b.tag = 15, b.type = f2, bj(a2, b, f2, d2, e2);
    a2 = Rg(c2.type, null, d2, b, b.mode, e2);
    a2.ref = b.ref;
    a2.return = b;
    return b.child = a2;
  }
  f2 = a2.child;
  if (0 === (a2.lanes & e2)) {
    var g2 = f2.memoizedProps;
    c2 = c2.compare;
    c2 = null !== c2 ? c2 : Ie$1;
    if (c2(g2, d2) && a2.ref === b.ref) return Zi(a2, b, e2);
  }
  b.flags |= 1;
  a2 = Pg(f2, d2);
  a2.ref = b.ref;
  a2.return = b;
  return b.child = a2;
}
function bj(a2, b, c2, d2, e2) {
  if (null !== a2) {
    var f2 = a2.memoizedProps;
    if (Ie$1(f2, d2) && a2.ref === b.ref) if (dh = false, b.pendingProps = d2 = f2, 0 !== (a2.lanes & e2)) 0 !== (a2.flags & 131072) && (dh = true);
    else return b.lanes = a2.lanes, Zi(a2, b, e2);
  }
  return cj(a2, b, c2, d2, e2);
}
function dj(a2, b, c2) {
  var d2 = b.pendingProps, e2 = d2.children, f2 = null !== a2 ? a2.memoizedState : null;
  if ("hidden" === d2.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c2;
  else {
    if (0 === (c2 & 1073741824)) return a2 = null !== f2 ? f2.baseLanes | c2 : c2, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a2, null;
    b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
    d2 = null !== f2 ? f2.baseLanes : c2;
    G(ej, fj);
    fj |= d2;
  }
  else null !== f2 ? (d2 = f2.baseLanes | c2, b.memoizedState = null) : d2 = c2, G(ej, fj), fj |= d2;
  Xi(a2, b, e2, c2);
  return b.child;
}
function gj(a2, b) {
  var c2 = b.ref;
  if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2) b.flags |= 512, b.flags |= 2097152;
}
function cj(a2, b, c2, d2, e2) {
  var f2 = Zf(c2) ? Xf : H$1.current;
  f2 = Yf(b, f2);
  ch(b, e2);
  c2 = Nh(a2, b, c2, d2, f2, e2);
  d2 = Sh();
  if (null !== a2 && !dh) return b.updateQueue = a2.updateQueue, b.flags &= -2053, a2.lanes &= ~e2, Zi(a2, b, e2);
  I && d2 && vg(b);
  b.flags |= 1;
  Xi(a2, b, c2, e2);
  return b.child;
}
function hj(a2, b, c2, d2, e2) {
  if (Zf(c2)) {
    var f2 = true;
    cg(b);
  } else f2 = false;
  ch(b, e2);
  if (null === b.stateNode) ij(a2, b), Gi(b, c2, d2), Ii(b, c2, d2, e2), d2 = true;
  else if (null === a2) {
    var g2 = b.stateNode, h2 = b.memoizedProps;
    g2.props = h2;
    var k2 = g2.context, l2 = c2.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = eh(l2) : (l2 = Zf(c2) ? Xf : H$1.current, l2 = Yf(b, l2));
    var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d2 || k2 !== l2) && Hi(b, g2, d2, l2);
    jh = false;
    var r2 = b.memoizedState;
    g2.state = r2;
    qh(b, d2, g2, e2);
    k2 = b.memoizedState;
    h2 !== d2 || r2 !== k2 || Wf.current || jh ? ("function" === typeof m2 && (Di(b, c2, m2, d2), k2 = b.memoizedState), (h2 = jh || Fi(b, c2, h2, d2, r2, k2, l2)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d2, b.memoizedState = k2), g2.props = d2, g2.state = k2, g2.context = l2, d2 = h2) : ("function" === typeof g2.componentDidMount && (b.flags |= 4194308), d2 = false);
  } else {
    g2 = b.stateNode;
    lh(a2, b);
    h2 = b.memoizedProps;
    l2 = b.type === b.elementType ? h2 : Ci(b.type, h2);
    g2.props = l2;
    q2 = b.pendingProps;
    r2 = g2.context;
    k2 = c2.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = eh(k2) : (k2 = Zf(c2) ? Xf : H$1.current, k2 = Yf(b, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== q2 || r2 !== k2) && Hi(b, g2, d2, k2);
    jh = false;
    r2 = b.memoizedState;
    g2.state = r2;
    qh(b, d2, g2, e2);
    var n2 = b.memoizedState;
    h2 !== q2 || r2 !== n2 || Wf.current || jh ? ("function" === typeof y2 && (Di(b, c2, y2, d2), n2 = b.memoizedState), (l2 = jh || Fi(b, c2, l2, d2, r2, n2, k2) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d2, n2, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d2, n2, k2)), "function" === typeof g2.componentDidUpdate && (b.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), b.memoizedProps = d2, b.memoizedState = n2), g2.props = d2, g2.state = n2, g2.context = k2, d2 = l2) : ("function" !== typeof g2.componentDidUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a2.memoizedProps && r2 === a2.memoizedState || (b.flags |= 1024), d2 = false);
  }
  return jj(a2, b, c2, d2, f2, e2);
}
function jj(a2, b, c2, d2, e2, f2) {
  gj(a2, b);
  var g2 = 0 !== (b.flags & 128);
  if (!d2 && !g2) return e2 && dg(b, c2, false), Zi(a2, b, f2);
  d2 = b.stateNode;
  Wi.current = b;
  var h2 = g2 && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
  b.flags |= 1;
  null !== a2 && g2 ? (b.child = Ug(b, a2.child, null, f2), b.child = Ug(b, null, h2, f2)) : Xi(a2, b, h2, f2);
  b.memoizedState = d2.state;
  e2 && dg(b, c2, true);
  return b.child;
}
function kj(a2) {
  var b = a2.stateNode;
  b.pendingContext ? ag(a2, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a2, b.context, false);
  yh(a2, b.containerInfo);
}
function lj(a2, b, c2, d2, e2) {
  Ig();
  Jg(e2);
  b.flags |= 256;
  Xi(a2, b, c2, d2);
  return b.child;
}
var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
function nj(a2) {
  return { baseLanes: a2, cachePool: null, transitions: null };
}
function oj(a2, b, c2) {
  var d2 = b.pendingProps, e2 = L$1.current, f2 = false, g2 = 0 !== (b.flags & 128), h2;
  (h2 = g2) || (h2 = null !== a2 && null === a2.memoizedState ? false : 0 !== (e2 & 2));
  if (h2) f2 = true, b.flags &= -129;
  else if (null === a2 || null !== a2.memoizedState) e2 |= 1;
  G(L$1, e2 & 1);
  if (null === a2) {
    Eg(b);
    a2 = b.memoizedState;
    if (null !== a2 && (a2 = a2.dehydrated, null !== a2)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a2.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g2 = d2.children;
    a2 = d2.fallback;
    return f2 ? (d2 = b.mode, f2 = b.child, g2 = { mode: "hidden", children: g2 }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = pj(g2, d2, 0, null), a2 = Tg(a2, d2, c2, null), f2.return = b, a2.return = b, f2.sibling = a2, b.child = f2, b.child.memoizedState = nj(c2), b.memoizedState = mj, a2) : qj(b, g2);
  }
  e2 = a2.memoizedState;
  if (null !== e2 && (h2 = e2.dehydrated, null !== h2)) return rj(a2, b, g2, d2, h2, e2, c2);
  if (f2) {
    f2 = d2.fallback;
    g2 = b.mode;
    e2 = a2.child;
    h2 = e2.sibling;
    var k2 = { mode: "hidden", children: d2.children };
    0 === (g2 & 1) && b.child !== e2 ? (d2 = b.child, d2.childLanes = 0, d2.pendingProps = k2, b.deletions = null) : (d2 = Pg(e2, k2), d2.subtreeFlags = e2.subtreeFlags & 14680064);
    null !== h2 ? f2 = Pg(h2, f2) : (f2 = Tg(f2, g2, c2, null), f2.flags |= 2);
    f2.return = b;
    d2.return = b;
    d2.sibling = f2;
    b.child = d2;
    d2 = f2;
    f2 = b.child;
    g2 = a2.child.memoizedState;
    g2 = null === g2 ? nj(c2) : { baseLanes: g2.baseLanes | c2, cachePool: null, transitions: g2.transitions };
    f2.memoizedState = g2;
    f2.childLanes = a2.childLanes & ~c2;
    b.memoizedState = mj;
    return d2;
  }
  f2 = a2.child;
  a2 = f2.sibling;
  d2 = Pg(f2, { mode: "visible", children: d2.children });
  0 === (b.mode & 1) && (d2.lanes = c2);
  d2.return = b;
  d2.sibling = null;
  null !== a2 && (c2 = b.deletions, null === c2 ? (b.deletions = [a2], b.flags |= 16) : c2.push(a2));
  b.child = d2;
  b.memoizedState = null;
  return d2;
}
function qj(a2, b) {
  b = pj({ mode: "visible", children: b }, a2.mode, 0, null);
  b.return = a2;
  return a2.child = b;
}
function sj(a2, b, c2, d2) {
  null !== d2 && Jg(d2);
  Ug(b, a2.child, null, c2);
  a2 = qj(b, b.pendingProps.children);
  a2.flags |= 2;
  b.memoizedState = null;
  return a2;
}
function rj(a2, b, c2, d2, e2, f2, g2) {
  if (c2) {
    if (b.flags & 256) return b.flags &= -257, d2 = Ki(Error(p$1(422))), sj(a2, b, g2, d2);
    if (null !== b.memoizedState) return b.child = a2.child, b.flags |= 128, null;
    f2 = d2.fallback;
    e2 = b.mode;
    d2 = pj({ mode: "visible", children: d2.children }, e2, 0, null);
    f2 = Tg(f2, e2, g2, null);
    f2.flags |= 2;
    d2.return = b;
    f2.return = b;
    d2.sibling = f2;
    b.child = d2;
    0 !== (b.mode & 1) && Ug(b, a2.child, null, g2);
    b.child.memoizedState = nj(g2);
    b.memoizedState = mj;
    return f2;
  }
  if (0 === (b.mode & 1)) return sj(a2, b, g2, null);
  if ("$!" === e2.data) {
    d2 = e2.nextSibling && e2.nextSibling.dataset;
    if (d2) var h2 = d2.dgst;
    d2 = h2;
    f2 = Error(p$1(419));
    d2 = Ki(f2, d2, void 0);
    return sj(a2, b, g2, d2);
  }
  h2 = 0 !== (g2 & a2.childLanes);
  if (dh || h2) {
    d2 = Q$1;
    if (null !== d2) {
      switch (g2 & -g2) {
        case 4:
          e2 = 2;
          break;
        case 16:
          e2 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e2 = 32;
          break;
        case 536870912:
          e2 = 268435456;
          break;
        default:
          e2 = 0;
      }
      e2 = 0 !== (e2 & (d2.suspendedLanes | g2)) ? 0 : e2;
      0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, ih(a2, e2), gi(d2, a2, e2, -1));
    }
    tj();
    d2 = Ki(Error(p$1(421)));
    return sj(a2, b, g2, d2);
  }
  if ("$?" === e2.data) return b.flags |= 128, b.child = a2.child, b = uj.bind(null, a2), e2._reactRetry = b, null;
  a2 = f2.treeContext;
  yg = Lf(e2.nextSibling);
  xg = b;
  I = true;
  zg = null;
  null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b);
  b = qj(b, d2.children);
  b.flags |= 4096;
  return b;
}
function vj(a2, b, c2) {
  a2.lanes |= b;
  var d2 = a2.alternate;
  null !== d2 && (d2.lanes |= b);
  bh(a2.return, b, c2);
}
function wj(a2, b, c2, d2, e2) {
  var f2 = a2.memoizedState;
  null === f2 ? a2.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e2 } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e2);
}
function xj(a2, b, c2) {
  var d2 = b.pendingProps, e2 = d2.revealOrder, f2 = d2.tail;
  Xi(a2, b, d2.children, c2);
  d2 = L$1.current;
  if (0 !== (d2 & 2)) d2 = d2 & 1 | 2, b.flags |= 128;
  else {
    if (null !== a2 && 0 !== (a2.flags & 128)) a: for (a2 = b.child; null !== a2; ) {
      if (13 === a2.tag) null !== a2.memoizedState && vj(a2, c2, b);
      else if (19 === a2.tag) vj(a2, c2, b);
      else if (null !== a2.child) {
        a2.child.return = a2;
        a2 = a2.child;
        continue;
      }
      if (a2 === b) break a;
      for (; null === a2.sibling; ) {
        if (null === a2.return || a2.return === b) break a;
        a2 = a2.return;
      }
      a2.sibling.return = a2.return;
      a2 = a2.sibling;
    }
    d2 &= 1;
  }
  G(L$1, d2);
  if (0 === (b.mode & 1)) b.memoizedState = null;
  else switch (e2) {
    case "forwards":
      c2 = b.child;
      for (e2 = null; null !== c2; ) a2 = c2.alternate, null !== a2 && null === Ch(a2) && (e2 = c2), c2 = c2.sibling;
      c2 = e2;
      null === c2 ? (e2 = b.child, b.child = null) : (e2 = c2.sibling, c2.sibling = null);
      wj(b, false, e2, c2, f2);
      break;
    case "backwards":
      c2 = null;
      e2 = b.child;
      for (b.child = null; null !== e2; ) {
        a2 = e2.alternate;
        if (null !== a2 && null === Ch(a2)) {
          b.child = e2;
          break;
        }
        a2 = e2.sibling;
        e2.sibling = c2;
        c2 = e2;
        e2 = a2;
      }
      wj(b, true, c2, null, f2);
      break;
    case "together":
      wj(b, false, null, null, void 0);
      break;
    default:
      b.memoizedState = null;
  }
  return b.child;
}
function ij(a2, b) {
  0 === (b.mode & 1) && null !== a2 && (a2.alternate = null, b.alternate = null, b.flags |= 2);
}
function Zi(a2, b, c2) {
  null !== a2 && (b.dependencies = a2.dependencies);
  rh |= b.lanes;
  if (0 === (c2 & b.childLanes)) return null;
  if (null !== a2 && b.child !== a2.child) throw Error(p$1(153));
  if (null !== b.child) {
    a2 = b.child;
    c2 = Pg(a2, a2.pendingProps);
    b.child = c2;
    for (c2.return = b; null !== a2.sibling; ) a2 = a2.sibling, c2 = c2.sibling = Pg(a2, a2.pendingProps), c2.return = b;
    c2.sibling = null;
  }
  return b.child;
}
function yj(a2, b, c2) {
  switch (b.tag) {
    case 3:
      kj(b);
      Ig();
      break;
    case 5:
      Ah(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      yh(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d2 = b.type._context, e2 = b.memoizedProps.value;
      G(Wg, d2._currentValue);
      d2._currentValue = e2;
      break;
    case 13:
      d2 = b.memoizedState;
      if (null !== d2) {
        if (null !== d2.dehydrated) return G(L$1, L$1.current & 1), b.flags |= 128, null;
        if (0 !== (c2 & b.child.childLanes)) return oj(a2, b, c2);
        G(L$1, L$1.current & 1);
        a2 = Zi(a2, b, c2);
        return null !== a2 ? a2.sibling : null;
      }
      G(L$1, L$1.current & 1);
      break;
    case 19:
      d2 = 0 !== (c2 & b.childLanes);
      if (0 !== (a2.flags & 128)) {
        if (d2) return xj(a2, b, c2);
        b.flags |= 128;
      }
      e2 = b.memoizedState;
      null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
      G(L$1, L$1.current);
      if (d2) break;
      else return null;
    case 22:
    case 23:
      return b.lanes = 0, dj(a2, b, c2);
  }
  return Zi(a2, b, c2);
}
var zj, Aj, Bj, Cj;
zj = function(a2, b) {
  for (var c2 = b.child; null !== c2; ) {
    if (5 === c2.tag || 6 === c2.tag) a2.appendChild(c2.stateNode);
    else if (4 !== c2.tag && null !== c2.child) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b) break;
    for (; null === c2.sibling; ) {
      if (null === c2.return || c2.return === b) return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Aj = function() {
};
Bj = function(a2, b, c2, d2) {
  var e2 = a2.memoizedProps;
  if (e2 !== d2) {
    a2 = b.stateNode;
    xh(uh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e2 = Ya(a2, e2);
        d2 = Ya(a2, d2);
        f2 = [];
        break;
      case "select":
        e2 = A({}, e2, { value: void 0 });
        d2 = A({}, d2, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e2 = gb(a2, e2);
        d2 = gb(a2, d2);
        f2 = [];
        break;
      default:
        "function" !== typeof e2.onClick && "function" === typeof d2.onClick && (a2.onclick = Bf);
    }
    ub(c2, d2);
    var g2;
    c2 = null;
    for (l2 in e2) if (!d2.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2]) if ("style" === l2) {
      var h2 = e2[l2];
      for (g2 in h2) h2.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
    } else "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d2) {
      var k2 = d2[l2];
      h2 = null != e2 ? e2[l2] : void 0;
      if (d2.hasOwnProperty(l2) && k2 !== h2 && (null != k2 || null != h2)) if ("style" === l2) if (h2) {
        for (g2 in h2) !h2.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
        for (g2 in k2) k2.hasOwnProperty(g2) && h2[g2] !== k2[g2] && (c2 || (c2 = {}), c2[g2] = k2[g2]);
      } else c2 || (f2 || (f2 = []), f2.push(
        l2,
        c2
      )), c2 = k2;
      else "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k2 && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D$1("scroll", a2), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b.updateQueue = l2) b.flags |= 4;
  }
};
Cj = function(a2, b, c2, d2) {
  c2 !== d2 && (b.flags |= 4);
};
function Dj(a2, b) {
  if (!I) switch (a2.tailMode) {
    case "hidden":
      b = a2.tail;
      for (var c2 = null; null !== b; ) null !== b.alternate && (c2 = b), b = b.sibling;
      null === c2 ? a2.tail = null : c2.sibling = null;
      break;
    case "collapsed":
      c2 = a2.tail;
      for (var d2 = null; null !== c2; ) null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
      null === d2 ? b || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d2.sibling = null;
  }
}
function S$1(a2) {
  var b = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d2 = 0;
  if (b) for (var e2 = a2.child; null !== e2; ) c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags & 14680064, d2 |= e2.flags & 14680064, e2.return = a2, e2 = e2.sibling;
  else for (e2 = a2.child; null !== e2; ) c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags, d2 |= e2.flags, e2.return = a2, e2 = e2.sibling;
  a2.subtreeFlags |= d2;
  a2.childLanes = c2;
  return b;
}
function Ej(a2, b, c2) {
  var d2 = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S$1(b), null;
    case 1:
      return Zf(b.type) && $f(), S$1(b), null;
    case 3:
      d2 = b.stateNode;
      zh();
      E$1(Wf);
      E$1(H$1);
      Eh();
      d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
      if (null === a2 || null === a2.child) Gg(b) ? b.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
      Aj(a2, b);
      S$1(b);
      return null;
    case 5:
      Bh(b);
      var e2 = xh(wh.current);
      c2 = b.type;
      if (null !== a2 && null != b.stateNode) Bj(a2, b, c2, d2, e2), a2.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d2) {
          if (null === b.stateNode) throw Error(p$1(166));
          S$1(b);
          return null;
        }
        a2 = xh(uh.current);
        if (Gg(b)) {
          d2 = b.stateNode;
          c2 = b.type;
          var f2 = b.memoizedProps;
          d2[Of] = b;
          d2[Pf] = f2;
          a2 = 0 !== (b.mode & 1);
          switch (c2) {
            case "dialog":
              D$1("cancel", d2);
              D$1("close", d2);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$1("load", d2);
              break;
            case "video":
            case "audio":
              for (e2 = 0; e2 < lf.length; e2++) D$1(lf[e2], d2);
              break;
            case "source":
              D$1("error", d2);
              break;
            case "img":
            case "image":
            case "link":
              D$1(
                "error",
                d2
              );
              D$1("load", d2);
              break;
            case "details":
              D$1("toggle", d2);
              break;
            case "input":
              Za(d2, f2);
              D$1("invalid", d2);
              break;
            case "select":
              d2._wrapperState = { wasMultiple: !!f2.multiple };
              D$1("invalid", d2);
              break;
            case "textarea":
              hb(d2, f2), D$1("invalid", d2);
          }
          ub(c2, f2);
          e2 = null;
          for (var g2 in f2) if (f2.hasOwnProperty(g2)) {
            var h2 = f2[g2];
            "children" === g2 ? "string" === typeof h2 ? d2.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d2.textContent, h2, a2), e2 = ["children", h2]) : "number" === typeof h2 && d2.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
              d2.textContent,
              h2,
              a2
            ), e2 = ["children", "" + h2]) : ea.hasOwnProperty(g2) && null != h2 && "onScroll" === g2 && D$1("scroll", d2);
          }
          switch (c2) {
            case "input":
              Va(d2);
              db(d2, f2, true);
              break;
            case "textarea":
              Va(d2);
              jb(d2);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d2.onclick = Bf);
          }
          d2 = e2;
          b.updateQueue = d2;
          null !== d2 && (b.flags |= 4);
        } else {
          g2 = 9 === e2.nodeType ? e2 : e2.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb(c2));
          "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g2.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d2.is ? a2 = g2.createElement(c2, { is: d2.is }) : (a2 = g2.createElement(c2), "select" === c2 && (g2 = a2, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a2 = g2.createElementNS(a2, c2);
          a2[Of] = b;
          a2[Pf] = d2;
          zj(a2, b, false, false);
          b.stateNode = a2;
          a: {
            g2 = vb(c2, d2);
            switch (c2) {
              case "dialog":
                D$1("cancel", a2);
                D$1("close", a2);
                e2 = d2;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$1("load", a2);
                e2 = d2;
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++) D$1(lf[e2], a2);
                e2 = d2;
                break;
              case "source":
                D$1("error", a2);
                e2 = d2;
                break;
              case "img":
              case "image":
              case "link":
                D$1(
                  "error",
                  a2
                );
                D$1("load", a2);
                e2 = d2;
                break;
              case "details":
                D$1("toggle", a2);
                e2 = d2;
                break;
              case "input":
                Za(a2, d2);
                e2 = Ya(a2, d2);
                D$1("invalid", a2);
                break;
              case "option":
                e2 = d2;
                break;
              case "select":
                a2._wrapperState = { wasMultiple: !!d2.multiple };
                e2 = A({}, d2, { value: void 0 });
                D$1("invalid", a2);
                break;
              case "textarea":
                hb(a2, d2);
                e2 = gb(a2, d2);
                D$1("invalid", a2);
                break;
              default:
                e2 = d2;
            }
            ub(c2, e2);
            h2 = e2;
            for (f2 in h2) if (h2.hasOwnProperty(f2)) {
              var k2 = h2[f2];
              "style" === f2 ? sb(a2, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a2, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob(a2, k2) : "number" === typeof k2 && ob(a2, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D$1("scroll", a2) : null != k2 && ta(a2, f2, k2, g2));
            }
            switch (c2) {
              case "input":
                Va(a2);
                db(a2, d2, false);
                break;
              case "textarea":
                Va(a2);
                jb(a2);
                break;
              case "option":
                null != d2.value && a2.setAttribute("value", "" + Sa(d2.value));
                break;
              case "select":
                a2.multiple = !!d2.multiple;
                f2 = d2.value;
                null != f2 ? fb(a2, !!d2.multiple, f2, false) : null != d2.defaultValue && fb(
                  a2,
                  !!d2.multiple,
                  d2.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e2.onClick && (a2.onclick = Bf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d2 = !!d2.autoFocus;
                break a;
              case "img":
                d2 = true;
                break a;
              default:
                d2 = false;
            }
          }
          d2 && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S$1(b);
      return null;
    case 6:
      if (a2 && null != b.stateNode) Cj(a2, b, a2.memoizedProps, d2);
      else {
        if ("string" !== typeof d2 && null === b.stateNode) throw Error(p$1(166));
        c2 = xh(wh.current);
        xh(uh.current);
        if (Gg(b)) {
          d2 = b.stateNode;
          c2 = b.memoizedProps;
          d2[Of] = b;
          if (f2 = d2.nodeValue !== c2) {
            if (a2 = xg, null !== a2) switch (a2.tag) {
              case 3:
                Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
                break;
              case 5:
                true !== a2.memoizedProps.suppressHydrationWarning && Af(d2.nodeValue, c2, 0 !== (a2.mode & 1));
            }
          }
          f2 && (b.flags |= 4);
        } else d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Of] = b, b.stateNode = d2;
      }
      S$1(b);
      return null;
    case 13:
      E$1(L$1);
      d2 = b.memoizedState;
      if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d2 && null !== d2.dehydrated) {
          if (null === a2) {
            if (!f2) throw Error(p$1(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2) throw Error(p$1(317));
            f2[Of] = b;
          } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S$1(b);
          f2 = false;
        } else null !== zg && (Fj(zg), zg = null), f2 = true;
        if (!f2) return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128)) return b.lanes = c2, b;
      d2 = null !== d2;
      d2 !== (null !== a2 && null !== a2.memoizedState) && d2 && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a2 || 0 !== (L$1.current & 1) ? 0 === T && (T = 3) : tj()));
      null !== b.updateQueue && (b.flags |= 4);
      S$1(b);
      return null;
    case 4:
      return zh(), Aj(a2, b), null === a2 && sf(b.stateNode.containerInfo), S$1(b), null;
    case 10:
      return ah(b.type._context), S$1(b), null;
    case 17:
      return Zf(b.type) && $f(), S$1(b), null;
    case 19:
      E$1(L$1);
      f2 = b.memoizedState;
      if (null === f2) return S$1(b), null;
      d2 = 0 !== (b.flags & 128);
      g2 = f2.rendering;
      if (null === g2) if (d2) Dj(f2, false);
      else {
        if (0 !== T || null !== a2 && 0 !== (a2.flags & 128)) for (a2 = b.child; null !== a2; ) {
          g2 = Ch(a2);
          if (null !== g2) {
            b.flags |= 128;
            Dj(f2, false);
            d2 = g2.updateQueue;
            null !== d2 && (b.updateQueue = d2, b.flags |= 4);
            b.subtreeFlags = 0;
            d2 = c2;
            for (c2 = b.child; null !== c2; ) f2 = c2, a2 = d2, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a2, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a2 = g2.dependencies, f2.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
            G(L$1, L$1.current & 1 | 2);
            return b.child;
          }
          a2 = a2.sibling;
        }
        null !== f2.tail && B() > Gj && (b.flags |= 128, d2 = true, Dj(f2, false), b.lanes = 4194304);
      }
      else {
        if (!d2) if (a2 = Ch(g2), null !== a2) {
          if (b.flags |= 128, d2 = true, c2 = a2.updateQueue, null !== c2 && (b.updateQueue = c2, b.flags |= 4), Dj(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I) return S$1(b), null;
        } else 2 * B() - f2.renderingStartTime > Gj && 1073741824 !== c2 && (b.flags |= 128, d2 = true, Dj(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g2.sibling = b.child, b.child = g2) : (c2 = f2.last, null !== c2 ? c2.sibling = g2 : b.child = g2, f2.last = g2);
      }
      if (null !== f2.tail) return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B(), b.sibling = null, c2 = L$1.current, G(L$1, d2 ? c2 & 1 | 2 : c2 & 1), b;
      S$1(b);
      return null;
    case 22:
    case 23:
      return Hj(), d2 = null !== b.memoizedState, null !== a2 && null !== a2.memoizedState !== d2 && (b.flags |= 8192), d2 && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S$1(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S$1(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$1(156, b.tag));
}
function Ij(a2, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a2 = b.flags, a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
    case 3:
      return zh(), E$1(Wf), E$1(H$1), Eh(), a2 = b.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b.flags = a2 & -65537 | 128, b) : null;
    case 5:
      return Bh(b), null;
    case 13:
      E$1(L$1);
      a2 = b.memoizedState;
      if (null !== a2 && null !== a2.dehydrated) {
        if (null === b.alternate) throw Error(p$1(340));
        Ig();
      }
      a2 = b.flags;
      return a2 & 65536 ? (b.flags = a2 & -65537 | 128, b) : null;
    case 19:
      return E$1(L$1), null;
    case 4:
      return zh(), null;
    case 10:
      return ah(b.type._context), null;
    case 22:
    case 23:
      return Hj(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Jj = false, U = false, Kj = "function" === typeof WeakSet ? WeakSet : Set, V$1 = null;
function Lj(a2, b) {
  var c2 = a2.ref;
  if (null !== c2) if ("function" === typeof c2) try {
    c2(null);
  } catch (d2) {
    W$1(a2, b, d2);
  }
  else c2.current = null;
}
function Mj(a2, b, c2) {
  try {
    c2();
  } catch (d2) {
    W$1(a2, b, d2);
  }
}
var Nj = false;
function Oj(a2, b) {
  Cf = dd;
  a2 = Me$1();
  if (Ne(a2)) {
    if ("selectionStart" in a2) var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
    else a: {
      c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
      var d2 = c2.getSelection && c2.getSelection();
      if (d2 && 0 !== d2.rangeCount) {
        c2 = d2.anchorNode;
        var e2 = d2.anchorOffset, f2 = d2.focusNode;
        d2 = d2.focusOffset;
        try {
          c2.nodeType, f2.nodeType;
        } catch (F2) {
          c2 = null;
          break a;
        }
        var g2 = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a2, r2 = null;
        b: for (; ; ) {
          for (var y2; ; ) {
            q2 !== c2 || 0 !== e2 && 3 !== q2.nodeType || (h2 = g2 + e2);
            q2 !== f2 || 0 !== d2 && 3 !== q2.nodeType || (k2 = g2 + d2);
            3 === q2.nodeType && (g2 += q2.nodeValue.length);
            if (null === (y2 = q2.firstChild)) break;
            r2 = q2;
            q2 = y2;
          }
          for (; ; ) {
            if (q2 === a2) break b;
            r2 === c2 && ++l2 === e2 && (h2 = g2);
            r2 === f2 && ++m2 === d2 && (k2 = g2);
            if (null !== (y2 = q2.nextSibling)) break;
            q2 = r2;
            r2 = q2.parentNode;
          }
          q2 = y2;
        }
        c2 = -1 === h2 || -1 === k2 ? null : { start: h2, end: k2 };
      } else c2 = null;
    }
    c2 = c2 || { start: 0, end: 0 };
  } else c2 = null;
  Df = { focusedElem: a2, selectionRange: c2 };
  dd = false;
  for (V$1 = b; null !== V$1; ) if (b = V$1, a2 = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a2) a2.return = b, V$1 = a2;
  else for (; null !== V$1; ) {
    b = V$1;
    try {
      var n2 = b.alternate;
      if (0 !== (b.flags & 1024)) switch (b.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (null !== n2) {
            var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Ci(b.type, t2), J2);
            x2.__reactInternalSnapshotBeforeUpdate = w2;
          }
          break;
        case 3:
          var u2 = b.stateNode.containerInfo;
          1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(p$1(163));
      }
    } catch (F2) {
      W$1(b, b.return, F2);
    }
    a2 = b.sibling;
    if (null !== a2) {
      a2.return = b.return;
      V$1 = a2;
      break;
    }
    V$1 = b.return;
  }
  n2 = Nj;
  Nj = false;
  return n2;
}
function Pj(a2, b, c2) {
  var d2 = b.updateQueue;
  d2 = null !== d2 ? d2.lastEffect : null;
  if (null !== d2) {
    var e2 = d2 = d2.next;
    do {
      if ((e2.tag & a2) === a2) {
        var f2 = e2.destroy;
        e2.destroy = void 0;
        void 0 !== f2 && Mj(b, c2, f2);
      }
      e2 = e2.next;
    } while (e2 !== d2);
  }
}
function Qj(a2, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c2 = b = b.next;
    do {
      if ((c2.tag & a2) === a2) {
        var d2 = c2.create;
        c2.destroy = d2();
      }
      c2 = c2.next;
    } while (c2 !== b);
  }
}
function Rj(a2) {
  var b = a2.ref;
  if (null !== b) {
    var c2 = a2.stateNode;
    switch (a2.tag) {
      case 5:
        a2 = c2;
        break;
      default:
        a2 = c2;
    }
    "function" === typeof b ? b(a2) : b.current = a2;
  }
}
function Sj(a2) {
  var b = a2.alternate;
  null !== b && (a2.alternate = null, Sj(b));
  a2.child = null;
  a2.deletions = null;
  a2.sibling = null;
  5 === a2.tag && (b = a2.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a2.stateNode = null;
  a2.return = null;
  a2.dependencies = null;
  a2.memoizedProps = null;
  a2.memoizedState = null;
  a2.pendingProps = null;
  a2.stateNode = null;
  a2.updateQueue = null;
}
function Tj(a2) {
  return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
}
function Uj(a2) {
  a: for (; ; ) {
    for (; null === a2.sibling; ) {
      if (null === a2.return || Tj(a2.return)) return null;
      a2 = a2.return;
    }
    a2.sibling.return = a2.return;
    for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
      if (a2.flags & 2) continue a;
      if (null === a2.child || 4 === a2.tag) continue a;
      else a2.child.return = a2, a2 = a2.child;
    }
    if (!(a2.flags & 2)) return a2.stateNode;
  }
}
function Vj(a2, b, c2) {
  var d2 = a2.tag;
  if (5 === d2 || 6 === d2) a2 = a2.stateNode, b ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b) : c2.insertBefore(a2, b) : (8 === c2.nodeType ? (b = c2.parentNode, b.insertBefore(a2, c2)) : (b = c2, b.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d2 && (a2 = a2.child, null !== a2)) for (Vj(a2, b, c2), a2 = a2.sibling; null !== a2; ) Vj(a2, b, c2), a2 = a2.sibling;
}
function Wj(a2, b, c2) {
  var d2 = a2.tag;
  if (5 === d2 || 6 === d2) a2 = a2.stateNode, b ? c2.insertBefore(a2, b) : c2.appendChild(a2);
  else if (4 !== d2 && (a2 = a2.child, null !== a2)) for (Wj(a2, b, c2), a2 = a2.sibling; null !== a2; ) Wj(a2, b, c2), a2 = a2.sibling;
}
var X = null, Xj = false;
function Yj(a2, b, c2) {
  for (c2 = c2.child; null !== c2; ) Zj(a2, b, c2), c2 = c2.sibling;
}
function Zj(a2, b, c2) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
    lc.onCommitFiberUnmount(kc, c2);
  } catch (h2) {
  }
  switch (c2.tag) {
    case 5:
      U || Lj(c2, b);
    case 6:
      var d2 = X, e2 = Xj;
      X = null;
      Yj(a2, b, c2);
      X = d2;
      Xj = e2;
      null !== X && (Xj ? (a2 = X, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X.removeChild(c2.stateNode));
      break;
    case 18:
      null !== X && (Xj ? (a2 = X, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd(a2)) : Kf(X, c2.stateNode));
      break;
    case 4:
      d2 = X;
      e2 = Xj;
      X = c2.stateNode.containerInfo;
      Xj = true;
      Yj(a2, b, c2);
      X = d2;
      Xj = e2;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
        e2 = d2 = d2.next;
        do {
          var f2 = e2, g2 = f2.destroy;
          f2 = f2.tag;
          void 0 !== g2 && (0 !== (f2 & 2) ? Mj(c2, b, g2) : 0 !== (f2 & 4) && Mj(c2, b, g2));
          e2 = e2.next;
        } while (e2 !== d2);
      }
      Yj(a2, b, c2);
      break;
    case 1:
      if (!U && (Lj(c2, b), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount)) try {
        d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
      } catch (h2) {
        W$1(c2, b, h2);
      }
      Yj(a2, b, c2);
      break;
    case 21:
      Yj(a2, b, c2);
      break;
    case 22:
      c2.mode & 1 ? (U = (d2 = U) || null !== c2.memoizedState, Yj(a2, b, c2), U = d2) : Yj(a2, b, c2);
      break;
    default:
      Yj(a2, b, c2);
  }
}
function ak(a2) {
  var b = a2.updateQueue;
  if (null !== b) {
    a2.updateQueue = null;
    var c2 = a2.stateNode;
    null === c2 && (c2 = a2.stateNode = new Kj());
    b.forEach(function(b2) {
      var d2 = bk.bind(null, a2, b2);
      c2.has(b2) || (c2.add(b2), b2.then(d2, d2));
    });
  }
}
function ck(a2, b) {
  var c2 = b.deletions;
  if (null !== c2) for (var d2 = 0; d2 < c2.length; d2++) {
    var e2 = c2[d2];
    try {
      var f2 = a2, g2 = b, h2 = g2;
      a: for (; null !== h2; ) {
        switch (h2.tag) {
          case 5:
            X = h2.stateNode;
            Xj = false;
            break a;
          case 3:
            X = h2.stateNode.containerInfo;
            Xj = true;
            break a;
          case 4:
            X = h2.stateNode.containerInfo;
            Xj = true;
            break a;
        }
        h2 = h2.return;
      }
      if (null === X) throw Error(p$1(160));
      Zj(f2, g2, e2);
      X = null;
      Xj = false;
      var k2 = e2.alternate;
      null !== k2 && (k2.return = null);
      e2.return = null;
    } catch (l2) {
      W$1(e2, b, l2);
    }
  }
  if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a2), b = b.sibling;
}
function dk(a2, b) {
  var c2 = a2.alternate, d2 = a2.flags;
  switch (a2.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      ck(b, a2);
      ek(a2);
      if (d2 & 4) {
        try {
          Pj(3, a2, a2.return), Qj(3, a2);
        } catch (t2) {
          W$1(a2, a2.return, t2);
        }
        try {
          Pj(5, a2, a2.return);
        } catch (t2) {
          W$1(a2, a2.return, t2);
        }
      }
      break;
    case 1:
      ck(b, a2);
      ek(a2);
      d2 & 512 && null !== c2 && Lj(c2, c2.return);
      break;
    case 5:
      ck(b, a2);
      ek(a2);
      d2 & 512 && null !== c2 && Lj(c2, c2.return);
      if (a2.flags & 32) {
        var e2 = a2.stateNode;
        try {
          ob(e2, "");
        } catch (t2) {
          W$1(a2, a2.return, t2);
        }
      }
      if (d2 & 4 && (e2 = a2.stateNode, null != e2)) {
        var f2 = a2.memoizedProps, g2 = null !== c2 ? c2.memoizedProps : f2, h2 = a2.type, k2 = a2.updateQueue;
        a2.updateQueue = null;
        if (null !== k2) try {
          "input" === h2 && "radio" === f2.type && null != f2.name && ab(e2, f2);
          vb(h2, g2);
          var l2 = vb(h2, f2);
          for (g2 = 0; g2 < k2.length; g2 += 2) {
            var m2 = k2[g2], q2 = k2[g2 + 1];
            "style" === m2 ? sb(e2, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e2, q2) : "children" === m2 ? ob(e2, q2) : ta(e2, m2, q2, l2);
          }
          switch (h2) {
            case "input":
              bb(e2, f2);
              break;
            case "textarea":
              ib(e2, f2);
              break;
            case "select":
              var r2 = e2._wrapperState.wasMultiple;
              e2._wrapperState.wasMultiple = !!f2.multiple;
              var y2 = f2.value;
              null != y2 ? fb(e2, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                e2,
                !!f2.multiple,
                f2.defaultValue,
                true
              ) : fb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
          }
          e2[Pf] = f2;
        } catch (t2) {
          W$1(a2, a2.return, t2);
        }
      }
      break;
    case 6:
      ck(b, a2);
      ek(a2);
      if (d2 & 4) {
        if (null === a2.stateNode) throw Error(p$1(162));
        e2 = a2.stateNode;
        f2 = a2.memoizedProps;
        try {
          e2.nodeValue = f2;
        } catch (t2) {
          W$1(a2, a2.return, t2);
        }
      }
      break;
    case 3:
      ck(b, a2);
      ek(a2);
      if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated) try {
        bd(b.containerInfo);
      } catch (t2) {
        W$1(a2, a2.return, t2);
      }
      break;
    case 4:
      ck(b, a2);
      ek(a2);
      break;
    case 13:
      ck(b, a2);
      ek(a2);
      e2 = a2.child;
      e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (fk = B()));
      d2 & 4 && ak(a2);
      break;
    case 22:
      m2 = null !== c2 && null !== c2.memoizedState;
      a2.mode & 1 ? (U = (l2 = U) || m2, ck(b, a2), U = l2) : ck(b, a2);
      ek(a2);
      if (d2 & 8192) {
        l2 = null !== a2.memoizedState;
        if ((a2.stateNode.isHidden = l2) && !m2 && 0 !== (a2.mode & 1)) for (V$1 = a2, m2 = a2.child; null !== m2; ) {
          for (q2 = V$1 = m2; null !== V$1; ) {
            r2 = V$1;
            y2 = r2.child;
            switch (r2.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Pj(4, r2, r2.return);
                break;
              case 1:
                Lj(r2, r2.return);
                var n2 = r2.stateNode;
                if ("function" === typeof n2.componentWillUnmount) {
                  d2 = r2;
                  c2 = r2.return;
                  try {
                    b = d2, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                  } catch (t2) {
                    W$1(d2, c2, t2);
                  }
                }
                break;
              case 5:
                Lj(r2, r2.return);
                break;
              case 22:
                if (null !== r2.memoizedState) {
                  gk(q2);
                  continue;
                }
            }
            null !== y2 ? (y2.return = r2, V$1 = y2) : gk(q2);
          }
          m2 = m2.sibling;
        }
        a: for (m2 = null, q2 = a2; ; ) {
          if (5 === q2.tag) {
            if (null === m2) {
              m2 = q2;
              try {
                e2 = q2.stateNode, l2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g2));
              } catch (t2) {
                W$1(a2, a2.return, t2);
              }
            }
          } else if (6 === q2.tag) {
            if (null === m2) try {
              q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
            } catch (t2) {
              W$1(a2, a2.return, t2);
            }
          } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a2) && null !== q2.child) {
            q2.child.return = q2;
            q2 = q2.child;
            continue;
          }
          if (q2 === a2) break a;
          for (; null === q2.sibling; ) {
            if (null === q2.return || q2.return === a2) break a;
            m2 === q2 && (m2 = null);
            q2 = q2.return;
          }
          m2 === q2 && (m2 = null);
          q2.sibling.return = q2.return;
          q2 = q2.sibling;
        }
      }
      break;
    case 19:
      ck(b, a2);
      ek(a2);
      d2 & 4 && ak(a2);
      break;
    case 21:
      break;
    default:
      ck(
        b,
        a2
      ), ek(a2);
  }
}
function ek(a2) {
  var b = a2.flags;
  if (b & 2) {
    try {
      a: {
        for (var c2 = a2.return; null !== c2; ) {
          if (Tj(c2)) {
            var d2 = c2;
            break a;
          }
          c2 = c2.return;
        }
        throw Error(p$1(160));
      }
      switch (d2.tag) {
        case 5:
          var e2 = d2.stateNode;
          d2.flags & 32 && (ob(e2, ""), d2.flags &= -33);
          var f2 = Uj(a2);
          Wj(a2, f2, e2);
          break;
        case 3:
        case 4:
          var g2 = d2.stateNode.containerInfo, h2 = Uj(a2);
          Vj(a2, h2, g2);
          break;
        default:
          throw Error(p$1(161));
      }
    } catch (k2) {
      W$1(a2, a2.return, k2);
    }
    a2.flags &= -3;
  }
  b & 4096 && (a2.flags &= -4097);
}
function hk(a2, b, c2) {
  V$1 = a2;
  ik(a2);
}
function ik(a2, b, c2) {
  for (var d2 = 0 !== (a2.mode & 1); null !== V$1; ) {
    var e2 = V$1, f2 = e2.child;
    if (22 === e2.tag && d2) {
      var g2 = null !== e2.memoizedState || Jj;
      if (!g2) {
        var h2 = e2.alternate, k2 = null !== h2 && null !== h2.memoizedState || U;
        h2 = Jj;
        var l2 = U;
        Jj = g2;
        if ((U = k2) && !l2) for (V$1 = e2; null !== V$1; ) g2 = V$1, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? jk(e2) : null !== k2 ? (k2.return = g2, V$1 = k2) : jk(e2);
        for (; null !== f2; ) V$1 = f2, ik(f2), f2 = f2.sibling;
        V$1 = e2;
        Jj = h2;
        U = l2;
      }
      kk(a2);
    } else 0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V$1 = f2) : kk(a2);
  }
}
function kk(a2) {
  for (; null !== V$1; ) {
    var b = V$1;
    if (0 !== (b.flags & 8772)) {
      var c2 = b.alternate;
      try {
        if (0 !== (b.flags & 8772)) switch (b.tag) {
          case 0:
          case 11:
          case 15:
            U || Qj(5, b);
            break;
          case 1:
            var d2 = b.stateNode;
            if (b.flags & 4 && !U) if (null === c2) d2.componentDidMount();
            else {
              var e2 = b.elementType === b.type ? c2.memoizedProps : Ci(b.type, c2.memoizedProps);
              d2.componentDidUpdate(e2, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
            }
            var f2 = b.updateQueue;
            null !== f2 && sh(b, f2, d2);
            break;
          case 3:
            var g2 = b.updateQueue;
            if (null !== g2) {
              c2 = null;
              if (null !== b.child) switch (b.child.tag) {
                case 5:
                  c2 = b.child.stateNode;
                  break;
                case 1:
                  c2 = b.child.stateNode;
              }
              sh(b, g2, c2);
            }
            break;
          case 5:
            var h2 = b.stateNode;
            if (null === c2 && b.flags & 4) {
              c2 = h2;
              var k2 = b.memoizedProps;
              switch (b.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  k2.autoFocus && c2.focus();
                  break;
                case "img":
                  k2.src && (c2.src = k2.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (null === b.memoizedState) {
              var l2 = b.alternate;
              if (null !== l2) {
                var m2 = l2.memoizedState;
                if (null !== m2) {
                  var q2 = m2.dehydrated;
                  null !== q2 && bd(q2);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(p$1(163));
        }
        U || b.flags & 512 && Rj(b);
      } catch (r2) {
        W$1(b, b.return, r2);
      }
    }
    if (b === a2) {
      V$1 = null;
      break;
    }
    c2 = b.sibling;
    if (null !== c2) {
      c2.return = b.return;
      V$1 = c2;
      break;
    }
    V$1 = b.return;
  }
}
function gk(a2) {
  for (; null !== V$1; ) {
    var b = V$1;
    if (b === a2) {
      V$1 = null;
      break;
    }
    var c2 = b.sibling;
    if (null !== c2) {
      c2.return = b.return;
      V$1 = c2;
      break;
    }
    V$1 = b.return;
  }
}
function jk(a2) {
  for (; null !== V$1; ) {
    var b = V$1;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b.return;
          try {
            Qj(4, b);
          } catch (k2) {
            W$1(b, c2, k2);
          }
          break;
        case 1:
          var d2 = b.stateNode;
          if ("function" === typeof d2.componentDidMount) {
            var e2 = b.return;
            try {
              d2.componentDidMount();
            } catch (k2) {
              W$1(b, e2, k2);
            }
          }
          var f2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W$1(b, f2, k2);
          }
          break;
        case 5:
          var g2 = b.return;
          try {
            Rj(b);
          } catch (k2) {
            W$1(b, g2, k2);
          }
      }
    } catch (k2) {
      W$1(b, b.return, k2);
    }
    if (b === a2) {
      V$1 = null;
      break;
    }
    var h2 = b.sibling;
    if (null !== h2) {
      h2.return = b.return;
      V$1 = h2;
      break;
    }
    V$1 = b.return;
  }
}
var lk = Math.ceil, mk = ua.ReactCurrentDispatcher, nk = ua.ReactCurrentOwner, ok = ua.ReactCurrentBatchConfig, K = 0, Q$1 = null, Y$1 = null, Z$1 = 0, fj = 0, ej = Uf(0), T = 0, pk = null, rh = 0, qk = 0, rk = 0, sk = null, tk = null, fk = 0, Gj = Infinity, uk = null, Oi = false, Pi = null, Ri = null, vk = false, wk = null, xk = 0, yk = 0, zk = null, Ak = -1, Bk = 0;
function R() {
  return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
}
function yi(a2) {
  if (0 === (a2.mode & 1)) return 1;
  if (0 !== (K & 2) && 0 !== Z$1) return Z$1 & -Z$1;
  if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
  a2 = C$1;
  if (0 !== a2) return a2;
  a2 = window.event;
  a2 = void 0 === a2 ? 16 : jd(a2.type);
  return a2;
}
function gi(a2, b, c2, d2) {
  if (50 < yk) throw yk = 0, zk = null, Error(p$1(185));
  Ac(a2, c2, d2);
  if (0 === (K & 2) || a2 !== Q$1) a2 === Q$1 && (0 === (K & 2) && (qk |= c2), 4 === T && Ck(a2, Z$1)), Dk(a2, d2), 1 === c2 && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
}
function Dk(a2, b) {
  var c2 = a2.callbackNode;
  wc(a2, b);
  var d2 = uc(a2, a2 === Q$1 ? Z$1 : 0);
  if (0 === d2) null !== c2 && bc(c2), a2.callbackNode = null, a2.callbackPriority = 0;
  else if (b = d2 & -d2, a2.callbackPriority !== b) {
    null != c2 && bc(c2);
    if (1 === b) 0 === a2.tag ? ig(Ek.bind(null, a2)) : hg(Ek.bind(null, a2)), Jf(function() {
      0 === (K & 6) && jg();
    }), c2 = null;
    else {
      switch (Dc(d2)) {
        case 1:
          c2 = fc;
          break;
        case 4:
          c2 = gc;
          break;
        case 16:
          c2 = hc;
          break;
        case 536870912:
          c2 = jc;
          break;
        default:
          c2 = hc;
      }
      c2 = Fk(c2, Gk.bind(null, a2));
    }
    a2.callbackPriority = b;
    a2.callbackNode = c2;
  }
}
function Gk(a2, b) {
  Ak = -1;
  Bk = 0;
  if (0 !== (K & 6)) throw Error(p$1(327));
  var c2 = a2.callbackNode;
  if (Hk() && a2.callbackNode !== c2) return null;
  var d2 = uc(a2, a2 === Q$1 ? Z$1 : 0);
  if (0 === d2) return null;
  if (0 !== (d2 & 30) || 0 !== (d2 & a2.expiredLanes) || b) b = Ik(a2, d2);
  else {
    b = d2;
    var e2 = K;
    K |= 2;
    var f2 = Jk();
    if (Q$1 !== a2 || Z$1 !== b) uk = null, Gj = B() + 500, Kk(a2, b);
    do
      try {
        Lk();
        break;
      } catch (h2) {
        Mk(a2, h2);
      }
    while (1);
    $g();
    mk.current = f2;
    K = e2;
    null !== Y$1 ? b = 0 : (Q$1 = null, Z$1 = 0, b = T);
  }
  if (0 !== b) {
    2 === b && (e2 = xc(a2), 0 !== e2 && (d2 = e2, b = Nk(a2, e2)));
    if (1 === b) throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B()), c2;
    if (6 === b) Ck(a2, d2);
    else {
      e2 = a2.current.alternate;
      if (0 === (d2 & 30) && !Ok(e2) && (b = Ik(a2, d2), 2 === b && (f2 = xc(a2), 0 !== f2 && (d2 = f2, b = Nk(a2, f2))), 1 === b)) throw c2 = pk, Kk(a2, 0), Ck(a2, d2), Dk(a2, B()), c2;
      a2.finishedWork = e2;
      a2.finishedLanes = d2;
      switch (b) {
        case 0:
        case 1:
          throw Error(p$1(345));
        case 2:
          Pk(a2, tk, uk);
          break;
        case 3:
          Ck(a2, d2);
          if ((d2 & 130023424) === d2 && (b = fk + 500 - B(), 10 < b)) {
            if (0 !== uc(a2, 0)) break;
            e2 = a2.suspendedLanes;
            if ((e2 & d2) !== d2) {
              R();
              a2.pingedLanes |= a2.suspendedLanes & e2;
              break;
            }
            a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), b);
            break;
          }
          Pk(a2, tk, uk);
          break;
        case 4:
          Ck(a2, d2);
          if ((d2 & 4194240) === d2) break;
          b = a2.eventTimes;
          for (e2 = -1; 0 < d2; ) {
            var g2 = 31 - oc(d2);
            f2 = 1 << g2;
            g2 = b[g2];
            g2 > e2 && (e2 = g2);
            d2 &= ~f2;
          }
          d2 = e2;
          d2 = B() - d2;
          d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * lk(d2 / 1960)) - d2;
          if (10 < d2) {
            a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), d2);
            break;
          }
          Pk(a2, tk, uk);
          break;
        case 5:
          Pk(a2, tk, uk);
          break;
        default:
          throw Error(p$1(329));
      }
    }
  }
  Dk(a2, B());
  return a2.callbackNode === c2 ? Gk.bind(null, a2) : null;
}
function Nk(a2, b) {
  var c2 = sk;
  a2.current.memoizedState.isDehydrated && (Kk(a2, b).flags |= 256);
  a2 = Ik(a2, b);
  2 !== a2 && (b = tk, tk = c2, null !== b && Fj(b));
  return a2;
}
function Fj(a2) {
  null === tk ? tk = a2 : tk.push.apply(tk, a2);
}
function Ok(a2) {
  for (var b = a2; ; ) {
    if (b.flags & 16384) {
      var c2 = b.updateQueue;
      if (null !== c2 && (c2 = c2.stores, null !== c2)) for (var d2 = 0; d2 < c2.length; d2++) {
        var e2 = c2[d2], f2 = e2.getSnapshot;
        e2 = e2.value;
        try {
          if (!He(f2(), e2)) return false;
        } catch (g2) {
          return false;
        }
      }
    }
    c2 = b.child;
    if (b.subtreeFlags & 16384 && null !== c2) c2.return = b, b = c2;
    else {
      if (b === a2) break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a2) return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Ck(a2, b) {
  b &= ~rk;
  b &= ~qk;
  a2.suspendedLanes |= b;
  a2.pingedLanes &= ~b;
  for (a2 = a2.expirationTimes; 0 < b; ) {
    var c2 = 31 - oc(b), d2 = 1 << c2;
    a2[c2] = -1;
    b &= ~d2;
  }
}
function Ek(a2) {
  if (0 !== (K & 6)) throw Error(p$1(327));
  Hk();
  var b = uc(a2, 0);
  if (0 === (b & 1)) return Dk(a2, B()), null;
  var c2 = Ik(a2, b);
  if (0 !== a2.tag && 2 === c2) {
    var d2 = xc(a2);
    0 !== d2 && (b = d2, c2 = Nk(a2, d2));
  }
  if (1 === c2) throw c2 = pk, Kk(a2, 0), Ck(a2, b), Dk(a2, B()), c2;
  if (6 === c2) throw Error(p$1(345));
  a2.finishedWork = a2.current.alternate;
  a2.finishedLanes = b;
  Pk(a2, tk, uk);
  Dk(a2, B());
  return null;
}
function Qk(a2, b) {
  var c2 = K;
  K |= 1;
  try {
    return a2(b);
  } finally {
    K = c2, 0 === K && (Gj = B() + 500, fg && jg());
  }
}
function Rk(a2) {
  null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
  var b = K;
  K |= 1;
  var c2 = ok.transition, d2 = C$1;
  try {
    if (ok.transition = null, C$1 = 1, a2) return a2();
  } finally {
    C$1 = d2, ok.transition = c2, K = b, 0 === (K & 6) && jg();
  }
}
function Hj() {
  fj = ej.current;
  E$1(ej);
}
function Kk(a2, b) {
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  var c2 = a2.timeoutHandle;
  -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
  if (null !== Y$1) for (c2 = Y$1.return; null !== c2; ) {
    var d2 = c2;
    wg(d2);
    switch (d2.tag) {
      case 1:
        d2 = d2.type.childContextTypes;
        null !== d2 && void 0 !== d2 && $f();
        break;
      case 3:
        zh();
        E$1(Wf);
        E$1(H$1);
        Eh();
        break;
      case 5:
        Bh(d2);
        break;
      case 4:
        zh();
        break;
      case 13:
        E$1(L$1);
        break;
      case 19:
        E$1(L$1);
        break;
      case 10:
        ah(d2.type._context);
        break;
      case 22:
      case 23:
        Hj();
    }
    c2 = c2.return;
  }
  Q$1 = a2;
  Y$1 = a2 = Pg(a2.current, null);
  Z$1 = fj = b;
  T = 0;
  pk = null;
  rk = qk = rh = 0;
  tk = sk = null;
  if (null !== fh) {
    for (b = 0; b < fh.length; b++) if (c2 = fh[b], d2 = c2.interleaved, null !== d2) {
      c2.interleaved = null;
      var e2 = d2.next, f2 = c2.pending;
      if (null !== f2) {
        var g2 = f2.next;
        f2.next = e2;
        d2.next = g2;
      }
      c2.pending = d2;
    }
    fh = null;
  }
  return a2;
}
function Mk(a2, b) {
  do {
    var c2 = Y$1;
    try {
      $g();
      Fh.current = Rh;
      if (Ih) {
        for (var d2 = M.memoizedState; null !== d2; ) {
          var e2 = d2.queue;
          null !== e2 && (e2.pending = null);
          d2 = d2.next;
        }
        Ih = false;
      }
      Hh = 0;
      O = N$1 = M = null;
      Jh = false;
      Kh = 0;
      nk.current = null;
      if (null === c2 || null === c2.return) {
        T = 1;
        pk = b;
        Y$1 = null;
        break;
      }
      a: {
        var f2 = a2, g2 = c2.return, h2 = c2, k2 = b;
        b = Z$1;
        h2.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h2, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Ui(g2);
          if (null !== y2) {
            y2.flags &= -257;
            Vi(y2, g2, h2, f2, b);
            y2.mode & 1 && Si(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Si(f2, l2, b);
              tj();
              break a;
            }
            k2 = Error(p$1(426));
          }
        } else if (I && h2.mode & 1) {
          var J2 = Ui(g2);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Vi(J2, g2, h2, f2, b);
            Jg(Ji(k2, h2));
            break a;
          }
        }
        f2 = k2 = Ji(k2, h2);
        4 !== T && (T = 2);
        null === sk ? sk = [f2] : sk.push(f2);
        f2 = g2;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Ni(f2, k2, b);
              ph(f2, x2);
              break a;
            case 1:
              h2 = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Ri || !Ri.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Qi(f2, h2, b);
                ph(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Sk(c2);
    } catch (na) {
      b = na;
      Y$1 === c2 && null !== c2 && (Y$1 = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function Jk() {
  var a2 = mk.current;
  mk.current = Rh;
  return null === a2 ? Rh : a2;
}
function tj() {
  if (0 === T || 3 === T || 2 === T) T = 4;
  null === Q$1 || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q$1, Z$1);
}
function Ik(a2, b) {
  var c2 = K;
  K |= 2;
  var d2 = Jk();
  if (Q$1 !== a2 || Z$1 !== b) uk = null, Kk(a2, b);
  do
    try {
      Tk();
      break;
    } catch (e2) {
      Mk(a2, e2);
    }
  while (1);
  $g();
  K = c2;
  mk.current = d2;
  if (null !== Y$1) throw Error(p$1(261));
  Q$1 = null;
  Z$1 = 0;
  return T;
}
function Tk() {
  for (; null !== Y$1; ) Uk(Y$1);
}
function Lk() {
  for (; null !== Y$1 && !cc(); ) Uk(Y$1);
}
function Uk(a2) {
  var b = Vk(a2.alternate, a2, fj);
  a2.memoizedProps = a2.pendingProps;
  null === b ? Sk(a2) : Y$1 = b;
  nk.current = null;
}
function Sk(a2) {
  var b = a2;
  do {
    var c2 = b.alternate;
    a2 = b.return;
    if (0 === (b.flags & 32768)) {
      if (c2 = Ej(c2, b, fj), null !== c2) {
        Y$1 = c2;
        return;
      }
    } else {
      c2 = Ij(c2, b);
      if (null !== c2) {
        c2.flags &= 32767;
        Y$1 = c2;
        return;
      }
      if (null !== a2) a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
      else {
        T = 6;
        Y$1 = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y$1 = b;
      return;
    }
    Y$1 = b = a2;
  } while (null !== b);
  0 === T && (T = 5);
}
function Pk(a2, b, c2) {
  var d2 = C$1, e2 = ok.transition;
  try {
    ok.transition = null, C$1 = 1, Wk(a2, b, c2, d2);
  } finally {
    ok.transition = e2, C$1 = d2;
  }
  return null;
}
function Wk(a2, b, c2, d2) {
  do
    Hk();
  while (null !== wk);
  if (0 !== (K & 6)) throw Error(p$1(327));
  c2 = a2.finishedWork;
  var e2 = a2.finishedLanes;
  if (null === c2) return null;
  a2.finishedWork = null;
  a2.finishedLanes = 0;
  if (c2 === a2.current) throw Error(p$1(177));
  a2.callbackNode = null;
  a2.callbackPriority = 0;
  var f2 = c2.lanes | c2.childLanes;
  Bc(a2, f2);
  a2 === Q$1 && (Y$1 = Q$1 = null, Z$1 = 0);
  0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc, function() {
    Hk();
    return null;
  }));
  f2 = 0 !== (c2.flags & 15990);
  if (0 !== (c2.subtreeFlags & 15990) || f2) {
    f2 = ok.transition;
    ok.transition = null;
    var g2 = C$1;
    C$1 = 1;
    var h2 = K;
    K |= 4;
    nk.current = null;
    Oj(a2, c2);
    dk(c2, a2);
    Oe$1(Df);
    dd = !!Cf;
    Df = Cf = null;
    a2.current = c2;
    hk(c2);
    dc();
    K = h2;
    C$1 = g2;
    ok.transition = f2;
  } else a2.current = c2;
  vk && (vk = false, wk = a2, xk = e2);
  f2 = a2.pendingLanes;
  0 === f2 && (Ri = null);
  mc(c2.stateNode);
  Dk(a2, B());
  if (null !== b) for (d2 = a2.onRecoverableError, c2 = 0; c2 < b.length; c2++) e2 = b[c2], d2(e2.value, { componentStack: e2.stack, digest: e2.digest });
  if (Oi) throw Oi = false, a2 = Pi, Pi = null, a2;
  0 !== (xk & 1) && 0 !== a2.tag && Hk();
  f2 = a2.pendingLanes;
  0 !== (f2 & 1) ? a2 === zk ? yk++ : (yk = 0, zk = a2) : yk = 0;
  jg();
  return null;
}
function Hk() {
  if (null !== wk) {
    var a2 = Dc(xk), b = ok.transition, c2 = C$1;
    try {
      ok.transition = null;
      C$1 = 16 > a2 ? 16 : a2;
      if (null === wk) var d2 = false;
      else {
        a2 = wk;
        wk = null;
        xk = 0;
        if (0 !== (K & 6)) throw Error(p$1(331));
        var e2 = K;
        K |= 4;
        for (V$1 = a2.current; null !== V$1; ) {
          var f2 = V$1, g2 = f2.child;
          if (0 !== (V$1.flags & 16)) {
            var h2 = f2.deletions;
            if (null !== h2) {
              for (var k2 = 0; k2 < h2.length; k2++) {
                var l2 = h2[k2];
                for (V$1 = l2; null !== V$1; ) {
                  var m2 = V$1;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2) q2.return = m2, V$1 = q2;
                  else for (; null !== V$1; ) {
                    m2 = V$1;
                    var r2 = m2.sibling, y2 = m2.return;
                    Sj(m2);
                    if (m2 === l2) {
                      V$1 = null;
                      break;
                    }
                    if (null !== r2) {
                      r2.return = y2;
                      V$1 = r2;
                      break;
                    }
                    V$1 = y2;
                  }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V$1 = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g2) g2.return = f2, V$1 = g2;
          else b: for (; null !== V$1; ) {
            f2 = V$1;
            if (0 !== (f2.flags & 2048)) switch (f2.tag) {
              case 0:
              case 11:
              case 15:
                Pj(9, f2, f2.return);
            }
            var x2 = f2.sibling;
            if (null !== x2) {
              x2.return = f2.return;
              V$1 = x2;
              break b;
            }
            V$1 = f2.return;
          }
        }
        var w2 = a2.current;
        for (V$1 = w2; null !== V$1; ) {
          g2 = V$1;
          var u2 = g2.child;
          if (0 !== (g2.subtreeFlags & 2064) && null !== u2) u2.return = g2, V$1 = u2;
          else b: for (g2 = w2; null !== V$1; ) {
            h2 = V$1;
            if (0 !== (h2.flags & 2048)) try {
              switch (h2.tag) {
                case 0:
                case 11:
                case 15:
                  Qj(9, h2);
              }
            } catch (na) {
              W$1(h2, h2.return, na);
            }
            if (h2 === g2) {
              V$1 = null;
              break b;
            }
            var F2 = h2.sibling;
            if (null !== F2) {
              F2.return = h2.return;
              V$1 = F2;
              break b;
            }
            V$1 = h2.return;
          }
        }
        K = e2;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
          lc.onPostCommitFiberRoot(kc, a2);
        } catch (na) {
        }
        d2 = true;
      }
      return d2;
    } finally {
      C$1 = c2, ok.transition = b;
    }
  }
  return false;
}
function Xk(a2, b, c2) {
  b = Ji(c2, b);
  b = Ni(a2, b, 1);
  a2 = nh(a2, b, 1);
  b = R();
  null !== a2 && (Ac(a2, 1, b), Dk(a2, b));
}
function W$1(a2, b, c2) {
  if (3 === a2.tag) Xk(a2, a2, c2);
  else for (; null !== b; ) {
    if (3 === b.tag) {
      Xk(b, a2, c2);
      break;
    } else if (1 === b.tag) {
      var d2 = b.stateNode;
      if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Ri || !Ri.has(d2))) {
        a2 = Ji(c2, a2);
        a2 = Qi(b, a2, 1);
        b = nh(b, a2, 1);
        a2 = R();
        null !== b && (Ac(b, 1, a2), Dk(b, a2));
        break;
      }
    }
    b = b.return;
  }
}
function Ti(a2, b, c2) {
  var d2 = a2.pingCache;
  null !== d2 && d2.delete(b);
  b = R();
  a2.pingedLanes |= a2.suspendedLanes & c2;
  Q$1 === a2 && (Z$1 & c2) === c2 && (4 === T || 3 === T && (Z$1 & 130023424) === Z$1 && 500 > B() - fk ? Kk(a2, 0) : rk |= c2);
  Dk(a2, b);
}
function Yk(a2, b) {
  0 === b && (0 === (a2.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c2 = R();
  a2 = ih(a2, b);
  null !== a2 && (Ac(a2, b, c2), Dk(a2, c2));
}
function uj(a2) {
  var b = a2.memoizedState, c2 = 0;
  null !== b && (c2 = b.retryLane);
  Yk(a2, c2);
}
function bk(a2, b) {
  var c2 = 0;
  switch (a2.tag) {
    case 13:
      var d2 = a2.stateNode;
      var e2 = a2.memoizedState;
      null !== e2 && (c2 = e2.retryLane);
      break;
    case 19:
      d2 = a2.stateNode;
      break;
    default:
      throw Error(p$1(314));
  }
  null !== d2 && d2.delete(b);
  Yk(a2, c2);
}
var Vk;
Vk = function(a2, b, c2) {
  if (null !== a2) if (a2.memoizedProps !== b.pendingProps || Wf.current) dh = true;
  else {
    if (0 === (a2.lanes & c2) && 0 === (b.flags & 128)) return dh = false, yj(a2, b, c2);
    dh = 0 !== (a2.flags & 131072) ? true : false;
  }
  else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d2 = b.type;
      ij(a2, b);
      a2 = b.pendingProps;
      var e2 = Yf(b, H$1.current);
      ch(b, c2);
      e2 = Nh(null, b, d2, a2, e2, c2);
      var f2 = Sh();
      b.flags |= 1;
      "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d2) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, kh(b), e2.updater = Ei, b.stateNode = e2, e2._reactInternals = b, Ii(b, d2, a2, c2), b = jj(null, b, d2, true, f2, c2)) : (b.tag = 0, I && f2 && vg(b), Xi(null, b, e2, c2), b = b.child);
      return b;
    case 16:
      d2 = b.elementType;
      a: {
        ij(a2, b);
        a2 = b.pendingProps;
        e2 = d2._init;
        d2 = e2(d2._payload);
        b.type = d2;
        e2 = b.tag = Zk(d2);
        a2 = Ci(d2, a2);
        switch (e2) {
          case 0:
            b = cj(null, b, d2, a2, c2);
            break a;
          case 1:
            b = hj(null, b, d2, a2, c2);
            break a;
          case 11:
            b = Yi(null, b, d2, a2, c2);
            break a;
          case 14:
            b = $i(null, b, d2, Ci(d2.type, a2), c2);
            break a;
        }
        throw Error(p$1(
          306,
          d2,
          ""
        ));
      }
      return b;
    case 0:
      return d2 = b.type, e2 = b.pendingProps, e2 = b.elementType === d2 ? e2 : Ci(d2, e2), cj(a2, b, d2, e2, c2);
    case 1:
      return d2 = b.type, e2 = b.pendingProps, e2 = b.elementType === d2 ? e2 : Ci(d2, e2), hj(a2, b, d2, e2, c2);
    case 3:
      a: {
        kj(b);
        if (null === a2) throw Error(p$1(387));
        d2 = b.pendingProps;
        f2 = b.memoizedState;
        e2 = f2.element;
        lh(a2, b);
        qh(b, d2, null, c2);
        var g2 = b.memoizedState;
        d2 = g2.element;
        if (f2.isDehydrated) if (f2 = { element: d2, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
          e2 = Ji(Error(p$1(423)), b);
          b = lj(a2, b, d2, c2, e2);
          break a;
        } else if (d2 !== e2) {
          e2 = Ji(Error(p$1(424)), b);
          b = lj(a2, b, d2, c2, e2);
          break a;
        } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c2 = Vg(b, null, d2, c2), b.child = c2; c2; ) c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          Ig();
          if (d2 === e2) {
            b = Zi(a2, b, c2);
            break a;
          }
          Xi(a2, b, d2, c2);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Ah(b), null === a2 && Eg(b), d2 = b.type, e2 = b.pendingProps, f2 = null !== a2 ? a2.memoizedProps : null, g2 = e2.children, Ef(d2, e2) ? g2 = null : null !== f2 && Ef(d2, f2) && (b.flags |= 32), gj(a2, b), Xi(a2, b, g2, c2), b.child;
    case 6:
      return null === a2 && Eg(b), null;
    case 13:
      return oj(a2, b, c2);
    case 4:
      return yh(b, b.stateNode.containerInfo), d2 = b.pendingProps, null === a2 ? b.child = Ug(b, null, d2, c2) : Xi(a2, b, d2, c2), b.child;
    case 11:
      return d2 = b.type, e2 = b.pendingProps, e2 = b.elementType === d2 ? e2 : Ci(d2, e2), Yi(a2, b, d2, e2, c2);
    case 7:
      return Xi(a2, b, b.pendingProps, c2), b.child;
    case 8:
      return Xi(a2, b, b.pendingProps.children, c2), b.child;
    case 12:
      return Xi(a2, b, b.pendingProps.children, c2), b.child;
    case 10:
      a: {
        d2 = b.type._context;
        e2 = b.pendingProps;
        f2 = b.memoizedProps;
        g2 = e2.value;
        G(Wg, d2._currentValue);
        d2._currentValue = g2;
        if (null !== f2) if (He(f2.value, g2)) {
          if (f2.children === e2.children && !Wf.current) {
            b = Zi(a2, b, c2);
            break a;
          }
        } else for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
          var h2 = f2.dependencies;
          if (null !== h2) {
            g2 = f2.child;
            for (var k2 = h2.firstContext; null !== k2; ) {
              if (k2.context === d2) {
                if (1 === f2.tag) {
                  k2 = mh(-1, c2 & -c2);
                  k2.tag = 2;
                  var l2 = f2.updateQueue;
                  if (null !== l2) {
                    l2 = l2.shared;
                    var m2 = l2.pending;
                    null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                    l2.pending = k2;
                  }
                }
                f2.lanes |= c2;
                k2 = f2.alternate;
                null !== k2 && (k2.lanes |= c2);
                bh(
                  f2.return,
                  c2,
                  b
                );
                h2.lanes |= c2;
                break;
              }
              k2 = k2.next;
            }
          } else if (10 === f2.tag) g2 = f2.type === b.type ? null : f2.child;
          else if (18 === f2.tag) {
            g2 = f2.return;
            if (null === g2) throw Error(p$1(341));
            g2.lanes |= c2;
            h2 = g2.alternate;
            null !== h2 && (h2.lanes |= c2);
            bh(g2, c2, b);
            g2 = f2.sibling;
          } else g2 = f2.child;
          if (null !== g2) g2.return = f2;
          else for (g2 = f2; null !== g2; ) {
            if (g2 === b) {
              g2 = null;
              break;
            }
            f2 = g2.sibling;
            if (null !== f2) {
              f2.return = g2.return;
              g2 = f2;
              break;
            }
            g2 = g2.return;
          }
          f2 = g2;
        }
        Xi(a2, b, e2.children, c2);
        b = b.child;
      }
      return b;
    case 9:
      return e2 = b.type, d2 = b.pendingProps.children, ch(b, c2), e2 = eh(e2), d2 = d2(e2), b.flags |= 1, Xi(a2, b, d2, c2), b.child;
    case 14:
      return d2 = b.type, e2 = Ci(d2, b.pendingProps), e2 = Ci(d2.type, e2), $i(a2, b, d2, e2, c2);
    case 15:
      return bj(a2, b, b.type, b.pendingProps, c2);
    case 17:
      return d2 = b.type, e2 = b.pendingProps, e2 = b.elementType === d2 ? e2 : Ci(d2, e2), ij(a2, b), b.tag = 1, Zf(d2) ? (a2 = true, cg(b)) : a2 = false, ch(b, c2), Gi(b, d2, e2), Ii(b, d2, e2, c2), jj(null, b, d2, true, a2, c2);
    case 19:
      return xj(a2, b, c2);
    case 22:
      return dj(a2, b, c2);
  }
  throw Error(p$1(156, b.tag));
};
function Fk(a2, b) {
  return ac(a2, b);
}
function $k(a2, b, c2, d2) {
  this.tag = a2;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d2;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a2, b, c2, d2) {
  return new $k(a2, b, c2, d2);
}
function aj(a2) {
  a2 = a2.prototype;
  return !(!a2 || !a2.isReactComponent);
}
function Zk(a2) {
  if ("function" === typeof a2) return aj(a2) ? 1 : 0;
  if (void 0 !== a2 && null !== a2) {
    a2 = a2.$$typeof;
    if (a2 === Da) return 11;
    if (a2 === Ga) return 14;
  }
  return 2;
}
function Pg(a2, b) {
  var c2 = a2.alternate;
  null === c2 ? (c2 = Bg(a2.tag, b, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a2.flags & 14680064;
  c2.childLanes = a2.childLanes;
  c2.lanes = a2.lanes;
  c2.child = a2.child;
  c2.memoizedProps = a2.memoizedProps;
  c2.memoizedState = a2.memoizedState;
  c2.updateQueue = a2.updateQueue;
  b = a2.dependencies;
  c2.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c2.sibling = a2.sibling;
  c2.index = a2.index;
  c2.ref = a2.ref;
  return c2;
}
function Rg(a2, b, c2, d2, e2, f2) {
  var g2 = 2;
  d2 = a2;
  if ("function" === typeof a2) aj(a2) && (g2 = 1);
  else if ("string" === typeof a2) g2 = 5;
  else a: switch (a2) {
    case ya:
      return Tg(c2.children, e2, f2, b);
    case za:
      g2 = 8;
      e2 |= 8;
      break;
    case Aa:
      return a2 = Bg(12, c2, b, e2 | 2), a2.elementType = Aa, a2.lanes = f2, a2;
    case Ea:
      return a2 = Bg(13, c2, b, e2), a2.elementType = Ea, a2.lanes = f2, a2;
    case Fa:
      return a2 = Bg(19, c2, b, e2), a2.elementType = Fa, a2.lanes = f2, a2;
    case Ia:
      return pj(c2, e2, f2, b);
    default:
      if ("object" === typeof a2 && null !== a2) switch (a2.$$typeof) {
        case Ba:
          g2 = 10;
          break a;
        case Ca:
          g2 = 9;
          break a;
        case Da:
          g2 = 11;
          break a;
        case Ga:
          g2 = 14;
          break a;
        case Ha:
          g2 = 16;
          d2 = null;
          break a;
      }
      throw Error(p$1(130, null == a2 ? a2 : typeof a2, ""));
  }
  b = Bg(g2, c2, b, e2);
  b.elementType = a2;
  b.type = d2;
  b.lanes = f2;
  return b;
}
function Tg(a2, b, c2, d2) {
  a2 = Bg(7, a2, d2, b);
  a2.lanes = c2;
  return a2;
}
function pj(a2, b, c2, d2) {
  a2 = Bg(22, a2, d2, b);
  a2.elementType = Ia;
  a2.lanes = c2;
  a2.stateNode = { isHidden: false };
  return a2;
}
function Qg(a2, b, c2) {
  a2 = Bg(6, a2, null, b);
  a2.lanes = c2;
  return a2;
}
function Sg(a2, b, c2) {
  b = Bg(4, null !== a2.children ? a2.children : [], a2.key, b);
  b.lanes = c2;
  b.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
  return b;
}
function al(a2, b, c2, d2, e2) {
  this.tag = b;
  this.containerInfo = a2;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d2;
  this.onRecoverableError = e2;
  this.mutableSourceEagerHydrationData = null;
}
function bl(a2, b, c2, d2, e2, f2, g2, h2, k2) {
  a2 = new al(a2, b, c2, h2, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a2.current = f2;
  f2.stateNode = a2;
  f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  kh(f2);
  return a2;
}
function cl(a2, b, c2) {
  var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d2 ? null : "" + d2, children: a2, containerInfo: b, implementation: c2 };
}
function dl(a2) {
  if (!a2) return Vf;
  a2 = a2._reactInternals;
  a: {
    if (Vb(a2) !== a2 || 1 !== a2.tag) throw Error(p$1(170));
    var b = a2;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p$1(171));
  }
  if (1 === a2.tag) {
    var c2 = a2.type;
    if (Zf(c2)) return bg(a2, c2, b);
  }
  return b;
}
function el(a2, b, c2, d2, e2, f2, g2, h2, k2) {
  a2 = bl(c2, d2, true, a2, e2, f2, g2, h2, k2);
  a2.context = dl(null);
  c2 = a2.current;
  d2 = R();
  e2 = yi(c2);
  f2 = mh(d2, e2);
  f2.callback = void 0 !== b && null !== b ? b : null;
  nh(c2, f2, e2);
  a2.current.lanes = e2;
  Ac(a2, e2, d2);
  Dk(a2, d2);
  return a2;
}
function fl(a2, b, c2, d2) {
  var e2 = b.current, f2 = R(), g2 = yi(e2);
  c2 = dl(c2);
  null === b.context ? b.context = c2 : b.pendingContext = c2;
  b = mh(f2, g2);
  b.payload = { element: a2 };
  d2 = void 0 === d2 ? null : d2;
  null !== d2 && (b.callback = d2);
  a2 = nh(e2, b, g2);
  null !== a2 && (gi(a2, e2, g2, f2), oh(a2, e2, g2));
  return g2;
}
function gl(a2) {
  a2 = a2.current;
  if (!a2.child) return null;
  switch (a2.child.tag) {
    case 5:
      return a2.child.stateNode;
    default:
      return a2.child.stateNode;
  }
}
function hl(a2, b) {
  a2 = a2.memoizedState;
  if (null !== a2 && null !== a2.dehydrated) {
    var c2 = a2.retryLane;
    a2.retryLane = 0 !== c2 && c2 < b ? c2 : b;
  }
}
function il(a2, b) {
  hl(a2, b);
  (a2 = a2.alternate) && hl(a2, b);
}
function jl() {
  return null;
}
var kl = "function" === typeof reportError ? reportError : function(a2) {
  console.error(a2);
};
function ll(a2) {
  this._internalRoot = a2;
}
ml.prototype.render = ll.prototype.render = function(a2) {
  var b = this._internalRoot;
  if (null === b) throw Error(p$1(409));
  fl(a2, b, null, null);
};
ml.prototype.unmount = ll.prototype.unmount = function() {
  var a2 = this._internalRoot;
  if (null !== a2) {
    this._internalRoot = null;
    var b = a2.containerInfo;
    Rk(function() {
      fl(null, a2, null, null);
    });
    b[uf] = null;
  }
};
function ml(a2) {
  this._internalRoot = a2;
}
ml.prototype.unstable_scheduleHydration = function(a2) {
  if (a2) {
    var b = Hc();
    a2 = { blockedOn: null, target: a2, priority: b };
    for (var c2 = 0; c2 < Qc.length && 0 !== b && b < Qc[c2].priority; c2++) ;
    Qc.splice(c2, 0, a2);
    0 === c2 && Vc(a2);
  }
};
function nl(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
}
function ol(a2) {
  return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
}
function pl() {
}
function ql(a2, b, c2, d2, e2) {
  if (e2) {
    if ("function" === typeof d2) {
      var f2 = d2;
      d2 = function() {
        var a3 = gl(g2);
        f2.call(a3);
      };
    }
    var g2 = el(b, d2, a2, 0, null, false, false, "", pl);
    a2._reactRootContainer = g2;
    a2[uf] = g2.current;
    sf(8 === a2.nodeType ? a2.parentNode : a2);
    Rk();
    return g2;
  }
  for (; e2 = a2.lastChild; ) a2.removeChild(e2);
  if ("function" === typeof d2) {
    var h2 = d2;
    d2 = function() {
      var a3 = gl(k2);
      h2.call(a3);
    };
  }
  var k2 = bl(a2, 0, false, null, null, false, false, "", pl);
  a2._reactRootContainer = k2;
  a2[uf] = k2.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  Rk(function() {
    fl(b, k2, c2, d2);
  });
  return k2;
}
function rl(a2, b, c2, d2, e2) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g2 = f2;
    if ("function" === typeof e2) {
      var h2 = e2;
      e2 = function() {
        var a3 = gl(g2);
        h2.call(a3);
      };
    }
    fl(b, g2, a2, e2);
  } else g2 = ql(c2, b, a2, e2, d2);
  return gl(g2);
}
Ec = function(a2) {
  switch (a2.tag) {
    case 3:
      var b = a2.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c2 = tc(b.pendingLanes);
        0 !== c2 && (Cc(b, c2 | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
      }
      break;
    case 13:
      Rk(function() {
        var b2 = ih(a2, 1);
        if (null !== b2) {
          var c3 = R();
          gi(b2, a2, 1, c3);
        }
      }), il(a2, 1);
  }
};
Fc = function(a2) {
  if (13 === a2.tag) {
    var b = ih(a2, 134217728);
    if (null !== b) {
      var c2 = R();
      gi(b, a2, 134217728, c2);
    }
    il(a2, 134217728);
  }
};
Gc = function(a2) {
  if (13 === a2.tag) {
    var b = yi(a2), c2 = ih(a2, b);
    if (null !== c2) {
      var d2 = R();
      gi(c2, a2, b, d2);
    }
    il(a2, b);
  }
};
Hc = function() {
  return C$1;
};
Ic = function(a2, b) {
  var c2 = C$1;
  try {
    return C$1 = a2, b();
  } finally {
    C$1 = c2;
  }
};
yb = function(a2, b, c2) {
  switch (b) {
    case "input":
      bb(a2, c2);
      b = c2.name;
      if ("radio" === c2.type && null != b) {
        for (c2 = a2; c2.parentNode; ) c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c2.length; b++) {
          var d2 = c2[b];
          if (d2 !== a2 && d2.form === a2.form) {
            var e2 = Db(d2);
            if (!e2) throw Error(p$1(90));
            Wa(d2);
            bb(d2, e2);
          }
        }
      }
      break;
    case "textarea":
      ib(a2, c2);
      break;
    case "select":
      b = c2.value, null != b && fb(a2, !!c2.multiple, b, false);
  }
};
Gb = Qk;
Hb = Rk;
var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] }, tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
  a2 = Zb(a2);
  return null === a2 ? null : a2.stateNode;
}, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!vl.isDisabled && vl.supportsFiber) try {
    kc = vl.inject(ul), lc = vl;
  } catch (a2) {
  }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
reactDom_production_min.createPortal = function(a2, b) {
  var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!nl(b)) throw Error(p$1(200));
  return cl(a2, b, null, c2);
};
reactDom_production_min.createRoot = function(a2, b) {
  if (!nl(a2)) throw Error(p$1(299));
  var c2 = false, d2 = "", e2 = kl;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c2 = true), void 0 !== b.identifierPrefix && (d2 = b.identifierPrefix), void 0 !== b.onRecoverableError && (e2 = b.onRecoverableError));
  b = bl(a2, 1, false, null, null, c2, false, d2, e2);
  a2[uf] = b.current;
  sf(8 === a2.nodeType ? a2.parentNode : a2);
  return new ll(b);
};
reactDom_production_min.findDOMNode = function(a2) {
  if (null == a2) return null;
  if (1 === a2.nodeType) return a2;
  var b = a2._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a2.render) throw Error(p$1(188));
    a2 = Object.keys(a2).join(",");
    throw Error(p$1(268, a2));
  }
  a2 = Zb(b);
  a2 = null === a2 ? null : a2.stateNode;
  return a2;
};
reactDom_production_min.flushSync = function(a2) {
  return Rk(a2);
};
reactDom_production_min.hydrate = function(a2, b, c2) {
  if (!ol(b)) throw Error(p$1(200));
  return rl(null, a2, b, true, c2);
};
reactDom_production_min.hydrateRoot = function(a2, b, c2) {
  if (!nl(a2)) throw Error(p$1(405));
  var d2 = null != c2 && c2.hydratedSources || null, e2 = false, f2 = "", g2 = kl;
  null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e2 = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g2 = c2.onRecoverableError));
  b = el(b, null, a2, 1, null != c2 ? c2 : null, e2, false, f2, g2);
  a2[uf] = b.current;
  sf(a2);
  if (d2) for (a2 = 0; a2 < d2.length; a2++) c2 = d2[a2], e2 = c2._getVersion, e2 = e2(c2._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c2, e2] : b.mutableSourceEagerHydrationData.push(
    c2,
    e2
  );
  return new ml(b);
};
reactDom_production_min.render = function(a2, b, c2) {
  if (!ol(b)) throw Error(p$1(200));
  return rl(null, a2, b, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a2) {
  if (!ol(a2)) throw Error(p$1(40));
  return a2._reactRootContainer ? (Rk(function() {
    rl(null, null, a2, false, function() {
      a2._reactRootContainer = null;
      a2[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Qk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a2, b, c2, d2) {
  if (!ol(c2)) throw Error(p$1(200));
  if (null == a2 || void 0 === a2._reactInternals) throw Error(p$1(38));
  return rl(a2, b, c2, false, d2);
};
reactDom_production_min.version = "18.3.1-next-f1338f8080-20240426";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m$1 = reactDomExports;
{
  client.createRoot = m$1.createRoot;
  client.hydrateRoot = m$1.hydrateRoot;
}
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      throw new Error(message);
    } catch (e2) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends$1({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex();
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends$1({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    href = href.replace(/ $/, "%20");
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  return matchRoutesImpl(routes, locationArg, basename);
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial) {
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i2 = 0; matches == null && i2 < branches.length; ++i2) {
    let decoded = decodePath(pathname);
    matches = matchRouteBranch(branches[i2], decoded);
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a2, b) => a2.score !== b.score ? b.score - a2.score : compareIndexes(a2.routesMeta.map((meta) => meta.childrenIndex), b.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:[\w-]+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s2) => s2 === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s2) => !isSplat(s2)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a2, b) {
  let siblings = a2.length === b.length && a2.slice(0, -1).every((n2, i2) => n2 === b[i2]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a2[a2.length - 1] - b[b.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname, allowPartial) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i2 = 0; i2 < routesMeta.length; ++i2) {
    let meta = routesMeta[i2];
    let end = i2 === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    let route = meta.route;
    if (!match) {
      return null;
    }
    Object.assign(matchedParams, match.params);
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = compiledParams.reduce((memo, _ref, index) => {
    let {
      paramName,
      isOptional
    } = _ref;
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    const value = captureGroups[index];
    if (isOptional && !value) {
      memo[paramName] = void 0;
    } else {
      memo[paramName] = (value || "").replace(/%2F/g, "/");
    }
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let params = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (_2, paramName, isOptional) => {
    params.push({
      paramName,
      isOptional: isOptional != null
    });
    return isOptional ? "/?([^\\/]+)?" : "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    params.push({
      paramName: "*"
    });
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, params];
}
function decodePath(value) {
  try {
    return value.split("/").map((v2) => decodeURIComponent(v2).replace(/\//g, "%2F")).join("/");
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
const DataRouterStateContext = /* @__PURE__ */ reactExports.createContext(null);
const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
const RouteContext = /* @__PURE__ */ reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
const RouteErrorContext = /* @__PURE__ */ reactExports.createContext(null);
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterState, future) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = pathname;
  if (parentPathnameBase !== "/") {
    let parentSegments = parentPathnameBase.replace(/^\//, "").split("/");
    let segments = pathname.replace(/^\//, "").split("/");
    remainingPathname = "/" + segments.slice(parentSegments.length).join("/");
  }
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState, future);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
      value: {
        location: _extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
const defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error !== void 0 ? props.error : state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState, future) {
  var _dataRouterState;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (future === void 0) {
    future = null;
  }
  if (matches == null) {
    var _future;
    if (!dataRouterState) {
      return null;
    }
    if (dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else if ((_future = future) != null && _future.v7_partialHydration && parentMatches.length === 0 && !dataRouterState.initialized && dataRouterState.matches.length > 0) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState = dataRouterState) == null ? void 0 : _dataRouterState.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]) !== void 0);
    !(errorIndex >= 0) ? invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  let renderFallback = false;
  let fallbackIndex = -1;
  if (dataRouterState && future && future.v7_partialHydration) {
    for (let i2 = 0; i2 < renderedMatches.length; i2++) {
      let match = renderedMatches[i2];
      if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
        fallbackIndex = i2;
      }
      if (match.route.id) {
        let {
          loaderData,
          errors: errors2
        } = dataRouterState;
        let needsToRunLoader = match.route.loader && loaderData[match.route.id] === void 0 && (!errors2 || errors2[match.route.id] === void 0);
        if (match.route.lazy || needsToRunLoader) {
          renderFallback = true;
          if (fallbackIndex >= 0) {
            renderedMatches = renderedMatches.slice(0, fallbackIndex + 1);
          } else {
            renderedMatches = [renderedMatches[0]];
          }
          break;
        }
      }
    }
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error;
    let shouldRenderHydrateFallback = false;
    let errorElement = null;
    let hydrateFallbackElement = null;
    if (dataRouterState) {
      error = errors && match.route.id ? errors[match.route.id] : void 0;
      errorElement = match.route.errorElement || defaultErrorElement;
      if (renderFallback) {
        if (fallbackIndex < 0 && index === 0) {
          warningOnce("route-fallback");
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = null;
        } else if (fallbackIndex === index) {
          shouldRenderHydrateFallback = true;
          hydrateFallbackElement = match.route.hydrateFallbackElement || null;
        }
      }
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (shouldRenderHydrateFallback) {
        children = hydrateFallbackElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterStateHook$1 = /* @__PURE__ */ function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
  return DataRouterStateHook2;
}(DataRouterStateHook$1 || {});
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant(false) : void 0;
  return thisRoute.route.id;
}
function useRouteError() {
  var _state$errors;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
  let routeId = useCurrentRouteId();
  if (error !== void 0) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
const alreadyWarned$1 = {};
function warningOnce(key, cond, message) {
  if (!alreadyWarned$1[key]) {
    alreadyWarned$1[key] = true;
  }
}
function logV6DeprecationWarnings(renderFuture, routerFuture) {
  if ((renderFuture == null ? void 0 : renderFuture.v7_startTransition) === void 0) ;
  if ((renderFuture == null ? void 0 : renderFuture.v7_relativeSplatPath) === void 0 && true) ;
}
function Route(_props) {
  invariant(false);
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false,
    future
  } = _ref5;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp,
    future: _extends({
      v7_relativeSplatPath: false
    }, future)
  }), [basename, future, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
new Promise(() => {
});
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  reactExports.Children.forEach(children, (element, index) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === reactExports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ? invariant(false) : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const REACT_ROUTER_VERSION = "6";
try {
  window.__reactRouterVersion = REACT_ROUTER_VERSION;
} catch (e2) {
}
const START_TRANSITION = "startTransition";
const startTransitionImpl = React$1[START_TRANSITION];
function BrowserRouter(_ref4) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref4;
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = reactExports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  reactExports.useEffect(() => logV6DeprecationWarnings(future), [future]);
  return /* @__PURE__ */ reactExports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history,
    future
  });
}
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
  DataRouterHook2["useViewTransitionState"] = "useViewTransitionState";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetcher"] = "useFetcher";
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
let e = { data: "" }, t = (t2) => {
  if ("object" == typeof window) {
    let e2 = (t2 ? t2.querySelector("#_goober") : window._goober) || Object.assign(document.createElement("style"), { innerHTML: " ", id: "_goober" });
    return e2.nonce = window.__nonce__, e2.parentNode || (t2 || document.head).appendChild(e2), e2.firstChild;
  }
  return t2 || e;
}, l = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, a = /\/\*[^]*?\*\/|  +/g, n$1 = /\n+/g, o = (e2, t2) => {
  let r2 = "", l2 = "", a2 = "";
  for (let n2 in e2) {
    let c2 = e2[n2];
    "@" == n2[0] ? "i" == n2[1] ? r2 = n2 + " " + c2 + ";" : l2 += "f" == n2[1] ? o(c2, n2) : n2 + "{" + o(c2, "k" == n2[1] ? "" : t2) + "}" : "object" == typeof c2 ? l2 += o(c2, t2 ? t2.replace(/([^,])+/g, (e3) => n2.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, (t3) => /&/.test(t3) ? t3.replace(/&/g, e3) : e3 ? e3 + " " + t3 : t3)) : n2) : null != c2 && (n2 = /^--/.test(n2) ? n2 : n2.replace(/[A-Z]/g, "-$&").toLowerCase(), a2 += o.p ? o.p(n2, c2) : n2 + ":" + c2 + ";");
  }
  return r2 + (t2 && a2 ? t2 + "{" + a2 + "}" : a2) + l2;
}, c = {}, s = (e2) => {
  if ("object" == typeof e2) {
    let t2 = "";
    for (let r2 in e2) t2 += r2 + s(e2[r2]);
    return t2;
  }
  return e2;
}, i = (e2, t2, r2, i2, p2) => {
  let u2 = s(e2), d2 = c[u2] || (c[u2] = ((e3) => {
    let t3 = 0, r3 = 11;
    for (; t3 < e3.length; ) r3 = 101 * r3 + e3.charCodeAt(t3++) >>> 0;
    return "go" + r3;
  })(u2));
  if (!c[d2]) {
    let t3 = u2 !== e2 ? e2 : ((e3) => {
      let t4, r3, o2 = [{}];
      for (; t4 = l.exec(e3.replace(a, "")); ) t4[4] ? o2.shift() : t4[3] ? (r3 = t4[3].replace(n$1, " ").trim(), o2.unshift(o2[0][r3] = o2[0][r3] || {})) : o2[0][t4[1]] = t4[2].replace(n$1, " ").trim();
      return o2[0];
    })(e2);
    c[d2] = o(p2 ? { ["@keyframes " + d2]: t3 } : t3, r2 ? "" : "." + d2);
  }
  let f2 = r2 && c.g ? c.g : null;
  return r2 && (c.g = c[d2]), ((e3, t3, r3, l2) => {
    l2 ? t3.data = t3.data.replace(l2, e3) : -1 === t3.data.indexOf(e3) && (t3.data = r3 ? e3 + t3.data : t3.data + e3);
  })(c[d2], t2, i2, f2), d2;
}, p = (e2, t2, r2) => e2.reduce((e3, l2, a2) => {
  let n2 = t2[a2];
  if (n2 && n2.call) {
    let e4 = n2(r2), t3 = e4 && e4.props && e4.props.className || /^go/.test(e4) && e4;
    n2 = t3 ? "." + t3 : e4 && "object" == typeof e4 ? e4.props ? "" : o(e4, "") : false === e4 ? "" : e4;
  }
  return e3 + l2 + (null == n2 ? "" : n2);
}, "");
function u(e2) {
  let r2 = this || {}, l2 = e2.call ? e2(r2.p) : e2;
  return i(l2.unshift ? l2.raw ? p(l2, [].slice.call(arguments, 1), r2.p) : l2.reduce((e3, t2) => Object.assign(e3, t2 && t2.call ? t2(r2.p) : t2), {}) : l2, t(r2.target), r2.g, r2.o, r2.k);
}
let d, f$1, g;
u.bind({ g: 1 });
let h$1 = u.bind({ k: 1 });
function m(e2, t2, r2, l2) {
  o.p = t2, d = e2, f$1 = r2, g = l2;
}
function w$1(e2, t2) {
  let r2 = this || {};
  return function() {
    let l2 = arguments;
    function a2(n2, o2) {
      let c2 = Object.assign({}, n2), s2 = c2.className || a2.className;
      r2.p = Object.assign({ theme: f$1 && f$1() }, c2), r2.o = / *go\d+/.test(s2), c2.className = u.apply(r2, l2) + (s2 ? " " + s2 : "");
      let i2 = e2;
      return e2[0] && (i2 = c2.as || e2, delete c2.as), g && i2[0] && g(c2), d(i2, c2);
    }
    return a2;
  };
}
var Z = (e2) => typeof e2 == "function", h = (e2, t2) => Z(e2) ? e2(t2) : e2;
var W = /* @__PURE__ */ (() => {
  let e2 = 0;
  return () => (++e2).toString();
})(), E = /* @__PURE__ */ (() => {
  let e2;
  return () => {
    if (e2 === void 0 && typeof window < "u") {
      let t2 = matchMedia("(prefers-reduced-motion: reduce)");
      e2 = !t2 || t2.matches;
    }
    return e2;
  };
})();
var re = 20, k = "default";
var H = (e2, t2) => {
  let { toastLimit: o2 } = e2.settings;
  switch (t2.type) {
    case 0:
      return { ...e2, toasts: [t2.toast, ...e2.toasts].slice(0, o2) };
    case 1:
      return { ...e2, toasts: e2.toasts.map((r2) => r2.id === t2.toast.id ? { ...r2, ...t2.toast } : r2) };
    case 2:
      let { toast: s2 } = t2;
      return H(e2, { type: e2.toasts.find((r2) => r2.id === s2.id) ? 1 : 0, toast: s2 });
    case 3:
      let { toastId: a2 } = t2;
      return { ...e2, toasts: e2.toasts.map((r2) => r2.id === a2 || a2 === void 0 ? { ...r2, dismissed: true, visible: false } : r2) };
    case 4:
      return t2.toastId === void 0 ? { ...e2, toasts: [] } : { ...e2, toasts: e2.toasts.filter((r2) => r2.id !== t2.toastId) };
    case 5:
      return { ...e2, pausedAt: t2.time };
    case 6:
      let i2 = t2.time - (e2.pausedAt || 0);
      return { ...e2, pausedAt: void 0, toasts: e2.toasts.map((r2) => ({ ...r2, pauseDuration: r2.pauseDuration + i2 })) };
  }
}, v = [], j = { toasts: [], pausedAt: void 0, settings: { toastLimit: re } }, f = {}, Y = (e2, t2 = k) => {
  f[t2] = H(f[t2] || j, e2), v.forEach(([o2, s2]) => {
    o2 === t2 && s2(f[t2]);
  });
}, _ = (e2) => Object.keys(f).forEach((t2) => Y(e2, t2)), Q = (e2) => Object.keys(f).find((t2) => f[t2].toasts.some((o2) => o2.id === e2)), S = (e2 = k) => (t2) => {
  Y(t2, e2);
}, se = { blank: 4e3, error: 4e3, success: 2e3, loading: 1 / 0, custom: 4e3 }, V = (e2 = {}, t2 = k) => {
  let [o2, s2] = reactExports.useState(f[t2] || j), a2 = reactExports.useRef(f[t2]);
  reactExports.useEffect(() => (a2.current !== f[t2] && s2(f[t2]), v.push([t2, s2]), () => {
    let r2 = v.findIndex(([l2]) => l2 === t2);
    r2 > -1 && v.splice(r2, 1);
  }), [t2]);
  let i2 = o2.toasts.map((r2) => {
    var l2, g2, T2;
    return { ...e2, ...e2[r2.type], ...r2, removeDelay: r2.removeDelay || ((l2 = e2[r2.type]) == null ? void 0 : l2.removeDelay) || (e2 == null ? void 0 : e2.removeDelay), duration: r2.duration || ((g2 = e2[r2.type]) == null ? void 0 : g2.duration) || (e2 == null ? void 0 : e2.duration) || se[r2.type], style: { ...e2.style, ...(T2 = e2[r2.type]) == null ? void 0 : T2.style, ...r2.style } };
  });
  return { ...o2, toasts: i2 };
};
var ie = (e2, t2 = "blank", o2) => ({ createdAt: Date.now(), visible: true, dismissed: false, type: t2, ariaProps: { role: "status", "aria-live": "polite" }, message: e2, pauseDuration: 0, ...o2, id: (o2 == null ? void 0 : o2.id) || W() }), P = (e2) => (t2, o2) => {
  let s2 = ie(t2, e2, o2);
  return S(s2.toasterId || Q(s2.id))({ type: 2, toast: s2 }), s2.id;
}, n = (e2, t2) => P("blank")(e2, t2);
n.error = P("error");
n.success = P("success");
n.loading = P("loading");
n.custom = P("custom");
n.dismiss = (e2, t2) => {
  let o2 = { type: 3, toastId: e2 };
  t2 ? S(t2)(o2) : _(o2);
};
n.dismissAll = (e2) => n.dismiss(void 0, e2);
n.remove = (e2, t2) => {
  let o2 = { type: 4, toastId: e2 };
  t2 ? S(t2)(o2) : _(o2);
};
n.removeAll = (e2) => n.remove(void 0, e2);
n.promise = (e2, t2, o2) => {
  let s2 = n.loading(t2.loading, { ...o2, ...o2 == null ? void 0 : o2.loading });
  return typeof e2 == "function" && (e2 = e2()), e2.then((a2) => {
    let i2 = t2.success ? h(t2.success, a2) : void 0;
    return i2 ? n.success(i2, { id: s2, ...o2, ...o2 == null ? void 0 : o2.success }) : n.dismiss(s2), a2;
  }).catch((a2) => {
    let i2 = t2.error ? h(t2.error, a2) : void 0;
    i2 ? n.error(i2, { id: s2, ...o2, ...o2 == null ? void 0 : o2.error }) : n.dismiss(s2);
  }), e2;
};
var ce = 1e3, w = (e2, t2 = "default") => {
  let { toasts: o2, pausedAt: s2 } = V(e2, t2), a2 = reactExports.useRef(/* @__PURE__ */ new Map()).current, i2 = reactExports.useCallback((c2, m2 = ce) => {
    if (a2.has(c2)) return;
    let p2 = setTimeout(() => {
      a2.delete(c2), r2({ type: 4, toastId: c2 });
    }, m2);
    a2.set(c2, p2);
  }, []);
  reactExports.useEffect(() => {
    if (s2) return;
    let c2 = Date.now(), m2 = o2.map((p2) => {
      if (p2.duration === 1 / 0) return;
      let R2 = (p2.duration || 0) + p2.pauseDuration - (c2 - p2.createdAt);
      if (R2 < 0) {
        p2.visible && n.dismiss(p2.id);
        return;
      }
      return setTimeout(() => n.dismiss(p2.id, t2), R2);
    });
    return () => {
      m2.forEach((p2) => p2 && clearTimeout(p2));
    };
  }, [o2, s2, t2]);
  let r2 = reactExports.useCallback(S(t2), [t2]), l2 = reactExports.useCallback(() => {
    r2({ type: 5, time: Date.now() });
  }, [r2]), g2 = reactExports.useCallback((c2, m2) => {
    r2({ type: 1, toast: { id: c2, height: m2 } });
  }, [r2]), T2 = reactExports.useCallback(() => {
    s2 && r2({ type: 6, time: Date.now() });
  }, [s2, r2]), d2 = reactExports.useCallback((c2, m2) => {
    let { reverseOrder: p2 = false, gutter: R2 = 8, defaultPosition: z2 } = m2 || {}, O2 = o2.filter((u2) => (u2.position || z2) === (c2.position || z2) && u2.height), K2 = O2.findIndex((u2) => u2.id === c2.id), B2 = O2.filter((u2, I2) => I2 < K2 && u2.visible).length;
    return O2.filter((u2) => u2.visible).slice(...p2 ? [B2 + 1] : [0, B2]).reduce((u2, I2) => u2 + (I2.height || 0) + R2, 0);
  }, [o2]);
  return reactExports.useEffect(() => {
    o2.forEach((c2) => {
      if (c2.dismissed) i2(c2.id, c2.removeDelay);
      else {
        let m2 = a2.get(c2.id);
        m2 && (clearTimeout(m2), a2.delete(c2.id));
      }
    });
  }, [o2, i2]), { toasts: o2, handlers: { updateHeight: g2, startPause: l2, endPause: T2, calculateOffset: d2 } };
};
var de = h$1`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`, me = h$1`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`, le = h$1`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`, C = w$1("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e2) => e2.primary || "#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${de} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${me} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${(e2) => e2.secondary || "#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${le} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;
var Te = h$1`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`, F = w$1("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${(e2) => e2.secondary || "#e0e0e0"};
  border-right-color: ${(e2) => e2.primary || "#616161"};
  animation: ${Te} 1s linear infinite;
`;
var ge = h$1`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`, he = h$1`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`, L = w$1("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${(e2) => e2.primary || "#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ge} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${he} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(e2) => e2.secondary || "#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`;
var be = w$1("div")`
  position: absolute;
`, Se = w$1("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`, Ae = h$1`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`, Pe = w$1("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ae} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`, $ = ({ toast: e2 }) => {
  let { icon: t2, type: o2, iconTheme: s2 } = e2;
  return t2 !== void 0 ? typeof t2 == "string" ? reactExports.createElement(Pe, null, t2) : t2 : o2 === "blank" ? null : reactExports.createElement(Se, null, reactExports.createElement(F, { ...s2 }), o2 !== "loading" && reactExports.createElement(be, null, o2 === "error" ? reactExports.createElement(C, { ...s2 }) : reactExports.createElement(L, { ...s2 })));
};
var Re = (e2) => `
0% {transform: translate3d(0,${e2 * -200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`, Ee = (e2) => `
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e2 * -150}%,-1px) scale(.6); opacity:0;}
`, ve = "0%{opacity:0;} 100%{opacity:1;}", De = "0%{opacity:1;} 100%{opacity:0;}", Oe = w$1("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`, Ie = w$1("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`, ke = (e2, t2) => {
  let s2 = e2.includes("top") ? 1 : -1, [a2, i2] = E() ? [ve, De] : [Re(s2), Ee(s2)];
  return { animation: t2 ? `${h$1(a2)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards` : `${h$1(i2)} 0.4s forwards cubic-bezier(.06,.71,.55,1)` };
}, N = reactExports.memo(({ toast: e2, position: t2, style: o2, children: s2 }) => {
  let a2 = e2.height ? ke(e2.position || t2 || "top-center", e2.visible) : { opacity: 0 }, i2 = reactExports.createElement($, { toast: e2 }), r2 = reactExports.createElement(Ie, { ...e2.ariaProps }, h(e2.message, e2));
  return reactExports.createElement(Oe, { className: e2.className, style: { ...a2, ...o2, ...e2.style } }, typeof s2 == "function" ? s2({ icon: i2, message: r2 }) : reactExports.createElement(reactExports.Fragment, null, i2, r2));
});
m(reactExports.createElement);
var we = ({ id: e2, className: t2, style: o2, onHeightUpdate: s2, children: a2 }) => {
  let i2 = reactExports.useCallback((r2) => {
    if (r2) {
      let l2 = () => {
        let g2 = r2.getBoundingClientRect().height;
        s2(e2, g2);
      };
      l2(), new MutationObserver(l2).observe(r2, { subtree: true, childList: true, characterData: true });
    }
  }, [e2, s2]);
  return reactExports.createElement("div", { ref: i2, className: t2, style: o2 }, a2);
}, Me = (e2, t2) => {
  let o2 = e2.includes("top"), s2 = o2 ? { top: 0 } : { bottom: 0 }, a2 = e2.includes("center") ? { justifyContent: "center" } : e2.includes("right") ? { justifyContent: "flex-end" } : {};
  return { left: 0, right: 0, display: "flex", position: "absolute", transition: E() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)", transform: `translateY(${t2 * (o2 ? 1 : -1)}px)`, ...s2, ...a2 };
}, Ce = u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`, D = 16, Fe = ({ reverseOrder: e2, position: t2 = "top-center", toastOptions: o2, gutter: s2, children: a2, toasterId: i2, containerStyle: r2, containerClassName: l2 }) => {
  let { toasts: g2, handlers: T2 } = w(o2, i2);
  return reactExports.createElement("div", { "data-rht-toaster": i2 || "", style: { position: "fixed", zIndex: 9999, top: D, left: D, right: D, bottom: D, pointerEvents: "none", ...r2 }, className: l2, onMouseEnter: T2.startPause, onMouseLeave: T2.endPause }, g2.map((d2) => {
    let c2 = d2.position || t2, m2 = T2.calculateOffset(d2, { reverseOrder: e2, gutter: s2, defaultPosition: t2 }), p2 = Me(c2, m2);
    return reactExports.createElement(we, { id: d2.id, key: d2.id, onHeightUpdate: T2.updateHeight, className: d2.visible ? Ce : "", style: p2 }, d2.type === "custom" ? h(d2.message, d2) : a2 ? a2(d2) : reactExports.createElement(N, { toast: d2, position: c2 }));
  }));
};
var zt = n;
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var localforage$1 = { exports: {} };
/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(module, exports) {
  (function(f2) {
    {
      module.exports = f2();
    }
  })(function() {
    return function e2(t2, n2, r2) {
      function s2(o3, u2) {
        if (!n2[o3]) {
          if (!t2[o3]) {
            var a2 = typeof commonjsRequire == "function" && commonjsRequire;
            if (!u2 && a2) return a2(o3, true);
            if (i2) return i2(o3, true);
            var f2 = new Error("Cannot find module '" + o3 + "'");
            throw f2.code = "MODULE_NOT_FOUND", f2;
          }
          var l2 = n2[o3] = { exports: {} };
          t2[o3][0].call(l2.exports, function(e3) {
            var n3 = t2[o3][1][e3];
            return s2(n3 ? n3 : e3);
          }, l2, l2.exports, e2, t2, n2, r2);
        }
        return n2[o3].exports;
      }
      var i2 = typeof commonjsRequire == "function" && commonjsRequire;
      for (var o2 = 0; o2 < r2.length; o2++) s2(r2[o2]);
      return s2;
    }({ 1: [function(_dereq_, module2, exports2) {
      (function(global2) {
        var Mutation = global2.MutationObserver || global2.WebKitMutationObserver;
        var scheduleDrain;
        {
          if (Mutation) {
            var called = 0;
            var observer = new Mutation(nextTick);
            var element = global2.document.createTextNode("");
            observer.observe(element, {
              characterData: true
            });
            scheduleDrain = function() {
              element.data = called = ++called % 2;
            };
          } else if (!global2.setImmediate && typeof global2.MessageChannel !== "undefined") {
            var channel = new global2.MessageChannel();
            channel.port1.onmessage = nextTick;
            scheduleDrain = function() {
              channel.port2.postMessage(0);
            };
          } else if ("document" in global2 && "onreadystatechange" in global2.document.createElement("script")) {
            scheduleDrain = function() {
              var scriptEl = global2.document.createElement("script");
              scriptEl.onreadystatechange = function() {
                nextTick();
                scriptEl.onreadystatechange = null;
                scriptEl.parentNode.removeChild(scriptEl);
                scriptEl = null;
              };
              global2.document.documentElement.appendChild(scriptEl);
            };
          } else {
            scheduleDrain = function() {
              setTimeout(nextTick, 0);
            };
          }
        }
        var draining;
        var queue = [];
        function nextTick() {
          draining = true;
          var i2, oldQueue;
          var len = queue.length;
          while (len) {
            oldQueue = queue;
            queue = [];
            i2 = -1;
            while (++i2 < len) {
              oldQueue[i2]();
            }
            len = queue.length;
          }
          draining = false;
        }
        module2.exports = immediate;
        function immediate(task) {
          if (queue.push(task) === 1 && !draining) {
            scheduleDrain();
          }
        }
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}], 2: [function(_dereq_, module2, exports2) {
      var immediate = _dereq_(1);
      function INTERNAL() {
      }
      var handlers = {};
      var REJECTED = ["REJECTED"];
      var FULFILLED = ["FULFILLED"];
      var PENDING = ["PENDING"];
      module2.exports = Promise2;
      function Promise2(resolver) {
        if (typeof resolver !== "function") {
          throw new TypeError("resolver must be a function");
        }
        this.state = PENDING;
        this.queue = [];
        this.outcome = void 0;
        if (resolver !== INTERNAL) {
          safelyResolveThenable(this, resolver);
        }
      }
      Promise2.prototype["catch"] = function(onRejected) {
        return this.then(null, onRejected);
      };
      Promise2.prototype.then = function(onFulfilled, onRejected) {
        if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
          return this;
        }
        var promise = new this.constructor(INTERNAL);
        if (this.state !== PENDING) {
          var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
          unwrap(promise, resolver, this.outcome);
        } else {
          this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
        }
        return promise;
      };
      function QueueItem(promise, onFulfilled, onRejected) {
        this.promise = promise;
        if (typeof onFulfilled === "function") {
          this.onFulfilled = onFulfilled;
          this.callFulfilled = this.otherCallFulfilled;
        }
        if (typeof onRejected === "function") {
          this.onRejected = onRejected;
          this.callRejected = this.otherCallRejected;
        }
      }
      QueueItem.prototype.callFulfilled = function(value) {
        handlers.resolve(this.promise, value);
      };
      QueueItem.prototype.otherCallFulfilled = function(value) {
        unwrap(this.promise, this.onFulfilled, value);
      };
      QueueItem.prototype.callRejected = function(value) {
        handlers.reject(this.promise, value);
      };
      QueueItem.prototype.otherCallRejected = function(value) {
        unwrap(this.promise, this.onRejected, value);
      };
      function unwrap(promise, func, value) {
        immediate(function() {
          var returnValue;
          try {
            returnValue = func(value);
          } catch (e2) {
            return handlers.reject(promise, e2);
          }
          if (returnValue === promise) {
            handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
          } else {
            handlers.resolve(promise, returnValue);
          }
        });
      }
      handlers.resolve = function(self2, value) {
        var result = tryCatch(getThen, value);
        if (result.status === "error") {
          return handlers.reject(self2, result.value);
        }
        var thenable = result.value;
        if (thenable) {
          safelyResolveThenable(self2, thenable);
        } else {
          self2.state = FULFILLED;
          self2.outcome = value;
          var i2 = -1;
          var len = self2.queue.length;
          while (++i2 < len) {
            self2.queue[i2].callFulfilled(value);
          }
        }
        return self2;
      };
      handlers.reject = function(self2, error) {
        self2.state = REJECTED;
        self2.outcome = error;
        var i2 = -1;
        var len = self2.queue.length;
        while (++i2 < len) {
          self2.queue[i2].callRejected(error);
        }
        return self2;
      };
      function getThen(obj) {
        var then = obj && obj.then;
        if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
          return function appyThen() {
            then.apply(obj, arguments);
          };
        }
      }
      function safelyResolveThenable(self2, thenable) {
        var called = false;
        function onError(value) {
          if (called) {
            return;
          }
          called = true;
          handlers.reject(self2, value);
        }
        function onSuccess(value) {
          if (called) {
            return;
          }
          called = true;
          handlers.resolve(self2, value);
        }
        function tryToUnwrap() {
          thenable(onSuccess, onError);
        }
        var result = tryCatch(tryToUnwrap);
        if (result.status === "error") {
          onError(result.value);
        }
      }
      function tryCatch(func, value) {
        var out = {};
        try {
          out.value = func(value);
          out.status = "success";
        } catch (e2) {
          out.status = "error";
          out.value = e2;
        }
        return out;
      }
      Promise2.resolve = resolve;
      function resolve(value) {
        if (value instanceof this) {
          return value;
        }
        return handlers.resolve(new this(INTERNAL), value);
      }
      Promise2.reject = reject;
      function reject(reason) {
        var promise = new this(INTERNAL);
        return handlers.reject(promise, reason);
      }
      Promise2.all = all3;
      function all3(iterable) {
        var self2 = this;
        if (Object.prototype.toString.call(iterable) !== "[object Array]") {
          return this.reject(new TypeError("must be an array"));
        }
        var len = iterable.length;
        var called = false;
        if (!len) {
          return this.resolve([]);
        }
        var values = new Array(len);
        var resolved = 0;
        var i2 = -1;
        var promise = new this(INTERNAL);
        while (++i2 < len) {
          allResolver(iterable[i2], i2);
        }
        return promise;
        function allResolver(value, i3) {
          self2.resolve(value).then(resolveFromAll, function(error) {
            if (!called) {
              called = true;
              handlers.reject(promise, error);
            }
          });
          function resolveFromAll(outValue) {
            values[i3] = outValue;
            if (++resolved === len && !called) {
              called = true;
              handlers.resolve(promise, values);
            }
          }
        }
      }
      Promise2.race = race;
      function race(iterable) {
        var self2 = this;
        if (Object.prototype.toString.call(iterable) !== "[object Array]") {
          return this.reject(new TypeError("must be an array"));
        }
        var len = iterable.length;
        var called = false;
        if (!len) {
          return this.resolve([]);
        }
        var i2 = -1;
        var promise = new this(INTERNAL);
        while (++i2 < len) {
          resolver(iterable[i2]);
        }
        return promise;
        function resolver(value) {
          self2.resolve(value).then(function(response) {
            if (!called) {
              called = true;
              handlers.resolve(promise, response);
            }
          }, function(error) {
            if (!called) {
              called = true;
              handlers.reject(promise, error);
            }
          });
        }
      }
    }, { "1": 1 }], 3: [function(_dereq_, module2, exports2) {
      (function(global2) {
        if (typeof global2.Promise !== "function") {
          global2.Promise = _dereq_(2);
        }
      }).call(this, typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, { "2": 2 }], 4: [function(_dereq_, module2, exports2) {
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function getIDB() {
        try {
          if (typeof indexedDB !== "undefined") {
            return indexedDB;
          }
          if (typeof webkitIndexedDB !== "undefined") {
            return webkitIndexedDB;
          }
          if (typeof mozIndexedDB !== "undefined") {
            return mozIndexedDB;
          }
          if (typeof OIndexedDB !== "undefined") {
            return OIndexedDB;
          }
          if (typeof msIndexedDB !== "undefined") {
            return msIndexedDB;
          }
        } catch (e2) {
          return;
        }
      }
      var idb = getIDB();
      function isIndexedDBValid() {
        try {
          if (!idb || !idb.open) {
            return false;
          }
          var isSafari = typeof openDatabase !== "undefined" && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
          var hasFetch = typeof fetch === "function" && fetch.toString().indexOf("[native code") !== -1;
          return (!isSafari || hasFetch) && typeof indexedDB !== "undefined" && // some outdated implementations of IDB that appear on Samsung
          // and HTC Android devices <4.4 are missing IDBKeyRange
          // See: https://github.com/mozilla/localForage/issues/128
          // See: https://github.com/mozilla/localForage/issues/272
          typeof IDBKeyRange !== "undefined";
        } catch (e2) {
          return false;
        }
      }
      function createBlob(parts, properties) {
        parts = parts || [];
        properties = properties || {};
        try {
          return new Blob(parts, properties);
        } catch (e2) {
          if (e2.name !== "TypeError") {
            throw e2;
          }
          var Builder = typeof BlobBuilder !== "undefined" ? BlobBuilder : typeof MSBlobBuilder !== "undefined" ? MSBlobBuilder : typeof MozBlobBuilder !== "undefined" ? MozBlobBuilder : WebKitBlobBuilder;
          var builder = new Builder();
          for (var i2 = 0; i2 < parts.length; i2 += 1) {
            builder.append(parts[i2]);
          }
          return builder.getBlob(properties.type);
        }
      }
      if (typeof Promise === "undefined") {
        _dereq_(3);
      }
      var Promise$1 = Promise;
      function executeCallback(promise, callback) {
        if (callback) {
          promise.then(function(result) {
            callback(null, result);
          }, function(error) {
            callback(error);
          });
        }
      }
      function executeTwoCallbacks(promise, callback, errorCallback) {
        if (typeof callback === "function") {
          promise.then(callback);
        }
        if (typeof errorCallback === "function") {
          promise["catch"](errorCallback);
        }
      }
      function normalizeKey(key2) {
        if (typeof key2 !== "string") {
          console.warn(key2 + " used as a key, but it is not a string.");
          key2 = String(key2);
        }
        return key2;
      }
      function getCallback() {
        if (arguments.length && typeof arguments[arguments.length - 1] === "function") {
          return arguments[arguments.length - 1];
        }
      }
      var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support";
      var supportsBlobs = void 0;
      var dbContexts = {};
      var toString3 = Object.prototype.toString;
      var READ_ONLY = "readonly";
      var READ_WRITE = "readwrite";
      function _binStringToArrayBuffer(bin) {
        var length2 = bin.length;
        var buf = new ArrayBuffer(length2);
        var arr = new Uint8Array(buf);
        for (var i2 = 0; i2 < length2; i2++) {
          arr[i2] = bin.charCodeAt(i2);
        }
        return buf;
      }
      function _checkBlobSupportWithoutCaching(idb2) {
        return new Promise$1(function(resolve) {
          var txn = idb2.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
          var blob = createBlob([""]);
          txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key");
          txn.onabort = function(e2) {
            e2.preventDefault();
            e2.stopPropagation();
            resolve(false);
          };
          txn.oncomplete = function() {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
          };
        })["catch"](function() {
          return false;
        });
      }
      function _checkBlobSupport(idb2) {
        if (typeof supportsBlobs === "boolean") {
          return Promise$1.resolve(supportsBlobs);
        }
        return _checkBlobSupportWithoutCaching(idb2).then(function(value) {
          supportsBlobs = value;
          return supportsBlobs;
        });
      }
      function _deferReadiness(dbInfo) {
        var dbContext = dbContexts[dbInfo.name];
        var deferredOperation = {};
        deferredOperation.promise = new Promise$1(function(resolve, reject) {
          deferredOperation.resolve = resolve;
          deferredOperation.reject = reject;
        });
        dbContext.deferredOperations.push(deferredOperation);
        if (!dbContext.dbReady) {
          dbContext.dbReady = deferredOperation.promise;
        } else {
          dbContext.dbReady = dbContext.dbReady.then(function() {
            return deferredOperation.promise;
          });
        }
      }
      function _advanceReadiness(dbInfo) {
        var dbContext = dbContexts[dbInfo.name];
        var deferredOperation = dbContext.deferredOperations.pop();
        if (deferredOperation) {
          deferredOperation.resolve();
          return deferredOperation.promise;
        }
      }
      function _rejectReadiness(dbInfo, err) {
        var dbContext = dbContexts[dbInfo.name];
        var deferredOperation = dbContext.deferredOperations.pop();
        if (deferredOperation) {
          deferredOperation.reject(err);
          return deferredOperation.promise;
        }
      }
      function _getConnection(dbInfo, upgradeNeeded) {
        return new Promise$1(function(resolve, reject) {
          dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();
          if (dbInfo.db) {
            if (upgradeNeeded) {
              _deferReadiness(dbInfo);
              dbInfo.db.close();
            } else {
              return resolve(dbInfo.db);
            }
          }
          var dbArgs = [dbInfo.name];
          if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
          }
          var openreq = idb.open.apply(idb, dbArgs);
          if (upgradeNeeded) {
            openreq.onupgradeneeded = function(e2) {
              var db2 = openreq.result;
              try {
                db2.createObjectStore(dbInfo.storeName);
                if (e2.oldVersion <= 1) {
                  db2.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                }
              } catch (ex) {
                if (ex.name === "ConstraintError") {
                  console.warn('The database "' + dbInfo.name + '" has been upgraded from version ' + e2.oldVersion + " to version " + e2.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                } else {
                  throw ex;
                }
              }
            };
          }
          openreq.onerror = function(e2) {
            e2.preventDefault();
            reject(openreq.error);
          };
          openreq.onsuccess = function() {
            var db2 = openreq.result;
            db2.onversionchange = function(e2) {
              e2.target.close();
            };
            resolve(db2);
            _advanceReadiness(dbInfo);
          };
        });
      }
      function _getOriginalConnection(dbInfo) {
        return _getConnection(dbInfo, false);
      }
      function _getUpgradedConnection(dbInfo) {
        return _getConnection(dbInfo, true);
      }
      function _isUpgradeNeeded(dbInfo, defaultVersion) {
        if (!dbInfo.db) {
          return true;
        }
        var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
        var isDowngrade = dbInfo.version < dbInfo.db.version;
        var isUpgrade = dbInfo.version > dbInfo.db.version;
        if (isDowngrade) {
          if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + `" can't be downgraded from version ` + dbInfo.db.version + " to version " + dbInfo.version + ".");
          }
          dbInfo.version = dbInfo.db.version;
        }
        if (isUpgrade || isNewStore) {
          if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
              dbInfo.version = incVersion;
            }
          }
          return true;
        }
        return false;
      }
      function _encodeBlob(blob) {
        return new Promise$1(function(resolve, reject) {
          var reader = new FileReader();
          reader.onerror = reject;
          reader.onloadend = function(e2) {
            var base64 = btoa(e2.target.result || "");
            resolve({
              __local_forage_encoded_blob: true,
              data: base64,
              type: blob.type
            });
          };
          reader.readAsBinaryString(blob);
        });
      }
      function _decodeBlob(encodedBlob) {
        var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
        return createBlob([arrayBuff], { type: encodedBlob.type });
      }
      function _isEncodedBlob(value) {
        return value && value.__local_forage_encoded_blob;
      }
      function _fullyReady(callback) {
        var self2 = this;
        var promise = self2._initReady().then(function() {
          var dbContext = dbContexts[self2._dbInfo.name];
          if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
          }
        });
        executeTwoCallbacks(promise, callback, callback);
        return promise;
      }
      function _tryReconnect(dbInfo) {
        _deferReadiness(dbInfo);
        var dbContext = dbContexts[dbInfo.name];
        var forages = dbContext.forages;
        for (var i2 = 0; i2 < forages.length; i2++) {
          var forage = forages[i2];
          if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
          }
        }
        dbInfo.db = null;
        return _getOriginalConnection(dbInfo).then(function(db2) {
          dbInfo.db = db2;
          if (_isUpgradeNeeded(dbInfo)) {
            return _getUpgradedConnection(dbInfo);
          }
          return db2;
        }).then(function(db2) {
          dbInfo.db = dbContext.db = db2;
          for (var i3 = 0; i3 < forages.length; i3++) {
            forages[i3]._dbInfo.db = db2;
          }
        })["catch"](function(err) {
          _rejectReadiness(dbInfo, err);
          throw err;
        });
      }
      function createTransaction(dbInfo, mode, callback, retries) {
        if (retries === void 0) {
          retries = 1;
        }
        try {
          var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
          callback(null, tx);
        } catch (err) {
          if (retries > 0 && (!dbInfo.db || err.name === "InvalidStateError" || err.name === "NotFoundError")) {
            return Promise$1.resolve().then(function() {
              if (!dbInfo.db || err.name === "NotFoundError" && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                if (dbInfo.db) {
                  dbInfo.version = dbInfo.db.version + 1;
                }
                return _getUpgradedConnection(dbInfo);
              }
            }).then(function() {
              return _tryReconnect(dbInfo).then(function() {
                createTransaction(dbInfo, mode, callback, retries - 1);
              });
            })["catch"](callback);
          }
          callback(err);
        }
      }
      function createDbContext() {
        return {
          // Running localForages sharing a database.
          forages: [],
          // Shared database.
          db: null,
          // Database readiness (promise).
          dbReady: null,
          // Deferred operations on the database.
          deferredOperations: []
        };
      }
      function _initStorage(options) {
        var self2 = this;
        var dbInfo = {
          db: null
        };
        if (options) {
          for (var i2 in options) {
            dbInfo[i2] = options[i2];
          }
        }
        var dbContext = dbContexts[dbInfo.name];
        if (!dbContext) {
          dbContext = createDbContext();
          dbContexts[dbInfo.name] = dbContext;
        }
        dbContext.forages.push(self2);
        if (!self2._initReady) {
          self2._initReady = self2.ready;
          self2.ready = _fullyReady;
        }
        var initPromises = [];
        function ignoreErrors() {
          return Promise$1.resolve();
        }
        for (var j2 = 0; j2 < dbContext.forages.length; j2++) {
          var forage = dbContext.forages[j2];
          if (forage !== self2) {
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
          }
        }
        var forages = dbContext.forages.slice(0);
        return Promise$1.all(initPromises).then(function() {
          dbInfo.db = dbContext.db;
          return _getOriginalConnection(dbInfo);
        }).then(function(db2) {
          dbInfo.db = db2;
          if (_isUpgradeNeeded(dbInfo, self2._defaultConfig.version)) {
            return _getUpgradedConnection(dbInfo);
          }
          return db2;
        }).then(function(db2) {
          dbInfo.db = dbContext.db = db2;
          self2._dbInfo = dbInfo;
          for (var k2 = 0; k2 < forages.length; k2++) {
            var forage2 = forages[k2];
            if (forage2 !== self2) {
              forage2._dbInfo.db = dbInfo.db;
              forage2._dbInfo.version = dbInfo.version;
            }
          }
        });
      }
      function getItem(key2, callback) {
        var self2 = this;
        key2 = normalizeKey(key2);
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store2 = transaction.objectStore(self2._dbInfo.storeName);
                var req = store2.get(key2);
                req.onsuccess = function() {
                  var value = req.result;
                  if (value === void 0) {
                    value = null;
                  }
                  if (_isEncodedBlob(value)) {
                    value = _decodeBlob(value);
                  }
                  resolve(value);
                };
                req.onerror = function() {
                  reject(req.error);
                };
              } catch (e2) {
                reject(e2);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function iterate(iterator2, callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store2 = transaction.objectStore(self2._dbInfo.storeName);
                var req = store2.openCursor();
                var iterationNumber = 1;
                req.onsuccess = function() {
                  var cursor = req.result;
                  if (cursor) {
                    var value = cursor.value;
                    if (_isEncodedBlob(value)) {
                      value = _decodeBlob(value);
                    }
                    var result = iterator2(value, cursor.key, iterationNumber++);
                    if (result !== void 0) {
                      resolve(result);
                    } else {
                      cursor["continue"]();
                    }
                  } else {
                    resolve();
                  }
                };
                req.onerror = function() {
                  reject(req.error);
                };
              } catch (e2) {
                reject(e2);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function setItem(key2, value, callback) {
        var self2 = this;
        key2 = normalizeKey(key2);
        var promise = new Promise$1(function(resolve, reject) {
          var dbInfo;
          self2.ready().then(function() {
            dbInfo = self2._dbInfo;
            if (toString3.call(value) === "[object Blob]") {
              return _checkBlobSupport(dbInfo.db).then(function(blobSupport) {
                if (blobSupport) {
                  return value;
                }
                return _encodeBlob(value);
              });
            }
            return value;
          }).then(function(value2) {
            createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store2 = transaction.objectStore(self2._dbInfo.storeName);
                if (value2 === null) {
                  value2 = void 0;
                }
                var req = store2.put(value2, key2);
                transaction.oncomplete = function() {
                  if (value2 === void 0) {
                    value2 = null;
                  }
                  resolve(value2);
                };
                transaction.onabort = transaction.onerror = function() {
                  var err2 = req.error ? req.error : req.transaction.error;
                  reject(err2);
                };
              } catch (e2) {
                reject(e2);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function removeItem(key2, callback) {
        var self2 = this;
        key2 = normalizeKey(key2);
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store2 = transaction.objectStore(self2._dbInfo.storeName);
                var req = store2["delete"](key2);
                transaction.oncomplete = function() {
                  resolve();
                };
                transaction.onerror = function() {
                  reject(req.error);
                };
                transaction.onabort = function() {
                  var err2 = req.error ? req.error : req.transaction.error;
                  reject(err2);
                };
              } catch (e2) {
                reject(e2);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function clear(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_WRITE, function(err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store2 = transaction.objectStore(self2._dbInfo.storeName);
                var req = store2.clear();
                transaction.oncomplete = function() {
                  resolve();
                };
                transaction.onabort = transaction.onerror = function() {
                  var err2 = req.error ? req.error : req.transaction.error;
                  reject(err2);
                };
              } catch (e2) {
                reject(e2);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function length(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store2 = transaction.objectStore(self2._dbInfo.storeName);
                var req = store2.count();
                req.onsuccess = function() {
                  resolve(req.result);
                };
                req.onerror = function() {
                  reject(req.error);
                };
              } catch (e2) {
                reject(e2);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function key(n2, callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve, reject) {
          if (n2 < 0) {
            resolve(null);
            return;
          }
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store2 = transaction.objectStore(self2._dbInfo.storeName);
                var advanced = false;
                var req = store2.openKeyCursor();
                req.onsuccess = function() {
                  var cursor = req.result;
                  if (!cursor) {
                    resolve(null);
                    return;
                  }
                  if (n2 === 0) {
                    resolve(cursor.key);
                  } else {
                    if (!advanced) {
                      advanced = true;
                      cursor.advance(n2);
                    } else {
                      resolve(cursor.key);
                    }
                  }
                };
                req.onerror = function() {
                  reject(req.error);
                };
              } catch (e2) {
                reject(e2);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function keys(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            createTransaction(self2._dbInfo, READ_ONLY, function(err, transaction) {
              if (err) {
                return reject(err);
              }
              try {
                var store2 = transaction.objectStore(self2._dbInfo.storeName);
                var req = store2.openKeyCursor();
                var keys2 = [];
                req.onsuccess = function() {
                  var cursor = req.result;
                  if (!cursor) {
                    resolve(keys2);
                    return;
                  }
                  keys2.push(cursor.key);
                  cursor["continue"]();
                };
                req.onerror = function() {
                  reject(req.error);
                };
              } catch (e2) {
                reject(e2);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function dropInstance(options, callback) {
        callback = getCallback.apply(this, arguments);
        var currentConfig = this.config();
        options = typeof options !== "function" && options || {};
        if (!options.name) {
          options.name = options.name || currentConfig.name;
          options.storeName = options.storeName || currentConfig.storeName;
        }
        var self2 = this;
        var promise;
        if (!options.name) {
          promise = Promise$1.reject("Invalid arguments");
        } else {
          var isCurrentDb = options.name === currentConfig.name && self2._dbInfo.db;
          var dbPromise = isCurrentDb ? Promise$1.resolve(self2._dbInfo.db) : _getOriginalConnection(options).then(function(db2) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db2;
            for (var i2 = 0; i2 < forages.length; i2++) {
              forages[i2]._dbInfo.db = db2;
            }
            return db2;
          });
          if (!options.storeName) {
            promise = dbPromise.then(function(db2) {
              _deferReadiness(options);
              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              db2.close();
              for (var i2 = 0; i2 < forages.length; i2++) {
                var forage = forages[i2];
                forage._dbInfo.db = null;
              }
              var dropDBPromise = new Promise$1(function(resolve, reject) {
                var req = idb.deleteDatabase(options.name);
                req.onerror = function() {
                  var db3 = req.result;
                  if (db3) {
                    db3.close();
                  }
                  reject(req.error);
                };
                req.onblocked = function() {
                  console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                };
                req.onsuccess = function() {
                  var db3 = req.result;
                  if (db3) {
                    db3.close();
                  }
                  resolve(db3);
                };
              });
              return dropDBPromise.then(function(db3) {
                dbContext.db = db3;
                for (var i3 = 0; i3 < forages.length; i3++) {
                  var _forage = forages[i3];
                  _advanceReadiness(_forage._dbInfo);
                }
              })["catch"](function(err) {
                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                });
                throw err;
              });
            });
          } else {
            promise = dbPromise.then(function(db2) {
              if (!db2.objectStoreNames.contains(options.storeName)) {
                return;
              }
              var newVersion = db2.version + 1;
              _deferReadiness(options);
              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              db2.close();
              for (var i2 = 0; i2 < forages.length; i2++) {
                var forage = forages[i2];
                forage._dbInfo.db = null;
                forage._dbInfo.version = newVersion;
              }
              var dropObjectPromise = new Promise$1(function(resolve, reject) {
                var req = idb.open(options.name, newVersion);
                req.onerror = function(err) {
                  var db3 = req.result;
                  db3.close();
                  reject(err);
                };
                req.onupgradeneeded = function() {
                  var db3 = req.result;
                  db3.deleteObjectStore(options.storeName);
                };
                req.onsuccess = function() {
                  var db3 = req.result;
                  db3.close();
                  resolve(db3);
                };
              });
              return dropObjectPromise.then(function(db3) {
                dbContext.db = db3;
                for (var j2 = 0; j2 < forages.length; j2++) {
                  var _forage2 = forages[j2];
                  _forage2._dbInfo.db = db3;
                  _advanceReadiness(_forage2._dbInfo);
                }
              })["catch"](function(err) {
                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function() {
                });
                throw err;
              });
            });
          }
        }
        executeCallback(promise, callback);
        return promise;
      }
      var asyncStorage = {
        _driver: "asyncStorage",
        _initStorage,
        _support: isIndexedDBValid(),
        iterate,
        getItem,
        setItem,
        removeItem,
        clear,
        length,
        key,
        keys,
        dropInstance
      };
      function isWebSQLValid() {
        return typeof openDatabase === "function";
      }
      var BASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var BLOB_TYPE_PREFIX = "~~local_forage_type~";
      var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
      var SERIALIZED_MARKER = "__lfsc__:";
      var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;
      var TYPE_ARRAYBUFFER = "arbf";
      var TYPE_BLOB = "blob";
      var TYPE_INT8ARRAY = "si08";
      var TYPE_UINT8ARRAY = "ui08";
      var TYPE_UINT8CLAMPEDARRAY = "uic8";
      var TYPE_INT16ARRAY = "si16";
      var TYPE_INT32ARRAY = "si32";
      var TYPE_UINT16ARRAY = "ur16";
      var TYPE_UINT32ARRAY = "ui32";
      var TYPE_FLOAT32ARRAY = "fl32";
      var TYPE_FLOAT64ARRAY = "fl64";
      var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
      var toString$1 = Object.prototype.toString;
      function stringToBuffer(serializedString) {
        var bufferLength = serializedString.length * 0.75;
        var len = serializedString.length;
        var i2;
        var p2 = 0;
        var encoded1, encoded2, encoded3, encoded4;
        if (serializedString[serializedString.length - 1] === "=") {
          bufferLength--;
          if (serializedString[serializedString.length - 2] === "=") {
            bufferLength--;
          }
        }
        var buffer = new ArrayBuffer(bufferLength);
        var bytes = new Uint8Array(buffer);
        for (i2 = 0; i2 < len; i2 += 4) {
          encoded1 = BASE_CHARS.indexOf(serializedString[i2]);
          encoded2 = BASE_CHARS.indexOf(serializedString[i2 + 1]);
          encoded3 = BASE_CHARS.indexOf(serializedString[i2 + 2]);
          encoded4 = BASE_CHARS.indexOf(serializedString[i2 + 3]);
          bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
          bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
          bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }
        return buffer;
      }
      function bufferToString(buffer) {
        var bytes = new Uint8Array(buffer);
        var base64String = "";
        var i2;
        for (i2 = 0; i2 < bytes.length; i2 += 3) {
          base64String += BASE_CHARS[bytes[i2] >> 2];
          base64String += BASE_CHARS[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
          base64String += BASE_CHARS[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
          base64String += BASE_CHARS[bytes[i2 + 2] & 63];
        }
        if (bytes.length % 3 === 2) {
          base64String = base64String.substring(0, base64String.length - 1) + "=";
        } else if (bytes.length % 3 === 1) {
          base64String = base64String.substring(0, base64String.length - 2) + "==";
        }
        return base64String;
      }
      function serialize(value, callback) {
        var valueType = "";
        if (value) {
          valueType = toString$1.call(value);
        }
        if (value && (valueType === "[object ArrayBuffer]" || value.buffer && toString$1.call(value.buffer) === "[object ArrayBuffer]")) {
          var buffer;
          var marker = SERIALIZED_MARKER;
          if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
          } else {
            buffer = value.buffer;
            if (valueType === "[object Int8Array]") {
              marker += TYPE_INT8ARRAY;
            } else if (valueType === "[object Uint8Array]") {
              marker += TYPE_UINT8ARRAY;
            } else if (valueType === "[object Uint8ClampedArray]") {
              marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === "[object Int16Array]") {
              marker += TYPE_INT16ARRAY;
            } else if (valueType === "[object Uint16Array]") {
              marker += TYPE_UINT16ARRAY;
            } else if (valueType === "[object Int32Array]") {
              marker += TYPE_INT32ARRAY;
            } else if (valueType === "[object Uint32Array]") {
              marker += TYPE_UINT32ARRAY;
            } else if (valueType === "[object Float32Array]") {
              marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === "[object Float64Array]") {
              marker += TYPE_FLOAT64ARRAY;
            } else {
              callback(new Error("Failed to get type for BinaryArray"));
            }
          }
          callback(marker + bufferToString(buffer));
        } else if (valueType === "[object Blob]") {
          var fileReader = new FileReader();
          fileReader.onload = function() {
            var str = BLOB_TYPE_PREFIX + value.type + "~" + bufferToString(this.result);
            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
          };
          fileReader.readAsArrayBuffer(value);
        } else {
          try {
            callback(JSON.stringify(value));
          } catch (e2) {
            console.error("Couldn't convert value into a JSON string: ", value);
            callback(null, e2);
          }
        }
      }
      function deserialize(value) {
        if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
          return JSON.parse(value);
        }
        var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
        var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
        var blobType;
        if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
          var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
          blobType = matcher[1];
          serializedString = serializedString.substring(matcher[0].length);
        }
        var buffer = stringToBuffer(serializedString);
        switch (type) {
          case TYPE_ARRAYBUFFER:
            return buffer;
          case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
          case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
          case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
          case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
          case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
          case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
          case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
          case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
          case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
          case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
          default:
            throw new Error("Unkown type: " + type);
        }
      }
      var localforageSerializer = {
        serialize,
        deserialize,
        stringToBuffer,
        bufferToString
      };
      function createDbTable(t2, dbInfo, callback, errorCallback) {
        t2.executeSql("CREATE TABLE IF NOT EXISTS " + dbInfo.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], callback, errorCallback);
      }
      function _initStorage$1(options) {
        var self2 = this;
        var dbInfo = {
          db: null
        };
        if (options) {
          for (var i2 in options) {
            dbInfo[i2] = typeof options[i2] !== "string" ? options[i2].toString() : options[i2];
          }
        }
        var dbInfoPromise = new Promise$1(function(resolve, reject) {
          try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
          } catch (e2) {
            return reject(e2);
          }
          dbInfo.db.transaction(function(t2) {
            createDbTable(t2, dbInfo, function() {
              self2._dbInfo = dbInfo;
              resolve();
            }, function(t3, error) {
              reject(error);
            });
          }, reject);
        });
        dbInfo.serializer = localforageSerializer;
        return dbInfoPromise;
      }
      function tryExecuteSql(t2, dbInfo, sqlStatement, args, callback, errorCallback) {
        t2.executeSql(sqlStatement, args, callback, function(t3, error) {
          if (error.code === error.SYNTAX_ERR) {
            t3.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [dbInfo.storeName], function(t4, results) {
              if (!results.rows.length) {
                createDbTable(t4, dbInfo, function() {
                  t4.executeSql(sqlStatement, args, callback, errorCallback);
                }, errorCallback);
              } else {
                errorCallback(t4, error);
              }
            }, errorCallback);
          } else {
            errorCallback(t3, error);
          }
        }, errorCallback);
      }
      function getItem$1(key2, callback) {
        var self2 = this;
        key2 = normalizeKey(key2);
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t2) {
              tryExecuteSql(t2, dbInfo, "SELECT * FROM " + dbInfo.storeName + " WHERE key = ? LIMIT 1", [key2], function(t3, results) {
                var result = results.rows.length ? results.rows.item(0).value : null;
                if (result) {
                  result = dbInfo.serializer.deserialize(result);
                }
                resolve(result);
              }, function(t3, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function iterate$1(iterator2, callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t2) {
              tryExecuteSql(t2, dbInfo, "SELECT * FROM " + dbInfo.storeName, [], function(t3, results) {
                var rows = results.rows;
                var length2 = rows.length;
                for (var i2 = 0; i2 < length2; i2++) {
                  var item = rows.item(i2);
                  var result = item.value;
                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }
                  result = iterator2(result, item.key, i2 + 1);
                  if (result !== void 0) {
                    resolve(result);
                    return;
                  }
                }
                resolve();
              }, function(t3, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function _setItem(key2, value, callback, retriesLeft) {
        var self2 = this;
        key2 = normalizeKey(key2);
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            if (value === void 0) {
              value = null;
            }
            var originalValue = value;
            var dbInfo = self2._dbInfo;
            dbInfo.serializer.serialize(value, function(value2, error) {
              if (error) {
                reject(error);
              } else {
                dbInfo.db.transaction(function(t2) {
                  tryExecuteSql(t2, dbInfo, "INSERT OR REPLACE INTO " + dbInfo.storeName + " (key, value) VALUES (?, ?)", [key2, value2], function() {
                    resolve(originalValue);
                  }, function(t3, error2) {
                    reject(error2);
                  });
                }, function(sqlError) {
                  if (sqlError.code === sqlError.QUOTA_ERR) {
                    if (retriesLeft > 0) {
                      resolve(_setItem.apply(self2, [key2, originalValue, callback, retriesLeft - 1]));
                      return;
                    }
                    reject(sqlError);
                  }
                });
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function setItem$1(key2, value, callback) {
        return _setItem.apply(this, [key2, value, callback, 1]);
      }
      function removeItem$1(key2, callback) {
        var self2 = this;
        key2 = normalizeKey(key2);
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t2) {
              tryExecuteSql(t2, dbInfo, "DELETE FROM " + dbInfo.storeName + " WHERE key = ?", [key2], function() {
                resolve();
              }, function(t3, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function clear$1(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t2) {
              tryExecuteSql(t2, dbInfo, "DELETE FROM " + dbInfo.storeName, [], function() {
                resolve();
              }, function(t3, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function length$1(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t2) {
              tryExecuteSql(t2, dbInfo, "SELECT COUNT(key) as c FROM " + dbInfo.storeName, [], function(t3, results) {
                var result = results.rows.item(0).c;
                resolve(result);
              }, function(t3, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function key$1(n2, callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t2) {
              tryExecuteSql(t2, dbInfo, "SELECT key FROM " + dbInfo.storeName + " WHERE id = ? LIMIT 1", [n2 + 1], function(t3, results) {
                var result = results.rows.length ? results.rows.item(0).key : null;
                resolve(result);
              }, function(t3, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function keys$1(callback) {
        var self2 = this;
        var promise = new Promise$1(function(resolve, reject) {
          self2.ready().then(function() {
            var dbInfo = self2._dbInfo;
            dbInfo.db.transaction(function(t2) {
              tryExecuteSql(t2, dbInfo, "SELECT key FROM " + dbInfo.storeName, [], function(t3, results) {
                var keys2 = [];
                for (var i2 = 0; i2 < results.rows.length; i2++) {
                  keys2.push(results.rows.item(i2).key);
                }
                resolve(keys2);
              }, function(t3, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function getAllStoreNames(db2) {
        return new Promise$1(function(resolve, reject) {
          db2.transaction(function(t2) {
            t2.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function(t3, results) {
              var storeNames = [];
              for (var i2 = 0; i2 < results.rows.length; i2++) {
                storeNames.push(results.rows.item(i2).name);
              }
              resolve({
                db: db2,
                storeNames
              });
            }, function(t3, error) {
              reject(error);
            });
          }, function(sqlError) {
            reject(sqlError);
          });
        });
      }
      function dropInstance$1(options, callback) {
        callback = getCallback.apply(this, arguments);
        var currentConfig = this.config();
        options = typeof options !== "function" && options || {};
        if (!options.name) {
          options.name = options.name || currentConfig.name;
          options.storeName = options.storeName || currentConfig.storeName;
        }
        var self2 = this;
        var promise;
        if (!options.name) {
          promise = Promise$1.reject("Invalid arguments");
        } else {
          promise = new Promise$1(function(resolve) {
            var db2;
            if (options.name === currentConfig.name) {
              db2 = self2._dbInfo.db;
            } else {
              db2 = openDatabase(options.name, "", "", 0);
            }
            if (!options.storeName) {
              resolve(getAllStoreNames(db2));
            } else {
              resolve({
                db: db2,
                storeNames: [options.storeName]
              });
            }
          }).then(function(operationInfo) {
            return new Promise$1(function(resolve, reject) {
              operationInfo.db.transaction(function(t2) {
                function dropTable(storeName) {
                  return new Promise$1(function(resolve2, reject2) {
                    t2.executeSql("DROP TABLE IF EXISTS " + storeName, [], function() {
                      resolve2();
                    }, function(t3, error) {
                      reject2(error);
                    });
                  });
                }
                var operations = [];
                for (var i2 = 0, len = operationInfo.storeNames.length; i2 < len; i2++) {
                  operations.push(dropTable(operationInfo.storeNames[i2]));
                }
                Promise$1.all(operations).then(function() {
                  resolve();
                })["catch"](function(e2) {
                  reject(e2);
                });
              }, function(sqlError) {
                reject(sqlError);
              });
            });
          });
        }
        executeCallback(promise, callback);
        return promise;
      }
      var webSQLStorage = {
        _driver: "webSQLStorage",
        _initStorage: _initStorage$1,
        _support: isWebSQLValid(),
        iterate: iterate$1,
        getItem: getItem$1,
        setItem: setItem$1,
        removeItem: removeItem$1,
        clear: clear$1,
        length: length$1,
        key: key$1,
        keys: keys$1,
        dropInstance: dropInstance$1
      };
      function isLocalStorageValid() {
        try {
          return typeof localStorage !== "undefined" && "setItem" in localStorage && // in IE8 typeof localStorage.setItem === 'object'
          !!localStorage.setItem;
        } catch (e2) {
          return false;
        }
      }
      function _getKeyPrefix(options, defaultConfig) {
        var keyPrefix = options.name + "/";
        if (options.storeName !== defaultConfig.storeName) {
          keyPrefix += options.storeName + "/";
        }
        return keyPrefix;
      }
      function checkIfLocalStorageThrows() {
        var localStorageTestKey = "_localforage_support_test";
        try {
          localStorage.setItem(localStorageTestKey, true);
          localStorage.removeItem(localStorageTestKey);
          return false;
        } catch (e2) {
          return true;
        }
      }
      function _isLocalStorageUsable() {
        return !checkIfLocalStorageThrows() || localStorage.length > 0;
      }
      function _initStorage$2(options) {
        var self2 = this;
        var dbInfo = {};
        if (options) {
          for (var i2 in options) {
            dbInfo[i2] = options[i2];
          }
        }
        dbInfo.keyPrefix = _getKeyPrefix(options, self2._defaultConfig);
        if (!_isLocalStorageUsable()) {
          return Promise$1.reject();
        }
        self2._dbInfo = dbInfo;
        dbInfo.serializer = localforageSerializer;
        return Promise$1.resolve();
      }
      function clear$2(callback) {
        var self2 = this;
        var promise = self2.ready().then(function() {
          var keyPrefix = self2._dbInfo.keyPrefix;
          for (var i2 = localStorage.length - 1; i2 >= 0; i2--) {
            var key2 = localStorage.key(i2);
            if (key2.indexOf(keyPrefix) === 0) {
              localStorage.removeItem(key2);
            }
          }
        });
        executeCallback(promise, callback);
        return promise;
      }
      function getItem$2(key2, callback) {
        var self2 = this;
        key2 = normalizeKey(key2);
        var promise = self2.ready().then(function() {
          var dbInfo = self2._dbInfo;
          var result = localStorage.getItem(dbInfo.keyPrefix + key2);
          if (result) {
            result = dbInfo.serializer.deserialize(result);
          }
          return result;
        });
        executeCallback(promise, callback);
        return promise;
      }
      function iterate$2(iterator2, callback) {
        var self2 = this;
        var promise = self2.ready().then(function() {
          var dbInfo = self2._dbInfo;
          var keyPrefix = dbInfo.keyPrefix;
          var keyPrefixLength = keyPrefix.length;
          var length2 = localStorage.length;
          var iterationNumber = 1;
          for (var i2 = 0; i2 < length2; i2++) {
            var key2 = localStorage.key(i2);
            if (key2.indexOf(keyPrefix) !== 0) {
              continue;
            }
            var value = localStorage.getItem(key2);
            if (value) {
              value = dbInfo.serializer.deserialize(value);
            }
            value = iterator2(value, key2.substring(keyPrefixLength), iterationNumber++);
            if (value !== void 0) {
              return value;
            }
          }
        });
        executeCallback(promise, callback);
        return promise;
      }
      function key$2(n2, callback) {
        var self2 = this;
        var promise = self2.ready().then(function() {
          var dbInfo = self2._dbInfo;
          var result;
          try {
            result = localStorage.key(n2);
          } catch (error) {
            result = null;
          }
          if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
          }
          return result;
        });
        executeCallback(promise, callback);
        return promise;
      }
      function keys$2(callback) {
        var self2 = this;
        var promise = self2.ready().then(function() {
          var dbInfo = self2._dbInfo;
          var length2 = localStorage.length;
          var keys2 = [];
          for (var i2 = 0; i2 < length2; i2++) {
            var itemKey = localStorage.key(i2);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
              keys2.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
          }
          return keys2;
        });
        executeCallback(promise, callback);
        return promise;
      }
      function length$2(callback) {
        var self2 = this;
        var promise = self2.keys().then(function(keys2) {
          return keys2.length;
        });
        executeCallback(promise, callback);
        return promise;
      }
      function removeItem$2(key2, callback) {
        var self2 = this;
        key2 = normalizeKey(key2);
        var promise = self2.ready().then(function() {
          var dbInfo = self2._dbInfo;
          localStorage.removeItem(dbInfo.keyPrefix + key2);
        });
        executeCallback(promise, callback);
        return promise;
      }
      function setItem$2(key2, value, callback) {
        var self2 = this;
        key2 = normalizeKey(key2);
        var promise = self2.ready().then(function() {
          if (value === void 0) {
            value = null;
          }
          var originalValue = value;
          return new Promise$1(function(resolve, reject) {
            var dbInfo = self2._dbInfo;
            dbInfo.serializer.serialize(value, function(value2, error) {
              if (error) {
                reject(error);
              } else {
                try {
                  localStorage.setItem(dbInfo.keyPrefix + key2, value2);
                  resolve(originalValue);
                } catch (e2) {
                  if (e2.name === "QuotaExceededError" || e2.name === "NS_ERROR_DOM_QUOTA_REACHED") {
                    reject(e2);
                  }
                  reject(e2);
                }
              }
            });
          });
        });
        executeCallback(promise, callback);
        return promise;
      }
      function dropInstance$2(options, callback) {
        callback = getCallback.apply(this, arguments);
        options = typeof options !== "function" && options || {};
        if (!options.name) {
          var currentConfig = this.config();
          options.name = options.name || currentConfig.name;
          options.storeName = options.storeName || currentConfig.storeName;
        }
        var self2 = this;
        var promise;
        if (!options.name) {
          promise = Promise$1.reject("Invalid arguments");
        } else {
          promise = new Promise$1(function(resolve) {
            if (!options.storeName) {
              resolve(options.name + "/");
            } else {
              resolve(_getKeyPrefix(options, self2._defaultConfig));
            }
          }).then(function(keyPrefix) {
            for (var i2 = localStorage.length - 1; i2 >= 0; i2--) {
              var key2 = localStorage.key(i2);
              if (key2.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key2);
              }
            }
          });
        }
        executeCallback(promise, callback);
        return promise;
      }
      var localStorageWrapper = {
        _driver: "localStorageWrapper",
        _initStorage: _initStorage$2,
        _support: isLocalStorageValid(),
        iterate: iterate$2,
        getItem: getItem$2,
        setItem: setItem$2,
        removeItem: removeItem$2,
        clear: clear$2,
        length: length$2,
        key: key$2,
        keys: keys$2,
        dropInstance: dropInstance$2
      };
      var sameValue = function sameValue2(x2, y2) {
        return x2 === y2 || typeof x2 === "number" && typeof y2 === "number" && isNaN(x2) && isNaN(y2);
      };
      var includes = function includes2(array, searchElement) {
        var len = array.length;
        var i2 = 0;
        while (i2 < len) {
          if (sameValue(array[i2], searchElement)) {
            return true;
          }
          i2++;
        }
        return false;
      };
      var isArray2 = Array.isArray || function(arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
      };
      var DefinedDrivers = {};
      var DriverSupport = {};
      var DefaultDrivers = {
        INDEXEDDB: asyncStorage,
        WEBSQL: webSQLStorage,
        LOCALSTORAGE: localStorageWrapper
      };
      var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
      var OptionalDriverMethods = ["dropInstance"];
      var LibraryMethods = ["clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem"].concat(OptionalDriverMethods);
      var DefaultConfig = {
        description: "",
        driver: DefaultDriverOrder.slice(),
        name: "localforage",
        // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
        // we can use without a prompt.
        size: 4980736,
        storeName: "keyvaluepairs",
        version: 1
      };
      function callWhenReady(localForageInstance, libraryMethod) {
        localForageInstance[libraryMethod] = function() {
          var _args = arguments;
          return localForageInstance.ready().then(function() {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
          });
        };
      }
      function extend2() {
        for (var i2 = 1; i2 < arguments.length; i2++) {
          var arg = arguments[i2];
          if (arg) {
            for (var _key in arg) {
              if (arg.hasOwnProperty(_key)) {
                if (isArray2(arg[_key])) {
                  arguments[0][_key] = arg[_key].slice();
                } else {
                  arguments[0][_key] = arg[_key];
                }
              }
            }
          }
        }
        return arguments[0];
      }
      var LocalForage = function() {
        function LocalForage2(options) {
          _classCallCheck(this, LocalForage2);
          for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
              var driver = DefaultDrivers[driverTypeKey];
              var driverName = driver._driver;
              this[driverTypeKey] = driverName;
              if (!DefinedDrivers[driverName]) {
                this.defineDriver(driver);
              }
            }
          }
          this._defaultConfig = extend2({}, DefaultConfig);
          this._config = extend2({}, this._defaultConfig, options);
          this._driverSet = null;
          this._initDriver = null;
          this._ready = false;
          this._dbInfo = null;
          this._wrapLibraryMethodsWithReady();
          this.setDriver(this._config.driver)["catch"](function() {
          });
        }
        LocalForage2.prototype.config = function config2(options) {
          if ((typeof options === "undefined" ? "undefined" : _typeof(options)) === "object") {
            if (this._ready) {
              return new Error("Can't call config() after localforage has been used.");
            }
            for (var i2 in options) {
              if (i2 === "storeName") {
                options[i2] = options[i2].replace(/\W/g, "_");
              }
              if (i2 === "version" && typeof options[i2] !== "number") {
                return new Error("Database version must be a number.");
              }
              this._config[i2] = options[i2];
            }
            if ("driver" in options && options.driver) {
              return this.setDriver(this._config.driver);
            }
            return true;
          } else if (typeof options === "string") {
            return this._config[options];
          } else {
            return this._config;
          }
        };
        LocalForage2.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
          var promise = new Promise$1(function(resolve, reject) {
            try {
              var driverName = driverObject._driver;
              var complianceError = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
              if (!driverObject._driver) {
                reject(complianceError);
                return;
              }
              var driverMethods = LibraryMethods.concat("_initStorage");
              for (var i2 = 0, len = driverMethods.length; i2 < len; i2++) {
                var driverMethodName = driverMethods[i2];
                var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== "function") {
                  reject(complianceError);
                  return;
                }
              }
              var configureMissingMethods = function configureMissingMethods2() {
                var methodNotImplementedFactory = function methodNotImplementedFactory2(methodName) {
                  return function() {
                    var error = new Error("Method " + methodName + " is not implemented by the current driver");
                    var promise2 = Promise$1.reject(error);
                    executeCallback(promise2, arguments[arguments.length - 1]);
                    return promise2;
                  };
                };
                for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                  var optionalDriverMethod = OptionalDriverMethods[_i];
                  if (!driverObject[optionalDriverMethod]) {
                    driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                  }
                }
              };
              configureMissingMethods();
              var setDriverSupport = function setDriverSupport2(support) {
                if (DefinedDrivers[driverName]) {
                  console.info("Redefining LocalForage driver: " + driverName);
                }
                DefinedDrivers[driverName] = driverObject;
                DriverSupport[driverName] = support;
                resolve();
              };
              if ("_support" in driverObject) {
                if (driverObject._support && typeof driverObject._support === "function") {
                  driverObject._support().then(setDriverSupport, reject);
                } else {
                  setDriverSupport(!!driverObject._support);
                }
              } else {
                setDriverSupport(true);
              }
            } catch (e2) {
              reject(e2);
            }
          });
          executeTwoCallbacks(promise, callback, errorCallback);
          return promise;
        };
        LocalForage2.prototype.driver = function driver() {
          return this._driver || null;
        };
        LocalForage2.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
          var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error("Driver not found."));
          executeTwoCallbacks(getDriverPromise, callback, errorCallback);
          return getDriverPromise;
        };
        LocalForage2.prototype.getSerializer = function getSerializer(callback) {
          var serializerPromise = Promise$1.resolve(localforageSerializer);
          executeTwoCallbacks(serializerPromise, callback);
          return serializerPromise;
        };
        LocalForage2.prototype.ready = function ready(callback) {
          var self2 = this;
          var promise = self2._driverSet.then(function() {
            if (self2._ready === null) {
              self2._ready = self2._initDriver();
            }
            return self2._ready;
          });
          executeTwoCallbacks(promise, callback, callback);
          return promise;
        };
        LocalForage2.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
          var self2 = this;
          if (!isArray2(drivers)) {
            drivers = [drivers];
          }
          var supportedDrivers = this._getSupportedDrivers(drivers);
          function setDriverToConfig() {
            self2._config.driver = self2.driver();
          }
          function extendSelfWithDriver(driver) {
            self2._extend(driver);
            setDriverToConfig();
            self2._ready = self2._initStorage(self2._config);
            return self2._ready;
          }
          function initDriver(supportedDrivers2) {
            return function() {
              var currentDriverIndex = 0;
              function driverPromiseLoop() {
                while (currentDriverIndex < supportedDrivers2.length) {
                  var driverName = supportedDrivers2[currentDriverIndex];
                  currentDriverIndex++;
                  self2._dbInfo = null;
                  self2._ready = null;
                  return self2.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                }
                setDriverToConfig();
                var error = new Error("No available storage method found.");
                self2._driverSet = Promise$1.reject(error);
                return self2._driverSet;
              }
              return driverPromiseLoop();
            };
          }
          var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function() {
            return Promise$1.resolve();
          }) : Promise$1.resolve();
          this._driverSet = oldDriverSetDone.then(function() {
            var driverName = supportedDrivers[0];
            self2._dbInfo = null;
            self2._ready = null;
            return self2.getDriver(driverName).then(function(driver) {
              self2._driver = driver._driver;
              setDriverToConfig();
              self2._wrapLibraryMethodsWithReady();
              self2._initDriver = initDriver(supportedDrivers);
            });
          })["catch"](function() {
            setDriverToConfig();
            var error = new Error("No available storage method found.");
            self2._driverSet = Promise$1.reject(error);
            return self2._driverSet;
          });
          executeTwoCallbacks(this._driverSet, callback, errorCallback);
          return this._driverSet;
        };
        LocalForage2.prototype.supports = function supports(driverName) {
          return !!DriverSupport[driverName];
        };
        LocalForage2.prototype._extend = function _extend(libraryMethodsAndProperties) {
          extend2(this, libraryMethodsAndProperties);
        };
        LocalForage2.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
          var supportedDrivers = [];
          for (var i2 = 0, len = drivers.length; i2 < len; i2++) {
            var driverName = drivers[i2];
            if (this.supports(driverName)) {
              supportedDrivers.push(driverName);
            }
          }
          return supportedDrivers;
        };
        LocalForage2.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
          for (var i2 = 0, len = LibraryMethods.length; i2 < len; i2++) {
            callWhenReady(this, LibraryMethods[i2]);
          }
        };
        LocalForage2.prototype.createInstance = function createInstance2(options) {
          return new LocalForage2(options);
        };
        return LocalForage2;
      }();
      var localforage_js = new LocalForage();
      module2.exports = localforage_js;
    }, { "3": 3 }] }, {}, [4])(4);
  });
})(localforage$1);
var localforageExports = localforage$1.exports;
const localforage = /* @__PURE__ */ getDefaultExportFromCjs(localforageExports);
const store = localforage.createInstance({
  name: "store-pos",
  storeName: "pos_data"
});
const storage = {
  // Save cart
  saveCart: async (cart) => {
    try {
      await store.setItem("current_cart", cart);
      return true;
    } catch (error) {
      console.error("Failed to save cart:", error);
      return false;
    }
  },
  // Get cart
  getCart: async () => {
    try {
      return await store.getItem("current_cart");
    } catch (error) {
      console.error("Failed to get cart:", error);
      return null;
    }
  },
  // Clear cart
  clearCart: async () => {
    try {
      await store.removeItem("current_cart");
      return true;
    } catch (error) {
      console.error("Failed to clear cart:", error);
      return false;
    }
  },
  // Save held carts
  saveHeldCart: async (cart) => {
    try {
      const heldCarts = await store.getItem("held_carts") || [];
      heldCarts.push({
        ...cart,
        id: Date.now(),
        heldAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      await store.setItem("held_carts", heldCarts);
      return true;
    } catch (error) {
      console.error("Failed to save held cart:", error);
      return false;
    }
  },
  // Get held carts
  getHeldCarts: async () => {
    try {
      return await store.getItem("held_carts") || [];
    } catch (error) {
      console.error("Failed to get held carts:", error);
      return [];
    }
  },
  // Remove held cart
  removeHeldCart: async (id2) => {
    try {
      const heldCarts = await store.getItem("held_carts") || [];
      const filtered = heldCarts.filter((cart) => cart.id !== id2);
      await store.setItem("held_carts", filtered);
      return true;
    } catch (error) {
      console.error("Failed to remove held cart:", error);
      return false;
    }
  },
  // Cache products for offline use
  cacheProducts: async (products) => {
    try {
      await store.setItem("cached_products", {
        products,
        cachedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      return true;
    } catch (error) {
      console.error("Failed to cache products:", error);
      return false;
    }
  },
  // Get cached products
  getCachedProducts: async () => {
    try {
      const data = await store.getItem("cached_products");
      if (!data) return null;
      const cachedTime = new Date(data.cachedAt).getTime();
      const now = (/* @__PURE__ */ new Date()).getTime();
      const hourInMs = 60 * 60 * 1e3;
      if (now - cachedTime > hourInMs) {
        return null;
      }
      return data.products;
    } catch (error) {
      console.error("Failed to get cached products:", error);
      return null;
    }
  },
  // Queue offline order
  queueOfflineOrder: async (order) => {
    try {
      const queue = await store.getItem("offline_orders") || [];
      queue.push({
        ...order,
        id: Date.now(),
        queuedAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      await store.setItem("offline_orders", queue);
      return true;
    } catch (error) {
      console.error("Failed to queue offline order:", error);
      return false;
    }
  },
  // Get offline orders
  getOfflineOrders: async () => {
    try {
      return await store.getItem("offline_orders") || [];
    } catch (error) {
      console.error("Failed to get offline orders:", error);
      return [];
    }
  },
  // Clear offline orders
  clearOfflineOrders: async () => {
    try {
      await store.setItem("offline_orders", []);
      return true;
    } catch (error) {
      console.error("Failed to clear offline orders:", error);
      return false;
    }
  }
};
const CartContext = reactExports.createContext();
const useCart = () => {
  const context = reactExports.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
const CartProvider = ({ children }) => {
  const [items, setItems] = reactExports.useState([]);
  const [customer, setCustomer] = reactExports.useState(null);
  const [discount, setDiscount] = reactExports.useState(0);
  const [coupons, setCoupons] = reactExports.useState([]);
  const [notes, setNotes] = reactExports.useState("");
  reactExports.useEffect(() => {
    loadCart();
  }, []);
  reactExports.useEffect(() => {
    if (items.length > 0 || customer || discount > 0 || coupons.length > 0) {
      saveCart();
    }
  }, [items, customer, discount, coupons, notes]);
  const loadCart = async () => {
    const savedCart = await storage.getCart();
    if (savedCart) {
      setItems(savedCart.items || []);
      setCustomer(savedCart.customer || null);
      setDiscount(savedCart.discount || 0);
      setCoupons(savedCart.coupons || []);
      setNotes(savedCart.notes || "");
    }
  };
  const saveCart = async () => {
    await storage.saveCart({
      items,
      customer,
      discount,
      coupons,
      notes
    });
  };
  const addItem = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.product_id === product.id && item.variation_id === (product.variation_id || 0)
      );
      if (existingIndex >= 0) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        return newItems;
      }
      return [
        ...prevItems,
        {
          product_id: product.id,
          variation_id: product.variation_id || 0,
          name: product.name,
          price: parseFloat(product.price),
          quantity,
          image: product.image,
          sku: product.sku,
          tax_class: product.tax_class
        }
      ];
    });
  };
  const removeItem = (index) => {
    setItems((prevItems) => prevItems.filter((_2, i2) => i2 !== index));
  };
  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeItem(index);
      return;
    }
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity = quantity;
      return newItems;
    });
  };
  const updateItemPrice = (index, price) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].price = parseFloat(price);
      return newItems;
    });
  };
  const clearCart = async () => {
    setItems([]);
    setCustomer(null);
    setDiscount(0);
    setCoupons([]);
    setNotes("");
    await storage.clearCart();
  };
  const holdCart = async () => {
    if (items.length === 0) return false;
    const success = await storage.saveHeldCart({
      items,
      customer,
      discount,
      coupons,
      notes
    });
    if (success) {
      await clearCart();
    }
    return success;
  };
  const loadHeldCart = async (heldCart) => {
    setItems(heldCart.items || []);
    setCustomer(heldCart.customer || null);
    setDiscount(heldCart.discount || 0);
    setCoupons(heldCart.coupons || []);
    setNotes(heldCart.notes || "");
    await storage.removeHeldCart(heldCart.id);
  };
  const applyCoupon = (coupon) => {
    setCoupons((prev) => {
      if (prev.some((c2) => c2.code === coupon.code)) {
        return prev;
      }
      return [...prev, coupon];
    });
  };
  const removeCoupon = (code) => {
    setCoupons((prev) => prev.filter((c2) => c2.code !== code));
  };
  const getSubtotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  const getCouponDiscount = () => {
    let totalDiscount = 0;
    const subtotal = getSubtotal();
    coupons.forEach((coupon) => {
      if (coupon.type === "percent") {
        totalDiscount += subtotal * coupon.amount / 100;
      } else if (coupon.type === "fixed_cart") {
        totalDiscount += parseFloat(coupon.amount);
      }
    });
    return totalDiscount;
  };
  const getTotal = () => {
    const subtotal = getSubtotal();
    const couponDiscount = getCouponDiscount();
    return Math.max(0, subtotal - couponDiscount - discount);
  };
  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };
  const value = {
    items,
    customer,
    discount,
    coupons,
    notes,
    setCustomer,
    setDiscount,
    setNotes,
    addItem,
    removeItem,
    updateQuantity,
    updateItemPrice,
    clearCart,
    holdCart,
    loadHeldCart,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getCouponDiscount,
    getTotal,
    getTotalItems
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartContext.Provider, { value, children });
};
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e2) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i2;
  let l2;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i2 = 0, l2 = obj.length; i2 < l2; i2++) {
      fn.call(null, obj[i2], i2, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i2 = 0; i2 < len; i2++) {
      key = keys[i2];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i2 = keys.length;
  let _key;
  while (i2-- > 0) {
    _key = keys[i2];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i2 = 0, l2 = arguments.length; i2 < l2; i2++) {
    arguments[i2] && forEach(arguments[i2], assignValue);
  }
  return result;
}
const extend = (a2, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction$1(val)) {
      a2[key] = bind(val, thisArg);
    } else {
      a2[key] = val;
    }
  }, { allOwnKeys });
  return a2;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i2;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i2 = props.length;
    while (i2-- > 0) {
      prop = props[i2];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i2 = thing.length;
  if (!isNumber(i2)) return null;
  const arr = new Array(i2);
  while (i2-- > 0) {
    arr[i2] = thing[i2];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m2, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i2) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i2] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i2 + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i2] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb2) => {
      callbacks.push(cb2);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb2) => setTimeout(cb2);
})(
  typeof setImmediate === "function",
  isFunction$1(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message, code, config2, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config2 && (this.config = config2);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config2, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  const msg = error && error.message ? error.message : "Error";
  const errCode = code == null && error ? error.code : code;
  AxiosError$1.call(axiosError, msg, errCode, config2, request, response);
  if (error && axiosError.cause == null) {
    Object.defineProperty(axiosError, "cause", { value: error, configurable: true });
  }
  axiosError.name = error && error.name || "Error";
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i2) {
    token = removeBrackets(token);
    return !dots && i2 ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el2, index) {
          !(utils$1.isUndefined(el2) || el2 === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el2)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el2, key) {
      const result = !(utils$1.isUndefined(el2) || el2 === null) && visitor.call(
        formData,
        el2,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el2, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id2) {
    if (this.handlers[id2]) {
      this.handlers[id2] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i2;
  const len = keys.length;
  let key;
  for (i2 = 0; i2 < len; i2++) {
    key = keys[i2];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e2) {
      if (e2.name !== "SyntaxError") {
        throw e2;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data, this.parseReviver);
      } catch (e2) {
        if (strictJSONParsing) {
          if (e2.name === "SyntaxError") {
            throw AxiosError$1.from(e2, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e2;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i2;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i2 = line.indexOf(":");
    key = line.substring(0, i2).trim().toLowerCase();
    val = line.substring(i2 + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i2 = keys.length;
    let deleted = false;
    while (i2--) {
      const key = keys[i2];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config2 = this || defaults;
  const context = response || config2;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config2, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config2, request) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config2, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i2 = tail;
    let bytesCount = 0;
    while (i2 !== head) {
      bytesCount += bytes[i2++];
      i2 = i2 % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e2) => {
    const loaded = e2.loaded;
    const total = e2.lengthComputable ? e2.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e2,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure, sameSite) {
      if (typeof document === "undefined") return;
      const cookie = [`${name}=${encodeURIComponent(value)}`];
      if (utils$1.isNumber(expires)) {
        cookie.push(`expires=${new Date(expires).toUTCString()}`);
      }
      if (utils$1.isString(path)) {
        cookie.push(`path=${path}`);
      }
      if (utils$1.isString(domain)) {
        cookie.push(`domain=${domain}`);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      if (utils$1.isString(sameSite)) {
        cookie.push(`SameSite=${sameSite}`);
      }
      document.cookie = cookie.join("; ");
    },
    read(name) {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
      return match ? decodeURIComponent(match[1]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config3 = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a2, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a2, b, prop, caseless);
    } else if (!utils$1.isUndefined(a2)) {
      return getMergedValue(void 0, a2, prop, caseless);
    }
  }
  function valueFromConfig2(a2, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a2, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a2)) {
      return getMergedValue(void 0, a2);
    }
  }
  function mergeDirectKeys(a2, b, prop) {
    if (prop in config2) {
      return getMergedValue(a2, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a2);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a2, b, prop) => mergeDeepProperties(headersToObject(a2), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config3[prop] = configValue);
  });
  return config3;
}
const resolveConfig = (config2) => {
  const newConfig = mergeConfig$1({}, config2);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config2.params, config2.paramsSerializer);
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
    );
  }
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils$1.isFunction(data.getHeaders)) {
      const formHeaders = data.getHeaders();
      const allowedHeaders = ["content-type", "content-length"];
      Object.entries(formHeaders).forEach(([key, val]) => {
        if (allowedHeaders.includes(key.toLowerCase())) {
          headers.set(key, val);
        }
      });
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config2) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config2);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config2,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config2, request));
      request = null;
    };
    request.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config2, request);
      err.event = event || null;
      reject(err);
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config2,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config2, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config2));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e2) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e2);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const { isFunction } = utils$1;
const globalFetchAPI = (({ Request, Response }) => ({
  Request,
  Response
}))(utils$1.global);
const {
  ReadableStream: ReadableStream$1,
  TextEncoder
} = utils$1.global;
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e2) {
    return false;
  }
};
const factory = (env) => {
  env = utils$1.merge.call({
    skipUndefined: true
  }, globalFetchAPI, env);
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform.origin, {
      body: new ReadableStream$1(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config2) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config2);
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config2) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig(config2);
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
    let request = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config2);
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config: config2,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config2, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError$1.from(err, err && err.code, config2, request);
    }
  };
};
const seedCache = /* @__PURE__ */ new Map();
const getFetch = (config2) => {
  let env = config2 && config2.env || {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [
    Request,
    Response,
    fetch2
  ];
  let len = seeds.length, i2 = len, seed, target, map = seedCache;
  while (i2--) {
    seed = seeds[i2];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i2 ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
getFetch();
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch
  }
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e2) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
function getAdapter$1(adapters2, config2) {
  adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
  const { length } = adapters2;
  let nameOrAdapter;
  let adapter;
  const rejectedReasons = {};
  for (let i2 = 0; i2 < length; i2++) {
    nameOrAdapter = adapters2[i2];
    let id2;
    adapter = nameOrAdapter;
    if (!isResolvedHandle(nameOrAdapter)) {
      adapter = knownAdapters[(id2 = String(nameOrAdapter)).toLowerCase()];
      if (adapter === void 0) {
        throw new AxiosError$1(`Unknown adapter '${id2}'`);
      }
    }
    if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config2)))) {
      break;
    }
    rejectedReasons[id2 || "#" + i2] = adapter;
  }
  if (!adapter) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id2, state]) => `adapter ${id2} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
    );
    let s2 = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
    throw new AxiosError$1(
      `There is no suitable adapter to dispatch the request ` + s2,
      "ERR_NOT_SUPPORT"
    );
  }
  return adapter;
}
const adapters = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: getAdapter$1,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters
};
function throwIfCancellationRequested(config2) {
  if (config2.cancelToken) {
    config2.cancelToken.throwIfRequested();
  }
  if (config2.signal && config2.signal.aborted) {
    throw new CanceledError$1(null, config2);
  }
}
function dispatchRequest(config2) {
  throwIfCancellationRequested(config2);
  config2.headers = AxiosHeaders$1.from(config2.headers);
  config2.data = transformData.call(
    config2,
    config2.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config2.method) !== -1) {
    config2.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config2.adapter || defaults.adapter, config2);
  return adapter(config2).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config2);
    response.data = transformData.call(
      config2,
      config2.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config2);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config2,
          config2.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.13.0";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i2) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i2 = keys.length;
  while (i2-- > 0) {
    const opt = keys[i2];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config2) {
    try {
      return await this._request(configOrUrl, config2);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e2) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config2) {
    if (typeof configOrUrl === "string") {
      config2 = config2 || {};
      config2.url = configOrUrl;
    } else {
      config2 = configOrUrl || {};
    }
    config2 = mergeConfig$1(this.defaults, config2);
    const { transitional: transitional2, paramsSerializer, headers } = config2;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config2.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config2.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config2.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config2.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config2, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config2.method = (config2.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config2.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config2.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config2) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i2 = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config2);
      while (i2 < len) {
        promise = promise.then(chain[i2++], chain[i2++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config2;
    while (i2 < len) {
      const onFulfilled = requestInterceptorChain[i2++];
      const onRejected = requestInterceptorChain[i2++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i2 = 0;
    len = responseInterceptorChain.length;
    while (i2 < len) {
      promise = promise.then(responseInterceptorChain[i2++], responseInterceptorChain[i2++]);
    }
    return promise;
  }
  getUri(config2) {
    config2 = mergeConfig$1(this.defaults, config2);
    const fullPath = buildFullPath(config2.baseURL, config2.url, config2.allowAbsoluteUrls);
    return buildURL(fullPath, config2.params, config2.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config2) {
    return this.request(mergeConfig$1(config2 || {}, {
      method,
      url,
      data: (config2 || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config2) {
      return this.request(mergeConfig$1(config2 || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i2 = token._listeners.length;
      while (i2-- > 0) {
        token._listeners[i2](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config2, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config2, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
const config$1 = window.storePOSConfig || {};
const api = axios.create({
  baseURL: config$1.restUrl || "/wp-json/store-pos/v1",
  headers: {
    "Content-Type": "application/json",
    "X-WP-Nonce": config$1.restNonce || ""
  }
});
api.interceptors.request.use(
  (config2) => {
    return config2;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    var _a, _b;
    const message = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || error.message || "An error occurred";
    return Promise.reject(new Error(message));
  }
);
const productsAPI = {
  getAll: (params, options = {}) => api.get("/products", { params, ...options }),
  getById: (id2, options = {}) => api.get(`/products/${id2}`, options),
  getByBarcode: (barcode, options = {}) => api.get(`/products/barcode/${barcode}`, options),
  getCategories: (options = {}) => api.get("/products/categories", options),
  updateStock: (id2, data, options = {}) => api.put(`/products/${id2}/stock`, data, options)
};
const ordersAPI = {
  create: (data) => api.post("/orders", data),
  getAll: (params) => api.get("/orders", { params }),
  getById: (id2) => api.get(`/orders/${id2}`),
  updateStatus: (id2, status) => api.put(`/orders/${id2}/status`, { status }),
  refund: (id2, data) => api.post(`/orders/${id2}/refund`, data)
};
const customersAPI = {
  search: (search, options = {}) => api.get("/customers/search", { params: { search }, ...options }),
  getAll: (params, options = {}) => api.get("/customers", { params, ...options }),
  getById: (id2, options = {}) => api.get(`/customers/${id2}`, options),
  create: (data, options = {}) => api.post("/customers", data, options)
};
const outletsAPI = {
  getAll: (params) => api.get("/outlets", { params }),
  getById: (id2) => api.get(`/outlets/${id2}`),
  create: (data) => api.post("/outlets", data),
  update: (id2, data) => api.put(`/outlets/${id2}`, data),
  delete: (id2) => api.delete(`/outlets/${id2}`),
  getStats: (id2) => api.get(`/outlets/${id2}/stats`)
};
const drawersAPI = {
  getAll: (params) => api.get("/drawers", { params }),
  getById: (id2) => api.get(`/drawers/${id2}`),
  create: (data) => api.post("/drawers", data),
  update: (id2, data) => api.put(`/drawers/${id2}`, data),
  delete: (id2) => api.delete(`/drawers/${id2}`),
  open: (id2, data) => api.post(`/drawers/${id2}/open`, data),
  close: (sessionId, data) => api.post(`/drawers/sessions/${sessionId}/close`, data),
  getActiveSession: (id2) => api.get(`/drawers/${id2}/active-session`),
  getSessionHistory: (id2, params) => api.get(`/drawers/${id2}/sessions`, { params })
};
const couponsAPI = {
  validate: (data) => api.post("/coupons/validate", data),
  getAll: () => api.get("/coupons")
};
const DrawerContext = reactExports.createContext();
const useDrawer = () => {
  const context = reactExports.useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within DrawerProvider");
  }
  return context;
};
const DrawerProvider = ({ children }) => {
  const [currentDrawer, setCurrentDrawer] = reactExports.useState(null);
  const [currentSession, setCurrentSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const openDrawer = async (drawerId, openingBalance) => {
    setLoading(true);
    try {
      const response = await drawersAPI.open(drawerId, { opening_balance: openingBalance });
      if (response.success) {
        setCurrentSession(response.data);
        setCurrentDrawer({ id: drawerId });
        zt.success(response.message || "Drawer opened successfully");
        return true;
      }
      return false;
    } catch (error) {
      zt.error(error.message || "Failed to open drawer");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const closeDrawer = async (closingBalance, notes = "") => {
    if (!currentSession) {
      zt.error("No active drawer session");
      return false;
    }
    setLoading(true);
    try {
      const response = await drawersAPI.close(currentSession.id, {
        closing_balance: closingBalance,
        notes
      });
      if (response.success) {
        setCurrentSession(null);
        setCurrentDrawer(null);
        zt.success(response.message || "Drawer closed successfully");
        return true;
      }
      return false;
    } catch (error) {
      zt.error(error.message || "Failed to close drawer");
      return false;
    } finally {
      setLoading(false);
    }
  };
  const loadActiveSession = async (drawerId) => {
    setLoading(true);
    try {
      const response = await drawersAPI.getActiveSession(drawerId);
      if (response.success && response.data) {
        setCurrentSession(response.data);
        setCurrentDrawer({ id: drawerId });
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to load active session:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };
  const value = {
    currentDrawer,
    currentSession,
    loading,
    openDrawer,
    closeDrawer,
    loadActiveSession,
    isDrawerOpen: !!currentSession
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContext.Provider, { value, children });
};
const OutletContext = reactExports.createContext();
const useOutlet = () => {
  const context = reactExports.useContext(OutletContext);
  if (!context) {
    throw new Error("useOutlet must be used within OutletProvider");
  }
  return context;
};
const OutletProvider = ({ children }) => {
  const [currentOutlet, setCurrentOutlet] = reactExports.useState(null);
  const [outlets, setOutlets] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const hasInitialized = reactExports.useRef(false);
  reactExports.useEffect(() => {
    loadOutlets();
  }, []);
  reactExports.useEffect(() => {
    if (outlets.length > 0) {
      if (!hasInitialized.current) {
        try {
          const savedOutletId = loadSavedOutletId();
          if (savedOutletId) {
            const savedOutlet = outlets.find((o2) => (o2 == null ? void 0 : o2.id) === savedOutletId);
            if (savedOutlet) {
              setCurrentOutlet(savedOutlet);
            }
          }
          if (!savedOutletId || !outlets.find((o2) => (o2 == null ? void 0 : o2.id) === savedOutletId)) {
            if (outlets[0]) {
              setCurrentOutlet(outlets[0]);
              localStorage.setItem("pos_current_outlet", outlets[0].id.toString());
            }
          }
          hasInitialized.current = true;
        } catch (error) {
          console.error("Error initializing outlet:", error);
          if (outlets[0]) {
            setCurrentOutlet(outlets[0]);
          }
          hasInitialized.current = true;
        }
      } else if (currentOutlet) {
        const updatedOutlet = outlets.find((o2) => (o2 == null ? void 0 : o2.id) === (currentOutlet == null ? void 0 : currentOutlet.id));
        if (updatedOutlet) {
          setCurrentOutlet(updatedOutlet);
        }
      }
    }
  }, [outlets, currentOutlet]);
  const loadOutlets = async () => {
    setLoading(true);
    try {
      const response = await outletsAPI.getAll({ status: "active" });
      if ((response == null ? void 0 : response.success) && Array.isArray(response.data)) {
        setOutlets(response.data);
      } else {
        setOutlets([]);
      }
    } catch (error) {
      console.error("Failed to load outlets:", error);
      setOutlets([]);
    } finally {
      setLoading(false);
    }
  };
  const loadSavedOutletId = () => {
    try {
      const savedOutletId = localStorage.getItem("pos_current_outlet");
      return savedOutletId ? parseInt(savedOutletId, 10) : null;
    } catch (error) {
      console.error("Error loading saved outlet:", error);
      return null;
    }
  };
  const switchOutlet = async (outletId) => {
    const outlet = outlets.find((o2) => o2.id === outletId);
    if (!outlet) {
      zt.error("Outlet not found");
      return false;
    }
    setCurrentOutlet(outlet);
    localStorage.setItem("pos_current_outlet", outletId.toString());
    zt.success(`Switched to ${outlet.name}`);
    return true;
  };
  const value = {
    currentOutlet,
    outlets,
    loading,
    switchOutlet,
    loadOutlets
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(OutletContext.Provider, { value, children });
};
const useBarcodeScanner = (onScan, options = {}) => {
  const {
    minLength = 3,
    maxLength = 20,
    timeout = 100,
    // Time window for scanner input (ms)
    endChar = "Enter",
    preventDefault = true
  } = options;
  const buffer = reactExports.useRef("");
  const timeoutRef = reactExports.useRef(null);
  const resetBuffer = reactExports.useCallback(() => {
    buffer.current = "";
  }, []);
  const handleKeyPress = reactExports.useCallback((event) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }
    const key = event.key;
    if (key === endChar) {
      const scannedValue = buffer.current.trim();
      if (scannedValue.length >= minLength && scannedValue.length <= maxLength) {
        if (preventDefault) {
          event.preventDefault();
        }
        onScan(scannedValue);
      }
      resetBuffer();
      return;
    }
    if (key.length === 1) {
      buffer.current += key;
      if (buffer.current.length > 2 && preventDefault) {
        event.preventDefault();
      }
      timeoutRef.current = setTimeout(() => {
        resetBuffer();
      }, timeout);
    }
  }, [onScan, minLength, maxLength, timeout, endChar, preventDefault, resetBuffer]);
  reactExports.useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleKeyPress]);
  return {
    resetBuffer
  };
};
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React.createContext && React.createContext(DefaultContext);
var __assign = function() {
  __assign = Object.assign || function(t2) {
    for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
      s2 = arguments[i2];
      for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2)) t2[p2] = s2[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s2, e2) {
  var t2 = {};
  for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2) && e2.indexOf(p2) < 0) t2[p2] = s2[p2];
  if (s2 != null && typeof Object.getOwnPropertySymbols === "function") for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
    if (e2.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2])) t2[p2[i2]] = s2[p2[i2]];
  }
  return t2;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i2) {
    return React.createElement(node.tag, __assign({
      key: i2
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data) {
  return function(props) {
    return React.createElement(IconBase, __assign({
      attr: __assign({}, data.attr)
    }, props), Tree2Element(data.child));
  };
}
function IconBase(props) {
  var elem = function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return React.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && React.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? React.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}
function FiCheck(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "polyline", "attr": { "points": "20 6 9 17 4 12" } }] })(props);
}
function FiChevronRight(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "polyline", "attr": { "points": "9 18 15 12 9 6" } }] })(props);
}
function FiCreditCard(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "rect", "attr": { "x": "1", "y": "4", "width": "22", "height": "16", "rx": "2", "ry": "2" } }, { "tag": "line", "attr": { "x1": "1", "y1": "10", "x2": "23", "y2": "10" } }] })(props);
}
function FiDollarSign(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "12", "y1": "1", "x2": "12", "y2": "23" } }, { "tag": "path", "attr": { "d": "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" } }] })(props);
}
function FiGrid(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "rect", "attr": { "x": "3", "y": "3", "width": "7", "height": "7" } }, { "tag": "rect", "attr": { "x": "14", "y": "3", "width": "7", "height": "7" } }, { "tag": "rect", "attr": { "x": "14", "y": "14", "width": "7", "height": "7" } }, { "tag": "rect", "attr": { "x": "3", "y": "14", "width": "7", "height": "7" } }] })(props);
}
function FiMinus(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "5", "y1": "12", "x2": "19", "y2": "12" } }] })(props);
}
function FiPackage(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "16.5", "y1": "9.4", "x2": "7.5", "y2": "4.21" } }, { "tag": "path", "attr": { "d": "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" } }, { "tag": "polyline", "attr": { "points": "3.27 6.96 12 12.01 20.73 6.96" } }, { "tag": "line", "attr": { "x1": "12", "y1": "22.08", "x2": "12", "y2": "12" } }] })(props);
}
function FiPlus(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "12", "y1": "5", "x2": "12", "y2": "19" } }, { "tag": "line", "attr": { "x1": "5", "y1": "12", "x2": "19", "y2": "12" } }] })(props);
}
function FiSearch(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "circle", "attr": { "cx": "11", "cy": "11", "r": "8" } }, { "tag": "line", "attr": { "x1": "21", "y1": "21", "x2": "16.65", "y2": "16.65" } }] })(props);
}
function FiSettings(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "circle", "attr": { "cx": "12", "cy": "12", "r": "3" } }, { "tag": "path", "attr": { "d": "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" } }] })(props);
}
function FiShoppingBag(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" } }, { "tag": "line", "attr": { "x1": "3", "y1": "6", "x2": "21", "y2": "6" } }, { "tag": "path", "attr": { "d": "M16 10a4 4 0 0 1-8 0" } }] })(props);
}
function FiShoppingCart(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "circle", "attr": { "cx": "9", "cy": "21", "r": "1" } }, { "tag": "circle", "attr": { "cx": "20", "cy": "21", "r": "1" } }, { "tag": "path", "attr": { "d": "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" } }] })(props);
}
function FiTag(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" } }, { "tag": "line", "attr": { "x1": "7", "y1": "7", "x2": "7.01", "y2": "7" } }] })(props);
}
function FiTrash2(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "polyline", "attr": { "points": "3 6 5 6 21 6" } }, { "tag": "path", "attr": { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" } }, { "tag": "line", "attr": { "x1": "10", "y1": "11", "x2": "10", "y2": "17" } }, { "tag": "line", "attr": { "x1": "14", "y1": "11", "x2": "14", "y2": "17" } }] })(props);
}
function FiUserPlus(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" } }, { "tag": "circle", "attr": { "cx": "8.5", "cy": "7", "r": "4" } }, { "tag": "line", "attr": { "x1": "20", "y1": "8", "x2": "20", "y2": "14" } }, { "tag": "line", "attr": { "x1": "23", "y1": "11", "x2": "17", "y2": "11" } }] })(props);
}
function FiUser(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "path", "attr": { "d": "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" } }, { "tag": "circle", "attr": { "cx": "12", "cy": "7", "r": "4" } }] })(props);
}
function FiX(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "line", "attr": { "x1": "18", "y1": "6", "x2": "6", "y2": "18" } }, { "tag": "line", "attr": { "x1": "6", "y1": "6", "x2": "18", "y2": "18" } }] })(props);
}
const config = window.storePOSConfig || {};
const currency = config.currency || {};
const decodeHtmlEntities = (value) => {
  if (typeof value !== "string") {
    return value;
  }
  const textarea = document.createElement("textarea");
  textarea.innerHTML = value;
  return textarea.value;
};
const formatPrice = (amount) => {
  const {
    symbol = "$",
    position = "left",
    decimals = 2,
    decimal_separator = ".",
    thousand_separator = ","
  } = currency;
  const decodedSymbol = decodeHtmlEntities(symbol);
  const formatted = parseFloat(amount).toFixed(decimals).replace(".", decimal_separator).replace(/\B(?=(\d{3})+(?!\d))/g, thousand_separator);
  switch (position) {
    case "left":
      return decodedSymbol + formatted;
    case "right":
      return formatted + decodedSymbol;
    case "left_space":
      return decodedSymbol + " " + formatted;
    case "right_space":
      return formatted + " " + decodedSymbol;
    default:
      return decodedSymbol + formatted;
  }
};
const DrawerStatusModal = ({ onClose }) => {
  const { currentSession, isDrawerOpen, openDrawer, closeDrawer } = useDrawer();
  const [openingBalance, setOpeningBalance] = reactExports.useState("");
  const [closingBalance, setClosingBalance] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [drawerId, setDrawerId] = reactExports.useState("");
  const handleOpenDrawer = async () => {
    if (!drawerId) {
      zt.error("Select a drawer");
      return;
    }
    const balance = parseFloat(openingBalance) || 0;
    const success = await openDrawer(parseInt(drawerId), balance);
    if (success) {
      onClose();
    }
  };
  const handleCloseDrawer = async () => {
    const balance = parseFloat(closingBalance);
    if (isNaN(balance)) {
      zt.error("Enter a valid closing balance");
      return;
    }
    const success = await closeDrawer(balance, notes);
    if (success) {
      onClose();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full m-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-900", children: "Drawer Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FiX, { size: 24 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: !isDrawerOpen ? (
      /* Open Drawer Form */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-blue-800", children: "Open a drawer to start accepting payments through the POS system." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Select Drawer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: drawerId,
              onChange: (e2) => setDrawerId(e2.target.value),
              className: "input",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select a drawer..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "Main Drawer" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "2", children: "Counter 2" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Opening Balance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FiDollarSign, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: openingBalance,
                onChange: (e2) => setOpeningBalance(e2.target.value),
                placeholder: "0.00",
                step: "0.01",
                className: "input pl-10"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleOpenDrawer,
            className: "w-full btn btn-success",
            children: "Open Drawer"
          }
        )
      ] })
    ) : (
      /* Close Drawer Form */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-green-50 border border-green-200 rounded-lg p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-green-900 mb-2", children: "Drawer is Open" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-green-800 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Opened: ",
              new Date(currentSession.opened_at).toLocaleString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Opening Balance: ",
              formatPrice(currentSession.opening_balance)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Closing Balance *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FiDollarSign, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "number",
                value: closingBalance,
                onChange: (e2) => setClosingBalance(e2.target.value),
                placeholder: "0.00",
                step: "0.01",
                className: "input pl-10",
                required: true
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Notes (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: notes,
              onChange: (e2) => setNotes(e2.target.value),
              placeholder: "Any discrepancies or notes...",
              rows: "3",
              className: "input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleCloseDrawer,
            className: "w-full btn btn-danger",
            children: "Close Drawer"
          }
        )
      ] })
    ) })
  ] }) });
};
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = reactExports.useState(value);
  reactExports.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
const TopBar = ({ searchQuery, setSearchQuery }) => {
  const { currentOutlet, outlets, switchOutlet } = useOutlet();
  const { currentSession, isDrawerOpen } = useDrawer();
  const [showDrawerModal, setShowDrawerModal] = reactExports.useState(false);
  const [internalSearch, setInternalSearch] = reactExports.useState(searchQuery || "");
  const debouncedValue = useDebounce(internalSearch, 300);
  const config2 = window.storePOSConfig || {};
  const currentUser = config2.currentUser || {};
  reactExports.useEffect(() => {
    if (debouncedValue !== searchQuery) {
      setSearchQuery(debouncedValue);
    }
  }, [debouncedValue, searchQuery, setSearchQuery]);
  reactExports.useEffect(() => {
    setInternalSearch(searchQuery || "");
  }, [searchQuery]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-b border-gray-200 px-6 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FiShoppingBag, { className: "text-primary-600 text-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-900", children: "Store POS" })
        ] }),
        outlets.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: (currentOutlet == null ? void 0 : currentOutlet.id) || "",
            onChange: (e2) => switchOutlet(parseInt(e2.target.value)),
            className: "input max-w-xs",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select Outlet" }),
              outlets.map((outlet) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: outlet.id, children: outlet.name }, outlet.id))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowDrawerModal(true),
            className: `px-4 py-2 rounded-lg font-medium ${isDrawerOpen ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-red-100 text-red-700 hover:bg-red-200"}`,
            children: isDrawerOpen ? "● Drawer Open" : "○ Drawer Closed"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 max-w-2xl mx-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FiSearch, { className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Search products by name, SKU, or barcode...",
            value: internalSearch,
            onChange: (e2) => setInternalSearch(e2.target.value),
            className: "w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            autoFocus: true
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2 text-sm text-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FiUser, { className: "text-gray-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: currentUser.name || "User" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg",
            title: "Settings",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FiSettings, { size: 20 })
          }
        )
      ] })
    ] }),
    showDrawerModal && /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerStatusModal, { onClose: () => setShowDrawerModal(false) })
  ] });
};
const ProductGrid = ({ searchQuery, selectedCategory }) => {
  const config2 = window.storePOSConfig || {};
  const settings = config2.settings || {};
  const [products, setProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [page, setPage] = reactExports.useState(1);
  const [hasMore, setHasMore] = reactExports.useState(true);
  const { addItem } = useCart();
  const debouncedSearch = useDebounce(searchQuery, 300);
  const controllerRef = reactExports.useRef(null);
  const requestIdRef = reactExports.useRef(0);
  const lastQueryRef = reactExports.useRef({ search: "", category: null });
  const gridColumnsClass = reactExports.useMemo(() => {
    const value = parseInt(settings.products_per_row || 4, 10);
    switch (value) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-2 md:grid-cols-3";
      case 4:
        return "grid-cols-2 md:grid-cols-3 xl:grid-cols-4";
      case 5:
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5";
      case 6:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6";
      default:
        return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
  }, [settings.products_per_row]);
  reactExports.useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedCategory]);
  reactExports.useEffect(() => {
    loadProducts();
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [debouncedSearch, selectedCategory, page]);
  const loadProducts = async () => {
    const isNewQuery = page === 1 && (debouncedSearch !== lastQueryRef.current.search || selectedCategory !== lastQueryRef.current.category);
    if (isNewQuery) {
      setProducts([]);
      setHasMore(true);
    }
    setLoading(true);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    const requestId = ++requestIdRef.current;
    try {
      const params = {
        page,
        per_page: 20
      };
      if (debouncedSearch) {
        params.search = debouncedSearch;
      }
      if (selectedCategory) {
        params.category = selectedCategory;
      }
      const response = await productsAPI.getAll(params, { signal: controller.signal });
      if (requestId !== requestIdRef.current) {
        return;
      }
      if (response.success) {
        const newProducts = response.data.products || [];
        if (page === 1) {
          setProducts(newProducts);
          lastQueryRef.current = {
            search: debouncedSearch,
            category: selectedCategory
          };
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }
        setHasMore(response.data.current_page < response.data.pages);
      }
    } catch (error) {
      if (controller.signal.aborted || error.name === "CanceledError" || error.message === "canceled") {
        return;
      }
      zt.error("Failed to load products");
      console.error(error);
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setLoading(false);
      }
    }
  };
  const handleAddToCart = (product) => {
    if (product.stock_status === "outofstock") {
      zt.error("Product is out of stock");
      return;
    }
    addItem(product);
    zt.success(`${product.name} added to cart`);
  };
  const getStockBadge = (product) => {
    if (product.stock_status === "outofstock") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-red-100 text-red-700 px-2 py-1 rounded", children: "Out of Stock" });
    }
    if (product.manage_stock && product.stock_quantity !== null) {
      const qty = product.stock_quantity;
      if (qty <= 5) {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded", children: [
          "Low Stock (",
          qty,
          ")"
        ] });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded", children: [
        "In Stock (",
        qty,
        ")"
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-green-100 text-green-700 px-2 py-1 rounded", children: "In Stock" });
  };
  if (loading && page === 1) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-gray-600", children: "Loading products..." })
    ] }) });
  }
  if (!loading && products.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FiPackage, { className: "mx-auto text-gray-400 text-5xl mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-lg", children: "No products found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-sm mt-2", children: "Try adjusting your search or filters" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid ${gridColumnsClass} gap-4`, children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card hover:shadow-md transition-shadow cursor-pointer",
        onClick: () => handleAddToCart(product),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden", children: product.image ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.image,
              alt: product.name,
              className: "w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FiPackage, { className: "text-gray-400 text-4xl" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-gray-900 text-sm line-clamp-2", children: decodeHtmlEntities(product.name) }),
            product.sku && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
              "SKU: ",
              product.sku
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-primary-600", children: formatPrice(product.price) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FiShoppingCart, { className: "text-gray-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: getStockBadge(product) })
          ] })
        ]
      },
      product.id
    )) }),
    hasMore && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setPage((p2) => p2 + 1),
        disabled: loading,
        className: "btn btn-secondary",
        children: loading ? "Loading..." : "Load More"
      }
    ) })
  ] });
};
const CheckoutModal = ({ onClose }) => {
  const { items, customer, discount, coupons, getTotal, clearCart, notes } = useCart();
  const { currentSession } = useDrawer();
  const { currentOutlet } = useOutlet();
  const [paymentMethod, setPaymentMethod] = reactExports.useState("cash");
  const [amountReceived, setAmountReceived] = reactExports.useState("");
  const [processing, setProcessing] = reactExports.useState(false);
  const total = getTotal();
  const change = amountReceived ? parseFloat(amountReceived) - total : 0;
  const paymentMethods = [
    { id: "cash", label: "Cash", icon: FiDollarSign },
    { id: "card", label: "Card", icon: FiCreditCard },
    { id: "other", label: "Other", icon: FiCheck }
  ];
  const handleQuickAmount = (amount) => {
    setAmountReceived(amount.toString());
  };
  const handleCheckout = async () => {
    var _a;
    if (paymentMethod === "cash" && parseFloat(amountReceived) < total) {
      zt.error("Amount received is less than total");
      return;
    }
    setProcessing(true);
    try {
      const orderData = {
        items: items.map((item) => ({
          product_id: item.product_id,
          variation_id: item.variation_id || 0,
          quantity: item.quantity
        })),
        customer_id: (customer == null ? void 0 : customer.id) || 0,
        payment_method: paymentMethod,
        payment_method_title: ((_a = paymentMethods.find((m2) => m2.id === paymentMethod)) == null ? void 0 : _a.label) || "Cash",
        coupons: coupons.map((c2) => c2.code),
        custom_discount: discount,
        notes,
        outlet_id: currentOutlet == null ? void 0 : currentOutlet.id,
        drawer_id: currentSession == null ? void 0 : currentSession.drawer_id,
        drawer_session_id: currentSession == null ? void 0 : currentSession.id
      };
      const response = await ordersAPI.create(orderData);
      if (response.success) {
        zt.success("Order completed successfully!");
        if (paymentMethod === "cash" && change > 0) {
          zt.success(`Change: ${formatPrice(change)}`, { duration: 5e3 });
        }
        await clearCart();
        onClose();
      }
    } catch (error) {
      zt.error(error.message || "Failed to process order");
    } finally {
      setProcessing(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-[90vh] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "text-gray-400 hover:text-gray-600",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FiX, { size: 24 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: items.length })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-lg pt-2 border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-600", children: formatPrice(total) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Payment Method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: paymentMethods.map((method) => {
          const Icon = method.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setPaymentMethod(method.id),
              className: `flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-colors ${paymentMethod === method.id ? "border-primary-600 bg-primary-50 text-primary-700" : "border-gray-200 hover:border-gray-300"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 24, className: "mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: method.label })
              ]
            },
            method.id
          );
        }) })
      ] }),
      paymentMethod === "cash" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-3", children: "Amount Received" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 mb-3", children: [10, 20, 50, 100, 200, 500, 1e3, 2e3].map((amount) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleQuickAmount(amount),
            className: "btn btn-secondary py-2",
            children: formatPrice(amount)
          },
          amount
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: amountReceived,
            onChange: (e2) => setAmountReceived(e2.target.value),
            placeholder: "Enter amount",
            className: "input text-lg",
            step: "0.01"
          }
        ),
        amountReceived && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 bg-green-50 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-700 font-medium", children: "Change" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-2xl font-bold ${change >= 0 ? "text-green-600" : "text-red-600"}`, children: formatPrice(Math.abs(change)) })
          ] }),
          change < 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-600 mt-2", children: "Insufficient amount received" })
        ] })
      ] }),
      customer && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-blue-50 rounded-lg p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-gray-900 mb-2", children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700", children: customer.display_name }),
        customer.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: customer.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-t border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          className: "flex-1 btn btn-secondary",
          disabled: processing,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleCheckout,
          disabled: processing || paymentMethod === "cash" && change < 0,
          className: "flex-1 btn btn-success disabled:opacity-50 disabled:cursor-not-allowed",
          children: processing ? "Processing..." : "Complete Order"
        }
      )
    ] }) })
  ] }) });
};
const CustomerSelectModal = ({ onClose }) => {
  const { setCustomer } = useCart();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [customers, setCustomers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [showCreateForm, setShowCreateForm] = reactExports.useState(false);
  const [newCustomer, setNewCustomer] = reactExports.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: ""
  });
  const debouncedSearch = useDebounce(searchQuery, 400);
  const controllerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (debouncedSearch && debouncedSearch.length >= 2) {
      handleSearch();
    } else if (debouncedSearch.length === 0) {
      setCustomers([]);
    }
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [debouncedSearch]);
  const handleSearch = async () => {
    setLoading(true);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    try {
      const response = await customersAPI.search(debouncedSearch, { signal: controller.signal });
      if (response.success) {
        setCustomers(response.data);
      }
    } catch (error) {
      if (controller.signal.aborted || error.name === "CanceledError" || error.message === "canceled") {
        return;
      }
      zt.error("Failed to search customers");
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setLoading(false);
      }
    }
  };
  const handleSelectCustomer = (customer) => {
    setCustomer(customer);
    zt.success(`Customer selected: ${customer.display_name}`);
    onClose();
  };
  const handleCreateCustomer = async () => {
    if (!newCustomer.email) {
      zt.error("Email is required");
      return;
    }
    setLoading(true);
    try {
      const response = await customersAPI.create(newCustomer);
      if (response.success) {
        setCustomer(response.data);
        zt.success("Customer created and selected");
        onClose();
      }
    } catch (error) {
      zt.error(error.message || "Failed to create customer");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 max-h-[90vh] overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-900", children: "Select Customer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FiX, { size: 24 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-6", children: !showCreateForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FiSearch, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: searchQuery,
              onChange: (e2) => setSearchQuery(e2.target.value),
              placeholder: "Search by name or email...",
              className: "w-full pl-10 input"
            }
          )
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setCustomer(null);
            zt.success("Walk-in customer selected");
            onClose();
          },
          className: "w-full flex items-center gap-3 p-4 border-2 border-gray-300 rounded-lg hover:border-primary-500 hover:bg-gray-50 mb-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FiUser, { size: 24, className: "text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: "Walk-in Customer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: "No customer information" })
            ] })
          ]
        }
      ),
      customers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: customers.map((customer) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleSelectCustomer(customer),
          className: "w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-gray-50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FiUser, { size: 20, className: "text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: customer.display_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500", children: customer.email })
            ] })
          ]
        },
        customer.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowCreateForm(true),
          className: "w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-gray-50 mt-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FiUserPlus, { size: 20 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Create New Customer" })
          ]
        }
      )
    ] }) : (
      /* Create Customer Form */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "First Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: newCustomer.first_name,
                onChange: (e2) => setNewCustomer({ ...newCustomer, first_name: e2.target.value }),
                className: "input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Last Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: newCustomer.last_name,
                onChange: (e2) => setNewCustomer({ ...newCustomer, last_name: e2.target.value }),
                className: "input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Email *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              value: newCustomer.email,
              onChange: (e2) => setNewCustomer({ ...newCustomer, email: e2.target.value }),
              className: "input",
              required: true
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "tel",
              value: newCustomer.phone,
              onChange: (e2) => setNewCustomer({ ...newCustomer, phone: e2.target.value }),
              className: "input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setShowCreateForm(false),
              className: "flex-1 btn btn-secondary",
              children: "Back"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleCreateCustomer,
              className: "flex-1 btn btn-primary",
              disabled: loading,
              children: loading ? "Creating..." : "Create Customer"
            }
          )
        ] })
      ] })
    ) })
  ] }) });
};
const CouponModal = ({ onClose }) => {
  const { coupons, applyCoupon, removeCoupon, getSubtotal } = useCart();
  const [couponCode, setCouponCode] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleApplyCoupon = async () => {
    if (!couponCode) {
      zt.error("Enter a coupon code");
      return;
    }
    setLoading(true);
    try {
      const response = await couponsAPI.validate({
        code: couponCode,
        cart_total: getSubtotal()
      });
      if (response.success) {
        applyCoupon(response.data);
        zt.success(`Coupon "${response.data.code}" applied!`);
        setCouponCode("");
      }
    } catch (error) {
      zt.error(error.message || "Invalid coupon code");
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveCoupon = (code) => {
    removeCoupon(code);
    zt.success("Coupon removed");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full m-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6 border-b border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-gray-900", children: "Apply Coupon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FiX, { size: 24 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: couponCode,
            onChange: (e2) => setCouponCode(e2.target.value.toUpperCase()),
            onKeyPress: (e2) => e2.key === "Enter" && handleApplyCoupon(),
            placeholder: "Enter coupon code",
            className: "flex-1 input uppercase"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleApplyCoupon,
            disabled: loading,
            className: "btn btn-primary",
            children: loading ? "Checking..." : "Apply"
          }
        )
      ] }),
      coupons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-gray-700", children: "Applied Coupons" }),
        coupons.map((coupon) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FiTag, { className: "text-green-600" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-gray-900", children: coupon.code }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-600", children: coupon.type === "percent" ? `${coupon.amount}% off` : `$${coupon.amount} off` })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => handleRemoveCoupon(coupon.code),
                  className: "text-red-600 hover:text-red-700",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(FiTrash2, { size: 18 })
                }
              )
            ]
          },
          coupon.code
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-t border-gray-200 bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "w-full btn btn-secondary", children: "Done" }) })
  ] }) });
};
const CartPanel = () => {
  const {
    items,
    customer,
    discount,
    coupons,
    removeItem,
    updateQuantity,
    clearCart,
    holdCart,
    getSubtotal,
    getCouponDiscount,
    getTotal,
    getTotalItems
  } = useCart();
  const [showCheckout, setShowCheckout] = reactExports.useState(false);
  const [showCustomerModal, setShowCustomerModal] = reactExports.useState(false);
  const [showCouponModal, setShowCouponModal] = reactExports.useState(false);
  const handleHoldCart = async () => {
    const success = await holdCart();
    if (success) {
      zt.success("Cart saved");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-gray-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Current Order" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [
        getTotalItems(),
        " items"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 mt-2", children: "Scan or click products to add" })
    ] }) : items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 rounded-lg p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium text-gray-900 text-sm", children: item.name }),
          item.sku && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
            "SKU: ",
            item.sku
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => removeItem(index),
            className: "text-red-600 hover:text-red-700 p-1",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FiTrash2, { size: 16 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => updateQuantity(index, item.quantity - 1),
              className: "w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FiMinus, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12 text-center font-medium", children: item.quantity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => updateQuantity(index, item.quantity + 1),
              className: "w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FiPlus, { size: 14 })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600", children: [
            formatPrice(item.price),
            " each"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-primary-600", children: formatPrice(item.price * item.quantity) })
        ] })
      ] })
    ] }, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-gray-200 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowCustomerModal(true),
          className: "w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FiUser, { className: "text-gray-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700", children: customer ? customer.display_name : "Walk-in Customer" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary-600", children: "Change" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowCouponModal(true),
          className: "w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FiTag, { className: "text-gray-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-gray-700", children: coupons.length > 0 ? `${coupons.length} Coupon(s)` : "Apply Coupon" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary-600", children: "Add" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 py-3 border-t border-gray-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatPrice(getSubtotal()) })
        ] }),
        getCouponDiscount() > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Coupon Discount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-green-600", children: [
            "-",
            formatPrice(getCouponDiscount())
          ] })
        ] }),
        discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-600", children: "Manager Discount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-green-600", children: [
            "-",
            formatPrice(discount)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-lg font-bold pt-2 border-t border-gray-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-600", children: formatPrice(getTotal()) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleHoldCart,
            disabled: items.length === 0,
            className: "btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed",
            children: "Hold"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: clearCart,
            disabled: items.length === 0,
            className: "btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed",
            children: "Clear"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setShowCheckout(true),
          disabled: items.length === 0,
          className: "w-full btn btn-success text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed",
          children: [
            "Checkout ",
            items.length > 0 && `- ${formatPrice(getTotal())}`
          ]
        }
      )
    ] }),
    showCheckout && /* @__PURE__ */ jsxRuntimeExports.jsx(CheckoutModal, { onClose: () => setShowCheckout(false) }),
    showCustomerModal && /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerSelectModal, { onClose: () => setShowCustomerModal(false) }),
    showCouponModal && /* @__PURE__ */ jsxRuntimeExports.jsx(CouponModal, { onClose: () => setShowCouponModal(false) })
  ] });
};
const CategorySidebar = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
    } finally {
      setLoading(false);
    }
  };
  const buildCategoryTree = () => {
    const tree = [];
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.id] = { ...cat, children: [] };
    });
    categories.forEach((cat) => {
      if (cat.parent === 0) {
        tree.push(categoryMap[cat.id]);
      } else if (categoryMap[cat.parent]) {
        categoryMap[cat.parent].children.push(categoryMap[cat.id]);
      }
    });
    return tree;
  };
  const CategoryItem = ({ category, level = 0 }) => {
    const [isExpanded, setIsExpanded] = reactExports.useState(false);
    const hasChildren = category.children && category.children.length > 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            if (hasChildren) {
              setIsExpanded(!isExpanded);
            }
            onSelectCategory(category.id);
          },
          className: `w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${selectedCategory === category.id ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-700"}`,
          style: { paddingLeft: `${level * 16 + 16}px` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
              !hasChildren && level > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: category.name }),
              category.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-500", children: [
                "(",
                category.count,
                ")"
              ] })
            ] }),
            hasChildren && /* @__PURE__ */ jsxRuntimeExports.jsx(
              FiChevronRight,
              {
                className: `text-gray-400 transition-transform ${isExpanded ? "transform rotate-90" : ""}`,
                size: 16
              }
            )
          ]
        }
      ),
      hasChildren && isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: category.children.map((child) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryItem, { category: child, level: level + 1 }, child.id)) })
    ] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-full flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-gray-900", children: "Categories" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onSelectCategory(null),
          className: `w-full flex items-center space-x-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${!selectedCategory ? "bg-primary-50 text-primary-700 font-medium" : "text-gray-700"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FiGrid, { size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "All Products" })
          ]
        }
      ),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-center text-gray-500 text-sm", children: "Loading..." }) : buildCategoryTree().map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryItem, { category }, category.id))
    ] })
  ] });
};
const POSLayout = () => {
  const [selectedCategory, setSelectedCategory] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const { addItem } = useCart();
  const handleBarcodeScan = async (barcode) => {
    try {
      const response = await productsAPI.getByBarcode(barcode);
      if (response.success) {
        addItem(response.data);
        zt.success(`${response.data.name} added to cart`);
      }
    } catch (error) {
      zt.error("Product not found");
    }
  };
  useBarcodeScanner(handleBarcodeScan, {
    minLength: 3,
    maxLength: 20,
    timeout: 100
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TopBar, { searchQuery, setSearchQuery }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-64 bg-white border-r border-gray-200 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CategorySidebar,
        {
          selectedCategory,
          onSelectCategory: setSelectedCategory
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductGrid,
        {
          searchQuery,
          selectedCategory
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-96 bg-white border-l border-gray-200 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartPanel, {}) })
    ] })
  ] });
};
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("POS Error Boundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl w-full mx-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "w-12 h-12 text-red-500 mr-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-gray-900", children: "Something went wrong" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-4", children: "The POS application encountered an error. Please try refreshing the page." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-red-50 border border-red-200 rounded p-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-mono text-red-800 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Error:" }),
            " ",
            this.state.error && this.state.error.toString()
          ] }),
          this.state.errorInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "text-xs text-red-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("summary", { className: "cursor-pointer font-semibold mb-2", children: "Stack trace" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "whitespace-pre-wrap overflow-auto max-h-64 bg-red-100 p-2 rounded", children: this.state.errorInfo.componentStack })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => window.location.reload(),
            className: "bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors",
            children: "Reload Page"
          }
        )
      ] }) }) });
    }
    return this.props.children;
  }
}
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OutletProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Fe,
      {
        position: "top-right",
        toastOptions: {
          duration: 3e3,
          style: {
            background: "#363636",
            color: "#fff"
          },
          success: {
            duration: 3e3,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff"
            }
          },
          error: {
            duration: 4e3,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff"
            }
          }
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(POSLayout, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(POSLayout, {}) })
    ] })
  ] }) }) }) }) }) });
}
const rootElement = document.getElementById("store-pos-app") || document.getElementById("root");
if (!rootElement) {
  console.error("Store POS root element not found");
}
let root;
const render = (Component = App) => {
  if (!rootElement) {
    return;
  }
  if (!root) {
    root = client.createRoot(rootElement);
  }
  root.render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Component, {}) })
  );
};
try {
  render();
} catch (error) {
  console.error("Failed to mount POS app:", error);
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 8px; margin: 1rem;">
        <h2 style="color: #c00; margin-bottom: 1rem;">Failed to load POS</h2>
        <p style="color: #666;">Error: ${error.message}</p>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #0056A7; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `;
  }
}
//# sourceMappingURL=main-BPAjxRsy.js.map
