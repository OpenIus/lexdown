const fs = require('fs')
const path = require('path')
const remark = require('remark')
const html = require('remark-html')
const frontmatter = require('remark-frontmatter')
const parse = require('remark-parse')
const unified = require('unified')
const yaml = require('js-yaml')

function logger () {
  return function (data) {
    // console.log(JSON.stringify(data))
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

var docTitle = null
var docType = null

function parseMetadata () {
  return function (data) {
    var type = data.children[0].type
    if (type !== 'yaml') return

    var content = yaml.load(data.children[0].value)
    docType = content.type
    docTitle = content.title
  }
}


function parseLexdown (contents, opts, cb) {
  unified()
    .use(parse, { footnotes: true })
    .use(marginalia)
    .use(parseMetadata)
    .use(logger)
    .use(frontmatter, ['yaml'])
    .use(html)
    .process(contents, (err, file) => {
      var basicCSS = fs.readFileSync(path.join(__dirname, 'assets/css/basic.css'), {
        encoding: 'utf8'
      })
      var specificCSS = fs.readFileSync(path.join(__dirname, 'assets/css/', `${docType}.css`), {
        encoding: 'utf8'
      })
      var html = `
        <html>
        <head>
          <meta charset="utf-8">
          <title>${docTitle}</title>
          <style>
            ${basicCSS}
            ${specificCSS}
          </style>
        </head>
        <body>
          ${file.contents}
        </body>
        </html>
      `
      cb(err, html)
    })
}

module.exports = parseLexdown
