// Generated by CoffeeScript 1.8.0
(function() {
  var ResolutionError, util;

  util = require('util');

  ResolutionError = (function() {
    function ResolutionError(name, hint, context, message) {
      this.name = 'ResolutionError';
      this.message = this.getMessage(name, hint, context, message);
      Error.captureStackTrace(this, arguments.callee);
    }

    ResolutionError.prototype.toString = function() {
      return this.message;
    };

    ResolutionError.prototype.getMessage = function(name, hint, context, message) {
      var lines;
      lines = [];
      lines.push("Could not resolve component named " + name + ": " + message);
      if (hint != null) {
        lines.push('  With resolution hint:');
        lines.push("    " + (util.inspect(hint)));
      }
      lines.push('  In resolution context:');
      lines.push(context.toString());
      lines.push('  ---');
      return lines.join('\n');
    };

    return ResolutionError;

  })();

  module.exports = ResolutionError;

}).call(this);
