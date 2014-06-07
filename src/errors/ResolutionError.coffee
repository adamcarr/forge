util = require 'util'

class ResolutionError

  constructor: (name, context, message) ->
    @name    = 'ResolutionError'
    @message = @getMessage(name, context, message)
    Error.captureStackTrace(this, arguments.callee)

  getMessage: (name, context, message) ->
    lines = []
    lines.push "Could not resolve component named #{name}: #{message}"
    if context.hint?
      lines.push '  With resolution hint:'
      lines.push "    #{util.inspect(context.hint)}"
    lines.push '  In resolution context:'
    lines.push context.toString()
    lines.push '  ---'
    lines.join('\n')

module.exports = ResolutionError
