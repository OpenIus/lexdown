const lexsearch = require('../utils/lexsearch')

function locateReflink (value, fromIndex) {
  return value.indexOf('*[', fromIndex)
}

tokenizeReflink.notInLink = true
tokenizeReflink.locator = locateReflink

function tokenizeReflink (eat, value, silent) {
  var match = /^\*\[([ \w+]*)\]\(([ \w+\/]*)\)/.exec(value)

  if (!match) return
  if (silent) return true


  var result = lexsearch.fetch(match[2])
  var title = match[1] || result.title

  return eat(match[0])({
    type: 'html',
    value: `<a class="reflink" href="${match[2]}">${title}</a>`
  })
}

function reflink () {
  var Parser = this.Parser
  var tokenizers = Parser.prototype.inlineTokenizers
  var methods = Parser.prototype.inlineMethods

  tokenizers.reflink = tokenizeReflink
  methods.splice(methods.indexOf('autoLink'), 0, 'reflink')
}

module.exports = reflink
