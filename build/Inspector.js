// Generated by CoffeeScript 1.8.0
(function() {
  var Inspector, assert, _;

  assert = require('assert');

  _ = require('underscore');

  Inspector = (function() {
    function Inspector() {}

    Inspector.prototype.getDependencies = function(func) {
      var hints, params;
      assert(func != null, 'The argument "func" must have a value');
      params = this.getParameterNames(func);
      hints = this.getDependencyHints(func);
      return _.map(params, function(param) {
        var _ref;
        return (_ref = hints[param]) != null ? _ref : {
          name: param,
          all: false,
          hint: void 0
        };
      });
    };

    Inspector.prototype.getParameterNames = function(func) {
      var matches, regex;
      assert(func != null, 'The argument "func" must have a value');
      regex = /function .*\(([^)]+)/g;
      matches = regex.exec(func.toString());
      if ((matches == null) || matches[1].length === 0) {
        return [];
      }
      return matches[1].split(/[,\s]+/);
    };

    Inspector.prototype.getDependencyHints = function(func) {
      var all, argument, dependency, hint, hints, match, name, pattern, regex, _ref;
      assert(func != null, 'The argument "func" must have a value');
      regex = /"(.*?)\s*->\s*(all)?\s*(.*?)";/gi;
      hints = {};
      while (match = regex.exec(func.toString())) {
        pattern = match[0], argument = match[1], all = match[2], dependency = match[3];
        if (all != null) {
          all = true;
        }
        if (dependency.indexOf(':')) {
          _ref = dependency.split(/\s*:\s*/, 2), name = _ref[0], hint = _ref[1];
        } else {
          name = dependency;
          hint = void 0;
        }
        hints[argument] = {
          name: name,
          all: all,
          hint: hint
        };
      }
      return hints;
    };

    Inspector.prototype.isAutoConstructor = function(constructor) {
      var body, name;
      assert(constructor != null, 'The argument "constructor" must have a value');
      name = constructor.name;
      body = constructor.toString();
      return body.indexOf("" + name + ".__super__.constructor.apply(this, arguments);") > 0;
    };

    return Inspector;

  })();

  module.exports = Inspector;

}).call(this);
