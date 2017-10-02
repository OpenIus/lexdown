const path = require('path')
const fs = require('fs')
const remark = require('remark')
const html = require('remark-html')
const frontmatter = require('remark-frontmatter')
const parse = require('remark-parse')

var contents = fs.readFileSync(path.join(__dirname, 'test.lexdown'), {
  encoding: 'utf8'
})

remark()
  .use(parse)
  .use(frontmatter, ['yaml'])
  .use(html)
  .use(logger)
  .process(contents, (err, file) => {
    fs.writeFileSync(path.join(__dirname, 'test.html'), file.contents)
  })

function logger () {
  return console.log
}
