const remark = require('remark')
const html = require('remark-html')
const frontmatter = require('remark-frontmatter')
const parse = require('remark-parse')
const unified = require('unified')

function logger () {
  return function (data) {
    console.log(JSON.stringify(data))
  }
}

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

function parseLexdown (contents, opts, cb) {
  unified()
    .use(parse, { footnotes: true })
    .use(marginalia)
    // .use(logger)
    .use(frontmatter, ['yaml'])
    .use(html)
    .process(contents, (err, file) => {
      cb(err, file.contents)
    })
}

module.exports = parseLexdown
