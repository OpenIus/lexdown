const remark = require('remark')
const html = require('remark-html')
const frontmatter = require('remark-frontmatter')
const parse = require('remark-parse')

function logger () {
  return console.log
}

function parseLexdown (contents, opts, cb) {
  remark({ useFootnotes: true })
    .use(parse)
    .use(frontmatter, ['yaml'])
    .use(html)
    .process(contents, (err, file) => {
      cb(err, file.contents)
    })
}

module.exports = parseLexdown
