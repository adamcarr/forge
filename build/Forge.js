// Generated by CoffeeScript 1.8.0
(function() {
  var Binding, Context, Forge, Inspector, ResolutionError, assert, _;

  assert = require('assert');

  _ = require('underscore');

  Binding = require('./Binding');

  Context = require('./Context');

  Inspector = require('./Inspector');

  ResolutionError = require('./errors/ResolutionError');

  Forge = (function() {
    function Forge(inspector) {
      this.inspector = inspector != null ? inspector : new Inspector();
      this.bindings = {};
    }

    Forge.prototype.bind = function(name) {
      var binding, _base;
      assert(name != null, 'The argument "name" must have a value');
      binding = new Binding(this, name);
      ((_base = this.bindings)[name] != null ? _base[name] : _base[name] = []).push(binding);
      return binding;
    };

    Forge.prototype.unbind = function(name) {
      var count;
      assert(name != null, 'The argument "name" must have a value');
      count = this.bindings[name] != null ? this.bindings[name].length : 0;
      this.bindings[name] = [];
      return count;
    };

    Forge.prototype.rebind = function(name) {
      assert(name != null, 'The argument "name" must have a value');
      this.unbind(name);
      return this.bind(name);
    };

    Forge.prototype.get = function(name, hint, args) {
      return this.resolve(name, new Context(), hint, false, args);
    };

    Forge.prototype.getOne = function(name, hint, args) {
      var bindings, context;
      assert(name != null, 'The argument "name" must have a value');
      context = new Context();
      bindings = this.getMatchingBindings(name, hint);
      if (bindings.length === 0) {
        throw new ResolutionError(name, hint, context, 'No matching bindings were available');
      }
      if (bindings.length !== 1) {
        throw new ResolutionError(name, hint, context, 'Multiple matching bindings were available');
      }
      return this.resolveBindings(context, bindings, hint, args, true);
    };

    Forge.prototype.getAll = function(name, args) {
      var bindings, context;
      assert(name != null, 'The argument "name" must have a value');
      context = new Context();
      bindings = this.bindings[name];
      if (!((bindings != null ? bindings.length : void 0) > 0)) {
        throw new ResolutionError(name, void 0, context, 'No matching bindings were available');
      }
      return this.resolveBindings(context, bindings, void 0, args, false);
    };

    Forge.prototype.getMatchingBindings = function(name, hint) {
      assert(name != null, 'The argument "name" must have a value');
      if (this.bindings[name] == null) {
        return [];
      }
      return _.filter(this.bindings[name], function(b) {
        return b.matches(hint);
      });
    };

    Forge.prototype.resolve = function(name, context, hint, all, args) {
      var bindings, unwrap;
      assert(name != null, 'The argument "name" must have a value');
      if (context == null) {
        context = new Context();
      }
      if (all) {
        bindings = this.bindings[name];
        unwrap = false;
      } else {
        bindings = this.getMatchingBindings(name, hint);
        unwrap = true;
      }
      if ((bindings != null ? bindings.length : void 0) === 0) {
        throw new ResolutionError(name, hint, context, 'No matching bindings were available');
      }
      return this.resolveBindings(context, bindings, hint, args, unwrap);
    };

    Forge.prototype.resolveBindings = function(context, bindings, hint, args, unwrap) {
      var results;
      results = _.map(bindings, function(binding) {
        return binding.resolve(context, hint, args);
      });
      if (unwrap && results.length === 1) {
        return results[0];
      } else {
        return results;
      }
    };

    Forge.prototype.inspect = function() {
      var bindings;
      bindings = _.flatten(_.values(this.bindings));
      return _.invoke(bindings, 'toString').join('\n');
    };

    return Forge;

  })();

  module.exports = Forge;

}).call(this);
