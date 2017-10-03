const fs = require('fs')
const path = require('path')

function includes (contents) {
  var match = null
  while((match = /\{\{([a-zA-Z0-9 ]*)\}\}/g.exec(contents))) {
    var filename = `${match[1]}.lexdown`
    var blockContents = fs.readFileSync(path.join(__dirname, '../examples/blocks', filename), {
      encoding: 'utf8'
    })

    contents = contents.replace(match[0], blockContents)
  }

  return contents
}

module.exports = includes
