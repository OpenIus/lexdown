const remark = require('remark')
const html = require('remark-html')
const frontmatter = require('remark-frontmatter')
const parse = require('remark-parse')
const unified = require('unified')

function logger () {
  return console.log
}

function parseLexdown (contents, opts, cb) {
  unified()
    .use(parse, { footnotes: true })
    .use(frontmatter, ['yaml'])
    .use(html)
    .process(contents, (err, file) => {
      cb(err, file.contents)
    })
}

module.exports = parseLexdown
