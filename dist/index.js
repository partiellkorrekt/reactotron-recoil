'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var recoil = require('recoil');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

console.log(React__default['default']);

var pickValues = function pickValues(state, path) {
  if (!path || path === '*') {
    return state;
  }

  if (!path.endsWith('*')) {
    return state[path];
  }

  if (path.endsWith('*')) {
    var result = {};
    var prefix = path.substr(0, path.length - 1);

    for (var key in state) {
      if (key.startsWith(prefix)) {
        result[key] = state[key];
      }
    }

    return result;
  }

  return {};
};

var RecoilState = /*#__PURE__*/function () {
  function RecoilState() {
    _classCallCheck(this, RecoilState);

    this.state = {};
    this.subscriptions = [];

    this.onChange = function () {
      return undefined;
    };
  }

  _createClass(RecoilState, [{
    key: "setState",
    value: function setState(nextState) {
      this.onChange(this.state, nextState);
      this.state = nextState;
      this.serveSubscriptions();
    }
  }, {
    key: "getKeys",
    value: function getKeys() {
      return Object.keys(this.state);
    }
  }, {
    key: "getState",
    value: function getState() {
      return _objectSpread2({}, this.state);
    }
  }, {
    key: "setSubscriptions",
    value: function setSubscriptions(paths, reactotron) {
      this.subscriptions = paths;

      if (reactotron) {
        this.reactotron = reactotron;
      }

      this.serveSubscriptions();
    }
  }, {
    key: "serveSubscriptions",
    value: function serveSubscriptions() {
      var _this$reactotron,
          _this = this;

      ((_this$reactotron = this.reactotron) === null || _this$reactotron === void 0 ? void 0 : _this$reactotron.stateValuesChange) && this.reactotron.stateValuesChange(this.subscriptions.map(function (path) {
        return {
          path: path,
          value: pickValues(_this.state, path)
        };
      }));
    }
  }]);

  return RecoilState;
}();

var MainRecoilState = new RecoilState();

var RecoilObserver = function RecoilObserver() {
  var snapshot = recoil.useRecoilSnapshot();
  React.useEffect(function () {
    var state = {};

    var _iterator = _createForOfIteratorHelper(snapshot.getNodes_UNSTABLE()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _info$loadable;

        var node = _step.value;
        var info = snapshot.getInfo_UNSTABLE(node);
        state[node.key] = (_info$loadable = info.loadable) === null || _info$loadable === void 0 ? void 0 : _info$loadable.contents;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    MainRecoilState.setState(state);
  }, [snapshot]);
  return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null);
};

var ReactotronRecoilRoot = function ReactotronRecoilRoot(props) {
  return /*#__PURE__*/React__default['default'].createElement(recoil.RecoilRoot, props, /*#__PURE__*/React__default['default'].createElement(RecoilObserver, null), props.children);
};

var reactotronRecoil = function reactotronRecoil() {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function (reactotron) {
    return {
      onCommand: function onCommand(_ref) {
        var type = _ref.type,
            payload = _ref.payload;

        switch (type) {
          case 'state.keys.request':
          case 'state.values.request':
            if (!payload.path) {
              reactotron.stateKeysResponse && reactotron.stateKeysResponse(null, type === 'state.keys.request' ? Object.keys(MainRecoilState.getKeys()) : MainRecoilState.getState());
            }

            break;

          case 'state.backup.request':
            reactotron.send('state.backup.response', {
              state: MainRecoilState.getState()
            });
            break;

          case 'state.values.subscribe':
            MainRecoilState.setSubscriptions(payload.paths, reactotron);
            break;
        }
      }
    };
  };
};

exports.ReactotronRecoilRoot = ReactotronRecoilRoot;
exports.reactotronRecoil = reactotronRecoil;
