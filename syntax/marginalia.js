function locateMarginalia (value, fromIndex) {
  return value.indexOf('[[', fromIndex)
}

tokenizeMarginalia.notInLink = true
tokenizeMarginalia.locator = locateMarginalia
function tokenizeMarginalia (eat, value, silent) {
  var match = /^\[\[([ \w+]*)\]\]/.exec(value)

  if (!match) return
  if (silent) return true

  return eat(match[0])({
    type: 'html',
    value: `<div class="marginalia">${match[1]}</div>`
  })
}

function marginalia () {
  var Parser = this.Parser
  var tokenizers = Parser.prototype.inlineTokenizers
  var methods = Parser.prototype.inlineMethods

  tokenizers.marginalia = tokenizeMarginalia
  methods.splice(methods.indexOf('text'), 0, 'marginalia')
}

module.exports = marginalia
